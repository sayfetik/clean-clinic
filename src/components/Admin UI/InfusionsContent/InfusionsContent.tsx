import { Textarea, TextInput, Button } from '@mantine/core'
import { useEffect, useState } from 'react'
import * as infusionsApi from '../../../api/InfusionsAPI'
import { emptyInfusionCatalog } from '../../../lib/empty'
import { InfusionCatalogType, InfusionType } from '../../../lib/types'
import MediaEditor from '../../MediaEditor/MediaEditor'
import ApplyButton from '../ApplyButton'
import BulletPoints from '../BulletPoints'
import UpdateButton from '../UpdateButton'
import css from './index.module.scss'

const InfusionSection = ({
  infusion,
  onChange,
  onSave,
  onDelete,
}: {
  infusion: InfusionType
  onChange: (field: keyof InfusionType['ivsInfo'], value: any) => void
  onSave: () => void
  onDelete: () => void
}) => {
  const [open, setOpen] = useState(Boolean(infusion.ivsInfo.isNew))
  const { ivsInfo } = infusion
  const handleFileChange = (file: File) => onChange('imagePath', file)
  return (
    <div className={css.infusion}>
      <div className={css.header} onClick={() => setOpen(!open)}>
        <div className="row">
          <h4>{ivsInfo.name}</h4>
        </div>
      </div>
      <div className={`${css.content} ${open ? css.show : ''}`}>
        <div className={css.upperSection}>
          <MediaEditor
            initialSrc={
              typeof ivsInfo.imagePath === 'string'
                ? ivsInfo.imagePath
                : ivsInfo.imagePath instanceof File
                  ? URL.createObjectURL(ivsInfo.imagePath)
                  : ''
            }
            onFileChange={handleFileChange}
          />
          <div className={css.mainInfo}>
            <TextInput
              label="Название:"
              value={ivsInfo.name}
              onChange={(e) => onChange('name', e.currentTarget.value)}
            />
            <TextInput
              label="Стоимость:"
              value={ivsInfo.price}
              onChange={(e) => onChange('price', e.currentTarget.value)}
            />
            <TextInput
              label="Длительность:"
              value={ivsInfo.duration || ''}
              onChange={(e) => onChange('duration', e.currentTarget.value)}
            />
          </div>
        </div>
        <h4>Описание</h4>
        <BulletPoints label="" bullets={ivsInfo.description || []} onChange={(arr) => onChange('description', arr)} />
        <h4>Результаты</h4>
        <BulletPoints label="" bullets={ivsInfo.results || []} onChange={(arr) => onChange('results', arr)} />
        <h4>Показания</h4>
        <BulletPoints label="" bullets={ivsInfo.indications || []} onChange={(arr) => onChange('indications', arr)} />
        <h4>Противопоказания</h4>
        <BulletPoints
          label=""
          bullets={ivsInfo.contraindications || []}
          onChange={(arr) => onChange('contraindications', arr)}
        />
        <div className="margin" />
        <UpdateButton onClick={async () => onSave()} />
        <Button variant="light" color="red" onClick={onDelete} mt={8}>
          Удалить
        </Button>
      </div>
    </div>
  )
}

