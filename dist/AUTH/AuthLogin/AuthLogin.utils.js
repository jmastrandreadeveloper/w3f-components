import { AUTH_CLASSES, VALIDATION_RULES } from "./AuthLogin.constants";
function validateEmail(email) {
  if (!email.trim()) return "Email is required";
  if (!VALIDATION_RULES.email.test(email)) return "Invalid email format";
  return void 0;
}
function validatePassword(password) {
  if (!password) return { error: "Password is required", strength: "weak", score: 0 };
  if (password.length < VALIDATION_RULES.passwordMinLength) {
    return {
      error: `Password must be at least ${VALIDATION_RULES.passwordMinLength} characters`,
      strength: "weak",
      score: 1
    };
  }
  let score = 1;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const strength = score <= 1 ? "weak" : score === 2 ? "fair" : score === 3 ? "good" : "strong";
  return { strength, score: Math.min(score, 4) };
}
function validateLoginForm(email, password) {
  const errors = {};
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;
  if (!password) errors.password = "Password is required";
  return errors;
}
function validateRegisterForm(name, email, password, confirmPassword, acceptTerms) {
  const errors = {};
  if (!name.trim()) errors.name = "Name is required";
  else if (name.trim().length < VALIDATION_RULES.nameMinLength)
    errors.name = `Name must be at least ${VALIDATION_RULES.nameMinLength} characters`;
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;
  const { error: passErr } = validatePassword(password);
  if (passErr) errors.password = passErr;
  if (!confirmPassword) errors.confirmPassword = "Please confirm your password";
  else if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
  if (!acceptTerms) errors.terms = "You must accept the terms and conditions";
  return errors;
}
function validateForgotForm(email) {
  const errors = {};
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;
  return errors;
}
function buildAuthClasses(variant, color, className) {
  return [
    AUTH_CLASSES.base,
    AUTH_CLASSES.variants[variant],
    AUTH_CLASSES.colors[color],
    className
  ].filter(Boolean).join(" ");
}
function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
export {
  buildAuthClasses,
  hasErrors,
  validateEmail,
  validateForgotForm,
  validateLoginForm,
  validatePassword,
  validateRegisterForm
};
//# sourceMappingURL=AuthLogin.utils.js.map
