import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './styles.module.css';
import axios from 'axios';
import host from '../../../utilites/host';
import { Navigation, Pagination } from 'swiper';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FiStar } from 'react-icons/fi';
import { v4 as uuid } from 'uuid';

const API_URL = `${host()}tours/`;
const CarouselReview = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const reviews = await axios.get(`${API_URL}${id}/reviews`);
        setReviews(reviews.data.data.data);
        console.log(reviews.data.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner />;

  if (reviews.length < 1) return <></>;

  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        breakpoints={{
          500: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className={styles.swiper}
      >
        {reviews.map((e) => {
          const date = new Date(e.createdAt).toLocaleString('en-us', {
            month: 'short',
            year: 'numeric',
            day: 'numeric',
          });
          const stars = () =>
            [...Array(e.rating)].map((e, i) => {
              return <FiStar key={uuid()} color="red" />;
            });
          return (
            <>
              <SwiperSlide>
                <Card className={styles.Card}>
                  <div className={styles.avatar}>
                    <h3>{e.user.name}</h3>
                    <img alt="das" src={`/img/users/${e.user.photo}`} />
                  </div>
                  <Card.Body>
                    <Card.Text>{e.review}</Card.Text>
                  </Card.Body>

                  <Card.Body>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h3>{e.rating}/5</h3>
                      {stars()}
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">Created: {date}</small>
                  </Card.Footer>
                </Card>
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
    </>
  );
};
export default CarouselReview;
