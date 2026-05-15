import { useState, useCallback } from "react";
const usePanelState = (initialState = true) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const togglePanel = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return {
    isOpen,
    togglePanel
  };
};
export {
  usePanelState
};
//# sourceMappingURL=Panel.hooks.js.map
