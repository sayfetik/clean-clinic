import * as types from './types'

export const emptyInfusionInstructions: types.InfusionInstructionsType = {
  title: '',
  answer: '',
  steps: [],
}
export const emptyMainPage: types.MainPageType = {
  title: '',
  subtitle: [],
  weWork: {
    title: '',
    text: '',
    numSpecialists: 0,
    numPatients: 0,
  },
  additionalText: '',
  advantages: [],
  form: { title: '' },
  whyInfusions: {
    title: '',
    answer: '',
    text1: '',
    text2: '',
  },
  whiteCards: [],
  problemImage: '',
  problemTitle: '',
  problems: [],
  infusionInstructions: {
    title: '',
    answer: '',
    steps: [],
  },
  infusions: {
    title: '',
    text: '',
    infusions: [],
  },
  services: {
    id: 0,
    tittle: '',
    services: [],
  },
  faq: {
    id: 0,
    faqTitle: '',
    faqs: [],
  },
  feedback: [],
}

export const emptyAbout: types.AboutPageType = {
  title: '',
  text1: '',
  text2: '',
  specialists: [],
}

export const emptyContacts: types.ContactsType = {
  title: '',
  text: '',
  feedbackFormTitle: '',
  feedbackFormText: '',
  workHours: '',
  smallAddress: '',
  contactsInfo: [],
  socialMediaLinks: {
    telegram: '',
    email: '',
    vkontakte: '',
    whatsup: '',
    phone: '',
    location: '',
  },
}

export const emptyCryotherapy: types.CryotherapyType = {
  id: 0,
  title: '',
  img: '',
  whatItIsTitle: '',
  whatItIsText: '',
  indicationsTitle: '',
  indications: [],
  contraindicationsTitle: '',
  contraindications: [],
  procedureTitle: '',
  procedureText: '',
  servicesTitle: '',
  services: [],
}

export const emptyMassage: types.MassageType = {
  title: '',
  img: '',
  whatItIsTitle: '',
  whatItIsText: '',
  aboutTitle: '',
  about: [],
  advantagesTitle: '',
  advantages: [],
  servicesTitle: '',
  services: [],
}

export const emptyPlasmolifting: types.PlasmoliftingType = {
  title: '',
  img: '',
  whatItIsTitle: '',
  whatItIsText: '',
  indicationsTitle: '',
  indications: [],
  contraindicationsTitle: '',
  contraindications: [],
  servicesTitle: '',
  services: [],
}

export const emptyAnalyzes: types.AnalyzesType = {
  title: '',
  img: '',
  paragraph1: '',
  paragraph2: '',
  paragraph3: '',
  procedureTitle: '',
  procedureText: '',
  servicesTitle: '',
  services: [],
}

export const emptySolarium: types.SolariumType = {
  id: 0,
  title: '',
  img: '',
  whatItIsTitle: '',
  whatItIsText: '',
  paragraphTitle: '',
  paragraph: [],
  servicesTitle: '',
  services: [],
}

export const emptyErrorPage: types.ErrorPageType = {
  id: 1,
  title: '',
  text: '',
}

export const emptySuccessPage: types.SuccessPageType = {
  id: 1,
  title: '',
  text: '',
}

export const emptyHomeVisit: types.HomeVisitType = {
  id: 0,
  title: '',
  img: '',
  whatItIsTitle: '',
  paragraph1: '',
  paragraph2: '',
  paragraph3: '',
  servicesTitle: '',
  services: [],
}
