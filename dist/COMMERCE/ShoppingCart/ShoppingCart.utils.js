import { CART_CLASSES } from "./ShoppingCart.constants";
function formatCurrency(amount, symbol, _currency) {
  return `${symbol}${amount.toFixed(2)}`;
}
function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function buildCartClasses(variant, color, className) {
  const classes = [CART_CLASSES.root];
  if (variant !== "default") {
    classes.push(`${CART_CLASSES.root}--${variant}`);
  }
  classes.push(`${CART_CLASSES.root}--${color}`);
  if (className) {
    classes.push(className);
  }
  return classes.join(" ");
}
function countItems(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
export {
  buildCartClasses,
  calculateSubtotal,
  countItems,
  formatCurrency
};
//# sourceMappingURL=ShoppingCart.utils.js.map
