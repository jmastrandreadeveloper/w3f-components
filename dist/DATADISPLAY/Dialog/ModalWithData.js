"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import Modal from "./Modal";
import Button from "../../INPUTS/Button/Button";
const ModalWithData = ({ show, onClose, title, data, size = "md" }) => {
  return /* @__PURE__ */ jsx(
    Modal,
    {
      show,
      onClose,
      title,
      size,
      footer: /* @__PURE__ */ jsx(Button, { variant: "raised", color: "danger", onClick: onClose, children: "Cerrar" }),
      children: data ? /* @__PURE__ */ jsxs("div", { className: "w3f-modal-data-card", children: [
        /* @__PURE__ */ jsx("h3", { children: "Detalles del Usuario" }),
        /* @__PURE__ */ jsxs("div", { className: "w3f-modal-data-item", children: [
          /* @__PURE__ */ jsx("span", { className: "w3f-modal-data-label", children: "Nombre:" }),
          /* @__PURE__ */ jsx("span", { className: "w3f-modal-data-value", children: data.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w3f-modal-data-item", children: [
          /* @__PURE__ */ jsx("span", { className: "w3f-modal-data-label", children: "Email:" }),
          /* @__PURE__ */ jsx("span", { className: "w3f-modal-data-value", children: data.email })
        ] }),
        data.phone && /* @__PURE__ */ jsxs("div", { className: "w3f-modal-data-item", children: [
          /* @__PURE__ */ jsx("span", { className: "w3f-modal-data-label", children: "Tel\xE9fono:" }),
          /* @__PURE__ */ jsx("span", { className: "w3f-modal-data-value", children: data.phone })
        ] })
      ] }) : /* @__PURE__ */ jsx("p", { style: { color: "var(--w3f-gray-500)" }, children: "No se encontraron datos para mostrar." })
    }
  );
};
ModalWithData.displayName = "ModalWithData";
var ModalWithData_default = ModalWithData;
export {
  ModalWithData,
  ModalWithData_default as default
};
//# sourceMappingURL=ModalWithData.js.map
