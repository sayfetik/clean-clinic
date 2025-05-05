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
