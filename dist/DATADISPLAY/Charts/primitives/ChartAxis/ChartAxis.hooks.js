import { useMemo } from "react";
import { formatTick } from "../../_base/utils";
function useTickFormat(tickFormat) {
  return useMemo(
    () => tickFormat ?? ((value) => formatTick(value)),
    [tickFormat]
  );
}
export {
  useTickFormat
};
//# sourceMappingURL=ChartAxis.hooks.js.map
