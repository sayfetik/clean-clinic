export type InfusionType = {
  id: number
  name: string
  isDescription?: boolean
  description: string
  cost: number
  img: string
}
export type CardType = { id: number; name: string; bullets?: string[]; cost: number; img: string }
export type AdvantageType = { title: string; text: string }
export type WhiteCardType = { img: string; title: string; text: string }
export type StepType = { number: string; title: string; text: string }
export type FeedbackType = { name: string; rate: number; text: string }
export type ContactInfoType = { img: string; title: string; text: string; link: string }
export type FormInputType = { label: string; placeholder: string }
export type InfusionsType = { [key: string]: InfusionType[] }
export type ChosenOption = { chosenId: number; setChosenId: React.Dispatch<React.SetStateAction<number>> }
export type SpecialistType = { id: number; img: string | File; name: string; profession: string; experience: string }
export type FAQItem = { question: string; answer: string | null }

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
  advantages: { title: string; text: string }[]
  form: { title: string }
  whyInfusions: {
    title: string
    answer: string
    text1: string
    text2: string
  }
  whiteCards: { id: number; img: string; title: string; text: string }[]
  problemImage: string
  problemTitle: string
  problems: { title: string; text: string }[]
  infusionInstructions: {
    title: string
    answer: string
    steps: { number: string; title: string; text: string }[]
  }
  infusions: {
    title: string
    text: string
    infusions: { id: number; name: string; description: string; cost: number; img: string }[]
  }
  serviceTitle: string
  services: { name: string; img: string }[]
  faqTitle: string
  faqs: { question: string; answer: string }[]
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
  img: string
  whatItIsTitle: string
  whatItIsText: string
  indicationsTitle: string
  indications: string[]
  contraindicationsTitle: string
  contraindications: string[]
  procedureTitle: string
  procedureText: string
  servicesTitle: string
  services: {
    id: number
    name: string
    cost: number
    img: string
  }[]
}

export type MassageType = {
  title: string
  img: string
  whatItIsTitle: string
  whatItIsText: string
  aboutTitle: string
  about: string[]
  advantagesTitle: string
  advantages: string[]
  servicesTitle: string
  services: {
    id: number
    name: string
    cost: number
    bullets: string[]
    img: string
  }[]
}

export type PlasmoliftingType = {
  title: string
  img: string
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
    img: string
  }[]
}

export type AnalyzesType = {
  title: string
  img: string
  paragraph1: string
  paragraph2: string
  paragraph3: string
  procedureTitle: string
  procedureText: string
  servicesTitle: string
  services: {
    id: number
    name: string
    bullets: string[]
    cost: number
    img: string
  }[]
}

export type SolariumType = {
  id: number
  title: string
  img: string
  whatItIsTitle: string
  whatItIsText: string
  paragraphTitle: string
  paragraph: string[]
  servicesTitle: string
  services: {
    id: number
    name: string
    cost: number
    img: string
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
  title: string
  img: string
  whatItIsTitle: string
  paragraph1: string
  paragraph2: string
  paragraph3: string
  servicesTitle: string
  services: {
    id: number
    name: string
    cost: number
    img: string
  }[]
}
