const API_URL = import.meta.env.VITE_API

export const createSuccessPage = async () => {
  const res = await fetch(`${API_URL}/CreateSuccessPage`, {
    method: 'POST',
  })
  return await res.json()
}

export const getSuccessPage = async () => {
  try {
    const res = await fetch(`${API_URL}/GetSuccessPage`)
    if (!res.ok) {
      throw new Error('Ошибка получения SuccessPage')
    }
    return await res.json()
  } catch (e) {
    await createSuccessPage()
    const res = await fetch(`${API_URL}/GetSuccessPage`)
    if (!res.ok) {
      throw new Error('Ошибка получения SuccessPage')
    }
    return await res.json()
  }
}

export const createErrorPage = async () => {
  const res = await fetch(`${API_URL}/CreateErrorPage`, {
    method: 'POST',
  })
  return await res.json()
}

export const getErrorPage = async () => {
  try {
    const res = await fetch(`${API_URL}/GetErrorPage`)
    if (!res.ok) {
      throw new Error('Ошибка получения ErrorPage')
    }
    return await res.json()
  } catch (e) {
    await createErrorPage()
    const res = await fetch(`${API_URL}/GetErrorPage`)
    if (!res.ok) {
      throw new Error('Ошибка получения ErrorPage')
    }
    return await res.json()
  }
}

export const updateSuccessPage = async (body: { id: number; title: string; text: string }) => {
  const res = await fetch(`${API_URL}/UpdateSuccessPage`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error('Ошибка обновления SuccessPage')
  }
  return await res.json()
}

export const updateErrorPage = async (body: { id: number; title: string; text: string }) => {
  const res = await fetch(`${API_URL}/UpdateErrorPage`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error('Ошибка обновления ErrorPage')
  }
  return await res.json()
}
