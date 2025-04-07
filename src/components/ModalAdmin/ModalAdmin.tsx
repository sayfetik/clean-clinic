import { Modal, PasswordInput, Button, Group } from '@mantine/core'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

type ModalAdminProps = {
  opened: boolean
  onClose: () => void
  onSuccess: () => void
}

const ModalAdmin = ({ opened, onClose, onSuccess }: ModalAdminProps) => {
  const [password, setPassword] = useState('')
  const secret = import.meta.env.VITE_SECRET_PASSWORD
  const { login } = useAuth()

  const handleOnClose = () => {
    onClose()
    setPassword('')
  }

  const checkPassword = () => {
    if (password === secret) {
      login()
      onSuccess()
      setPassword('')
    } else {
      handleOnClose()
    }
  }

  return (
    <Modal opened={opened} onClose={handleOnClose} radius="md" title="Введите пароль" centered>
      <PasswordInput value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
      <Group mt="md" justify="center">
        <Button onClick={checkPassword} color="blue">
          ОК
        </Button>
      </Group>
    </Modal>
  )
}

export default ModalAdmin
