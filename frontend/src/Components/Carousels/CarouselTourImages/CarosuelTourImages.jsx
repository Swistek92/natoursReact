import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './styles.module.css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

const CarosuelTourImages = ({ tour }) => {
  const imgs = [tour.imageCover, ...tour.images];

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.swiper}
      >
        {imgs.map((e) => {
          return (
            <SwiperSlide className={styles.swiperSlide}>
              <img alt="asd" src={`/img/tours/${e}`} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default CarosuelTourImages;
