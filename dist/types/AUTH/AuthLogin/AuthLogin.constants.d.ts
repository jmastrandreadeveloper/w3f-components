import type { AuthView, AuthVariant, AuthColor, AuthFormState } from './AuthLogin.types';
export declare const AUTH_DEFAULTS: {
    readonly initialView: AuthView;
    readonly variant: AuthVariant;
    readonly color: AuthColor;
    readonly title: "Welcome back";
    readonly subtitle: "Sign in to your account";
    readonly showSocialLogin: true;
    readonly showRememberMe: true;
    readonly showForgotPassword: true;
    readonly showRegister: true;
    readonly loading: false;
    readonly error: string | null;
    readonly className: "";
};
export declare const AUTH_CLASSES: {
    readonly base: "w3f-auth";
    readonly header: "w3f-auth__header";
    readonly logo: "w3f-auth__logo";
    readonly title: "w3f-auth__title";
    readonly subtitle: "w3f-auth__subtitle";
    readonly form: "w3f-auth__form";
    readonly field: "w3f-auth__field";
    readonly fieldError: "w3f-auth__field-error";
    readonly fieldPasswordToggle: "w3f-auth__password-toggle";
    readonly submit: "w3f-auth__submit";
    readonly social: "w3f-auth__social";
    readonly socialBtn: "w3f-auth__social-btn";
    readonly divider: "w3f-auth__divider";
    readonly dividerText: "w3f-auth__divider-text";
    readonly footer: "w3f-auth__footer";
    readonly footerLink: "w3f-auth__footer-link";
    readonly error: "w3f-auth__error";
    readonly splitImage: "w3f-auth__split-image";
    readonly splitForm: "w3f-auth__split-form";
    readonly rememberRow: "w3f-auth__remember-row";
    readonly strengthBar: "w3f-auth__strength-bar";
    readonly strengthSegment: "w3f-auth__strength-segment";
    readonly strengthLabel: "w3f-auth__strength-label";
    readonly backLink: "w3f-auth__back-link";
    readonly variants: {
        readonly default: "";
        readonly card: "w3f-auth--card";
        readonly split: "w3f-auth--split";
        readonly minimal: "w3f-auth--minimal";
    };
    readonly colors: {
        readonly primary: "";
        readonly secondary: "w3f-auth--secondary";
        readonly info: "w3f-auth--info";
        readonly dark: "w3f-auth--dark";
    };
};
export declare const VALIDATION_RULES: {
    readonly email: RegExp;
    readonly passwordMinLength: 8;
    readonly nameMinLength: 2;
};
export declare const INITIAL_FORM_STATE: AuthFormState;
export declare const VIEW_TITLES: Record<AuthView, {
    title: string;
    subtitle: string;
}>;
//# sourceMappingURL=AuthLogin.constants.d.ts.map