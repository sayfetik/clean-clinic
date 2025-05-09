export const getExcursion = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/GetExcursion`)
  if (!res.ok) {
    throw new Error('Ошибка при получении экскурсии')
  }
  return await res.json()
}

export const createExcursion = async (file: File) => {
  const formData = new FormData()
  formData.append('File', file)
  const res = await fetch(`${import.meta.env.VITE_API_URL}/CreateExcursion`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при создании экскурсии')
  }
  return await res.json()
}

export const editExcursion = async (excursionId: number, file: File) => {
  const formData = new FormData()
  formData.append('ExcursionId', String(excursionId))
  formData.append('File', file)
  const res = await fetch(`${import.meta.env.VITE_API_URL}/EditExcursion`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) {
    throw new Error('Ошибка при обновлении экскурсии')
  }
  return await res.json()
}
