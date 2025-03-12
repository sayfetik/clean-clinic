import React from 'react'
import 'swiper/swiper-bundle.css'
import Slider from 'react-slick'
import { main } from '../../lib/data'
import { FeedbackType } from '../../lib/types'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import human from '/assets/human.svg'
import css from './index.module.scss'
import './styles.css'

const FeedbackCard: React.FC<FeedbackType> = ({ name, rate, text }) => (
  <div className={css.feedbackCard}>
    <div className={css.row}>
      <img src={human} width="50" />
      <div className={css.info}>
        <h4>{name}</h4>
        <div className={css.stars}>{'⭐'.repeat(rate)}</div>
      </div>
    </div>
    <p className={css.text}>{text}</p>
  </div>
)

const Feedback = () => {
  const settings = {
    dots: false,
    autoplaySpeed: 0,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    cssEase: 'linear',
    swipe: false,
    touchMove: false,
    centerPadding: '30px',
  }
  // const settings = {
  //   dots: true,
  //   autoplay: true,
  //   autoplaySpeed: 0,
  //   infinite: true,
  //   speed: 6000,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   centerPadding: '30px',
  //   pauseOnHover: true,
  //   cssEase: 'linear',
  //   swipe: true,
  //   touchMove: true
  // };

  return (
    <div className={css.root}>
      <h2 className={css.title}>Отзывы</h2>
      <Slider {...settings}>
        {main.feedback.map((review, index) => (
          <div key={index} className={css.reviewBox}>
              <FeedbackCard {...review} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Feedback
