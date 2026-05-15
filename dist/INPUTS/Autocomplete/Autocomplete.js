"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from "react";
import { X, Search, Loader2 } from "lucide-react";
import { AUTOCOMPLETE_DEFAULTS, AUTOCOMPLETE_CLASSES } from "./Autocomplete.constants";
import { buildAutocompleteInputClasses, getOptionText } from "./Autocomplete.utils";
import { useAutocomplete } from "./Autocomplete.hooks";
import { useBridgeBind } from "@w3f/bridge";
function HighlightedText({
  text,
  highlight
}) {
  if (!highlight) return /* @__PURE__ */ jsx(Fragment, { children: text });
  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escapeRegExp(highlight)})`, "gi"));
  return /* @__PURE__ */ jsx(Fragment, { children: parts.map(
    (part, i) => part.toLowerCase() === highlight.toLowerCase() ? /* @__PURE__ */ jsx("span", { className: "w3f-match-highlight", children: part }, i) : part
  ) });
}
const Autocomplete = forwardRef(({
  data,
  onSelect,
  optionLabel = AUTOCOMPLETE_DEFAULTS.optionLabel,
  filterFn,
  maxResults = AUTOCOMPLETE_DEFAULTS.maxResults,
  emptyMessage = AUTOCOMPLETE_DEFAULTS.emptyMessage,
  clearable = AUTOCOMPLETE_DEFAULTS.clearable,
  className = AUTOCOMPLETE_DEFAULTS.className,
  variant = AUTOCOMPLETE_DEFAULTS.variant,
  size = AUTOCOMPLETE_DEFAULTS.size,
  error: propError = AUTOCOMPLETE_DEFAULTS.error,
  round = AUTOCOMPLETE_DEFAULTS.round,
  searchIcon = AUTOCOMPLETE_DEFAULTS.searchIcon,
  placeholder = AUTOCOMPLETE_DEFAULTS.placeholder,
  name,
  value,
  onChange,
  onBlur,
  label,
  unstyled = AUTOCOMPLETE_DEFAULTS.unstyled,
  bindId,
  ...rest
}, ref) => {
  const inputId = useId();
  const { dispatch } = useBridgeBind({ bindId });
  const bridgeOnSelect = (item) => {
    const text = item ? typeof item === "string" ? item : item[optionLabel] ?? String(item) : "";
    dispatch("change", { value: text });
    if (onSelect) onSelect(item);
  };
  const {
    inputValue,
    suggestions,
    activeSuggestionIndex,
    showSuggestions,
    isLoading,
    inputRef,
    containerRef,
    handleChange,
    handleKeyDown,
    handleItemClick,
    handleClearInput,
    isFormControlled,
    formContext
  } = useAutocomplete({
    data,
    onSelect: bridgeOnSelect,
    optionLabel,
    filterFn,
    maxResults,
    name,
    value,
    onChange
  });
  const handleBlur = (e) => {
    if (isFormControlled && formContext) {
      formContext.handleBlur(e);
    }
    if (onBlur) onBlur(e);
  };
  const inputError = isFormControlled ? formContext.errors[name] : typeof propError === "string" ? propError : void 0;
  const hasError = Boolean(inputError || propError);
  const iconSize = size === "sm" ? 16 : 20;
  const inputClasses = buildAutocompleteInputClasses({
    variant,
    size,
    error: hasError,
    round,
    hasIcon: searchIcon,
    className: "",
    unstyled
  });
  return /* @__PURE__ */ jsxs("div", { ref, className: `${AUTOCOMPLETE_CLASSES.container} ${className}`, children: [
    label && /* @__PURE__ */ jsx(
      "label",
      {
        htmlFor: inputId,
        className: "w3f-label",
        children: label
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `${AUTOCOMPLETE_CLASSES.base}${unstyled ? " w3f-autocomplete--unstyled" : ""}`,
        ref: containerRef,
        role: "combobox",
        "aria-haspopup": "listbox",
        "aria-expanded": showSuggestions,
        "aria-owns": `${inputId}-list`,
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: AUTOCOMPLETE_CLASSES.wrapper,
              children: [
                searchIcon && /* @__PURE__ */ jsx("div", { className: AUTOCOMPLETE_CLASSES.iconStart, children: isLoading ? /* @__PURE__ */ jsx(
                  Loader2,
                  {
                    size: iconSize,
                    className: AUTOCOMPLETE_CLASSES.spinner
                  }
                ) : /* @__PURE__ */ jsx(Search, { size: iconSize }) }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: inputId,
                    type: "text",
                    name,
                    value: inputValue,
                    onChange: handleChange,
                    onKeyDown: handleKeyDown,
                    onBlur: handleBlur,
                    className: inputClasses,
                    placeholder,
                    ref: inputRef,
                    "aria-autocomplete": "list",
                    "aria-controls": `${inputId}-list`,
                    "aria-activedescendant": activeSuggestionIndex >= 0 ? `${inputId}-option-${activeSuggestionIndex}` : void 0,
                    "aria-invalid": hasError,
                    ...rest
                  }
                ),
                clearable && inputValue && !isLoading && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: AUTOCOMPLETE_CLASSES.clear,
                    onClick: handleClearInput,
                    role: "button",
                    "aria-label": "Limpiar b\xFAsqueda",
                    tabIndex: 0,
                    onKeyDown: (e) => e.key === "Enter" && handleClearInput(),
                    children: /* @__PURE__ */ jsx(X, { size: iconSize })
                  }
                ),
                showSuggestions && inputValue && /* @__PURE__ */ jsx(
                  "div",
                  {
                    id: `${inputId}-list`,
                    className: AUTOCOMPLETE_CLASSES.list,
                    role: "listbox",
                    children: isLoading ? /* @__PURE__ */ jsx("div", { className: AUTOCOMPLETE_CLASSES.message, children: "Buscando..." }) : suggestions.length > 0 ? suggestions.map((suggestion, index) => {
                      const text = getOptionText(
                        suggestion,
                        optionLabel
                      );
                      return /* @__PURE__ */ jsx(
                        "div",
                        {
                          id: `${inputId}-option-${index}`,
                          role: "option",
                          "aria-selected": index === activeSuggestionIndex,
                          className: [
                            AUTOCOMPLETE_CLASSES.item,
                            index === activeSuggestionIndex && AUTOCOMPLETE_CLASSES.active
                          ].filter(Boolean).join(" "),
                          onMouseDown: (e) => e.preventDefault(),
                          onClick: () => handleItemClick(suggestion),
                          children: /* @__PURE__ */ jsx(
                            HighlightedText,
                            {
                              text,
                              highlight: inputValue
                            }
                          )
                        },
                        index
                      );
                    }) : /* @__PURE__ */ jsx("div", { className: AUTOCOMPLETE_CLASSES.message, children: emptyMessage })
                  }
                )
              ]
            }
          ),
          hasError && inputError && /* @__PURE__ */ jsx("div", { className: "w3f-px-1", children: /* @__PURE__ */ jsx(
            "p",
            {
              id: `${inputId}-error`,
              className: "w3f-input-message w3f-input-message--error",
              role: "alert",
              children: inputError
            }
          ) })
        ]
      }
    )
  ] });
});
Autocomplete.displayName = "Autocomplete";
var Autocomplete_default = Autocomplete;
export {
  Autocomplete,
  Autocomplete_default as default
};
//# sourceMappingURL=Autocomplete.js.map
