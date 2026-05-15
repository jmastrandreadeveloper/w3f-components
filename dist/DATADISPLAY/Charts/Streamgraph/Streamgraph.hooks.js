import { useMemo, useCallback, useState } from "react";
import { scaleTime, scaleLinear } from "@visx/scale";
import { useColorScale } from "../_base/hooks";
function useStreamScales(layers, dates, innerWidth, innerHeight) {
  return useMemo(() => {
    if (dates.length === 0 || layers.length === 0) {
      return {
        xScale: scaleTime({ domain: [/* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()], range: [0, innerWidth] }),
        yScale: scaleLinear({ domain: [0, 1], range: [innerHeight, 0] })
      };
    }
    let yMin = 0;
    let yMax = 0;
    for (const layer of layers) {
      for (const pt of layer.points) {
        if (pt.y0 < yMin) yMin = pt.y0;
        if (pt.y1 > yMax) yMax = pt.y1;
      }
    }
    const xScale = scaleTime({
      domain: [dates[0], dates[dates.length - 1]],
      range: [0, innerWidth]
    });
    const yScale = scaleLinear({
      domain: [yMin, yMax],
      range: [innerHeight, 0]
    });
    return { xScale, yScale };
  }, [layers, dates, innerWidth, innerHeight]);
}
function useStreamColors(keys, colorScheme) {
  return useColorScale(keys, colorScheme);
}
function useStreamHover(onHover) {
  const [hovered, setHovered] = useState(null);
  const enter = useCallback((id) => {
    setHovered(id);
    onHover?.(id);
  }, [onHover]);
  const leave = useCallback(() => {
    setHovered(null);
    onHover?.(null);
  }, [onHover]);
  return { hovered, enter, leave };
}
import { useChartDimensions, useInnerDims as useInnerDims2 } from "../_base/hooks";
export {
  useChartDimensions,
  useInnerDims2 as useInnerDims,
  useStreamColors,
  useStreamHover,
  useStreamScales
};
//# sourceMappingURL=Streamgraph.hooks.js.map
