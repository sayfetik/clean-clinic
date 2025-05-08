import { AnalyzesServiceType } from '../lib/types'
import { get, post, del, prependImageUrl } from './methods'

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

export const createAnalyseService = async (item: AnalyzesServiceType) => {
  const formData = new FormData()
  formData.append('Name', item.name)
  if (item.bullets && item.bullets.length > 0) {
    item.bullets.forEach((b) => formData.append('Bullets', b))
  }
  formData.append('Cost', String(item.cost))
  if (item.img instanceof File) {
    formData.append('Img', item.img)
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/CreateAnalyseService`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка обновления Услуги')
  }
  const data = await res.json()
  return prependImageUrl(data)
}

export const editAnalyseService = async (body: AnalyzesServiceType) => {
  const formData = new FormData()
  formData.append('Id', String(body.id))
  formData.append('Name', body.name)
  body.bullets.forEach((b) => formData.append('Bullets', b))
  formData.append('Cost', String(body.cost))
  if (body.img instanceof File) {
    formData.append('Img', body.img)
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/EditAnalyseService${body.id}`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка обновления Услуги')
  }
  return
}

export const deleteAnalyseService = async (id: number) => {
  return await del(`${section}/DeleteAnalyseService`, id)
}
