import { socialMedia, getLocationRoute } from './routes'
import * as types from './types'

// ХЕДЕР
export const headerData = {
  location: `г. Оренбург, ул. Ульянова, 69`,
  workHours: 'пн-пт 8-20 сб, вс 9-15',
  phoneNumber: '8 995 275-75-75',
  locationLink: getLocationRoute()}

// ГЛАВНАЯ

export const clinicAdvantages: types.AdvantageType[] = [
  { title: 'Безопаность', text: 'Проверка анализов перед назначением' },
  { title: 'Качество', text: 'Всегда качественное обслуживание' },
  { title: 'Опыт', text: 'Врачи-терапевты с практикой более 20 лет' },
  { title: 'Подход', text: 'Индивидуальные курсы капельниц для каждого' },
]

export const whiteCards: types.WhiteCardType[] = [
  {
    img: '/assets/heart.png',
    title: 'Мгновенные результаты',
    text: '70% наших пациентов отмечают улучшение самочувствия и энергии после 1 капельницы',
  },
  {
    img: '/assets/injection.png',
    title: 'На 80% эффективнее',
    text: 'Эффективнее других способов терапии при лечении и профилактике любых заболеваний',
  },
  {
    img: '/assets/capsule.png',
    title: 'Нет побочных явлений',
    text: 'При внутривенном введении препарата все необходимые вещества попадают в кровоток',
  },
]

export const mainInfusions: types.InfusionType[] = [
  {
    id: 1,
    name: 'Золушка',
    description:
      'Тормозит процессы старения организма, снижает количество морщин и предотвращает появление новых. Насыщение и улучшение качества кожи, стимуляция регенерации.',
    cost: 4500,
    img: '/assets/cinderella.jpeg',
  },
  {
    id: 2,
    name: 'Экспресс-похудение',
    description:
      'Нормализуют процессы метаболизма и энергетический обмен в работе организма. Влияют на состояние нервной системы, умственную деятельность, настроение и сон.',
    cost: 3500,
    img: '/assets/losingWeight.jpeg',
  },
  {
    id: 3,
    name: 'Антистресс',
    description:
      'Комплекс для тех, кто находится в постоянном стрессе, пациентам с перебоями в работе сердца,а также тем, кого мучает бессонница и тревожные состояния.',
    cost: 3500,
    img: '/assets/antistress.jpeg',
  },
  {
    id: 4,
    name: 'Железо',
    description:
      'Восстановление и нормализация работы иммунной системы и устранение последствий заболевания. Комплекс витаминов и микроэлементов.',
    cost: 5000,
    img: '/assets/ferrum.jpeg',
  },
  {
    id: 5,
    name: 'Доброе утро',
    description:
      'Восстанавливает баланс микроэлементов, регулирует метаболизм. Оказывает общеукрепляющее и тонизирующее действие.',
    cost: 4000,
    img: '/assets/gm.jpeg',
  },
  {
    id: 6,
    name: 'Поддержка печени',
    description:
      'Пробуждение внутренних ресурсов организма, устойчивость к физическим нагрузкам. Заряд бодрости, повышение уровня активности.',
    cost: 3500,
    img: '/assets/liver.jpeg',
  },
]

export const infusionInsructions: types.StepType[] = [
  {
    number: '01',
    title: 'Запись на приём',
    text: 'Выберите удобное время и запишитесь по телефону, в мессенджере или через заявку на сайте. Наш менеджер свяжется с вами для уточнения деталей.',
  },
  {
    number: '02',
    title: 'Консультация и обследование',
    text: 'Врач проведет консультацию, направит на анализы (их можно сдать у нас) и составит персональную программу лечения.',
  },
  {
    number: '03',
    title: 'Процедура и наблюдение',
    text: 'Одна процедура длится 30-60 минут. Курс включает 5+ процедур с интервалом 2-7 дней. На протяжении всего курса вы будете находиться под наблюдением персонального врача.',
  },
]

