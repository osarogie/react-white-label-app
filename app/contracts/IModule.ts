import { IFormField } from './IFormField'
import { IStepForm } from './IStepForm'

export interface IModule {
  label: string
  recordName: string
  permalink: string
  searchFilters?: string[]
  formFields: IFormField[] | IStepForm[]
  dependencies?: IModule[]
  icon?: string
  create?: Boolean
  update?: Boolean
  listColumns?: any[]
  cacheList?: boolean
  formType?: 'single' | 'stepper' | 'tab'
}
