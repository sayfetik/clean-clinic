import React, { useState, useEffect } from 'react'
import 'swiper/swiper-bundle.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import css from './index.module.scss'
import './styles.css'

type ServiceType = { name: string; img: string }

const ServiceCard: React.FC<ServiceType> = React.memo(({ name, img }) => (
  <div className={css.serviceCard}>
    <img className={css.img} src={img} alt="" />
    <h3 className={css.name}>{name}</h3>
  </div>
))

const ServicesSlider: React.FC<{ services: ServiceType[] }> = React.memo(({ services }) => {
  const [slidesToShow, setSlidesToShow] = useState(3)

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth <= 700) {
        setSlidesToShow(1)
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2)
      } else {
        setSlidesToShow(3)
      }
    }

    updateSlidesToShow()
    window.addEventListener('resize', updateSlidesToShow)
    return () => window.removeEventListener('resize', updateSlidesToShow)
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    cssEase: 'linear',
    swipe: true,
    touchMove: true,
    centerPadding: '50px',
  }

  return (
    <div className={css.root}>
      <Slider {...settings}>
        {services.map((service, index) => (
          <div key={index} className={css.reviewBox}>
            <ServiceCard {...service} />
          </div>
        ))}
      </Slider>
    </div>
  )
})

export default ServicesSlider
