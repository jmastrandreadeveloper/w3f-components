import React, { useCallback, useRef } from 'react';
import type { ModalProps } from './Modal.types';
import { MODAL_DEFAULTS } from './Modal.constants';
import { useModal, useEscapeKey } from './Modal.hooks';
import Button from '../../INPUTS/Button/Button';

const Modal = ({
  show,
  onClose,
  title,
  children,
  size = MODAL_DEFAULTS.size,
  closeOnBackdrop = MODAL_DEFAULTS.closeOnBackdrop,
  showCloseButton = MODAL_DEFAULTS.showCloseButton,
  footer,
  headerVariant = MODAL_DEFAULTS.headerVariant,
  unstyled = MODAL_DEFAULTS.unstyled,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useModal(show);
  useEscapeKey(show, onClose);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  }, [closeOnBackdrop, onClose]);

  const unstyledMod = unstyled ? ' w3f-dialog--unstyled' : '';
  const backdropClass = show ? `w3f-modal-backdrop is-open${unstyledMod}` : `w3f-modal-backdrop${unstyledMod}`;
  const sizeClass = unstyled ? '' : (size !== 'md' ? `w3f-modal-${size}` : '');

  return (
    <>
      <div className={backdropClass} onClick={handleBackdropClick}>
        <div className={`w3f-modal-card ${sizeClass}`} ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <header className={`w3f-modal-header w3f-bg-${headerVariant}`}>
            <h2 id="modal-title" className="w3f-modal-title">{title}</h2>
            {showCloseButton && (
              <Button
                onClick={onClose}
                className="w3f-modal-close-icon"
                aria-label="Cerrar modal"
                variant="text"
                color="secondary"
              >
                ×
              </Button>
            )}
          </header>

          <div className="w3f-modal-body">
            {children}
          </div>

          {footer && (
            <footer className="w3f-modal-footer">
              {footer}
            </footer>
          )}
        </div>
      </div>
    </>
  );
};

Modal.displayName = 'Modal';

export { Modal };
export default Modal;
