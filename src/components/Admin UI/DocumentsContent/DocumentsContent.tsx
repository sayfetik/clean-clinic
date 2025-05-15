import { Button } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import * as api from '../../../api/DocumentsAPI'
import { DocumentType } from '../../../lib/types'
import UpdateButton from '../UpdateButton'
import css from './index.module.scss'

type DocumentsContentProps = {
  documents: DocumentType[]
  setDocuments: React.Dispatch<React.SetStateAction<DocumentType[]>>
}

const DocumentsContent: React.FC<DocumentsContentProps> = ({ documents, setDocuments }) => {
  const [newFile, setNewFile] = useState<File | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDelete = async (index: number) => {
    const doc = documents[index]
    if (doc.id) {
      await api.deleteDocument(doc.id)
    }
    setDocuments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleOpen = (img: string | File) => {
    if (!img) {
      return
    }
    if (typeof img === 'string') {
      window.open(img, '_blank')
    } else if (img instanceof File) {
      const url = URL.createObjectURL(img)
      window.open(url, '_blank')
      setTimeout(() => URL.revokeObjectURL(url), 10000)
    }
  }

  const handleAddClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setNewFile(file)
      setNewTitle(file.name)
      setIsAdding(true)
    }
  }

  const handleCreate = async () => {
    if (!newFile) {
      return
    }
    const created = await api.createDocument(newTitle, newFile)
    setDocuments((prev) => [...prev, { id: created.id, title: created.title, img: created.imagePath }])
    setNewFile(null)
    setNewTitle('')
    setIsAdding(false)
  }

  return (
    <div className={css.root}>
      {documents.map((document, index) => (
        <div key={index} className={css.document}>
          <Button variant="outline" color="red" onClick={() => handleDelete(index)} className={css.squareButton}>
            <IconX size={16} />
          </Button>
          <button className={css.text} onClick={() => handleOpen(document.img)}>
            {document.title}
          </button>
        </div>
      ))}
      <div style={{ marginTop: 16 }}>
        <Button variant="outline" onClick={handleAddClick}>
          Добавить +
        </Button>
        <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
      </div>
      {isAdding && newFile && (
        <div className={css.document}>
          <Button
            variant="outline"
            color="red"
            onClick={() => {
              setIsAdding(false)
              setNewFile(null)
              setNewTitle('')
            }}
            className={css.squareButton}
          >
            <IconX size={16} />
          </Button>
          <div className={css.text}>{newTitle}</div>
          <div style={{ width: '100px' }}>
            <UpdateButton onClick={handleCreate} />
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentsContent
