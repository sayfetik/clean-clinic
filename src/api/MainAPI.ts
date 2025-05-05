import { get, post } from './methods'

const section = import.meta.env.VITE_MAIN as string

export const createMainPage = async () => post(`${section}/CreateMain`, {})

export const getMainPage = async () => {
  try {
    return await get(`${section}/GetMain`)
  } catch (e) {
    await createMainPage()
    return await get(`${section}/GetMain`)
  }
}
