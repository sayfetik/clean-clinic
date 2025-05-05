import { get, post } from './methods'

const section = import.meta.env.VITE_CRYO as string

export const createCryotherapy = async () => post(`${section}/CreateCryotherapy`, {})

export const getCryo = async () => {
  try {
    return await get(`${section}/GetCryotherapy`)
  } catch (e) {
    await createCryotherapy()
    return await get(`${section}/GetCryotherapy`)
  }
}

export const updateCryotherapy = async (formData: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/Cryotherapy/EditCryotherapy`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении криотерапии')
  }
  return await res.json()
}
