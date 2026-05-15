import type { AuthView, AuthFormState, AuthFieldErrors } from './AuthLogin.types';
/**
 * useAuthForm — manages form state, validation, view switching, field errors.
 * Pure UI hook; no auth SDK integration.
 */
export declare function useAuthForm(initialView?: AuthView, onViewChange?: (view: AuthView) => void): {
    state: AuthFormState;
    setEmail: (v: string) => void;
    setPassword: (v: string) => void;
    setConfirmPassword: (v: string) => void;
    setName: (v: string) => void;
    setRememberMe: (v: boolean) => void;
    setAcceptTerms: (v: boolean) => void;
    toggleShowPassword: () => void;
    toggleShowConfirmPassword: () => void;
    switchView: (view: AuthView) => void;
    validateLogin: () => AuthFieldErrors;
    validateRegister: () => AuthFieldErrors;
    validateForgot: () => AuthFieldErrors;
    tryLogin: () => boolean;
    tryRegister: () => boolean;
    tryForgot: () => boolean;
};
//# sourceMappingURL=AuthLogin.hooks.d.ts.map