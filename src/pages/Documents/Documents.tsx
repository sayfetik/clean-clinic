import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { GradientText } from '../../components'
import Doc from '../../components/Doc/Doc'
import { DocumentType } from '../../lib/types'
import css from './index.module.scss'

const Documents: React.FC<{ documents: DocumentType[]; license: DocumentType; privacyPolicy: DocumentType }> = ({
  documents,
  license,
  privacyPolicy,
}) => {
  useEffect(() => {
    document.title = 'Документы | Клин Клиник'
  }, [])

  return (
    <>
      <Helmet>
        <title>Документы | Клин Клиник</title>
        <meta
          name="description"
          content="Лицензии, сертификаты и другие документы Клин Клиник. Гарантия качества медицинских услуг в Оренбурге."
        />
        <meta name="keywords" content="Документы, лицензии, сертификаты, Клин Клиник, Оренбург, качество" />
      </Helmet>

      <div>
        <GradientText text="Документы" />
        <div className={css.root}>
          {license && <Doc title={license.title} img={license.img} />}
          {privacyPolicy && <Doc title={privacyPolicy.title} img={privacyPolicy.img} />}
          {documents.map(
            (document, index) =>
              document.title !== 'Лицензия' &&
              document.title !== 'Политика конфиденциальности' && (
                <Doc key={index} title={document.title} img={document.img} />
              )
          )}
        </div>
      </div>
    </>
  )
}

export default Documents
