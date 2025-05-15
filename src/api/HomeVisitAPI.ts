import { HomeVisitServiceType } from '../lib/types'
import { get, post } from './methods'

const section = import.meta.env.VITE_HOME_VISIT as string

export const createHomeVisit = async () => post(`${section}/CreateHomeVisit`, {})

export const getHomeVisitPage = async () => {
  try {
    return await get(`${section}/GetHomeVisit`)
  } catch (e) {
    // await createHomeVisit()
    return await get(`${section}/GetHomeVisit`)
  }
}

export const editHomeVisit = async (formData: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/EditHomeVisit`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении HomeVisit')
  }
  return await res.json()
}

export const editHomeVisitService = async (id: number, formData: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/EditHomeVisitSubcription${id}`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении услуги HomeVisit')
  }
  return await res.json()
}

export const deleteHomeVisitService = async (id: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/DeleteHomeVistService/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error('Ошибка при удалении услуги HomeVisit')
  }
}

export const createHomeVisitService = async (item: HomeVisitServiceType) => {
  const formData = new FormData()
  formData.append('Name', item.name)
  formData.append('Cost', String(item.cost))
  if (item.img instanceof File) {
    formData.append('Image', item.img)
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/CreateHomeVisitService`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при создании услуги HomeVisit')
  }
  return await res.json()
}
