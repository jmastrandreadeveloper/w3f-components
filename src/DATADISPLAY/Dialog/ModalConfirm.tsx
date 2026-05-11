import React from 'react';
import type { ModalConfirmProps } from './Modal.types';
import { MODAL_CONFIRM_DEFAULTS } from './Modal.constants';
import Modal from './Modal';
import Button from '../../INPUTS/Button/Button';

const ModalConfirm = ({
    show,
    onClose,
    onConfirm,
    title = MODAL_CONFIRM_DEFAULTS.title,
    message,
    confirmText = MODAL_CONFIRM_DEFAULTS.confirmText,
    cancelText = MODAL_CONFIRM_DEFAULTS.cancelText,
    variant = MODAL_CONFIRM_DEFAULTS.variant
}: ModalConfirmProps) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal
            show={show}
            onClose={onClose}
            title={title}
            size="sm"
            footer={
                <>
                    <Button variant="outlined" color="secondary" onClick={onClose}>
                        {cancelText}
                    </Button>
                    <Button variant="raised" color={variant} onClick={handleConfirm}>
                        {confirmText}
                    </Button>
                </>
            }
        >
            <p style={{ margin: 0, color: 'var(--w3f-on-surface)' }}>{message}</p>
        </Modal>
    );
};

ModalConfirm.displayName = 'ModalConfirm';

export { ModalConfirm };
export default ModalConfirm;
