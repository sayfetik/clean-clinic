import { ContactsType } from '../lib/types'
import { get, put } from './methods'

const section = import.meta.env.VITE_CONTACTS as string

export const createContacts = async () =>
  await import('./methods').then(({ post }) => post(`${section}/CreateContacts`, {}))

export const getContacts = async () => {
  try {
    return await get(`${section}/GetContacts`)
  } catch (e) {
    // await createContacts()
    return await get(`${section}/GetContacts`)
  }
}

export const updateContacts = (body: ContactsType) => put(`${section}/UpdateContacts`, body)
