const API_URL = import.meta.env.VITE_API_URL as string

export async function get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
  let url = `${API_URL}/${endpoint}`
  if (params) {
    const query = new URLSearchParams(params).toString()
    url += `?${query}`
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: '*/*',
      'content-type': 'application/json; charset=utf-8',
    },
  })
  if (!response.ok) {
    throw new Error(`GET ${url} failed: ${response.status}`)
  }
  return response.json()
}

export async function post<T = any>(endpoint: string, body?: any): Promise<T> {
  const url = `${API_URL}/${endpoint}`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'content-type': 'application/json; charset=utf-8',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!response.ok) {
    throw new Error(`POST ${url} failed: ${response.status}`)
  }
  return response.json()
}

export async function put<T = any>(endpoint: string, body?: any): Promise<T> {
  const url = `${API_URL}/${endpoint}`
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      accept: '*/*',
      'content-type': 'application/json; charset=utf-8',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!response.ok) {
    throw new Error(`PUT ${url} failed: ${response.status}`)
  }
  return response.json()
}
