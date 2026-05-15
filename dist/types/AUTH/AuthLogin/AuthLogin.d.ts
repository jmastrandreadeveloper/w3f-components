import React from 'react';
import type { AuthLoginProps } from './AuthLogin.types';
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
declare const AuthLogin: React.ForwardRefExoticComponent<AuthLoginProps & React.RefAttributes<HTMLDivElement>>;
export { AuthLogin };
export default AuthLogin;
//# sourceMappingURL=AuthLogin.d.ts.map