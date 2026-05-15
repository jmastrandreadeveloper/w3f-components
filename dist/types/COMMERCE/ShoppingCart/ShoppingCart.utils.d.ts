import type { CartItem } from './ShoppingCart.types';
/**
 * Formats a numeric amount as a currency string.
 */
export declare function formatCurrency(amount: number, symbol: string, _currency: string): string;
/**
 * Calculates subtotal from an array of cart items.
 */
export declare function calculateSubtotal(items: CartItem[]): number;
/**
 * Builds the CSS class string for the cart root element.
 */
export declare function buildCartClasses(variant: string, color: string, className?: string): string;
/**
 * Counts total items (sum of quantities).
 */
export declare function countItems(items: CartItem[]): number;
//# sourceMappingURL=ShoppingCart.utils.d.ts.map