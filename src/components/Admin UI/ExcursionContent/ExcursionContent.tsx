import { useEffect, useState } from 'react'
import { MediaEditor, ApplyButton } from '../../'
import css from './index.module.scss'

const ExcursionContent = () => {
  const [excurions, setExcursion] = useState<string>('')

  useEffect(() => {
    fetch('https://api.example.com/media')
      .then((response) => response.json())
      .then((data) => {
        setExcursion(data.mediaUrl)
      })
      .catch((error) => console.error('Ошибка загрузки:', error))
  }, [])

  const handleFileChange = (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    fetch('https://api.example.com/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setExcursion(data.newMediaUrl) // Обновляем URL после загрузки
      })
      .catch((error) => console.error('Ошибка загрузки файла:', error))
  }

  const sendToBackExcursion = () => {}

  return (
    <div className={css.tabContent}>
      <MediaEditor initialSrc={excurions} onFileChange={handleFileChange} />
      <ApplyButton onClick={sendToBackExcursion} />
    </div>
  )
}

export default ExcursionContent
