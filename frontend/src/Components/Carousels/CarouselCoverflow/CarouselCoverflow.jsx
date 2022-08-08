import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import styles from './styles.module.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper';
// import { EffectCube, Pagination } from 'swiper';

const CarouselCard = ({ data }) => {
  const imgs = [...data.images, data.imageCover];
  return (
    <>
      <Swiper
        className={styles.swiper}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
      >
        {imgs.map((e, i) => {
          return (
            <SwiperSlide className={styles.swiperSlide}>
              <img key={imgs[i]} alt="d" src={`/img/tours/${e}`} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default CarouselCard;
