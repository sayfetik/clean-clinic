import UpList from '../../animations/UpList'
import css from './index.module.scss'

type ProblemType = { title: string; text: string }

type ProblemsProps = {
  problemTitle: string
  problems: ProblemType[]
  problemImage: string | File
}

const Problems: React.FC<ProblemsProps> = ({ problemTitle, problems, problemImage }) => (
  <div className={css.root}>
    <h2 className={css.title}>{problemTitle}</h2>
    <div className={css.content}>
      <img
        src={typeof problemImage === 'string' ? problemImage : URL.createObjectURL(problemImage)}
        className={css.image}
      />
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
