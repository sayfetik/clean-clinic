import { get, post } from './methods'

const section = import.meta.env.VITE_ANALYSES as string

export const createAnalyses = async () => post(`${section}/SeedAnalyses`, {})

export const getAnalyses = async () => {
  try {
    return await get(`${section}/GetAnalysesCatalog`)
  } catch (e) {
    await createAnalyses()
    return await get(`${section}/GetAnalysesCatalog`)
  }
}

export const updateAnalyses = async (formData: FormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/Analyses/EditAnalyses`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении анализов')
  }
  return await res.json()
}
