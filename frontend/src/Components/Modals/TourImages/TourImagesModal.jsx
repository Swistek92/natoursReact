import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../../store/modals-slice';
import CarosuelTourImages from '../../Carousels/CarouselTourImages/CarosuelTourImages';

const TourImagesModal = ({ data }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const { tourId } = useSelector((state) => state.modal);
  const hideModal = () => dispatch(modalActions.hideTourImage());

  const tour = data.find((e) => e.id === tourId);

  return (
    <>
      <Modal show={show} fullscreen={true} onHide={() => hideModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{tour.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CarosuelTourImages tour={tour} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TourImagesModal;
