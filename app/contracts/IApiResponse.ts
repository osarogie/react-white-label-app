import { IApiData } from './IApiData'

export interface IApiResponse<T> {
  response?: IApiData<T>
  error?: ErrorEvent
}
