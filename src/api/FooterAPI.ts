const API_URL = import.meta.env.VITE_API_URL

export const getFooter = async () => {
  try {
    const res = await fetch(`${API_URL}/GetFooter`)
    if (!res.ok) {
      throw new Error('Ошибка получения футера')
    }
    return await res.json()
  } catch (e) {
    await seedFooter()
    const res = await fetch(`${API_URL}/GetFooter`)
    if (!res.ok) {
      throw new Error('Ошибка получения футера после seed')
    }
    return await res.json()
  }
}

export const seedFooter = async () => {
  const res = await fetch(`${API_URL}/SeedFooter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify({}),
  })
  if (!res.ok) {
    throw new Error('Ошибка seedFooter')
  }
  return await res.json()
}

export const updateFooter = async (body: {
  promotionsAndOffersTitle: string
  promotionsAndOffersText: string
  ooo: string
  licenseNo: string
  inn: string
  bottomSection: string
  telegramChanellLink: string
}) => {
  const res = await fetch(`${API_URL}/footer`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error('Ошибка обновления футера')
  }
  return await res.json()
}
