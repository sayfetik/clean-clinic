// import { InfusionCatalogType, InfusionType } from '../lib/types'
import { get } from './methods'

const section = import.meta.env.VITE_INFUSIONCATALOG as string

export const createInfusionCatalog = async () => {
  const content = 'файл'
  const blob = new Blob([content], { type: 'text/plain' })
  const file = new File([blob], 'catalog.txt', { type: 'text/plain' })
  const formData = new FormData()
  formData.append('File', file)
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/CreateInfusionCatalog`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error('Ошибка при создании каталога инфузий')
  }

  return await res.json()
}

export const getInfusionCatalog = async () => {
  try {
    return await get(`${section}/GetInfusionCatalog`)
  } catch (error) {
    await createInfusionCatalog()
    return await  get(`${section}/GetInfusionCatalog`)
  }
}

export const createInfusion = async (item: {
  name: string
  price: number
  imagePath?: File
  duration: string
  description: string[]
  results: string[]
  indications: string[]
  contradictions: string[]
  category: string
}) => {
  const formData = new FormData()
  formData.append('Name', item.name)
  formData.append('Price', String(item.price))
  if (item.imagePath instanceof File) {
    formData.append('ImagePath', item.imagePath)
  }
  formData.append('Duration', item.duration)
  item.description.forEach((d) => formData.append('Description', d))
  item.results.forEach((r) => formData.append('Results', r))
  item.indications.forEach((i) => formData.append('Indications', i))
  item.contradictions.forEach((c) => formData.append('Contradictions', c))
  formData.append('Category', item.category)
  const res = await fetch(`${import.meta.env.VITE_API_URL}/CreateTreatment`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при создании инфузии')
  }
  return await res.json()
}

export const getInfusionById = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/GetTreatmentsById?Id=${id}`)
  if (!res.ok) {
    throw new Error('Ошибка при получении инфузии по id')
  }
  return await res.json()
}

export const updateInfusion = async (item: {
  id: string
  name: string
  price: number
  imagePath: File | string
  duration: string
  description: string[]
  results: string[]
  indications: string[]
  contradictions: string[]
}) => {
  const formData = new FormData()
  formData.append('Id', item.id)
  formData.append('Name', item.name)
  formData.append('Price', String(item.price))
  if (item.imagePath instanceof File) {
    formData.append('ImagePath', item.imagePath)
  }
  formData.append('Duration', item.duration)
  item.description.forEach((d) => formData.append('Description', d))
  item.results.forEach((r) => formData.append('Results', r))
  item.indications.forEach((i) => formData.append('Indications', i))
  item.contradictions.forEach((c) => formData.append('Contradictions', c))
  const res = await fetch(`${import.meta.env.VITE_API_URL}/UpdateTreatment`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении инфузии')
  }
  return await res.json()
}

export const deleteTreatment = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/DeleteTreatment`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
  if (!res.ok) {
    throw new Error('Ошибка при удалении инфузии')
  }
}

export const editInfusionCatalog = async (body: {
  Id: string | number
  Title: string
  Img: File | string
  WhatisTitle: string
  WhatIsText1: string
  WhatIsText2: string
  ServicesTitle: string
  AdvantagesTitle: string
  Advantages: string[]
  AdvantagesText: string
}) => {
  const formData = new FormData()
  formData.append('Id', String(body.Id))
  formData.append('Title', body.Title)
  if (body.Img instanceof File) {
    formData.append('Img', body.Img)
  } else {
    formData.append('Img', '')
  }
  formData.append('WhatisTitle', body.WhatisTitle)
  formData.append('WhatIsText1', body.WhatIsText1)
  formData.append('WhatIsText2', body.WhatIsText2)
  formData.append('ServicesTitle', body.ServicesTitle)
  formData.append('AdvantagesTitle', body.AdvantagesTitle)
  body.Advantages.forEach((a) => formData.append('Advantages', a))
  formData.append('AdvantagesText', body.AdvantagesText)
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/EditInfusionCatalog`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении каталога инфузий')
  }
  return await res.json()
}

export const editHowToChooseCard = async (body: {
  id: number
  title: string
  additionalText: string
  text: string
}) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/EditHowToChooseCard`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении блока "Как выбрать"')
  }
  return await res.json()
}
