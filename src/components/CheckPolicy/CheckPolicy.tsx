import { Checkbox, Anchor } from '@mantine/core'
import css from './index.module.scss'

const CheckPolicy: React.FC<{ checked: boolean; setChecked: (value: boolean) => void }> = ({ checked, setChecked }) => (
  <Checkbox
    size="xs"
    radius="xs"
    checked={checked}
    color="#0171fc"
    onChange={(event) => setChecked(event.currentTarget.checked)}
    label={
      <p className={css.text}>
        Согласие на обработку персональных данных.{' '}
        <Anchor inherit c="#0171fc" underline="always" href="/policy" target="_blank">
          Политика конфиденциальности
        </Anchor>
      </p>
    }
  />
)

export default CheckPolicy
