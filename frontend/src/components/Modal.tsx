import React from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  modalIsOpen: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ modalIsOpen, children }) => (
  <ReactModal isOpen={modalIsOpen}>{children}</ReactModal>
);
