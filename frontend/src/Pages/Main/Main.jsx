import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Item from '../../Components/Item/Item';
import Pagination from 'react-bootstrap/Pagination';
import styles from './Main.module.css';
const Main = ({ data }) => {
  if (data.length < 3) {
    return <p>asd</p>;
  }

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <>
      <h1 className={styles.main}>Tours</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {/* {data.data.data.map((tour) => {
          return <Item key={tour.id} {...tour} />;
        })} */}
      </Row>

      <Pagination className="mx-4 my-4" size="lg">
        {items}
      </Pagination>
    </>
  );
};

export default Main;
