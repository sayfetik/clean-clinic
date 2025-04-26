import { Tooltip } from '@mantine/core'
import tg from '/assets/whatsup.png'
import { useState } from 'react'
import OrderCallForm from '../OrderCallForm/OrderCallForm'
import css from './index.module.scss'

const Telegram = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)} className={css.root}>
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
      </button>
      <OrderCallForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default Telegram