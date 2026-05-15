import type { CartItem, CartSummary } from './ShoppingCart.types';
/**
 * Computes cart totals: subtotal, tax, shipping, grand total, item count.
 */
export declare function useCartCalculations(items: CartItem[], taxRate: number, shippingCost: number, freeShippingThreshold: number): CartSummary;
/**
 * Tracks which items are animating out (being removed).
 */
export declare function useItemRemoveAnimation(): {
    removingIds: Set<string>;
    startRemove: (id: string, onComplete: () => void) => void;
};
//# sourceMappingURL=ShoppingCart.hooks.d.ts.map