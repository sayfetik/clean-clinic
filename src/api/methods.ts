const API_URL = import.meta.env.VITE_API_URL as string

export function prependImageUrl(obj: any): any {
  const BASE_URL = 'http://localhost:9000/clinic-bucket/';
  const normalizeSlashes = (str: string): string => {
    return str.replace(/([^:]\/)\/+/g, '$1');
  };

  if (Array.isArray(obj)) {
    return obj.map(prependImageUrl);
  }

  if (obj && typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      const value = obj[key];
      if (
        (key.toLowerCase().includes('img') || key.toLowerCase().includes('image') || key.toLowerCase().includes('imagePath')) &&
        typeof value === 'string' &&
        value &&
        !value.startsWith(BASE_URL)
      ) {
        const fullUrl = BASE_URL + value;
        newObj[key] = normalizeSlashes(fullUrl);
      } else if (typeof value === 'object' && value !== null) {
        newObj[key] = prependImageUrl(value);
      } else {
        newObj[key] = value;
      }
    }
    return newObj;
  }

  return obj;
}


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
  const data = await response.json()
  return prependImageUrl(data)
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

export async function del(endpoint: string, id?: string | number) {
  let url = `${API_URL}/${endpoint}`
  if (id !== undefined) {
    url += `/${id}`
  }
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      accept: '*/*',
      'content-type': 'application/json; charset=utf-8',
    },
  })
  if (!response.ok) {
    throw new Error(`DELETE ${url} failed: ${response.status}`)
  }
  return
}
