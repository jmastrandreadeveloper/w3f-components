import React from 'react';
import type { ModalWithDataProps } from './Modal.types';
import Modal from './Modal';
import Button from '../../INPUTS/Button/Button';

const ModalWithData = ({ show, onClose, title, data, size = 'md' }: ModalWithDataProps) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title={title}
      size={size}
      footer={
        <Button variant="raised" color="danger" onClick={onClose}>
          Cerrar
        </Button>
      }
    >
      {data ? (
        <div className="w3f-modal-data-card">
          <h3>Detalles del Usuario</h3>
          <div className="w3f-modal-data-item">
            <span className="w3f-modal-data-label">Nombre:</span>
            <span className="w3f-modal-data-value">{data.name}</span>
          </div>
          <div className="w3f-modal-data-item">
            <span className="w3f-modal-data-label">Email:</span>
            <span className="w3f-modal-data-value">{data.email}</span>
          </div>
          {data.phone && (
            <div className="w3f-modal-data-item">
              <span className="w3f-modal-data-label">Teléfono:</span>
              <span className="w3f-modal-data-value">{data.phone}</span>
            </div>
          )}
        </div>
      ) : (
        <p style={{ color: 'var(--w3f-gray-500)' }}>
          No se encontraron datos para mostrar.
        </p>
      )}
    </Modal>
  );
};

ModalWithData.displayName = 'ModalWithData';

export { ModalWithData };
export default ModalWithData;
