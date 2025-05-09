import { Textarea, Button, TextInput } from '@mantine/core'
import { useState, useEffect } from 'react'
import * as massageApi from '../../../api/MassageAPI'
import { emptyMassage } from '../../../lib/empty'
import { MassageServiceType } from '../../../lib/types'
import MediaEditor from '../../MediaEditor/MediaEditor'
import ApplyButton from '../ApplyButton'
import BulletPoints from '../BulletPoints'
import UpdateButton from '../UpdateButton'
import css from './index.module.scss'

const MassageContent = () => {
  const [data, setData] = useState(emptyMassage)

  useEffect(() => {
    const fetchData = async () => {
      const response = await massageApi.getMassage()
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
      services: [...prev.services, { id: Date.now(), name: '', cost: 0, bullets: [], img: '', isNew: true }],
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

  const handleBulletsChange = (index: number, bullets: string[]) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((item, i) => (i === index ? { ...item, bullets } : item)),
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
    let response: MassageServiceType
    if (!item.id || item.id < 0 || item.isNew) {
      response = await massageApi.createMassageService(item)
      setData((prev) => ({
        ...prev,
        services: prev.services.map((s, i) => (i === index ? { ...s, id: response.id, isNew: false } : s)),
      }))
    } else {
      const formData = new FormData()
      formData.append('Id', String(item.id))
      formData.append('Name', item.name)
      formData.append('Cost', String(item.cost))
      item.bullets.forEach((b) => formData.append('Bullets', b))
      if (item.img instanceof File) {
        formData.append('Img', item.img)
      }
      await massageApi.updateMassageService(item.id, formData)
      setData((prev) => ({
        ...prev,
        services: prev.services.map((s, i) => (i === index ? { ...s, ...response, isNew: false } : s)),
      }))
    }
  }

  const handleDelete = async (id: number) => {
    const index = data.services.findIndex((s) => s.id === id)
    const item = data.services[index]
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }))
    if (item && item.id && item.id > 0 && !item.isNew) {
      await massageApi.deleteMassageService(item.id)
    }
  }

  const applyChanges = async () => {
    const formData = new FormData()
    formData.append('title', data.title)
    if (typeof data.img !== 'string' && data.img) {
      formData.append('img', data.img)
    }
    formData.append('whatItIsTitle', data.whatItIsTitle)
    formData.append('whatItIsText', data.whatItIsText)
    formData.append('aboutTitle', data.aboutTitle)
    data.about.forEach((a) => formData.append('about', a))
    formData.append('advantagesTitle', data.advantagesTitle)
    data.advantages.forEach((a) => formData.append('advantages', a))
    formData.append('servicesTitle', data.servicesTitle)
    await massageApi.updateMassageCatalog(formData)
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
                  <div>
                    <h4>Описание:</h4>
                    <BulletPoints
                      label=""
                      bullets={item.bullets}
                      onChange={(bullets) => handleBulletsChange(index, bullets)}
                    />
                  </div>
                  <TextInput
                    label="Стоимость:"
                    value={item.cost}
                    onChange={(event) => handleChangeCost(index, event.currentTarget.value)}
                  />
                  <UpdateButton onClick={() => handleSave(index)} />
                </div>
              </div>
              <Button variant="subtle" color="red" onClick={() => handleDelete(item.id)} className={css.deleteButton}>
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

export default MassageContent
