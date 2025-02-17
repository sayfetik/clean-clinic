import { Infusion } from './types'

// ХЕДЕР
export const location = `г. Оренбург, ул. Ульянова, 69`;
export const workHours = 'пн-пт 8-20 сб, вс 9-15'
export const phoneNumber = '8 995 275-75-75'
export const locationLink = 'https://yandex.ru/maps/org/klin_klinik/136753931896/?ll=55.136984%2C51.778158&mode=search&sll=55.136984%2C51.778158&sspn=0.022058%2C0.009916&text=clean%20clinic%20оренбург&z=16'

export const infusions: Infusion[] = [
  { id: 1, name: 'Золушка', description: 'Описание золушки', cost: 111 },
  { id: 2, name: 'Экспресс-похудение', description: 'Описание похудения', cost: 222 },
  { id: 3, name: 'Антистресс', description: 'Описание анистресса', cost: 333 },
  { id: 4, name: 'Доброе утро', description: 'Описание доброе утро', cost: 444 },
]
