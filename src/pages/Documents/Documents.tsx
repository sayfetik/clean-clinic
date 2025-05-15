import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { GradientText } from '../../components'
import Doc from '../../components/Doc/Doc'
import { DocumentType } from '../../lib/types'
import css from './index.module.scss'

const Documents: React.FC<{ documents: DocumentType[] }> = ({ documents }) => {
  useEffect(() => {
    document.title = 'Документы | Clean Clinic'
  }, [])

  return (
    <>
      <Helmet>
        <title>Документы | Clean Clinic</title>
        <meta name="description" content="Документы Clean Clinic" />
        <meta name="keywords" content="Документы Clean Clinic" />
      </Helmet>

      <div className={css.root}>
        <GradientText text="Документы" />
        <div>
          {documents.map((document, index) => (
            <Doc key={index} title={document.title} img={document.img} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Documents
