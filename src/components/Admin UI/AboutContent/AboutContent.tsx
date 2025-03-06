import { TextInput } from '@mantine/core'
import { about } from '../../../lib/data'
import ApplyButton from '../ApplyButton'
import SpecialistList from './SpecialistList'
import css from './index.module.scss'

const AboutContent = () => {
  const apply = () => {}
  return (
    <div className={css.tabContent}>
      <TextInput value={about.title} />
      <TextInput value={about.text1} />
      <TextInput value={about.text2} />
      <ApplyButton onClick={apply} />

      <h3 className={css.label}>Специалисты</h3>
      <SpecialistList />
    </div>
  )
}

export default AboutContent
