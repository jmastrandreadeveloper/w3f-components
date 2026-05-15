import { WINDOW_CLASSES } from "./Window.constants";
function buildWindowClasses(osStyle, size, modal, isMaximized, isMinimized, isFocused, isDragging, isResizing, className, unstyled) {
  if (unstyled) {
    return [WINDOW_CLASSES.base, "w3f-window--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    WINDOW_CLASSES.base,
    `w3f-window--${osStyle}`,
    `w3f-window--${size}`,
    modal ? WINDOW_CLASSES.modal : WINDOW_CLASSES.floating,
    isMaximized && WINDOW_CLASSES.maximized,
    isMinimized && WINDOW_CLASSES.minimized,
    isFocused && WINDOW_CLASSES.focused,
    isDragging && WINDOW_CLASSES.dragging,
    isResizing && WINDOW_CLASSES.resizing,
    className
  ].filter(Boolean).join(" ");
}
function buildWindowBodyClasses(noPadding, bodyClassName) {
  return [
    WINDOW_CLASSES.body,
    noPadding && WINDOW_CLASSES.bodyNoPadding,
    bodyClassName
  ].filter(Boolean).join(" ");
}
function buildWindowFooterClasses(align, footerClassName) {
  return [WINDOW_CLASSES.footer, `w3f-window-footer--${align}`, footerClassName].filter(Boolean).join(" ");
}
function buildWindowStyle(style, position, dimensions, isMaximized, zIndex) {
  return {
    ...style,
    zIndex,
    ...!isMaximized && position ? { left: `${position.x}px`, top: `${position.y}px` } : {},
    ...!isMaximized && dimensions ? { width: `${dimensions.width}px`, height: `${dimensions.height}px`, maxHeight: "none" } : {}
  };
}
export {
  buildWindowBodyClasses,
  buildWindowClasses,
  buildWindowFooterClasses,
  buildWindowStyle
};
//# sourceMappingURL=Window.utils.js.map
