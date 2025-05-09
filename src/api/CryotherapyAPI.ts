import { CryoServiceType, CryotherapyType } from '../lib/types'
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

export const editCryotherapy = async (data: CryotherapyType) => {
  const formData = new FormData()
  formData.append('Id', String(data.id ?? 0))
  formData.append('Title', data.title)
  formData.append('WhatItIsTitle', data.whatItIsTitle)
  formData.append('WhatItIsText', data.whatItIsText)
  formData.append('IndicationsTitle', data.indicationsTitle)
  data.indications.forEach((i) => formData.append('Indications', i))
  formData.append('ContraindicationsTitle', data.contraindicationsTitle)
  data.contraindications.forEach((i) => formData.append('Contraindications', i))
  formData.append('ProcedureTitle', data.procedureTitle)
  formData.append('ProcedureText', data.procedureText)
  formData.append('ServicesTitle', data.servicesTitle)
  if (typeof data.img !== 'string' && data.img) {
    formData.append('Img', data.img)
  }
  data.services.forEach((s, idx) => {
    formData.append(`Services[${idx}].id`, String(s.id))
    formData.append(`Services[${idx}].name`, s.name)
    formData.append(`Services[${idx}].cost`, String(s.cost))
    if (typeof s.img !== 'string' && s.img) {
      formData.append(`Services[${idx}].img`, s.img)
    }
  })
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/EditCryotherapy`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении криотерапии')
  }
  return await res.json()
}

export const createCryotherapyService = async (item: CryoServiceType) => {
  const formData = new FormData()
  formData.append('Name', item.name)
  formData.append('Cost', String(item.cost))
  if (item.img instanceof File) {
    formData.append('Image', item.img)
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/CreateCryotherapyService`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при создании услуги криотерапии')
  }
  return await res.json()
}
