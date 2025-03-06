import { TextInput } from '@mantine/core'
import { SuccessPage } from '../../../lib/data'
import ApplyButton from '../ApplyButton'
import css from './index.module.scss'

const SuccessContent = () => {
  const apply = () => {}
  return (
    <div className={css.tabContent}>
      <TextInput value={SuccessPage.title} />
      <TextInput value={SuccessPage.text} />
      <ApplyButton onClick={apply} />
    </div>
  )
}

export default SuccessContent
