import { InfusionType, MainPageType } from '../lib/types'
import { get, post, put } from './methods'

const section = import.meta.env.VITE_MAIN as string

export const createMainPage = async () => post(`${section}/CreateMain`, {})

export const getMainPage = async () => {
  try {
    return await get(`${section}/GetMainPage`)
  } catch (e) {
    await createMainPage()
    return await get(`${section}/GetMainPage`)
  }
}

export const getInfusionInstructions = async () => {
  return await get(`${section}/GetStepTypes`)
}

export const updateMainPage = async (body: MainPageType) => {
  const formData = new FormData()
  formData.append('Id', body.id.toString())
  formData.append('Title', body.title ?? '')
  if (Array.isArray(body.subtitle)) {
    body.subtitle.forEach((item: string) => formData.append('Subtitle', item ?? ''))
  }
  formData.append('AdditionalText', body.additionalText ?? '')
  if (body.problemImage instanceof File) {
    formData.append('ProblemImage', body.problemImage)
  }
  formData.append('ProblemTitle', body.problemTitle ?? '')

  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/UpdateMainPage`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка обновления главной страницы')
  }
  return await res.json()
}

export const createFaq = async (body: { id: string; question: string; answer: string }) => {
  return await post(`${section}/CreateFaq`, body)
}

export const createFeedBack = async (body: { name: string; rate: number; text: string }) => {
  return await post(`${section}/CreateFeedBack`, body)
}

export const createService = async (body: { id: string; name: string; img: string | File }) => {
  if (body.img instanceof File) {
    const formData = new FormData()
    formData.append('id', body.id)
    formData.append('name', body.name)
    formData.append('img', body.img)
    const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/CreateService`, {
      method: 'POST',
      body: formData,
    })
    if (!res.ok) {
      throw new Error('Ошибка обновления Услуги')
    }
    return await res.json()
  }
}

export const updateWhiteCard = async (body: { id: string; title: string; text: string; imagePath?: string | File }) => {
  if (body.imagePath instanceof File) {
    const formData = new FormData()
    formData.append('Id', body.id)
    formData.append('Title', body.title)
    formData.append('Text', body.text)
    formData.append('ImagePath', body.imagePath)
    const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/UpdateWhiteCard`, {
      method: 'PUT',
      body: formData,
    })
    if (!res.ok) {
      throw new Error('Ошибка обновления WhiteCard')
    }
    return await res.json()
  }
}

export const updateAdvantageType = async (body: { id: string; title: string; text: string }) => {
  return await put(`${section}/UpdateAdvantageType`, body)
}

export const updateProblem = async (body: { id: number; title: string; text: string }) => {
  return await put(`${section}/UpdateProblem`, body)
}

export const updateInfusionInstructions = async (body: { id: number; title: string; answer: string }) => {
  return await put(`${section}/UpdateInfusionInstructions`, body)
}

export const updateFaq = async (body: { id: number; question: string; answer: string }) => {
  return await put(`${section}/UpdateFaq`, body)
}

export const updateService = async (body: { Id: number; Name: string; Img: string | File }) => {
  const formData = new FormData()
  formData.append('Id', String(body.Id))
  formData.append('Name', body.Name)
  if (body.Img instanceof File) {
    formData.append('Img', body.Img)
  } else {
    formData.append('Img', '')
  }
  return await fetch(`${import.meta.env.VITE_API_URL}/${section}/UpdateServices`, {
    method: 'PUT',
    body: formData,
  })
}

export const updateFeedback = async (body: { Id: number; Name: string; Rate: number; Text: string }) => {
  const formData = new FormData()
  formData.append('Id', String(body.Id))
  formData.append('Name', body.Name)
  formData.append('Rate', String(body.Rate))
  formData.append('Text', body.Text)
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/UpdateFeedback`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка обновления отзыва')
  }
  return await res.json()
}

export const updateWeWork = async (body: {
  id: number
  img: string | File
  title: string
  text: string
  numSpecialists: number
  numPatients: number
}) => {
  const formData = new FormData()
  formData.append('id', String(body.id))
  formData.append('title', body.title)
  formData.append('text', body.text)
  formData.append('numSpecialists', String(body.numSpecialists))
  formData.append('numPatients', String(body.numPatients))
  if (body.img instanceof File) {
    formData.append('img', body.img)
  }
  return await fetch(`${import.meta.env.VITE_API_URL}/${section}/UpdateWeWork`, {
    method: 'PUT',
    body: formData,
  })
}

export const updateForm = async (body: { formId: number; title: string }) => {
  return await put(`${section}/UpdateForm`, body)
}

export const updateWhyInfusions = async (body: {
  id: number
  title: string
  answer: string
  text1: string
  text2: string
}) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/UpdateWhyInfusions`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: '*/*',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error('Ошибка обновления WhyInfusions')
  }
  return await res.json()
}

export const getAllInfusions = async (): Promise<{data: InfusionType[], dict: Record<string, string>; names: string[] }> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/GetAllTreatments`, {
    method: 'GET',
  })
  if (!res.ok) {
    throw new Error('Ошибка при получении всех инфузий')
  }
  const data = await res.json()
  const dict: Record<string, string> = {}
  const names: string[] = []
  data.forEach((item: { name: string; id: string }) => {
    dict[item.name] = item.id
    names.push(item.name)
  })
  return { data, dict, names }
}
