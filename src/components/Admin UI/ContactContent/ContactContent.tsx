import { TextInput } from '@mantine/core'
import { contacts } from '../../../lib/data'
import ApplyButton from '../ApplyButton'
import css from './index.module.scss'

const linkLabels = {
  'Телефон': 'phone',
  'Адрес': 'location',
  'Почта': 'email'
} as const

const ContactContent: React.FC = () => {
  const applyChanges = () => {}
  return (
    <div className={css.tabContent}>
      <TextInput value={contacts.title} />
      <TextInput value={contacts.text} />
      <TextInput value={contacts.feedbackFormTitle} />
      <TextInput value={contacts.feedbackFormText} />
      {contacts.contactsInfo.map((item, index) => (
        <div key={index} className={css.contactsInfo}>
          <h4>{item.title}</h4>
          <TextInput value={item.text} />
          <TextInput value={contacts.socialMediaLinks[linkLabels[item.title as keyof typeof linkLabels]]} />
        </div>
      ))}

      <h4>Рабочие часы</h4>
      <TextInput value={contacts.workHours} />

      <div className='margin' />

      <h4>Соц сети</h4>
      <TextInput label='Телеграм' value={contacts.socialMediaLinks['telegram']} />
      <TextInput label='ВКонтакте' value={contacts.socialMediaLinks['vkontakte']} />
      <TextInput label='WhatsUp' value={contacts.socialMediaLinks['whatsup']} />
      <ApplyButton onClick={applyChanges} />
    </div>
  )
}

export default ContactContent
