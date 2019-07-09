import { IModule } from './IModule'
import { IModel } from './IModel'
import { IFieldRule } from './IFieldRule'
import { ISelectOption } from './ISelectOption'
import { IDependencyMap } from './IDependencyMap'
import { IFormValues } from './IFormValues'

export interface IFormField {
  label: string
  type?:
    | 'text'
    | 'number'
    | 'select'
    | 'date'
    | 'checkbox'
    | 'phone'
    | 'section-head'
    | 'yesno'
  recordName?: string
  columnName?: string
  required?: boolean
  secureEntry?: boolean
  min?: number
  max?: number
  maxLength?: number
  mode?: 'default' | 'multiple' | 'tags'
  options?: ISelectOption[]
  initialValue?: any
  rules?: IFieldRule[]
  filter?(formData: IFormValues, dependencies: IDependencyMap): IModel[]
  dependency?: IModule
}
