import { TextInput } from '@mantine/core'
import { ErrorPage } from '../../../lib/data'
import ApplyButton from '../ApplyButton'
import css from './index.module.scss'

const ErrorContent = () => {
  const apply = () => {}
  return (
    <div className={css.tabContent}>
      <TextInput value={ErrorPage.title} />
      <TextInput value={ErrorPage.text} />
      <ApplyButton onClick={apply} />
    </div>
  )
}

export default ErrorContent
