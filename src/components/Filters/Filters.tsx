import { ChosenOption } from '../../lib/types';
import css from './index.module.scss'

const Option: React.FC<{ text: string; chosen: boolean; setChosenId: () => void }> = ({
  text,
  chosen,
  setChosenId,
}) => (
  <button className={chosen ? css.chosenOption : css.option} onClick={setChosenId}>
    <p className={css.optionText}>{text}</p>
  </button>
)

const Filters: React.FC<{ filters: string[]; chosenOption: ChosenOption }> = ({ filters, chosenOption }) => {
  return (
    <div className={css.filters}>
      {filters.map((filter, index) => (
        <Option
          key={index}
          text={filter}
          chosen={chosenOption.chosenId === index}
          setChosenId={() => chosenOption.setChosenId(index)}
        />
      ))}
    </div>
  )
}

export default Filters
