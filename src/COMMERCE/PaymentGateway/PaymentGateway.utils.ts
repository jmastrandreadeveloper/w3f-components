import type { CardBrand } from './PaymentGateway.types';
import { PAYMENT_CLASSES } from './PaymentGateway.constants';

/**
 * Formats a card number with spaces every 4 digits.
 * Amex uses 4-6-5 grouping.
 */
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  const brand = detectCardBrand(digits);

  if (brand === 'amex') {
    // 4-6-5 grouping
    const parts = [
      digits.slice(0, 4),
      digits.slice(4, 10),
      digits.slice(10, 15),
    ].filter(Boolean);
    return parts.join(' ');
  }

  // Standard 4-4-4-4 grouping
  const parts: string[] = [];
  for (let i = 0; i < digits.length && i < 16; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }
  return parts.join(' ');
}

/**
 * Formats expiry input as MM/YY.
 */
export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 0) return '';
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}

/**
 * Detects the card brand from the number prefix.
 */
export function detectCardBrand(number: string): CardBrand {
  const digits = number.replace(/\D/g, '');
  if (!digits) return 'unknown';

  // Amex: starts with 34 or 37
  if (/^3[47]/.test(digits)) return 'amex';
  // Mastercard: starts with 51-55 or 2221-2720
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'mastercard';
  // Visa: starts with 4
  if (/^4/.test(digits)) return 'visa';

  return 'unknown';
}

/**
 * Validates a card number using the Luhn algorithm.
 */
export function validateCardNumber(number: string): boolean {
  const digits = number.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let alternate = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }

  return sum % 10 === 0;
}

/**
 * Validates that the expiry date is in the future.
 */
export function validateExpiry(expiry: string): boolean {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;

  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10) + 2000;

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const expiryDate = new Date(year, month); // First day of next month
  return expiryDate > now;
}

/**
 * Validates CVV length (3 for Visa/MC, 4 for Amex).
 */
export function validateCVV(cvv: string, brand: CardBrand): boolean {
  const digits = cvv.replace(/\D/g, '');
  const expectedLength = brand === 'amex' ? 4 : 3;
  return digits.length === expectedLength;
}

/**
 * Builds the CSS class string for the payment root element.
 */
export function buildPaymentClasses(
  variant: string,
  color: string,
  className?: string,
): string {
  const classes: string[] = [PAYMENT_CLASSES.root];

  if (variant !== 'default') {
    classes.push(`${PAYMENT_CLASSES.root}--${variant}`);
  }

  classes.push(`${PAYMENT_CLASSES.root}--${color}`);

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
}

/**
 * Formats a currency amount.
 */
export function formatAmount(
  amount: number,
  symbol: string,
): string {
  return `${symbol}${amount.toFixed(2)}`;
}

/**
 * Returns max card number length (raw digits) for a brand.
 */
export function maxCardLength(brand: CardBrand): number {
  return brand === 'amex' ? 15 : 16;
}
