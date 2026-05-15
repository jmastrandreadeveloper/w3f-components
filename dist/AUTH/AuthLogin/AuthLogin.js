"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useCallback } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Loader2, Chrome, Github, Facebook } from "lucide-react";
import Input from "../../INPUTS/Input/Input";
import Button from "../../INPUTS/Button/Button";
import Checkbox from "../../INPUTS/Checkbox/Checkbox";
import { AUTH_DEFAULTS, AUTH_CLASSES, VIEW_TITLES } from "./AuthLogin.constants";
import { buildAuthClasses, validatePassword } from "./AuthLogin.utils";
import { useAuthForm } from "./AuthLogin.hooks";
const DEFAULT_SOCIAL_PROVIDERS = [
  { id: "google", name: "Google", icon: /* @__PURE__ */ jsx(Chrome, { size: 18 }), color: "#DB4437" },
  { id: "facebook", name: "Facebook", icon: /* @__PURE__ */ jsx(Facebook, { size: 18 }), color: "#4267B2" },
  { id: "github", name: "GitHub", icon: /* @__PURE__ */ jsx(Github, { size: 18 }), color: "#333333" }
];
function PasswordStrengthBar({ password }) {
  if (!password) return null;
  const { strength, score } = validatePassword(password);
  const colors = ["#ef4444", "#f59e0b", "#22c55e", "#16a34a"];
  return /* @__PURE__ */ jsxs("div", { className: AUTH_CLASSES.strengthBar, children: [
    [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: AUTH_CLASSES.strengthSegment,
        style: { backgroundColor: i <= score ? colors[score - 1] : void 0 }
      },
      i
    )),
    /* @__PURE__ */ jsx("span", { className: AUTH_CLASSES.strengthLabel, children: strength })
  ] });
}
const AuthLogin = forwardRef(
  ({
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
    className = AUTH_DEFAULTS.className
  }, ref) => {
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
      tryForgot
    } = useAuthForm(initialView, onViewChange);
    const providers = socialProviders ?? DEFAULT_SOCIAL_PROVIDERS;
    const viewTitles = VIEW_TITLES[state.view];
    const displayTitle = title ?? viewTitles.title;
    const displaySubtitle = subtitle ?? viewTitles.subtitle;
    const rootClasses = buildAuthClasses(variant, color, className);
    const handleLoginSubmit = useCallback(
      (e) => {
        e.preventDefault();
        if (loading) return;
        if (tryLogin()) {
          onLogin?.({
            email: state.email,
            password: state.password,
            rememberMe: state.rememberMe
          });
        }
      },
      [loading, tryLogin, onLogin, state.email, state.password, state.rememberMe]
    );
    const handleRegisterSubmit = useCallback(
      (e) => {
        e.preventDefault();
        if (loading) return;
        if (tryRegister()) {
          onRegister?.({
            name: state.name,
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword
          });
        }
      },
      [loading, tryRegister, onRegister, state.name, state.email, state.password, state.confirmPassword]
    );
    const handleForgotSubmit = useCallback(
      (e) => {
        e.preventDefault();
        if (loading) return;
        if (tryForgot()) {
          onForgotPassword?.(state.email);
        }
      },
      [loading, tryForgot, onForgotPassword, state.email]
    );
    const renderHeader = () => /* @__PURE__ */ jsxs("div", { className: AUTH_CLASSES.header, children: [
      logo && /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.logo, children: logo }),
      /* @__PURE__ */ jsx("h2", { className: AUTH_CLASSES.title, children: displayTitle }),
      /* @__PURE__ */ jsx("p", { className: AUTH_CLASSES.subtitle, children: displaySubtitle })
    ] });
    const renderError = () => error ? /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.error, children: error }) : null;
    const renderSocial = () => {
      if (!showSocialLogin || providers.length === 0) return null;
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.divider, children: /* @__PURE__ */ jsx("span", { className: AUTH_CLASSES.dividerText, children: "or" }) }),
        /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.social, children: providers.map((p) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: AUTH_CLASSES.socialBtn,
            style: p.color ? { "--w3f-auth-social-accent": p.color } : void 0,
            onClick: () => onSocialLogin?.(p.id),
            disabled: loading,
            children: [
              p.icon,
              /* @__PURE__ */ jsx("span", { children: p.name })
            ]
          },
          p.id
        )) })
      ] });
    };
    const renderLoginForm = () => /* @__PURE__ */ jsxs("form", { className: AUTH_CLASSES.form, onSubmit: handleLoginSubmit, noValidate: true, children: [
      /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.field, children: /* @__PURE__ */ jsx(
        Input,
        {
          label: "Email",
          type: "email",
          value: state.email,
          onChange: (e) => setEmail(e.target.value),
          leadingIcon: /* @__PURE__ */ jsx(Mail, { size: 18 }),
          error: state.fieldErrors.email,
          autoComplete: "email",
          required: true
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.field, children: /* @__PURE__ */ jsx(
        Input,
        {
          label: "Password",
          type: state.showPassword ? "text" : "password",
          value: state.password,
          onChange: (e) => setPassword(e.target.value),
          leadingIcon: /* @__PURE__ */ jsx(Lock, { size: 18 }),
          trailingIcon: state.showPassword ? /* @__PURE__ */ jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsx(Eye, { size: 18 }),
          onIconClick: toggleShowPassword,
          error: state.fieldErrors.password,
          autoComplete: "current-password",
          required: true
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: AUTH_CLASSES.rememberRow, children: [
        showRememberMe && /* @__PURE__ */ jsx(
          Checkbox,
          {
            label: "Remember me",
            checked: state.rememberMe,
            onChange: setRememberMe
          }
        ),
        showForgotPassword && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: AUTH_CLASSES.footerLink,
            onClick: () => switchView("forgot-password"),
            children: "Forgot password?"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.submit, children: /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          color: color === "dark" ? "secondary" : "primary",
          variant: "raised",
          fullWidth: true,
          disabled: loading,
          icon: loading ? /* @__PURE__ */ jsx(Loader2, { size: 18, className: "w3f-auth__spinner" }) : void 0,
          children: loading ? "Signing in..." : "Sign in"
        }
      ) }),
      renderSocial(),
      showRegister && /* @__PURE__ */ jsxs("div", { className: AUTH_CLASSES.footer, children: [
        /* @__PURE__ */ jsx("span", { children: "Don't have an account?" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: AUTH_CLASSES.footerLink,
            onClick: () => switchView("register"),
            children: "Sign up"
          }
        )
      ] })
    ] });
    const renderRegisterForm = () => /* @__PURE__ */ jsxs("form", { className: AUTH_CLASSES.form, onSubmit: handleRegisterSubmit, noValidate: true, children: [
      /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.field, children: /* @__PURE__ */ jsx(
        Input,
        {
          label: "Full name",
          type: "text",
          value: state.name,
          onChange: (e) => setName(e.target.value),
          leadingIcon: /* @__PURE__ */ jsx(User, { size: 18 }),
          error: state.fieldErrors.name,
          autoComplete: "name",
          required: true
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.field, children: /* @__PURE__ */ jsx(
        Input,
        {
          label: "Email",
          type: "email",
          value: state.email,
          onChange: (e) => setEmail(e.target.value),
          leadingIcon: /* @__PURE__ */ jsx(Mail, { size: 18 }),
          error: state.fieldErrors.email,
          autoComplete: "email",
          required: true
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: AUTH_CLASSES.field, children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            label: "Password",
            type: state.showPassword ? "text" : "password",
            value: state.password,
            onChange: (e) => setPassword(e.target.value),
            leadingIcon: /* @__PURE__ */ jsx(Lock, { size: 18 }),
            trailingIcon: state.showPassword ? /* @__PURE__ */ jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsx(Eye, { size: 18 }),
            onIconClick: toggleShowPassword,
            error: state.fieldErrors.password,
            autoComplete: "new-password",
            required: true
          }
        ),
        /* @__PURE__ */ jsx(PasswordStrengthBar, { password: state.password })
      ] }),
      /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.field, children: /* @__PURE__ */ jsx(
        Input,
        {
          label: "Confirm password",
          type: state.showConfirmPassword ? "text" : "password",
          value: state.confirmPassword,
          onChange: (e) => setConfirmPassword(e.target.value),
          leadingIcon: /* @__PURE__ */ jsx(Lock, { size: 18 }),
          trailingIcon: state.showConfirmPassword ? /* @__PURE__ */ jsx(EyeOff, { size: 18 }) : /* @__PURE__ */ jsx(Eye, { size: 18 }),
          onIconClick: toggleShowConfirmPassword,
          error: state.fieldErrors.confirmPassword,
          autoComplete: "new-password",
          required: true
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: AUTH_CLASSES.field, children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            label: "I agree to the Terms of Service and Privacy Policy",
            checked: state.acceptTerms,
            onChange: setAcceptTerms
          }
        ),
        state.fieldErrors.terms && /* @__PURE__ */ jsx("span", { className: AUTH_CLASSES.fieldError, children: state.fieldErrors.terms })
      ] }),
      /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.submit, children: /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          color: color === "dark" ? "secondary" : "primary",
          variant: "raised",
          fullWidth: true,
          disabled: loading,
          icon: loading ? /* @__PURE__ */ jsx(Loader2, { size: 18, className: "w3f-auth__spinner" }) : void 0,
          children: loading ? "Creating account..." : "Create account"
        }
      ) }),
      renderSocial(),
      /* @__PURE__ */ jsxs("div", { className: AUTH_CLASSES.footer, children: [
        /* @__PURE__ */ jsx("span", { children: "Already have an account?" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: AUTH_CLASSES.footerLink,
            onClick: () => switchView("login"),
            children: "Sign in"
          }
        )
      ] })
    ] });
    const renderForgotForm = () => /* @__PURE__ */ jsxs("form", { className: AUTH_CLASSES.form, onSubmit: handleForgotSubmit, noValidate: true, children: [
      /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.field, children: /* @__PURE__ */ jsx(
        Input,
        {
          label: "Email",
          type: "email",
          value: state.email,
          onChange: (e) => setEmail(e.target.value),
          leadingIcon: /* @__PURE__ */ jsx(Mail, { size: 18 }),
          error: state.fieldErrors.email,
          autoComplete: "email",
          required: true
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.submit, children: /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          color: color === "dark" ? "secondary" : "primary",
          variant: "raised",
          fullWidth: true,
          disabled: loading,
          icon: loading ? /* @__PURE__ */ jsx(Loader2, { size: 18, className: "w3f-auth__spinner" }) : void 0,
          children: loading ? "Sending..." : "Send reset link"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.footer, children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          className: AUTH_CLASSES.backLink,
          onClick: () => switchView("login"),
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
            /* @__PURE__ */ jsx("span", { children: "Back to sign in" })
          ]
        }
      ) })
    ] });
    const renderView = () => {
      switch (state.view) {
        case "register":
          return renderRegisterForm();
        case "forgot-password":
          return renderForgotForm();
        case "login":
        default:
          return renderLoginForm();
      }
    };
    if (variant === "split") {
      return /* @__PURE__ */ jsxs("div", { ref, className: rootClasses, children: [
        /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.splitImage, children: logo && /* @__PURE__ */ jsx("div", { className: AUTH_CLASSES.logo, children: logo }) }),
        /* @__PURE__ */ jsxs("div", { className: AUTH_CLASSES.splitForm, children: [
          renderHeader(),
          renderError(),
          renderView()
        ] })
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { ref, className: rootClasses, children: [
      renderHeader(),
      renderError(),
      renderView()
    ] });
  }
);
AuthLogin.displayName = "AuthLogin";
var AuthLogin_default = AuthLogin;
export {
  AuthLogin,
  AuthLogin_default as default
};
//# sourceMappingURL=AuthLogin.js.map
