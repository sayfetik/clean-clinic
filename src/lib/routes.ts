const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const infusionRouteParams = getRouteParams({ infusionId: true })
export type InfusionRouteParamsType = typeof infusionRouteParams

export const getMainRoute = () => '/'
export const getAboutRoute = () => '/about'
export const getInfusionRoute = ({ infusionId }: InfusionRouteParamsType) => `/infusion/${infusionId}`
export const getInfusionCatalogRoute = () => `/infusions`
