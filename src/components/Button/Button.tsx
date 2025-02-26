import css from './index.module.scss'

type ButtonProps = {
  text?: string
  size?: string
  isDisabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ text = 'Записаться', size = 'big', isDisabled = false }) => {
  if (size === 'big') {
    return (
      <button disabled={isDisabled} className={css.bigButton}>
        {text}
      </button>
    )
  } else {
    return (
      <button disabled={isDisabled} className={css.smallButton}>
        {text}
      </button>
    )
  }
}

export default Button
