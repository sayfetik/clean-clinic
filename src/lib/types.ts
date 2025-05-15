export type InfusionInfoType = {
  id: string
  name: string
  price: number
  imagePath: string | File
  duration: string
  description: string[]
  results: string[]
  indications: string[]
  contradictions: string[]
  isNew?: boolean
  ivsCategories: string
}

export type InfusionType = {
  id: any | string
  infusionId: string
  ivsInfo: InfusionInfoType
}
export type InfusionCategoryType = {
  category: string
  infusions: InfusionType[]
}
export type DocumentType = {
  [x: string]: any
  id: number
  title: string
  img: string | File
}
export type CardType = { id: number; name: string; bullets?: string[]; cost: number; img: string | File }
export type AdvantageType = { id: number; title: string; text: string }
export type WhiteCardType = { id: number; imagePath: string | File; title: string; text: string }
export type StepType = { number: string; title: string; text: string }
export type FeedbackType = { id: number; name: string; rate: number; text: string }
export type ContactInfoType = { img: string; title: string; text: string; link: string }
export type FormInputType = { label: string; placeholder: string }
export type InfusionsType = { [key: string]: InfusionType[] }
export type ChosenOption = { chosenId: number; setChosenId: React.Dispatch<React.SetStateAction<number>> }
export type SpecialistType = {
  id: number
  image: string | File
  name: string
  profession: string
  experience: string
  isNew?: boolean
}
export type FAQItem = { question: string; answer: string | null }
export type InfusionInstructionsType = {
  id: number
  title: string
  answer: string
  steps: { number: string; title: string; text: string }[]
}

export type AnalyzesServiceType = {
  id: number
  name: string
  bullets: string[]
  cost: number
  img: string | File
  isNew?: boolean
}

export type CryoServiceType = {
  id: number
  name: string
  cost: number
  img: string | File
  isNew?: boolean
}

export type HomeVisitServiceType = {
  id: number
  name: string
  cost: number
  img: string | File
  isNew?: boolean
}

export type MainPageType = {
  id: number
  title: string
  subtitle: string[]
  weWork: {
    id: number
    title: string
    img: string | File
    text: string
    numSpecialists: number
    numPatients: number
  }
  additionalText: string
  advantages: AdvantageType[]
  form: { id: number; title: string }
  whyInfusions: {
    id: number
    title: string
    answer: string
    text1: string
    text2: string
  }
  whiteCards: WhiteCardType[]
  problemImage: string | File
  problemTitle: string
  problems: { id: number; title: string; text: string }[]
  infusionInstructions: InfusionInstructionsType
  infusions: {
    title: string
    text: string
    infusions: { id: number; name: string; description: string; cost: number; img: string }[]
  }
  services: {
    id: number
    tittle: string
    services: { id: number; name: string; img: string }[]
  }
  faq: {
    id: number
    faqTitle: string
    faqs: { id: number; question: string; answer: string }[]
  }
  feedback: FeedbackType[]
}

export type AboutPageType = {
  title: string
  text1: string
  text2: string
  specialists: SpecialistType[]
}

export type ContactsType = {
  title: string
  text: string
  feedbackFormTitle: string
  feedbackFormText: string
  workHours: string
  smallAddress: string
  contactsInfo: {
    id: number
    title: string
    img: string
    text: string
  }[]
  socialMediaLinks: {
    telegram: string
    email: string
    vkontakte: string
    whatsup: string
    phone: string
    location: string
  }
}

export type CryotherapyType = {
  id: number
  title: string
  img: string | File
  whatItIsTitle: string
  whatItIsText: string
  indicationsTitle: string
  indications: string[]
  contraindicationsTitle: string
  contraindications: string[]
  procedureTitle: string
  procedureText: string
  servicesTitle: string
  services: CryoServiceType[]
}

export type MassageServiceType = {
  id: number
  name: string
  cost: number
  bullets: string[]
  img: string | File
  isNew?: boolean
}

export type MassageType = {
  title: string
  img: string | File
  whatItIsTitle: string
  whatItIsText: string
  aboutTitle: string
  about: string[]
  advantagesTitle: string
  advantages: string[]
  servicesTitle: string
  services: MassageServiceType[]
}

export type PlasmoliftingServiceType = {
  id: number
  name: string
  description: string
  cost: number
  img: string | File
  isNew?: boolean
}

export type PlasmoliftingType = {
  id: number
  title: string
  img: string | File
  whatItIsTitle: string
  whatItIsText: string
  indicationsTitle: string
  indications: string[]
  contraindicationsTitle: string
  contraindications: string[]
  servicesTitle: string
  services: PlasmoliftingServiceType[]
}

export type AnalyzesType = {
  id: number
  title: string
  img: string | File
  paragraph1: string
  paragraph2: string
  paragraph3: string
  procedureTitle: string
  procedureText: string
  servicesTitle: string
  services: AnalyzesServiceType[]
}

export type SolariumServiceType = {
  id: number
  name: string
  cost: number
  img: string | File
  isNew?: boolean
}

export type SolariumType = {
  id: number
  title: string
  img: string | File
  whatItIsTitle: string
  whatItIsText: string
  paragraphTitle: string
  paragraph: string[]
  servicesTitle: string
  services: SolariumServiceType[]
}

export type ErrorPageType = {
  id: number
  title: string
  text: string
}

export type SuccessPageType = {
  id: number
  title: string
  text: string
}

export type HomeVisitType = {
  id: number
  title: string
  img: string | File
  whatItIsTitle: string
  paragraph1: string
  paragraph2: string
  paragraph3: string
  servicesTitle: string
  services: HomeVisitServiceType[]
}

export type InfusionCatalogType = {
  id: string | number
  title: string
  img: string | File
  infusionsByCategory: InfusionCategoryType[]
  whatItIsTitle: string
  whatItIsText1: string
  whatItIsText2: string
  servicesTitle: string
  advantagesTitle: string
  advantages: string[]
  advantagesText: string
  howToChooseCard: {
    id: number
    title: string
    additionalText: string
    text: string
  }
}
