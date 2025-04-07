import { Modal, Group } from '@mantine/core'
import { useEffect, useState } from 'react'
import css from './index.module.scss'

const WelcomeModal = () => {
  const [opened, setOpened] = useState(false)

  // Проверяем, был ли это первый визит
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisited')
    if (!hasVisitedBefore) {
      // Если это первый визит, показываем модальное окно
      setOpened(true)
      // Сохраняем информацию о первом визите в localStorage
      localStorage.setItem('hasVisited', 'true')
    }
  }, [])

  // Функция для закрытия модального окна
  const closeModal = () => {
    setOpened(false)
  }

  return (
    <Modal
      opened={opened}
      onClose={closeModal}
      title="Добро пожаловать в Clean Clinic!"
      size="xl"
      centered
      radius="lg"
      styles={{
        overlay: {
          backdropFilter: 'blur(2px)',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        title: {
          fontWeight: 600,
          fontSize: '25px',
          padding: '7px',
        },
      }}
    >
      <video width="100%" controls poster="/assets/patient.png" style={{ objectFit: 'cover' }}>
        <source src="/assets/excursion.mov" type="video/mp4" />
        Ваш браузер не поддерживает видео
      </video>
      <Group>
        <h4 className={css.text}>
          Если нет возможности посмотреть видео сейчас, его всегда можно найти в разделе "О клинике"!
        </h4>
      </Group>
    </Modal>
  )
}

export default WelcomeModal
