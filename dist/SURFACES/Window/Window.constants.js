const WINDOW_DEFAULTS = {
  title: "Window",
  osStyle: "windows",
  size: "md",
  modal: false,
  draggable: true,
  resizable: true,
  minimizable: true,
  maximizable: true,
  closable: true,
  className: "",
  bodyClassName: "",
  footerClassName: "",
  footerAlign: "end",
  open: true,
  noPadding: false,
  unstyled: false,
  buttons: []
};
const WINDOW_CLASSES = {
  base: "w3f-window",
  floating: "w3f-window--floating",
  modal: "w3f-window--modal",
  maximized: "w3f-window--maximized",
  minimized: "w3f-window--minimized",
  focused: "w3f-window--focused",
  dragging: "w3f-window--dragging",
  resizing: "w3f-window--resizing",
  titlebar: "w3f-window-titlebar",
  titlebarDragging: "w3f-window-titlebar--dragging",
  titlebarLeft: "w3f-window-titlebar-left",
  titlebarRight: "w3f-window-titlebar-right",
  title: "w3f-window-title",
  icon: "w3f-window-icon",
  body: "w3f-window-body",
  bodyNoPadding: "w3f-window-body--no-padding",
  footer: "w3f-window-footer",
  overlay: "w3f-window-overlay",
  controlBtn: "w3f-window-control-btn",
  controlClose: "w3f-window-control-btn--close",
  controlMinimize: "w3f-window-control-btn--minimize",
  controlMaximize: "w3f-window-control-btn--maximize",
  resizeHandle: "w3f-window-resize-handle"
};
const WINDOW_MIN_WIDTH = 300;
const WINDOW_MIN_HEIGHT = 200;
const RESIZE_DIRECTIONS = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];
export {
  RESIZE_DIRECTIONS,
  WINDOW_CLASSES,
  WINDOW_DEFAULTS,
  WINDOW_MIN_HEIGHT,
  WINDOW_MIN_WIDTH
};
//# sourceMappingURL=Window.constants.js.map
