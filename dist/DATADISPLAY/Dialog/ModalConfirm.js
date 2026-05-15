"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { MODAL_CONFIRM_DEFAULTS } from "./Modal.constants";
import Modal from "./Modal";
import Button from "../../INPUTS/Button/Button";
const ModalConfirm = ({
  show,
  onClose,
  onConfirm,
  title = MODAL_CONFIRM_DEFAULTS.title,
  message,
  confirmText = MODAL_CONFIRM_DEFAULTS.confirmText,
  cancelText = MODAL_CONFIRM_DEFAULTS.cancelText,
  variant = MODAL_CONFIRM_DEFAULTS.variant
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  return /* @__PURE__ */ jsx(
    Modal,
    {
      show,
      onClose,
      title,
      size: "sm",
      footer: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outlined", color: "secondary", onClick: onClose, children: cancelText }),
        /* @__PURE__ */ jsx(Button, { variant: "raised", color: variant, onClick: handleConfirm, children: confirmText })
      ] }),
      children: /* @__PURE__ */ jsx("p", { style: { margin: 0, color: "var(--w3f-on-surface)" }, children: message })
    }
  );
};
ModalConfirm.displayName = "ModalConfirm";
var ModalConfirm_default = ModalConfirm;
export {
  ModalConfirm,
  ModalConfirm_default as default
};
//# sourceMappingURL=ModalConfirm.js.map
