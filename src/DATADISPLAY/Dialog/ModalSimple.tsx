import React from 'react';
import type { ModalSimpleProps } from './Modal.types';
import Modal from './Modal';

const ModalSimple = ({ show, onClose, title, children, size = 'md' }: ModalSimpleProps) => {
  return (
    <Modal show={show} onClose={onClose} title={title} size={size}>
      {children}
    </Modal>
  );
};

ModalSimple.displayName = 'ModalSimple';

export { ModalSimple };
export default ModalSimple;
