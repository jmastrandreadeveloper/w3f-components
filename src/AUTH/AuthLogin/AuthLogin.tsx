import React, { forwardRef, useCallback } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Loader2, Chrome, Github, Facebook } from 'lucide-react';
import Input from '../../INPUTS/Input/Input';
import Button from '../../INPUTS/Button/Button';
import Checkbox from '../../INPUTS/Checkbox/Checkbox';
import type { AuthLoginProps, SocialProvider } from './AuthLogin.types';
import { AUTH_DEFAULTS, AUTH_CLASSES, VIEW_TITLES } from './AuthLogin.constants';
import { buildAuthClasses, validatePassword } from './AuthLogin.utils';
import { useAuthForm } from './AuthLogin.hooks';

// ─── Default social providers (Lucide icons, no dangerouslySetInnerHTML) ─────
const DEFAULT_SOCIAL_PROVIDERS: SocialProvider[] = [
    { id: 'google', name: 'Google', icon: <Chrome size={18} />, color: '#DB4437' },
    { id: 'facebook', name: 'Facebook', icon: <Facebook size={18} />, color: '#4267B2' },
    { id: 'github', name: 'GitHub', icon: <Github size={18} />, color: '#333333' },
];

// ─── Password strength bar ──────────────────────────────────────────
function PasswordStrengthBar({ password }: { password: string }) {
    if (!password) return null;
    const { strength, score } = validatePassword(password);
    const colors = ['#ef4444', '#f59e0b', '#22c55e', '#16a34a'];
    return (
        <div className={AUTH_CLASSES.strengthBar}>
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className={AUTH_CLASSES.strengthSegment}
                    style={{ backgroundColor: i <= score ? colors[score - 1] : undefined }}
                />
            ))}
            <span className={AUTH_CLASSES.strengthLabel}>{strength}</span>
        </div>
    );
}

/**
 * AuthLogin Component - W3F Framework
 *
 * Provider-agnostic authentication UI with login, register, and forgot password flows.
 * Wire the callback props to your auth provider (Auth0, Firebase, custom API, etc.).
 *
 * @example
 * <AuthLogin
 *   variant="card"
 *   color="primary"
 *   onLogin={({ email, password }) => auth.signIn(email, password)}
 *   onSocialLogin={(provider) => auth.socialSignIn(provider)}
 * />
 *
 * @example
 * <AuthLogin variant="split" showRegister onRegister={handleRegister} />
 */
