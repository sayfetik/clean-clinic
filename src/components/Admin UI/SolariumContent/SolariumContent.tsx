import { Textarea, Button, TextInput } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useState, useRef, useEffect } from 'react'
import * as solarium from '../../../api/SolariumAPI'
import { emptySolarium } from '../../../lib/empty'
import MediaEditor from '../../MediaEditor/MediaEditor'
import ApplyButton from '../ApplyButton'
import BulletPoints from '../BulletPoints'
import css from './index.module.scss'

type CryoType = { id: number; name: string; cost: number; img: string }

const Items: React.FC<{ items: CryoType[]; onChange: (items: CryoType[]) => void }> = ({
  items: initialItems,
  onChange,
}) => {
  const [items, setItems] = useState<CryoType[]>(initialItems)
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([])

  useEffect(() => {
    onChange(items)
  }, [items])

  const fileChange = () => {}

  const handleAdd = () => {
    setItems((prevBullets: CryoType[]) => {
      const newBullet: CryoType = {
        id: prevBullets.length > 0 ? prevBullets[prevBullets.length - 1].id + 1 : 1,
        name: '',
        cost: 0,
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
    setItems(items.filter((_, i) => i !== index))
  }

  const handleChangeName = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index].name = value
    setItems(newItems)
  }

  const handleChangeCost = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index].cost = Number(value)
    setItems(newItems)
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

const SolariumContent = () => {
  const [data, setData] = useState(emptySolarium)

  useEffect(() => {
    const fetchData = async () => {
      const response = await solarium.getSolarium()
      setData(response)
    }
    fetchData()
  }, [])

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

      <TextInput value={data.paragraphTitle} />
      <BulletPoints
        label=""
        bullets={data.paragraph}
        onChange={(paragraph) => setData((prev) => ({ ...prev, paragraph }))}
      />
      <div className="margin" />

      <TextInput value={data.servicesTitle} />
      <Items items={data.services} onChange={(services) => setData((prev) => ({ ...prev, services }))} />

      <ApplyButton onClick={applyChanges} />
    </div>
  )
}

export default SolariumContent
