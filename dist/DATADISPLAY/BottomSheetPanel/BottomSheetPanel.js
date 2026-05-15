"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useRef, useEffect } from "react";
import { useBottomSheetAnimation, useScrollLock, useEscapeKey } from "./BottomSheetPanel.hooks";
import { getMaxHeight } from "./BottomSheetPanel.utils";
import { BSP_DEFAULTS } from "./BottomSheetPanel.constants";
const BottomSheetPanel = forwardRef(({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = BSP_DEFAULTS.showCloseButton,
  closeOnBackdropClick = BSP_DEFAULTS.closeOnBackdropClick,
  closeOnEscape = BSP_DEFAULTS.closeOnEscape,
  size = BSP_DEFAULTS.size,
  maxHeight,
  className = BSP_DEFAULTS.className,
  footer,
  unstyled = BSP_DEFAULTS.unstyled
}, ref) => {
  const panelRef = useRef(null);
  const { isAnimating, shouldRender } = useBottomSheetAnimation(isOpen);
  useScrollLock(isOpen);
  useEscapeKey(isOpen, onClose, closeOnEscape);
  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen]);
  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  if (!shouldRender) return null;
  const unstyledClass = unstyled ? "w3f-bottom-sheet-panel--unstyled" : "";
  const sizeClass = unstyled ? "" : size !== "auto" ? `bottom-sheet-panel--${size}` : "";
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: `bottom-sheet-backdrop ${isAnimating ? "is-open" : ""}`,
      onClick: handleBackdropClick,
      role: "presentation",
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          ref: panelRef,
          className: `bottom-sheet-panel ${sizeClass} ${unstyledClass} ${isAnimating ? "is-open" : ""} ${className}`.trim().replace(/\s+/g, " "),
          style: size === "auto" && !maxHeight ? { maxHeight: "calc(100vh - 64px)" } : { height: getMaxHeight(size, maxHeight), maxHeight: getMaxHeight(size, maxHeight) },
          onClick: (e) => e.stopPropagation(),
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": title ? "bottom-sheet-title" : void 0,
          tabIndex: -1,
          children: [
            (title || showCloseButton) && /* @__PURE__ */ jsxs("div", { className: "bottom-sheet-header", children: [
              title && /* @__PURE__ */ jsx("h3", { id: "bottom-sheet-title", className: "bottom-sheet-title", children: title }),
              showCloseButton && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onClose,
                  className: "bottom-sheet-close-btn",
                  "aria-label": "Cerrar panel",
                  type: "button",
                  children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      width: "24",
                      height: "24",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      children: /* @__PURE__ */ jsx("path", { d: "M18 6L6 18M6 6l12 12" })
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bottom-sheet-content", children }),
            footer && /* @__PURE__ */ jsx("div", { className: "bottom-sheet-footer", children: footer })
          ]
        }
      )
    }
  );
});
BottomSheetPanel.displayName = "BottomSheetPanel";
var BottomSheetPanel_default = BottomSheetPanel;
export {
  BottomSheetPanel,
  BottomSheetPanel_default as default
};
//# sourceMappingURL=BottomSheetPanel.js.map
