import { AUTOCOMPLETE_CLASSES } from "./Autocomplete.constants";
function buildAutocompleteInputClasses({
  variant,
  size,
  error,
  round,
  hasIcon,
  className,
  unstyled
}) {
  if (unstyled) {
    return [
      AUTOCOMPLETE_CLASSES.input.base,
      className
    ].filter(Boolean).join(" ");
  }
  return [
    AUTOCOMPLETE_CLASSES.input.base,
    AUTOCOMPLETE_CLASSES.input.variants[variant],
    AUTOCOMPLETE_CLASSES.input.sizes[size],
    error && AUTOCOMPLETE_CLASSES.input.error,
    round && AUTOCOMPLETE_CLASSES.input.round,
    hasIcon && AUTOCOMPLETE_CLASSES.input.hasIcon,
    className
  ].filter(Boolean).join(" ");
}
function getOptionText(option, optionLabel) {
  if (!option) return "";
  return typeof option === "object" ? option[optionLabel] ?? "" : String(option);
}
function defaultFilter(item, query, optionLabel) {
  const text = getOptionText(item, optionLabel).toLowerCase();
  return text.includes(query.toLowerCase());
}
export {
  buildAutocompleteInputClasses,
  defaultFilter,
  getOptionText
};
//# sourceMappingURL=Autocomplete.utils.js.map
