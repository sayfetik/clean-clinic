import { TextInput } from '@mantine/core'
import { isEqual } from 'lodash'
import { useState, useEffect } from 'react'
import * as contactsApi from '../../../api/ContactsAPI'
import { emptyContacts } from '../../../lib/empty'
import ApplyButton from '../ApplyButton'
import css from './index.module.scss'

const linkLabels = {
  Телефон: 'phone',
  Адрес: 'location',
  Почта: 'email',
} as const

const ContactContent: React.FC = () => {
  const [contacts, setContacts] = useState(emptyContacts)
  const [initialContacts, setInitialContacts] = useState(emptyContacts)

  useEffect(() => {
    const fetchData = async () => {
      const data = await contactsApi.getContacts()
      setContacts(data)
      setInitialContacts(data)
    }
    fetchData()
  }, [])

  const handleChange = (field: keyof typeof contacts) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setContacts((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleContactsInfoChange = (index: number, value: string) => {
    setContacts((prev) => {
      const contactsInfo = [...prev.contactsInfo]
      contactsInfo[index] = { ...contactsInfo[index], text: value }
      return { ...prev, contactsInfo }
    })
  }

  const handleSocialLinkChange = (key: keyof typeof contacts.socialMediaLinks, value: string) => {
    setContacts((prev) => ({
      ...prev,
      socialMediaLinks: { ...prev.socialMediaLinks, [key]: value },
    }))
  }

  const applyChanges = async () => {
    const current = {
      title: contacts.title,
      text: contacts.text,
      feedbackFormTitle: contacts.feedbackFormTitle,
      feedbackFormText: contacts.feedbackFormText,
      workHours: contacts.workHours,
      contactsInfo: contacts.contactsInfo.map((item) => ({
        id: item.id,
        title: item.title,
        img: item.img,
        text: item.text,
      })),
      smallAddress: contacts.smallAddress,
      socialMediaLinks: contacts.socialMediaLinks,
    }
    const initial = {
      title: initialContacts.title,
      text: initialContacts.text,
      feedbackFormTitle: initialContacts.feedbackFormTitle,
      feedbackFormText: initialContacts.feedbackFormText,
      workHours: initialContacts.workHours,
      contactsInfo: initialContacts.contactsInfo.map((item) => ({
        id: item.id,
        title: item.title,
        img: item.img,
        text: item.text,
      })),
      smallAddress: initialContacts.smallAddress,
      socialMediaLinks: initialContacts.socialMediaLinks,
    }

    if (isEqual(current, initial)) {
      return
    }

    await contactsApi.updateContacts(current)
    setInitialContacts(contacts)
  }

  return (
    <div className={css.tabContent}>
      <TextInput value={contacts.title} onChange={handleChange('title')} />
      <TextInput value={contacts.text} onChange={handleChange('text')} />
      <TextInput value={contacts.feedbackFormTitle} onChange={handleChange('feedbackFormTitle')} />
      <TextInput value={contacts.feedbackFormText} onChange={handleChange('feedbackFormText')} />
      <TextInput value={contacts.feedbackFormText} onChange={handleChange('smallAddress')} />
      {contacts.contactsInfo.map((item, index) => (
        <div key={index} className={css.contactsInfo}>
          <h4>{item.title}</h4>
          <TextInput value={item.text} onChange={(e) => handleContactsInfoChange(index, e.target.value)} />
          <TextInput
            value={contacts.socialMediaLinks[linkLabels[item.title as keyof typeof linkLabels]]}
            onChange={(e) => handleSocialLinkChange(linkLabels[item.title as keyof typeof linkLabels], e.target.value)}
          />
        </div>
      ))}

      <h4>Рабочие часы</h4>
      <TextInput value={contacts.workHours} onChange={handleChange('workHours')} />

      <div className="margin" />

      <h4>Соц сети</h4>
      <TextInput
        label="Телеграм"
        value={contacts.socialMediaLinks['telegram']}
        onChange={(e) => handleSocialLinkChange('telegram', e.target.value)}
      />
      <TextInput
        label="ВКонтакте"
        value={contacts.socialMediaLinks['vkontakte']}
        onChange={(e) => handleSocialLinkChange('vkontakte', e.target.value)}
      />
      <TextInput
        label="WhatsUp"
        value={contacts.socialMediaLinks['whatsup']}
        onChange={(e) => handleSocialLinkChange('whatsup', e.target.value)}
      />
      <ApplyButton onClick={applyChanges} />
    </div>
  )
}

export default ContactContent
