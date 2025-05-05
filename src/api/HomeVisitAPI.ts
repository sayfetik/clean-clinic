import { get, post } from './methods'

const section = import.meta.env.VITE_HOME_VISIT as string

export const createHomeVisit = async () => post(`${section}/CreateHomeVisit`, {})

export const getHomeVisitPage = async () => {
  try {
    return await get(`${section}/GetHomeVisit`)
  } catch (e) {
    await createHomeVisit()
    return await get(`${section}/GetHomeVisit`)
  }
}
