"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { createPortal } from "react-dom";
import Card from "../../DATADISPLAY/Card/Card";
import Button from "../../INPUTS/Button/Button";
import { POPUP_DEFAULTS, POPUP_CLASSES } from "./PopUp.constants";
import { usePopUpKeyboard } from "./PopUp.hooks";
import { buildPopUpOverlayClasses, buildPopUpContainerClasses } from "./PopUp.utils";
const PopUp = forwardRef(({
  isOpen,
  onClose,
  title,
  subtitle,
  content,
  onConfirm,
  confirmText = POPUP_DEFAULTS.confirmText,
  cancelText = POPUP_DEFAULTS.cancelText,
  showCancel = POPUP_DEFAULTS.showCancel,
  variant = POPUP_DEFAULTS.variant,
  size = POPUP_DEFAULTS.size,
  closeOnOverlayClick = POPUP_DEFAULTS.closeOnOverlayClick,
  children,
  unstyled = POPUP_DEFAULTS.unstyled,
  className = POPUP_DEFAULTS.className,
  footerActions
}, ref) => {
  usePopUpKeyboard(isOpen, onClose);
  if (!isOpen) return null;
  const defaultActions = /* @__PURE__ */ jsxs(Fragment, { children: [
    showCancel && /* @__PURE__ */ jsx(Button, { variant: "text", color: "gray", onClick: onClose, children: cancelText }),
    /* @__PURE__ */ jsx(Button, { variant: "raised", color: "primary", onClick: onConfirm ?? onClose, children: confirmText })
  ] });
  const popUpContent = /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: buildPopUpOverlayClasses(isOpen),
      onClick: closeOnOverlayClick ? onClose : void 0,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: buildPopUpContainerClasses(className, size, unstyled),
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsx(
              Card,
              {
                title,
                subtitle,
                variant,
                size,
                fullWidth: true,
                content: content ?? children,
                actions: footerActions ?? defaultActions,
                actionsAlign: "end",
                className: POPUP_CLASSES.card
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: POPUP_CLASSES.closeBtn,
                onClick: onClose,
                "aria-label": "Close",
                children: "\xD7"
              }
            )
          ]
        }
      )
    }
  );
  return createPortal(popUpContent, document.body);
});
PopUp.displayName = "PopUp";
var PopUp_default = PopUp;
export {
  PopUp,
  PopUp_default as default
};
//# sourceMappingURL=PopUp.js.map
