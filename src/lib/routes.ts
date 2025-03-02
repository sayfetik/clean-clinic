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
export const getLocationRoute = () => 'https://yandex.ru/maps/org/klin_klinik/136753931896/?ll=55.136984%2C51.778158&mode=search&sll=55.136984%2C51.778158&sspn=0.022058%2C0.009916&text=clean%20clinic%20оренбург&z=16'

export const socialMedia: Record<string, string> = {
  telegram: 'https://t.me/+XhpoFM-voaA4Y2Yy',
  email: 'mailto:welcome@clean-clinic.ru',
  vkontakte: 'https://vk.com/franchiseclean_clinic',
  whatsup: 'https://api.whatsapp.com/send/?phone=79777865133&text&type=phone_number&app_absent=0',
  phone: 'tel:+79952757575'
}

export const openOnBlankPage = (link: string) => {
  window.open(link, '_blank');
}