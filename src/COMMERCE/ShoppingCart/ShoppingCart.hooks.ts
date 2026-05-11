import { useMemo, useState, useCallback } from 'react';
import type { CartItem, CartSummary } from './ShoppingCart.types';
import { calculateSubtotal, countItems } from './ShoppingCart.utils';

/**
 * Computes cart totals: subtotal, tax, shipping, grand total, item count.
 */
export function useCartCalculations(
  items: CartItem[],
  taxRate: number,
  shippingCost: number,
  freeShippingThreshold: number,
): CartSummary {
  return useMemo(() => {
    const subtotal = calculateSubtotal(items);
    const tax = subtotal * taxRate;
    const qualifiesForFreeShipping =
      freeShippingThreshold > 0 && subtotal >= freeShippingThreshold;
    const shipping =
      items.length === 0 ? 0 : qualifiesForFreeShipping ? 0 : shippingCost;
    const total = subtotal + tax + shipping;
    const itemCount = countItems(items);

    return { items, subtotal, tax, shipping, total, itemCount };
  }, [items, taxRate, shippingCost, freeShippingThreshold]);
}

/**
 * Tracks which items are animating out (being removed).
 */
export function useItemRemoveAnimation() {
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  const startRemove = useCallback(
    (id: string, onComplete: () => void) => {
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
    [],
  );

  return { removingIds, startRemove };
}
