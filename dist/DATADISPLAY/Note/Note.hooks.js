import { useState, useCallback } from "react";
const useNoteDismiss = (onDismiss) => {
  const [isVisible, setIsVisible] = useState(true);
  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  }, [onDismiss]);
  return { isVisible, handleDismiss };
};
export {
  useNoteDismiss
};
//# sourceMappingURL=Note.hooks.js.map
