"use client";
import { jsx } from "react/jsx-runtime";
import Modal from "./Modal";
const ModalSimple = ({ show, onClose, title, children, size = "md" }) => {
  return /* @__PURE__ */ jsx(Modal, { show, onClose, title, size, children });
};
ModalSimple.displayName = "ModalSimple";
var ModalSimple_default = ModalSimple;
export {
  ModalSimple,
  ModalSimple_default as default
};
//# sourceMappingURL=ModalSimple.js.map
