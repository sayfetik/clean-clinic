import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import prevArrow from '/assets/prevArrow.png'
import nextArrow from '/assets/nextArrow.png'
import { Animation } from '../../animations'
import styles from './index.module.scss'

const dripBags = [
  { id: 'good-morning', name: 'Доброе Утро', image: '/assets/gm.png' },
  { id: 'slim-express', name: 'Экспресс Похудение', image: '/assets/losingWeight.png' },
  { id: 'cinderella', name: 'Золушка', image: '/assets/cinderella.png' },
  { id: 'liver-support', name: 'Поддержка Печени', image: '/assets/liver.png' },
  { id: 'anti-stress', name: 'Антистресс', image: '/assets/antistress.png' },
  { id: 'energy-boost', name: 'Энергетический Буст', image: '/assets/ferrum.png' },
]

export default function DripSlider() {
  const navigate = useNavigate()
  const [items, setItems] = useState(dripBags)

  const handleView = () => navigate(`/drip/${items[2].id}`) // Центр

  const handleSlide = (direction: 'next' | 'prev') => {
    setItems((prevItems) => {
      if (direction === 'next') {
        return [...prevItems.slice(1), prevItems[0]]
      } else {
        return [prevItems[prevItems.length - 1], ...prevItems.slice(0, -1)]
      }
    })
  }

  const scales = [0.6, 0.8, 1, 0.8, 0.6, 0.6]
  const xOffsets = [80, 50, 0, -50, -80, 0]
  const yOffsets = [20, 10, 0, 10, 20, 0]

  return (
    <Animation>
    <div className={styles['drip-slider']}>
      <div className={styles['drip-container']}>
        {items.map((drip, index) => {
          const zIndex = items.length - Math.abs(2 - index) // Центр - 2 это верхний слой
          const scale = scales[index]
          const xOffset = xOffsets[index]
          const yOffset = yOffsets[index] // Размещение по вертикали

          return (
            <motion.img
              key={drip.id}
              src={drip.image}
              alt={drip.name}
              className={styles['drip-item']}
              style={{
                zIndex,
                transform: `translateX(${xOffset}%) translateY(${yOffset}%) scale(${scale}))`,
              }}
              initial={{ opacity: 0.8 }}
              animate={{
                opacity: 1,
                x: `${xOffset}%`, // Animate the X position
                scale: scale,
                y: `${yOffset}%`, // Animate the Y position
                transition: { duration: 0.1, ease: 'easeInOut' }, // Smooth transition
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.1, ease: 'easeInOut' },
              }}
              onClick={() => (index > 2 ? handleSlide('next') : handleSlide('prev'))}
            />
          )
        })}
      </div>
      <div className={styles.controls}>
        <button onClick={() => handleSlide('next')} className={styles['nav-button']}>
          <img src={prevArrow} width={10}/>
        </button>
        <button onClick={handleView} className={styles['view-button']}>
          Смотреть
        </button>
        <button onClick={() => handleSlide('prev')} className={styles['nav-button']}>
          <img src={nextArrow} width={10}/>
        </button>
      </div>
    </div>
    </Animation>
  )
}
