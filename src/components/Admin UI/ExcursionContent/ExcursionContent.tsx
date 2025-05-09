import { useEffect, useState } from 'react'
import * as excursionApi from '../../../api/ExcursionAPI'
import MediaEditor from '../../MediaEditor/MediaEditor'
import ApplyButton from '../ApplyButton'
import css from './index.module.scss'

const ExcursionContent = () => {
  const [excursion, setExcursion] = useState<{ id?: number; file: string | File }>({ file: '' })
  const [changedFile, setChangedFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await excursionApi.getExcursion()
      setExcursion({ id: response.id, file: response.file }) // предполагается, что сервер возвращает {id, file}
    }
    fetchData()
  }, [])

  const handleFileChange = (file: File) => {
    setExcursion((prev) => ({ ...prev, file }))
    setChangedFile(file)
  }

  const sendToBackExcursion = async () => {
    if (excursion.id && changedFile) {
      await excursionApi.editExcursion(excursion.id, changedFile)
    } else if (changedFile) {
      await excursionApi.createExcursion(changedFile)
    }
    // Можно обновить состояние после успешной загрузки
  }

  return (
    <div className={css.tabContent}>
      <MediaEditor
        initialSrc={
          typeof excursion.file === 'string'
            ? excursion.file
            : excursion.file instanceof File
              ? URL.createObjectURL(excursion.file)
              : ''
        }
        onFileChange={handleFileChange}
      />
      <ApplyButton onClick={sendToBackExcursion} />
    </div>
  )
}

export default ExcursionContent
