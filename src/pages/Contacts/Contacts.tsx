import { TextInput, Textarea } from '@mantine/core'
import { useField } from '@mantine/form'
import { IconAt } from '@tabler/icons-react'
import clsx from 'clsx'
import { useState, useMemo } from 'react'
import StarRatings from 'react-star-ratings'
import { ContactItem, SocialMediaIcons, CheckPolicy, Button } from '../../components'
import { contacts, feedbackInputs } from '../../lib/data'
import css from './index.module.scss'

const Contacts = () => {
  const icon = <IconAt size={16} />
  const [checked, setChecked] = useState(false)
  const [alias, setAlias] = useState('')

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

  const nameValue = name.getValue();
  const surnameValue = surname.getValue();

  const disabled = useMemo(() => {
    return (
      rating === 0 ||
      !checked ||
      !!name.error ||
      !!surname.error ||
      !nameValue.trim() ||
      !surnameValue.trim()
    );
  }, [rating, checked, name.error, surname.error, nameValue, surnameValue]);

  return (
    <div className={css.root}>
      <div className={css.contacts}>
        <h2>{contacts.title}</h2>
        <p>{contacts.text}</p>
        <div className={css.contactsInfo}>
          {contacts.contactsInfo.map((section, index) => (
            <ContactItem key={index} {...section} />
          ))}
          <SocialMediaIcons iconWidth={35} />
        </div>
      </div>

      <div className={css.feedbackForm}>
        <div>
          <h2 className="blue">{contacts.feedbackFormTitle}</h2>
          <p>{contacts.feedbackFormText}</p>
        </div>

        <div className={css.row}>
          <h5>Оцените *</h5>
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
        
        <div className={css.inputs}>
          <div>
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
          </div>

          <div>
            <TextInput
              radius="md"
              classNames={{ label: clsx(css.label) }}
              leftSectionPointerEvents="none"
              className={css.input}
              leftSection={icon}
              placeholder={feedbackInputs[3].placeholder}
              label={feedbackInputs[3].label}
              value={alias}
              onChange={(event) => setAlias(event.currentTarget.value)}
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
            {...question.getInputProps()}
            className={css.input}
            radius="md"
            placeholder={feedbackInputs[4].placeholder}
            label={feedbackInputs[4].label}
            autosize
            minRows={5}
            maxRows={5}
          />
        </div>
        <CheckPolicy {...{ checked, setChecked }} />
        <div className={css.margin}></div>
        <Button size='small' text='Отправить' isDisabled={disabled} />
      </div>
    </div>
  )
}

export default Contacts
