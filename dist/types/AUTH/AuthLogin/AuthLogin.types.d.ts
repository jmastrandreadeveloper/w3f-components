import type React from 'react';
export type AuthView = 'login' | 'register' | 'forgot-password' | 'reset-password';
export type AuthVariant = 'default' | 'card' | 'split' | 'minimal';
export type AuthColor = 'primary' | 'secondary' | 'info' | 'dark';
export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}
export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export interface SocialProvider {
    id: string;
    name: string;
    icon: React.ReactNode;
    color?: string;
}
export interface AuthFieldErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
}
export interface AuthFormState {
    view: AuthView;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    rememberMe: boolean;
    acceptTerms: boolean;
    showPassword: boolean;
    showConfirmPassword: boolean;
    fieldErrors: AuthFieldErrors;
}
export interface AuthLoginProps {
    initialView?: AuthView;
    variant?: AuthVariant;
    color?: AuthColor;
    logo?: React.ReactNode;
    title?: string;
    subtitle?: string;
    showSocialLogin?: boolean;
    socialProviders?: SocialProvider[];
    showRememberMe?: boolean;
    showForgotPassword?: boolean;
    showRegister?: boolean;
    onLogin?: (credentials: LoginCredentials) => void | Promise<void>;
    onRegister?: (data: RegisterData) => void | Promise<void>;
    onForgotPassword?: (email: string) => void | Promise<void>;
    onSocialLogin?: (provider: string) => void | Promise<void>;
    onViewChange?: (view: AuthView) => void;
    loading?: boolean;
    error?: string | null;
    className?: string;
}
//# sourceMappingURL=AuthLogin.types.d.ts.map