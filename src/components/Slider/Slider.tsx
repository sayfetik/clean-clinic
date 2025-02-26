import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'

type ImageSliderProps = {
  images: string[]
}

const AutoSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <Swiper
      className="sample-slider"
      loop={true}
      speed={2000}
      slidesPerView={3}
      autoplay={{
        delay: 0,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
        reverseDirection: true,
      }}
      modules={[Autoplay]}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img src={src} alt={`Slide ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default AutoSlider
