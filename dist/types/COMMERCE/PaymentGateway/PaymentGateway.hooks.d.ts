import type { PaymentMethod, CardData, CardValidation, CardBrand } from './PaymentGateway.types';
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
/**
 * Manages card form state, validation, method selection, and stepped navigation.
 */
export declare function usePaymentForm(defaultMethod: PaymentMethod): UsePaymentFormReturn;
export {};
//# sourceMappingURL=PaymentGateway.hooks.d.ts.map