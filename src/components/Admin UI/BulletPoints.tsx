import { Textarea, Button, TextInput } from '@mantine/core'
import { IconPlus, IconX } from '@tabler/icons-react'
import { useRef } from 'react'
import css from './InfusionsContent/index.module.scss'

const BulletPoints: React.FC<{ label: string; bullets: string[]; onChange: (arr: string[]) => void }> = ({
  label,
  bullets,
  onChange,
}) => {
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([])

  const handleAdd = () => {
    const newBullets = [...bullets, '']
    onChange(newBullets)
    setTimeout(() => {
      const lastIndex = newBullets.length - 1
      if (textareaRefs.current[lastIndex]) {
        textareaRefs.current[lastIndex]?.focus()
      }
    }, 0)
  }

  const handleRemove = (index: number) => {
    const newBullets = bullets.filter((_, i) => i !== index)
    onChange(newBullets)
  }

  const handleChange = (index: number, value: string) => {
    const newBullets = [...bullets]
    newBullets[index] = value
    onChange(newBullets)
  }

  const handleBlur = (index: number) => {
    if (bullets[index].trim() === '') {
      handleRemove(index)
    }
  }

  return (
    <div className={css.bullets}>
      {label !== '' && <TextInput value={label} readOnly />}
      {bullets.map((bullet, index) => (
        <div key={index} className={css.bulletItem}>
          <Button variant="outline" color="red" onClick={() => handleRemove(index)} className={css.squareButton}>
            <IconX size={16} />
          </Button>
          <Textarea
            value={bullet}
            onChange={(event) => handleChange(index, event.currentTarget.value)}
            onBlur={() => handleBlur(index)}
            ref={(el) => {
              textareaRefs.current[index] = el
            }}
            minRows={1}
            autosize
          />
        </div>
      ))}
      <Button onClick={handleAdd} variant="outline">
        <IconPlus size={16} />
      </Button>
    </div>
  )
}

export default BulletPoints