const AuthLogin = forwardRef<HTMLDivElement, AuthLoginProps>(
    (
        {
            initialView = AUTH_DEFAULTS.initialView,
            variant = AUTH_DEFAULTS.variant,
            color = AUTH_DEFAULTS.color,
            logo,
            title,
            subtitle,
            showSocialLogin = AUTH_DEFAULTS.showSocialLogin,
            socialProviders,
            showRememberMe = AUTH_DEFAULTS.showRememberMe,
            showForgotPassword = AUTH_DEFAULTS.showForgotPassword,
            showRegister = AUTH_DEFAULTS.showRegister,
            onLogin,
            onRegister,
            onForgotPassword,
            onSocialLogin,
            onViewChange,
            loading = AUTH_DEFAULTS.loading,
            error = AUTH_DEFAULTS.error,
            className = AUTH_DEFAULTS.className,
        },
        ref,
    ) => {
        const {
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
            tryLogin,
            tryRegister,
            tryForgot,
        } = useAuthForm(initialView, onViewChange);

        const providers = socialProviders ?? DEFAULT_SOCIAL_PROVIDERS;
        const viewTitles = VIEW_TITLES[state.view];
        const displayTitle = title ?? viewTitles.title;
        const displaySubtitle = subtitle ?? viewTitles.subtitle;

        const rootClasses = buildAuthClasses(variant, color, className);

        // ─── Submit handlers ────────────────────────────────────
        const handleLoginSubmit = useCallback(
            (e: React.FormEvent) => {
                e.preventDefault();
                if (loading) return;
                if (tryLogin()) {
                    onLogin?.({
                        email: state.email,
                        password: state.password,
                        rememberMe: state.rememberMe,
                    });
                }
            },
            [loading, tryLogin, onLogin, state.email, state.password, state.rememberMe],
        );

        const handleRegisterSubmit = useCallback(
            (e: React.FormEvent) => {
                e.preventDefault();
                if (loading) return;
                if (tryRegister()) {
                    onRegister?.({
                        name: state.name,
                        email: state.email,
                        password: state.password,
                        confirmPassword: state.confirmPassword,
                    });
                }
            },
            [loading, tryRegister, onRegister, state.name, state.email, state.password, state.confirmPassword],
        );

        const handleForgotSubmit = useCallback(
            (e: React.FormEvent) => {
                e.preventDefault();
                if (loading) return;
                if (tryForgot()) {
                    onForgotPassword?.(state.email);
                }
            },
            [loading, tryForgot, onForgotPassword, state.email],
        );

        // ─── Render: Header ─────────────────────────────────────
        const renderHeader = () => (
            <div className={AUTH_CLASSES.header}>
                {logo && <div className={AUTH_CLASSES.logo}>{logo}</div>}
                <h2 className={AUTH_CLASSES.title}>{displayTitle}</h2>
                <p className={AUTH_CLASSES.subtitle}>{displaySubtitle}</p>
            </div>
        );

        // ─── Render: Error banner ───────────────────────────────
        const renderError = () =>
            error ? <div className={AUTH_CLASSES.error}>{error}</div> : null;

        // ─── Render: Social login ───────────────────────────────
        const renderSocial = () => {
            if (!showSocialLogin || providers.length === 0) return null;
            return (
                <>
                    <div className={AUTH_CLASSES.divider}>
                        <span className={AUTH_CLASSES.dividerText}>or</span>
                    </div>
                    <div className={AUTH_CLASSES.social}>
                        {providers.map((p) => (
                            <button
                                key={p.id}
                                type="button"
                                className={AUTH_CLASSES.socialBtn}
                                style={p.color ? { '--w3f-auth-social-accent': p.color } as React.CSSProperties : undefined}
                                onClick={() => onSocialLogin?.(p.id)}
                                disabled={loading}
                            >
                                {p.icon}
                                <span>{p.name}</span>
                            </button>
                        ))}
                    </div>
                </>
            );
        };

        // ─── Render: Login form ─────────────────────────────────
        const renderLoginForm = () => (
            <form className={AUTH_CLASSES.form} onSubmit={handleLoginSubmit} noValidate>
                <div className={AUTH_CLASSES.field}>
                    <Input
                        label="Email"
                        type="email"
                        value={state.email}
                        onChange={(e) => setEmail(e.target.value)}
                        leadingIcon={<Mail size={18} />}
                        error={state.fieldErrors.email}
                        autoComplete="email"
                        required
                    />
                </div>
                <div className={AUTH_CLASSES.field}>
                    <Input
                        label="Password"
                        type={state.showPassword ? 'text' : 'password'}
                        value={state.password}
                        onChange={(e) => setPassword(e.target.value)}
                        leadingIcon={<Lock size={18} />}
                        trailingIcon={state.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        onIconClick={toggleShowPassword}
                        error={state.fieldErrors.password}
                        autoComplete="current-password"
                        required
                    />
                </div>
                <div className={AUTH_CLASSES.rememberRow}>
                    {showRememberMe && (
                        <Checkbox
                            label="Remember me"
                            checked={state.rememberMe}
                            onChange={setRememberMe}
                        />
                    )}
                    {showForgotPassword && (
                        <button
                            type="button"
                            className={AUTH_CLASSES.footerLink}
                            onClick={() => switchView('forgot-password')}
                        >
                            Forgot password?
                        </button>
                    )}
                </div>
                <div className={AUTH_CLASSES.submit}>
                    <Button
                        type="submit"
                        color={color === 'dark' ? 'secondary' : 'primary'}
                        variant="raised"
                        fullWidth
                        disabled={loading}
                        icon={loading ? <Loader2 size={18} className="w3f-auth__spinner" /> : undefined}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </div>
                {renderSocial()}
                {showRegister && (
                    <div className={AUTH_CLASSES.footer}>
                        <span>Don't have an account?</span>
                        <button
                            type="button"
                            className={AUTH_CLASSES.footerLink}
                            onClick={() => switchView('register')}
                        >
                            Sign up
                        </button>
                    </div>
                )}
            </form>
        );

        // ─── Render: Register form ──────────────────────────────
        const renderRegisterForm = () => (
            <form className={AUTH_CLASSES.form} onSubmit={handleRegisterSubmit} noValidate>
                <div className={AUTH_CLASSES.field}>
                    <Input
                        label="Full name"
                        type="text"
                        value={state.name}
                        onChange={(e) => setName(e.target.value)}
                        leadingIcon={<User size={18} />}
                        error={state.fieldErrors.name}
                        autoComplete="name"
                        required
                    />
                </div>
                <div className={AUTH_CLASSES.field}>
                    <Input
                        label="Email"
                        type="email"
                        value={state.email}
                        onChange={(e) => setEmail(e.target.value)}
                        leadingIcon={<Mail size={18} />}
                        error={state.fieldErrors.email}
                        autoComplete="email"
                        required
                    />
                </div>
                <div className={AUTH_CLASSES.field}>
                    <Input
                        label="Password"
                        type={state.showPassword ? 'text' : 'password'}
                        value={state.password}
                        onChange={(e) => setPassword(e.target.value)}
                        leadingIcon={<Lock size={18} />}
                        trailingIcon={state.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        onIconClick={toggleShowPassword}
                        error={state.fieldErrors.password}
                        autoComplete="new-password"
                        required
                    />
                    <PasswordStrengthBar password={state.password} />
                </div>
                <div className={AUTH_CLASSES.field}>
                    <Input
                        label="Confirm password"
                        type={state.showConfirmPassword ? 'text' : 'password'}
                        value={state.confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        leadingIcon={<Lock size={18} />}
                        trailingIcon={state.showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        onIconClick={toggleShowConfirmPassword}
                        error={state.fieldErrors.confirmPassword}
                        autoComplete="new-password"
                        required
                    />
                </div>
                <div className={AUTH_CLASSES.field}>
                    <Checkbox
                        label="I agree to the Terms of Service and Privacy Policy"
                        checked={state.acceptTerms}
                        onChange={setAcceptTerms}
                    />
                    {state.fieldErrors.terms && (
                        <span className={AUTH_CLASSES.fieldError}>{state.fieldErrors.terms}</span>
                    )}
                </div>
                <div className={AUTH_CLASSES.submit}>
                    <Button
                        type="submit"
                        color={color === 'dark' ? 'secondary' : 'primary'}
                        variant="raised"
                        fullWidth
                        disabled={loading}
                        icon={loading ? <Loader2 size={18} className="w3f-auth__spinner" /> : undefined}
                    >
                        {loading ? 'Creating account...' : 'Create account'}
                    </Button>
                </div>
                {renderSocial()}
                <div className={AUTH_CLASSES.footer}>
                    <span>Already have an account?</span>
                    <button
                        type="button"
                        className={AUTH_CLASSES.footerLink}
                        onClick={() => switchView('login')}
                    >
                        Sign in
                    </button>
                </div>
            </form>
        );

        // ─── Render: Forgot password form ───────────────────────
        const renderForgotForm = () => (
            <form className={AUTH_CLASSES.form} onSubmit={handleForgotSubmit} noValidate>
                <div className={AUTH_CLASSES.field}>
                    <Input
                        label="Email"
                        type="email"
                        value={state.email}
                        onChange={(e) => setEmail(e.target.value)}
                        leadingIcon={<Mail size={18} />}
                        error={state.fieldErrors.email}
                        autoComplete="email"
                        required
                    />
                </div>
                <div className={AUTH_CLASSES.submit}>
                    <Button
                        type="submit"
                        color={color === 'dark' ? 'secondary' : 'primary'}
                        variant="raised"
                        fullWidth
                        disabled={loading}
                        icon={loading ? <Loader2 size={18} className="w3f-auth__spinner" /> : undefined}
                    >
                        {loading ? 'Sending...' : 'Send reset link'}
                    </Button>
                </div>
                <div className={AUTH_CLASSES.footer}>
                    <button
                        type="button"
                        className={AUTH_CLASSES.backLink}
                        onClick={() => switchView('login')}
                    >
                        <ArrowLeft size={16} />
                        <span>Back to sign in</span>
                    </button>
                </div>
            </form>
        );

        // ─── Render: View router ────────────────────────────────
        const renderView = () => {
            switch (state.view) {
                case 'register':
                    return renderRegisterForm();
                case 'forgot-password':
                    return renderForgotForm();
                case 'login':
                default:
                    return renderLoginForm();
            }
        };

        // ─── Split variant wrapper ──────────────────────────────
        if (variant === 'split') {
            return (
                <div ref={ref} className={rootClasses}>
                    <div className={AUTH_CLASSES.splitImage}>
                        {logo && <div className={AUTH_CLASSES.logo}>{logo}</div>}
                    </div>
                    <div className={AUTH_CLASSES.splitForm}>
                        {renderHeader()}
                        {renderError()}
                        {renderView()}
                    </div>
                </div>
            );
        }

        // ─── Default / Card / Minimal ───────────────────────────
        return (
            <div ref={ref} className={rootClasses}>
                {renderHeader()}
                {renderError()}
                {renderView()}
            </div>
        );
    },
);

AuthLogin.displayName = 'AuthLogin';

export { AuthLogin };
export default AuthLogin;
