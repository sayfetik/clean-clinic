import { TextInput, Textarea } from '@mantine/core'
import { useField } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import clsx from 'clsx'
import { useState, useMemo, useCallback, useEffect } from 'react'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import StarRatings from 'react-star-ratings'
import { Animation, FadeAnimation } from '../../animations'
import * as mainPageApi from '../../api/MainAPI'
import { ContactItem, CheckPolicy, Button } from '../../components'
import { feedbackInputs } from '../../lib/data'
import { ContactsType } from '../../lib/types'
import css from './index.module.scss'

const Contacts: React.FC<{ contacts: ContactsType }> = React.memo(({ contacts }) => {
  const [checked, setChecked] = useState(false)

  const [rating, setRating] = useState(0)
  const changeRating = (newRating: number) => {
    setRating(newRating)
  }

  const name = useField({
    initialValue: '',
    validate: (value) => {
      if (value.trim().length < 2 && value.trim().length !== 0) {
        return 'Имя слишком короткое'
      }
      return null
    },
  })

  const surname = useField({
    initialValue: '',
    validate: (value) => {
      if (value.trim().length < 2 && value.trim().length !== 0) {
        return 'Фамилия слишком короткая'
      }
      return null
    },
  })

  const phone = useField({
    initialValue: '+7',
    validate: (value) => {
      const cleaned = value.replace(/\D/g, '')
      const isValidFormat = /^(\+79|89)\d{9}$/.test(value.trim())
      const isCorrectLength = cleaned.length === 11

      if ((!isValidFormat || !isCorrectLength) && value.trim() !== '+7' && value.trim().length !== 0) {
        return 'Неправильный номер телефона'
      }
      return null
    },
  })

  const question = useField({
    initialValue: '',
    validate: (value) => (value.trim().length < 2 && value.trim().length !== 0 ? 'Слишком короткое значение' : null),
  })

  const nameValue = name.getValue()

  const disabled = useMemo(() => {
    return rating === 0 || !checked || !!name.error || !nameValue.trim()
  }, [rating, checked, name.error, nameValue])

  const handleSendFeedback = useCallback(async () => {
    await mainPageApi.createFeedBack({
      name: `${name.getValue()} ${surname.getValue()}`.trim(),
      rate: rating,
      text: question.getValue(),
    })
    name.setValue('')
    surname.setValue('')
    phone.setValue('+7')
    question.setValue('')
    setRating(0)
    setChecked(false)
    showNotification({
      title: 'Спасибо за отзыв!',
      message: 'Ваш отзыв отправлен',
      color: 'blue',
    })
  }, [name, surname, rating, question])

  useEffect(() => {
    document.title = 'Контакты'
  }, [])

  return (
    <>
      <Helmet>
        <title>Контакты</title>
        <meta
          name="description"
          content="Узнайте больше о клинике Клин Клиник в Оренбурге: опытные специалисты, современное оборудование, индивидуальный подход к каждому пациенту."
        />
        <meta
          name="keywords"
          content="О клинике, Клин Клиник, Оренбург, специалисты, современное оборудование, здоровье"
        />
      </Helmet>

      <div className={css.root}>
        <FadeAnimation>
          <div className={css.contacts}>
            <h2>{contacts.title}</h2>
            <p>{contacts.text}</p>
            <div className={css.contactsInfo}>
              {contacts.contactsInfo.map((section, index) => (
                <ContactItem key={index} info={section} contacts={contacts} />
              ))}
              {/* <SocialMediaIcons iconWidth={35} containerWidth="30%" contacts={contacts} /> */}
            </div>
          </div>
        </FadeAnimation>

        <Animation>
          <div className={css.feedbackForm}>
            <div>
              <h2 className="blue">{contacts.feedbackFormTitle}</h2>
              <p>{contacts.feedbackFormText}</p>
            </div>

            <div className={css.row}>
              <h4>Оцените *</h4>
              <StarRatings
                rating={rating}
                starRatedColor="#0171fc"
                starHoverColor="#398ff7"
                changeRating={changeRating}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="3px"
              />
            </div>

            <div>
              <div className={css.inputs}>
                <TextInput
                  classNames={{ label: clsx(css.label) }}
                  className={css.input}
                  {...name.getInputProps()}
                  onBlur={() => name.validate()}
                  radius="md"
                  label={feedbackInputs[0].label}
                  placeholder={feedbackInputs[0].placeholder}
                />
                <TextInput
                  classNames={{ label: clsx(css.label) }}
                  className={css.input}
                  {...surname.getInputProps()}
                  onBlur={() => surname.validate()}
                  radius="md"
                  label={feedbackInputs[1].label}
                  placeholder={feedbackInputs[1].placeholder}
                />
                <TextInput
                  classNames={{ label: clsx(css.label) }}
                  className={css.input}
                  {...phone.getInputProps()}
                  onBlur={() => phone.validate()}
                  radius="md"
                  label={feedbackInputs[2].label}
                  placeholder={feedbackInputs[2].placeholder}
                />
              </div>

              <Textarea
                classNames={{ label: clsx(css.label) }}
                className={css.inputFeedback}
                {...question.getInputProps()}
                radius="md"
                placeholder={feedbackInputs[4].placeholder}
                label={feedbackInputs[4].label}
                autosize
                minRows={5}
              />
            </div>
            <CheckPolicy {...{ checked, setChecked }} />
            <div className={css.margin}></div>
            <Button size="small" text="Отправить" isDisabled={disabled} onClick={handleSendFeedback} />
          </div>
        </Animation>
      </div>
    </>
  )
})

export default Contacts
