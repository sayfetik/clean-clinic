import { Modal, Button, Group } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import clsx from 'clsx'
import { useRef, useState, useEffect } from 'react'
import css from './index.module.scss'

const VIDEO_SRC = '/assets/excursion.mov'

const VideoWidget: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [stage, setStage] = useState<'floating' | 'preview' | 'modal'>('floating')
  const [animating, setAnimating] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const closedVideo = localStorage.getItem('closedVideo')
    if (!closedVideo && !isAuthenticated) {
      setIsOpen(true)
    }
  }, [])

  useEffect(() => {
    if (stage === 'preview') {
      const timer = setTimeout(() => {
        handleStageChange('floating')
      }, 7000)
      return () => clearTimeout(timer)
    }
  }, [stage])

  const handleStageChange = (nextStage: 'floating' | 'preview' | 'modal') => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
    setAnimating(true)
    setTimeout(() => {
      setStage(nextStage)
      setAnimating(false)
    }, 300)
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('closedVideo', 'true')
  }

  if (!isOpen) {
    return null
  }

  return (
    <>
      <div
        className={clsx(
          css.floating,
          stage === 'floating' && css.visible,
          stage === 'preview' && css.toPreview,
          animating && css.animating
        )}
        style={{ pointerEvents: stage === 'floating' ? 'auto' : 'none', position: 'fixed' }}
        onClick={() => stage === 'floating' && handleStageChange('preview')}
      >
        <button
          type="button"
          aria-label="Закрыть видео"
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 2,
            background: 'rgba(255,255,255,0.7)',
            border: 'none',
            borderRadius: '5px',
            padding: 2,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconX size={18} color="#333" />
        </button>
        <video ref={videoRef} src={VIDEO_SRC} muted autoPlay loop onLoadedMetadata={handleLoadedMetadata} />
      </div>

      <div
        className={clsx(
          css.preview,
          stage === 'preview' && css.visible,
          stage === 'floating' && css.toFloating,
          animating && css.animating
        )}
        style={{ pointerEvents: stage === 'preview' ? 'auto' : 'none', position: 'fixed' }}
        onClick={() => stage === 'preview' && handleStageChange('modal')}
      >
        <button
          type="button"
          aria-label="Закрыть видео"
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 2,
            background: 'rgba(255,255,255,0.7)',
            border: 'none',
            borderRadius: '50%',
            padding: 2,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconX size={20} color="#333" />
        </button>
        <video ref={videoRef} src={VIDEO_SRC} muted autoPlay loop onLoadedMetadata={handleLoadedMetadata} />
        <Button className={css.fullscreenBtn} variant="filled" color="#0171fc">
          Смотреть на весь экран
        </Button>
      </div>

      <Modal
        opened={stage === 'modal'}
        onClose={handleClose}
        centered
        title="Добро пожаловать в Clean Clinic!"
        size="80%"
        radius="lg"
        styles={{
          overlay: {
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
        }}
        transitionProps={{ transition: 'fade', duration: 300 }}
      >
        <video
          ref={videoRef}
          width="100%"
          controls
          autoPlay
          style={{ objectFit: 'cover', borderRadius: '10px' }}
          poster="/assets/patient.png"
          onLoadedMetadata={handleLoadedMetadata}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <Group>
          <h4 className={css.text}>
            Если нет возможности посмотреть видео сейчас, его всегда можно найти в разделе "О клинике"!
          </h4>
        </Group>
      </Modal>
    </>
  )
}

export default VideoWidget
