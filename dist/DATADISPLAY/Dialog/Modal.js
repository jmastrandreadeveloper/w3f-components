"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useRef } from "react";
import { MODAL_DEFAULTS } from "./Modal.constants";
import { useModal, useEscapeKey } from "./Modal.hooks";
import Button from "../../INPUTS/Button/Button";
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
  unstyled = MODAL_DEFAULTS.unstyled
}) => {
  const modalRef = useRef(null);
  useModal(show);
  useEscapeKey(show, onClose);
  const handleBackdropClick = useCallback((e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  }, [closeOnBackdrop, onClose]);
  const unstyledMod = unstyled ? " w3f-dialog--unstyled" : "";
  const backdropClass = show ? `w3f-modal-backdrop is-open${unstyledMod}` : `w3f-modal-backdrop${unstyledMod}`;
  const sizeClass = unstyled ? "" : size !== "md" ? `w3f-modal-${size}` : "";
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: backdropClass, onClick: handleBackdropClick, children: /* @__PURE__ */ jsxs("div", { className: `w3f-modal-card ${sizeClass}`, ref: modalRef, role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title", children: [
    /* @__PURE__ */ jsxs("header", { className: `w3f-modal-header w3f-bg-${headerVariant}`, children: [
      /* @__PURE__ */ jsx("h2", { id: "modal-title", className: "w3f-modal-title", children: title }),
      showCloseButton && /* @__PURE__ */ jsx(
        Button,
        {
          onClick: onClose,
          className: "w3f-modal-close-icon",
          "aria-label": "Cerrar modal",
          variant: "text",
          color: "secondary",
          children: "\xD7"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w3f-modal-body", children }),
    footer && /* @__PURE__ */ jsx("footer", { className: "w3f-modal-footer", children: footer })
  ] }) }) });
};
Modal.displayName = "Modal";
var Modal_default = Modal;
export {
  Modal,
  Modal_default as default
};
//# sourceMappingURL=Modal.js.map
