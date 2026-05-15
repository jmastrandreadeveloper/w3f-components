import { PAYMENT_CLASSES } from "./PaymentGateway.constants";
function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "");
  const brand = detectCardBrand(digits);
  if (brand === "amex") {
    const parts2 = [
      digits.slice(0, 4),
      digits.slice(4, 10),
      digits.slice(10, 15)
    ].filter(Boolean);
    return parts2.join(" ");
  }
  const parts = [];
  for (let i = 0; i < digits.length && i < 16; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }
  return parts.join(" ");
}
function formatExpiry(value) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}
function detectCardBrand(number) {
  const digits = number.replace(/\D/g, "");
  if (!digits) return "unknown";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "mastercard";
  if (/^4/.test(digits)) return "visa";
  return "unknown";
}
function validateCardNumber(number) {
  const digits = number.replace(/\D/g, "");
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
function validateExpiry(expiry) {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;
  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10) + 2e3;
  if (month < 1 || month > 12) return false;
  const now = /* @__PURE__ */ new Date();
  const expiryDate = new Date(year, month);
  return expiryDate > now;
}
function validateCVV(cvv, brand) {
  const digits = cvv.replace(/\D/g, "");
  const expectedLength = brand === "amex" ? 4 : 3;
  return digits.length === expectedLength;
}
function buildPaymentClasses(variant, color, className) {
  const classes = [PAYMENT_CLASSES.root];
  if (variant !== "default") {
    classes.push(`${PAYMENT_CLASSES.root}--${variant}`);
  }
  classes.push(`${PAYMENT_CLASSES.root}--${color}`);
  if (className) {
    classes.push(className);
  }
  return classes.join(" ");
}
function formatAmount(amount, symbol) {
  return `${symbol}${amount.toFixed(2)}`;
}
function maxCardLength(brand) {
  return brand === "amex" ? 15 : 16;
}
export {
  buildPaymentClasses,
  detectCardBrand,
  formatAmount,
  formatCardNumber,
  formatExpiry,
  maxCardLength,
  validateCVV,
  validateCardNumber,
  validateExpiry
};
//# sourceMappingURL=PaymentGateway.utils.js.map
