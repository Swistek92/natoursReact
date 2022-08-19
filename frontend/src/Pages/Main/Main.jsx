import React, { useEffect, useRef, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Item from '../../Components/Item/Item';
import Pagination from 'react-bootstrap/Pagination';
import styles from './Main.module.css';
import Spinner from '../../Components/Spinner/Spinner';
import { Button, Col, Form, FormGroup, InputGroup } from 'react-bootstrap';
import { MultiSelect } from 'react-multi-select-component';

const options = [
  { label: 'easy', value: 'easy' },
  { label: 'medium', value: 'medium' },
  { label: 'difficult', value: 'difficult' },
  { label: 'extreme', value: 'extreme', disabled: true },
];
const Main = ({ data, itemsPerPage }) => {
  const filterObj = {
    difficulty: [],
    minPrice: '',
    maxPrice: '',
    minDuration: '',
    maxDuration: '',
  };
  const [active, setActive] = useState(1);
  const [filters, setFilters] = useState(filterObj);
  const [showFilters, setShowFilters] = useState(true);
  let tours = Array.from(data);
  let minPriceTours = 999999999999;
  let maxPriceTours = 0;
  let minDurationTours = 999999999;
  let maxDurationTours = 0;

  tours.forEach((e) => {
    if (minPriceTours > e.price) {
      minPriceTours = e.price;
    }
    if (maxPriceTours < e.price) {
      maxPriceTours = e.price;
    }
    if (minDurationTours > e.duration) {
      minDurationTours = e.duration;
    }
    if (maxDurationTours < e.duration) {
      maxDurationTours = e.duration;
    }
  });

  if (filters.minPrice) {
    tours = tours.filter((e) => e.price >= filters.minPrice);
  }
  if (filters.maxPrice) {
    tours = tours.filter((e) => e.price <= filters.maxPrice);
  }
  if (filters.minDuration) {
    tours = tours.filter((e) => e.duration >= filters.minDuration);
  }
  if (filters.maxDuration) {
    tours = tours.filter((e) => e.duration <= filters.maxDuration);
  }
  if (filters.difficulty.length > 0) {
    tours = tours.filter((e) =>
      JSON.stringify(filters.difficulty).includes(e.difficulty)
    );
  }
  if (filters.maxPrice > 0 && filters.maxPrice < filters.minPrice) {
    console.log(typeof filters.minPrice);
    setFilters((prevState) => ({
      ...prevState,
      maxPrice: Number(filters.minPrice) + 1,
    }));
    console.log('max price is bigger');
  }
  if (filters.maxDuration > 0 && filters.maxDuration < filters.minDuration) {
    setFilters((prevState) => ({
      ...prevState,
      maxDuration: Number(filters.minDuration) + 1,
    }));
  }

  if (data.length < 1) return <Spinner />;
  let numberOfPages = 1;

  if (Number.isInteger(tours.length / itemsPerPage)) {
    numberOfPages = tours.length / itemsPerPage;
  } else {
    numberOfPages = Math.floor(tours.length / itemsPerPage) + 1;
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
  const currentPosts = tours.slice(indexOfFirstPost, indexOfLastPost);

  const PaginationElement = ({ className }) => {
    return (
      <Pagination className={className} size="lg">
        {items}
      </Pagination>
    );
  };

  const onChange = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const resetFilters = () => {
    // setFilters(filterObj);
    setFilters(filterObj);
  };

  const handleShowFilers = () => {
    setShowFilters((prevState) => !prevState);
  };

  return (
    <>
      <Button onClick={handleShowFilers}>
        {showFilters ? 'Hide Filters' : 'Filters tours'}
      </Button>
      {showFilters && (
        <div style={{ border: '1px solid black' }}>
          <Row>
            <Col sm={12} lg={6} xl={4}>
              <label>difficulty</label>
              <MultiSelect
                options={options}
                value={filters.difficulty}
                onChange={(e) =>
                  setFilters((prevState) => ({
                    ...prevState,
                    difficulty: e,
                  }))
                }
                labelledBy="Select"
              />
            </Col>
            <Col sm={12} lg={6} xl={4}>
              <label>Price</label>
              <InputGroup className="mb-3">
                <InputGroup.Text>From</InputGroup.Text>
                <Form.Control
                  onChange={onChange}
                  name="minPrice"
                  value={filters.minPrice}
                  min={minPriceTours}
                  max={maxPriceTours}
                  type="number"
                  aria-label="Amount"
                />
                <InputGroup.Text>$</InputGroup.Text>

                <InputGroup.Text>To</InputGroup.Text>
                <Form.Control
                  name="maxPrice"
                  min={minPriceTours}
                  value={filters.maxPrice}
                  max={maxPriceTours}
                  onChange={onChange}
                  type="number"
                  aria-label="Amount"
                />
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup>
            </Col>
            <Col sm={12} lg={6} xl={4}>
              <label>Duration</label>
              <InputGroup className="mb-3">
                <InputGroup.Text>From</InputGroup.Text>
                <Form.Control
                  value={filters.minDuration}
                  onChange={onChange}
                  min={minDurationTours}
                  max={maxDurationTours}
                  type="number"
                  aria-label="day"
                  name="minDuration"
                />
                <InputGroup.Text>day[s]</InputGroup.Text>

                <InputGroup.Text>To</InputGroup.Text>
                <Form.Control
                  name="maxDuration"
                  onChange={onChange}
                  value={filters.maxDuration}
                  max={maxDurationTours}
                  min={minDurationTours}
                  type="number"
                  aria-label="day"
                />
                <InputGroup.Text>Days</InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
          <Button onClick={resetFilters}>Reset Filters</Button>
        </div>
      )}
      {numberOfPages > 1 && (
        <PaginationElement className={styles.paginationTop} />
      )}
      <h1 className={styles.main}>Tours</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {currentPosts.map((tour) => {
          return <Item key={tour.id} {...tour} />;
        })}
      </Row>
      {numberOfPages > 1 && <PaginationElement />}
    </>
  );
};

export default Main;
