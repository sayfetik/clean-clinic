import { TextInput } from '@mantine/core'
import { contacts } from '../../../lib/data'
import ApplyButton from '../ApplyButton'
import css from './index.module.scss'

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
          <TextInput value={item.link} />
        </div>
      ))}
      <ApplyButton onClick={applyChanges} />
    </div>
  )
}

export default ContactContent
