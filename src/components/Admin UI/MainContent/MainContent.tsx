import { Textarea, TextInput, MultiSelect, Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { ApplyButton, MediaEditor } from '../../'
import * as mainPageApi from '../../../api/MainAPI'
import { mainInfusions } from '../../../lib/data'
// import { patientImage } from '../../../lib/data'
import { emptyMainPage } from '../../../lib/empty'
import { MainPageType } from '../../../lib/types'
import UpdateButton from '../UpdateButton'
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
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setData((prev) => ({ ...prev, problemImage: result }))
    }
    reader.readAsDataURL(file)
  }

  const handleWhiteCardImageChange = (index: number, file: File) => {
    setData((prev) => {
      const newWhiteCards = prev.whiteCards.map((card, i) => (i === index ? { ...card, imagePath: file } : card))
      return { ...prev, whiteCards: newWhiteCards }
    })
  }

  // const handleServiceImageChange = (index: number, file: File) => {
  //   setData((prev) => {
  //     const newArr = prev.services.services.map((item: any, i: number) => (i === index ? { ...item, img: file } : item))
  //     return {
  //       ...prev,
  //       services: {
  //         ...prev.services,
  //         services: newArr,
  //       },
  //     }
  //   })
  // }

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

  const handleAddFaq = () => {
    setData((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        faqs: [...prev.faq.faqs, { id: Date.now(), question: '', answer: '' }],
      },
    }))
  }

  const handleAddFeedback = () => {
    setData((prev) => ({
      ...prev,
      feedback: [...prev.feedback, { id: Date.now(), name: '', rate: 0, text: '' }],
    }))
  }

  const sendToBack = async () => {
    await mainPageApi.updateMainPage(data)
  }

  return (
    <div className={css.tabContent}>
      {/* <MediaEditor initialSrc={patientImage} onFileChange={()=>{}} /> */}
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

      <div className="margin"></div>

      <TextInput value={data.whyInfusions.title} onChange={handleChange('whyInfusions.title')} />
      <TextInput value={data.whyInfusions.answer} onChange={handleChange('whyInfusions.answer')} />
      <Textarea value={data.whyInfusions.text1} onChange={handleChange('whyInfusions.text1')} />
      <Textarea value={data.whyInfusions.text2} onChange={handleChange('whyInfusions.text2')} />

      <div className="row">
        {data.whiteCards.map((card, index) => (
          <div key={index}>
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

      {/* ДОДЕЕЕЕЕEEEEEEEEEEEEEEEEEEEEEEEEEЕЕЛАТЬ */}
      <TextInput value={data.problemTitle} onChange={handleChange('problemTitle')} />
      <div className="row">
        <MediaEditor
          initialSrc={typeof data.problemImage === 'string' ? data.problemImage : ''}
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
            </div>
          ))}
        </div>
      </div>

      <div className="margin"></div>

      <TextInput value={data.infusionInstructions.title} onChange={handleChange('infusionInstructions.title')} />
      <TextInput value={data.infusionInstructions.answer} onChange={handleChange('infusionInstructions.answer')} />
      <div className="row">
        {data.infusionInstructions.steps.map((card, index) => (
          <div key={index}>
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
      <div className="row">
        {data.faq.faqs.map((card, index) => (
          <div key={index}>
            <TextInput value={card.question} onChange={handleArrayChange('faqs', index, 'question')} />
            <Textarea
              className={css.fullWidth}
              minRows={1}
              maxRows={15}
              value={card.answer}
              onChange={handleArrayChange('faqs', index, 'answer')}
            />
          </div>
        ))}
      </div>
      <Button onClick={handleAddFaq} variant="light" className={css.squareButton}>
        <IconPlus size={16} />
      </Button>

      <h4 className={css.text}>Отзывы</h4>
      <div className="row">
        {data.feedback.map((card, index) => (
          <div key={index}>
            <TextInput value={card.name} onChange={handleArrayChange('feedback', index, 'name')} />
            <div className={css.margin}></div>
            <TextInput value={card.rate} onChange={handleArrayChange('feedback', index, 'rate')} />
            <Textarea
              className={css.fullWidth}
              minRows={1}
              maxRows={15}
              value={card.text}
              onChange={handleArrayChange('feedback', index, 'text')}
            />
          </div>
        ))}
      </div>
      <Button onClick={handleAddFeedback} variant="light" className={css.squareButton}>
        <IconPlus size={16} />
      </Button>

      <ApplyButton onClick={sendToBack} />
    </div>
  )
}

export default MainContent
