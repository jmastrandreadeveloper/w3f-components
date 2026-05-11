# AuthLogin

Complete authentication form component with login, register, and forgot-password views. Supports social login providers, multiple visual variants, and built-in form validation.

## Import

```tsx
import AuthLogin from 'components/AUTH/AuthLogin/AuthLogin';
```

## Usage

```tsx
<AuthLogin
  onLogin={(credentials) => console.log(credentials)}
  onRegister={(data) => console.log(data)}
/>
```

### Card variant with social login

```tsx
<AuthLogin
  variant="card"
  showSocialLogin
  socialProviders={[
    { id: 'google', name: 'Google', icon: <GoogleIcon /> },
    { id: 'github', name: 'GitHub', icon: <GithubIcon /> },
  ]}
  onLogin={(creds) => handleLogin(creds)}
  onSocialLogin={(provider) => handleSocial(provider)}
/>
```

### Split variant

```tsx
<AuthLogin
  variant="split"
  color="dark"
  title="Welcome Back"
  subtitle="Sign in to your account"
  logo={<img src="/logo.svg" alt="Logo" />}
/>
```

### Register view

```tsx
<AuthLogin
  initialView="register"
  onRegister={(data) => console.log(data)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialView` | `'login' \| 'register' \| 'forgot-password' \| 'reset-password'` | `'login'` | Initial form view |
| `variant` | `'default' \| 'card' \| 'split' \| 'minimal'` | `'default'` | Visual variant |
| `color` | `'primary' \| 'secondary' \| 'info' \| 'dark'` | `'primary'` | Accent color |
| `logo` | `ReactNode` | `undefined` | Logo element |
| `title` | `string` | `undefined` | Form title |
| `subtitle` | `string` | `undefined` | Form subtitle |
| `showSocialLogin` | `boolean` | `false` | Show social login buttons |
| `socialProviders` | `SocialProvider[]` | `[]` | Social login providers |
| `showRememberMe` | `boolean` | `true` | Show "Remember me" checkbox |
| `showForgotPassword` | `boolean` | `true` | Show "Forgot password?" link |
| `showRegister` | `boolean` | `true` | Show "Create account" link |
| `onLogin` | `(credentials: LoginCredentials) => void` | `undefined` | Called on login submit |
| `onRegister` | `(data: RegisterData) => void` | `undefined` | Called on register submit |
| `onForgotPassword` | `(email: string) => void` | `undefined` | Called on forgot password |
| `onSocialLogin` | `(provider: string) => void` | `undefined` | Called on social login click |
| `onViewChange` | `(view: AuthView) => void` | `undefined` | Called on view change |
| `loading` | `boolean` | `false` | Show loading state |
| `error` | `string \| null` | `null` | Error message to display |
| `className` | `string` | `undefined` | Additional class names |

## CSS Custom Properties

| Variable | Default | Description |
|----------|---------|-------------|
| `--w3f-auth-bg` | `var(--w3f-surface)` | Background color |
| `--w3f-auth-card-bg` | `#ffffff` | Card background |
| `--w3f-auth-accent` | `var(--w3f-primary)` | Accent color |
| `--w3f-auth-accent-hover` | `var(--w3f-primary-hover)` | Accent hover color |
| `--w3f-auth-text` | `var(--w3f-text)` | Text color |
| `--w3f-auth-text-muted` | `var(--w3f-text-secondary)` | Muted text color |
| `--w3f-auth-radius` | `12px` | Border radius |
| `--w3f-auth-shadow` | `var(--w3f-shadow-lg)` | Box shadow |
| `--w3f-auth-social-btn-radius` | `8px` | Social button radius |
| `--w3f-auth-border` | `var(--w3f-border)` | Border color |
| `--w3f-auth-error-bg` | `#fef2f2` | Error background |
| `--w3f-auth-error-text` | `#dc2626` | Error text color |
| `--w3f-auth-max-width` | `420px` | Max container width |
| `--w3f-auth-gap` | `20px` | Form gap |
| `--w3f-auth-padding` | `32px` | Form padding |

## Types

```tsx
interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SocialProvider {
  id: string;
  name: string;
  icon: ReactNode;
  color?: string;
}
```

## Accessibility

- Keyboard navigation between form fields (Tab/Shift+Tab)
- Enter key submits the active form
- ARIA labels on password visibility toggle
- Error messages linked to form fields
- Focus management on view transitions
