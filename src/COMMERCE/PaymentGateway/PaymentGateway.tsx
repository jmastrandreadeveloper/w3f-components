/**
 * @security PCI Compliance Note
 * This component is a UI-only payment form for development/demo purposes.
 * In production, card data should NEVER be handled directly by the frontend.
 * Use a PCI-compliant tokenization SDK (Stripe Elements, MercadoPago SDK,
 * Braintree, etc.) to collect and tokenize card details before they reach
 * your server. Direct card handling requires PCI DSS SAQ D certification.
 */
import React, { forwardRef, useCallback } from 'react';
import {
  CreditCard,
  Check,
  AlertCircle,
  Loader2,
  Landmark,
  Wallet,
} from 'lucide-react';
import type {
  PaymentGatewayProps,
  PaymentMethod,
  PaymentData,
} from './PaymentGateway.types';
import {
  PAYMENT_DEFAULTS,
  PAYMENT_CLASSES,
  METHOD_LABELS,
  BANK_DETAILS,
} from './PaymentGateway.constants';
import { usePaymentForm } from './PaymentGateway.hooks';
import { buildPaymentClasses, formatAmount } from './PaymentGateway.utils';
import Button from '../../INPUTS/Button/Button';

/* ------------------------------------------------------------------ */
/*  Method Icon helper                                                 */
/* ------------------------------------------------------------------ */

const MethodIcon: React.FC<{ method: PaymentMethod }> = ({ method }) => {
  switch (method) {
    case 'credit-card':
    case 'debit-card':
      return <CreditCard size={18} />;
    case 'paypal':
    case 'mercadopago':
      return <Wallet size={18} />;
    case 'bank-transfer':
      return <Landmark size={18} />;
  }
};

/* ------------------------------------------------------------------ */
/*  Card brand label                                                   */
/* ------------------------------------------------------------------ */

const BrandLabel: React.FC<{ brand: string }> = ({ brand }) => {
  const labels: Record<string, string> = {
    visa: 'VISA',
    mastercard: 'MC',
    amex: 'AMEX',
    unknown: '',
  };
  const label = labels[brand] || '';
  if (!label) return null;
  return <span className={PAYMENT_CLASSES.cardBrand}>{label}</span>;
};

/* ------------------------------------------------------------------ */
/*  Card Form                                                          */
/* ------------------------------------------------------------------ */

