import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import {  GradientText } from '../../components'
import Doc from '../../components/Doc/Doc'
import { DocumentType } from '../../lib/types'
import css from './index.module.scss'

const Documents: React.FC<{ documents: DocumentType[], license: DocumentType }> = ({ documents, license }) => {
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

      <div >
        <GradientText text="Документы" />
        <div className={css.root}>
            <Doc title={license.title} img={license.img} />
          {documents.map((document, index) => (
            document.title !== 'Лицензия' &&
            <Doc key={index} title={document.title} img={document.img} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Documents
