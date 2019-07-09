import { database } from '../lib/database'
import { get, post } from '../lib/request'
import { pluralise } from '../lib/pluralise'
import { notification } from 'antd'
import { IModule } from '../contracts/IModule'

export const API = 'https://example-api.com'

interface ApiRecordFilter {
  [x: string]: any
}

interface ApiRequestOptions {
  cache?: boolean
}

const persistor = {
  retrieve: (key: string) => database.getItem(key),
  insert: (key: string, value: any) => database.setItem(key, value)
}

function persistRequest(key: string, req: Promise<{}>) {
  return new Promise(async (resolve, reject) => {
    try {
      const offlineData = await persistor.retrieve(key)

      if (offlineData) resolve(offlineData)
    } catch (e) {
      console.error(e)
    }

    const result = await req

    if (result) {
      persistor.insert(key, result)
      resolve(result)
    } else reject('Network error')
  })
}

export class ApiService {
  static loadRecords(...args: IModule[]) {
    const results = Promise.all(args.map(a => this.loadRecord(a, {})))

    return results
  }

  static loadRecord = (
    record: IModule,
    filter: ApiRecordFilter = {},
    { cache = false }: ApiRequestOptions = {}
  ) => {
    // return new Promise(resolve =>
    //   setTimeout(() => {
    //     resolve({ data: [], success: true }), 2000
    //   })
    // )

    const recordName = record.recordName || record.label

    if (cache || record.cacheList)
      return persistRequest(`${recordName}`, get(`${API}/api/${recordName}`))

    return get(`${API}/api/${recordName}`)
  }

  static postRecord({ record, data }: { record: string; data: any }) {
    // return new Promise(resolve =>
    //   setTimeout(() => {
    //     resolve({ data: {}, success: true }), 2000
    //   })
    // )

    return post(`${API}/api/${pluralise(record.toLowerCase())}`, { body: data })
  }

  static updateRecord({
    record,
    id,
    data
  }: {
    record: string
    data: any
    id: string
  }) {
    return post(`${API}/api/${pluralise(record.toLowerCase())}/${id}`, {
      body: data
    })
  }

  static loadRecordFromSource(source?: string) {
    return this.loadRecord
  }

  static loadRecordById = (uri: string) => {
    return get(`${API}/api/${uri}`)
  }

  static processResponse(
    response: any,
    { successMessage, successDescription, onSuccess }
  ) {
    console.log(response)
    {
      if (response.success) {
        notification.success({
          // duration: 0,
          message: successMessage,
          description: successDescription
        })
        onSuccess && onSuccess()
      } else {
        notification.error({
          message: 'Error',
          description: 'We had a problem processing your request'
          // duration: 0
        })
      }
      onSuccess && onSuccess()
    }
  }
}
