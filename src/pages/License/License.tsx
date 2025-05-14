import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { GradientText, Document } from '../../components'
import { license } from '../../lib/data'
import css from './index.module.scss'

const License = React.memo(() => {
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
          {license.map((license, index) => (
            <Document image={license} key={index} />
          ))}
        </div>
      </>
    </>
  )
})

export default License
