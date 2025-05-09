import { SolariumServiceType } from '../lib/types'
import { get, post } from './methods'

const section = import.meta.env.VITE_SOLARIUM as string

export const createSolarium = async () => post(`${section}/CreateSolariumInfo`, {})

export const getSolarium = async () => {
  try {
    return await get(`${section}/GetSolarium`)
  } catch (e) {
    await createSolarium()
    return await get(`${section}/GetSolarium`)
  }
}

export const updateSolarium = async (id: number, formData: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/EditSolarium${id}`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении солярия')
  }
  return await res.json()
}

export const updateSolariumService = async (id: number, formData: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/EditSolariumService${id}`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении услуги солярия')
  }
  return await res.json()
}

export const deleteSolariumService = async (id: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/DeleteSolariumService/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error('Ошибка при удалении услуги солярия')
  }
}

export const createSolariumService = async (item: SolariumServiceType) => {
  const formData = new FormData()
  formData.append('Name', item.name)
  formData.append('Cost', String(item.cost))
  if (item.img instanceof File) {
    formData.append('Img', item.img)
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/CreateSolariumService`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при создании услуги солярия')
  }
  return await res.json()
}
