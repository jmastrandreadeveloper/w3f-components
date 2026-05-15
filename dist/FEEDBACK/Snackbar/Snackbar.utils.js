import { SNACKBAR_VARIANTS } from "./Snackbar.constants";
function getSnackbarPositionKey(anchorOrigin) {
  return `${anchorOrigin.vertical}-${anchorOrigin.horizontal}`;
}
function buildAnchorClasses(anchorOrigin) {
  const posKey = getSnackbarPositionKey(anchorOrigin);
  return `w3f-snackbar-anchor w3f-snackbar-anchor--${posKey}`;
}
function buildSnackbarClasses(variant, isExiting, className) {
  return [
    "w3f-snackbar",
    SNACKBAR_VARIANTS[variant] || "",
    isExiting && "w3f-snackbar--exit",
    className
  ].filter(Boolean).join(" ");
}
export {
  buildAnchorClasses,
  buildSnackbarClasses,
  getSnackbarPositionKey
};
//# sourceMappingURL=Snackbar.utils.js.map
