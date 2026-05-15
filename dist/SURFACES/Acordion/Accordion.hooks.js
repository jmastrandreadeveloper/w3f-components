import { useState, useCallback } from "react";
function useAccordionState(multiple) {
  const [expanded, setExpanded] = useState(
    multiple ? [] : null
  );
  const togglePanel = useCallback(
    (id) => {
      if (multiple) {
        setExpanded((prev) => {
          const arr = prev;
          return arr.includes(id) ? arr.filter((panelId) => panelId !== id) : [...arr, id];
        });
      } else {
        setExpanded((prev) => prev === id ? null : id);
      }
    },
    [multiple]
  );
  const closePanel = useCallback(
    (id) => {
      if (multiple) {
        setExpanded((prev) => prev.filter((panelId) => panelId !== id));
      } else {
        setExpanded(null);
      }
    },
    [multiple]
  );
  const isExpanded = (id) => {
    if (multiple) return expanded.includes(id);
    return expanded === id;
  };
  return { expanded, togglePanel, closePanel, isExpanded };
}
export {
  useAccordionState
};
//# sourceMappingURL=Accordion.hooks.js.map
