import { useCallback, useState } from "react";
function useLegendToggle(items, onToggle) {
  const [disabledIds, setDisabledIds] = useState(() => {
    const s = /* @__PURE__ */ new Set();
    for (const item of items) {
      if (item.disabled) s.add(item.id);
    }
    return s;
  });
  const toggle = useCallback(
    (item, index) => {
      setDisabledIds((prev) => {
        const next = new Set(prev);
        if (next.has(item.id)) {
          next.delete(item.id);
        } else {
          next.add(item.id);
        }
        return next;
      });
      onToggle?.(item, index);
    },
    [onToggle]
  );
  return { disabledIds, toggle };
}
export {
  useLegendToggle
};
//# sourceMappingURL=ChartLegend.hooks.js.map
