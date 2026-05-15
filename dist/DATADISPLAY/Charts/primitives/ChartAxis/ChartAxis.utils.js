import { CHART_AXIS_CLASSES } from "./ChartAxis.constants";
function buildAxisClasses(orientation, className) {
  const orientationClass = CHART_AXIS_CLASSES[orientation];
  return [CHART_AXIS_CLASSES.root, orientationClass, className].filter(Boolean).join(" ");
}
export {
  buildAxisClasses
};
//# sourceMappingURL=ChartAxis.utils.js.map
