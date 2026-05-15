"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import Button from "../../INPUTS/Button/Button";
import { WINDOW_DEFAULTS, WINDOW_CLASSES, RESIZE_DIRECTIONS } from "./Window.constants";
import { useWindowState } from "./Window.hooks";
import {
  buildWindowClasses,
  buildWindowBodyClasses,
  buildWindowFooterClasses,
  buildWindowStyle
} from "./Window.utils";
const MinimizeIcon = () => /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx("rect", { x: "2", y: "5", width: "8", height: "2" }) });
const MaximizeIcon = () => /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx("rect", { x: "2", y: "2", width: "8", height: "8", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }) });
const RestoreIcon = () => /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3,3 L3,9 L9,9 L9,3 Z M4,4 L8,4 L8,8 L4,8 Z M5,1 L11,1 L11,7 L10,7 L10,2 L5,2 Z" }) });
const CloseIcon = () => /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M2,2 L10,10 M10,2 L2,10", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
const Window = forwardRef(({
  title = WINDOW_DEFAULTS.title,
  icon,
  children,
  footer,
  buttons = [],
  osStyle = WINDOW_DEFAULTS.osStyle,
  size = WINDOW_DEFAULTS.size,
  modal = WINDOW_DEFAULTS.modal,
  draggable = WINDOW_DEFAULTS.draggable,
  resizable = WINDOW_DEFAULTS.resizable,
  minimizable = WINDOW_DEFAULTS.minimizable,
  maximizable = WINDOW_DEFAULTS.maximizable,
  closable = WINDOW_DEFAULTS.closable,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  className = WINDOW_DEFAULTS.className,
  bodyClassName = WINDOW_DEFAULTS.bodyClassName,
  footerClassName = WINDOW_DEFAULTS.footerClassName,
  style,
  initialPosition = null,
  initialSize = null,
  footerAlign = WINDOW_DEFAULTS.footerAlign,
  open = WINDOW_DEFAULTS.open,
  noPadding = WINDOW_DEFAULTS.noPadding,
  unstyled = WINDOW_DEFAULTS.unstyled
}, ref) => {
  const {
    isOpen,
    isMinimized,
    isMaximized,
    isFocused,
    isDragging,
    isResizing,
    zIndex,
    position,
    dimensions,
    windowRef,
    handleDragStart,
    handleResizeStart,
    handleClose,
    handleMinimize,
    handleMaximize,
    handleWindowClick
  } = useWindowState(
    open,
    draggable,
    resizable,
    onClose,
    onMinimize,
    onMaximize,
    onFocus,
    initialPosition,
    initialSize
  );
  if (!isOpen) return null;
  const windowCls = buildWindowClasses(
    osStyle,
    size,
    modal,
    isMaximized,
    isMinimized,
    isFocused,
    isDragging,
    isResizing,
    className,
    unstyled
  );
  const bodyCls = buildWindowBodyClasses(noPadding, bodyClassName);
  const footerCls = buildWindowFooterClasses(footerAlign, footerClassName);
  const windowStyle = buildWindowStyle(style, position, dimensions, isMaximized, zIndex);
  const renderMacosButtons = () => /* @__PURE__ */ jsxs("div", { className: WINDOW_CLASSES.titlebarLeft, children: [
    closable && /* @__PURE__ */ jsx(
      "button",
      {
        className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlClose}`,
        onClick: handleClose,
        "aria-label": "Cerrar",
        title: "Cerrar",
        type: "button",
        children: /* @__PURE__ */ jsx("span", { children: "\xD7" })
      }
    ),
    minimizable && /* @__PURE__ */ jsx(
      "button",
      {
        className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMinimize}`,
        onClick: handleMinimize,
        "aria-label": "Minimizar",
        title: "Minimizar",
        type: "button",
        children: /* @__PURE__ */ jsx("span", { children: "\u2212" })
      }
    ),
    maximizable && /* @__PURE__ */ jsx(
      "button",
      {
        className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMaximize}`,
        onClick: handleMaximize,
        "aria-label": isMaximized ? "Restaurar" : "Maximizar",
        title: isMaximized ? "Restaurar" : "Maximizar",
        type: "button",
        children: /* @__PURE__ */ jsx("span", { children: "+" })
      }
    ),
    icon && /* @__PURE__ */ jsx("div", { className: WINDOW_CLASSES.icon, children: icon }),
    /* @__PURE__ */ jsx("h2", { className: WINDOW_CLASSES.title, children: title })
  ] });
  const renderWindowsButtons = () => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: WINDOW_CLASSES.titlebarLeft, children: [
      icon && /* @__PURE__ */ jsx("div", { className: WINDOW_CLASSES.icon, children: icon }),
      /* @__PURE__ */ jsx("h2", { className: WINDOW_CLASSES.title, children: title })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: WINDOW_CLASSES.titlebarRight, children: [
      minimizable && /* @__PURE__ */ jsx(
        "button",
        {
          className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMinimize}`,
          onClick: handleMinimize,
          "aria-label": "Minimizar",
          title: "Minimizar",
          type: "button",
          children: /* @__PURE__ */ jsx(MinimizeIcon, {})
        }
      ),
      maximizable && /* @__PURE__ */ jsx(
        "button",
        {
          className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMaximize}`,
          onClick: handleMaximize,
          "aria-label": isMaximized ? "Restaurar" : "Maximizar",
          title: isMaximized ? "Restaurar" : "Maximizar",
          type: "button",
          children: isMaximized ? /* @__PURE__ */ jsx(RestoreIcon, {}) : /* @__PURE__ */ jsx(MaximizeIcon, {})
        }
      ),
      closable && /* @__PURE__ */ jsx(
        "button",
        {
          className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlClose}`,
          onClick: handleClose,
          "aria-label": "Cerrar",
          title: "Cerrar",
          type: "button",
          children: /* @__PURE__ */ jsx(CloseIcon, {})
        }
      )
    ] })
  ] });
  const renderResizeHandles = () => {
    if (!resizable || isMaximized) return null;
    return RESIZE_DIRECTIONS.map((dir) => /* @__PURE__ */ jsx(
      "div",
      {
        className: `${WINDOW_CLASSES.resizeHandle} ${WINDOW_CLASSES.resizeHandle}--${dir}`,
        onMouseDown: (e) => handleResizeStart(e, dir)
      },
      dir
    ));
  };
  const renderFooter = () => {
    if (!footer && (!buttons || buttons.length === 0)) return null;
    return /* @__PURE__ */ jsx("div", { className: footerCls, children: footer ?? buttons.map(({ key, text, children: btnChildren, ...rest }, index) => /* @__PURE__ */ jsx(Button, { ...rest, children: text ?? btnChildren }, key ?? `window-btn-${index}`)) });
  };
  const windowContent = /* @__PURE__ */ jsxs("div", { ref: (node) => {
    windowRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  }, className: windowCls, style: windowStyle, onClick: handleWindowClick, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `${WINDOW_CLASSES.titlebar} ${isDragging ? WINDOW_CLASSES.titlebarDragging : ""}`,
        onMouseDown: handleDragStart,
        children: osStyle === "macos" ? renderMacosButtons() : renderWindowsButtons()
      }
    ),
    /* @__PURE__ */ jsx("div", { className: bodyCls, children }),
    renderFooter(),
    renderResizeHandles()
  ] });
  if (modal) {
    return /* @__PURE__ */ jsx("div", { className: WINDOW_CLASSES.overlay, children: windowContent });
  }
  return windowContent;
});
Window.displayName = "Window";
var Window_default = Window;
export {
  Window,
  Window_default as default
};
//# sourceMappingURL=Window.js.map
