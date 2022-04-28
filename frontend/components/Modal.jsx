import React from 'react';
import ReactModal from 'react-modal';
import propTypes from 'prop-types';

const Modal = ({ modalIsOpen, children }) => (
  <ReactModal isOpen={modalIsOpen}>{children}</ReactModal>
);

export default Modal;

Modal.propTypes = {
  modalIsOpen: propTypes.bool.isRequired,
  children: propTypes.element.isRequired,
};
