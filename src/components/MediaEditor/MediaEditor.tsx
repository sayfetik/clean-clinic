import { Pencil } from 'lucide-react';
import React, { useState, useRef } from 'react';
import css from './index.module.scss';

type MediaEditorProps = {
  initialSrc: string;
  onFileChange: (file: File) => void;
  size?: number;
};

const MediaEditor: React.FC<MediaEditorProps> = ({ initialSrc, onFileChange, size = 150 }) => {
  const [media, setMedia] = useState<{ src: string; file: File | null }>({ src: initialSrc, file: null });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newSrc = URL.createObjectURL(file);
      setMedia({ src: newSrc, file });
      onFileChange(file);
    }
  };

  return (
    <div className={css.root} onClick={() => fileInputRef.current?.click()}>
      <div className={css.mediaWrapper}>
        {media.src.endsWith('.mp4') ? (
          <video className={css.media} src={media.src} controls />
        ) : (
          <img className={css.media} src={media.src} alt="Фото или видео" width={size} />
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
  );
};

export default MediaEditor;
