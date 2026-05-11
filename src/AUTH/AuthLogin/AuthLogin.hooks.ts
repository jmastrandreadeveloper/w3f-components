import { useState, useCallback } from 'react';
import type { AuthView, AuthFormState, AuthFieldErrors } from './AuthLogin.types';
import { INITIAL_FORM_STATE } from './AuthLogin.constants';
import {
    validateLoginForm,
    validateRegisterForm,
    validateForgotForm,
    hasErrors,
} from './AuthLogin.utils';

/**
 * useAuthForm — manages form state, validation, view switching, field errors.
 * Pure UI hook; no auth SDK integration.
 */
export function useAuthForm(
    initialView: AuthView = 'login',
    onViewChange?: (view: AuthView) => void,
) {
    const [state, setState] = useState<AuthFormState>({
        ...INITIAL_FORM_STATE,
        view: initialView,
    });

    // ─── Field setters ──────────────────────────────────────────
    const setField = useCallback(
        <K extends keyof AuthFormState>(key: K, value: AuthFormState[K]) => {
            setState((prev) => ({
                ...prev,
                [key]: value,
                // Clear specific field error on change
                fieldErrors: { ...prev.fieldErrors, [key]: undefined },
            }));
        },
        [],
    );

    const setEmail = useCallback((v: string) => setField('email', v), [setField]);
    const setPassword = useCallback((v: string) => setField('password', v), [setField]);
    const setConfirmPassword = useCallback(
        (v: string) => setField('confirmPassword', v),
        [setField],
    );
    const setName = useCallback((v: string) => setField('name', v), [setField]);
    const setRememberMe = useCallback((v: boolean) => setField('rememberMe', v), [setField]);
    const setAcceptTerms = useCallback((v: boolean) => setField('acceptTerms', v), [setField]);

    const toggleShowPassword = useCallback(() => {
        setState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
    }, []);

    const toggleShowConfirmPassword = useCallback(() => {
        setState((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }));
    }, []);

    // ─── View switching ─────────────────────────────────────────
    const switchView = useCallback(
        (view: AuthView) => {
            setState((prev) => ({
                ...prev,
                view,
                fieldErrors: {},
                password: '',
                confirmPassword: '',
                showPassword: false,
                showConfirmPassword: false,
            }));
            onViewChange?.(view);
        },
        [onViewChange],
    );

    // ─── Validation per view ────────────────────────────────────
    const validateLogin = useCallback((): AuthFieldErrors => {
        const errors = validateLoginForm(state.email, state.password);
        setState((prev) => ({ ...prev, fieldErrors: errors }));
        return errors;
    }, [state.email, state.password]);

    const validateRegister = useCallback((): AuthFieldErrors => {
        const errors = validateRegisterForm(
            state.name,
            state.email,
            state.password,
            state.confirmPassword,
            state.acceptTerms,
        );
        setState((prev) => ({ ...prev, fieldErrors: errors }));
        return errors;
    }, [state.name, state.email, state.password, state.confirmPassword, state.acceptTerms]);

    const validateForgot = useCallback((): AuthFieldErrors => {
        const errors = validateForgotForm(state.email);
        setState((prev) => ({ ...prev, fieldErrors: errors }));
        return errors;
    }, [state.email]);

    // ─── Submit handlers (return true if valid) ─────────────────
    const tryLogin = useCallback((): boolean => {
        const errors = validateLoginForm(state.email, state.password);
        setState((prev) => ({ ...prev, fieldErrors: errors }));
        return !hasErrors(errors);
    }, [state.email, state.password]);

    const tryRegister = useCallback((): boolean => {
        const errors = validateRegisterForm(
            state.name,
            state.email,
            state.password,
            state.confirmPassword,
            state.acceptTerms,
        );
        setState((prev) => ({ ...prev, fieldErrors: errors }));
        return !hasErrors(errors);
    }, [state.name, state.email, state.password, state.confirmPassword, state.acceptTerms]);

    const tryForgot = useCallback((): boolean => {
        const errors = validateForgotForm(state.email);
        setState((prev) => ({ ...prev, fieldErrors: errors }));
        return !hasErrors(errors);
    }, [state.email]);

    return {
        state,
        setEmail,
        setPassword,
        setConfirmPassword,
        setName,
        setRememberMe,
        setAcceptTerms,
        toggleShowPassword,
        toggleShowConfirmPassword,
        switchView,
        validateLogin,
        validateRegister,
        validateForgot,
        tryLogin,
        tryRegister,
        tryForgot,
    };
}
