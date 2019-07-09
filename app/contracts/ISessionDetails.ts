import { IViewer } from './IViewer'
export interface ISessionDetails {
  token: string
  userId: string
  expiry: Number
  user: IViewer
}
