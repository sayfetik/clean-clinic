import { Button, Loader } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import css from './MainContent/index.module.scss'

type UpdateButtonProps = {
  onClick: () => Promise<void>
}

const UpdateButton: React.FC<UpdateButtonProps> = ({ onClick }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleClick = async () => {
    setStatus('loading')
    try {
      await onClick()
      setStatus('success')
      setTimeout(() => setStatus('idle'), 1500)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 1500)
    }
  }

  let color = 'blue'
  let variant = 'light'
  let icon = <IconCheck size={18} />
  if (status === 'success') {
    variant = 'filled'
    color = 'green'
    icon = <IconCheck size={18} color="white" />
  }
  if (status === 'error') {
    variant = 'filled'
    color = 'red'
    icon = <IconX size={18} color="white" />
  }

  return (
    <Button
      variant={variant}
      color={color}
      onClick={handleClick}
      className={css.squareButton}
      disabled={status === 'loading'}
    >
      {status === 'loading' ? <Loader size={18} color="blue" /> : icon}
    </Button>
  )
}

export default UpdateButton
