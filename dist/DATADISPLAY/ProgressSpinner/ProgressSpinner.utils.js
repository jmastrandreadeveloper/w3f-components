const SPINNER_COLOR_MAP = {
  primary: "var(--w3f-primary)",
  secondary: "var(--w3f-secondary)",
  success: "var(--w3f-success)",
  warning: "var(--w3f-warning)",
  danger: "var(--w3f-danger)",
  info: "var(--w3f-info)",
  gray: "var(--w3f-gray-500)"
};
const SPINNER_SIZE_MAP = {
  xs: 16,
  sm: 24,
  md: 40,
  lg: 56,
  xl: 72
};
const resolveSpinnerDiameter = (size, diameter) => {
  if (diameter !== void 0) return diameter;
  if (typeof size === "string") {
    return SPINNER_SIZE_MAP[size] ?? SPINNER_SIZE_MAP.md;
  }
  return size;
};
const resolveSpinnerColor = (color) => {
  return SPINNER_COLOR_MAP[color] ?? color;
};
const buildProgressSpinnerClasses = (unstyled, className) => {
  const base = "w3f-progress-spinner";
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, "w3f-inline-block w3f-relative", className].filter(Boolean).join(" ");
};
const calcDashOffset = (mode, value, circumference) => {
  if (mode === "determinate") {
    const clamped = Math.max(0, Math.min(100, value));
    return circumference - clamped / 100 * circumference;
  }
  return 0;
};
export {
  SPINNER_COLOR_MAP,
  SPINNER_SIZE_MAP,
  buildProgressSpinnerClasses,
  calcDashOffset,
  resolveSpinnerColor,
  resolveSpinnerDiameter
};
//# sourceMappingURL=ProgressSpinner.utils.js.map
