import { FORM_CLASSES } from "./Form.constants";
function buildFormClasses(className, isSubmitting, unstyled) {
  const base = FORM_CLASSES.base;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    isSubmitting && FORM_CLASSES.submitting,
    className
  ].filter(Boolean).join(" ");
}
function getFieldValue(e) {
  const target = e.target;
  const { type, checked, value } = target;
  if (type === "checkbox") return checked;
  if (type === "number" || type === "range") return value === "" ? "" : Number(value);
  return value;
}
function validateField(name, value, rule, allValues) {
  if (rule.required) {
    const isEmpty = value === void 0 || value === null || value === "";
    if (isEmpty) {
      return typeof rule.required === "string" ? rule.required : `${name} es requerido`;
    }
  }
  if (rule.minLength && typeof value === "string" && value.length < rule.minLength.value) {
    return rule.minLength.message;
  }
  if (rule.maxLength && typeof value === "string" && value.length > rule.maxLength.value) {
    return rule.maxLength.message;
  }
  if (rule.pattern && typeof value === "string" && !rule.pattern.value.test(value)) {
    return rule.pattern.message;
  }
  if (rule.custom) {
    return rule.custom(value, allValues);
  }
  return void 0;
}
function validateAllFields(values, rules) {
  const errors = {};
  for (const [name, rule] of Object.entries(rules)) {
    const error = validateField(name, values[name], rule, values);
    if (error) {
      errors[name] = error;
    }
  }
  return errors;
}
export {
  buildFormClasses,
  getFieldValue,
  validateAllFields,
  validateField
};
//# sourceMappingURL=Form.utils.js.map
