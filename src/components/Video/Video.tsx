import css from './index.module.scss'

type VideoProps = {
  videoSrc: string
}

const Video: React.FC<VideoProps> = ({ videoSrc }) => (
  <video controls className={css.video}>
    <source src={videoSrc} type="video/mp4" />
    Ваш браузер не поддерживает видео.
  </video>
)

export default Video
