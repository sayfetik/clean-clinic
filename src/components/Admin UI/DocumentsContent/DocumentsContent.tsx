import { Button, TextInput } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import * as api from '../../../api/DocumentsAPI'
import { DocumentType } from '../../../lib/types'
import UpdateButton from '../UpdateButton'
import fileGrey from '/assets/file.png'
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

  const [editFiles, setEditFiles] = useState<(File | null)[]>(documents.map(() => null))

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

  //   const handleFileEditChange = (index: number, file: File | null) => {
  //     setEditFiles((prev) => {
  //       const updated = [...prev]
  //       updated[index] = file
  //       return updated
  //     })
  //   }

  const handleUpdate = async (index: number) => {
    const doc = documents[index]
    const file = editFiles[index]
    await api.updateDocument(doc.id, doc.title, file)
    setEditFiles((prev) => {
      const updated = [...prev]
      updated[index] = null
      return updated
    })
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
          <div className={css.text}>
            <div className={css.file}>
              <img src={fileGrey} width={20} />
              <TextInput
                value={document.title}
                onChange={(e) => {
                  const updatedDocuments = [...documents]
                  updatedDocuments[index].title = e.target.value
                  setDocuments(updatedDocuments)
                }}
              />
              <Button
                variant="outline"
                style={{ width: '200px' }}
                onClick={() => handleOpen(document.img)}
              >
                Посмотреть
              </Button>
              
            </div>
            <div className={css.file}>
              <div style={{ width: '60px'}}>
                <UpdateButton onClick={() => handleUpdate(index)} />
              </div>
              <Button variant="light" color="red" onClick={() => handleDelete(index)} className={css.squareButton}>
                <IconX size={20} />
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 16 }}>
        <Button variant="filled" onClick={handleAddClick}>
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
          <div className={css.text}>
            <TextInput
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Название документа"
            />
            <div className={css.file}>
              <img src={fileGrey} width={20} />
              {newTitle}
            </div>
          </div>

          <div style={{ width: '80px', marginLeft: '10px' }}>
            <UpdateButton onClick={handleCreate} />
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentsContent
