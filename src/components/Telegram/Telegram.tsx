import { Tooltip } from '@mantine/core'
import { Link } from 'react-router-dom'
import tg from '/assets/telegram.png'
import css from './index.module.scss'

const Telegram = () => {
  return (
    <Link to="https://telegram.me/cleanoren" className={css.root}>
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
    </Link>
  )
}

export default Telegram
