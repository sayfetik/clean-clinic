import { GradientText, Document } from '../../components'
import { license } from '../../lib/data'
import css from './index.module.scss'

const License = () => (
    <>
      <GradientText text='Лицензия' />
      <div className={css.root}>
          {license.map((license, index) => (
            <Document image={license} key={index} />
          ))}
        </div>
    </>
)

export default License
