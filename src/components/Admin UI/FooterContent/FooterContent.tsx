import { TextInput, Textarea } from '@mantine/core'
import { useEffect, useState } from 'react'
import * as footerApi from '../../../api/FooterAPI'
import { emptyFooter } from '../../../lib/empty'
import ApplyButton from '../ApplyButton'
import css from './index.module.scss'

const FooterContent = () => {
  const [data, setData] = useState(emptyFooter)

  useEffect(() => {
    footerApi.getFooter().then(setData)
  }, [])

  const handleChange = (field: keyof typeof data, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    await footerApi.updateFooter(data)
  }

  return (
    <div className={css.root}>
      <TextInput
        value={data.promotionsAndOffersTitle}
        onChange={(e) => handleChange('promotionsAndOffersTitle', e.currentTarget.value)}
        className={css.input}
      />
      <Textarea
        value={data.promotionsAndOffersText}
        onChange={(e) => handleChange('promotionsAndOffersText', e.currentTarget.value)}
        className={css.input}
      />
      <TextInput value={data.ooo} onChange={(e) => handleChange('ooo', e.currentTarget.value)} className={css.input} />
      <TextInput
        label="Лицензия"
        value={data.licenseNo}
        onChange={(e) => handleChange('licenseNo', e.currentTarget.value)}
        className={css.input}
      />
      <TextInput
        label="ИНН"
        value={data.inn}
        onChange={(e) => handleChange('inn', e.currentTarget.value)}
        className={css.input}
      />
      <Textarea
        label="Нижний блок"
        value={data.bottomSection}
        onChange={(e) => handleChange('bottomSection', e.currentTarget.value)}
        className={css.input}
      />
      <TextInput
        label="Ссылка на Telegram-канал"
        value={data.telegramChanellLink}
        onChange={(e) => handleChange('telegramChanellLink', e.currentTarget.value)}
        className={css.input}
      />
      <ApplyButton onClick={handleSave} />
    </div>
  )
}

export default FooterContent
