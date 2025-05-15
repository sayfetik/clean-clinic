import { get, post } from './methods'

const section = import.meta.env.VITE_ABOUT as string

export const createAbout = async () => post(`${section}/CreateAbout`, {})

export const getAboutPage = async () => {
  try {
    return await get(`${section}/GetAbout`)
  } catch (e) {
    // await createAbout()
    return await get(`${section}/GetAbout`)
  }
}

export const updateAbout = (body: { title: string; text1: string; text2: string }) =>
  fetch(`${import.meta.env.VITE_API_URL}/${section}/UpdateAbout`, {
    method: 'PATCH',
    headers: {
      accept: '*/*',
      'content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json())

export const createSpecialist = async (body: { Name: string; Profession: string; Experience: string; file: File }) => {
  const formData = new FormData()
  formData.append('Name', body.Name)
  formData.append('Profession', body.Profession)
  formData.append('Experience', body.Experience)
  formData.append('file', body.file)
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/CreateSpecialist`, {
    method: 'POST',
    body: formData,
  })
  return await res.json()
}

export const updateSpecialist = async (body: {
  Id: number
  file?: File | string
  Name: string
  Profession: string
  Experience: string
}) => {
  const formData = new FormData()
  formData.append('Id', String(body.Id))
  if (body.file) {
    formData.append('file', body.file)
  }
  formData.append('name', body.Name)
  formData.append('profession', body.Profession)
  formData.append('experience', body.Experience)
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/UpdateSpecialist`, {
    method: 'PUT',
    body: formData,
  })
  return await res.json()
}

export const deleteSpecialist = async (specialistId: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${section}/DeleteSpecialists`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    },
    body: JSON.stringify({ specialistId }),
  })
  if (!res.ok) {
    throw new Error('Ошибка при удалении специалиста')
  }
  return await res.json()
}
