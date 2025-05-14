import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { GradientText } from '../../components'
import fileGrey from '/assets/fileGrey.svg'
import css from './index.module.scss'

const Documents = () => {
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

      <div>
        <GradientText text="Документы" />
        <div className={css.root}>
          {' '}
          {/* при нажатии сделать чтобы скачивался файл */}
          <img src={fileGrey} />
          <p className={css.text}>Документ документ документ документ</p>
        </div>
      </div>
    </>
  )
}

export default Documents
