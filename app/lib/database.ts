import { ISessionDetails } from './../interfaces/ISessionDetails'
import localforage from 'localforage'

interface IDatabase extends LocalForage {
  getSessionDetails(): Promise<ISessionDetails>
  setSessionDetails(details: ISessionDetails): Promise<ISessionDetails>
}

export const database: IDatabase = localforage.createInstance({
  name: 'WhiteLabel',
  version: 1.0
})

database.getSessionDetails = () => database.getItem('session')

database.setSessionDetails = (details = null) => {
  return database.setItem('session', details)
}
