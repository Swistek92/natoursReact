import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Item from '../Item/Item';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';
// const data = [
//   {
//     id: 1,
//     name: 'Book',
//     price: 10.99,
//     imgUrl: '/imgs/book.jpg',
//   },
//   {
//     id: 2,
//     name: 'Computer',
//     price: 1199,
//     imgUrl: '/imgs/computer.jpg',
//   },
//   {
//     id: 3,
//     name: 'Banana',
//     price: 1.05,
//     imgUrl: '/imgs/banana.jpg',
//   },
//   {
//     id: 4,
//     name: 'Car',
//     price: 14000,
//     imgUrl: '/imgs/car.jpg',
//   },
// ];

// const fetchData = async () => {
//   const response = await axios.get('http://localhost:3001/api/v1/tours');
//   return response.data.data;
// };

const Main = () => {
  const [state, setState] = useState({ data: [] });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/v1/tours');
        setState(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(state.data.data);
  // console.log(state.data.map((e) => console.log(e)));
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
      <h1>Tours</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {!loading &&
          state.data.data &&
          state.data.data.map((tour) => {
            return <Item className="mx-2" {...tour} />;
          })}
      </Row>

      <Pagination className="mx-4 my-4" size="lg">
        {items}
      </Pagination>
    </>
  );
};

export default Main;
