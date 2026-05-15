import { useState, useRef, useCallback, useEffect } from "react";
import { GRID_DIVIDER_DEFAULTS } from "./GridWithDividers.constants";
const useGridDividers = (configs) => {
  const [sizes, setSizes] = useState(
    () => configs.map((c) => c.initialSize ?? GRID_DIVIDER_DEFAULTS.initialSize)
  );
  const [draggingIdx, setDraggingIdx] = useState(-1);
  const startPosRef = useRef(0);
  const startSizeRef = useRef(0);
  const invertedRef = useRef(false);
  const configsRef = useRef(configs);
  const sizesRef = useRef(sizes);
  configsRef.current = configs;
  sizesRef.current = sizes;
  const handleMouseMove = useCallback((e) => {
    const idx = draggingIdx;
    if (idx < 0) return;
    const config = configsRef.current[idx];
    const orientation = config.orientation ?? GRID_DIVIDER_DEFAULTS.orientation;
    const currentPos = orientation === "vertical" ? e.clientX : e.clientY;
    let delta = currentPos - startPosRef.current;
    if (invertedRef.current) delta = -delta;
    const minSize = config.minSize ?? GRID_DIVIDER_DEFAULTS.minSize;
    const maxSize = config.maxSize ?? GRID_DIVIDER_DEFAULTS.maxSize;
    const newSize = Math.max(minSize, Math.min(maxSize, startSizeRef.current + delta));
    setSizes((prev) => {
      const next = [...prev];
      next[idx] = newSize;
      return next;
    });
  }, [draggingIdx]);
  const handleMouseUp = useCallback(() => {
    setDraggingIdx(-1);
    invertedRef.current = false;
  }, []);
  useEffect(() => {
    if (draggingIdx >= 0) {
      const config = configsRef.current[draggingIdx];
      const orientation = config.orientation ?? GRID_DIVIDER_DEFAULTS.orientation;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = orientation === "vertical" ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [draggingIdx, handleMouseMove, handleMouseUp]);
  return configs.map((config, idx) => ({
    size: sizesRef.current[idx] ?? (config.initialSize ?? GRID_DIVIDER_DEFAULTS.initialSize),
    isDragging: draggingIdx === idx,
    handleMouseDown: (e, inverted = false) => {
      const orientation = config.orientation ?? GRID_DIVIDER_DEFAULTS.orientation;
      startPosRef.current = orientation === "vertical" ? e.clientX : e.clientY;
      startSizeRef.current = sizesRef.current[idx] ?? (config.initialSize ?? GRID_DIVIDER_DEFAULTS.initialSize);
      invertedRef.current = inverted;
      setDraggingIdx(idx);
      e.preventDefault();
    },
    setSize: ((newSize) => {
      setSizes((prev) => {
        const next = [...prev];
        next[idx] = typeof newSize === "function" ? newSize(prev[idx]) : newSize;
        return next;
      });
    }),
    reset: () => {
      setSizes((prev) => {
        const next = [...prev];
        next[idx] = config.initialSize ?? GRID_DIVIDER_DEFAULTS.initialSize;
        return next;
      });
    }
  }));
};
var GridWithDividers_hooks_default = useGridDividers;
export {
  GridWithDividers_hooks_default as default,
  useGridDividers
};
//# sourceMappingURL=GridWithDividers.hooks.js.map
