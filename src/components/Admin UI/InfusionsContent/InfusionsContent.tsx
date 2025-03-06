import { Textarea, TextInput } from '@mantine/core'
import { infusionCatalog, InfusionPage } from '../../../lib/data'
import { InfusionType } from '../../../lib/types'
import css from './index.module.scss'

const BulletPoints: React.FC<string[]> = (bullets) => (
  <div>
    {bullets.map((bullet, index))=>(
      <TextInput value={bullet} key={index} />
    )}
  </div>
)

const InfusionSection: React.FC<InfusionType> = (infusion) => (
  <div className={css.infusion}>
    <div className="row">
      <TextInput label="Название:" value={infusion.name} />
      <TextInput label="Стоимость:" value={infusion.cost} />
    </div>
    <Textarea label="Краткое описание:" value={infusion.description} />
    <Textarea label="Описание:" value={InfusionPage.description} />
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
