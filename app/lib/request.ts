import fetch from 'isomorphic-unfetch'
import { database } from './database'
import { IApiResponse } from '../contracts/IApiResponse'
import { IApiData } from '../contracts/IApiData'

async function safeFetch<T>(
  url: string,
  options?: RequestInit
): Promise<IApiResponse<T>> {
  let response: IApiData<T> | undefined
  let error: ErrorEvent | undefined

  try {
    response = await fetch(url, options).then(responseHandler)
  } catch (e) {
    error = e
    console.error(e)
  } finally {
    return { response, error }
  }
}

const responseHandler = (response: Response) =>
  new Promise(resolve => {
    // const headers = response.headers
    response.json().then(json => {
      resolve(json)
    })
  })

export async function get<T>(url: string): Promise<IApiResponse<T>> {
  const headers: HeadersInit_ = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  const session = await database.getSessionDetails()

  if (session && session.token)
    headers['Authorization'] = `Bearer ${session.token}`

  return await safeFetch(url, { method: 'GET', headers })
}

export async function post<T>(
  url: string,
  { body = {} } = {}
): Promise<IApiResponse<T>> {
  const headers: HeadersInit_ = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  const session = await database.getSessionDetails()

  if (session && session.token)
    headers['Authorization'] = `Bearer ${session.token}`

  return await safeFetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
}
