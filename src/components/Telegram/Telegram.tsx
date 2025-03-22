import { Tooltip } from '@mantine/core'
import tg from '/assets/whatsup.png'
import css from './index.module.scss'

// добавить вызов на бек на обратный звонок
const Telegram = () => {
  return (
    <a href="h" className={css.root} target="_blank" rel="noopener noreferrer">
      <Tooltip
        arrowOffset={5}
        arrowSize={10}
        arrowRadius={2}
        label="Заказать обратный звонок"
        withArrow
        position="right"
        transitionProps={{ transition: 'fade', duration: 300 }}
        style={{ width: 'fit-content' }}
      >
        <img src={tg} width={50} />
      </Tooltip>
    </a>
  )
}

export default Telegram
