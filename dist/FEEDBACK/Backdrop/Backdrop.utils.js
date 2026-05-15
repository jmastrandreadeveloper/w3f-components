function buildBackdropClasses(open, invisible, className) {
  return [
    "w3f-backdrop",
    open ? "w3f-backdrop--open" : "w3f-backdrop--closed",
    invisible && "w3f-backdrop--invisible",
    className
  ].filter(Boolean).join(" ");
}
export {
  buildBackdropClasses
};
//# sourceMappingURL=Backdrop.utils.js.map
