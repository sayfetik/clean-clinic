import React, { useState, useEffect } from 'react';
import 'swiper/swiper-bundle.css';
import Slider from 'react-slick';
import { main } from '../../lib/data';
import { FeedbackType } from '../../lib/types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import human from '/assets/human.svg';
import css from './index.module.scss';
import './styles.css';

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
);

const Feedback = () => {
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth <= 700) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  const settings = {
    dots: false,
    autoplaySpeed: 0,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    cssEase: 'linear',
    swipe: true,
    touchMove: true,
    centerPadding: '30px',
  };

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
  );
};

export default Feedback;
