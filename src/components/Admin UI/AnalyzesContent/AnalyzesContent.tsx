import { Textarea, Button, TextInput } from '@mantine/core'
import { useState, useEffect } from 'react'
import * as analysesApi from '../../../api/AnalysesAPI'
import { emptyAnalyzes } from '../../../lib/empty'
import { AnalyzesServiceType } from '../../../lib/types'
import MediaEditor from '../../MediaEditor/MediaEditor'
import ApplyButton from '../ApplyButton'
import BulletPoints from '../BulletPoints'
import css from '../CryoContent/index.module.scss'
import UpdateButton from '../UpdateButton'

const AnalyzesContent = () => {
  const [data, setData] = useState(emptyAnalyzes)

  useEffect(() => {
    const fetchData = async () => {
      const response = await analysesApi.getAnalyses()
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
      services: [...prev.services, { id: Date.now(), name: '', bullets: [''], cost: 0, img: '', isNew: true }],
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
    let response: AnalyzesServiceType
    if (!item.id || item.id < 0 || item.isNew) {
      response = await analysesApi.createAnalyseService(item)
      setData((prev) => ({
        ...prev,
        services: prev.services.map((s, i) => (i === index ? { ...s, id: response.id, isNew: false } : s)),
      }))
    } else {
      await analysesApi.editAnalyseService(item)
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
      await analysesApi.deleteAnalyseService(item.id)
    }
  }

  const applyChanges = async () => {
    await analysesApi.updateAnalysePage({
      id: data.id,
      title: data.title,
      img: data.img,
      paragraph1: data.paragraph1,
      paragraph2: data.paragraph2,
      paragraph3: data.paragraph3,
      procedureTitle: data.procedureTitle,
      procedureText: data.procedureText,
      servicesTitle: data.servicesTitle,
    })
  }

  return (
    <div className={css.tabContent}>
      <div className="row">
        <div className={css.content}>
          <TextInput value={data.title} onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))} />
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
        <MediaEditor initialSrc={typeof data.img === 'string' ? data.img : ''} onFileChange={handleFileChange} />
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
                  <div style={{ marginTop: 8 }}>
                    <UpdateButton onClick={() => handleSave(index)} />
                  </div>
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

export default AnalyzesContent
