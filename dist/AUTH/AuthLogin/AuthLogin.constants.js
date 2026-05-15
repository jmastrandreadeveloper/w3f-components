const AUTH_DEFAULTS = {
  initialView: "login",
  variant: "card",
  color: "primary",
  title: "Welcome back",
  subtitle: "Sign in to your account",
  showSocialLogin: true,
  showRememberMe: true,
  showForgotPassword: true,
  showRegister: true,
  loading: false,
  error: null,
  className: ""
};
const AUTH_CLASSES = {
  base: "w3f-auth",
  header: "w3f-auth__header",
  logo: "w3f-auth__logo",
  title: "w3f-auth__title",
  subtitle: "w3f-auth__subtitle",
  form: "w3f-auth__form",
  field: "w3f-auth__field",
  fieldError: "w3f-auth__field-error",
  fieldPasswordToggle: "w3f-auth__password-toggle",
  submit: "w3f-auth__submit",
  social: "w3f-auth__social",
  socialBtn: "w3f-auth__social-btn",
  divider: "w3f-auth__divider",
  dividerText: "w3f-auth__divider-text",
  footer: "w3f-auth__footer",
  footerLink: "w3f-auth__footer-link",
  error: "w3f-auth__error",
  splitImage: "w3f-auth__split-image",
  splitForm: "w3f-auth__split-form",
  rememberRow: "w3f-auth__remember-row",
  strengthBar: "w3f-auth__strength-bar",
  strengthSegment: "w3f-auth__strength-segment",
  strengthLabel: "w3f-auth__strength-label",
  backLink: "w3f-auth__back-link",
  variants: {
    default: "",
    card: "w3f-auth--card",
    split: "w3f-auth--split",
    minimal: "w3f-auth--minimal"
  },
  colors: {
    primary: "",
    secondary: "w3f-auth--secondary",
    info: "w3f-auth--info",
    dark: "w3f-auth--dark"
  }
};
const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordMinLength: 8,
  nameMinLength: 2
};
const INITIAL_FORM_STATE = {
  view: "login",
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  rememberMe: false,
  acceptTerms: false,
  showPassword: false,
  showConfirmPassword: false,
  fieldErrors: {}
};
const VIEW_TITLES = {
  login: { title: "Welcome back", subtitle: "Sign in to your account" },
  register: { title: "Create account", subtitle: "Get started with a free account" },
  "forgot-password": { title: "Forgot password?", subtitle: "Enter your email to reset your password" },
  "reset-password": { title: "Reset password", subtitle: "Enter your new password" }
};
export {
  AUTH_CLASSES,
  AUTH_DEFAULTS,
  INITIAL_FORM_STATE,
  VALIDATION_RULES,
  VIEW_TITLES
};
//# sourceMappingURL=AuthLogin.constants.js.map
