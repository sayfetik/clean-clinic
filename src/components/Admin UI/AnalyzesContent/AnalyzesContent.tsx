import { Textarea, Button, TextInput } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useState, useRef, useEffect } from 'react'
import * as analysesApi from '../../../api/AnalysesAPI'
import { emptyAnalyzes } from '../../../lib/empty'
import MediaEditor from '../../MediaEditor/MediaEditor'
import ApplyButton from '../ApplyButton'
import BulletPoints from '../BulletPoints'
import css from '../CryoContent/index.module.scss'

type ServiceType = { id: number; name: string; bullets: string[]; cost: number; img: string }

const Items: React.FC<{ items: ServiceType[]; onChange: (items: ServiceType[]) => void }> = ({
  items: initialItems,
  onChange,
}) => {
  const [items, setItems] = useState<ServiceType[]>(initialItems)
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([])

  useEffect(() => {
    onChange(items)
  }, [items])

  const fileChange = () => {}

  const handleAdd = () => {
    setItems((prev) => {
      const newItem: ServiceType = {
        id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
        name: '',
        cost: 0,
        bullets: [''],
        img: '',
      }
      const newItems = [...prev, newItem]
      setTimeout(() => {
        const lastIndex = newItems.length - 1
        if (textareaRefs.current[lastIndex]) {
          textareaRefs.current[lastIndex]?.focus()
        }
      }, 0)
      return newItems
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
    newItems[index].cost = value === '' ? 0 : Number(value)
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

const PlasmoliftingContent = () => {
  const [data, setData] = useState(emptyAnalyzes)

  useEffect(() => {
    const fetchData = async () => {
      const response = await analysesApi.getAnalyses()
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
          <Textarea value={data.paragraph1} />
          <Textarea value={data.paragraph2} />
          <Textarea value={data.paragraph3} />
        </div>
        <MediaEditor initialSrc={data.img} onFileChange={fileChange} />
      </div>

      <TextInput value={data.procedureTitle} />
      <Textarea value={data.procedureText} />
      <div className="margin" />

      <TextInput value={data.servicesTitle} />
      <Items items={data.services} onChange={(services) => setData((prev) => ({ ...prev, services }))} />

      <ApplyButton onClick={applyChanges} />
    </div>
  )
}

export default PlasmoliftingContent
