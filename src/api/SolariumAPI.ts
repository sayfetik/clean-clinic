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
  const res = await fetch(`${import.meta.env.VITE_API_URL}/Solarium/EditSolarium`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении солярия')
  }
  return await res.json()
}
