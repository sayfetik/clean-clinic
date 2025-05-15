import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { GradientText, Document } from '../../components'
import css from './index.module.scss'

const License: React.FC<{license1: string, license2: string}> = React.memo(({license1, license2}) => {
  useEffect(() => {
    document.title = 'Лицензия'
  }, [])
  
  return (
    <>
      <Helmet>
        <title>Лицензия</title>
        <meta name="description" content="Лицензия Clean Clinic" />
        <meta name="keywords" content="Лицензия, документы, Clean Clinic" />
      </Helmet>

      <>
        <GradientText text="Лицензия" />
        <div className={css.root}>
            <Document image={license1}/>
            <Document image={license2}/>
        </div>
      </>
    </>
  )
})

export default License
