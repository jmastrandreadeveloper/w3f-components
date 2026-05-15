const CART_DEFAULTS = {
  currency: "USD",
  currencySymbol: "$",
  taxRate: 0,
  shippingCost: 0,
  freeShippingThreshold: 0,
  variant: "default",
  color: "primary",
  showImage: true,
  showQuantityControls: true,
  showRemoveButton: true,
  showSubtotal: true,
  showTax: true,
  showShipping: true,
  emptyMessage: "Your cart is empty"
};
const CART_CLASSES = {
  root: "w3f-cart",
  items: "w3f-cart__items",
  item: "w3f-cart__item",
  itemImage: "w3f-cart__item-image",
  itemInfo: "w3f-cart__item-info",
  itemName: "w3f-cart__item-name",
  itemDescription: "w3f-cart__item-description",
  itemPrice: "w3f-cart__item-price",
  itemQty: "w3f-cart__item-qty",
  itemQtyBtn: "w3f-cart__item-qty-btn",
  itemQtyValue: "w3f-cart__item-qty-value",
  itemRemove: "w3f-cart__item-remove",
  itemTotal: "w3f-cart__item-total",
  summary: "w3f-cart__summary",
  summaryRow: "w3f-cart__summary-row",
  summaryLabel: "w3f-cart__summary-label",
  summaryValue: "w3f-cart__summary-value",
  summaryTotal: "w3f-cart__summary-row--total",
  freeShipping: "w3f-cart__free-shipping",
  checkout: "w3f-cart__checkout",
  clear: "w3f-cart__clear",
  empty: "w3f-cart__empty",
  emptyIcon: "w3f-cart__empty-icon",
  emptyMessage: "w3f-cart__empty-message",
  header: "w3f-cart__header",
  itemRemoving: "w3f-cart__item--removing"
};
export {
  CART_CLASSES,
  CART_DEFAULTS
};
//# sourceMappingURL=ShoppingCart.constants.js.map
