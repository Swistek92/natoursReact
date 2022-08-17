import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import styles from './Tour.module.css';
import Mapbox from '../../Components/Mapbox/Mapbox';
import { BsClockHistory } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { FaCalendarDay } from 'react-icons/fa';
import { FiDollarSign } from 'react-icons/fi';

import {
  AiOutlineRise,
  AiOutlineUsergroupAdd,
  AiOutlineStar,
} from 'react-icons/ai';

const Tour = ({ data }) => {
  let { id } = useParams();
  const tours = data.data.data;
  const tour = tours.find((e) => e.id === id);
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
  return (
    <div>
      <div className={styles.header}>
        <img src={`/img/tours/${imageCover}`} alt="imgCover"></img>
        <div className={styles.details}>
          <p>{name}</p>
          <p>
            <BsClockHistory size="3rem" />
            {duration} days
          </p>
        </div>
      </div>

      <Row>
        <Col className={styles.factsBox}>
          <IconContext.Provider value={{ color: 'grey', size: '2rem' }}>
            <div className={styles.facts}>
              <h4>QUICK FACTS</h4>

              <span>
                <FaCalendarDay />
                NEXT DATE: <b>{date.toUpperCase()}</b>
              </span>
              <span>
                <AiOutlineRise />
                DIFFICULTY: <b>{difficulty.toUpperCase()}</b>
              </span>
              <span>
                <AiOutlineUsergroupAdd />
                PARTICIPANTS: <b>{maxGroupSize}</b>
              </span>
              <span>
                <AiOutlineStar />
                RATING: <b>{ratingsAverage}</b>
              </span>
              <span>
                <FiDollarSign />
                PRICE: <b>{price}</b>
              </span>

              <h4 style={{ marginTop: '5vh' }}>TOUR GUIDES</h4>

              {guides.map((e) => {
                return (
                  <span key={e.name}>
                    <img
                      style={{ height: '2rem', borderRadius: '50%' }}
                      src={`/img/users/${e.photo}`}
                      alt={e.name}
                    ></img>{' '}
                    <b>{e.role.toUpperCase()}</b>
                    {e.name}
                  </span>
                );
              })}
            </div>
          </IconContext.Provider>
        </Col>
        <Col>
          <h4>About the {name} </h4>
          <p>{description}</p>
        </Col>
      </Row>
      <div className={styles.mapbox}>
        <Mapbox tour={tour} />
      </div>
    </div>
  );
};

export default Tour;
