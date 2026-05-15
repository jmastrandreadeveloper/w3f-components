import { useMemo, useState, useCallback } from "react";
import { calculateSubtotal, countItems } from "./ShoppingCart.utils";
function useCartCalculations(items, taxRate, shippingCost, freeShippingThreshold) {
  return useMemo(() => {
    const subtotal = calculateSubtotal(items);
    const tax = subtotal * taxRate;
    const qualifiesForFreeShipping = freeShippingThreshold > 0 && subtotal >= freeShippingThreshold;
    const shipping = items.length === 0 ? 0 : qualifiesForFreeShipping ? 0 : shippingCost;
    const total = subtotal + tax + shipping;
    const itemCount = countItems(items);
    return { items, subtotal, tax, shipping, total, itemCount };
  }, [items, taxRate, shippingCost, freeShippingThreshold]);
}
function useItemRemoveAnimation() {
  const [removingIds, setRemovingIds] = useState(/* @__PURE__ */ new Set());
  const startRemove = useCallback(
    (id, onComplete) => {
      setRemovingIds((prev) => new Set(prev).add(id));
      setTimeout(() => {
        setRemovingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        onComplete();
      }, 300);
    },
    []
  );
  return { removingIds, startRemove };
}
export {
  useCartCalculations,
  useItemRemoveAnimation
};
//# sourceMappingURL=ShoppingCart.hooks.js.map
