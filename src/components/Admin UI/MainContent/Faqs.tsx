import { TextInput, Button, ActionIcon, Textarea } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import * as mainPageApi from '../../../api/MainAPI'
import UpdateButton from '../UpdateButton'
import css from './index.module.scss'

type FaqType = {
  id: number
  question: string
  answer: string
  isNew?: boolean
}

type FaqsProps = {
  faqs: FaqType[]
  onChange: (faqs: FaqType[]) => void
}

const Faqs: React.FC<FaqsProps> = ({ faqs, onChange }) => {
  const handleAddFaq = () => {
    onChange([...faqs, { id: Date.now(), question: '', answer: '', isNew: true }])
  }

  const handleChange = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = faqs.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    onChange(updated)
  }

  const handleRemoveFaq = (index: number) => {
    const updated = faqs.filter((_, i) => i !== index)
    onChange(updated)
  }

  const handleFaqSave = async (index: number) => {
    const faq = faqs[index]
    if (faq.isNew) {
      await mainPageApi.createFaq({
        id: String(faqs.length),
        question: faq.question,
        answer: faq.answer,
      })
      const updated = faqs.map((item, i) => (i === index ? { ...item, isNew: false } : item))
      onChange(updated)
    } else {
      await mainPageApi.updateFaq({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
      })
    }
  }

  return (
    <>
      <div className={css.columnWithGaps}>
        {faqs.map((card, index) => (
          <div key={card.id ?? index} className={css.block}>
            <TextInput
              value={card.question}
              onChange={(e) => handleChange(index, 'question', e.target.value)}
              placeholder="Вопрос"
            />
            <Textarea
              value={card.answer}
              onChange={(e) => handleChange(index, 'answer', e.target.value)}
              placeholder="Ответ"
              className={css.fullWidth}
              minRows={1}
              maxRows={15}
            />
            <ActionIcon
              color="red"
              variant="light"
              onClick={() => handleRemoveFaq(index)}
              mt={8}
              aria-label="Удалить вопрос"
              className={css.squareButton}
            >
              Удалить
            </ActionIcon>
            <div style={{ marginTop: 8 }}>
              <UpdateButton onClick={() => handleFaqSave(index)} />
            </div>
          </div>
        ))}
      </div>
      <Button onClick={handleAddFaq} variant="light" className={css.squareButton}>
        <IconPlus size={16} />
      </Button>
    </>
  )
}

export default Faqs
