import { Textarea, TextInput } from '@mantine/core'
import { infusionCatalog, InfusionPage } from '../../../lib/data'
import { InfusionType } from '../../../lib/types'
import BulletPoints from './BulletPoints'
import css from './index.module.scss'

const InfusionSection: React.FC<InfusionType> = (infusion) => (
  // добавить изменения картинки!!
  <div className={css.infusion}>
    <div className="row">
      <TextInput label="Название:" value={infusion.name} />
      <TextInput label="Стоимость:" value={infusion.cost} />
    </div>
    <Textarea label="Краткое описание:" value={infusion.description} />
    <BulletPoints label="Описание:" bullets={InfusionPage.description} />
    <BulletPoints label="Результаты:" bullets={InfusionPage.results} />
    <BulletPoints label="Показания:" bullets={InfusionPage.indications} />
    <BulletPoints label="Противопоказания:" bullets={InfusionPage.contraindications} />
  </div>
)

const InfusionsContent = () => {
  let data = infusionCatalog
  return (
    <div className={css.tabContent}>
      <TextInput value={data.title} />
      {Object.keys(data.infusions).map((filterKey) => (
        <div>
          <TextInput label="Название группы:" value={filterKey} />
          {data.infusions[filterKey].map((infusion) => (
            <InfusionSection {...infusion} key={infusion.id} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default InfusionsContent
