import { BULLET_ROOT_CLASS } from "./Bullet.constants";
import { buildChartRootClasses } from "../_base/utils";
import { scaleLinear } from "@visx/scale";
function buildBulletClasses(className, unstyled) {
  return buildChartRootClasses(BULLET_ROOT_CLASS, className, unstyled);
}
function buildBulletScale(datum, width) {
  const maxRange = Math.max(...datum.ranges, datum.value, datum.target ?? 0);
  return scaleLinear({
    domain: [0, maxRange],
    range: [0, width]
  });
}
function buildTooltipContent(datum) {
  const parts = [`${datum.label}: ${datum.value.toLocaleString()}`];
  if (datum.target != null) {
    parts.push(`Target: ${datum.target.toLocaleString()}`);
  }
  parts.push(`Max range: ${Math.max(...datum.ranges).toLocaleString()}`);
  return parts.join(" | ");
}
export {
  buildBulletClasses,
  buildBulletScale,
  buildTooltipContent
};
//# sourceMappingURL=Bullet.utils.js.map
