import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { fomatCurrency } from '../../utilites/formatCurrency';
const Item = ({ summary, name, price, imageCover }) => {
  console.log(`/img/tours/${imageCover}`);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={`/img/tours/${imageCover}`}
        height="200px"
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{fomatCurrency(price)}</span>
        </Card.Title>
        <Card.Text>{summary}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default Item;
