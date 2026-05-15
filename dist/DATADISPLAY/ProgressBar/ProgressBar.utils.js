const PROGRESS_BAR_SIZE_CLASSES = {
  sm: "w3f-progress-bar-container-sm",
  md: "w3f-progress-bar-container",
  lg: "w3f-progress-bar-container-lg"
};
const clampProgress = (value) => {
  return Math.min(100, Math.max(0, value));
};
const getProgressBgClass = (color) => {
  return `w3f-bg-${color}`;
};
const getSizeClass = (size) => {
  return PROGRESS_BAR_SIZE_CLASSES[size] || PROGRESS_BAR_SIZE_CLASSES.md;
};
const buildProgressBarClasses = (size, unstyled) => {
  if (unstyled) {
    return "w3f-progress-bar-container w3f-progress-bar--unstyled";
  }
  return `${getSizeClass(size)} w3f-bg-gray-200`;
};
export {
  PROGRESS_BAR_SIZE_CLASSES,
  buildProgressBarClasses,
  clampProgress,
  getProgressBgClass,
  getSizeClass
};
//# sourceMappingURL=ProgressBar.utils.js.map
