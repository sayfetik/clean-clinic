import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import css from './index.module.scss'

type LicenseViewerProps = {
  image: string
  altText?: string
  size?: string
}

const Document: React.FC<LicenseViewerProps> = ({ image, altText = 'Лицензия', size = 'big' }) => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div className={css.root}>
      <img src={image} alt={altText} className={css.preview} width={size === 'big' ? 500 : 300} onClick={open} />
      <Modal size="lg" opened={opened} onClose={close} centered className={css.modal}>
        <img src={image} alt={altText} className={css.image} />
      </Modal>
    </div>
  )
}

export default Document
