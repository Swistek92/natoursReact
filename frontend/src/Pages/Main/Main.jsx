import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Item from '../../Components/Item/Item';
import Pagination from 'react-bootstrap/Pagination';
import styles from './Main.module.css';
import Spinner from '../../Components/Spinner/Spinner';
const Main = ({ data, itemsPerPage }) => {
  const [active, setActive] = useState(1);
  if (data.data.data.length < 1) return <Spinner />;
  let numberOfPages = 1;

  if (Number.isInteger(data.data.data.length / itemsPerPage)) {
    numberOfPages = data.data.data.length / itemsPerPage;
  } else {
    numberOfPages = Math.floor(data.data.data.length / itemsPerPage) + 1;
  }

  let items = [];
  for (let number = 1; number <= numberOfPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => setActive(number)}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  const indexOfLastPost = active * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = data.data.data.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <Pagination className={styles.paginationTop} size="lg">
        {items}
      </Pagination>
      <h1 className={styles.main}>Tours</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {currentPosts.map((tour) => {
          return <Item key={tour.id} {...tour} />;
        })}
      </Row>

      <Pagination className="mx-4 my-4" size="lg">
        {items}
      </Pagination>
    </>
  );
};

export default Main;
