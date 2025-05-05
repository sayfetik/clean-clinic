import { Textarea, TextInput, MultiSelect } from '@mantine/core'
import { useEffect, useState } from 'react'
import { ApplyButton, MediaEditor } from '../../'
import * as mainPageApi from '../../../api/MainAPI'
import { mainInfusions, patientImage } from '../../../lib/data'
import { emptyMainPage } from '../../../lib/empty'
import css from './index.module.scss'

const MainContent = () => {
  const [data, setData] = useState(emptyMainPage);
  
    useEffect(() => {
      const fetchMainPage = async () => {
        const main = await mainPageApi.getMainPage();
        setData(main);
        // console.log(main);
      }
  
      fetchMainPage();
    }, [])

  const fileChange = () => {}

  const sendToBack = () => {}

  const [infusions, setInfusions] = useState<string[]>([])

  function getInfusionPlaceholder(count: number): string {
    if (count === 0) {return ''}
    const lastDigit = count % 10
    const lastTwoDigits = count % 100
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {return `Выберите ${count} капельниц`}
    if (lastDigit === 1) {return `Выберите ${count} капельницу`}
    if (lastDigit >= 2 && lastDigit <= 4) {return `Выберите ${count} капельницы`}
    return `Выберите ${count} капельниц`
  }

  return (
    <div className={css.tabContent}>
      <MediaEditor initialSrc={patientImage} onFileChange={fileChange} />
      <TextInput value={data.weWork.title} />
      <TextInput value={data.weWork.text} />
      <div className="row">
        <TextInput
          value={data.weWork.numSpecialists}
          rightSectionPointerEvents="none"
          rightSection="специалистов"
          rightSectionWidth={120}
        />
        <TextInput
          value={data.weWork.numPatients}
          rightSectionPointerEvents="none"
          rightSection="счастливых пациентов"
          rightSectionWidth={180}
        />
      </div>

      <div className="margin"></div>

      <div className="row">
        {data.advantages.map((advantage, index) => (
          <div key={index}>
            <TextInput value={advantage.title} />
            <Textarea value={advantage.text} className={css.fullWidth} />
          </div>
        ))}
      </div>

      <div className="margin"></div>

      <TextInput value={data.form.title} />

      <div className="margin"></div>

      <TextInput value={data.whyInfusions.title} />
      <TextInput value={data.whyInfusions.answer} />
      <Textarea value={data.whyInfusions.text1} />
      <Textarea value={data.whyInfusions.text2} />

      <div className="row">
        {data.whiteCards.map((card, index) => (
          <div key={index}>
            <TextInput value={card.title} />
            <Textarea className={css.fullWidth} defaultValue={card.text} />
          </div>
        ))}
      </div>

      <div className="margin"></div>

      <TextInput value={data.problemTitle} />
      <div className="row">
        <MediaEditor initialSrc={data.problemImage} onFileChange={fileChange} />
        <div className={css.problems}>
          {data.problems.map((problem, index) => (
            <div key={index}>
              <TextInput value={problem.title} />
              <Textarea className={css.fullWidth} defaultValue={problem.text} />
            </div>
          ))}
        </div>
      </div>

      <div className="margin"></div>

      <TextInput value={data.infusionInstructions.title} />
      <TextInput value={data.infusionInstructions.answer} />
      <div className="row">
        {data.infusionInstructions.steps.map((card, index) => (
          <div key={index}>
            <TextInput value={card.title} />
            <Textarea className={css.fullWidth} minRows={1} maxRows={15} value={card.text} />
          </div>
        ))}
      </div>

      <div>
        <h4 className={css.text}>Выберите капельницы, которые будут отображаться на главной странице:</h4>
        <p>{'(информацию о капельницах вы можете изменить во вкладке "Капельницы")'}</p>
      </div>

      <TextInput value={data.infusions.title} />
      <Textarea value={data.infusions.text} />

      <MultiSelect
        value={infusions}
        onChange={setInfusions}
        placeholder={getInfusionPlaceholder(6 - infusions.length)}
        data={mainInfusions}
        searchable
        clearable
        nothingFoundMessage="Такой капельницы нет..."
        maxValues={6}
        hidePickedOptions
      />

      <ApplyButton onClick={sendToBack} />
    </div>
  )
}

export default MainContent
