import { Modal, TextInput, Textarea } from '@mantine/core'
import { useField } from '@mantine/form'
import clsx from 'clsx'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { callbackRequest } from '../../api/MainAPI'
import { Button, CheckPolicy } from '../../components'
import { formInputs } from '../../lib/data'
import { getErrorRoute, getSuccessRoute } from '../../lib/routes'
import css from '../Button/index.module.scss'

const OrderCallForm: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
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

  const resetFields = () => {
    name.setValue('')
    phone.setValue('+7')
    question.setValue('')
    setChecked(false)
  }

  const navigate = useNavigate()

  const handleClick = async () => {
    const result = await callbackRequest(name.getValue(), phone.getValue(), question.getValue())
    if (result) {
      resetFields()
      navigate(getSuccessRoute())
    } else {
      resetFields()
      navigate(getErrorRoute())
    }
    onClose()
  }

  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        onClose()
        resetFields()
      }}
      centered
      radius="md"
      withCloseButton={false}
    >
      <div className={css.form}>
        <h2 className="blue">Записаться бесплатно</h2>
        <p>Перезвоним и ответим на все вопросы</p>
        <div className={css.margin}></div>
        <div className={css.inputs}>
          <TextInput
            classNames={{ label: clsx(css.label) }}
            className={css.input}
            {...name.getInputProps()}
            onBlur={() => name.validate()}
            radius="md"
            label={formInputs[0].label}
            placeholder={formInputs[0].placeholder}
          />
          <TextInput
            classNames={{ label: clsx(css.label) }}
            className={css.input}
            {...phone.getInputProps()}
            onBlur={() => phone.validate()}
            radius="md"
            label={formInputs[1].label}
            placeholder={formInputs[1].placeholder}
          />
          <Textarea
            classNames={{ label: clsx(css.label) }}
            {...question.getInputProps()}
            className={css.input}
            radius="md"
            placeholder={formInputs[2].placeholder}
            label={formInputs[2].label}
            autosize
            minRows={2}
            maxRows={2}
          />

          <div className={css.bigMargin}></div>

          <CheckPolicy {...{ checked, setChecked }} />
          <div className="margin"></div>
          <Button size="small" isDisabled={disabled} onClick={handleClick} />
        </div>
      </div>
    </Modal>
  )
}

export default OrderCallForm
