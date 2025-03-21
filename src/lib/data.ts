import * as types from './types'

// ендпоинт для получения и изменения главных капельниц
export const mainInfusions = [
  'Золушка',
  'Экспресс-похудение',
  'Антистресс',
  'Железо',
  'Доброе утро',
  'Поддержка печени',
  'Капельница',
]

// ендпоинт для получения картинки по id капельницы

export const mainImage = '/assets/mainInfusions.png'
export const patientImage = '/assets/patient.png'
// ендпоинты для изменения и получения главной страницы, пока так:
export const main = {
  title: 'Клиника инфузионной терапии Clean Clinic в Оренбурге',
  subtitle: 'Капельницы для красоты и здоровья',
  weWork: {
    title: 'Мы работаем ради Вашего здоровья',
    text: 'Концепция клиники — сделать доступными как можно большему количеству людей научные возможности по улучшению качества и продления активной жизни.',
    numSpecialists: 3832,
    numPatients: 38750,
  },
  advantages: [
    { title: 'Безопаность', text: 'Проверка анализов перед назначением' },
    { title: 'Качество', text: 'Всегда качественное обслуживание' },
    { title: 'Опыт', text: 'Врачи-терапевты с практикой более 20 лет' },
    { title: 'Подход', text: 'Индивидуальные курсы капельниц для каждого' },
  ],
  form: {
    title: 'Начни свой путь прямо сейчас!',
    text: 'Перезвоним и ответим на вопросы',
  },
  whyInfusions: {
    title: 'IV-терапия',
    answer: 'Подарите себе красоту и легкость',
    text: 'Капельная или инфузионная терапия — метод лечения, основанный на прямом введении в кровоток различных коктейлей медикаментов, витаминов и микроэлементов, с целью быстрого достижения лучших показателей для вашего здоровья.',
  },
  whiteCards: [
    {
      id: 1,
      img: '/assets/heart.png',
      title: 'Мгновенные результаты',
      text: '70% наших пациентов отмечают улучшение самочувствия и энергии после 1 капельницы',
    },
    {
      id: 2,
      img: '/assets/injection.png',
      title: 'На 80% эффективнее',
      text: 'Эффективнее других способов терапии при лечении и профилактике любых заболеваний',
    },
    {
      id: 3,
      img: '/assets/capsule.png',
      title: 'Нет побочных явлений',
      text: 'При внутривенном введении препарата все необходимые вещества попадают в кровоток',
    },
  ],
  problemImage: '/assets/doctors.png',
  problemTitle: 'Вы забудете о проблемах',
  problems: [
    {title: 'Lorem ipsum dolor', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'},
    {title: 'Lorem ipsum dolor', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'},
    {title: 'Lorem ipsum dolor', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'},
    {title: 'Lorem ipsum dolor', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'},
    {title: 'Lorem ipsum dolor', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'},
    {title: 'Lorem ipsum dolor', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'},
  ],
  infusionInstructions: {
    title: 'Как пройти курс капельниц?',
    answer: 'Всё очень просто!',
    steps: [
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
    ],
  },
  infusions: {
    title: 'Наши курсы капельниц',
    text: 'Все препараты, входящие в состав капельниц, имеют регистрационные удостоверения и разрешены к использованию на территории РФ. Перед назначением курса капельниц, мы подготавливаем индивидуальную программу на основе результатов ваших анализов.',
    infusions: [
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
    ],
  },
  feedback: [
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
  ],
}

// ендпоинты для изменения и получения страницы капельниц, пока так:
export const infusionCatalog: {
  title: string
  img: string
  infusions: Record<string, types.InfusionType[]>
  whatItIsTitle: string
  whatItIsText: string
  advantagesTitle: string
  advantagesText: string[]
} = {
  title: 'IV-терапия',
  img: '/assets/infusionFerrum.png',
  whatItIsTitle: 'Что такое IV-терапия?',
  whatItIsText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu nulla.',
  advantagesTitle: 'Преимущества',
  advantagesText: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
    'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
    'voluptate velit esse cillum dolore eu nulla. ostrud exercitation ullamco laboris',
    'ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit'
  ],
  infusions: {
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
  },
}

// ендпоинты для изменения и получения страницы о клинике, пока так:
export const about = {
  title: 'Инфузионная терапия',
  text1:
    'Капельная или инфузионная терапия — метод лечения, основанный на прямом введении в кровоток различных коктейлей медикаментов, витаминов и микроэлементов, с целью быстрого достижения лучших показателей для вашего здоровья.',
  text2:
    'IV-терапия только лечит различные заболевания но также используется для профилактики и общего оздоровления организма. Она помогает нормализовать водно-солевой обмен, очищать организм от токсинов и укреплять иммунитет. Индивидуальный подход к составлению капельниц позволяет каждому пациенту получить максимальную пользу от лечения.',
  specialists: [
    {
      img: '/assets/specialist.png',
      name: 'Фамилия Имя Отчество',
      profession: 'Специальность',
      experience: '2-5 года',
    },
    {
      img: '/assets/specialist.png',
      name: 'Фамилия Имя Отчество',
      profession: 'Специальность',
      experience: '2-5 года',
    },
    {
      img: '/assets/specialist.png',
      name: 'Фамилия Имя Отчество',
      profession: 'Специальность',
      experience: '2-5 года',
    },
    {
      img: '/assets/specialist.png',
      name: 'Фамилия Имя Отчество',
      profession: 'Специальность',
      experience: '2-5 года',
    },
    {
      img: '/assets/specialist.png',
      name: 'Фамилия Имя Отчество',
      profession: 'Специальность',
      experience: '2-5 года',
    },
    {
      img: '/assets/specialist.png',
      name: 'Фамилия Имя Отчество',
      profession: 'Специальность',
      experience: '2-5 года',
    },
    {
      img: '/assets/specialist.png',
      name: 'Фамилия Имя Отчество',
      profession: 'Специальность',
      experience: '2-5 года',
    },
    {
      img: '/assets/specialist.png',
      name: 'Фамилия Имя Отчество',
      profession: 'Специальность',
      experience: '2-5 года',
    },
    {
      img: '/assets/specialist.png',
      name: 'Фамилия Имя Отчество',
      profession: 'Специальность',
      experience: '2-5 года',
    },
    {
      img: '/assets/specialist.png',
      name: 'Фамилия Имя Отчество',
      profession: 'Специальность',
      experience: '2-5 года',
    },
  ],
}

// ендпоинты для получения фото специалистов

// ендопинт для получения видео-экскурсии

// ендпоинты для получения фото для галереи, пока так:
export const galleryImages: string[] = [
  '/assets/photo1.png',
  '/assets/photo2.png',
  '/assets/photo3.png',
  '/assets/photo4.png',
  '/assets/photo5.png',
]

// ендпоинты для получения лицензии, пока так:
export const license: string[] = ['/assets/license1.png', '/assets/license2.png']

// ендпоинты для получения и изменения документов клиники

// ендпоинты для получения и изменения страницы контактов
export const contacts = {
  title: 'Контакты',
  text: 'Свяжитесь с нами любым способом',
  feedbackFormTitle: 'Оставьте отзыв',
  feedbackFormText: 'Помогите нам стать лучше!',
  workHours: 'пн-пт 8-20 сб, вс 9-15',
  smallAddress: 'г. Оренбург, ул. Ульянова, д. 69',
  contactsInfo: [
    {
      img: '/assets/addressIcon.png',
      title: 'Адрес',
      text: 'г. Оренбург, ул. Ульянова, д. 69, 1 этаж',
    },
    { img: '/assets/phoneIcon.png', title: 'Телефон', text: '8 995 275-75-75' },
    { img: '/assets/emailIcon.png', title: 'Почта', text: 'mail@cleanoren.ru' },
  ],
  socialMediaLinks:  {
    telegram: 'https://t.me/+XhpoFM-voaA4Y2Yy',
    email: 'mailto:welcome@clean-clinic.ru',
    vkontakte: 'https://vk.com/franchiseclean_clinic',
    whatsup: 'https://api.whatsapp.com/send/?phone=79777865133&text&type=phone_number&app_absent=0',
    phone: 'tel:+79952757575',
    location: 'https://yandex.ru/maps/org/klin_klinik/136753931896/?ll=55.136984%2C51.778158&mode=search&sll=55.136984%2C51.778158&sspn=0.022058%2C0.009916&text=clean%20clinic%20оренбург&z=16'
  }
}

export const footer = {
  promotionsAndOffersTitle: 'Акции и предложения',
  promotionsAndOffersText: 'Узнавайте первыми в нашем телеграм-канале',
  ooo: 'ООО "Гармония"',
  licenseNo: 'Л041-01022-56/01056435;',
  inn: 'ИНН/КПП - 5610249037/561001001',
  bootomSection: '© 2011-2025 • Капельницы в Оренбурге, инфузионная терапия',
  telegramChanellLink: ''
}

export const formInputs: types.FormInputType[] = [
  { label: 'Имя *', placeholder: 'Введите имя' },
  { label: 'Телефон *', placeholder: 'Введите телефон' },
  { label: 'Вопрос', placeholder: 'Введите вопрос' },
]

export const feedbackInputs: types.FormInputType[] = [
  { label: 'Имя *', placeholder: 'Введите имя' },
  { label: 'Фамилия *', placeholder: 'Введите фамилию' },
  { label: 'Телефон', placeholder: 'Введите телефон' },
  { label: 'Алиас', placeholder: 'Введите телеграм алиас' },
  { label: 'Отзыв', placeholder: 'Введите отзыв' },
]

export const InfusionPage = {
  id: 1,
  name: 'Золушка',
  cost: 4500,
  img: '/assets/infusion.png',
  duration: '1ч 30 мин',
  smallDescription: 'Тормозит процессы старения организма, снижает количество морщин и предотвращает появление новых. Насыщение и улучшение качества кожи, стимуляция регенерации.',
  description: [
    'Тормозит процессы старения организма, снижает количество морщин и предотвращает появление новых. Насыщение и улучшение качества кожи, стимуляция регенерации.',
    'Капельница «Золушка»  оказывает общий омолаживающий эффект на организм. Прежде всего, такая процедура помогает сохранить и восстановить эластичность кожи, устранить нежелательную пигментацию и постакне (патологические изменения на коже после угревой сыпи).',
    'Усиленная формула (сочетает в себе органические кислоты, пептиды и витамины) для оздоровления, очищения и омоложения кожи лица. Капельница, состав которой разработан специально для питания кожи, разглаживания мелких морщин, леченияи профилактики пигментации, улучшения цвета лица, отбеливания кожи. После курса капельниц у вас будет здоровая упругая кожа без пигментации, загрязнений и прочих индивидуальных проблем.',
    'Капельницы для омоложения кожи воздействуют на внутриклеточные процессы, освобождая ткани от загрязнений, восстанавливая обменные процессы, запуская естественную выработку белка. ',
  ],
  results: ['Омолаживает, улучшает цвет и тонус кожи', 'Повышает эластичность', 'Устраняет пигментацию'],
  indications: ['Быстрое старение кожи', 'Курение'],
  contraindications: [
    'Беременность',
    'Хронические заболевания на стадии обострения',
    'Склонность к отёкам',
    'Онкологические заболевания',
  ],
}

export const ErrorPage = {
  title: 'Ошибка', text: 'Что-то пошло не так...'
}

export const SuccessPage = {
  title: 'Запись успешно создана', text: 'С вами свяжутся в течение дня'
}
