import { useState, useRef, useEffect, useCallback } from "react";
function useResponsiveGrid(autoResponsive, responsiveBreakpoints, responsiveColumns, gridTemplateColumns, deps) {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("md");
  const [gridColumns, setGridColumns] = useState(gridTemplateColumns ?? "");
  const bodyRef = useRef(null);
  const calculateGridColumns = useCallback(
    (width) => {
      if (!autoResponsive) return;
      const sorted = Object.entries(responsiveBreakpoints).sort((a, b) => a[1] - b[1]);
      let breakpoint = "xs";
      for (const [bp, minWidth] of sorted) {
        if (width >= minWidth) breakpoint = bp;
      }
      setCurrentBreakpoint(breakpoint);
      const cols = responsiveColumns[breakpoint] ?? responsiveColumns.xs ?? 1;
      setGridColumns(`repeat(${cols}, minmax(0, 1fr))`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [autoResponsive, responsiveBreakpoints, responsiveColumns]
  );
  useEffect(() => {
    if (!bodyRef.current || !autoResponsive) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        calculateGridColumns(entry.contentRect.width);
      }
    });
    observer.observe(bodyRef.current);
    return () => observer.disconnect();
  }, [calculateGridColumns, autoResponsive]);
  useEffect(() => {
    if (bodyRef.current && autoResponsive) {
      calculateGridColumns(bodyRef.current.offsetWidth);
    }
  }, [calculateGridColumns, autoResponsive, ...deps]);
  return { gridColumns, currentBreakpoint, bodyRef };
}
export {
  useResponsiveGrid
};
//# sourceMappingURL=WindowGrid.hooks.js.map
