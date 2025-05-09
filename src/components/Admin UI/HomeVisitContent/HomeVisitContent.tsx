import { Textarea, Button, TextInput } from '@mantine/core'
import { useState, useEffect } from 'react'
import * as homeVisitApi from '../../../api/HomeVisitAPI'
import { emptyHomeVisit } from '../../../lib/empty'
import { HomeVisitServiceType } from '../../../lib/types'
import MediaEditor from '../../MediaEditor/MediaEditor'
import ApplyButton from '../ApplyButton'
import UpdateButton from '../UpdateButton'
import css from './index.module.scss'

const HomeVisitContent = () => {
  const [data, setData] = useState(emptyHomeVisit)

  useEffect(() => {
    const fetchData = async () => {
      const response = await homeVisitApi.getHomeVisitPage()
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
    let response: HomeVisitServiceType
    if (!item.id || item.id < 0 || item.isNew) {
      response = await homeVisitApi.createHomeVisitService(item)
      setData((prev) => ({
        ...prev,
        services: prev.services.map((s, i) => (i === index ? { ...s, id: response.id, isNew: false } : s)),
      }))
    } else {
      const formData = new FormData()
      formData.append('Id', String(item.id))
      formData.append('Name', item.name)
      formData.append('Cost', String(item.cost))
      if (item.img instanceof File) {
        formData.append('Img', item.img)
      }
      response = await homeVisitApi.editHomeVisitService(item.id, formData)
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
      await homeVisitApi.deleteHomeVisitService(item.id)
    }
  }

  const applyChanges = async () => {
    const formData = new FormData()
    formData.append('Id', String(data.id))
    formData.append('Title', data.title)
    formData.append('Img', typeof data.img === 'string' ? '' : (data.img as File))
    formData.append('WhatItIsTitle', data.whatItIsTitle)
    formData.append('Paragraph1', data.paragraph1)
    formData.append('Paragraph2', data.paragraph2)
    formData.append('Paragraph3', data.paragraph3)
    formData.append('ServicesTitle', data.servicesTitle)
    await homeVisitApi.editHomeVisit(formData)
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
            value={data.paragraph1}
            onChange={(e) => setData((prev) => ({ ...prev, paragraph1: e.target.value }))}
          />
          <Textarea
            value={data.paragraph2}
            onChange={(e) => setData((prev) => ({ ...prev, paragraph2: e.target.value }))}
          />
          <Textarea
            value={data.paragraph3}
            onChange={(e) => setData((prev) => ({ ...prev, paragraph3: e.target.value }))}
          />
        </div>
        <MediaEditor
          initialSrc={
            typeof data.img === 'string' ? data.img : data.img instanceof File ? URL.createObjectURL(data.img) : ''
          }
          onFileChange={handleFileChange}
        />
      </div>
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

export default HomeVisitContent
