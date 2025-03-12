const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const infusionRouteParams = getRouteParams({ infusionId: true })
export type InfusionRouteParamsType = typeof infusionRouteParams

export const getMainRoute = () => '/'
export const getAboutRoute = () => '/about'
export const getInfusionRoute = ({ infusionId }: InfusionRouteParamsType) => `/infusion/${infusionId}`
export const getInfusionCatalogRoute = () => `/infusions`
export const getContactsRoute = () => `/contacts`
export const getPolicyRoute = () => `/privacyPolicy`
export const getLicenseRoute = () => `/license`
export const getDocumentsRoute = () => `/documents`
export const getAdminRoute = () => `/admin`
export const getSuccessRoute = () => `/success`
export const getErrorRoute = () => `/error`
  
export const openOnBlankPage = (link: string) => {
  window.open(link, '_blank')
}
