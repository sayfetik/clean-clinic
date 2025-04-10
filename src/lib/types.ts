export type InfusionType = { id: number; name: string; isDescription?: boolean; description: string; cost: number; img: string }
export type CardType = { id: number; name: string; bullets?: string[], cost: number; img: string }
export type AdvantageType = { title: string; text: string }
export type WhiteCardType = { img: string; title: string; text: string }
export type StepType = { number: string; title: string; text: string }
export type FeedbackType = { name: string; rate: number; text: string }
export type ContactInfoType = { img: string; title: string; text: string, link: string }
export type FormInputType = { label: string; placeholder: string }
export type InfusionsType = { [key: string]: InfusionType[] }
export type ChosenOption = { chosenId: number; setChosenId: React.Dispatch<React.SetStateAction<number>> }
export type SpecialistType = { img: string; name: string; profession: string; experience: string }
export type FAQItem = { question: string; answer: string | null }