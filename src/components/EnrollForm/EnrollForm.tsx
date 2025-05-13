import { TextInput } from '@mantine/core'
import { useField } from '@mantine/form'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, CheckPolicy } from '../'
import { callbackRequest } from '../../api/MainAPI'
import { formInputs } from '../../lib/data'
import { getErrorRoute, getSuccessRoute } from '../../lib/routes'
import css from './index.module.scss'

const EnrollForm: React.FC<{ title: string }> = ({ title }) => {
  const navigate = useNavigate()
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

  const [checked, setChecked] = useState(false)

  const disabled = useMemo(() => {
    return !checked || !!name.error || !!phone.error || !name.getValue().trim() || !phone.getValue().trim()
  }, [checked, name.error, phone.error, name.getValue(), phone.getValue()])

  const resetFields = () => {
    name.setValue('')
    phone.setValue('+7')
    setChecked(false)
  }

  const handleClick = async () => {
    const result = await callbackRequest(name.getValue(), phone.getValue(), '')
    if (result) {
      navigate(getSuccessRoute())
      resetFields()
    } else {
      navigate(getErrorRoute())
    }
  }

  return (
    <>
      <div className={css.root}>
        <div className={css.left}>
          <h3 className="blue">{title}</h3>
        </div>
        <div className={css.right}>
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
          </div>
          <CheckPolicy {...{ checked, setChecked }} />
          <Button size="small" isDisabled={disabled} onClick={handleClick} />
        </div>
      </div>
    </>
  )
}

export default EnrollForm
