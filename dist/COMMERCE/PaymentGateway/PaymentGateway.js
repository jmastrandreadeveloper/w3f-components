"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useCallback } from "react";
import {
  CreditCard,
  Check,
  AlertCircle,
  Loader2,
  Landmark,
  Wallet
} from "lucide-react";
import {
  PAYMENT_DEFAULTS,
  PAYMENT_CLASSES,
  METHOD_LABELS,
  BANK_DETAILS
} from "./PaymentGateway.constants";
import { usePaymentForm } from "./PaymentGateway.hooks";
import { buildPaymentClasses, formatAmount } from "./PaymentGateway.utils";
import Button from "../../INPUTS/Button/Button";
const MethodIcon = ({ method }) => {
  switch (method) {
    case "credit-card":
    case "debit-card":
      return /* @__PURE__ */ jsx(CreditCard, { size: 18 });
    case "paypal":
    case "mercadopago":
      return /* @__PURE__ */ jsx(Wallet, { size: 18 });
    case "bank-transfer":
      return /* @__PURE__ */ jsx(Landmark, { size: 18 });
  }
};
const BrandLabel = ({ brand }) => {
  const labels = {
    visa: "VISA",
    mastercard: "MC",
    amex: "AMEX",
    unknown: ""
  };
  const label = labels[brand] || "";
  if (!label) return null;
  return /* @__PURE__ */ jsx("span", { className: PAYMENT_CLASSES.cardBrand, children: label });
};
const CardForm = ({ form, compact }) => {
  const { card, brand, validation } = form;
  const fieldClass = (valid) => [
    PAYMENT_CLASSES.fieldInput,
    valid === false ? `${PAYMENT_CLASSES.fieldInput}--invalid` : "",
    valid === true ? `${PAYMENT_CLASSES.fieldInput}--valid` : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.form, children: [
    /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.field, children: [
      /* @__PURE__ */ jsx("label", { className: PAYMENT_CLASSES.fieldLabel, children: "Card Number" }),
      /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.cardNumber, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            className: fieldClass(validation.number),
            value: card.number,
            onChange: (e) => form.handleCardNumberChange(e.target.value),
            placeholder: "1234 5678 9012 3456",
            inputMode: "numeric",
            autoComplete: "cc-number",
            maxLength: brand === "amex" ? 17 : 19
          }
        ),
        /* @__PURE__ */ jsx(BrandLabel, { brand })
      ] }),
      validation.number === false && /* @__PURE__ */ jsx("span", { className: PAYMENT_CLASSES.fieldError, children: "Invalid card number" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.field, children: [
      /* @__PURE__ */ jsx("label", { className: PAYMENT_CLASSES.fieldLabel, children: "Cardholder Name" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: fieldClass(validation.name),
          value: card.name,
          onChange: (e) => form.handleCardNameChange(e.target.value),
          placeholder: "John Doe",
          autoComplete: "cc-name"
        }
      ),
      validation.name === false && /* @__PURE__ */ jsx("span", { className: PAYMENT_CLASSES.fieldError, children: "Name is required" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.fieldRow, children: [
      /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.field, children: [
        /* @__PURE__ */ jsx("label", { className: PAYMENT_CLASSES.fieldLabel, children: "Expiry" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            className: fieldClass(validation.expiry),
            value: card.expiry,
            onChange: (e) => form.handleExpiryChange(e.target.value),
            placeholder: "MM/YY",
            inputMode: "numeric",
            autoComplete: "cc-exp",
            maxLength: 5
          }
        ),
        validation.expiry === false && /* @__PURE__ */ jsx("span", { className: PAYMENT_CLASSES.fieldError, children: "Invalid date" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.field, children: [
        /* @__PURE__ */ jsx("label", { className: PAYMENT_CLASSES.fieldLabel, children: "CVV" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            className: fieldClass(validation.cvv),
            value: card.cvv,
            onChange: (e) => form.handleCvvChange(e.target.value),
            placeholder: brand === "amex" ? "1234" : "123",
            inputMode: "numeric",
            autoComplete: "cc-csc",
            maxLength: brand === "amex" ? 4 : 3
          }
        ),
        validation.cvv === false && /* @__PURE__ */ jsx("span", { className: PAYMENT_CLASSES.fieldError, children: "Invalid CVV" })
      ] })
    ] })
  ] });
};
const AltMethodPanel = ({ method, amount, currencySymbol, color, onPay, loading }) => {
  if (method === "bank-transfer") {
    return /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.altMethod, children: [
      /* @__PURE__ */ jsx("div", { className: PAYMENT_CLASSES.altMethodInfo, children: "Transfer the amount to the following account:" }),
      /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.bankDetails, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Bank:" }),
          " ",
          BANK_DETAILS.bank
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Account:" }),
          " ",
          BANK_DETAILS.account
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Routing:" }),
          " ",
          BANK_DETAILS.routing
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "SWIFT:" }),
          " ",
          BANK_DETAILS.swift
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Amount:" }),
          " ",
          formatAmount(amount, currencySymbol)
        ] })
      ] })
    ] });
  }
  const label = method === "mercadopago" ? "Continue with MercadoPago" : "Continue with PayPal";
  return /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.altMethod, children: [
    /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.altMethodInfo, children: [
      "You will be redirected to ",
      METHOD_LABELS[method],
      " to complete the payment."
    ] }),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "raised",
        color,
        fullWidth: true,
        onClick: onPay,
        disabled: loading,
        children: loading ? "Redirecting..." : label
      }
    )
  ] });
};
const STEP_LABELS = ["Method", "Details", "Confirm"];
const StepIndicator = ({ current }) => /* @__PURE__ */ jsx("div", { className: PAYMENT_CLASSES.stepIndicator, children: STEP_LABELS.map((label, i) => {
  const cls = [
    PAYMENT_CLASSES.step,
    i === current ? PAYMENT_CLASSES.stepActive : "",
    i < current ? PAYMENT_CLASSES.stepCompleted : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("div", { className: cls, children: [
    /* @__PURE__ */ jsx("span", { children: i + 1 }),
    /* @__PURE__ */ jsx("span", { children: label })
  ] }, label);
}) });
const PaymentGateway = forwardRef(
  ({
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
    className
  }, ref) => {
    const form = usePaymentForm(defaultMethod);
    const rootClass = buildPaymentClasses(variant, color, className);
    const isStepped = variant === "stepped";
    const isCardMethod = form.method === "credit-card" || form.method === "debit-card";
    const handleMethodSelect = useCallback(
      (m) => {
        form.setMethod(m);
        onMethodChange?.(m);
        if (isStepped) form.setStep(1);
      },
      [form, onMethodChange, isStepped]
    );
    const handleSubmit = useCallback(() => {
      if (isCardMethod) {
        if (!form.validateAll()) return;
      }
      const data = {
        method: form.method,
        amount,
        currency
      };
      if (isCardMethod) {
        data.card = {
          number: form.card.number.replace(/\s/g, ""),
          name: form.card.name,
          expiry: form.card.expiry,
          cvv: form.card.cvv
        };
      }
      onPayment?.(data);
    }, [form, isCardMethod, amount, currency, onPayment]);
    if (success) {
      return /* @__PURE__ */ jsx("div", { ref, className: rootClass, role: "status", children: /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.success, children: [
        /* @__PURE__ */ jsx("div", { className: PAYMENT_CLASSES.successIcon, children: /* @__PURE__ */ jsx(Check, { size: 48 }) }),
        /* @__PURE__ */ jsx("span", { className: PAYMENT_CLASSES.successMessage, children: successMessage })
      ] }) });
    }
    if (isStepped) {
      return /* @__PURE__ */ jsxs("div", { ref, className: rootClass, children: [
        /* @__PURE__ */ jsx(StepIndicator, { current: form.step }),
        /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.body, children: [
          form.step === 0 && /* @__PURE__ */ jsx("div", { className: PAYMENT_CLASSES.methods, role: "tablist", children: methods.map((m) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": form.method === m,
              className: [
                PAYMENT_CLASSES.method,
                form.method === m ? PAYMENT_CLASSES.methodActive : ""
              ].filter(Boolean).join(" "),
              onClick: () => handleMethodSelect(m),
              children: [
                /* @__PURE__ */ jsx("span", { className: PAYMENT_CLASSES.methodIcon, children: /* @__PURE__ */ jsx(MethodIcon, { method: m }) }),
                /* @__PURE__ */ jsx("span", { className: PAYMENT_CLASSES.methodLabel, children: METHOD_LABELS[m] })
              ]
            },
            m
          )) }),
          form.step === 1 && /* @__PURE__ */ jsx(Fragment, { children: isCardMethod ? /* @__PURE__ */ jsx(CardForm, { form }) : /* @__PURE__ */ jsx(
            AltMethodPanel,
            {
              method: form.method,
              amount,
              currencySymbol,
              color,
              onPay: handleSubmit,
              loading
            }
          ) }),
          form.step === 2 && /* @__PURE__ */ jsxs(Fragment, { children: [
            showOrderSummary && orderItems && /* @__PURE__ */ jsx(
              OrderSummary,
              {
                items: orderItems,
                amount,
                currencySymbol
              }
            ),
            /* @__PURE__ */ jsx("div", { className: PAYMENT_CLASSES.submit, children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: "raised",
                color,
                fullWidth: true,
                onClick: handleSubmit,
                disabled: loading || isCardMethod && !form.isCardFormValid,
                children: loading ? /* @__PURE__ */ jsx(Loader2, { size: 18, className: PAYMENT_CLASSES.spinner }) : `Pay ${formatAmount(amount, currencySymbol)}`
              }
            ) })
          ] })
        ] }),
        error && /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.error, role: "alert", children: [
          /* @__PURE__ */ jsx(AlertCircle, { size: 16 }),
          /* @__PURE__ */ jsx("span", { children: error })
        ] }),
        form.step > 0 && /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.stepNav, children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "text",
              size: "small",
              onClick: () => form.setStep(form.step - 1),
              children: "Back"
            }
          ),
          form.step < 2 && isCardMethod && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "small",
              color,
              onClick: () => {
                if (form.step === 1 && isCardMethod && !form.validateAll()) return;
                form.setStep(form.step + 1);
              },
              children: "Next"
            }
          )
        ] })
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { ref, className: rootClass, children: [
      /* @__PURE__ */ jsx("div", { className: PAYMENT_CLASSES.methods, role: "tablist", children: methods.map((m) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": form.method === m,
          className: [
            PAYMENT_CLASSES.method,
            form.method === m ? PAYMENT_CLASSES.methodActive : ""
          ].filter(Boolean).join(" "),
          onClick: () => handleMethodSelect(m),
          children: [
            /* @__PURE__ */ jsx("span", { className: PAYMENT_CLASSES.methodIcon, children: /* @__PURE__ */ jsx(MethodIcon, { method: m }) }),
            /* @__PURE__ */ jsx("span", { className: PAYMENT_CLASSES.methodLabel, children: METHOD_LABELS[m] })
          ]
        },
        m
      )) }),
      /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.body, children: [
        isCardMethod ? /* @__PURE__ */ jsx(CardForm, { form, compact: variant === "compact" }) : /* @__PURE__ */ jsx(
          AltMethodPanel,
          {
            method: form.method,
            amount,
            currencySymbol,
            color,
            onPay: handleSubmit,
            loading
          }
        ),
        showOrderSummary && orderItems && /* @__PURE__ */ jsx(
          OrderSummary,
          {
            items: orderItems,
            amount,
            currencySymbol
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.error, role: "alert", children: [
        /* @__PURE__ */ jsx(AlertCircle, { size: 16 }),
        /* @__PURE__ */ jsx("span", { children: error })
      ] }),
      isCardMethod && /* @__PURE__ */ jsx("div", { className: PAYMENT_CLASSES.submit, children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "raised",
          color,
          fullWidth: true,
          onClick: handleSubmit,
          disabled: loading,
          children: loading ? /* @__PURE__ */ jsx(Loader2, { size: 18, className: PAYMENT_CLASSES.spinner }) : `Pay ${formatAmount(amount, currencySymbol)}`
        }
      ) })
    ] });
  }
);
PaymentGateway.displayName = "PaymentGateway";
const OrderSummary = ({ items, amount, currencySymbol }) => /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.summary, children: [
  /* @__PURE__ */ jsx("div", { className: PAYMENT_CLASSES.summaryTitle, children: "Order Summary" }),
  items.map((item, i) => /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.summaryItem, children: [
    /* @__PURE__ */ jsxs("span", { children: [
      item.name,
      " x",
      item.quantity
    ] }),
    /* @__PURE__ */ jsx("span", { children: formatAmount(item.price * item.quantity, currencySymbol) })
  ] }, `${item.name}-${i}`)),
  /* @__PURE__ */ jsxs("div", { className: PAYMENT_CLASSES.summaryTotal, children: [
    /* @__PURE__ */ jsx("span", { children: "Total" }),
    /* @__PURE__ */ jsx("span", { children: formatAmount(amount, currencySymbol) })
  ] })
] });
var PaymentGateway_default = PaymentGateway;
export {
  PaymentGateway,
  PaymentGateway_default as default
};
//# sourceMappingURL=PaymentGateway.js.map
