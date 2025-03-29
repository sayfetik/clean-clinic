import { Textarea, Button, TextInput } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useState, useRef } from 'react'
import { massage } from '../../../lib/data'
import MediaEditor from '../../MediaEditor/MediaEditor'
import ApplyButton from '../ApplyButton'
import BulletPoints from '../BulletPoints'
import css from './index.module.scss'

type MassageType = { id: number; name: string; cost: number; bullets: string[]; img: string }

const Items: React.FC<{ items: MassageType[] }> = ({ items: initialBullets }) => {
  const [items, setBullets] = useState(initialBullets)
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([])

  const fileChange = () => {}

  const handleAdd = () => {
    setBullets((prevBullets) => {
      const newBullet: MassageType = {
        id: prevBullets.length > 0 ? prevBullets[prevBullets.length - 1].id + 1 : 1,
        name: '',
        cost: 0,
        bullets: [''],
        img: '',
      }
      const newBullets = [...prevBullets, newBullet]
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
    setBullets(items.filter((_, i) => i !== index))
  }

  const handleChangeName = (index: number, value: string) => {
    const newBullets = [...items]
    newBullets[index].name = value
    setBullets(newBullets)
  }

  const handleChangeCost = (index: number, value: string) => {
    const newBullets = [...items]
    newBullets[index].cost = Number(value)
    setBullets(newBullets)
  }

  return (
    <div>
      <div className={css.services}>
      {items.map((item, index) => (
        <div key={index} className={css.bulletItem}>
          <div className={css.card}>
            <div className={css.content}>
            <MediaEditor initialSrc={item.img} onFileChange={fileChange} />
              <TextInput
                label="Название:"
                autoFocus
                value={item.name}
                onChange={(event) => handleChangeName(index, event.currentTarget.value)}
              />
              <div>
                <h4>Описание:</h4>
                <BulletPoints label="" bullets={item.bullets} />
              </div>
              <TextInput
                label="Стоимость:"
                value={item.cost}
                onChange={(event) => handleChangeCost(index, event.currentTarget.value)}
              />
            </div>
          </div>
          <Button variant="subtle" color="red" onClick={() => handleRemove(index)} className={css.deleteButton}>
            Удалить
          </Button>
        </div>
      ))}
      </div>
      <Button onClick={handleAdd} variant="light">
        <IconPlus size={16} />
      </Button>
    </div>
  )
}

const MassageContent = () => {
  let data = massage
  const fileChange = () => {}
  const applyChanges = () => {}

  return (
    <div className={css.tabContent}>
      <div className="row">
        <div className={css.content}>
          <TextInput value={data.title} />
          <TextInput value={data.whatItIsTitle} />
          <Textarea value={data.whatItIsText} />
        </div>
        <MediaEditor initialSrc={data.img} onFileChange={fileChange} />
      </div>

      <BulletPoints label={data.aboutTitle} bullets={data.about} />
      <BulletPoints label={data.advantagesTitle} bullets={data.advantages} />

      <TextInput value={data.servicesTitle} />
      <Items items={data.services} />

      <ApplyButton onClick={applyChanges} />
    </div>
  )
}

export default MassageContent
