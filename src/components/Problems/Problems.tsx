import { main } from '../../lib/data'
import css from './index.module.scss'

const Problems = () => (
  <div className={css.root}>
    <h2 className={css.title}>{main.problemTitle}</h2>
    <div className={css.content}>
      <img src={main.problemImage} width="30%" className={css.image} />
      <div className={css.problems}>
        {main.problems.map((problem, index) => (
          <div key={index} className={css.problem}>
            <h3>{problem.title}</h3>
            <p>{problem.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Problems