const InfusionsContent = () => {
  const [data, setData] = useState<InfusionCatalogType>(emptyInfusionCatalog)

  useEffect(() => {
    infusionsApi.getInfusionCatalog().then(setData)
  }, [])

  if (!data) {
    return null
  }

  const handleCatalogChange = (field: string, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveInfusion = async (category: string, index: number) => {
    const item = data.infusionsByCategory.find((c) => c.category === category)
    if (!item) {
      return
    }
    const infusion = item.infusions[index]
    let response: InfusionType
    if (infusion.ivsInfo.isNew) {
      response = await infusionsApi.createInfusion({
        name: infusion.ivsInfo.name,
        price: Number(infusion.ivsInfo.price),
        imagePath: infusion.ivsInfo.imagePath as File,
        duration: infusion.ivsInfo.duration || '',
        description: infusion.ivsInfo.description || [],
        results: infusion.ivsInfo.results || [],
        indications: infusion.ivsInfo.indications || [],
        contradictions: infusion.ivsInfo.contraindications || [],
        category: category,
      })
      setData((prev) => ({
        ...prev,
        infusionsByCategory: prev.infusionsByCategory.map((cat) =>
          cat.category === category
            ? {
                ...cat,
                infusions: cat.infusions.map((inf, i) =>
                  i === index
                    ? {
                        ...inf,
                        infusionId: response.id,
                        ivsInfo: { ...inf.ivsInfo, isNew: false },
                      }
                    : inf
                ),
              }
            : cat
        )
        
      }))
    } else {
      response = await infusionsApi.updateInfusion({
        id: infusion.infusionId,
        name: infusion.ivsInfo.name,
        price: Number(infusion.ivsInfo.price),
        imagePath: infusion.ivsInfo.imagePath,
        duration: infusion.ivsInfo.duration || '',
        description: infusion.ivsInfo.description || [],
        results: infusion.ivsInfo.results || [],
        indications: infusion.ivsInfo.indications || [],
        contradictions: infusion.ivsInfo.contraindications || [],
      })
      setData((prev) => ({
        ...prev,
        infusionsByCategory: prev.infusionsByCategory.map((cat) =>
          cat.category === category
            ? {
                ...cat,
                infusions: cat.infusions.map((inf, i) =>
                  i === index
                    ? {
                        ...inf,
                        ivsInfo: { ...response.ivsInfo, isNew: false },
                      }
                    : inf
                ),
              }
            : cat
        ),
      }))
    }
  }

  const handleDeleteInfusion = async (category: string, index: number) => {
    const cat = data.infusionsByCategory.find((c) => c.category === category)
    if (!cat) {
      return
    }
    const infusion = cat.infusions[index]
    setData((prev) => ({
      ...prev,
      infusionsByCategory: prev.infusionsByCategory.map((c) =>
        c.category === category ? { ...c, infusions: c.infusions.filter((_, i) => i !== index) } : c
      ),
    }))
    if (infusion.infusionId) {
      await infusionsApi.deleteTreatment(infusion.infusionId)
    }
  }

  const handleHowToChooseChange = (field: keyof typeof data.howToChooseCard, value: string) => {
    setData((prev) => ({
      ...prev,
      howToChooseCard: {
        ...prev.howToChooseCard,
        [field]: value,
      },
    }))
  }

  const handleAddInfusion = (category: string) => {
    setData((prev) => ({
      ...prev,
      infusionsByCategory: prev.infusionsByCategory.map((cat) =>
        cat.category === category
          ? {
              ...cat,
              infusions: [
                ...cat.infusions,
                {
                  id: '',
                  infusionId: '',
                  ivsInfo: {
                    id: '',
                    name: '',
                    price: 0,
                    imagePath: '',
                    duration: '',
                    description: [],
                    results: [],
                    indications: [],
                    contraindications: [],
                    isNew: true,
                  },
                },
              ],
            }
          : cat
      ),
    }))
  }

  const applyChanges = async () => {
    await infusionsApi.editInfusionCatalog({
      Id: data.id,
      Title: data.title,
      Img: data.img,
      WhatisTitle: data.whatItIsTitle,
      WhatIsText1: data.whatItIsText1,
      WhatIsText2: data.whatItIsText2,
      ServicesTitle: data.servicesTitle,
      AdvantagesTitle: data.advantagesTitle,
      Advantages: data.advantages,
      AdvantagesText: data.advantagesText,
    })
  }

  return (
    <div className={css.tabContent}>
      <TextInput value={data.title} onChange={(e) => handleCatalogChange('title', e.currentTarget.value)} />
      <div className="margin" />
      <MediaEditor
        initialSrc={
          typeof data.img === 'string' ? data.img : data.img instanceof File ? URL.createObjectURL(data.img) : ''
        }
        onFileChange={(file) => handleCatalogChange('img', file)}
      />
      <TextInput
        value={data.whatItIsTitle}
        onChange={(e) => handleCatalogChange('whatItIsTitle', e.currentTarget.value)}
      />
      <Textarea
        value={data.whatItIsText1}
        onChange={(e) => handleCatalogChange('whatItIsText1', e.currentTarget.value)}
      />
      <Textarea
        value={data.whatItIsText2}
        onChange={(e) => handleCatalogChange('whatItIsText2', e.currentTarget.value)}
      />
      <BulletPoints
        label={data.advantagesTitle}
        bullets={data.advantages}
        onChange={(arr) => handleCatalogChange('advantages', arr)}
      />
      {data.infusionsByCategory &&
        data.infusionsByCategory.map((item) => (
          <div key={item.category}>
            <div className="row">
              <h3 className="blue">Группа:</h3>
              <TextInput value={item.category} readOnly />
            </div>
            {item.infusions.map((infusion: InfusionType, i: number) => (
              <InfusionSection
                key={infusion.infusionId || i}
                infusion={infusion}
                onChange={(field, value) =>
                  setData((prev) => ({
                    ...prev,
                    infusionsByCategory: prev.infusionsByCategory.map((cat) =>
                      cat.category === item.category
                        ? {
                            ...cat,
                            infusions: cat.infusions.map((inf, idx) =>
                              idx === i
                                ? {
                                    ...inf,
                                    ivsInfo: { ...inf.ivsInfo, [field]: value },
                                  }
                                : inf
                            ),
                          }
                        : cat
                    ),
                  }))
                }
                onSave={() => handleSaveInfusion(item.category, i)}
                onDelete={() => handleDeleteInfusion(item.category, i)}
              />
            ))}
            <Button mt={12} variant="outline" onClick={() => handleAddInfusion(item.category)}>
              + Добавить
            </Button>
          </div>
        ))}
      <ApplyButton onClick={applyChanges} />
      <div className={css.block}>
        <TextInput
          value={data.howToChooseCard.title}
          onChange={(e) => handleHowToChooseChange('title', e.currentTarget.value)}
        />
        <TextInput
          value={data.howToChooseCard.additionalText}
          onChange={(e) => handleHowToChooseChange('additionalText', e.currentTarget.value)}
        />
        <Textarea
          value={data.howToChooseCard.text}
          onChange={(e) => handleHowToChooseChange('text', e.currentTarget.value)}
        />
        <UpdateButton
          onClick={async () => {
            await infusionsApi.editHowToChooseCard({
              id: data.howToChooseCard.id,
              title: data.howToChooseCard.title,
              additionalText: data.howToChooseCard.additionalText,
              text: data.howToChooseCard.text,
            })
          }}
        />
      </div>
    </div>
  )
}

export default InfusionsContent
