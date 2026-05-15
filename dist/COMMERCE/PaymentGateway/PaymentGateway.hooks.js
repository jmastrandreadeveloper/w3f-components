import { useState, useCallback, useMemo } from "react";
import {
  detectCardBrand,
  validateCardNumber,
  validateExpiry,
  validateCVV,
  formatCardNumber,
  formatExpiry,
  maxCardLength
} from "./PaymentGateway.utils";
const EMPTY_CARD = {
  number: "",
  name: "",
  expiry: "",
  cvv: ""
};
const EMPTY_VALIDATION = {
  number: null,
  name: null,
  expiry: null,
  cvv: null
};
function usePaymentForm(defaultMethod) {
  const [method, setMethod] = useState(defaultMethod);
  const [card, setCard] = useState(EMPTY_CARD);
  const [validation, setValidation] = useState(EMPTY_VALIDATION);
  const [step, setStep] = useState(0);
  const brand = useMemo(() => detectCardBrand(card.number), [card.number]);
  const handleCardNumberChange = useCallback(
    (value) => {
      const digits = value.replace(/\D/g, "");
      const currentBrand = detectCardBrand(digits);
      const max = maxCardLength(currentBrand);
      const trimmed = digits.slice(0, max);
      const formatted = formatCardNumber(trimmed);
      setCard((prev) => ({ ...prev, number: formatted }));
      setValidation((prev) => ({
        ...prev,
        number: trimmed.length >= 13 ? validateCardNumber(trimmed) : null
      }));
    },
    []
  );
  const handleCardNameChange = useCallback((value) => {
    setCard((prev) => ({ ...prev, name: value }));
    setValidation((prev) => ({
      ...prev,
      name: value.trim().length > 0 ? true : null
    }));
  }, []);
  const handleExpiryChange = useCallback((value) => {
    const formatted = formatExpiry(value);
    setCard((prev) => ({ ...prev, expiry: formatted }));
    setValidation((prev) => ({
      ...prev,
      expiry: formatted.length === 5 ? validateExpiry(formatted) : null
    }));
  }, []);
  const handleCvvChange = useCallback(
    (value) => {
      const digits = value.replace(/\D/g, "").slice(0, brand === "amex" ? 4 : 3);
      setCard((prev) => ({ ...prev, cvv: digits }));
      const expectedLen = brand === "amex" ? 4 : 3;
      setValidation((prev) => ({
        ...prev,
        cvv: digits.length === expectedLen ? validateCVV(digits, brand) : null
      }));
    },
    [brand]
  );
  const validateAll = useCallback(() => {
    const numValid = validateCardNumber(card.number);
    const nameValid = card.name.trim().length > 0;
    const expValid = validateExpiry(card.expiry);
    const cvvValid = validateCVV(card.cvv, brand);
    setValidation({
      number: numValid,
      name: nameValid,
      expiry: expValid,
      cvv: cvvValid
    });
    return numValid && nameValid && expValid && cvvValid;
  }, [card, brand]);
  const isCardFormValid = useMemo(
    () => validation.number === true && validation.name === true && validation.expiry === true && validation.cvv === true,
    [validation]
  );
  const resetForm = useCallback(() => {
    setCard(EMPTY_CARD);
    setValidation(EMPTY_VALIDATION);
    setStep(0);
  }, []);
  return {
    method,
    setMethod,
    card,
    brand,
    validation,
    step,
    setStep,
    isCardFormValid,
    handleCardNumberChange,
    handleCardNameChange,
    handleExpiryChange,
    handleCvvChange,
    validateAll,
    resetForm
  };
}
export {
  usePaymentForm
};
//# sourceMappingURL=PaymentGateway.hooks.js.map