export const feedbacks = [
  {
    name: 'Имя Фамилия 1',
    rate: 3,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in in voluptate velit esse cillum dolore eu nulla.',
  },
  {
    name: 'Имя Фамилия 2',
    rate: 5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu nulla. ostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu nulla.',
  },
  {
    name: 'Имя Фамилия 3',
    rate: 3,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu nulla. ostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  { name: 'Имя Фамилия 4', rate: 3, text: 'Отзыв 4...' },
  { name: 'Имя Фамилия 5', rate: 3, text: 'Отзыв 5...' },
  { name: 'Имя Фамилия 6', rate: 3, text: 'Отзыв 6...' },
  { name: 'Имя Фамилия 7', rate: 3, text: 'Отзыв 7...' },
  { name: 'Имя Фамилия 8', rate: 3, text: 'Отзыв 8...' },
]

// КАПЕЛЬНИЦЫ
export const infusions: types.InfusionsType = {
  'Все капельницы': [
    {
      id: 1,
      name: 'Все',
      description:
        'Тормозит процессы старения организма, снижает количество морщин и предотвращает появление новых. Насыщение и улучшение качества кожи, стимуляция регенерации.',
      cost: 4500,
      img: '/assets/cinderella.jpeg',
    },
    {
      id: 2,
      name: 'Экспресс-похудение',
      description:
        'Нормализуют процессы метаболизма и энергетический обмен в работе организма. Влияют на состояние нервной системы, умственную деятельность, настроение и сон.',
      cost: 3500,
      img: '/assets/losingWeight.jpeg',
    },
    {
      id: 3,
      name: 'Антистресс',
      description:
        'Комплекс для тех, кто находится в постоянном стрессе, пациентам с перебоями в работе сердца,а также тем, кого мучает бессонница и тревожные состояния.',
      cost: 3500,
      img: '/assets/antistress.jpeg',
    },
    {
      id: 4,
      name: 'Железо',
      description:
        'Восстановление и нормализация работы иммунной системы и устранение последствий заболевания. Комплекс витаминов и микроэлементов.',
      cost: 5000,
      img: '/assets/ferrum.jpeg',
    },
    {
      id: 5,
      name: 'Доброе утро',
      description:
        'Восстанавливает баланс микроэлементов, регулирует метаболизм. Оказывает общеукрепляющее и тонизирующее действие.',
      cost: 4000,
      img: '/assets/gm.jpeg',
    },
    {
      id: 6,
      name: 'Поддержка печени',
      description:
        'Пробуждение внутренних ресурсов организма, устойчивость к физическим нагрузкам. Заряд бодрости, повышение уровня активности.',
      cost: 3500,
      img: '/assets/liver.jpeg',
    },
  ],
  Похудение: [
    {
      id: 1,
      name: 'Похудение',
      description:
        'Тормозит процессы старения организма, снижает количество морщин и предотвращает появление новых. Насыщение и улучшение качества кожи, стимуляция регенерации.',
      cost: 4500,
      img: '/assets/cinderella.jpeg',
    },
    {
      id: 2,
      name: 'Экспресс-похудение',
      description:
        'Нормализуют процессы метаболизма и энергетический обмен в работе организма. Влияют на состояние нервной системы, умственную деятельность, настроение и сон.',
      cost: 3500,
      img: '/assets/losingWeight.jpeg',
    },
    {
      id: 3,
      name: 'Антистресс',
      description:
        'Комплекс для тех, кто находится в постоянном стрессе, пациентам с перебоями в работе сердца,а также тем, кого мучает бессонница и тревожные состояния.',
      cost: 3500,
      img: '/assets/antistress.jpeg',
    },
    {
      id: 4,
      name: 'Железо',
      description:
        'Восстановление и нормализация работы иммунной системы и устранение последствий заболевания. Комплекс витаминов и микроэлементов.',
      cost: 5000,
      img: '/assets/ferrum.jpeg',
    },
    {
      id: 5,
      name: 'Доброе утро',
      description:
        'Восстанавливает баланс микроэлементов, регулирует метаболизм. Оказывает общеукрепляющее и тонизирующее действие.',
      cost: 4000,
      img: '/assets/gm.jpeg',
    },
    {
      id: 6,
      name: 'Поддержка печени',
      description:
        'Пробуждение внутренних ресурсов организма, устойчивость к физическим нагрузкам. Заряд бодрости, повышение уровня активности.',
      cost: 3500,
      img: '/assets/liver.jpeg',
    },
  ],
  Омоложение: [
    {
      id: 1,
      name: 'Омоложение',
      description:
        'Тормозит процессы старения организма, снижает количество морщин и предотвращает появление новых. Насыщение и улучшение качества кожи, стимуляция регенерации.',
      cost: 4500,
      img: '/assets/cinderella.jpeg',
    },
    {
      id: 2,
      name: 'Экспресс-похудение',
      description:
        'Нормализуют процессы метаболизма и энергетический обмен в работе организма. Влияют на состояние нервной системы, умственную деятельность, настроение и сон.',
      cost: 3500,
      img: '/assets/losingWeight.jpeg',
    },
    {
      id: 3,
      name: 'Антистресс',
      description:
        'Комплекс для тех, кто находится в постоянном стрессе, пациентам с перебоями в работе сердца,а также тем, кого мучает бессонница и тревожные состояния.',
      cost: 3500,
      img: '/assets/antistress.jpeg',
    },
    {
      id: 4,
      name: 'Железо',
      description:
        'Восстановление и нормализация работы иммунной системы и устранение последствий заболевания. Комплекс витаминов и микроэлементов.',
      cost: 5000,
      img: '/assets/ferrum.jpeg',
    },
    {
      id: 5,
      name: 'Доброе утро',
      description:
        'Восстанавливает баланс микроэлементов, регулирует метаболизм. Оказывает общеукрепляющее и тонизирующее действие.',
      cost: 4000,
      img: '/assets/gm.jpeg',
    },
    {
      id: 6,
      name: 'Поддержка печени',
      description:
        'Пробуждение внутренних ресурсов организма, устойчивость к физическим нагрузкам. Заряд бодрости, повышение уровня активности.',
      cost: 3500,
      img: '/assets/liver.jpeg',
    },
  ],
  'Поддержка здоровья': [
    {
      id: 1,
      name: 'Поддержка',
      description:
        'Тормозит процессы старения организма, снижает количество морщин и предотвращает появление новых. Насыщение и улучшение качества кожи, стимуляция регенерации.',
      cost: 4500,
      img: '/assets/cinderella.jpeg',
    },
    {
      id: 2,
      name: 'Экспресс-похудение',
      description:
        'Нормализуют процессы метаболизма и энергетический обмен в работе организма. Влияют на состояние нервной системы, умственную деятельность, настроение и сон.',
      cost: 3500,
      img: '/assets/losingWeight.jpeg',
    },
    {
      id: 3,
      name: 'Антистресс',
      description:
        'Комплекс для тех, кто находится в постоянном стрессе, пациентам с перебоями в работе сердца,а также тем, кого мучает бессонница и тревожные состояния.',
      cost: 3500,
      img: '/assets/antistress.jpeg',
    },
    {
      id: 4,
      name: 'Железо',
      description:
        'Восстановление и нормализация работы иммунной системы и устранение последствий заболевания. Комплекс витаминов и микроэлементов.',
      cost: 5000,
      img: '/assets/ferrum.jpeg',
    },
    {
      id: 5,
      name: 'Доброе утро',
      description:
        'Восстанавливает баланс микроэлементов, регулирует метаболизм. Оказывает общеукрепляющее и тонизирующее действие.',
      cost: 4000,
      img: '/assets/gm.jpeg',
    },
    {
      id: 6,
      name: 'Поддержка печени',
      description:
        'Пробуждение внутренних ресурсов организма, устойчивость к физическим нагрузкам. Заряд бодрости, повышение уровня активности.',
      cost: 3500,
      img: '/assets/liver.jpeg',
    },
  ],
  'Насыщение организма': [
    {
      id: 1,
      name: 'Насыщение организма',
      description:
        'Тормозит процессы старения организма, снижает количество морщин и предотвращает появление новых. Насыщение и улучшение качества кожи, стимуляция регенерации.',
      cost: 4500,
      img: '/assets/cinderella.jpeg',
    },
    {
      id: 2,
      name: 'Экспресс-похудение',
      description:
        'Нормализуют процессы метаболизма и энергетический обмен в работе организма. Влияют на состояние нервной системы, умственную деятельность, настроение и сон.',
      cost: 3500,
      img: '/assets/losingWeight.jpeg',
    },
    {
      id: 3,
      name: 'Антистресс',
      description:
        'Комплекс для тех, кто находится в постоянном стрессе, пациентам с перебоями в работе сердца,а также тем, кого мучает бессонница и тревожные состояния.',
      cost: 3500,
      img: '/assets/antistress.jpeg',
    },
    {
      id: 4,
      name: 'Железо',
      description:
        'Восстановление и нормализация работы иммунной системы и устранение последствий заболевания. Комплекс витаминов и микроэлементов.',
      cost: 5000,
      img: '/assets/ferrum.jpeg',
    },
    {
      id: 5,
      name: 'Доброе утро',
      description:
        'Восстанавливает баланс микроэлементов, регулирует метаболизм. Оказывает общеукрепляющее и тонизирующее действие.',
      cost: 4000,
      img: '/assets/gm.jpeg',
    },
    {
      id: 6,
      name: 'Поддержка печени',
      description:
        'Пробуждение внутренних ресурсов организма, устойчивость к физическим нагрузкам. Заряд бодрости, повышение уровня активности.',
      cost: 3500,
      img: '/assets/liver.jpeg',
    },
  ],
}

export const filters = ['Все капельницы', 'Похудение', 'Омоложение', 'Поддержка здоровья', 'Насыщение организма']

// ФУТЕР

export const contactsInfo: types.ContactInfoType[] = [
  { img: '/assets/addressIcon.png', title: 'Адрес', text: 'г. Оренбург, ул. Ульянова, д. 69, 1 этаж', link: getLocationRoute() },
  { img: '/assets/phoneIcon.png', title: 'Телефон', text: '8 995 275-75-75', link: socialMedia.phone },
  { img: '/assets/emailIcon.png', title: 'Почта', text: 'mail@cleanoren.ru', link: socialMedia.email },
]

export const formInputs: types.FormInputType[] = [
  { label: 'Имя *', placeholder: 'Введите имя' },
  { label: 'Телефон *', placeholder: 'Введите телефон' },
  { label: 'Вопрос', placeholder: 'Введите вопрос' },
]

// КОНТАКТЫ
export const feedbackInputs: types.FormInputType[] = [
  { label: 'Имя *', placeholder: 'Введите имя' },
  { label: 'Фамилия *', placeholder: 'Введите фамилию' },
  { label: 'Телефон', placeholder: 'Введите телефон' },
  { label: 'Алиас', placeholder: 'Введите телеграм алиас' },
  { label: 'Отзыв', placeholder: 'Введите отзыв' },
]

export const specialists: types.SpecialistType[] = [
  { img: '/assets/specialist.png', name: 'Фамилия Имя Отчество', profession: 'Специальность', experience: '2-5 года' },
  { img: '/assets/specialist.png', name: 'Фамилия Имя Отчество', profession: 'Специальность', experience: '2-5 года' },
  { img: '/assets/specialist.png', name: 'Фамилия Имя Отчество', profession: 'Специальность', experience: '2-5 года' },
  { img: '/assets/specialist.png', name: 'Фамилия Имя Отчество', profession: 'Специальность', experience: '2-5 года' },
  { img: '/assets/specialist.png', name: 'Фамилия Имя Отчество', profession: 'Специальность', experience: '2-5 года' },
  { img: '/assets/specialist.png', name: 'Фамилия Имя Отчество', profession: 'Специальность', experience: '2-5 года' },
  { img: '/assets/specialist.png', name: 'Фамилия Имя Отчество', profession: 'Специальность', experience: '2-5 года' },
  { img: '/assets/specialist.png', name: 'Фамилия Имя Отчество', profession: 'Специальность', experience: '2-5 года' },
  { img: '/assets/specialist.png', name: 'Фамилия Имя Отчество', profession: 'Специальность', experience: '2-5 года' },
  { img: '/assets/specialist.png', name: 'Фамилия Имя Отчество', profession: 'Специальность', experience: '2-5 года' },
]


export const galleryImages: string[] = [
  '/assets/photo1.png',
  '/assets/photo2.png',
  '/assets/photo3.png',
  '/assets/photo4.png',
  '/assets/photo5.png',
]

// Лицензия
export const license: string[] = ['/assets/license1.png', '/assets/license2.png']
