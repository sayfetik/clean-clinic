import { TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'
import * as api from '../../../api/SuccessErrorAPI'
import ApplyButton from '../ApplyButton'
import css from './index.module.scss'

const ErrorContent = () => {
  const [data, setData] = useState({ id: 0, title: '', text: '' })
  const [initial, setInitial] = useState({ id: 0, title: '', text: '' })

  useEffect(() => {
    api.getErrorPage().then((res) => {
      setData(res)
      setInitial(res)
    })
  }, [])

  const handleChange = (field: 'title' | 'text') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const apply = async () => {
    if (data.title !== initial.title || data.text !== initial.text) {
      await api.updateErrorPage(data)
      setInitial(data)
    }
  }

  return (
    <div className={css.tabContent}>
      <TextInput value={data.title} onChange={handleChange('title')} />
      <TextInput value={data.text} onChange={handleChange('text')} />
      <ApplyButton onClick={apply} />
    </div>
  )
}

export default ErrorContent
