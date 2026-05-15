function snapToStep(value, step) {
  return Math.round(value / step) * step;
}
function getPercent(value, min, max) {
  return Math.round((value - min) / (max - min) * 100);
}
function defaultFormatLabel(value) {
  return value;
}
export {
  defaultFormatLabel,
  getPercent,
  snapToStep
};
//# sourceMappingURL=RangeSlider.utils.js.map
