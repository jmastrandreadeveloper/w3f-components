import { useMemo, useCallback, useState } from "react";
import { scaleTime, scaleLinear } from "@visx/scale";
import { resolveColorScheme } from "../_base/utils";
function useAreaStackedScales(layers, dates, innerWidth, innerHeight, yDomain) {
  return useMemo(() => {
    if (dates.length === 0) {
      const xScale2 = scaleTime({ domain: [0, 1], range: [0, innerWidth] });
      const yScale2 = scaleLinear({ domain: [0, 1], range: [innerHeight, 0] });
      return { xScale: xScale2, yScale: yScale2 };
    }
    const minDate = Math.min(...dates.map(Number));
    const maxDate = Math.max(...dates.map(Number));
    let maxY1 = 0;
    for (const layer of layers) {
      for (const pt of layer.points) {
        if (pt.y1 > maxY1) maxY1 = pt.y1;
      }
    }
    const [domainMin, domainMax] = yDomain ?? [0, maxY1 * 1.1];
    const xScale = scaleTime({ domain: [minDate, maxDate], range: [0, innerWidth] });
    const yScale = scaleLinear({ domain: [domainMin, domainMax], range: [innerHeight, 0], nice: true });
    return { xScale, yScale };
  }, [layers, dates, innerWidth, innerHeight, yDomain]);
}
function useAreaStackedColors(keys, colorScheme) {
  return useMemo(() => {
    const palette = resolveColorScheme(colorScheme);
    const map = {};
    keys.forEach((k, i) => {
      map[k] = palette[i % palette.length];
    });
    return map;
  }, [keys, colorScheme]);
}
function useAreaStackedHover(onHover) {
  const [hovered, setHovered] = useState(null);
  const enter = useCallback((seriesId) => {
    setHovered(seriesId);
    onHover?.(seriesId);
  }, [onHover]);
  const leave = useCallback(() => {
    setHovered(null);
    onHover?.(null);
  }, [onHover]);
  return { hovered, enter, leave };
}
import { useChartDimensions, useInnerDims as useInnerDims2 } from "../_base/hooks";
export {
  useAreaStackedColors,
  useAreaStackedHover,
  useAreaStackedScales,
  useChartDimensions,
  useInnerDims2 as useInnerDims
};
//# sourceMappingURL=AreaStacked.hooks.js.map
