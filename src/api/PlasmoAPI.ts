import { PlasmoliftingServiceType } from '../lib/types'
import { get, post } from './methods'

const section = import.meta.env.VITE_PLASMO as string

export const createPlasmo = async () => post(`${section}/SeedPlasmoLifting`, {})

export const getPlasmo = async () => {
  try {
    return await get(`${section}/GetPlasmoLifting`)
  } catch (e) {
    await createPlasmo()
    return await get(`${section}/GetPlasmoLifting`)
  }
}

export const createPlasmoLiftingService = async (item: PlasmoliftingServiceType) => {
  const formData = new FormData()
  formData.append('Name', item.name)
  formData.append('Description', item.description)
  formData.append('Cost', String(item.cost))
  if (item.img instanceof File) {
    formData.append('Img', item.img)
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/CreatePlasmoLiftingService`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при создании услуги PlasmoLifting')
  }
  return await res.json()
}

export const updatePlasmo = async (formData: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/Plasmo/EditPlasmoLifting`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении Плазмолифтинга')
  }
  return await res.json()
}

export const updatePlasmoService = async (id: number, formData: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/EditPlasmoliftingService/${id}`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении услуги Plasmolifting')
  }
  return
}

export const deletePlasmoService = async (id: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/DeletePlasmoliftingService/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error('Ошибка при удалении услуги Plasmolifting')
  }
}

export const updatePlasmoCatalog = async (formData: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/EditPlasmoliftingCatalog`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении каталога Plasmolifting')
  }
  return await res.json()
}
