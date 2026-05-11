import { useState, useCallback, useMemo } from 'react';
import type {
  PaymentMethod,
  CardData,
  CardValidation,
  CardBrand,
} from './PaymentGateway.types';
import {
  detectCardBrand,
  validateCardNumber,
  validateExpiry,
  validateCVV,
  formatCardNumber,
  formatExpiry,
  maxCardLength,
} from './PaymentGateway.utils';

interface UsePaymentFormReturn {
  method: PaymentMethod;
  setMethod: (m: PaymentMethod) => void;
  card: CardData;
  brand: CardBrand;
  validation: CardValidation;
  step: number;
  setStep: (s: number) => void;
  isCardFormValid: boolean;
  handleCardNumberChange: (value: string) => void;
  handleCardNameChange: (value: string) => void;
  handleExpiryChange: (value: string) => void;
  handleCvvChange: (value: string) => void;
  validateAll: () => boolean;
  resetForm: () => void;
}

const EMPTY_CARD: CardData = {
  number: '',
  name: '',
  expiry: '',
  cvv: '',
};

const EMPTY_VALIDATION: CardValidation = {
  number: null,
  name: null,
  expiry: null,
  cvv: null,
};

/**
 * Manages card form state, validation, method selection, and stepped navigation.
 */
export function usePaymentForm(
  defaultMethod: PaymentMethod,
): UsePaymentFormReturn {
  const [method, setMethod] = useState<PaymentMethod>(defaultMethod);
  const [card, setCard] = useState<CardData>(EMPTY_CARD);
  const [validation, setValidation] = useState<CardValidation>(EMPTY_VALIDATION);
  const [step, setStep] = useState(0);

  const brand = useMemo(() => detectCardBrand(card.number), [card.number]);

  const handleCardNumberChange = useCallback(
    (value: string) => {
      const digits = value.replace(/\D/g, '');
      const currentBrand = detectCardBrand(digits);
      const max = maxCardLength(currentBrand);
      const trimmed = digits.slice(0, max);
      const formatted = formatCardNumber(trimmed);
      setCard((prev) => ({ ...prev, number: formatted }));
      setValidation((prev) => ({
        ...prev,
        number: trimmed.length >= 13 ? validateCardNumber(trimmed) : null,
      }));
    },
    [],
  );

  const handleCardNameChange = useCallback((value: string) => {
    setCard((prev) => ({ ...prev, name: value }));
    setValidation((prev) => ({
      ...prev,
      name: value.trim().length > 0 ? true : null,
    }));
  }, []);

  const handleExpiryChange = useCallback((value: string) => {
    const formatted = formatExpiry(value);
    setCard((prev) => ({ ...prev, expiry: formatted }));
    setValidation((prev) => ({
      ...prev,
      expiry: formatted.length === 5 ? validateExpiry(formatted) : null,
    }));
  }, []);

  const handleCvvChange = useCallback(
    (value: string) => {
      const digits = value.replace(/\D/g, '').slice(0, brand === 'amex' ? 4 : 3);
      setCard((prev) => ({ ...prev, cvv: digits }));
      const expectedLen = brand === 'amex' ? 4 : 3;
      setValidation((prev) => ({
        ...prev,
        cvv: digits.length === expectedLen ? validateCVV(digits, brand) : null,
      }));
    },
    [brand],
  );

  const validateAll = useCallback((): boolean => {
    const numValid = validateCardNumber(card.number);
    const nameValid = card.name.trim().length > 0;
    const expValid = validateExpiry(card.expiry);
    const cvvValid = validateCVV(card.cvv, brand);

    setValidation({
      number: numValid,
      name: nameValid,
      expiry: expValid,
      cvv: cvvValid,
    });

    return numValid && nameValid && expValid && cvvValid;
  }, [card, brand]);

  const isCardFormValid = useMemo(
    () =>
      validation.number === true &&
      validation.name === true &&
      validation.expiry === true &&
      validation.cvv === true,
    [validation],
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
    resetForm,
  };
}
