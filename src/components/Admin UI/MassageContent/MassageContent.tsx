import { Textarea, Button, TextInput } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useState, useRef, useEffect } from 'react'
import * as massageApi from '../../../api/MassageAPI'
import { emptyMassage } from '../../../lib/empty'
import MediaEditor from '../../MediaEditor/MediaEditor'
import ApplyButton from '../ApplyButton'
import BulletPoints from '../BulletPoints'
import css from './index.module.scss'

type MassageType = { id: number; name: string; cost: number; bullets: string[]; img: string }

const Items: React.FC<{ items: MassageType[]; onChange: (items: MassageType[]) => void }> = ({
  items: initialItems,
  onChange,
}) => {
  const [items, setItems] = useState<MassageType[]>(initialItems)
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([])

  useEffect(() => {
    onChange(items)
  }, [items])

  const fileChange = () => {}

  const handleAdd = () => {
    setItems((prevBullets: MassageType[]) => {
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
                  key={index}
                  label="Название:"
                  autoFocus
                  value={item.name}
                  onChange={(event) => handleChangeName(index, event.currentTarget.value)}
                />
                <div>
                  <h4>Описание:</h4>
                  <BulletPoints
                    label=""
                    bullets={item.bullets}
                    onChange={(bullets) => {
                      const newItems = [...items]
                      newItems[index].bullets = bullets
                      setItems(newItems)
                    }}
                  />
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
  const [data, setData] = useState(emptyMassage)

  useEffect(() => {
    const fetchData = async () => {
      const response = await massageApi.getMassage()
      setData(response)
    }
    fetchData()
  }, [])

  const fileChange = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      setData((prev) => ({ ...prev, img: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

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

      <BulletPoints
        label={data.aboutTitle}
        bullets={data.about}
        onChange={(about) => setData((prev) => ({ ...prev, about }))}
      />
      <BulletPoints
        label={data.advantagesTitle}
        bullets={data.advantages}
        onChange={(advantages) => setData((prev) => ({ ...prev, advantages }))}
      />

      <TextInput value={data.servicesTitle} />
      <Items items={data.services} onChange={(services) => setData((prev) => ({ ...prev, services }))} />

      <ApplyButton onClick={applyChanges} />
    </div>
  )
}

export default MassageContent
