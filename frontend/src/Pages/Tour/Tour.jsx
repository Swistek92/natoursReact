import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import styles from './Tour.module.css';
import Mapbox from '../../Components/Mapbox/Mapbox';
import CarouselReview from '../../Components/Carousels/CarouselReview/CarouselReview';
import { BsClockHistory } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { FaCalendarDay } from 'react-icons/fa';
import { FiDollarSign } from 'react-icons/fi';

import {
  AiOutlineRise,
  AiOutlineUsergroupAdd,
  AiOutlineStar,
} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modals-slice';

const Tour = ({ data }) => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const tour = data.find((e) => e.id === id);
  const {
    imageCover,
    description,
    name,
    duration,
    startDates,
    difficulty,
    maxGroupSize,
    ratingsAverage,
    guides,
    price,
  } = tour;

  const date = new Date(startDates[0]).toLocaleString('en-us', {
    month: 'long',
    year: 'numeric',
  });
  const showModal = () => dispatch(modalActions.showTourImage(id));

  return (
    <div>
      <div className={styles.header} onClick={showModal}>
        <img src={`/img/tours/${imageCover}`} alt="imgCover"></img>
        <div className={styles.detailsImg}>
          <p>{name}</p>
          <p>
            <BsClockHistory size="3rem" />
            {duration} days
          </p>
        </div>
      </div>

      <Row className={styles.details}>
        <Col xs={12} md={6} className={styles.factsBox}>
          <IconContext.Provider value={{ color: 'grey', size: '2rem' }}>
            <div className={styles.facts}>
              <h4>QUICK FACTS</h4>

              <p>
                <FaCalendarDay />
                NEXT DATE: <b>{date.toUpperCase()}</b>
              </p>
              <p>
                <AiOutlineRise />
                DIFFICULTY: <b>{difficulty.toUpperCase()}</b>
              </p>
              <p>
                <AiOutlineUsergroupAdd />
                PARTICIPANTS: <b>{maxGroupSize}</b>
              </p>
              <p>
                <AiOutlineStar />
                RATING: <b>{ratingsAverage}</b>
              </p>
              <p>
                <FiDollarSign />
                PRICE: <b>{price}</b>
              </p>

              <h4 style={{ marginTop: '5vh' }}>TOUR GUIDES</h4>

              {guides.map((e) => {
                return (
                  <p key={e.name}>
                    <img
                      style={{ height: '2rem', borderRadius: '50%' }}
                      src={`/img/users/${e.photo}`}
                      alt={e.name}
                    ></img>{' '}
                    <b>{e.role.toUpperCase()}</b>
                    {e.name}
                  </p>
                );
              })}
            </div>
          </IconContext.Provider>
        </Col>
        <Col xs={12} md={6}>
          <h4>About the {name} </h4>
          <p>{description}</p>
        </Col>
      </Row>
      <div className={styles.carousel}>
        <CarouselReview id={id} />
      </div>
      <div className={styles.mapbox}>
        <Mapbox tour={tour} />
      </div>
    </div>
  );
};

export default Tour;
