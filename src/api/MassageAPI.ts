import { MassageServiceType } from '../lib/types'
import { get, post } from './methods'

const section = import.meta.env.VITE_MASSAGE as string

export const createMassage = async () => post(`${section}/SeedMassage`, {})

export const getMassage = async () => {
  try {
    return await get(`${section}/GetMassage`)
  } catch (e) {
    await createMassage()
    return await get(`${section}/GetMassage`)
  }
}

export const updateMassageCatalog = async (formData: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/EditMassageCatalog`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении каталога массажа')
  }
  return
}

export const updateMassageService = async (formData: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/EditMassageService`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении услуги массажа')
  }
  return
}

export const deleteMassageService = async (id: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/services/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error('Ошибка при удалении услуги массажа')
  }
}

export const createMassageService = async (item: MassageServiceType) => {
  const formData = new FormData()
  formData.append('Name', item.name)
  formData.append('Cost', String(item.cost))
  item.bullets.forEach((b) => formData.append('Bullets', b))
  if (item.img instanceof File) {
    formData.append('Img', item.img)
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/CreateMassageService`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при создании услуги массажа')
  }
  return await res.json()
}
