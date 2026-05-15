import { useState, useCallback, useEffect } from "react";
import { bringToFront, syncWindowOrder } from "./Desktop.utils";
function useWindowOrder(children) {
  const [windowOrder, setWindowOrder] = useState([]);
  useEffect(() => {
    const currentKeys = [];
    const childArray = Array.isArray(children) ? children : [children];
    for (const child of childArray) {
      if (child && typeof child === "object" && "key" in child && child.key) {
        currentKeys.push(String(child.key));
      }
    }
    setWindowOrder((prev) => syncWindowOrder(prev, currentKeys));
  }, [children]);
  const handleWindowFocus = useCallback((key) => {
    setWindowOrder((prev) => bringToFront(prev, key));
  }, []);
  return { windowOrder, handleWindowFocus };
}
export {
  useWindowOrder
};
//# sourceMappingURL=Desktop.hooks.js.map
