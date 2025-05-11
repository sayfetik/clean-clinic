import { Textarea, Button, TextInput } from '@mantine/core'
import { useState, useEffect } from 'react'
import * as cryoApi from '../../../api/CryotherapyAPI'
import { emptyCryotherapy } from '../../../lib/empty'
import MediaEditor from '../../MediaEditor/MediaEditor'
import ApplyButton from '../ApplyButton'
import BulletPoints from '../BulletPoints'
import UpdateButton from '../UpdateButton'
import css from './index.module.scss'

type CryoServiceType = {
  id: number
  name: string
  cost: number
  img: string | File
  isNew?: boolean
}

const CryoContent = () => {
  const [data, setData] = useState(emptyCryotherapy)

  useEffect(() => {
    const fetchData = async () => {
      const response = await cryoApi.getCryo()
      setData(response)
    }
    fetchData()
  }, [])

  const handleFileChange = (file: File) => {
    setData((prev) => ({ ...prev, img: file }))
  }

  const handleAdd = () => {
    setData((prev) => ({
      ...prev,
      services: [...prev.services, { id: Date.now(), name: '', cost: 0, img: '', isNew: true }],
    }))
  }

  const handleChangeName = (index: number, value: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((item, i) => (i === index ? { ...item, name: value } : item)),
    }))
  }

  const handleChangeCost = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) {
      return
    }
    setData((prev) => ({
      ...prev,
      services: prev.services.map((item, i) =>
        i === index ? { ...item, cost: value === '' ? 0 : Number(value) } : item
      ),
    }))
  }

  const handleServiceImage = (index: number, file: File) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((item, i) => (i === index ? { ...item, img: file } : item)),
    }))
  }

  const handleSave = async (index: number) => {
    const item = data.services[index]
    let response: CryoServiceType
    if (!item.id || item.id < 0 || item.isNew) {
      response = await cryoApi.createCryotherapyService(item)
      setData((prev) => ({
        ...prev,
        services: prev.services.map((s, i) => (i === index ? { ...s, id: response.id, isNew: false } : s)),
      }))
    } else {
      response = await cryoApi.editCryotherapyService(item)
    }
  }

  const handleDelete = async (item: CryoServiceType) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== item.id),
    }))
    if (!item.isNew) {await cryoApi.deleteCryotherapyService(item.id)}
  }

  const applyChanges = async () => {
    await cryoApi.editCryotherapy(data)
  }

  return (
    <div className={css.tabContent}>
      <div className="row">
        <div className={css.content}>
          <TextInput value={data.title} onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))} />
          <TextInput
            value={data.whatItIsTitle}
            onChange={(e) => setData((prev) => ({ ...prev, whatItIsTitle: e.target.value }))}
          />
          <Textarea
            value={data.whatItIsText}
            onChange={(e) => setData((prev) => ({ ...prev, whatItIsText: e.target.value }))}
          />
        </div>
        <MediaEditor initialSrc={typeof data.img === 'string' ? data.img : ''} onFileChange={handleFileChange} />
      </div>
      <div className="row">
        <BulletPoints
          label="Показания:"
          bullets={data.indications}
          onChange={(arr) => setData((prev) => ({ ...prev, indications: arr }))}
        />
        <BulletPoints
          label="Противопоказания:"
          bullets={data.contraindications}
          onChange={(arr) => setData((prev) => ({ ...prev, contraindications: arr }))}
        />
      </div>
      <TextInput
        value={data.procedureTitle}
        onChange={(e) => setData((prev) => ({ ...prev, procedureTitle: e.target.value }))}
      />
      <Textarea
        value={data.procedureText}
        onChange={(e) => setData((prev) => ({ ...prev, procedureText: e.target.value }))}
      />
      <div className="margin" />
      <TextInput
        value={data.servicesTitle}
        onChange={(e) => setData((prev) => ({ ...prev, servicesTitle: e.target.value }))}
      />
      <div>
        <div className={css.services}>
          {data.services.map((item, index) => (
            <div key={item.id ?? index} className={css.bulletItem}>
              <div className={css.card}>
                <div className={css.content}>
                  <MediaEditor
                    initialSrc={
                      typeof item.img === 'string'
                        ? item.img
                        : item.img instanceof File
                          ? URL.createObjectURL(item.img)
                          : ''
                    }
                    onFileChange={(file) => handleServiceImage(index, file)}
                  />
                  <TextInput
                    label="Название:"
                    value={item.name}
                    onChange={(event) => handleChangeName(index, event.currentTarget.value)}
                  />
                  <TextInput
                    label="Стоимость:"
                    value={item.cost}
                    onChange={(event) => handleChangeCost(index, event.currentTarget.value)}
                  />
                  <UpdateButton onClick={() => handleSave(index)} />
                </div>
              </div>
              <Button variant="subtle" color="red" onClick={() => handleDelete(item)} className={css.deleteButton}>
                Удалить
              </Button>
            </div>
          ))}
        </div>
        <Button onClick={handleAdd} variant="outline">
          Добавить услугу
        </Button>
      </div>
      <ApplyButton onClick={applyChanges} />
    </div>
  )
}

export default CryoContent
