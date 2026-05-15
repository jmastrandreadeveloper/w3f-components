const AUTOCOMPLETE_DEFAULTS = {
  optionLabel: "label",
  maxResults: 10,
  emptyMessage: "No se encontraron resultados",
  clearable: false,
  className: "",
  variant: "outline",
  size: "md",
  error: false,
  round: false,
  searchIcon: true,
  placeholder: "Escribe para buscar...",
  debounceTime: 300,
  unstyled: false
};
const AUTOCOMPLETE_CLASSES = {
  container: "w3f-autocomplete-container",
  base: "w3f-autocomplete",
  wrapper: "w3f-autocomplete-wrapper",
  iconStart: "w3f-autocomplete-icon-start",
  clear: "w3f-autocomplete-clear",
  list: "w3f-autocomplete-list",
  item: "w3f-autocomplete-item",
  message: "w3f-autocomplete-message",
  spinner: "w3f-autocomplete-spinner",
  active: "w3f-active",
  input: {
    base: "w3f-autocomplete-input",
    variants: {
      outline: "",
      filled: "w3f-input-filled",
      flushed: "w3f-input-flushed"
    },
    sizes: {
      sm: "w3f-input-sm",
      md: "",
      lg: "w3f-input-lg"
    },
    error: "w3f-input-error",
    round: "w3f-round-pill",
    hasIcon: "w3f-input-has-icon"
  }
};
export {
  AUTOCOMPLETE_CLASSES,
  AUTOCOMPLETE_DEFAULTS
};
//# sourceMappingURL=Autocomplete.constants.js.map
