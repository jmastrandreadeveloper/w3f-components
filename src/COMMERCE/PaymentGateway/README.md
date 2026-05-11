# PaymentGateway

Payment form component with credit/debit card inputs, multiple payment methods, real-time card brand detection, and order summary. Supports stepped flow, inline validation, and success state.

## Import

```tsx
import PaymentGateway from 'components/COMMERCE/PaymentGateway/PaymentGateway';
```

## Usage

```tsx
<PaymentGateway
  amount={99.99}
  onPayment={(data) => processPayment(data)}
/>
```

### With order summary

```tsx
<PaymentGateway
  amount={149.99}
  showOrderSummary
  orderItems={[
    { name: 'Widget Pro', quantity: 2, price: 49.99 },
    { name: 'Gadget X', quantity: 1, price: 50.01 },
  ]}
  onPayment={(data) => processPayment(data)}
/>
```

### All payment methods

```tsx
<PaymentGateway
  amount={99.99}
  methods={['credit-card', 'debit-card', 'paypal', 'mercadopago', 'bank-transfer']}
  defaultMethod="credit-card"
/>
```

### Stepped variant

```tsx
<PaymentGateway
  amount={250}
  variant="stepped"
  color="dark"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `amount` | `number` | *required* | Payment amount |
| `currency` | `string` | `'USD'` | Currency code |
| `currencySymbol` | `string` | `'$'` | Currency display symbol |
| `methods` | `PaymentMethod[]` | `['credit-card']` | Available payment methods |
| `defaultMethod` | `PaymentMethod` | `'credit-card'` | Default selected method |
| `variant` | `'default' \| 'compact' \| 'inline' \| 'stepped'` | `'default'` | Layout variant |
| `color` | `'primary' \| 'secondary' \| 'info' \| 'dark'` | `'primary'` | Accent color |
| `showOrderSummary` | `boolean` | `false` | Show order summary panel |
| `orderItems` | `OrderItem[]` | `[]` | Order items for summary |
| `onPayment` | `(data: PaymentData) => void` | `undefined` | Called on payment submit |
| `onMethodChange` | `(method: PaymentMethod) => void` | `undefined` | Called on method change |
| `loading` | `boolean` | `false` | Show loading state |
| `error` | `string \| null` | `null` | Error message |
| `success` | `boolean` | `false` | Show success state |
| `successMessage` | `string` | `'Payment successful!'` | Success message |
| `className` | `string` | `undefined` | Additional class names |

## CSS Custom Properties

| Variable | Default | Description |
|----------|---------|-------------|
| `--w3f-payment-bg` | `var(--w3f-surface)` | Background color |
| `--w3f-payment-color` | `var(--w3f-on-surface)` | Text color |
| `--w3f-payment-border` | `var(--w3f-outline)` | Border color |
| `--w3f-payment-radius` | `var(--w3f-radius-lg)` | Border radius |
| `--w3f-payment-shadow` | `var(--w3f-shadow-sm)` | Box shadow |
| `--w3f-payment-padding` | `var(--w3f-space-5)` | Content padding |
| `--w3f-payment-gap` | `var(--w3f-space-4)` | Form gap |
| `--w3f-payment-method-bg` | `transparent` | Method button bg |
| `--w3f-payment-method-active-bg` | `var(--w3f-primary)` | Active method bg |
| `--w3f-payment-method-active-color` | `var(--w3f-on-primary)` | Active method color |
| `--w3f-payment-input-bg` | `var(--w3f-surface)` | Input background |
| `--w3f-payment-input-border` | `var(--w3f-outline-variant)` | Input border |
| `--w3f-payment-input-focus-border` | `var(--w3f-primary)` | Input focus border |
| `--w3f-payment-input-valid-border` | `var(--w3f-success)` | Valid input border |
| `--w3f-payment-input-invalid-border` | `var(--w3f-error)` | Invalid input border |
| `--w3f-payment-error-color` | `var(--w3f-error)` | Error text color |
| `--w3f-payment-success-color` | `var(--w3f-success)` | Success text color |
| `--w3f-payment-summary-bg` | `var(--w3f-surface-variant)` | Summary background |

## Types

```tsx
type PaymentMethod = 'credit-card' | 'debit-card' | 'mercadopago' | 'paypal' | 'bank-transfer';
type CardBrand = 'visa' | 'mastercard' | 'amex' | 'unknown';

interface PaymentData {
  method: PaymentMethod;
  card?: CardData;
  amount: number;
  currency: string;
}

interface CardData {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}
```

## Accessibility

- Keyboard navigation between payment methods and form fields
- ARIA labels on card brand detection
- Form validation errors announced to screen readers
- Focus management in stepped variant
