import { Textarea, Button } from '@mantine/core'
import { IconPlus, IconX } from '@tabler/icons-react'
import { useState, useRef } from 'react'
import css from './index.module.scss'

const BulletPoints: React.FC<{ label: string; bullets: string[] }> = ({ label, bullets: initialBullets }) => {
  const [bullets, setBullets] = useState(initialBullets)
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([])

  const handleAdd = () => {
    setBullets((prevBullets) => {
      const newBullets = [...prevBullets, '']
      setTimeout(() => {
        const lastIndex = newBullets.length - 1
        if (textareaRefs.current[lastIndex]) {
          textareaRefs.current[lastIndex]?.focus()
        }
      }, 0)
      return newBullets
    })
  }

  const handleRemove = (index: number) => {
    setBullets(bullets.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, value: string) => {
    const newBullets = [...bullets]
    newBullets[index] = value
    setBullets(newBullets)
  }

  const handleBlur = (index: number) => {
    if (bullets[index].trim() === '') {
      handleRemove(index)
    }
  }

  return (
    <div className={css.bullets}>
      <h4 className={css.bulletLabel}>{label}</h4>
      {bullets.map((bullet, index) => (
        <div key={index} className={css.bulletItem}>
          <Button variant="subtle" color="red" onClick={() => handleRemove(index)} className={css.squareButton}>
            <IconX size={16} />
          </Button>
          <Textarea
            value={bullet}
            onChange={(event) => handleChange(index, event.currentTarget.value)}
            onBlur={() => handleBlur(index)}
            ref={(el) => {
              textareaRefs.current[index] = el
            }}
          />
        </div>
      ))}
      <Button onClick={handleAdd} variant="light">
        <IconPlus size={16} />
      </Button>
    </div>
  )
}

export default BulletPoints
