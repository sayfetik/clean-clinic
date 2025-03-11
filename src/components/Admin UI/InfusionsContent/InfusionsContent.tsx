import { Textarea, TextInput } from '@mantine/core'
import { useState } from 'react'
import { infusionCatalog, InfusionPage } from '../../../lib/data'
import { InfusionType } from '../../../lib/types'
import MediaEditor from '../../MediaEditor/MediaEditor'
import ApplyButton from '../ApplyButton'
import BulletPoints from './BulletPoints'
import arrow from '/assets/arrow.png'
import css from './index.module.scss'

const InfusionSection: React.FC<InfusionType> = (infusion) => {
  const [open, setOpen] = useState(false);

  const fileChange = () => {}

  return (
    <div className={css.infusion}>
      <div className={css.header} onClick={() => setOpen(!open)}>
        <div className="row">
          <h4>{infusion.name}</h4>
        </div>
        <img src={arrow} width={20} className={`${css.arrow} ${open ? css.open : ""}`}/>
      </div>
      <div className={`${css.content} ${open ? css.show : ""}`}>
        <div /*className={css.upperSection}*/>
          <MediaEditor initialSrc={infusion.img} onFileChange={fileChange}/>
          <div className={css.mainInfo}>
            <TextInput label="Название:" value={infusion.name} />
            <TextInput label="Стоимость:" value={infusion.cost} />
          </div>
        </div>
        <Textarea label="Краткое описание:" value={InfusionPage.description} />
        <BulletPoints label="Описание:" bullets={InfusionPage.description} />
        <BulletPoints label="Результаты:" bullets={InfusionPage.results} />
        <BulletPoints label="Показания:" bullets={InfusionPage.indications} />
        <BulletPoints label="Противопоказания:" bullets={InfusionPage.contraindications} />
      </div>
    </div>
  );
};

const InfusionsContent = () => {
  const applyChanges = () => {}
  let data = infusionCatalog
  return (
    <div className={css.tabContent}>
      <TextInput value={data.title} />
      {Object.keys(data.infusions).map((filterKey) => (
        <div>
          <div className='row'>
            <h3 className='blue'>Группа:</h3>
            <TextInput value={filterKey} />
          </div>
          {data.infusions[filterKey].map((infusion) => (
            <InfusionSection {...infusion} key={infusion.id} />
          ))}
        </div>
      ))}
      <ApplyButton onClick={applyChanges} />
    </div>
  )
}

export default InfusionsContent
