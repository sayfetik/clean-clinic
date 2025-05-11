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

export const updateSolarium = async (formData: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/EditSolarium`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении солярия')
  }
  return await res.json()
}

export const updateSolariumService = async (formData: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/EditSolariumService`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении услуги солярия')
  }
  return
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
  formData.append('Img', typeof item.img === 'string' ? '' : (item.img as File))
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/CreateSolariumService`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при создании услуги солярия')
  }
  return await res.json()
}
