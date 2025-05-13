import { Modal, Button, Group } from '@mantine/core'
import clsx from 'clsx'
import { useRef, useState, useEffect } from 'react'
import css from './index.module.scss'

const VIDEO_SRC = '/assets/excursion.mov'

const VideoWidget: React.FC<{isAuthenticated: boolean}> = ({isAuthenticated}) => {
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

  // Auto return to floating after 7s in preview
  useEffect(() => {
    if (stage === 'preview') {
      const timer = setTimeout(() => {
        handleStageChange('floating')
      }, 7000)
      return () => clearTimeout(timer)
    }
  }, [stage])

  // Save current time before stage change
  const handleStageChange = (nextStage: 'floating' | 'preview' | 'modal') => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
    setAnimating(true)
    setTimeout(() => {
      setStage(nextStage)
      setAnimating(false)
    }, 300) // duration matches CSS transition
  }

  // Restore time when video element mounts
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <>
      {/* Этап 1: Маленькое окно в углу */}
      <div
        className={clsx(
          css.floating,
          stage === 'floating' && css.visible,
          stage === 'preview' && css.toPreview,
          animating && css.animating
        )}
        style={{ pointerEvents: stage === 'floating' ? 'auto' : 'none' }}
        onClick={() => stage === 'floating' && handleStageChange('preview')}
      >
        <video ref={videoRef} src={VIDEO_SRC} muted autoPlay loop onLoadedMetadata={handleLoadedMetadata} />
      </div>

      {/* Этап 2: Увеличенное превью */}
      <div
        className={clsx(
          css.preview,
          stage === 'preview' && css.visible,
          stage === 'floating' && css.toFloating,
          animating && css.animating
        )}
        style={{ pointerEvents: stage === 'preview' ? 'auto' : 'none' }}
        onClick={() => stage === 'preview' && handleStageChange('modal')}
      >
        <video ref={videoRef} src={VIDEO_SRC} muted autoPlay loop onLoadedMetadata={handleLoadedMetadata} />
        <Button className={css.fullscreenBtn} variant="filled" color="#0171fc">
          Смотреть на весь экран
        </Button>
      </div>

      {/* Этап 3: Модальное окно */}
      <Modal
        opened={stage === 'modal'}
        onClose={() => {
          setIsOpen(false)
          localStorage.setItem('closedVideo', 'true')
        }}
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
