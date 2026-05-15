"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useCallback } from "react";
import { ShoppingCart as ShoppingCartIcon, Trash2, Plus, Minus, PackageOpen } from "lucide-react";
import { CART_DEFAULTS, CART_CLASSES } from "./ShoppingCart.constants";
import { useCartCalculations, useItemRemoveAnimation } from "./ShoppingCart.hooks";
import { buildCartClasses, formatCurrency } from "./ShoppingCart.utils";
import Button from "../../INPUTS/Button/Button";
import { sanitizeUrl } from "../../utils/sanitizeUrl";
const CartItemRow = ({
  item,
  currencySymbol,
  currency,
  showImage,
  showQuantityControls,
  showRemoveButton,
  isRemoving,
  onQuantityChange,
  onRemove,
  startRemove
}) => {
  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange?.(item.id, item.quantity - 1);
    }
  };
  const handleIncrement = () => {
    const max = item.maxQuantity ?? 99;
    if (item.quantity < max) {
      onQuantityChange?.(item.id, item.quantity + 1);
    }
  };
  const handleRemove = () => {
    if (onRemove) {
      startRemove(item.id, () => onRemove(item.id));
    }
  };
  const rowClass = [
    CART_CLASSES.item,
    isRemoving ? CART_CLASSES.itemRemoving : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("div", { className: rowClass, role: "listitem", children: [
    showImage && item.image && /* @__PURE__ */ jsx("div", { className: CART_CLASSES.itemImage, children: /* @__PURE__ */ jsx("img", { src: sanitizeUrl(item.image), alt: item.name }) }),
    /* @__PURE__ */ jsxs("div", { className: CART_CLASSES.itemInfo, children: [
      /* @__PURE__ */ jsx("span", { className: CART_CLASSES.itemName, children: item.name }),
      item.description && /* @__PURE__ */ jsx("span", { className: CART_CLASSES.itemDescription, children: item.description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: CART_CLASSES.itemPrice, children: formatCurrency(item.price, currencySymbol, currency) }),
    showQuantityControls && /* @__PURE__ */ jsxs("div", { className: CART_CLASSES.itemQty, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: CART_CLASSES.itemQtyBtn,
          onClick: handleDecrement,
          disabled: item.quantity <= 1,
          "aria-label": "Decrease quantity",
          children: /* @__PURE__ */ jsx(Minus, { size: 14 })
        }
      ),
      /* @__PURE__ */ jsx("span", { className: CART_CLASSES.itemQtyValue, children: item.quantity }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: CART_CLASSES.itemQtyBtn,
          onClick: handleIncrement,
          disabled: item.quantity >= (item.maxQuantity ?? 99),
          "aria-label": "Increase quantity",
          children: /* @__PURE__ */ jsx(Plus, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: CART_CLASSES.itemTotal, children: formatCurrency(item.price * item.quantity, currencySymbol, currency) }),
    showRemoveButton && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: CART_CLASSES.itemRemove,
        onClick: handleRemove,
        "aria-label": `Remove ${item.name}`,
        children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
      }
    )
  ] });
};
const ShoppingCart = forwardRef(
  ({
    items,
    currency = CART_DEFAULTS.currency,
    currencySymbol = CART_DEFAULTS.currencySymbol,
    taxRate = CART_DEFAULTS.taxRate,
    shippingCost = CART_DEFAULTS.shippingCost,
    freeShippingThreshold = CART_DEFAULTS.freeShippingThreshold,
    variant = CART_DEFAULTS.variant,
    color = CART_DEFAULTS.color,
    showImage = CART_DEFAULTS.showImage,
    showQuantityControls = CART_DEFAULTS.showQuantityControls,
    showRemoveButton = CART_DEFAULTS.showRemoveButton,
    showSubtotal = CART_DEFAULTS.showSubtotal,
    showTax = CART_DEFAULTS.showTax,
    showShipping = CART_DEFAULTS.showShipping,
    emptyMessage = CART_DEFAULTS.emptyMessage,
    emptyIcon,
    onQuantityChange,
    onRemoveItem,
    onClearCart,
    onCheckout,
    className
  }, ref) => {
    const summary = useCartCalculations(
      items,
      taxRate,
      shippingCost,
      freeShippingThreshold
    );
    const { removingIds, startRemove } = useItemRemoveAnimation();
    const rootClass = buildCartClasses(variant, color, className);
    const handleCheckout = useCallback(() => {
      onCheckout?.(summary);
    }, [onCheckout, summary]);
    const isEmpty = items.length === 0;
    const qualifiesForFreeShipping = freeShippingThreshold > 0 && summary.subtotal >= freeShippingThreshold;
    return /* @__PURE__ */ jsxs("div", { ref, className: rootClass, role: "region", "aria-label": "Shopping cart", children: [
      /* @__PURE__ */ jsxs("div", { className: CART_CLASSES.header, children: [
        /* @__PURE__ */ jsx(ShoppingCartIcon, { size: 20 }),
        /* @__PURE__ */ jsxs("span", { children: [
          "Cart (",
          summary.itemCount,
          ")"
        ] }),
        !isEmpty && onClearCart && /* @__PURE__ */ jsx(
          Button,
          {
            variant: "text",
            color: "error",
            size: "small",
            onClick: onClearCart,
            className: CART_CLASSES.clear,
            children: "Clear all"
          }
        )
      ] }),
      isEmpty && /* @__PURE__ */ jsxs("div", { className: CART_CLASSES.empty, children: [
        /* @__PURE__ */ jsx("div", { className: CART_CLASSES.emptyIcon, children: emptyIcon ?? /* @__PURE__ */ jsx(PackageOpen, { size: 48 }) }),
        /* @__PURE__ */ jsx("span", { className: CART_CLASSES.emptyMessage, children: emptyMessage })
      ] }),
      !isEmpty && /* @__PURE__ */ jsx("div", { className: CART_CLASSES.items, role: "list", children: items.map((item) => /* @__PURE__ */ jsx(
        CartItemRow,
        {
          item,
          currencySymbol,
          currency,
          showImage,
          showQuantityControls,
          showRemoveButton,
          isRemoving: removingIds.has(item.id),
          onQuantityChange,
          onRemove: onRemoveItem,
          startRemove
        },
        item.id
      )) }),
      !isEmpty && /* @__PURE__ */ jsxs("div", { className: CART_CLASSES.summary, children: [
        showSubtotal && /* @__PURE__ */ jsxs("div", { className: CART_CLASSES.summaryRow, children: [
          /* @__PURE__ */ jsx("span", { className: CART_CLASSES.summaryLabel, children: "Subtotal" }),
          /* @__PURE__ */ jsx("span", { className: CART_CLASSES.summaryValue, children: formatCurrency(summary.subtotal, currencySymbol, currency) })
        ] }),
        showTax && taxRate > 0 && /* @__PURE__ */ jsxs("div", { className: CART_CLASSES.summaryRow, children: [
          /* @__PURE__ */ jsxs("span", { className: CART_CLASSES.summaryLabel, children: [
            "Tax (",
            (taxRate * 100).toFixed(0),
            "%)"
          ] }),
          /* @__PURE__ */ jsx("span", { className: CART_CLASSES.summaryValue, children: formatCurrency(summary.tax, currencySymbol, currency) })
        ] }),
        showShipping && /* @__PURE__ */ jsxs("div", { className: CART_CLASSES.summaryRow, children: [
          /* @__PURE__ */ jsx("span", { className: CART_CLASSES.summaryLabel, children: "Shipping" }),
          /* @__PURE__ */ jsx("span", { className: CART_CLASSES.summaryValue, children: summary.shipping === 0 ? "Free" : formatCurrency(summary.shipping, currencySymbol, currency) })
        ] }),
        qualifiesForFreeShipping && /* @__PURE__ */ jsx("div", { className: CART_CLASSES.freeShipping, children: "Free shipping applied!" }),
        /* @__PURE__ */ jsxs("div", { className: `${CART_CLASSES.summaryRow} ${CART_CLASSES.summaryTotal}`, children: [
          /* @__PURE__ */ jsx("span", { className: CART_CLASSES.summaryLabel, children: "Total" }),
          /* @__PURE__ */ jsx("span", { className: CART_CLASSES.summaryValue, children: formatCurrency(summary.total, currencySymbol, currency) })
        ] })
      ] }),
      !isEmpty && onCheckout && /* @__PURE__ */ jsx("div", { className: CART_CLASSES.checkout, children: /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "raised",
          color,
          fullWidth: true,
          onClick: handleCheckout,
          children: [
            "Checkout (",
            formatCurrency(summary.total, currencySymbol, currency),
            ")"
          ]
        }
      ) })
    ] });
  }
);
ShoppingCart.displayName = "ShoppingCart";
var ShoppingCart_default = ShoppingCart;
export {
  ShoppingCart,
  ShoppingCart_default as default
};
//# sourceMappingURL=ShoppingCart.js.map
