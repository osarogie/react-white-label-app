import { ValidationRule } from 'antd/lib/form'

export interface IFieldRule extends ValidationRule {
  type?: string
  message?: string
  required?: boolean
  pattern?: RegExp
}
