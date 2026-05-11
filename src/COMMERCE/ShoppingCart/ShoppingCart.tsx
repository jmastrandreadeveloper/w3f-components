import React, { forwardRef, useCallback } from 'react';
import { ShoppingCart as ShoppingCartIcon, Trash2, Plus, Minus, PackageOpen } from 'lucide-react';
import type { ShoppingCartProps, CartItem } from './ShoppingCart.types';
import { CART_DEFAULTS, CART_CLASSES } from './ShoppingCart.constants';
import { useCartCalculations, useItemRemoveAnimation } from './ShoppingCart.hooks';
import { buildCartClasses, formatCurrency } from './ShoppingCart.utils';
import Button from '../../INPUTS/Button/Button';
import { sanitizeUrl } from '../../utils/sanitizeUrl';

/* ------------------------------------------------------------------ */

const CartItemRow: React.FC<{
  item: CartItem;
  currencySymbol: string;
  currency: string;
  showImage: boolean;
  showQuantityControls: boolean;
  showRemoveButton: boolean;
  isRemoving: boolean;
  onQuantityChange?: (id: string, qty: number) => void;
  onRemove?: (id: string) => void;
  startRemove: (id: string, cb: () => void) => void;
}> = ({
  item,
  currencySymbol,
  currency,
  showImage,
  showQuantityControls,
  showRemoveButton,
  isRemoving,
  onQuantityChange,
  onRemove,
  startRemove,
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
    isRemoving ? CART_CLASSES.itemRemoving : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rowClass} role="listitem">
      {showImage && item.image && (
        <div className={CART_CLASSES.itemImage}>
          <img src={sanitizeUrl(item.image)} alt={item.name} />
        </div>
      )}

      <div className={CART_CLASSES.itemInfo}>
        <span className={CART_CLASSES.itemName}>{item.name}</span>
        {item.description && (
          <span className={CART_CLASSES.itemDescription}>
            {item.description}
          </span>
        )}
      </div>

      <div className={CART_CLASSES.itemPrice}>
        {formatCurrency(item.price, currencySymbol, currency)}
      </div>

      {showQuantityControls && (
        <div className={CART_CLASSES.itemQty}>
          <button
            type="button"
            className={CART_CLASSES.itemQtyBtn}
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className={CART_CLASSES.itemQtyValue}>{item.quantity}</span>
          <button
            type="button"
            className={CART_CLASSES.itemQtyBtn}
            onClick={handleIncrement}
            disabled={item.quantity >= (item.maxQuantity ?? 99)}
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>
      )}

      <div className={CART_CLASSES.itemTotal}>
        {formatCurrency(item.price * item.quantity, currencySymbol, currency)}
      </div>

      {showRemoveButton && (
        <button
          type="button"
          className={CART_CLASSES.itemRemove}
          onClick={handleRemove}
          aria-label={`Remove ${item.name}`}
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */

const ShoppingCart = forwardRef<HTMLDivElement, ShoppingCartProps>(
  (
    {
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
      className,
    },
    ref,
  ) => {
    const summary = useCartCalculations(
      items,
      taxRate,
      shippingCost,
      freeShippingThreshold,
    );

    const { removingIds, startRemove } = useItemRemoveAnimation();

    const rootClass = buildCartClasses(variant, color, className);

    const handleCheckout = useCallback(() => {
      onCheckout?.(summary);
    }, [onCheckout, summary]);

    const isEmpty = items.length === 0;

    const qualifiesForFreeShipping =
      freeShippingThreshold > 0 && summary.subtotal >= freeShippingThreshold;

    return (
      <div ref={ref} className={rootClass} role="region" aria-label="Shopping cart">
        {/* Header */}
        <div className={CART_CLASSES.header}>
          <ShoppingCartIcon size={20} />
          <span>Cart ({summary.itemCount})</span>
          {!isEmpty && onClearCart && (
            <Button
              variant="text"
              color="error"
              size="small"
              onClick={onClearCart}
              className={CART_CLASSES.clear}
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Empty state */}
        {isEmpty && (
          <div className={CART_CLASSES.empty}>
            <div className={CART_CLASSES.emptyIcon}>
              {emptyIcon ?? <PackageOpen size={48} />}
            </div>
            <span className={CART_CLASSES.emptyMessage}>{emptyMessage}</span>
          </div>
        )}

        {/* Items list */}
        {!isEmpty && (
          <div className={CART_CLASSES.items} role="list">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                currencySymbol={currencySymbol}
                currency={currency}
                showImage={showImage}
                showQuantityControls={showQuantityControls}
                showRemoveButton={showRemoveButton}
                isRemoving={removingIds.has(item.id)}
                onQuantityChange={onQuantityChange}
                onRemove={onRemoveItem}
                startRemove={startRemove}
              />
            ))}
          </div>
        )}

        {/* Summary */}
        {!isEmpty && (
          <div className={CART_CLASSES.summary}>
            {showSubtotal && (
              <div className={CART_CLASSES.summaryRow}>
                <span className={CART_CLASSES.summaryLabel}>Subtotal</span>
                <span className={CART_CLASSES.summaryValue}>
                  {formatCurrency(summary.subtotal, currencySymbol, currency)}
                </span>
              </div>
            )}

            {showTax && taxRate > 0 && (
              <div className={CART_CLASSES.summaryRow}>
                <span className={CART_CLASSES.summaryLabel}>
                  Tax ({(taxRate * 100).toFixed(0)}%)
                </span>
                <span className={CART_CLASSES.summaryValue}>
                  {formatCurrency(summary.tax, currencySymbol, currency)}
                </span>
              </div>
            )}

            {showShipping && (
              <div className={CART_CLASSES.summaryRow}>
                <span className={CART_CLASSES.summaryLabel}>Shipping</span>
                <span className={CART_CLASSES.summaryValue}>
                  {summary.shipping === 0
                    ? 'Free'
                    : formatCurrency(summary.shipping, currencySymbol, currency)}
                </span>
              </div>
            )}

            {qualifiesForFreeShipping && (
              <div className={CART_CLASSES.freeShipping}>
                Free shipping applied!
              </div>
            )}

            <div className={`${CART_CLASSES.summaryRow} ${CART_CLASSES.summaryTotal}`}>
              <span className={CART_CLASSES.summaryLabel}>Total</span>
              <span className={CART_CLASSES.summaryValue}>
                {formatCurrency(summary.total, currencySymbol, currency)}
              </span>
            </div>
          </div>
        )}

        {/* Checkout */}
        {!isEmpty && onCheckout && (
          <div className={CART_CLASSES.checkout}>
            <Button
              variant="raised"
              color={color}
              fullWidth
              onClick={handleCheckout}
            >
              Checkout ({formatCurrency(summary.total, currencySymbol, currency)})
            </Button>
          </div>
        )}
      </div>
    );
  },
);

ShoppingCart.displayName = 'ShoppingCart';

export { ShoppingCart };
export default ShoppingCart;
