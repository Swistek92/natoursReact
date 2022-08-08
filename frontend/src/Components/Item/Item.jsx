import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { fomatCurrency } from '../../utilites/formatCurrency';
import { Link } from 'react-router-dom';
import CarouselCard from '../Carousels/CarouselCoverflow/CarouselCoverflow';
const Item = (props) => {
  // console.log(props);
  const { id, summary, name, price, imageCover } = props;
  return (
    <div>
      <Card className="h-100 mx-1">
        <CarouselCard data={props} />
        {/* <Card.Img
          variant="top"
          src={`/img/tours/${imageCover}`}
          height="200px"
          style={{ objectFit: 'cover' }}
        /> */}
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-2">{name}</span>
            {/* <span className="ms-2 text-muted">{fomatCurrency(price)}</span> */}
          </Card.Title>
          <Card.Text>{summary}</Card.Text>
          <Link to={`/tour/${id}`}>
            <Button variant="primary">Details about Tour !</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Item;
