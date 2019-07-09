import { IFormValues } from './../contracts/IFormValues'
import { IFormField } from './../contracts/IFormField'
import { IModel } from './../contracts/IModel'
import { ISelectOption } from '../contracts/ISelectOption'
import { IDependencyMap } from '../contracts/IDependencyMap'

export class FormService {
  static generateFields(
    fields: IFormField[],
    dependencyData: IDependencyMap = {},
    fieldCallback?: (field: IFormField) => IFormField
  ) {
    const generatedFields: any = {}

    for (const field of fields) {
      const {
        type,
        label,
        required,
        mode,
        recordName,
        secureEntry,
        rules,
        filter,
        columnName
      } = field

      let generatedField: IFormField = {
        type,
        label,
        mode,
        recordName,
        secureEntry,
        rules,
        filter,
        columnName: columnName || label
      }

      if (!generatedField.rules) generatedField.rules = []

      if (type === 'text')
        generatedField.rules.push({
          type: 'string',
          pattern: /^[a-zA-Z0-9 @&.,-]+$/g,
          message: 'Special character are not allowed'
        })

      if (type === 'phone') {
        generatedField.rules.push({
          type: 'string',
          pattern: /^[0-9]+$/g,
          message: 'Please enter a valid phone number'
        })

        generatedField.rules.push({
          type: 'string',
          message: 'Phone number cannot be more than 11 digits',
          max: 11
        })
      }

      if (required) {
        const message =
          mode == 'multiple'
            ? `Please select ${label.toLowerCase()}!`
            : `Please input ${label.toLowerCase()}!`

        generatedField.rules.push({
          required: true,
          message
        })
      }

      if (type == 'select') {
        generatedField.options = field.options || []
      }

      if (field.recordName) {
        generatedField.type = 'select'

        if (dependencyData[field.recordName]) {
          generatedField.options = dependencyData[field.recordName].map(
            (dependency, index): ISelectOption => {
              return {
                label: dependency['name'],
                value: index
              }
            }
          )
        } else generatedField.options = []
      }

      if (typeof fieldCallback === 'function') {
        generatedField = fieldCallback(generatedField)
      }

      generatedFields[field.columnName || field.label] = generatedField
    }

    return generatedFields
  }

  static mapDependencyToFormData(
    formData: IFormValues,
    fields: IFormField[],
    dependencyData: IDependencyMap
  ) {
    let formDataCopy: IFormValues = { ...formData }

    for (const field of fields) {
      const { label, mode, type, columnName } = field

      const key = columnName || label

      if (field.recordName) {
        if (mode == 'multiple') {
          formDataCopy[key] = formDataCopy[key].map(
            (e: number) => dependencyData[field.recordName!][e]._id
          )
        } else {
          formDataCopy[key] =
            dependencyData[field.recordName][formDataCopy[key]]._id
        }
      } else if (type === 'checkbox') {
        formDataCopy[key] = !!formDataCopy[key]
      }
    }

    return formDataCopy
  }

  static injectDependency(
    mObject: IModel,
    field: IFormField,
    dependencyData: IDependencyMap
  ) {
    if (field.recordName && dependencyData[field.recordName]) {
      const dependencyIdKey = `${field.label}~${field.recordName}`

      const dependency = dependencyData[field.recordName].find(
        obj => Number(mObject[dependencyIdKey]) === Number(obj['::ID::'])
      )

      if (dependency) mObject[field.label] = dependency
    }
  }
}