const CardForm: React.FC<{
  form: ReturnType<typeof usePaymentForm>;
  compact?: boolean;
}> = ({ form, compact }) => {
  const { card, brand, validation } = form;

  const fieldClass = (valid: boolean | null) =>
    [
      PAYMENT_CLASSES.fieldInput,
      valid === false ? `${PAYMENT_CLASSES.fieldInput}--invalid` : '',
      valid === true ? `${PAYMENT_CLASSES.fieldInput}--valid` : '',
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <div className={PAYMENT_CLASSES.form}>
      {/* Card Number */}
      <div className={PAYMENT_CLASSES.field}>
        <label className={PAYMENT_CLASSES.fieldLabel}>Card Number</label>
        <div className={PAYMENT_CLASSES.cardNumber}>
          <input
            type="text"
            className={fieldClass(validation.number)}
            value={card.number}
            onChange={(e) => form.handleCardNumberChange(e.target.value)}
            placeholder="1234 5678 9012 3456"
            inputMode="numeric"
            autoComplete="cc-number"
            maxLength={brand === 'amex' ? 17 : 19}
          />
          <BrandLabel brand={brand} />
        </div>
        {validation.number === false && (
          <span className={PAYMENT_CLASSES.fieldError}>Invalid card number</span>
        )}
      </div>

      {/* Cardholder Name */}
      <div className={PAYMENT_CLASSES.field}>
        <label className={PAYMENT_CLASSES.fieldLabel}>Cardholder Name</label>
        <input
          type="text"
          className={fieldClass(validation.name)}
          value={card.name}
          onChange={(e) => form.handleCardNameChange(e.target.value)}
          placeholder="John Doe"
          autoComplete="cc-name"
        />
        {validation.name === false && (
          <span className={PAYMENT_CLASSES.fieldError}>Name is required</span>
        )}
      </div>

      {/* Expiry + CVV */}
      <div className={PAYMENT_CLASSES.fieldRow}>
        <div className={PAYMENT_CLASSES.field}>
          <label className={PAYMENT_CLASSES.fieldLabel}>Expiry</label>
          <input
            type="text"
            className={fieldClass(validation.expiry)}
            value={card.expiry}
            onChange={(e) => form.handleExpiryChange(e.target.value)}
            placeholder="MM/YY"
            inputMode="numeric"
            autoComplete="cc-exp"
            maxLength={5}
          />
          {validation.expiry === false && (
            <span className={PAYMENT_CLASSES.fieldError}>Invalid date</span>
          )}
        </div>
        <div className={PAYMENT_CLASSES.field}>
          <label className={PAYMENT_CLASSES.fieldLabel}>CVV</label>
          <input
            type="password"
            className={fieldClass(validation.cvv)}
            value={card.cvv}
            onChange={(e) => form.handleCvvChange(e.target.value)}
            placeholder={brand === 'amex' ? '1234' : '123'}
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={brand === 'amex' ? 4 : 3}
          />
          {validation.cvv === false && (
            <span className={PAYMENT_CLASSES.fieldError}>Invalid CVV</span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Alt method panels                                                  */
/* ------------------------------------------------------------------ */

const AltMethodPanel: React.FC<{
  method: PaymentMethod;
  amount: number;
  currencySymbol: string;
  color: string;
  onPay: () => void;
  loading?: boolean;
}> = ({ method, amount, currencySymbol, color, onPay, loading }) => {
  if (method === 'bank-transfer') {
    return (
      <div className={PAYMENT_CLASSES.altMethod}>
        <div className={PAYMENT_CLASSES.altMethodInfo}>
          Transfer the amount to the following account:
        </div>
        <div className={PAYMENT_CLASSES.bankDetails}>
          <div><strong>Bank:</strong> {BANK_DETAILS.bank}</div>
          <div><strong>Account:</strong> {BANK_DETAILS.account}</div>
          <div><strong>Routing:</strong> {BANK_DETAILS.routing}</div>
          <div><strong>SWIFT:</strong> {BANK_DETAILS.swift}</div>
          <div><strong>Amount:</strong> {formatAmount(amount, currencySymbol)}</div>
        </div>
      </div>
    );
  }

  // MercadoPago / PayPal
  const label =
    method === 'mercadopago' ? 'Continue with MercadoPago' : 'Continue with PayPal';

  return (
    <div className={PAYMENT_CLASSES.altMethod}>
      <div className={PAYMENT_CLASSES.altMethodInfo}>
        You will be redirected to {METHOD_LABELS[method]} to complete the payment.
      </div>
      <Button
        variant="raised"
        color={color as 'primary' | 'secondary' | 'info'}
        fullWidth
        onClick={onPay}
        disabled={loading}
      >
        {loading ? 'Redirecting...' : label}
      </Button>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Step indicator (for stepped variant)                               */
/* ------------------------------------------------------------------ */

const STEP_LABELS = ['Method', 'Details', 'Confirm'];

const StepIndicator: React.FC<{ current: number }> = ({ current }) => (
  <div className={PAYMENT_CLASSES.stepIndicator}>
    {STEP_LABELS.map((label, i) => {
      const cls = [
        PAYMENT_CLASSES.step,
        i === current ? PAYMENT_CLASSES.stepActive : '',
        i < current ? PAYMENT_CLASSES.stepCompleted : '',
      ]
        .filter(Boolean)
        .join(' ');
      return (
        <div key={label} className={cls}>
          <span>{i + 1}</span>
          <span>{label}</span>
        </div>
      );
    })}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const PaymentGateway = forwardRef<HTMLDivElement, PaymentGatewayProps>(
  (
    {
      amount,
      currency = PAYMENT_DEFAULTS.currency,
      currencySymbol = PAYMENT_DEFAULTS.currencySymbol,
      methods = PAYMENT_DEFAULTS.methods,
      defaultMethod = PAYMENT_DEFAULTS.defaultMethod,
      variant = PAYMENT_DEFAULTS.variant,
      color = PAYMENT_DEFAULTS.color,
      showOrderSummary = PAYMENT_DEFAULTS.showOrderSummary,
      orderItems,
      onPayment,
      onMethodChange,
      loading = false,
      error = null,
      success = false,
      successMessage = PAYMENT_DEFAULTS.successMessage,
      className,
    },
    ref,
  ) => {
    const form = usePaymentForm(defaultMethod);
    const rootClass = buildPaymentClasses(variant, color, className);
    const isStepped = variant === 'stepped';
    const isCardMethod =
      form.method === 'credit-card' || form.method === 'debit-card';

    const handleMethodSelect = useCallback(
      (m: PaymentMethod) => {
        form.setMethod(m);
        onMethodChange?.(m);
        if (isStepped) form.setStep(1);
      },
      [form, onMethodChange, isStepped],
    );

    const handleSubmit = useCallback(() => {
      if (isCardMethod) {
        if (!form.validateAll()) return;
      }

      const data: PaymentData = {
        method: form.method,
        amount,
        currency,
      };

      if (isCardMethod) {
        data.card = {
          number: form.card.number.replace(/\s/g, ''),
          name: form.card.name,
          expiry: form.card.expiry,
          cvv: form.card.cvv,
        };
      }

      onPayment?.(data);
    }, [form, isCardMethod, amount, currency, onPayment]);

    /* ── Success state ──────────────────────────────────────────── */
    if (success) {
      return (
        <div ref={ref} className={rootClass} role="status">
          <div className={PAYMENT_CLASSES.success}>
            <div className={PAYMENT_CLASSES.successIcon}>
              <Check size={48} />
            </div>
            <span className={PAYMENT_CLASSES.successMessage}>
              {successMessage}
            </span>
          </div>
        </div>
      );
    }

    /* ── Stepped variant ────────────────────────────────────────── */
    if (isStepped) {
      return (
        <div ref={ref} className={rootClass}>
          <StepIndicator current={form.step} />

          <div className={PAYMENT_CLASSES.body}>
            {/* Step 0: Choose method */}
            {form.step === 0 && (
              <div className={PAYMENT_CLASSES.methods} role="tablist">
                {methods.map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="tab"
                    aria-selected={form.method === m}
                    className={[
                      PAYMENT_CLASSES.method,
                      form.method === m ? PAYMENT_CLASSES.methodActive : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handleMethodSelect(m)}
                  >
                    <span className={PAYMENT_CLASSES.methodIcon}>
                      <MethodIcon method={m} />
                    </span>
                    <span className={PAYMENT_CLASSES.methodLabel}>
                      {METHOD_LABELS[m]}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 1: Details */}
            {form.step === 1 && (
              <>
                {isCardMethod ? (
                  <CardForm form={form} />
                ) : (
                  <AltMethodPanel
                    method={form.method}
                    amount={amount}
                    currencySymbol={currencySymbol}
                    color={color}
                    onPay={handleSubmit}
                    loading={loading}
                  />
                )}
              </>
            )}

            {/* Step 2: Confirm */}
            {form.step === 2 && (
              <>
                {showOrderSummary && orderItems && (
                  <OrderSummary
                    items={orderItems}
                    amount={amount}
                    currencySymbol={currencySymbol}
                  />
                )}
                <div className={PAYMENT_CLASSES.submit}>
                  <Button
                    variant="raised"
                    color={color}
                    fullWidth
                    onClick={handleSubmit}
                    disabled={loading || (isCardMethod && !form.isCardFormValid)}
                  >
                    {loading ? (
                      <Loader2 size={18} className={PAYMENT_CLASSES.spinner} />
                    ) : (
                      `Pay ${formatAmount(amount, currencySymbol)}`
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className={PAYMENT_CLASSES.error} role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Step navigation */}
          {form.step > 0 && (
            <div className={PAYMENT_CLASSES.stepNav}>
              <Button
                variant="text"
                size="small"
                onClick={() => form.setStep(form.step - 1)}
              >
                Back
              </Button>
              {form.step < 2 && isCardMethod && (
                <Button
                  variant="outline"
                  size="small"
                  color={color}
                  onClick={() => {
                    if (form.step === 1 && isCardMethod && !form.validateAll()) return;
                    form.setStep(form.step + 1);
                  }}
                >
                  Next
                </Button>
              )}
            </div>
          )}
        </div>
      );
    }

    /* ── Default / compact / inline variants ────────────────────── */
    return (
      <div ref={ref} className={rootClass}>
        {/* Method selector */}
        <div className={PAYMENT_CLASSES.methods} role="tablist">
          {methods.map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={form.method === m}
              className={[
                PAYMENT_CLASSES.method,
                form.method === m ? PAYMENT_CLASSES.methodActive : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleMethodSelect(m)}
            >
              <span className={PAYMENT_CLASSES.methodIcon}>
                <MethodIcon method={m} />
              </span>
              <span className={PAYMENT_CLASSES.methodLabel}>
                {METHOD_LABELS[m]}
              </span>
            </button>
          ))}
        </div>

        <div className={PAYMENT_CLASSES.body}>
          {/* Card form or alt method */}
          {isCardMethod ? (
            <CardForm form={form} compact={variant === 'compact'} />
          ) : (
            <AltMethodPanel
              method={form.method}
              amount={amount}
              currencySymbol={currencySymbol}
              color={color}
              onPay={handleSubmit}
              loading={loading}
            />
          )}

          {/* Order summary */}
          {showOrderSummary && orderItems && (
            <OrderSummary
              items={orderItems}
              amount={amount}
              currencySymbol={currencySymbol}
            />
          )}
        </div>

        {/* Error */}
        {error && (
          <div className={PAYMENT_CLASSES.error} role="alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Submit (card methods only) */}
        {isCardMethod && (
          <div className={PAYMENT_CLASSES.submit}>
            <Button
              variant="raised"
              color={color}
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={18} className={PAYMENT_CLASSES.spinner} />
              ) : (
                `Pay ${formatAmount(amount, currencySymbol)}`
              )}
            </Button>
          </div>
        )}
      </div>
    );
  },
);

PaymentGateway.displayName = 'PaymentGateway';

/* ------------------------------------------------------------------ */
/*  Order Summary sub-component                                        */
/* ------------------------------------------------------------------ */

const OrderSummary: React.FC<{
  items: { name: string; quantity: number; price: number }[];
  amount: number;
  currencySymbol: string;
}> = ({ items, amount, currencySymbol }) => (
  <div className={PAYMENT_CLASSES.summary}>
    <div className={PAYMENT_CLASSES.summaryTitle}>Order Summary</div>
    {items.map((item, i) => (
      <div key={`${item.name}-${i}`} className={PAYMENT_CLASSES.summaryItem}>
        <span>
          {item.name} x{item.quantity}
        </span>
        <span>{formatAmount(item.price * item.quantity, currencySymbol)}</span>
      </div>
    ))}
    <div className={PAYMENT_CLASSES.summaryTotal}>
      <span>Total</span>
      <span>{formatAmount(amount, currencySymbol)}</span>
    </div>
  </div>
);

export { PaymentGateway };
export default PaymentGateway;
