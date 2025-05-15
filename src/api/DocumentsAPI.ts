const api = import.meta.env.VITE_API_URL

const section = import.meta.env.VITE_MAIN

export const getDocuments = async () => {
  const res = await fetch(`${api}/${section}/GetLicense`)
  if (!res.ok) {
    throw new Error('Ошибка получения лицензий')
  }
  const data = await res.json()
  return Array.isArray(data)
    ? data.map((item) => ({
        id: item.id,
        title: item.title,
        img: item.imagePath,
      }))
    : []
}

export const createDocument = async (title: string, file: File) => {
  const formData = new FormData()
  formData.append('Title', title)
  formData.append('Img', file)
  const res = await fetch(`${api}/${section}/CreateLicense`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка создания лицензии')
  }
  return await res.json()
}

export const deleteDocument = async (licenseId: number) => {
  const res = await fetch(`${api}/${section}/DeleteLicense`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ licenseId }),
  })
  if (!res.ok) {
    throw new Error('Ошибка удаления лицензии')
  }
  return await res.json()
}
