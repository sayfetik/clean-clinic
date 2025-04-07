import React, { useState, useRef, useEffect } from 'react'
import { main } from '../../lib/data'
import css from './index.module.scss'


const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const contentRefs = useRef<Array<HTMLDivElement | null>>([])

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  useEffect(() => {
    contentRefs.current.forEach((ref, idx) => {
      if (ref) {
        ref.style.maxHeight = openIndex === idx ? `${ref.scrollHeight}px` : '0px'
      }
    })
  }, [openIndex])

  return (
    <div className={css.faqContainer}>
      {main.faqs.map((faq, index) => (
        <div key={index} className={css.faqItem}>
          <div className={css.faqQuestion} onClick={() => toggle(index)}>
            <p className="black">{faq.question}</p>
            <svg
              className={`${css.arrowIcon} ${openIndex === index ? css.open : ''}`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {faq.answer && (
            <div
              ref={(el) => {
                contentRefs.current[index] = el
              }}
              className={css.faqAnswerWrapper}
            >
              <div className={css.faqAnswer}>{faq.answer}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FAQ
