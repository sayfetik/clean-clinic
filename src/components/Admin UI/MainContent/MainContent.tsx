import { Textarea, TextInput, MultiSelect } from '@mantine/core'
import { useEffect, useState } from 'react'
import { MediaEditor } from '../../'
import * as mainPageApi from '../../../api/MainAPI'
import { mainInfusions } from '../../../lib/data'
// import { patientImage } from '../../../lib/data'
import { emptyMainPage } from '../../../lib/empty'
import { MainPageType } from '../../../lib/types'
import UpdateButton from '../UpdateButton'
import Faqs from './Faqs'
import Feedbacks from './Feedbacks'
import Services from './Services'
import css from './index.module.scss'

const MainContent = () => {
  const [data, setData] = useState(emptyMainPage)
  const [infusions, setInfusions] = useState<string[]>([])

  useEffect(() => {
    const fetchMainPage = async () => {
      const main = await mainPageApi.getMainPage()
      setData(main)
    }
    fetchMainPage()
  }, [])

  const handleChange = (path: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => {
      const keys = path.split('.')
      const newData = { ...prev }
      let obj: any = newData
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] }
        obj = obj[keys[i]]
      }
      obj[keys[keys.length - 1]] = e.target.value
      return newData
    })
  }

  const handleArrayChange =
    (arrKey: keyof MainPageType | string, index: number, field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData((prev) => {
        const keys = arrKey.split('.')
        const newData = { ...prev }
        let obj: any = newData
        for (let i = 0; i < keys.length - 1; i++) {
          obj[keys[i]] = { ...obj[keys[i]] }
          obj = obj[keys[i]]
        }
        obj[keys[keys.length - 1]] = (obj[keys[keys.length - 1]] as any[]).map((item, i) =>
          i === index ? { ...item, [field]: e.target.value } : item
        )
        return newData
      })
    }

  const handleProblemImageChange = (file: File) => {
    setData((prev) => ({ ...prev, problemImage: file }))
  }

  const handleWhiteCardImageChange = (index: number, file: File) => {
    setData((prev) => {
      const newWhiteCards = prev.whiteCards.map((card, i) => (i === index ? { ...card, imagePath: file } : card))
      return { ...prev, whiteCards: newWhiteCards }
    })
  }

  const handleInfusionsChange = (value: string[]) => {
    setInfusions(value)
    setData((prev) => ({
      ...prev,
      infusions: { ...prev.infusions, selected: value },
    }))
  }

  function getInfusionPlaceholder(count: number): string {
    if (count === 0) {
      return ''
    }
    const lastDigit = count % 10
    const lastTwoDigits = count % 100
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `Выберите ${count} капельниц`
    }
    if (lastDigit === 1) {
      return `Выберите ${count} капельницу`
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `Выберите ${count} капельницы`
    }
    return `Выберите ${count} капельниц`
  }

  const handleServicesChange = (newServices: any[]) => {
    setData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        services: newServices,
      },
    }))
  }

  const handleServiceImage = (index: number, file: File) => {
    setData((prev) => {
      const newArr = prev.services.services.map((item: any, i: number) => (i === index ? { ...item, img: file } : item))
      return {
        ...prev,
        services: {
          ...prev.services,
          services: newArr,
        },
      }
    })
  }

  const handleWeWorkSave = async () => {
    await mainPageApi.updateWeWork({
      id: data.weWork.id,
      img: data.weWork.img,
      title: data.weWork.title,
      text: data.weWork.text,
      numSpecialists: data.weWork.numSpecialists,
      numPatients: data.weWork.numPatients,
    })
  }

  const handleFormSave = async () => {
    await mainPageApi.updateForm({
      formId: data.form.id,
      title: data.form.title,
    })
  }

  const handleWhyInfusionsSave = async () => {
    await mainPageApi.updateWhyInfusions({
      id: data.whyInfusions.id,
      title: data.whyInfusions.title,
      answer: data.whyInfusions.answer,
      text1: data.whyInfusions.text1,
      text2: data.whyInfusions.text2,
    })
  }

  const sendToBack = async () => {
    await mainPageApi.updateMainPage(data)
  }

  return (
    <div className={css.tabContent}>
      <MediaEditor
        initialSrc={
          typeof data.weWork.img === 'string'
            ? data.weWork.img
            : data.weWork.img instanceof File
              ? URL.createObjectURL(data.weWork.img)
              : ''
        }
        onFileChange={() => {}}
      />
      <TextInput value={data.weWork.title} onChange={handleChange('weWork.title')} />
      <Textarea value={data.weWork.text} onChange={handleChange('weWork.text')} />
      <div className="row">
        <TextInput
          value={data.weWork.numSpecialists}
          onChange={handleChange('weWork.numSpecialists')}
          rightSectionPointerEvents="none"
          rightSection="специалистов"
          rightSectionWidth={120}
        />
        <TextInput
          value={data.weWork.numPatients}
          onChange={handleChange('weWork.numPatients')}
          rightSectionPointerEvents="none"
          rightSection="счастливых пациентов"
          rightSectionWidth={180}
        />
      </div>
      <UpdateButton onClick={handleWeWorkSave} />

      <div className="margin"></div>

      <div className="row">
        {data.advantages.map((advantage, index) => (
          <div key={index}>
            <TextInput value={advantage.title} onChange={handleArrayChange('advantages', index, 'title')} />
            <Textarea
              value={advantage.text}
              onChange={handleArrayChange('advantages', index, 'text')}
              className={css.fullWidth}
            />
            <UpdateButton
              onClick={() =>
                mainPageApi.updateAdvantageType({
                  id: String(advantage.id),
                  title: advantage.title,
                  text: advantage.text,
                })
              }
            />
          </div>
        ))}
      </div>

      <div className="margin"></div>

      <TextInput value={data.form.title} onChange={handleChange('form.title')} />
      <UpdateButton onClick={handleFormSave} />

      <div className="margin"></div>

      <TextInput value={data.whyInfusions.title} onChange={handleChange('whyInfusions.title')} />
      <TextInput value={data.whyInfusions.answer} onChange={handleChange('whyInfusions.answer')} />
      <Textarea value={data.whyInfusions.text1} onChange={handleChange('whyInfusions.text1')} />
      <Textarea value={data.whyInfusions.text2} onChange={handleChange('whyInfusions.text2')} />
      <UpdateButton onClick={handleWhyInfusionsSave} />

      <div className="row">
        {data.whiteCards.map((card, index) => (
          <div key={index} className={css.blockWithoutBorder}>
            <MediaEditor
              initialSrc={typeof card.imagePath === 'string' ? card.imagePath : ''}
              onFileChange={(file) => handleWhiteCardImageChange(index, file)}
            />
            <TextInput value={card.title} onChange={handleArrayChange('whiteCards', index, 'title')} />
            <Textarea
              className={css.fullWidth}
              value={card.text}
              onChange={handleArrayChange('whiteCards', index, 'text')}
            />
            <UpdateButton
              onClick={() =>
                mainPageApi.updateWhiteCard({
                  id: String(card.id),
                  title: card.title,
                  text: card.text,
                  imagePath: card.imagePath,
                })
              }
            />
          </div>
        ))}
      </div>

      <div className="margin"></div>

      <TextInput value={data.problemTitle} onChange={handleChange('problemTitle')} />
      <div className="row">
        <MediaEditor
          initialSrc={
            typeof data.problemImage === 'string'
              ? data.problemImage
              : data.problemImage instanceof File
                ? URL.createObjectURL(data.problemImage)
                : ''
          }
          onFileChange={handleProblemImageChange}
        />
        <div className={css.problems}>
          {data.problems.map((problem, index) => (
            <div key={index}>
              <TextInput value={problem.title} onChange={handleArrayChange('problems', index, 'title')} />
              <Textarea
                className={css.fullWidth}
                value={problem.text}
                onChange={handleArrayChange('problems', index, 'text')}
              />
              <UpdateButton
                onClick={() =>
                  mainPageApi.updateProblem({
                    id: problem.id,
                    title: problem.title,
                    text: problem.text,
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <UpdateButton onClick={sendToBack} />

      <div className="margin"></div>

      <TextInput value={data.infusionInstructions.title} onChange={handleChange('infusionInstructions.title')} />
      <TextInput value={data.infusionInstructions.answer} onChange={handleChange('infusionInstructions.answer')} />
      <UpdateButton
        onClick={() =>
          mainPageApi.updateInfusionInstructions({
            id: data.infusionInstructions.id,
            title: data.infusionInstructions.title,
            answer: data.infusionInstructions.answer,
          })
        }
      />
      <div className="row">
        {data.infusionInstructions.steps.map((card, index) => (
          <div key={index} className={css.block}>
            <TextInput value={card.title} onChange={handleArrayChange('infusionInstructions.steps', index, 'title')} />
            <Textarea
              className={css.fullWidth}
              minRows={1}
              maxRows={15}
              value={card.text}
              onChange={handleArrayChange('infusionInstructions.steps', index, 'text')}
            />
          </div>
        ))}
      </div>

      <div>
        <h4 className={css.text}>Выберите капельницы, которые будут отображаться на главной странице:</h4>
        <p>{'(информацию о капельницах вы можете изменить во вкладке "Капельницы")'}</p>
      </div>

      <TextInput value={data.infusions.title} onChange={handleChange('infusions.title')} />
      <Textarea value={data.infusions.text} onChange={handleChange('infusions.text')} />

      <MultiSelect
        value={infusions}
        onChange={handleInfusionsChange}
        placeholder={getInfusionPlaceholder(6 - infusions.length)}
        data={mainInfusions}
        searchable
        clearable
        nothingFoundMessage="Такой капельницы нет..."
        maxValues={6}
        hidePickedOptions
      />

      <TextInput value={data.services.tittle} onChange={handleChange('serviceTitle')} />
      <Services services={data.services.services} onChange={handleServicesChange} onImageChange={handleServiceImage} />

      <TextInput value={data.faq.faqTitle} onChange={handleChange('faqTitle')} />
      <Faqs
        faqs={data.faq.faqs}
        onChange={(faqs) =>
          setData((prev) => ({
            ...prev,
            faq: {
              ...prev.faq,
              faqs: faqs.map((faq) => ({
                ...faq,
                id: Number(faq.id),
              })),
            },
          }))
        }
      />

      <h4 className={css.text}>Отзывы</h4>
      <Feedbacks
        feedbacks={data.feedback}
        onChange={(feedbacks) =>
          setData((prev) => ({
            ...prev,
            feedback: feedbacks.map((feedback) => ({
              ...feedback,
              id: feedback.id || 0,
              rate: typeof feedback.rate === 'string' ? parseFloat(feedback.rate) : feedback.rate,
            })),
          }))
        }
      />
    </div>
  )
}

export default MainContent
