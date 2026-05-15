import type { CardBrand } from './PaymentGateway.types';
/**
 * Formats a card number with spaces every 4 digits.
 * Amex uses 4-6-5 grouping.
 */
export declare function formatCardNumber(value: string): string;
/**
 * Formats expiry input as MM/YY.
 */
export declare function formatExpiry(value: string): string;
/**
 * Detects the card brand from the number prefix.
 */
export declare function detectCardBrand(number: string): CardBrand;
/**
 * Validates a card number using the Luhn algorithm.
 */
export declare function validateCardNumber(number: string): boolean;
/**
 * Validates that the expiry date is in the future.
 */
export declare function validateExpiry(expiry: string): boolean;
/**
 * Validates CVV length (3 for Visa/MC, 4 for Amex).
 */
export declare function validateCVV(cvv: string, brand: CardBrand): boolean;
/**
 * Builds the CSS class string for the payment root element.
 */
export declare function buildPaymentClasses(variant: string, color: string, className?: string): string;
/**
 * Formats a currency amount.
 */
export declare function formatAmount(amount: number, symbol: string): string;
/**
 * Returns max card number length (raw digits) for a brand.
 */
export declare function maxCardLength(brand: CardBrand): number;
//# sourceMappingURL=PaymentGateway.utils.d.ts.map