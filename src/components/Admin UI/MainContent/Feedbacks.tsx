import { TextInput, Button, /*ActionIcon,*/ Textarea, ActionIcon } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import * as mainPageApi from '../../../api/MainAPI'
import UpdateButton from '../UpdateButton'
import css from './index.module.scss'

type FeedbackType = {
  id: number
  name: string
  rate: number
  text: string
  isNew?: boolean
}

type FeedbacksProps = {
  feedbacks: FeedbackType[]
  onChange: (feedbacks: FeedbackType[]) => void
}

const Feedbacks: React.FC<FeedbacksProps> = ({ feedbacks, onChange }) => {
  const handleFeedbackSave = async (index: number) => {
    const feedback = feedbacks[index]
    if (feedback.isNew) {
      const feedback = feedbacks[index]
      await mainPageApi.createFeedBack({
        name: feedback.name,
        rate: Number(feedback.rate),
        text: feedback.text,
      })
      const updated = feedbacks.map((item, i) => (i === index ? { ...item, isNew: false } : item))
      onChange(updated)
    } else {
      await mainPageApi.updateFeedback({
        Id: feedback.id,
        Name: feedback.name,
        Rate: feedback.rate,
        Text: feedback.text,
      })
    }
  }

  const handleAddFeedback = () => {
    onChange([...feedbacks, { id: 0, name: '', rate: 0, text: '', isNew: true }])
  }

  const handleChange = (index: number, field: keyof FeedbackType, value: string) => {
    const updated = feedbacks.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    onChange(updated)
  }

  const handleRemoveFeedback = async (index: number, id: number) => {
    const updated = feedbacks.filter((_, i) => i !== index)
    onChange(updated)
    await mainPageApi.deleteFeedback(id)
  }

  return (
    <>
      <div className={css.columnWithGaps}>
        {feedbacks.map((card, index) => (
          <div key={index} className={css.block}>
            <TextInput
              value={card.name}
              className={css.fullWidth}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="Имя"
            />
            <TextInput
              leftSection="Рейтинг"
              leftSectionWidth={70}
              className={css.fullWidth}
              value={card.rate}
              onChange={(e) => handleChange(index, 'rate', e.target.value)}
              placeholder="Оценка"
              type="number"
            />
            <Textarea
              value={card.text}
              onChange={(e) => handleChange(index, 'text', e.target.value)}
              placeholder="Отзыв"
              className={css.fullWidth}
              minRows={1}
              maxRows={15}
            />
            <ActionIcon
              color="red"
              variant="light"
              onClick={() => handleRemoveFeedback(index, feedbacks[index].id)}
              mt={8}
              aria-label="Удалить отзыв"
              className={css.squareButton}
            >
              Удалить
            </ActionIcon>
            <div style={{ marginTop: 8 }}>
              <UpdateButton onClick={() => handleFeedbackSave(index)} />
            </div>
          </div>
        ))}
      </div>
      <Button onClick={handleAddFeedback} variant="light" className={css.squareButton}>
        <IconPlus size={16} />
      </Button>
    </>
  )
}

export default Feedbacks
