"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { DRAWER_DEFAULTS, DRAWER_CLASSES } from "./Drawer.constants";
import { buildDrawerClasses, buildDrawerSizeStyle } from "./Drawer.utils";
import {
  useDrawerAnimation,
  useDrawerEscKey,
  useDrawerBodyScroll,
  useDrawerFocusTrap
} from "./Drawer.hooks";
const Drawer = forwardRef(({
  open = DRAWER_DEFAULTS.open,
  onClose,
  anchor = DRAWER_DEFAULTS.anchor,
  variant = DRAWER_DEFAULTS.variant,
  width = DRAWER_DEFAULTS.width,
  height = DRAWER_DEFAULTS.height,
  showBackdrop = DRAWER_DEFAULTS.showBackdrop,
  showCloseButton = DRAWER_DEFAULTS.showCloseButton,
  closeOnBackdropClick = DRAWER_DEFAULTS.closeOnBackdropClick,
  closeOnEsc = DRAWER_DEFAULTS.closeOnEsc,
  color = DRAWER_DEFAULTS.color,
  unstyled = DRAWER_DEFAULTS.unstyled,
  className = DRAWER_DEFAULTS.className,
  children,
  ...props
}, ref) => {
  const drawerRef = useRef(null);
  const { mounted, visible } = useDrawerAnimation(open, variant);
  useDrawerEscKey(open, closeOnEsc, variant, onClose);
  useDrawerBodyScroll(open, variant);
  useDrawerFocusTrap(open, variant, drawerRef);
  const handleBackdropClick = useCallback(
    (e) => {
      if (closeOnBackdropClick && onClose) onClose(e, "backdropClick");
    },
    [closeOnBackdropClick, onClose]
  );
  const handleCloseButton = useCallback(
    (e) => {
      if (onClose) onClose(e, "closeButton");
    },
    [onClose]
  );
  const drawerCls = buildDrawerClasses(anchor, variant, color, visible, open, className, unstyled);
  const sizeStyle = buildDrawerSizeStyle(anchor, width, height);
  if (variant === "permanent") {
    return /* @__PURE__ */ jsx("aside", { className: drawerCls, style: sizeStyle, ref: (node) => {
      drawerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }, ...props, children: /* @__PURE__ */ jsx("div", { className: DRAWER_CLASSES.content, children }) });
  }
  if (variant === "persistent") {
    return /* @__PURE__ */ jsxs("aside", { className: drawerCls, style: sizeStyle, ref: (node) => {
      drawerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }, ...props, children: [
      showCloseButton && /* @__PURE__ */ jsx(
        "button",
        {
          className: DRAWER_CLASSES.close,
          onClick: handleCloseButton,
          "aria-label": "Cerrar",
          children: /* @__PURE__ */ jsx(X, { size: 20 })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: DRAWER_CLASSES.content, children })
    ] });
  }
  if (!mounted) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: `${DRAWER_CLASSES.root} ${visible && open ? DRAWER_CLASSES.rootOpen : ""}`,
      children: [
        showBackdrop && /* @__PURE__ */ jsx(
          "div",
          {
            className: DRAWER_CLASSES.backdrop,
            onClick: handleBackdropClick,
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxs(
          "aside",
          {
            className: drawerCls,
            style: sizeStyle,
            ref: drawerRef,
            tabIndex: -1,
            role: "dialog",
            "aria-modal": "true",
            ...props,
            children: [
              showCloseButton && /* @__PURE__ */ jsx(
                "button",
                {
                  className: DRAWER_CLASSES.close,
                  onClick: handleCloseButton,
                  "aria-label": "Cerrar",
                  children: /* @__PURE__ */ jsx(X, { size: 20 })
                }
              ),
              /* @__PURE__ */ jsx("div", { className: DRAWER_CLASSES.content, children })
            ]
          }
        )
      ]
    }
  );
});
Drawer.displayName = "Drawer";
var Drawer_default = Drawer;
export {
  Drawer,
  Drawer_default as default
};
//# sourceMappingURL=Drawer.js.map
