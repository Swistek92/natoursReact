import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router';
import styles from './Tour.module.css';
// createdAt: "2022-07-27T11:37:41.943Z"
// description: "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
// difficulty: "medium"
// duration: 7
// durationWeeks: 1
// guides: (2) [{…}, {…}]
// id: "5c88fa8cf4afda39709c2955"
// imageCover: "tour-2-cover.jpg"
// images: (3) ['tour-2-1.jpg', 'tour-2-2.jpg', 'tour-2-3.jpg']
// locations: (4) [{…}, {…}, {…}, {…}]
// maxGroupSize: 15
// name: "The Sea Explorer"
// price: 921920223
// ratingQuantity: 0
// ratingsAverage: 4.8
// secretTour: false
// slug: "the-sea-explorer"
// startDates: (3) ['2021-06-19T09:00:00.000Z', '2021-07-20T09:00:00.000Z', '2021-08-18T09:00:00.000Z']
// startLocation: {type: 'Point', coordinates: Array(2)}
// summary: "Exploring the jaw-dropping US east coast by foot and by boat"
// _id: "5c88fa8cf4afda39709c2955"

const Tour = ({ data }) => {
  let { id } = useParams();
  const tours = data.data.data;
  const tour = tours.find((e) => e.id === id);
  const { imageCover } = tour;
  console.log(tour);
  return (
    <div className={styles.header}>
      <img src={`/img/tours/${imageCover}`} alt="adsa"></img>
      <p className={styles.center}>{tour.name}</p>
    </div>
  );
};

export default Tour;
