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

export const updateMainPage = async (body: any) => {
  const formData = new FormData()
  formData.append('Id', body.id ?? 0)
  formData.append('Title', body.title ?? '')

  // Subtitle как массив
  if (Array.isArray(body.subtitle)) {
    body.subtitle.forEach((item: string) => formData.append('Subtitle', item ?? ''))
  }

  // WeWork
  formData.append('WeWork.Title', body.weWork?.title ?? '')
  formData.append('WeWork.Text', body.weWork?.text ?? '')
  formData.append('WeWork.NumSpecialists', body.weWork?.numSpecialists ?? 0)
  formData.append('WeWork.NumPatients', body.weWork?.numPatients ?? 0)

  // Advantages как массив объектов
  if (Array.isArray(body.advantages)) {
    body.advantages.forEach((item: any, i: number) => {
      formData.append(`Advantages[${i}].Title`, item.title ?? '')
      formData.append(`Advantages[${i}].Text`, item.text ?? '')
    })
  }

  // Form
  formData.append('Form.Id', body.form?.id ?? '')
  formData.append('Form.Title', body.form?.title ?? '')
  formData.append('Form.Text', body.form?.text ?? '')

  // WhyInfusions
  formData.append('WhyInfusions.Title', body.whyInfusions?.title ?? '')
  formData.append('WhyInfusions.Answer', body.whyInfusions?.answer ?? '')
  formData.append('WhyInfusions.Text1', body.whyInfusions?.text1 ?? '')
  formData.append('WhyInfusions.Text2', body.whyInfusions?.text2 ?? '')

  // ProblemImage
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
  return await put(`${section}/CreateService`, body)
}

export const updateWhiteCard = async (body: { id: string; title: string; text: string; imagePath?: string | File }) => {
  if (body.imagePath instanceof File) {
    const formData = new FormData()
    formData.append('Id', body.id)
    formData.append('Title', body.title)
    formData.append('Text', body.text)
    formData.append('Image', body.imagePath)
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
