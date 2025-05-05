import { Pencil } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import css from './index.module.scss'

type MediaEditorProps = {
  initialSrc: string
  onFileChange: (file: File) => void
  size?: number
}

const MediaEditor: React.FC<MediaEditorProps> = ({ initialSrc, onFileChange, size = 150 }) => {
  const [media, setMedia] = useState<{ src: string; file: File | null }>({ src: initialSrc, file: null })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (media.src && media.src.startsWith('blob:')) {
        URL.revokeObjectURL(media.src)
      }
    }
  }, [media.src])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newSrc = URL.createObjectURL(file)
      setMedia({ src: newSrc, file })
      onFileChange(file)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className={css.root} onClick={() => fileInputRef.current?.click()}>
      <div className={css.mediaWrapper}>
        {media.src ? (
          media.src.endsWith('.mp4') ? (
            <video className={css.media} src={media.src} controls />
          ) : (
            <img className={css.media} src={media.src} alt="Фото или видео" width={size} />
          )
        ) : (
          <img className={css.media} src={undefined} alt="Добавьте файл" width={size} />
        )}
        <div className={css.overlay}>
          <Pencil className={css.icon} size={24} />
        </div>
      </div>
      <input
        type="file"
        accept="image/*,video/*"
        className={css.hidden}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  )
}

export default MediaEditor
