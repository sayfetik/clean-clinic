import { Tooltip } from '@mantine/core'
import tg from '/assets/telegram.png'
import css from './index.module.scss'

const Telegram = () => {
  return (
    <a
      href="https://telegram.me/cleanoren"
      className={css.root}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Tooltip
        arrowOffset={5}
        arrowSize={10}
        arrowRadius={2}
        label="Telegram"
        withArrow
        position="right"
        transitionProps={{ transition: 'fade', duration: 300 }}
      >
        <img src={tg} width={50} />
      </Tooltip>
    </a>
  )
}

export default Telegram
