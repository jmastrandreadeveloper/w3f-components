# ShoppingCart

Interactive shopping cart component with quantity controls, item removal, order summary with tax/shipping, and multiple layout variants. Supports free shipping thresholds and checkout callbacks.

## Import

```tsx
import ShoppingCart from 'components/COMMERCE/ShoppingCart/ShoppingCart';
```

## Usage

```tsx
const items = [
  { id: '1', name: 'Product A', price: 29.99, quantity: 2 },
  { id: '2', name: 'Product B', price: 49.99, quantity: 1 },
];

<ShoppingCart
  items={items}
  onQuantityChange={(id, qty) => updateQty(id, qty)}
  onRemoveItem={(id) => removeItem(id)}
  onCheckout={(summary) => console.log(summary)}
/>
```

### With tax and shipping

```tsx
<ShoppingCart
  items={items}
  taxRate={0.21}
  shippingCost={5.99}
  freeShippingThreshold={50}
  showTax
  showShipping
  currencySymbol="$"
/>
```

### Compact sidebar variant

```tsx
<ShoppingCart
  items={items}
  variant="sidebar"
  showImage={false}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `CartItem[]` | *required* | Array of cart items |
| `currency` | `string` | `'USD'` | Currency code |
| `currencySymbol` | `string` | `'$'` | Currency symbol |
| `taxRate` | `number` | `0` | Tax rate (e.g., 0.21 for 21%) |
| `shippingCost` | `number` | `0` | Shipping cost |
| `freeShippingThreshold` | `number` | `undefined` | Free shipping above this amount |
| `variant` | `'default' \| 'compact' \| 'sidebar' \| 'full'` | `'default'` | Layout variant |
| `color` | `'primary' \| 'secondary' \| 'info'` | `'primary'` | Accent color |
| `showImage` | `boolean` | `true` | Show item images |
| `showQuantityControls` | `boolean` | `true` | Show +/- quantity buttons |
| `showRemoveButton` | `boolean` | `true` | Show remove item button |
| `showSubtotal` | `boolean` | `true` | Show subtotal line |
| `showTax` | `boolean` | `false` | Show tax line |
| `showShipping` | `boolean` | `false` | Show shipping line |
| `emptyMessage` | `string` | `'Your cart is empty'` | Empty cart message |
| `emptyIcon` | `ReactNode` | `undefined` | Empty cart icon |
| `onQuantityChange` | `(itemId, quantity) => void` | `undefined` | Called on quantity change |
| `onRemoveItem` | `(itemId) => void` | `undefined` | Called on item removal |
| `onClearCart` | `() => void` | `undefined` | Called on clear cart |
| `onCheckout` | `(summary: CartSummary) => void` | `undefined` | Called on checkout |
| `className` | `string` | `undefined` | Additional class names |

## CSS Custom Properties

| Variable | Default | Description |
|----------|---------|-------------|
| `--w3f-cart-bg` | `var(--w3f-surface)` | Background color |
| `--w3f-cart-color` | `var(--w3f-on-surface)` | Text color |
| `--w3f-cart-border` | `var(--w3f-outline)` | Border color |
| `--w3f-cart-radius` | `var(--w3f-radius-lg)` | Border radius |
| `--w3f-cart-shadow` | `var(--w3f-shadow-sm)` | Box shadow |
| `--w3f-cart-padding` | `var(--w3f-space-4)` | Content padding |
| `--w3f-cart-gap` | `var(--w3f-space-3)` | Items gap |
| `--w3f-cart-item-bg` | `transparent` | Item background |
| `--w3f-cart-item-border` | `var(--w3f-outline-variant)` | Item border |
| `--w3f-cart-item-radius` | `var(--w3f-radius-md)` | Item border radius |
| `--w3f-cart-image-size` | `64px` | Item image size |
| `--w3f-cart-qty-btn-size` | `28px` | Quantity button size |
| `--w3f-cart-qty-btn-bg` | `var(--w3f-surface-variant)` | Qty button background |
| `--w3f-cart-qty-btn-hover-bg` | `var(--w3f-primary)` | Qty button hover bg |
| `--w3f-cart-remove-color` | `var(--w3f-error)` | Remove button color |
| `--w3f-cart-summary-bg` | `var(--w3f-surface-variant)` | Summary background |
| `--w3f-cart-free-shipping-color` | `var(--w3f-success)` | Free shipping text color |

## Types

```tsx
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
  maxQuantity?: number;
}

interface CartSummary {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
}
```

## Accessibility

- Keyboard accessible quantity controls (+/- buttons)
- ARIA labels on remove buttons
- Screen reader announces quantity changes
