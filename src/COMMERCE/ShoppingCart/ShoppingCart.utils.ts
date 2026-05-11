import type { CartItem } from './ShoppingCart.types';
import { CART_CLASSES } from './ShoppingCart.constants';

/**
 * Formats a numeric amount as a currency string.
 */
export function formatCurrency(
  amount: number,
  symbol: string,
  _currency: string,
): string {
  return `${symbol}${amount.toFixed(2)}`;
}

/**
 * Calculates subtotal from an array of cart items.
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Builds the CSS class string for the cart root element.
 */
export function buildCartClasses(
  variant: string,
  color: string,
  className?: string,
): string {
  const classes: string[] = [CART_CLASSES.root];

  if (variant !== 'default') {
    classes.push(`${CART_CLASSES.root}--${variant}`);
  }

  classes.push(`${CART_CLASSES.root}--${color}`);

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
}

/**
 * Counts total items (sum of quantities).
 */
export function countItems(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
