import type { PaymentMethod } from './PaymentGateway.types';

export const PAYMENT_DEFAULTS = {
  currency: 'USD' as const,
  currencySymbol: '$' as const,
  methods: [
    'credit-card',
    'debit-card',
    'mercadopago',
    'paypal',
    'bank-transfer',
  ] as PaymentMethod[],
  defaultMethod: 'credit-card' as PaymentMethod,
  variant: 'default' as const,
  color: 'primary' as const,
  showOrderSummary: true as const,
  successMessage: 'Payment successful!' as const,
} as const;

export const PAYMENT_CLASSES = {
  root: 'w3f-payment',
  methods: 'w3f-payment__methods',
  method: 'w3f-payment__method',
  methodActive: 'w3f-payment__method--active',
  methodIcon: 'w3f-payment__method-icon',
  methodLabel: 'w3f-payment__method-label',
  form: 'w3f-payment__form',
  field: 'w3f-payment__field',
  fieldLabel: 'w3f-payment__field-label',
  fieldInput: 'w3f-payment__field-input',
  fieldError: 'w3f-payment__field-error',
  fieldRow: 'w3f-payment__field-row',
  cardNumber: 'w3f-payment__card-number',
  cardBrand: 'w3f-payment__card-brand',
  summary: 'w3f-payment__summary',
  summaryTitle: 'w3f-payment__summary-title',
  summaryItem: 'w3f-payment__summary-item',
  summaryTotal: 'w3f-payment__summary-total',
  submit: 'w3f-payment__submit',
  success: 'w3f-payment__success',
  successIcon: 'w3f-payment__success-icon',
  successMessage: 'w3f-payment__success-message',
  error: 'w3f-payment__error',
  loading: 'w3f-payment__loading',
  spinner: 'w3f-payment__spinner',
  altMethod: 'w3f-payment__alt-method',
  altMethodInfo: 'w3f-payment__alt-method-info',
  bankDetails: 'w3f-payment__bank-details',
  stepIndicator: 'w3f-payment__step-indicator',
  step: 'w3f-payment__step',
  stepActive: 'w3f-payment__step--active',
  stepCompleted: 'w3f-payment__step--completed',
  stepNav: 'w3f-payment__step-nav',
  body: 'w3f-payment__body',
} as const;

export const METHOD_LABELS: Record<PaymentMethod, string> = {
  'credit-card': 'Credit Card',
  'debit-card': 'Debit Card',
  mercadopago: 'MercadoPago',
  paypal: 'PayPal',
  'bank-transfer': 'Bank Transfer',
} as const;

export const BANK_DETAILS = {
  bank: 'W3F International Bank',
  account: '0000-1234-5678-9012',
  routing: '021000021',
  swift: 'W3FBUS33',
} as const;
