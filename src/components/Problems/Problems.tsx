import UpList from '../../animations/UpList'
import { main } from '../../lib/data'
import css from './index.module.scss'

type ProblemType = { title: string; text: string }

const Problems: React.FC<{ problems?: ProblemType[] }> = ({ problems = main.problems }) => (
  <div className={css.root}>
    <h2 className={css.title}>{main.problemTitle}</h2>
    <div className={css.content}>
      <img src={main.problemImage} className={css.image} />
      <div className={css.problems}>
        {problems.map((problem, index) => (
          <UpList key={index}>
            <div className={css.problem}>
              <h3>{problem.title}</h3>
              <p className={css.text}>{problem.text}</p>
            </div>
          </UpList>
        ))}
      </div>
    </div>
  </div>
)

export default Problems
