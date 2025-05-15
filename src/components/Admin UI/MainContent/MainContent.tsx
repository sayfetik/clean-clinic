import { Textarea, TextInput, MultiSelect } from '@mantine/core'
import { useCallback, useEffect, useState } from 'react'
import { MediaEditor } from '../../'
import * as mainPageApi from '../../../api/MainAPI'
import { MainPageType } from '../../../lib/types'
import UpdateButton from '../UpdateButton'
import Faqs from './Faqs'
import Feedbacks from './Feedbacks'
import Services from './Services'
import css from './index.module.scss'

type MainContentProps = {
  data: MainPageType
  setData: React.Dispatch<React.SetStateAction<MainPageType>>
}

const MainContent: React.FC<MainContentProps> = ({ data, setData }) => {
  const [allInfusions, setAllInfusions] = useState<string[]>([])
  const [allInfusionsDict, setAllInfusionsDict] = useState<Record<string, string>>({})
  const [mainInfusions, setMainInfusions] = useState<string[]>([])

  useEffect(() => {
    const fetchInfusions = async () => {
      const res = await mainPageApi.getAllInfusions()
      setAllInfusions(res.names)
      setAllInfusionsDict(res.dict)
      const mainInfusionsRes = await mainPageApi.getMainInfusions()
      setMainInfusions(mainInfusionsRes.map((item: any) => item.name))
    }
    fetchInfusions()
  }, [])

  const handleChange = useCallback(
    (path: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    },
    [setData]
  )

  const handleArrayChange = useCallback(
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
      },
    [setData]
  )

  const handleProblemImageChange = useCallback(
    (file: File) => {
      setData((prev) => ({ ...prev, problemImage: file }))
    },
    [setData]
  )

  const handleWhiteCardImageChange = useCallback(
    (index: number, file: File) => {
      setData((prev) => {
        const newWhiteCards = prev.whiteCards.map((card, i) => (i === index ? { ...card, imagePath: file } : card))
        return { ...prev, whiteCards: newWhiteCards }
      })
    },
    [setData]
  )

  const handleInfusionsChange = useCallback(
    (value: string[]) => {
      setMainInfusions(value)
      setData((prev) => ({
        ...prev,
        infusions: { ...prev.infusions, selected: value },
      }))
    },
    [setMainInfusions, setData]
  )

  const handleUpdateMainInfusions = async () => {
    const ids = mainInfusions.map((name) => allInfusionsDict[name]).filter(Boolean)
    await mainPageApi.updateMainInfusions(ids)
  }

  const handleServicesChange = useCallback(
    (newServices: any[]) => {
      setData((prev) => ({
        ...prev,
        services: {
          ...prev.services,
          services: newServices,
        },
      }))
    },
    [setData]
  )

  const handleServiceImage = useCallback(
    (index: number, file: File) => {
      setData((prev) => {
        const newArr = prev.services.services.map((item: any, i: number) =>
          i === index ? { ...item, img: file } : item
        )
        return {
          ...prev,
          services: {
            ...prev.services,
            services: newArr,
          },
        }
      })
    },
    [setData]
  )

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

  const onFeedbacksChange = useCallback(
    (feedbacks: any[]) => {
      setData((prev) => ({
        ...prev,
        feedback: feedbacks.map((feedback) => ({
          ...feedback,
          id: feedback.id || 0,
          rate: typeof feedback.rate === 'string' ? parseFloat(feedback.rate) : feedback.rate,
        })),
      }))
    },
    [setData]
  )

  const onFaqsChange = useCallback(
    (faqs: any[]) => {
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
    },
    [setData]
  )

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
        onFileChange={(file) =>
          setData((prev) => ({
            ...prev,
            weWork: {
              ...prev.weWork,
              img: file,
            },
          }))
        }
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
            <div key={index} className={css.block}>
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
      <div className="row">
        {[...data.infusionInstructions.steps]
          .sort((a, b) => Number(a.number) - Number(b.number))
          .map((card, index) => (
            <div key={index} className={css.block}>
              <TextInput
                value={card.title}
                onChange={handleArrayChange('infusionInstructions.steps', index, 'title')}
              />
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

      <UpdateButton
        onClick={() =>
          mainPageApi.updateInfusionInstructions({
            id: data.infusionInstructions.id,
            title: data.infusionInstructions.title,
            answer: data.infusionInstructions.answer,
            steps: data.infusionInstructions.steps,
          })
        }
      />

      <div>
        <h4 className={css.text}>Выберите капельницы, которые будут отображаться на главной странице:</h4>
        <p>{'(информацию о капельницах вы можете изменить во вкладке "Капельницы")'}</p>
      </div>

      <MultiSelect
        value={mainInfusions}
        onChange={handleInfusionsChange}
        data={allInfusions}
        searchable
        clearable
        nothingFoundMessage="Больше капельниц нет"
        hidePickedOptions
      />
      <UpdateButton onClick={handleUpdateMainInfusions} />

      <div className="margin" />
      <TextInput value={data.services.tittle} onChange={handleChange('serviceTitle')} />
      <Services services={data.services.services} onChange={handleServicesChange} onImageChange={handleServiceImage} />

      <TextInput value={data.faq.faqTitle} onChange={handleChange('faqTitle')} />
      <Faqs faqs={data.faq.faqs} onChange={onFaqsChange} />

      <h4 className={css.text}>Отзывы</h4>
      <Feedbacks feedbacks={data.feedback} onChange={onFeedbacksChange} />
    </div>
  )
}

export default MainContent
