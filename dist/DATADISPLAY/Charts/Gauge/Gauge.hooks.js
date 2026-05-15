import { useMemo } from "react";
import { buildGaugeScale, getGaugeColor } from "./Gauge.utils";
function useGaugeScale(min, max) {
  return useMemo(() => buildGaugeScale(min, max), [min, max]);
}
function useGaugeColor(value, color, thresholds) {
  return useMemo(() => getGaugeColor(value, color, thresholds), [value, color, thresholds]);
}
import { useChartDimensions } from "../_base/hooks";
export {
  useChartDimensions,
  useGaugeColor,
  useGaugeScale
};
//# sourceMappingURL=Gauge.hooks.js.map
