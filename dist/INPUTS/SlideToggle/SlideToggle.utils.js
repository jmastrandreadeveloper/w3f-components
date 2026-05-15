import { SLIDE_TOGGLE_CLASSES, SLIDE_TOGGLE_SIZE_CONFIGS } from "./SlideToggle.constants";
function getSizeConfig(size) {
  return SLIDE_TOGGLE_SIZE_CONFIGS[size];
}
function buildToggleClasses(size, variant, disabled, loading, hasError, unstyled) {
  if (unstyled) {
    return [
      SLIDE_TOGGLE_CLASSES.base,
      "w3f-slide-toggle--unstyled"
    ].filter(Boolean).join(" ");
  }
  return [
    SLIDE_TOGGLE_CLASSES.base,
    size !== "md" && `${SLIDE_TOGGLE_CLASSES.base}--${size}`,
    variant !== "primary" && `${SLIDE_TOGGLE_CLASSES.base}--${variant}`,
    disabled && SLIDE_TOGGLE_CLASSES.isDisabled,
    loading && SLIDE_TOGGLE_CLASSES.isLoading,
    hasError && SLIDE_TOGGLE_CLASSES.hasError
  ].filter(Boolean).join(" ");
}
function buildTrackClasses(isChecked) {
  return [
    SLIDE_TOGGLE_CLASSES.track,
    isChecked && SLIDE_TOGGLE_CLASSES.trackChecked
  ].filter(Boolean).join(" ");
}
function buildHandleClasses(isDragging) {
  return [
    SLIDE_TOGGLE_CLASSES.handle,
    isDragging && SLIDE_TOGGLE_CLASSES.handleDragging
  ].filter(Boolean).join(" ");
}
export {
  buildHandleClasses,
  buildToggleClasses,
  buildTrackClasses,
  getSizeConfig
};
//# sourceMappingURL=SlideToggle.utils.js.map
