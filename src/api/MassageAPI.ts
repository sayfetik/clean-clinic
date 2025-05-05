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

export const updateMassage = async (formData: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/Massage/EditMassage`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении массажа')
  }
  return await res.json()
}
