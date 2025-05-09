export type InfusionType = {
  id: number
  name: string
  isDescription?: boolean
  description: string
  cost: number
  img: string | File
  isNew?: boolean
}
export type CardType = { id: number; name: string; bullets?: string[]; cost: number; img: string | File }
export type AdvantageType = { id: number; title: string; text: string }
export type WhiteCardType = { id: number; imagePath: string | File; title: string; text: string }
export type StepType = { number: string; title: string; text: string }
export type FeedbackType = { name: string; rate: number; text: string }
export type ContactInfoType = { img: string; title: string; text: string; link: string }
export type FormInputType = { label: string; placeholder: string }
export type InfusionsType = { [key: string]: InfusionType[] }
export type ChosenOption = { chosenId: number; setChosenId: React.Dispatch<React.SetStateAction<number>> }
export type SpecialistType = { id: number; img: string | File; name: string; profession: string; experience: string }
export type FAQItem = { question: string; answer: string | null }
export type InfusionInstructionsType = {
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
  title: string
  subtitle: string[]
  weWork: {
    title: string
    text: string
    numSpecialists: number
    numPatients: number
  }
  additionalText: string
  advantages: AdvantageType[]
  form: { title: string }
  whyInfusions: {
    title: string
    answer: string
    text1: string
    text2: string
  }
  whiteCards: WhiteCardType[]
  problemImage: string | File
  problemTitle: string
  problems: { title: string; text: string }[]
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
  feedback: { name: string; rate: number; text: string }[]
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
  services: {
    id: number
    name: string
    description: string
    cost: number
    img: string | File
    isNew?: boolean
  }[]
}

export type AnalyzesType = {
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

export type SolariumType = {
  id: number
  title: string
  img: string | File
  whatItIsTitle: string
  whatItIsText: string
  paragraphTitle: string
  paragraph: string[]
  servicesTitle: string
  services: {
    id: number
    name: string
    cost: number
    img: string | File
  }[]
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
