import { TextInput, Textarea } from '@mantine/core'
import { useField } from '@mantine/form'
import { useState, useMemo } from 'react'
import { formInputs } from '../../lib/data'
import Button from '../Button/Button'
import CheckPolicy from '../CheckPolicy/CheckPolicy'
import css from './index.module.scss'

const Form = () => {
  const name = useField({
    initialValue: '',
    validate: (value) => {
      if (value.trim().length < 2 && value.trim().length !== 0) {
        return 'Имя слишком короткое'
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

  const [checked, setChecked] = useState(false)

  const disabled = useMemo(() => {
    return !checked || !!name.error || !!phone.error || !name.getValue().trim() || !phone.getValue().trim()
  }, [checked, name.error, phone.error, name.getValue(), phone.getValue()])

  return (
    <div className={css.form}>
      <div>
        <h2 className={css.title}>Онлайн-запись</h2>
        <p className={css.description}>Запишись сегодня и уже завтра почувствуешь себя лучше!</p>
      </div>
      
      <div className={css.inputs}>
        <TextInput
          className={css.input}
          {...name.getInputProps()}
          onBlur={() => name.validate()}
          radius="md"
          label={formInputs[0].label}
          placeholder={formInputs[0].placeholder}
        />
        <TextInput
          className={css.input}
          {...phone.getInputProps()}
          onBlur={() => phone.validate()}
          radius="md"
          label={formInputs[1].label}
          placeholder={formInputs[1].placeholder}
        />
        <Textarea
          {...question.getInputProps()}
          className={css.input}
          radius="md"
          placeholder={formInputs[2].placeholder}
          label={formInputs[2].label}
          autosize
          minRows={2}
          maxRows={2}
        />
      </div>
      <CheckPolicy {...{ checked, setChecked }} />
      <Button size="small" isDisabled={disabled} />
    </div>
  )
}

export default Form
