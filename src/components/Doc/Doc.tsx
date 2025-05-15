import fileGrey from '/assets/file.png'
import css from './index.module.scss'

const Doc: React.FC<{ title: string; img: string | File }> = ({ title, img }) => {
  const handleOpen = (img: string | File) => {
    if (!img) {
      return
    }
    if (typeof img === 'string') {
      window.open(img, '_blank')
    } else if (img instanceof File) {
      const url = URL.createObjectURL(img)
      window.open(url, '_blank')
      setTimeout(() => URL.revokeObjectURL(url), 10000)
    }
  }

  return (
    <>
      <div className={css.root} onClick={() => handleOpen(img)}>
        <img src={fileGrey} width={20} />
        <p className={css.text}>{title}</p>
      </div>
    </>
  )
}

export default Doc
