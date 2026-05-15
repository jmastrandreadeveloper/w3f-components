// src/INPUTS/Autocomplete/Autocomplete.tsx
import { forwardRef, useId } from "react";
import { X, Search, Loader2 } from "lucide-react";

// src/INPUTS/Autocomplete/Autocomplete.constants.ts
var AUTOCOMPLETE_DEFAULTS = {
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
var AUTOCOMPLETE_CLASSES = {
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

// src/INPUTS/Autocomplete/Autocomplete.utils.ts
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

// src/INPUTS/Autocomplete/Autocomplete.hooks.ts
import { useState as useState2, useEffect, useRef as useRef2, useContext } from "react";

// src/INPUTS/Form/Form.tsx
import { createContext, useState, useCallback, useMemo, useRef } from "react";

// src/INPUTS/Form/Form.constants.ts
var FORM_DEFAULTS = {
  initialValues: {},
  noValidate: true,
  unstyled: false,
  className: ""
};
var FORM_CLASSES = {
  base: "w3f-form",
  inline: "w3f-form--inline",
  stacked: "w3f-form--stacked",
  submitting: "w3f-form--submitting"
};

// src/INPUTS/Form/Form.utils.ts
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

// src/INPUTS/Form/Form.tsx
import { jsx } from "react/jsx-runtime";
var FormDispatchContext = createContext(null);
var FormMetaContext = createContext(null);
var FormFieldStoreContext = createContext(null);
var FormContext = createContext(null);
var Form = ({
  children,
  initialValues = FORM_DEFAULTS.initialValues,
  onSubmit,
  validationRules,
  unstyled = FORM_DEFAULTS.unstyled,
  className = FORM_DEFAULTS.className,
  noValidate = FORM_DEFAULTS.noValidate,
  ...props
}) => {
  const [values, setValues] = useState({ ...initialValues });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const valuesRef = useRef(values);
  valuesRef.current = values;
  const listenersRef = useRef(/* @__PURE__ */ new Map());
  const notifyField = useCallback((name, value) => {
    const subs = listenersRef.current.get(name);
    if (subs) {
      subs.forEach((fn) => fn(value));
    }
  }, []);
  const setValuesAndNotify = useCallback((updater) => {
    setValues((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      for (const key of Object.keys(next)) {
        if (next[key] !== prev[key]) {
          notifyField(key, next[key]);
        }
      }
      return next;
    });
  }, [notifyField]);
  const resetForm = useCallback(() => {
    setValuesAndNotify({ ...initialValues });
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues, setValuesAndNotify]);
  const setFieldValue = useCallback((name, value) => {
    setValuesAndNotify((prev) => ({ ...prev, [name]: value }));
  }, [setValuesAndNotify]);
  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);
  const clearFieldError = useCallback((name) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);
  const handleChange = useCallback(
    (e) => {
      const { name } = e.target;
      const val = getFieldValue(e);
      setFieldValue(name, val);
    },
    [setFieldValue]
  );
  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
    },
    []
  );
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (validationRules) {
        const validationErrors = validateAllFields(valuesRef.current, validationRules);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          const allTouched = {};
          for (const key of Object.keys(validationRules)) {
            allTouched[key] = true;
          }
          setTouched((prev) => ({ ...prev, ...allTouched }));
          return;
        }
      }
      if (onSubmit) {
        setIsSubmitting(true);
        try {
          await onSubmit(valuesRef.current, { setErrors, setTouched, resetForm });
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [validationRules, onSubmit, resetForm]
  );
  const dispatchValue = useMemo(() => ({
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    clearFieldError,
    setErrors,
    setTouched,
    resetForm
  }), [handleChange, handleBlur, setFieldValue, setFieldError, clearFieldError, resetForm]);
  const metaValue = useMemo(() => ({
    errors,
    touched,
    isSubmitting
  }), [errors, touched, isSubmitting]);
  const fieldStore = useMemo(() => ({
    getFieldValue: (name) => valuesRef.current[name],
    getValues: () => valuesRef.current,
    subscribe: (name, listener) => {
      if (!listenersRef.current.has(name)) {
        listenersRef.current.set(name, /* @__PURE__ */ new Set());
      }
      listenersRef.current.get(name).add(listener);
      return () => {
        const subs = listenersRef.current.get(name);
        if (subs) {
          subs.delete(listener);
          if (subs.size === 0) listenersRef.current.delete(name);
        }
      };
    }
  }), []);
  const contextValue = useMemo(
    () => ({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldValue,
      setFieldError,
      clearFieldError,
      setErrors,
      setTouched,
      resetForm,
      isSubmitting
    }),
    [values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldError, clearFieldError, resetForm, isSubmitting]
  );
  const formClasses = buildFormClasses(className, isSubmitting, unstyled);
  return /* @__PURE__ */ jsx(FormDispatchContext.Provider, { value: dispatchValue, children: /* @__PURE__ */ jsx(FormMetaContext.Provider, { value: metaValue, children: /* @__PURE__ */ jsx(FormFieldStoreContext.Provider, { value: fieldStore, children: /* @__PURE__ */ jsx(FormContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
    "form",
    {
      onSubmit: handleSubmit,
      className: formClasses,
      noValidate,
      ...props,
      children
    }
  ) }) }) }) });
};
Form.displayName = "Form";

// src/INPUTS/Autocomplete/Autocomplete.hooks.ts
function useAutocomplete({
  data,
  onSelect,
  optionLabel,
  filterFn,
  maxResults,
  name,
  value: externalValue,
  onChange: externalOnChange
}) {
  const formContext = useContext(FormContext);
  const isFormControlled = !!(formContext && name);
  const [internalValue, setInternalValue] = useState2("");
  const [suggestions, setSuggestions] = useState2([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState2(-1);
  const [showSuggestions, setShowSuggestions] = useState2(false);
  const [isLoading, setIsLoading] = useState2(false);
  const inputRef = useRef2(null);
  const containerRef = useRef2(null);
  const debounceTimeout = useRef2(null);
  const currentValue = isFormControlled ? formContext.values[name] ?? "" : externalValue !== void 0 ? externalValue : internalValue;
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const updateValue = (value, source) => {
    if (isFormControlled && formContext) {
      formContext.handleChange({
        target: { name, value, type: "text" }
      });
      if (source === "select") {
        formContext.handleBlur({
          target: { name, value }
        });
      }
    } else if (externalOnChange) {
      externalOnChange({ target: { name, value } });
    } else {
      setInternalValue(value);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    updateValue(value, "change");
    setIsLoading(true);
    setShowSuggestions(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (value) {
        const filterLogic = filterFn ?? ((item, q) => defaultFilter(item, q, optionLabel));
        const filtered = data.filter((item) => filterLogic(item, value)).slice(0, maxResults);
        setSuggestions(filtered);
        setActiveSuggestionIndex(-1);
      } else {
        setSuggestions([]);
      }
      setIsLoading(false);
    }, AUTOCOMPLETE_DEFAULTS.debounceTime);
  };
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex(
        (prev) => prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex(
        (prev) => prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeSuggestionIndex > -1) {
        handleItemClick(suggestions[activeSuggestionIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };
  const handleItemClick = (suggestion) => {
    const text = getOptionText(suggestion, optionLabel);
    updateValue(text, "select");
    setSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    if (onSelect) onSelect(suggestion);
    if (inputRef.current) inputRef.current.focus();
  };
  const handleClearInput = () => {
    updateValue("", "select");
    setSuggestions([]);
    setShowSuggestions(false);
    if (onSelect) onSelect(null);
    if (inputRef.current) inputRef.current.focus();
  };
  return {
    inputValue: currentValue,
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
  };
}

// src/INPUTS/Autocomplete/Autocomplete.tsx
import { useBridgeBind } from "@w3f/bridge";
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
function HighlightedText({
  text,
  highlight
}) {
  if (!highlight) return /* @__PURE__ */ jsx2(Fragment, { children: text });
  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escapeRegExp(highlight)})`, "gi"));
  return /* @__PURE__ */ jsx2(Fragment, { children: parts.map(
    (part, i) => part.toLowerCase() === highlight.toLowerCase() ? /* @__PURE__ */ jsx2("span", { className: "w3f-match-highlight", children: part }, i) : part
  ) });
}
var Autocomplete = forwardRef(({
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
    label && /* @__PURE__ */ jsx2(
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
                searchIcon && /* @__PURE__ */ jsx2("div", { className: AUTOCOMPLETE_CLASSES.iconStart, children: isLoading ? /* @__PURE__ */ jsx2(
                  Loader2,
                  {
                    size: iconSize,
                    className: AUTOCOMPLETE_CLASSES.spinner
                  }
                ) : /* @__PURE__ */ jsx2(Search, { size: iconSize }) }),
                /* @__PURE__ */ jsx2(
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
                clearable && inputValue && !isLoading && /* @__PURE__ */ jsx2(
                  "div",
                  {
                    className: AUTOCOMPLETE_CLASSES.clear,
                    onClick: handleClearInput,
                    role: "button",
                    "aria-label": "Limpiar b\xFAsqueda",
                    tabIndex: 0,
                    onKeyDown: (e) => e.key === "Enter" && handleClearInput(),
                    children: /* @__PURE__ */ jsx2(X, { size: iconSize })
                  }
                ),
                showSuggestions && inputValue && /* @__PURE__ */ jsx2(
                  "div",
                  {
                    id: `${inputId}-list`,
                    className: AUTOCOMPLETE_CLASSES.list,
                    role: "listbox",
                    children: isLoading ? /* @__PURE__ */ jsx2("div", { className: AUTOCOMPLETE_CLASSES.message, children: "Buscando..." }) : suggestions.length > 0 ? suggestions.map((suggestion, index) => {
                      const text = getOptionText(
                        suggestion,
                        optionLabel
                      );
                      return /* @__PURE__ */ jsx2(
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
                          children: /* @__PURE__ */ jsx2(
                            HighlightedText,
                            {
                              text,
                              highlight: inputValue
                            }
                          )
                        },
                        index
                      );
                    }) : /* @__PURE__ */ jsx2("div", { className: AUTOCOMPLETE_CLASSES.message, children: emptyMessage })
                  }
                )
              ]
            }
          ),
          hasError && inputError && /* @__PURE__ */ jsx2("div", { className: "w3f-px-1", children: /* @__PURE__ */ jsx2(
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

// src/INPUTS/Button/Button.tsx
import { forwardRef as forwardRef2 } from "react";

// src/INPUTS/Button/Button.constants.ts
var BUTTON_DEFAULTS = {
  type: "button",
  variant: "raised",
  color: "primary",
  size: "md",
  fullWidth: false,
  iconPosition: "left",
  disabled: false,
  className: "",
  unstyled: false
};
var BUTTON_CLASSES = {
  base: "w3f-button",
  content: "w3f-button__content",
  icon: "w3f-button__icon",
  text: "w3f-button__text",
  variants: {
    raised: "w3f-button--raised",
    flat: "w3f-button--flat",
    outline: "w3f-button--outline"
  },
  colors: {
    primary: "",
    success: "w3f-button--success",
    danger: "w3f-button--danger",
    warning: "w3f-button--warning",
    info: "w3f-button--info",
    secondary: "w3f-button--secondary"
  },
  sizes: {
    xxxs: "w3f-button--xxxs",
    xxs: "w3f-button--xxs",
    xs: "w3f-button--xs",
    sm: "w3f-button--sm",
    md: "w3f-button--md",
    lg: "w3f-button--lg",
    xl: "w3f-button--xl"
  },
  full: "w3f-button--full"
};

// src/INPUTS/Button/Button.utils.ts
function buildButtonClasses(variant, color, size, fullWidth, className, unstyled) {
  if (unstyled) {
    return [
      BUTTON_CLASSES.base,
      "w3f-button--unstyled",
      fullWidth && BUTTON_CLASSES.full,
      className
    ].filter(Boolean).join(" ");
  }
  return [
    BUTTON_CLASSES.base,
    BUTTON_CLASSES.variants[variant],
    BUTTON_CLASSES.colors[color],
    BUTTON_CLASSES.sizes[size],
    fullWidth && BUTTON_CLASSES.full,
    className
  ].filter(Boolean).join(" ");
}

// src/INPUTS/Button/Button.hooks.ts
import { useContext as useContext2 } from "react";
function useButtonFormContext() {
  return useContext2(FormContext);
}

// src/INPUTS/Button/Button.tsx
import { useBridgeBind as useBridgeBind2 } from "@w3f/bridge";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var Button = forwardRef2(
  ({
    children,
    text,
    onClick,
    type = BUTTON_DEFAULTS.type,
    variant = BUTTON_DEFAULTS.variant,
    color = BUTTON_DEFAULTS.color,
    size = BUTTON_DEFAULTS.size,
    fullWidth = BUTTON_DEFAULTS.fullWidth,
    icon = null,
    iconPosition = BUTTON_DEFAULTS.iconPosition,
    className = BUTTON_DEFAULTS.className,
    disabled = BUTTON_DEFAULTS.disabled,
    unstyled = BUTTON_DEFAULTS.unstyled,
    bindId,
    ...props
  }, ref) => {
    const formContext = useButtonFormContext();
    const isFormControlled = !!formContext;
    const { dispatch } = useBridgeBind2({ bindId });
    const handleClick = (e) => {
      dispatch("click");
      if (onClick) onClick(e);
    };
    const effectiveType = isFormControlled && type === "button" ? "button" : type;
    const classes = buildButtonClasses(variant, color, size, fullWidth, className, unstyled);
    const content = children ?? text;
    return /* @__PURE__ */ jsx3(
      "button",
      {
        ref,
        type: effectiveType,
        className: classes,
        onClick: handleClick,
        disabled,
        ...props,
        children: /* @__PURE__ */ jsxs2("span", { className: BUTTON_CLASSES.content, children: [
          icon && iconPosition === "left" && /* @__PURE__ */ jsx3("span", { className: BUTTON_CLASSES.icon, children: icon }),
          /* @__PURE__ */ jsx3("span", { className: BUTTON_CLASSES.text, children: content }),
          icon && iconPosition === "right" && /* @__PURE__ */ jsx3("span", { className: BUTTON_CLASSES.icon, children: icon })
        ] })
      }
    );
  }
);
Button.displayName = "Button";
var Button_default = Button;

// src/INPUTS/ButtonGroup/ButtonGroup.tsx
import React4 from "react";

// src/INPUTS/ButtonGroup/ButtonGroup.constants.ts
var BUTTON_GROUP_DEFAULTS = {
  variant: "raised",
  color: "primary",
  size: "md",
  orientation: "horizontal",
  fullWidth: false,
  disabled: false,
  responsive: false,
  unstyled: false,
  className: ""
};
var BUTTON_GROUP_CLASSES = {
  base: "w3f-button-group",
  horizontal: "w3f-button-group--horizontal",
  vertical: "w3f-button-group--vertical",
  fullWidth: "w3f-button-group--full-width",
  disabled: "w3f-button-group--disabled",
  responsive: "w3f-button-group--responsive"
};

// src/INPUTS/ButtonGroup/ButtonGroup.utils.ts
function buildButtonGroupClasses(orientation, fullWidth, disabled, responsive, className, unstyled) {
  const base = BUTTON_GROUP_CLASSES.base;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    orientation === "vertical" ? BUTTON_GROUP_CLASSES.vertical : BUTTON_GROUP_CLASSES.horizontal,
    fullWidth && BUTTON_GROUP_CLASSES.fullWidth,
    disabled && BUTTON_GROUP_CLASSES.disabled,
    responsive && BUTTON_GROUP_CLASSES.responsive,
    className
  ].filter(Boolean).join(" ");
}
function getButtonPosition(index, total) {
  if (total === 1) return "first";
  if (index === 0) return "first";
  if (index === total - 1) return "last";
  return "middle";
}

// src/INPUTS/ButtonGroup/ButtonGroup.hooks.ts
import { useContext as useContext3 } from "react";
function useButtonGroupFormContext() {
  return useContext3(FormContext);
}

// src/INPUTS/ButtonGroup/ButtonGroup.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var ButtonGroup = ({
  children,
  variant = BUTTON_GROUP_DEFAULTS.variant,
  color = BUTTON_GROUP_DEFAULTS.color,
  size = BUTTON_GROUP_DEFAULTS.size,
  orientation = BUTTON_GROUP_DEFAULTS.orientation,
  fullWidth = BUTTON_GROUP_DEFAULTS.fullWidth,
  disabled = BUTTON_GROUP_DEFAULTS.disabled,
  responsive = BUTTON_GROUP_DEFAULTS.responsive,
  unstyled = BUTTON_GROUP_DEFAULTS.unstyled,
  className = BUTTON_GROUP_DEFAULTS.className,
  ...props
}) => {
  useButtonGroupFormContext();
  const validChildren = React4.Children.toArray(children).filter(
    React4.isValidElement
  );
  const total = validChildren.length;
  const modifiedChildren = validChildren.map((child, index) => {
    const position = getButtonPosition(index, total);
    return React4.cloneElement(child, {
      variant: child.props.variant ?? variant,
      color: child.props.color ?? color,
      size: child.props.size ?? size,
      fullWidth: orientation === "vertical" ? true : child.props.fullWidth ?? false,
      disabled: disabled || (child.props.disabled ?? false),
      // Forzar type="button" si no se especifica, para evitar submits accidentales
      type: child.props.type ?? "button",
      // Atributos de datos para el CSS de border-radius
      "data-button-group-child": true,
      "data-button-position": position
    });
  });
  const classes = buildButtonGroupClasses(orientation, fullWidth, disabled, responsive, className, unstyled);
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: classes,
      role: "group",
      "aria-label": props["aria-label"] ?? "button group",
      "aria-orientation": orientation,
      ...props,
      children: modifiedChildren
    }
  );
};
ButtonGroup.displayName = "ButtonGroup";

// src/INPUTS/ButtonToggle/ButtonToggle.constants.ts
var BUTTON_TOGGLE_DEFAULTS = {
  options: [],
  multiple: false,
  allowDeselect: false,
  color: "primary",
  size: "md",
  disabled: false,
  unstyled: false,
  className: ""
};
var BUTTON_TOGGLE_CLASSES = {
  base: "w3f-button-toggle"
};

// src/INPUTS/ButtonToggle/ButtonToggle.utils.ts
function buildButtonToggleClasses(className, unstyled) {
  const base = BUTTON_TOGGLE_CLASSES.base;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, className].filter(Boolean).join(" ");
}
function isOptionActive(optionValue, currentValue, multiple) {
  if (multiple) {
    return Array.isArray(currentValue) && currentValue.includes(optionValue);
  }
  return currentValue === optionValue;
}
function computeNewSelection(optionValue, currentValue, multiple, allowDeselect) {
  if (multiple) {
    const current = Array.isArray(currentValue) ? currentValue : [];
    if (current.includes(optionValue)) {
      return current.filter((item) => item !== optionValue);
    }
    return [...current, optionValue];
  }
  if (currentValue === optionValue) {
    return allowDeselect ? null : optionValue;
  }
  return optionValue;
}

// src/INPUTS/ButtonToggle/ButtonToggle.hooks.ts
import { useState as useState3, useContext as useContext4 } from "react";
function useButtonToggle({
  name,
  multiple,
  defaultValue,
  value: controlledValue
}) {
  const formContext = useContext4(FormContext);
  const isFormControlled = !!(formContext && name);
  const [internalValue, setInternalValue] = useState3(() => {
    if (defaultValue !== void 0) return defaultValue;
    return multiple ? [] : null;
  });
  const currentValue = isFormControlled ? formContext.values[name] ?? (multiple ? [] : null) : controlledValue !== void 0 ? controlledValue : internalValue;
  return {
    formContext,
    isFormControlled,
    currentValue,
    setInternalValue
  };
}

// src/INPUTS/ButtonToggle/ButtonToggle.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var ButtonToggle = ({
  options = BUTTON_TOGGLE_DEFAULTS.options,
  onSelect,
  value,
  defaultValue,
  multiple = BUTTON_TOGGLE_DEFAULTS.multiple,
  allowDeselect = BUTTON_TOGGLE_DEFAULTS.allowDeselect,
  color = BUTTON_TOGGLE_DEFAULTS.color,
  size = BUTTON_TOGGLE_DEFAULTS.size,
  disabled = BUTTON_TOGGLE_DEFAULTS.disabled,
  unstyled = BUTTON_TOGGLE_DEFAULTS.unstyled,
  ariaLabel,
  className = BUTTON_TOGGLE_DEFAULTS.className,
  name,
  onChange,
  ...props
}) => {
  const { formContext, isFormControlled, currentValue, setInternalValue } = useButtonToggle({ name, multiple, defaultValue, value });
  const handleSelect = (optionValue) => {
    const newSelection = computeNewSelection(
      optionValue,
      currentValue,
      multiple,
      allowDeselect
    );
    if (isFormControlled && formContext) {
      formContext.handleChange({
        target: {
          name,
          value: newSelection,
          type: multiple ? "select-multiple" : "select"
        }
      });
      formContext.handleBlur({
        target: { name, value: newSelection }
      });
    } else if (onChange) {
      onChange({ target: { name, value: newSelection } });
    } else if (value === void 0) {
      setInternalValue(newSelection);
    }
    if (onSelect) onSelect(newSelection);
  };
  if (!options.length) return null;
  const classes = buildButtonToggleClasses(className, unstyled);
  return /* @__PURE__ */ jsx5(
    "div",
    {
      className: classes,
      role: "group",
      "aria-label": ariaLabel ?? (name ? `${name} toggle` : "button toggle"),
      ...props,
      children: options.map((option) => {
        const active = isOptionActive(option.value, currentValue, multiple);
        return /* @__PURE__ */ jsx5(
          Button_default,
          {
            type: "button",
            variant: active ? "raised" : "outline",
            color,
            size,
            disabled: disabled || option.disabled,
            onClick: () => handleSelect(option.value),
            "aria-pressed": active,
            children: option.label
          },
          option.value
        );
      })
    }
  );
};
ButtonToggle.displayName = "ButtonToggle";

// src/INPUTS/Checkbox/Checkbox.tsx
import { forwardRef as forwardRef3 } from "react";

// src/INPUTS/Checkbox/Checkbox.constants.ts
var CHECKBOX_DEFAULTS = {
  checked: false,
  disabled: false,
  className: "",
  color: "primary",
  unstyled: false
};
var CHECKBOX_CLASSES = {
  container: "w3f-component-container",
  wrapper: "w3f-checkbox-wrapper",
  wrapperDisabled: "w3f-checkbox-wrapper--disabled",
  input: "w3f-checkbox-input",
  label: "w3f-checkbox-label",
  children: "w3f-checkbox-children",
  colors: {
    primary: "",
    success: "w3f-checkbox--success",
    warning: "w3f-checkbox--warning",
    danger: "w3f-checkbox--danger"
  }
};

// src/INPUTS/Checkbox/Checkbox.utils.ts
function buildCheckboxInputClasses(color, unstyled) {
  if (unstyled) {
    return [CHECKBOX_CLASSES.input, "w3f-checkbox--unstyled"].join(" ");
  }
  return [CHECKBOX_CLASSES.input, CHECKBOX_CLASSES.colors[color]].filter(Boolean).join(" ");
}
function buildCheckboxContainerClasses(className, unstyled) {
  if (unstyled) {
    return [CHECKBOX_CLASSES.container, "w3f-checkbox--unstyled", className].filter(Boolean).join(" ");
  }
  return [CHECKBOX_CLASSES.container, className].filter(Boolean).join(" ");
}
function buildCheckboxWrapperClasses(disabled, unstyled) {
  if (unstyled) {
    return [CHECKBOX_CLASSES.wrapper, "w3f-checkbox-wrapper--unstyled"].join(" ");
  }
  return [
    CHECKBOX_CLASSES.wrapper,
    disabled && CHECKBOX_CLASSES.wrapperDisabled
  ].filter(Boolean).join(" ");
}

// src/INPUTS/Checkbox/Checkbox.hooks.ts
import { useState as useState4, useEffect as useEffect2, useContext as useContext5, useId as useId2 } from "react";
function useCheckbox({ name, checked: initialChecked }) {
  const formContext = useContext5(FormContext);
  const isFormControlled = !!(formContext && name);
  const uniqueId = useId2();
  const [isChecked, setIsChecked] = useState4(initialChecked ?? false);
  const checkboxValue = isFormControlled ? Boolean(formContext.values[name]) : isChecked;
  useEffect2(() => {
    if (!isFormControlled) {
      setIsChecked(initialChecked ?? false);
    }
  }, [initialChecked, isFormControlled]);
  return {
    formContext,
    isFormControlled,
    checkboxValue,
    setIsChecked,
    uniqueId
  };
}

// src/INPUTS/Checkbox/Checkbox.tsx
import { useBridgeBind as useBridgeBind3 } from "@w3f/bridge";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var Checkbox = forwardRef3(({
  label,
  name,
  checked = CHECKBOX_DEFAULTS.checked,
  onChange,
  onBlur,
  disabled = CHECKBOX_DEFAULTS.disabled,
  children,
  className = CHECKBOX_DEFAULTS.className,
  ariaLabel,
  ariaDescribedBy,
  value,
  color = CHECKBOX_DEFAULTS.color,
  unstyled = CHECKBOX_DEFAULTS.unstyled,
  bindId,
  ...props
}, ref) => {
  const { formContext, isFormControlled, checkboxValue, setIsChecked, uniqueId } = useCheckbox({ name, checked });
  const { dispatch } = useBridgeBind3({ bindId });
  const handleChange = (e) => {
    if (disabled) return;
    const newChecked = e.target.checked;
    if (isFormControlled && formContext) {
      formContext.handleChange(e);
    } else {
      setIsChecked(newChecked);
    }
    dispatch("change", { value: newChecked });
    if (onChange) onChange(newChecked);
  };
  const handleBlur = (e) => {
    if (isFormControlled && formContext) {
      formContext.handleBlur(e);
    }
    if (onBlur) onBlur(e);
  };
  return /* @__PURE__ */ jsxs3("div", { className: buildCheckboxContainerClasses(className, unstyled), children: [
    /* @__PURE__ */ jsxs3("div", { className: buildCheckboxWrapperClasses(disabled, unstyled), children: [
      /* @__PURE__ */ jsx6(
        "input",
        {
          ref,
          id: uniqueId,
          type: "checkbox",
          name,
          value,
          className: buildCheckboxInputClasses(color, unstyled),
          checked: checkboxValue,
          onChange: handleChange,
          onBlur: handleBlur,
          disabled,
          "aria-label": ariaLabel,
          "aria-describedby": ariaDescribedBy,
          "aria-checked": checkboxValue,
          ...props
        }
      ),
      /* @__PURE__ */ jsx6("label", { htmlFor: uniqueId, className: CHECKBOX_CLASSES.label, children: label })
    ] }),
    checkboxValue && children && /* @__PURE__ */ jsx6("div", { className: CHECKBOX_CLASSES.children, children })
  ] });
});
Checkbox.displayName = "Checkbox";
var Checkbox_default = Checkbox;

// src/INPUTS/EmailField/EmailField.tsx
import { forwardRef as forwardRef4, useId as useId3, useState as useState6 } from "react";
import { Mail } from "lucide-react";

// src/INPUTS/EmailField/EmailField.constants.ts
var EMAILFIELD_CLASSES = {
  container: "w3f-input-container",
  wrapper: "w3f-input-wrapper",
  wrapperSizes: {
    sm: "w3f-input-wrapper--sm",
    md: "",
    lg: "w3f-input-wrapper--lg"
  },
  input: "w3f-input",
  hasLeading: "w3f-input--has-leading",
  label: "w3f-input-label",
  labelFloating: "w3f-input-label--floating",
  labelShifted: "w3f-input-label--shifted",
  required: "w3f-input-required",
  iconLeading: "w3f-input-icon w3f-input-icon--leading",
  message: "w3f-input-message",
  messageError: "w3f-input-message--error",
  messageHelper: "w3f-input-message--helper",
  paddingX: "w3f-px-1"
};
var EMAILFIELD_DEFAULTS = {
  size: "md",
  disabled: false,
  required: false,
  validateOnChange: false,
  unstyled: false
};

// src/INPUTS/EmailField/EmailField.utils.ts
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(value) {
  return EMAIL_REGEX.test(value);
}
function buildContainerClasses(className, unstyled) {
  const base = EMAILFIELD_CLASSES.container;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, className].filter(Boolean).join(" ");
}
function buildWrapperClasses(size) {
  return [
    EMAILFIELD_CLASSES.wrapper,
    EMAILFIELD_CLASSES.wrapperSizes[size]
  ].filter(Boolean).join(" ");
}
function buildInputClasses() {
  return [
    EMAILFIELD_CLASSES.input,
    EMAILFIELD_CLASSES.hasLeading
  ].filter(Boolean).join(" ");
}
function buildLabelClasses(isFloating) {
  return [
    EMAILFIELD_CLASSES.label,
    isFloating && EMAILFIELD_CLASSES.labelFloating,
    !isFloating && EMAILFIELD_CLASSES.labelShifted
  ].filter(Boolean).join(" ");
}

// src/INPUTS/EmailField/EmailField.hooks.ts
import { useContext as useContext6, useState as useState5 } from "react";
var useEmailFieldFormContext = () => {
  return useContext6(FormContext);
};
var useEmailFieldFocus = () => {
  const [isFocused, setIsFocused] = useState5(false);
  return {
    isFocused,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  };
};

// src/INPUTS/EmailField/EmailField.tsx
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
var EmailField = forwardRef4(
  ({
    label,
    name,
    value: externalValue,
    onChange: externalOnChange,
    error: propError,
    helperText,
    disabled = EMAILFIELD_DEFAULTS.disabled,
    required = EMAILFIELD_DEFAULTS.required,
    size = EMAILFIELD_DEFAULTS.size,
    unstyled = EMAILFIELD_DEFAULTS.unstyled,
    className = "",
    onBlur: onBlurProp,
    onFocus: onFocusProp,
    validateOnChange = EMAILFIELD_DEFAULTS.validateOnChange,
    placeholder,
    autoFocus,
    ...props
  }, ref) => {
    const formContext = useEmailFieldFormContext();
    const isFormControlled = !!(formContext && name);
    const { isFocused, onFocus: onFocusHook, onBlur: onBlurHook } = useEmailFieldFocus();
    const [internalError, setInternalError] = useState6(void 0);
    const [internalValue, setInternalValue] = useState6("");
    const inputId = useId3();
    const currentValue = isFormControlled ? formContext.values[name] ?? "" : externalValue !== void 0 ? externalValue : internalValue;
    const contextError = isFormControlled ? formContext.errors[name] : propError;
    const fieldError = contextError || internalError;
    const hasError = Boolean(fieldError);
    const validateFormat = (value) => {
      if (value && !isValidEmail(value)) {
        setInternalError("Formato de email inv\xE1lido");
      } else {
        setInternalError(void 0);
      }
    };
    const handleChange = (e) => {
      const val = e.target.value;
      if (validateOnChange) validateFormat(val);
      if (isFormControlled && formContext) {
        formContext.handleChange(e);
      } else if (externalOnChange) {
        externalOnChange(e);
      } else {
        setInternalValue(val);
      }
    };
    const handleFocus = (e) => {
      if (!disabled) onFocusHook();
      if (onFocusProp) onFocusProp(e);
    };
    const handleBlur = (e) => {
      onBlurHook();
      validateFormat(e.target.value);
      if (isFormControlled && formContext) formContext.handleBlur(e);
      if (onBlurProp) onBlurProp(e);
    };
    const hasValue = String(currentValue ?? "").length > 0;
    const isFloating = isFocused || hasValue || Boolean(placeholder);
    return /* @__PURE__ */ jsxs4("div", { className: buildContainerClasses(className, unstyled), children: [
      /* @__PURE__ */ jsxs4("div", { className: buildWrapperClasses(size), children: [
        /* @__PURE__ */ jsx7("div", { className: EMAILFIELD_CLASSES.iconLeading, children: /* @__PURE__ */ jsx7(Mail, { size: 16 }) }),
        /* @__PURE__ */ jsx7(
          "input",
          {
            ref,
            id: inputId,
            type: "text",
            inputMode: "email",
            name,
            value: currentValue,
            onChange: handleChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            disabled,
            required,
            placeholder,
            autoFocus,
            autoComplete: "email",
            "aria-invalid": hasError,
            "aria-describedby": fieldError ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0,
            className: buildInputClasses(),
            ...props
          }
        ),
        /* @__PURE__ */ jsxs4("label", { htmlFor: inputId, className: buildLabelClasses(isFloating), children: [
          label ?? "Email",
          required && /* @__PURE__ */ jsx7("span", { className: EMAILFIELD_CLASSES.required, children: " *" })
        ] })
      ] }),
      /* @__PURE__ */ jsx7("div", { className: EMAILFIELD_CLASSES.paddingX, children: fieldError ? /* @__PURE__ */ jsx7(
        "p",
        {
          id: `${inputId}-error`,
          className: `${EMAILFIELD_CLASSES.message} ${EMAILFIELD_CLASSES.messageError}`,
          role: "alert",
          children: fieldError
        }
      ) : helperText ? /* @__PURE__ */ jsx7(
        "p",
        {
          id: `${inputId}-helper`,
          className: `${EMAILFIELD_CLASSES.message} ${EMAILFIELD_CLASSES.messageHelper}`,
          children: helperText
        }
      ) : null })
    ] });
  }
);
EmailField.displayName = "EmailField";

// src/INPUTS/FloatingActionButton/FloatingActionButton.constants.ts
var FAB_DEFAULTS = {
  title: "Acci\xF3n",
  offset: 24,
  color: "primary",
  size: "default",
  extended: false,
  position: "bottom-right",
  mobileIconOnly: false,
  disabled: false,
  type: "button",
  className: "",
  unstyled: false
};
var FAB_CLASSES = {
  base: "w3f-fab",
  sizes: {
    mini: "w3f-fab--mini",
    sm: "w3f-fab--sm",
    default: "",
    lg: "w3f-fab--lg"
  },
  extended: "w3f-fab--extended",
  colors: {
    primary: "",
    success: "w3f-fab--success",
    danger: "w3f-fab--danger",
    warning: "w3f-fab--warning",
    info: "w3f-fab--info",
    secondary: "w3f-fab--secondary",
    surface: "w3f-fab--surface",
    "surface-secondary": "w3f-fab--surface-secondary"
  },
  positions: {
    left: "w3f-fab--left",
    center: "w3f-fab--center",
    top: "w3f-fab--top"
  },
  mobileIconOnly: "w3f-fab--mobile-icon-only",
  disabled: "w3f-fab--disabled",
  error: "w3f-fab--error",
  icon: "w3f-fab__icon",
  text: "w3f-fab__text",
  label: "w3f-fab__label",
  group: "w3f-fab-group",
  groupOpen: "is-open",
  message: "w3f-fab-message"
};

// src/INPUTS/FloatingActionButton/FloatingActionButton.utils.ts
function buildFabClasses(size, color, position, extended, hasText, mobileIconOnly, disabled, hasError, className, unstyled) {
  if (unstyled) {
    return [FAB_CLASSES.base, "w3f-fab--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    FAB_CLASSES.base,
    FAB_CLASSES.sizes[size],
    FAB_CLASSES.colors[color],
    position.includes("left") && FAB_CLASSES.positions.left,
    position.includes("center") && FAB_CLASSES.positions.center,
    position.includes("top") && FAB_CLASSES.positions.top,
    (extended || hasText) && FAB_CLASSES.extended,
    mobileIconOnly && extended && FAB_CLASSES.mobileIconOnly,
    disabled && FAB_CLASSES.disabled,
    hasError && FAB_CLASSES.error,
    className
  ].filter(Boolean).join(" ");
}
function buildFabStyle(position, offset) {
  const style = {};
  if (position.includes("bottom")) {
    style.bottom = `${offset}px`;
  } else if (position.includes("top")) {
    style.top = `${offset}px`;
  }
  return style;
}
function buildFabMessageStyle(position, offset) {
  return {
    position: "fixed",
    bottom: position.includes("bottom") ? `${offset + 72}px` : "auto",
    top: position.includes("top") ? `${offset + 72}px` : "auto",
    right: position.includes("right") ? "var(--w3f-space-6)" : "auto",
    transform: position.includes("center") ? "translateX(-50%)" : "none",
    left: position.includes("center") ? "50%" : position.includes("left") ? "var(--w3f-space-6)" : "auto",
    zIndex: 1e3,
    maxWidth: "200px"
  };
}
function buildFabGroupClasses(isOpen, className) {
  return [FAB_CLASSES.group, isOpen && FAB_CLASSES.groupOpen, className].filter(Boolean).join(" ");
}

// src/INPUTS/FloatingActionButton/FloatingActionButton.hooks.ts
import { useContext as useContext7 } from "react";
function useFabFormContext() {
  return useContext7(FormContext);
}

// src/INPUTS/FloatingActionButton/FloatingActionButton.tsx
import { Fragment as Fragment2, jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var FloatingActionButton = ({
  name,
  onClick,
  children,
  text,
  label,
  title = FAB_DEFAULTS.title,
  offset = FAB_DEFAULTS.offset,
  color = FAB_DEFAULTS.color,
  size = FAB_DEFAULTS.size,
  extended = FAB_DEFAULTS.extended,
  position = FAB_DEFAULTS.position,
  mobileIconOnly = FAB_DEFAULTS.mobileIconOnly,
  disabled = FAB_DEFAULTS.disabled,
  type = FAB_DEFAULTS.type,
  error,
  helperText,
  className = FAB_DEFAULTS.className,
  unstyled = FAB_DEFAULTS.unstyled,
  ...props
}) => {
  const formContext = useFabFormContext();
  const isFormControlled = !!(formContext && name);
  const fabError = isFormControlled ? formContext.errors[name] : error;
  const hasError = Boolean(fabError);
  const handleClick = (e) => {
    if (disabled) return;
    if (isFormControlled && formContext && name) {
      const currentValue = formContext.values[name] ?? 0;
      if (typeof currentValue === "number") {
        formContext.setFieldValue(name, currentValue + 1);
      } else {
        formContext.setFieldValue(name, true);
      }
    }
    if (onClick) onClick(e);
  };
  const finalTitle = text || title;
  const classes = buildFabClasses(
    size,
    color,
    position,
    extended,
    Boolean(text),
    mobileIconOnly,
    disabled,
    hasError,
    className,
    unstyled
  );
  const fabStyle = buildFabStyle(position, offset);
  return /* @__PURE__ */ jsxs5(Fragment2, { children: [
    /* @__PURE__ */ jsxs5(
      "button",
      {
        className: classes,
        onClick: handleClick,
        style: fabStyle,
        title: finalTitle,
        "aria-label": finalTitle,
        "aria-invalid": hasError,
        "aria-describedby": fabError ? `${name}-error` : helperText ? `${name}-helper` : void 0,
        disabled,
        type,
        ...props,
        children: [
          children && /* @__PURE__ */ jsx8("span", { className: FAB_CLASSES.icon, children }),
          text && /* @__PURE__ */ jsx8("span", { className: FAB_CLASSES.text, children: text }),
          label && /* @__PURE__ */ jsx8("span", { className: FAB_CLASSES.label, children: label })
        ]
      }
    ),
    (fabError || helperText) && /* @__PURE__ */ jsx8(
      "div",
      {
        className: FAB_CLASSES.message,
        style: buildFabMessageStyle(position, offset),
        children: fabError ? /* @__PURE__ */ jsx8(
          "p",
          {
            id: `${name}-error`,
            className: "w3f-input-message w3f-input-message--error w3f-fab-message__bubble",
            role: "alert",
            children: fabError
          }
        ) : helperText ? /* @__PURE__ */ jsx8(
          "p",
          {
            id: `${name}-helper`,
            className: "w3f-input-message w3f-input-message--helper w3f-fab-message__bubble w3f-fab-message__bubble--helper",
            children: helperText
          }
        ) : null
      }
    )
  ] });
};
FloatingActionButton.displayName = "FloatingActionButton";
var FloatingActionButtonGroup = ({
  children,
  isOpen = false,
  offset = FAB_DEFAULTS.offset,
  position = FAB_DEFAULTS.position,
  className = ""
}) => {
  const classes = buildFabGroupClasses(isOpen, className);
  const groupStyle = {
    bottom: `${offset}px`,
    ...position.includes("left") && {
      left: "var(--w3f-space-6)",
      right: "auto"
    },
    ...position.includes("top") && {
      top: `${offset}px`,
      bottom: "auto"
    }
  };
  return /* @__PURE__ */ jsx8("div", { className: classes, style: groupStyle, children });
};
FloatingActionButtonGroup.displayName = "FloatingActionButtonGroup";

// src/INPUTS/FormField/FormField.tsx
import { forwardRef as forwardRef5, useId as useId4 } from "react";

// src/INPUTS/FormField/FormField.constants.ts
var FORM_FIELD_DEFAULTS = {
  layout: "stacked",
  required: false,
  disabled: false,
  className: "",
  unstyled: false
};
var FORM_FIELD_CLASSES = {
  base: "w3f-form-field",
  layouts: {
    stacked: "w3f-form-field--stacked",
    inline: "w3f-form-field--inline"
  },
  label: "w3f-form-field__label",
  required: "w3f-input-required",
  content: "w3f-form-field__content",
  message: "w3f-input-message",
  messageError: "w3f-input-message--error",
  messageHelper: "w3f-input-message--helper",
  hasError: "has-error",
  isDisabled: "is-disabled"
};

// src/INPUTS/FormField/FormField.utils.ts
function buildFormFieldClasses(layout, hasError, disabled, className, unstyled) {
  if (unstyled) {
    return [FORM_FIELD_CLASSES.base, "w3f-form-field--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    FORM_FIELD_CLASSES.base,
    FORM_FIELD_CLASSES.layouts[layout],
    hasError && FORM_FIELD_CLASSES.hasError,
    disabled && FORM_FIELD_CLASSES.isDisabled,
    className
  ].filter(Boolean).join(" ");
}

// src/INPUTS/FormField/FormField.hooks.ts
import { useContext as useContext8 } from "react";
var useFormFieldContext = () => {
  return useContext8(FormContext);
};

// src/INPUTS/FormField/FormField.tsx
import { useBridgeBind as useBridgeBind4 } from "@w3f/bridge";
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
var FormField = forwardRef5(({
  label,
  name,
  error: propError,
  helperText,
  required = false,
  disabled = false,
  layout = "stacked",
  children,
  className = "",
  unstyled = FORM_FIELD_DEFAULTS.unstyled,
  bindId
}, ref) => {
  const formContext = useFormFieldContext();
  const labelId = useId4();
  useBridgeBind4({ bindId });
  const isFormControlled = !!(formContext && name);
  const fieldError = isFormControlled ? formContext.errors[name] : propError;
  const hasError = Boolean(fieldError);
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      ref,
      className: buildFormFieldClasses(layout, hasError, disabled, className, unstyled),
      role: "group",
      "aria-labelledby": label ? labelId : void 0,
      children: [
        label && /* @__PURE__ */ jsxs6("label", { id: labelId, className: FORM_FIELD_CLASSES.label, children: [
          label,
          required && /* @__PURE__ */ jsxs6("span", { className: FORM_FIELD_CLASSES.required, "aria-hidden": "true", children: [
            " ",
            "*"
          ] })
        ] }),
        /* @__PURE__ */ jsx9("div", { className: FORM_FIELD_CLASSES.content, children }),
        (fieldError || helperText) && /* @__PURE__ */ jsx9("div", { children: fieldError ? /* @__PURE__ */ jsx9(
          "p",
          {
            className: `${FORM_FIELD_CLASSES.message} ${FORM_FIELD_CLASSES.messageError}`,
            role: "alert",
            children: fieldError
          }
        ) : helperText ? /* @__PURE__ */ jsx9(
          "p",
          {
            className: `${FORM_FIELD_CLASSES.message} ${FORM_FIELD_CLASSES.messageHelper}`,
            children: helperText
          }
        ) : null })
      ]
    }
  );
});
FormField.displayName = "FormField";

// src/INPUTS/Input/Input.tsx
import { forwardRef as forwardRef7, useId as useId5 } from "react";

// src/DATADISPLAY/Icon/Icon.tsx
import { forwardRef as forwardRef6 } from "react";

// src/DATADISPLAY/Icon/Icon.registry.ts
import {
  Home,
  Menu,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronsDownUp,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ExternalLink,
  Navigation
} from "lucide-react";
import {
  Heart,
  Star,
  Bookmark,
  Share,
  Share2,
  Download,
  Upload,
  Copy,
  Edit,
  Trash,
  Trash2,
  Plus,
  PlusCircle,
  Send,
  Save,
  Printer,
  RotateCcw,
  Paintbrush,
  Pencil,
  PencilRuler,
  Rocket,
  Maximize2,
  Scissors,
  Shuffle,
  Newspaper,
  ClipboardList,
  LogIn
} from "lucide-react";
import {
  Mail as Mail2,
  MessageSquare,
  MessageCircle,
  Phone,
  Video,
  Bell
} from "lucide-react";
import {
  Play,
  Pause,
  Volume2 as Volume,
  VolumeX,
  Music,
  Image,
  Film,
  Camera
} from "lucide-react";
import {
  File,
  FileText,
  Folder,
  FolderOpen
} from "lucide-react";
import {
  Check,
  X as X2,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  HelpCircle,
  Shield,
  Flame,
  Zap,
  Lightbulb
} from "lucide-react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Youtube
} from "lucide-react";
import {
  Settings,
  Settings2,
  Search as Search2,
  Filter,
  Grid3x3,
  List,
  MoreVertical,
  MoreHorizontal,
  Loader2 as Loader22,
  Sliders,
  SlidersHorizontal,
  Layers,
  SquareStack,
  Archive,
  Palette,
  Rainbow,
  Code,
  Ruler,
  Type,
  Calendar,
  Clock,
  Monitor,
  MoveHorizontal,
  Smartphone,
  Tablet,
  Sun,
  Moon,
  Globe,
  DollarSign,
  CreditCard,
  Lock,
  Key,
  Eye,
  EyeOff,
  MapPin
} from "lucide-react";
import {
  User,
  UserCircle,
  Users,
  UserPlus,
  UserMinus,
  UserCheck
} from "lucide-react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import {
  Circle,
  Square,
  Minus,
  Slash,
  Box,
  Boxes,
  Sidebar,
  Tag,
  CircleDot,
  ToggleLeft,
  ToggleRight,
  CheckSquare,
  GitBranch,
  GitCommitHorizontal,
  Package,
  Truck,
  BookOpen,
  Quote,
  Smile,
  Frown,
  Meh,
  Ban,
  Crosshair,
  Link2
} from "lucide-react";
import {
  PanelLeft,
  PanelLeftOpen,
  PanelRight,
  PanelTop,
  PanelBottom,
  Layout,
  LayoutGrid,
  LayoutTemplate,
  LayoutPanelLeft,
  Columns3,
  Rows3,
  AppWindow,
  MousePointer,
  MousePointerClick
} from "lucide-react";
import {
  ShoppingCart
} from "lucide-react";
import {
  Sparkles,
  FileInput,
  FormInput,
  LayoutDashboard,
  HardDrive,
  HardDriveDownload,
  HardDriveUpload,
  FileCode,
  Redo2,
  Undo2,
  RefreshCw,
  AlertOctagon,
  RectangleHorizontal,
  Award,
  TextCursorInput,
  Hash,
  Wand2,
  Scan,
  ScanSearch,
  ClipboardPaste,
  ArrowLeftRight,
  ChevronsUpDown,
  ListOrdered,
  Loader,
  PaintBucket,
  Table2,
  Table as TableIcon,
  Link as LinkIcon,
  PlugZap,
  Unplug,
  Workflow,
  GitMerge,
  GitFork,
  PenLine,
  Timer,
  Radio,
  Wifi,
  Variable,
  Database,
  Server,
  FilePlus,
  Repeat,
  Scale,
  FileJson,
  Calculator,
  Group,
  Clapperboard,
  Map as Map2,
  BarChart3
} from "lucide-react";
import {
  AlignHorizontalJustifyStart,
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalSpaceBetween,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalSpaceBetween
} from "lucide-react";
var ICON_REGISTRY = {
  // Navigation
  Home,
  Menu,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronsDownUp,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ExternalLink,
  Navigation,
  // Actions
  Heart,
  Star,
  Bookmark,
  Share,
  Share2,
  Download,
  Upload,
  Copy,
  Edit,
  Trash,
  Trash2,
  Plus,
  PlusCircle,
  Send,
  Save,
  Printer,
  RotateCcw,
  Paintbrush,
  Pencil,
  PencilRuler,
  Rocket,
  Maximize2,
  Scissors,
  Shuffle,
  Newspaper,
  ClipboardList,
  LogIn,
  // Communication
  Mail: Mail2,
  MessageSquare,
  MessageCircle,
  Phone,
  Video,
  Bell,
  // Media
  Play,
  Pause,
  Volume,
  VolumeX,
  Music,
  Image,
  Film,
  Camera,
  // Files
  File,
  FileText,
  Folder,
  FolderOpen,
  // Status
  Check,
  X: X2,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  HelpCircle,
  Shield,
  Flame,
  Zap,
  Lightbulb,
  // Social
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  // UI / Layout
  Settings,
  Settings2,
  Search: Search2,
  Filter,
  Grid3x3,
  List,
  MoreVertical,
  MoreHorizontal,
  Loader2: Loader22,
  Sliders,
  SlidersHorizontal,
  Layers,
  SquareStack,
  Archive,
  Palette,
  Rainbow,
  Code,
  Ruler,
  Type,
  Calendar,
  Clock,
  Monitor,
  MoveHorizontal,
  Smartphone,
  Tablet,
  Sun,
  Moon,
  Globe,
  DollarSign,
  CreditCard,
  Lock,
  Key,
  Eye,
  EyeOff,
  MapPin,
  // User
  User,
  UserCircle,
  Users,
  UserPlus,
  UserMinus,
  UserCheck,
  // Formatting
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ZoomIn,
  ZoomOut,
  // Shapes / Surfaces
  Circle,
  Square,
  Minus,
  Slash,
  Box,
  Boxes,
  Sidebar,
  Tag,
  CircleDot,
  ToggleLeft,
  ToggleRight,
  CheckSquare,
  GitBranch,
  GitCommitHorizontal,
  Package,
  Truck,
  BookOpen,
  Quote,
  Smile,
  Frown,
  Meh,
  Ban,
  Crosshair,
  Link2,
  // Layout panels
  PanelLeft,
  PanelLeftOpen,
  PanelRight,
  PanelTop,
  PanelBottom,
  Layout,
  LayoutGrid,
  LayoutTemplate,
  LayoutPanelLeft,
  Columns3,
  Rows3,
  AppWindow,
  MousePointer,
  MousePointerClick,
  // Shopping
  ShoppingCart,
  // Studio / TC
  Sparkles,
  FileInput,
  FormInput,
  LayoutDashboard,
  HardDrive,
  HardDriveDownload,
  HardDriveUpload,
  FileCode,
  Redo2,
  Undo2,
  RefreshCw,
  AlertOctagon,
  RectangleHorizontal,
  Award,
  TextCursorInput,
  Hash,
  Wand2,
  Scan,
  ScanSearch,
  ClipboardPaste,
  ArrowLeftRight,
  ChevronsUpDown,
  ListOrdered,
  Loader,
  PaintBucket,
  Table2,
  Table: TableIcon,
  Link: LinkIcon,
  PlugZap,
  Unplug,
  Workflow,
  GitMerge,
  GitFork,
  PenLine,
  Timer,
  Radio,
  Wifi,
  Variable,
  Database,
  Server,
  FilePlus,
  Repeat,
  Scale,
  FileJson,
  Calculator,
  Group,
  // Studio sidebar icons
  Clapperboard,
  Map: Map2,
  BarChart3,
  // Alignment
  AlignHorizontalJustifyStart,
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalSpaceBetween,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalSpaceBetween
};

// src/DATADISPLAY/Icon/Icon.constants.ts
var IconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 48
};
var IconColors = {
  default: "currentColor",
  primary: "var(--w3f-primary)",
  secondary: "var(--w3f-secondary)",
  success: "var(--w3f-success)",
  danger: "var(--w3f-danger)",
  warning: "var(--w3f-warning)",
  info: "var(--w3f-info)",
  light: "var(--w3f-on-primary)",
  dark: "var(--w3f-gray-800)",
  white: "#ffffff",
  black: "#000000",
  gray: "var(--w3f-gray-500)"
};
var IconAliases = {
  // Navegación
  "house": "Home",
  "inicio": "Home",
  "home-icon": "Home",
  // Acciones
  "love": "Heart",
  "like": "Heart",
  "favorite": "Heart",
  "corazon": "Heart",
  "settings": "Settings",
  "config": "Settings",
  "configuracion": "Settings",
  // Campos de usuario
  "user": "User",
  "profile": "User",
  "perfil": "User",
  "account": "User",
  "username": "User",
  // Comunicación y campos
  "search": "Search",
  "buscar": "Search",
  "lupa": "Search",
  "mail": "Mail",
  "email": "Mail",
  "phone": "Phone",
  "tel": "Phone",
  // Seguridad
  "password": "Lock",
  "lock-icon": "Lock",
  "key": "Key",
  "show-pass": "Eye",
  "hide-pass": "EyeOff",
  // Contenido/Texto
  "document": "File",
  "archivo": "File",
  "folder": "Folder",
  "carpeta": "Folder",
  "bio": "FileText",
  "edit-text": "Pencil",
  // Locación
  "location": "MapPin",
  "city": "MapPin",
  "address": "MapPin",
  // Estados
  "check": "Check",
  "checkmark": "Check",
  "tick": "Check",
  "close": "X",
  "cancel": "X",
  "cerrar": "X",
  "alert": "AlertCircle",
  "warning": "AlertTriangle",
  "advertencia": "AlertTriangle",
  // Redes sociales
  "facebook": "Facebook",
  "twitter": "Twitter",
  "instagram": "Instagram",
  "linkedin": "Linkedin"
};
var IconDefaults = {
  size: 24,
  color: "currentColor",
  className: "",
  strokeWidth: 2,
  unstyled: false
};

// src/DATADISPLAY/Icon/Icon.utils.ts
var kebabToPascal = (name) => name.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
var resolveIconName = (name) => {
  const aliased = IconAliases[name] || name;
  if (ICON_REGISTRY[aliased]) {
    return aliased;
  }
  const pascal = kebabToPascal(aliased);
  if (ICON_REGISTRY[pascal]) {
    return pascal;
  }
  return name;
};
var resolveIconSize = (size) => {
  if (typeof size === "string") {
    return IconSizes[size.toLowerCase()] || IconSizes.md;
  }
  return size;
};
var resolveIconColor = (color) => {
  return IconColors[color.toLowerCase()] || color;
};
var buildIconClasses = (unstyled, className) => {
  const base = "w3f-icon";
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [`w3f-inline-flex w3f-items-center w3f-justify-center`, className].filter(Boolean).join(" ");
};

// src/DATADISPLAY/Icon/Icon.hooks.ts
var useIcon = ({
  name,
  size = IconDefaults.size,
  color = IconDefaults.color,
  className = IconDefaults.className
}) => {
  const resolvedName = resolveIconName(name);
  const resolvedSize = resolveIconSize(size);
  const resolvedColor = resolveIconColor(color);
  const LucideIcon = resolvedName ? ICON_REGISTRY[resolvedName] || null : null;
  return {
    LucideIcon,
    size: resolvedSize,
    color: resolvedColor,
    className,
    name: resolvedName
  };
};
var Icon_hooks_default = useIcon;

// src/DATADISPLAY/Icon/Icon.tsx
import { useBridgeBind as useBridgeBind5 } from "@w3f/bridge";
import { jsx as jsx10 } from "react/jsx-runtime";
var Icon = forwardRef6(({ name, size, color, className, unstyled = IconDefaults.unstyled, bindId }, ref) => {
  useBridgeBind5({ bindId });
  const { LucideIcon, size: finalSize, color: finalColor, className: finalClassName, name: resolvedName } = Icon_hooks_default({ name, size, color, className });
  if (!LucideIcon) {
    console.warn(`Icono no encontrado: ${resolvedName || name}`);
    return /* @__PURE__ */ jsx10("span", { ref, className: "w3f-text-sm w3f-text-gray", children: resolvedName || name });
  }
  const wrapperClasses = buildIconClasses(unstyled, finalClassName);
  return /* @__PURE__ */ jsx10(
    "span",
    {
      ref,
      className: wrapperClasses,
      style: { lineHeight: 0 },
      "aria-hidden": "true",
      role: "img",
      children: /* @__PURE__ */ jsx10(
        LucideIcon,
        {
          size: finalSize,
          color: finalColor,
          strokeWidth: 2
        }
      )
    }
  );
});
Icon.displayName = "Icon";
var Icon_default = Icon;

// src/INPUTS/Input/Input.constants.ts
var INPUT_DEFAULTS = {
  type: "text",
  disabled: false,
  required: false,
  autoFocus: false,
  className: "",
  unstyled: false,
  size: "md"
};
var INPUT_CLASSES = {
  container: "w3f-input-container",
  wrapper: "w3f-input-wrapper",
  base: "w3f-input",
  label: "w3f-input-label",
  labelFloating: "w3f-input-label--floating",
  labelShifted: "w3f-input-label--shifted",
  required: "w3f-input-required",
  icon: "w3f-input-icon",
  iconLeading: "w3f-input-icon--leading",
  iconTrailing: "w3f-input-icon--trailing",
  iconClickable: "w3f-input-icon--clickable",
  hasLeading: "w3f-input--has-leading",
  hasTrailing: "w3f-input--has-trailing",
  message: "w3f-input-message",
  messageError: "w3f-input-message--error",
  messageHelper: "w3f-input-message--helper",
  paddingX: "w3f-px-1"
};
var INPUT_SIZE_CLASSES = {
  xxxs: "w3f-input-wrapper--xxxs",
  xxs: "w3f-input-wrapper--xxs",
  xs: "w3f-input-wrapper--xs",
  sm: "w3f-input-wrapper--sm",
  md: "",
  lg: "w3f-input-wrapper--lg",
  xl: "w3f-input-wrapper--xl"
};
var INPUT_VARIANT_CLASSES = {
  solid: "w3f-input--solid",
  outlined: "w3f-input--outlined",
  ghost: "w3f-input--ghost",
  soft: "w3f-input--soft"
};

// src/INPUTS/Input/Input.utils.ts
function buildInputClasses2(hasLeading, hasTrailing, className, unstyled, variant) {
  if (unstyled) {
    return [
      INPUT_CLASSES.base,
      "w3f-input--unstyled",
      className
    ].filter(Boolean).join(" ");
  }
  return [
    INPUT_CLASSES.base,
    hasLeading && INPUT_CLASSES.hasLeading,
    hasTrailing && INPUT_CLASSES.hasTrailing,
    variant && INPUT_VARIANT_CLASSES[variant],
    className
  ].filter(Boolean).join(" ");
}
function buildLabelClasses2(isFloating, showShifted) {
  return [
    INPUT_CLASSES.label,
    isFloating && INPUT_CLASSES.labelFloating,
    showShifted && INPUT_CLASSES.labelShifted
  ].filter(Boolean).join(" ");
}
function buildIconClasses2(position, isClickable) {
  return [
    INPUT_CLASSES.icon,
    position === "leading" ? INPUT_CLASSES.iconLeading : INPUT_CLASSES.iconTrailing,
    isClickable && INPUT_CLASSES.iconClickable
  ].filter(Boolean).join(" ");
}
function buildWrapperClasses2(size) {
  return [
    INPUT_CLASSES.wrapper,
    size && INPUT_SIZE_CLASSES[size]
  ].filter(Boolean).join(" ");
}
function buildContainerClasses2(className, unstyled) {
  return [
    INPUT_CLASSES.container,
    unstyled && "w3f-input-container--unstyled",
    className
  ].filter(Boolean).join(" ");
}

// src/INPUTS/Input/Input.hooks.ts
import { useContext as useContext9, useState as useState7, useCallback as useCallback2, useRef as useRef3 } from "react";

// src/INPUTS/Input/Input.masks.ts
function applyMask(value, mask) {
  const clean = value.replace(/[^a-zA-Z0-9]/g, "");
  let result = "";
  let ci = 0;
  for (let mi = 0; mi < mask.length && ci < clean.length; mi++) {
    const m = mask[mi];
    if (m === "#") {
      if (/\d/.test(clean[ci])) result += clean[ci++];
      else break;
    } else if (m === "A") {
      if (/[a-zA-Z]/.test(clean[ci])) result += clean[ci++];
      else break;
    } else if (m === "*") {
      result += clean[ci++];
    } else {
      result += m;
    }
  }
  return result;
}
function stripNonDigits(v) {
  return v.replace(/\D/g, "");
}
function formatCurrency(v) {
  const digits = stripNonDigits(v);
  if (!digits) return "";
  const num = parseInt(digits, 10) / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(num);
}
function cleanCurrency(v) {
  const digits = stripNonDigits(v);
  if (!digits) return "";
  return (parseInt(digits, 10) / 100).toFixed(2);
}
var PREDEFINED_MASKS = {
  phone: {
    name: "Phone",
    mask: "(###) ###-####",
    placeholder: "(555) 123-4567",
    cleanValue: stripNonDigits,
    format: (v) => applyMask(v, "(###) ###-####"),
    validate: /^\(\d{3}\) \d{3}-\d{4}$/,
    maxLength: 14
  },
  date: {
    name: "Date",
    mask: "##/##/####",
    placeholder: "DD/MM/YYYY",
    cleanValue: stripNonDigits,
    format: (v) => applyMask(v, "##/##/####"),
    validate: /^\d{2}\/\d{2}\/\d{4}$/,
    maxLength: 10
  },
  currency: {
    name: "Currency",
    placeholder: "$0.00",
    cleanValue: cleanCurrency,
    format: formatCurrency,
    maxLength: 15
  },
  "credit-card": {
    name: "Credit Card",
    mask: "#### #### #### ####",
    placeholder: "1234 5678 9012 3456",
    cleanValue: stripNonDigits,
    format: (v) => applyMask(v, "#### #### #### ####"),
    validate: /^\d{4} \d{4} \d{4} \d{4}$/,
    maxLength: 19
  },
  "zip-code": {
    name: "ZIP Code",
    mask: "#####",
    placeholder: "12345",
    cleanValue: stripNonDigits,
    format: (v) => applyMask(v, "#####"),
    validate: /^\d{5}$/,
    maxLength: 5
  },
  cuit: {
    name: "CUIT",
    mask: "##-########-#",
    placeholder: "20-12345678-9",
    cleanValue: stripNonDigits,
    format: (v) => applyMask(v, "##-########-#"),
    validate: /^\d{2}-\d{8}-\d$/,
    maxLength: 13
  }
};
function resolveMask(mask) {
  if (typeof mask === "string") {
    return PREDEFINED_MASKS[mask] ?? null;
  }
  return mask;
}

// src/INPUTS/Input/Input.hooks.ts
var useInputFormContext = () => {
  return useContext9(FormContext);
};
var useInputFocus = (disabled) => {
  const [isFocused, setIsFocused] = useState7(false);
  const handleFocus = () => {
    if (!disabled) setIsFocused(true);
  };
  const handleBlurFocus = (hasValue) => {
    if (!hasValue) setIsFocused(false);
  };
  return { isFocused, handleFocus, handleBlurFocus };
};
var useInputMask = (maskProp, externalValue) => {
  const maskDef = maskProp ? resolveMask(maskProp) : null;
  const [internalDisplay, setInternalDisplay] = useState7("");
  const cleanRef = useRef3("");
  const formatAndUpdate = useCallback2((raw) => {
    if (!maskDef) return raw;
    const formatted = maskDef.format(raw);
    setInternalDisplay(formatted);
    cleanRef.current = maskDef.cleanValue(formatted);
    return formatted;
  }, [maskDef]);
  const displayValue = maskDef ? externalValue !== void 0 ? maskDef.format(externalValue) : internalDisplay : void 0;
  const cleanValue = maskDef ? externalValue !== void 0 ? maskDef.cleanValue(externalValue) : cleanRef.current : void 0;
  return {
    maskDef,
    displayValue,
    cleanValue,
    formatAndUpdate,
    placeholder: maskDef?.placeholder,
    maxLength: maskDef?.maxLength
  };
};
var usePatternValidation = (patternProp) => {
  const [patternError, setPatternError] = useState7();
  const validateOnBlur = useCallback2((value) => {
    if (!patternProp || !value) {
      setPatternError(void 0);
      return;
    }
    const regex = typeof patternProp === "string" ? new RegExp(patternProp) : patternProp;
    if (!regex.test(value)) {
      setPatternError("Formato inv\xE1lido");
    } else {
      setPatternError(void 0);
    }
  }, [patternProp]);
  return { patternError, validateOnBlur };
};

// src/INPUTS/Input/Input.tsx
import { useBridgeBind as useBridgeBind6 } from "@w3f/bridge";
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
var renderIconContent = (iconProp) => {
  if (!iconProp) return null;
  if (typeof iconProp === "string") {
    return /* @__PURE__ */ jsx11(Icon_default, { name: iconProp, size: "sm", className: "w3f-text-gray" });
  }
  return iconProp;
};
var Input = forwardRef7(
  ({
    label,
    type = INPUT_DEFAULTS.type,
    name,
    value,
    onChange,
    error,
    helperText,
    disabled = INPUT_DEFAULTS.disabled,
    required = INPUT_DEFAULTS.required,
    autoComplete,
    autoFocus = INPUT_DEFAULTS.autoFocus,
    leadingIcon,
    trailingIcon,
    onIconClick,
    className = INPUT_DEFAULTS.className,
    unstyled = INPUT_DEFAULTS.unstyled,
    size = INPUT_DEFAULTS.size,
    onBlur,
    bindId,
    mask,
    pattern,
    variant,
    ...props
  }, ref) => {
    const formContext = useInputFormContext();
    const inputId = useId5();
    const { dispatch } = useBridgeBind6({ bindId });
    const isFormControlled = !!(formContext && name);
    const isControlled = isFormControlled || value !== void 0;
    const rawInputValue = isFormControlled ? formContext.values[name] ?? "" : value;
    const inputError = isFormControlled ? formContext.errors[name] : error;
    const { maskDef, displayValue, cleanValue, formatAndUpdate, placeholder: maskPlaceholder, maxLength: maskMaxLength } = useInputMask(mask, rawInputValue);
    const inputValue = maskDef ? displayValue : rawInputValue;
    const { patternError, validateOnBlur } = usePatternValidation(pattern);
    const resolvedError = inputError || patternError;
    const { isFocused, handleFocus, handleBlurFocus } = useInputFocus(disabled);
    const handleBlur = (e) => {
      handleBlurFocus(e.target.value !== "");
      if (pattern) validateOnBlur(maskDef ? cleanValue ?? e.target.value : e.target.value);
      if (isFormControlled) formContext.handleBlur(e);
      dispatch("blur", { value: e.target.value });
      if (onBlur) onBlur(e);
    };
    const handleChange = (e) => {
      if (maskDef) {
        const formatted = formatAndUpdate(e.target.value);
        if (isFormControlled && name) {
          const clean = maskDef.cleanValue(formatted);
          const syntheticEvent = { ...e, target: { ...e.target, name, value: clean } };
          formContext.handleChange(syntheticEvent);
        }
        dispatch("change", { value: maskDef.cleanValue(formatted) });
        if (onChange) onChange(e);
        return;
      }
      if (isFormControlled) formContext.handleChange(e);
      dispatch("change", { value: e.target.value });
      if (onChange) onChange(e);
    };
    const alwaysFloatTypes = ["date", "time", "datetime-local", "month", "week", "color"];
    const hasValue = isControlled ? inputValue !== "" && inputValue !== void 0 && inputValue !== null : false;
    const isFloating = isFocused || hasValue || alwaysFloatTypes.includes(type);
    const hasError = Boolean(resolvedError);
    return /* @__PURE__ */ jsxs7("div", { className: buildContainerClasses2(className, unstyled), children: [
      /* @__PURE__ */ jsxs7("div", { className: buildWrapperClasses2(size), children: [
        leadingIcon && /* @__PURE__ */ jsx11("div", { className: buildIconClasses2("leading"), children: renderIconContent(leadingIcon) }),
        /* @__PURE__ */ jsx11(
          "input",
          {
            ref,
            id: inputId,
            type,
            name,
            ...isControlled || maskDef ? { value: inputValue ?? "" } : { defaultValue: "" },
            onChange: handleChange,
            onFocus: (e) => {
              handleFocus();
              dispatch("focus", { value: e.target.value });
            },
            onBlur: handleBlur,
            disabled,
            required,
            autoComplete,
            autoFocus,
            "aria-invalid": hasError,
            "aria-describedby": resolvedError ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0,
            placeholder: maskPlaceholder || props.placeholder,
            maxLength: maskMaxLength || props.maxLength,
            className: buildInputClasses2(
              Boolean(leadingIcon),
              Boolean(trailingIcon),
              void 0,
              unstyled,
              variant
            ),
            ...props
          }
        ),
        trailingIcon && /* @__PURE__ */ jsx11(
          "div",
          {
            className: buildIconClasses2("trailing", Boolean(onIconClick)),
            onClick: onIconClick,
            role: onIconClick ? "button" : void 0,
            children: renderIconContent(trailingIcon)
          }
        ),
        /* @__PURE__ */ jsxs7("label", { htmlFor: inputId, className: buildLabelClasses2(isFloating, !isFloating && Boolean(leadingIcon)), children: [
          label,
          required && /* @__PURE__ */ jsx11("span", { className: INPUT_CLASSES.required, children: " *" })
        ] })
      ] }),
      /* @__PURE__ */ jsx11("div", { className: INPUT_CLASSES.paddingX, children: resolvedError ? /* @__PURE__ */ jsx11(
        "p",
        {
          id: `${inputId}-error`,
          className: `${INPUT_CLASSES.message} ${INPUT_CLASSES.messageError}`,
          role: "alert",
          children: resolvedError
        }
      ) : helperText ? /* @__PURE__ */ jsx11(
        "p",
        {
          id: `${inputId}-helper`,
          className: `${INPUT_CLASSES.message} ${INPUT_CLASSES.messageHelper}`,
          children: helperText
        }
      ) : null })
    ] });
  }
);
Input.displayName = "Input";
var Input_default = Input;

// src/INPUTS/LiveForm/LiveForm.tsx
import { useState as useState8, useCallback as useCallback3, useMemo as useMemo2, useEffect as useEffect3, useRef as useRef4 } from "react";

// src/INPUTS/LiveForm/LiveForm.constants.ts
var LIVE_FORM_DEFAULTS = {
  initialValues: {},
  unstyled: false,
  className: ""
};
var LIVE_FORM_CLASSES = {
  base: "w3f-live-form",
  active: "w3f-live-form--active"
};

// src/INPUTS/LiveForm/LiveForm.utils.ts
function buildLiveFormClasses(className, hasValues, unstyled) {
  const base = LIVE_FORM_CLASSES.base;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    hasValues && LIVE_FORM_CLASSES.active,
    className
  ].filter(Boolean).join(" ");
}

// src/INPUTS/LiveForm/LiveForm.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var LiveForm = ({
  children,
  initialValues = LIVE_FORM_DEFAULTS.initialValues,
  onValuesChange,
  unstyled = LIVE_FORM_DEFAULTS.unstyled,
  className = LIVE_FORM_DEFAULTS.className,
  ...props
}) => {
  const [values, setValues] = useState8({ ...initialValues });
  const [errors, setErrors] = useState8({});
  const [touched, setTouched] = useState8({});
  const valuesRef = useRef4(values);
  valuesRef.current = values;
  const listenersRef = useRef4(/* @__PURE__ */ new Map());
  const notifyField = useCallback3((name, value) => {
    const subs = listenersRef.current.get(name);
    if (subs) {
      subs.forEach((fn) => fn(value));
    }
  }, []);
  const setValuesAndNotify = useCallback3((updater) => {
    setValues((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      for (const key of Object.keys(next)) {
        if (next[key] !== prev[key]) {
          notifyField(key, next[key]);
        }
      }
      return next;
    });
  }, [notifyField]);
  const setFieldValue = useCallback3((name, value) => {
    setValuesAndNotify((prev) => ({ ...prev, [name]: value }));
  }, [setValuesAndNotify]);
  const setFieldError = useCallback3((name, error) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);
  const clearFieldError = useCallback3((name) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);
  const resetForm = useCallback3(() => {
    setValuesAndNotify({ ...initialValues });
    setErrors({});
    setTouched({});
  }, [initialValues, setValuesAndNotify]);
  useEffect3(() => {
    if (onValuesChange) {
      onValuesChange(values);
    }
  }, [values, onValuesChange]);
  const handleChange = useCallback3(
    (e) => {
      const { name } = e.target;
      const val = getFieldValue(e);
      setFieldValue(name, val);
    },
    [setFieldValue]
  );
  const handleBlur = useCallback3(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
    },
    []
  );
  const dispatchValue = useMemo2(() => ({
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    clearFieldError,
    setErrors,
    setTouched,
    resetForm
  }), [handleChange, handleBlur, setFieldValue, setFieldError, clearFieldError, resetForm]);
  const metaValue = useMemo2(() => ({
    errors,
    touched,
    isSubmitting: false
  }), [errors, touched]);
  const fieldStore = useMemo2(() => ({
    getFieldValue: (name) => valuesRef.current[name],
    getValues: () => valuesRef.current,
    subscribe: (name, listener) => {
      if (!listenersRef.current.has(name)) {
        listenersRef.current.set(name, /* @__PURE__ */ new Set());
      }
      listenersRef.current.get(name).add(listener);
      return () => {
        const subs = listenersRef.current.get(name);
        if (subs) {
          subs.delete(listener);
          if (subs.size === 0) listenersRef.current.delete(name);
        }
      };
    }
  }), []);
  const contextValue = useMemo2(
    () => ({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldValue,
      setFieldError,
      clearFieldError,
      setErrors,
      setTouched,
      resetForm,
      isSubmitting: false
    }),
    [values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldError, clearFieldError, resetForm]
  );
  const hasValues = Object.values(values).some((v) => v !== "" && v !== void 0 && v !== null);
  const containerClasses = buildLiveFormClasses(className, hasValues, unstyled);
  return /* @__PURE__ */ jsx12(FormDispatchContext.Provider, { value: dispatchValue, children: /* @__PURE__ */ jsx12(FormMetaContext.Provider, { value: metaValue, children: /* @__PURE__ */ jsx12(FormFieldStoreContext.Provider, { value: fieldStore, children: /* @__PURE__ */ jsx12(FormContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx12(
    "div",
    {
      className: containerClasses,
      ...props,
      children
    }
  ) }) }) }) });
};
LiveForm.displayName = "LiveForm";

// src/INPUTS/NumberField/NumberField.tsx
import { forwardRef as forwardRef8, useId as useId6, useState as useState10 } from "react";

// src/INPUTS/NumberField/NumberField.constants.ts
var NUMBERFIELD_CLASSES = {
  container: "w3f-input-container",
  wrapper: "w3f-input-wrapper w3f-numberfield-wrapper",
  wrapperSizes: {
    sm: "w3f-numberfield-wrapper--sm",
    md: "",
    lg: "w3f-numberfield-wrapper--lg"
  },
  input: "w3f-input w3f-input--has-trailing w3f-numberfield-input",
  inputWithLeading: "w3f-input--has-leading",
  spinButtons: "w3f-numberfield-spin-buttons",
  spinButton: "w3f-numberfield-spin-button",
  spinUp: "w3f-numberfield-spin-button--up",
  spinDown: "w3f-numberfield-spin-button--down",
  label: "w3f-input-label",
  labelFloating: "w3f-input-label--floating",
  labelShifted: "w3f-input-label--shifted",
  required: "w3f-input-required",
  iconLeading: "w3f-input-icon w3f-input-icon--leading",
  message: "w3f-input-message",
  messageError: "w3f-input-message--error",
  messageHelper: "w3f-input-message--helper",
  paddingX: "w3f-px-1"
};
var NUMBERFIELD_DEFAULTS = {
  min: -Infinity,
  max: Infinity,
  step: 1,
  size: "md",
  disabled: false,
  required: false,
  autoFocus: false,
  unstyled: false
};
var NUMBERFIELD_VARIANT_CLASSES = {
  solid: "w3f-number-field--solid",
  outlined: "w3f-number-field--outlined",
  ghost: "w3f-number-field--ghost",
  soft: "w3f-number-field--soft"
};

// src/INPUTS/NumberField/NumberField.utils.ts
function roundToPrecision(num, precision) {
  if (precision === void 0) return num;
  return Number(num.toFixed(precision));
}
function clampValue(num, min, max, precision) {
  const clamped = Math.max(min, Math.min(max, num));
  return roundToPrecision(clamped, precision);
}
function isValidNumber(str) {
  if (str === "" || str === "-" || str === ".") return false;
  return !isNaN(Number(str));
}
function formatValue(val, precision) {
  if (val === "" || val === null || val === void 0) return "";
  const num = Number(val);
  if (isNaN(num)) return "";
  return precision !== void 0 ? num.toFixed(precision) : String(num);
}
function buildWrapperClasses3(size, unstyled, variant) {
  if (unstyled) {
    return [
      NUMBERFIELD_CLASSES.wrapper,
      "w3f-number-field--unstyled"
    ].filter(Boolean).join(" ");
  }
  return [
    NUMBERFIELD_CLASSES.wrapper,
    size !== "md" ? NUMBERFIELD_CLASSES.wrapperSizes[size] : "",
    variant && NUMBERFIELD_VARIANT_CLASSES[variant]
  ].filter(Boolean).join(" ");
}
function buildInputClasses3(hasLeading, className) {
  return [
    NUMBERFIELD_CLASSES.input,
    hasLeading && NUMBERFIELD_CLASSES.inputWithLeading,
    className
  ].filter(Boolean).join(" ");
}
function buildLabelClasses3(isFloating, showShifted) {
  return [
    NUMBERFIELD_CLASSES.label,
    isFloating && NUMBERFIELD_CLASSES.labelFloating,
    showShifted && NUMBERFIELD_CLASSES.labelShifted
  ].filter(Boolean).join(" ");
}

// src/INPUTS/NumberField/NumberField.hooks.ts
import { useContext as useContext10, useState as useState9, useCallback as useCallback4, useEffect as useEffect4 } from "react";
var useNumberFieldFormContext = () => {
  return useContext10(FormContext);
};
var useNumberField = ({
  name,
  value,
  min,
  max,
  step,
  precision,
  disabled,
  onChange
}) => {
  const formContext = useNumberFieldFormContext();
  const isFormControlled = !!(formContext && name);
  const fieldValue = isFormControlled ? formContext.values[name] ?? "" : value ?? "";
  const fieldError = isFormControlled ? formContext.errors[name] : void 0;
  const [internalValue, setInternalValue] = useState9(String(fieldValue));
  useEffect4(() => {
    setInternalValue(String(fieldValue));
  }, [fieldValue]);
  const notifyChange = useCallback4(
    (newValue) => {
      if (isFormControlled && formContext && name) {
        const syntheticEvent = {
          target: { name, value: newValue, type: "text" }
        };
        formContext.handleChange(syntheticEvent);
      }
      if (onChange) onChange(newValue);
    },
    [isFormControlled, formContext, name, onChange]
  );
  const handleInputChange = (e) => {
    const raw = e.target.value;
    if (raw === "" || raw === "-" || raw === "." || raw === "-.") {
      setInternalValue(raw);
      return;
    }
    if (!isValidNumber(raw)) return;
    setInternalValue(raw);
    const num = Number(raw);
    if (!isNaN(num)) {
      notifyChange(clampValue(num, min, max, precision));
    }
  };
  const handleSpin = useCallback4(
    (direction) => {
      if (disabled) return;
      const current = Number(internalValue) || 0;
      const next = current + (direction === "increment" ? step : -step);
      const clamped = clampValue(next, min, max, precision);
      const formatted = formatValue(clamped, precision);
      setInternalValue(formatted);
      notifyChange(clamped);
    },
    [disabled, internalValue, step, min, max, precision, notifyChange]
  );
  const handleBlur = (e, onBlurProp) => {
    const current = e.target.value;
    if (current === "" || current === "-" || current === ".") {
      setInternalValue("");
      notifyChange("");
    } else if (isValidNumber(current)) {
      const num = Number(current);
      const clamped = clampValue(num, min, max, precision);
      setInternalValue(formatValue(clamped, precision));
      if (String(clamped) !== String(fieldValue)) {
        notifyChange(clamped);
      }
    }
    if (isFormControlled && formContext) formContext.handleBlur(e);
    if (onBlurProp) onBlurProp(e);
  };
  const isAtMax = !isNaN(Number(internalValue)) && Number(internalValue) >= max;
  const isAtMin = !isNaN(Number(internalValue)) && Number(internalValue) <= min;
  return {
    formContext,
    isFormControlled,
    fieldError,
    internalValue,
    handleInputChange,
    handleSpin,
    handleBlur,
    notifyChange,
    isAtMax,
    isAtMin
  };
};

// src/INPUTS/NumberField/NumberField.tsx
import { useBridgeBind as useBridgeBind7 } from "@w3f/bridge";
import { jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
var NumberField = forwardRef8(
  ({
    label,
    name,
    value = "",
    onChange,
    min = NUMBERFIELD_DEFAULTS.min,
    max = NUMBERFIELD_DEFAULTS.max,
    step = NUMBERFIELD_DEFAULTS.step,
    precision,
    error,
    helperText,
    disabled = NUMBERFIELD_DEFAULTS.disabled,
    required = NUMBERFIELD_DEFAULTS.required,
    autoComplete,
    autoFocus = NUMBERFIELD_DEFAULTS.autoFocus,
    size = NUMBERFIELD_DEFAULTS.size,
    leadingIcon,
    placeholder,
    className = "",
    unstyled = NUMBERFIELD_DEFAULTS.unstyled,
    bindId,
    variant,
    onBlur: onBlurProp,
    onFocus: onFocusProp,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState10(false);
    const inputId = useId6();
    const { dispatch } = useBridgeBind7({ bindId });
    const bridgeOnChange = (v) => {
      if (v !== "") dispatch("change", { value: v });
      if (onChange) onChange(v);
    };
    const {
      formContext,
      isFormControlled,
      fieldError: contextError,
      internalValue,
      handleInputChange,
      handleSpin,
      handleBlur: handleBlurHook,
      isAtMax,
      isAtMin
    } = useNumberField({
      name,
      value,
      min,
      max,
      step,
      precision,
      disabled,
      onChange: bridgeOnChange
    });
    const fieldError = isFormControlled ? contextError : error;
    const handleFocus = (e) => {
      if (!disabled) setIsFocused(true);
      if (onFocusProp) onFocusProp(e);
    };
    const handleBlur = (e) => {
      setIsFocused(false);
      handleBlurHook(e, onBlurProp);
    };
    const handleKeyDown = (e) => {
      if (disabled) return;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handleSpin("increment");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleSpin("decrement");
      }
      if (props.onKeyDown) props.onKeyDown(e);
    };
    const hasValue = String(internalValue) !== "";
    const isFloating = isFocused || hasValue || Boolean(placeholder);
    const hasError = Boolean(fieldError);
    return /* @__PURE__ */ jsxs8("div", { className: `${NUMBERFIELD_CLASSES.container} ${className}`, children: [
      /* @__PURE__ */ jsxs8("div", { className: buildWrapperClasses3(size, unstyled, variant), children: [
        leadingIcon && /* @__PURE__ */ jsx13("div", { className: NUMBERFIELD_CLASSES.iconLeading, children: leadingIcon }),
        /* @__PURE__ */ jsx13(
          "input",
          {
            ref,
            id: inputId,
            type: "text",
            inputMode: "decimal",
            name,
            value: internalValue,
            onChange: handleInputChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onKeyDown: handleKeyDown,
            disabled,
            required,
            autoComplete,
            autoFocus,
            placeholder,
            "aria-invalid": hasError,
            "aria-describedby": fieldError ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0,
            "aria-valuemin": min,
            "aria-valuemax": max,
            "aria-valuenow": !isNaN(Number(internalValue)) ? Number(internalValue) : void 0,
            className: buildInputClasses3(Boolean(leadingIcon), className),
            ...props
          }
        ),
        /* @__PURE__ */ jsxs8("div", { className: NUMBERFIELD_CLASSES.spinButtons, children: [
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": "Incrementar valor",
              className: `${NUMBERFIELD_CLASSES.spinButton} ${NUMBERFIELD_CLASSES.spinUp}`,
              onClick: () => handleSpin("increment"),
              disabled: disabled || isAtMax,
              children: "\u25B2"
            }
          ),
          /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": "Decrementar valor",
              className: `${NUMBERFIELD_CLASSES.spinButton} ${NUMBERFIELD_CLASSES.spinDown}`,
              onClick: () => handleSpin("decrement"),
              disabled: disabled || isAtMin,
              children: "\u25BC"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs8(
          "label",
          {
            htmlFor: inputId,
            className: buildLabelClasses3(
              isFloating,
              !isFloating && Boolean(leadingIcon)
            ),
            children: [
              label,
              required && /* @__PURE__ */ jsx13("span", { className: NUMBERFIELD_CLASSES.required, children: " *" })
            ]
          }
        )
      ] }),
      (fieldError || helperText) && /* @__PURE__ */ jsx13("div", { className: NUMBERFIELD_CLASSES.paddingX, children: fieldError ? /* @__PURE__ */ jsx13(
        "p",
        {
          id: `${inputId}-error`,
          className: `${NUMBERFIELD_CLASSES.message} ${NUMBERFIELD_CLASSES.messageError}`,
          role: "alert",
          children: fieldError
        }
      ) : /* @__PURE__ */ jsx13(
        "p",
        {
          id: `${inputId}-helper`,
          className: `${NUMBERFIELD_CLASSES.message} ${NUMBERFIELD_CLASSES.messageHelper}`,
          children: helperText
        }
      ) })
    ] });
  }
);
NumberField.displayName = "NumberField";

// src/INPUTS/PasswordField/PasswordField.tsx
import { forwardRef as forwardRef9, useId as useId7, useState as useState12 } from "react";
import { Lock as Lock2, Eye as Eye2, EyeOff as EyeOff2 } from "lucide-react";

// src/INPUTS/PasswordField/PasswordField.constants.ts
var PASSWORDFIELD_CLASSES = {
  container: "w3f-input-container",
  wrapper: "w3f-input-wrapper",
  wrapperSizes: {
    sm: "w3f-input-wrapper--sm",
    md: "",
    lg: "w3f-input-wrapper--lg"
  },
  input: "w3f-input",
  hasLeading: "w3f-input--has-leading",
  hasTrailing: "w3f-input--has-trailing",
  label: "w3f-input-label",
  labelFloating: "w3f-input-label--floating",
  labelShifted: "w3f-input-label--shifted",
  required: "w3f-input-required",
  iconLeading: "w3f-input-icon w3f-input-icon--leading",
  iconTrailing: "w3f-input-icon w3f-input-icon--trailing w3f-input-icon--clickable",
  message: "w3f-input-message",
  messageError: "w3f-input-message--error",
  messageHelper: "w3f-input-message--helper",
  paddingX: "w3f-px-1",
  strength: "w3f-password-strength",
  strengthBar: "w3f-password-strength__bar",
  strengthSegment: "w3f-password-strength__segment",
  strengthSegmentActive: "w3f-password-strength__segment--active",
  strengthLabel: "w3f-password-strength__label",
  strengthModifiers: {
    weak: "w3f-password-strength--weak",
    medium: "w3f-password-strength--medium",
    strong: "w3f-password-strength--strong"
  }
};
var PASSWORDFIELD_DEFAULTS = {
  size: "md",
  disabled: false,
  required: false,
  showStrength: false,
  unstyled: false
};
var STRENGTH_LABELS = {
  weak: "D\xE9bil",
  medium: "Media",
  strong: "Fuerte"
};
var STRENGTH_SEGMENTS = {
  weak: 1,
  medium: 2,
  strong: 3
};

// src/INPUTS/PasswordField/PasswordField.utils.ts
function getPasswordStrength(password) {
  if (!password) return null;
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password)
  ];
  const score = checks.filter(Boolean).length;
  if (score <= 2) return "weak";
  if (score <= 4) return "medium";
  return "strong";
}
function buildContainerClasses3(className, unstyled) {
  const base = PASSWORDFIELD_CLASSES.container;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, className].filter(Boolean).join(" ");
}
function buildWrapperClasses4(size) {
  return [
    PASSWORDFIELD_CLASSES.wrapper,
    PASSWORDFIELD_CLASSES.wrapperSizes[size]
  ].filter(Boolean).join(" ");
}
function buildInputClasses4() {
  return [
    PASSWORDFIELD_CLASSES.input,
    PASSWORDFIELD_CLASSES.hasLeading,
    PASSWORDFIELD_CLASSES.hasTrailing
  ].filter(Boolean).join(" ");
}
function buildLabelClasses4(isFloating) {
  return [
    PASSWORDFIELD_CLASSES.label,
    isFloating && PASSWORDFIELD_CLASSES.labelFloating,
    !isFloating && PASSWORDFIELD_CLASSES.labelShifted
  ].filter(Boolean).join(" ");
}
function buildStrengthSegmentClasses(segmentIndex, activeSegments, strength) {
  const isActive = segmentIndex < activeSegments;
  return [
    PASSWORDFIELD_CLASSES.strengthSegment,
    isActive && PASSWORDFIELD_CLASSES.strengthSegmentActive,
    isActive && PASSWORDFIELD_CLASSES.strengthModifiers[strength]
  ].filter(Boolean).join(" ");
}

// src/INPUTS/PasswordField/PasswordField.hooks.ts
import { useContext as useContext11, useState as useState11 } from "react";
var usePasswordFieldFormContext = () => {
  return useContext11(FormContext);
};
var usePasswordFieldFocus = () => {
  const [isFocused, setIsFocused] = useState11(false);
  return {
    isFocused,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  };
};
var usePasswordVisibility = () => {
  const [showPassword, setShowPassword] = useState11(false);
  return {
    showPassword,
    toggleVisibility: () => setShowPassword((prev) => !prev)
  };
};

// src/INPUTS/PasswordField/PasswordField.tsx
import { jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
var PasswordField = forwardRef9(
  ({
    label,
    name,
    value: externalValue,
    onChange: externalOnChange,
    error: propError,
    helperText,
    disabled = PASSWORDFIELD_DEFAULTS.disabled,
    required = PASSWORDFIELD_DEFAULTS.required,
    size = PASSWORDFIELD_DEFAULTS.size,
    showStrength = PASSWORDFIELD_DEFAULTS.showStrength,
    unstyled = PASSWORDFIELD_DEFAULTS.unstyled,
    className = "",
    onBlur: onBlurProp,
    onFocus: onFocusProp,
    placeholder,
    autoFocus,
    ...props
  }, ref) => {
    const formContext = usePasswordFieldFormContext();
    const isFormControlled = !!(formContext && name);
    const { isFocused, onFocus: onFocusHook, onBlur: onBlurHook } = usePasswordFieldFocus();
    const { showPassword, toggleVisibility } = usePasswordVisibility();
    const [internalValue, setInternalValue] = useState12("");
    const inputId = useId7();
    const currentValue = isFormControlled ? formContext.values[name] ?? "" : externalValue !== void 0 ? externalValue : internalValue;
    const fieldError = isFormControlled ? formContext.errors[name] : propError;
    const hasError = Boolean(fieldError);
    const handleChange = (e) => {
      const val = e.target.value;
      if (isFormControlled && formContext) {
        formContext.handleChange(e);
      } else if (externalOnChange) {
        externalOnChange(e);
      } else {
        setInternalValue(val);
      }
    };
    const handleFocus = (e) => {
      if (!disabled) onFocusHook();
      if (onFocusProp) onFocusProp(e);
    };
    const handleBlur = (e) => {
      onBlurHook();
      if (isFormControlled && formContext) formContext.handleBlur(e);
      if (onBlurProp) onBlurProp(e);
    };
    const hasValue = String(currentValue ?? "").length > 0;
    const isFloating = isFocused || hasValue || Boolean(placeholder);
    const strength = showStrength ? getPasswordStrength(String(currentValue ?? "")) : null;
    const activeSegments = strength ? STRENGTH_SEGMENTS[strength] : 0;
    return /* @__PURE__ */ jsxs9("div", { className: buildContainerClasses3(className, unstyled), children: [
      /* @__PURE__ */ jsxs9("div", { className: buildWrapperClasses4(size), children: [
        /* @__PURE__ */ jsx14("div", { className: PASSWORDFIELD_CLASSES.iconLeading, children: /* @__PURE__ */ jsx14(Lock2, { size: 16 }) }),
        /* @__PURE__ */ jsx14(
          "input",
          {
            ref,
            id: inputId,
            type: showPassword ? "text" : "password",
            name,
            value: currentValue,
            onChange: handleChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            disabled,
            required,
            placeholder,
            autoFocus,
            autoComplete: showPassword ? "off" : "current-password",
            "aria-invalid": hasError,
            "aria-describedby": fieldError ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0,
            className: buildInputClasses4(),
            ...props
          }
        ),
        /* @__PURE__ */ jsx14(
          "button",
          {
            type: "button",
            tabIndex: -1,
            onClick: toggleVisibility,
            disabled,
            "aria-label": showPassword ? "Ocultar contrase\xF1a" : "Mostrar contrase\xF1a",
            className: PASSWORDFIELD_CLASSES.iconTrailing,
            style: { background: "none", border: "none", padding: 0, cursor: disabled ? "not-allowed" : "pointer" },
            children: showPassword ? /* @__PURE__ */ jsx14(EyeOff2, { size: 16 }) : /* @__PURE__ */ jsx14(Eye2, { size: 16 })
          }
        ),
        /* @__PURE__ */ jsxs9("label", { htmlFor: inputId, className: buildLabelClasses4(isFloating), children: [
          label ?? "Contrase\xF1a",
          required && /* @__PURE__ */ jsx14("span", { className: PASSWORDFIELD_CLASSES.required, children: " *" })
        ] })
      ] }),
      showStrength && hasValue && strength && /* @__PURE__ */ jsxs9("div", { className: `${PASSWORDFIELD_CLASSES.paddingX} ${PASSWORDFIELD_CLASSES.strength}`, children: [
        /* @__PURE__ */ jsx14("div", { className: PASSWORDFIELD_CLASSES.strengthBar, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx14(
          "div",
          {
            className: buildStrengthSegmentClasses(i, activeSegments, strength)
          },
          i
        )) }),
        /* @__PURE__ */ jsx14(
          "span",
          {
            className: `${PASSWORDFIELD_CLASSES.strengthLabel} ${PASSWORDFIELD_CLASSES.strengthModifiers[strength]}`,
            children: STRENGTH_LABELS[strength]
          }
        )
      ] }),
      /* @__PURE__ */ jsx14("div", { className: PASSWORDFIELD_CLASSES.paddingX, children: fieldError ? /* @__PURE__ */ jsx14(
        "p",
        {
          id: `${inputId}-error`,
          className: `${PASSWORDFIELD_CLASSES.message} ${PASSWORDFIELD_CLASSES.messageError}`,
          role: "alert",
          children: fieldError
        }
      ) : helperText ? /* @__PURE__ */ jsx14(
        "p",
        {
          id: `${inputId}-helper`,
          className: `${PASSWORDFIELD_CLASSES.message} ${PASSWORDFIELD_CLASSES.messageHelper}`,
          children: helperText
        }
      ) : null })
    ] });
  }
);
PasswordField.displayName = "PasswordField";

// src/INPUTS/RadioButton/RadioButton.tsx
import { forwardRef as forwardRef10, useState as useState13, useEffect as useEffect5, useId as useId8 } from "react";

// src/INPUTS/RadioButton/RadioButton.constants.ts
var RADIO_GROUP_DEFAULTS = {
  defaultValue: "",
  direction: "vertical",
  showSelection: true,
  required: false,
  className: "",
  unstyled: false
};
var RADIO_CLASSES = {
  button: "radio-material",
  buttonDisabled: "radio-disabled",
  checkmark: "radio-checkmark",
  spacingH: "w3f-mr-6",
  spacingV: "w3f-mb-2",
  group: "w3f-radio-group",
  fieldset: "w3f-border w3f-border-gray-300 w3f-rounded-lg w3f-p-4",
  legend: "w3f-text-base w3f-font-semibold w3f-text-gray-800 w3f-px-2",
  legendRequired: "w3f-text-error w3f-ml-1",
  radioContainer: {
    horizontal: "w3f-flex w3f-flex-row w3f-flex-wrap",
    vertical: "w3f-flex w3f-flex-col"
  },
  error: "w3f-mt-2 w3f-text-sm w3f-text-error w3f-px-4",
  selectionPanel: "w3f-bg-primary w3f-text-white w3f-p-3 w3f-rounded-lg w3f-mt-3 w3f-mx-4 w3f-shadow-sm",
  selectionText: "w3f-text-sm"
};

// src/INPUTS/RadioButton/RadioButton.utils.ts
function buildRadioButtonClasses(direction, disabled, className, unstyled) {
  if (unstyled) {
    return [RADIO_CLASSES.button, "w3f-radio--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    RADIO_CLASSES.button,
    direction === "horizontal" ? RADIO_CLASSES.spacingH : RADIO_CLASSES.spacingV,
    disabled && RADIO_CLASSES.buttonDisabled,
    className
  ].filter(Boolean).join(" ");
}
function buildRadioGroupContainerClasses(direction, unstyled) {
  if (unstyled) {
    return [RADIO_CLASSES.radioContainer[direction], "w3f-radio--unstyled"].filter(Boolean).join(" ");
  }
  return RADIO_CLASSES.radioContainer[direction];
}

// src/INPUTS/RadioButton/RadioButton.hooks.ts
import { createContext as createContext2, useContext as useContext12 } from "react";
var RadioGroupContext = createContext2(null);
var useRadioGroup = () => {
  const context = useContext12(RadioGroupContext);
  if (!context) {
    throw new Error("RadioButton debe usarse dentro de un RadioGroup");
  }
  return context;
};
var useRadioFormContext = () => {
  return useContext12(FormContext);
};

// src/INPUTS/RadioButton/RadioButton.tsx
import { useBridgeBind as useBridgeBind8 } from "@w3f/bridge";
import { jsx as jsx15, jsxs as jsxs10 } from "react/jsx-runtime";
var RadioButton = forwardRef10(({
  label,
  value,
  disabled = false,
  className = "",
  unstyled = RADIO_GROUP_DEFAULTS.unstyled
}, ref) => {
  const { selectedValue, onChange, name, direction } = useRadioGroup();
  const radioId = useId8();
  const isChecked = selectedValue === value;
  const handleChange = (e) => {
    if (!disabled) onChange(e.target.value);
  };
  return /* @__PURE__ */ jsxs10(
    "label",
    {
      className: buildRadioButtonClasses(direction, disabled, className, unstyled),
      htmlFor: radioId,
      children: [
        /* @__PURE__ */ jsx15(
          "input",
          {
            ref,
            id: radioId,
            type: "radio",
            name,
            value,
            checked: isChecked,
            onChange: handleChange,
            disabled
          }
        ),
        /* @__PURE__ */ jsx15("span", { className: RADIO_CLASSES.checkmark }),
        /* @__PURE__ */ jsx15("span", { className: disabled ? "w3f-text-gray-400" : "", children: label })
      ]
    }
  );
});
RadioButton.displayName = "RadioButton";
var RadioGroup = forwardRef10(({
  children,
  name,
  value: controlledValue,
  defaultValue = RADIO_GROUP_DEFAULTS.defaultValue,
  onChange,
  direction = RADIO_GROUP_DEFAULTS.direction,
  label,
  showSelection = RADIO_GROUP_DEFAULTS.showSelection,
  className = RADIO_GROUP_DEFAULTS.className,
  error,
  required = RADIO_GROUP_DEFAULTS.required,
  onBlur,
  unstyled = RADIO_GROUP_DEFAULTS.unstyled,
  bindId,
  ...props
}, ref) => {
  const groupId = useId8();
  const [internalValue, setInternalValue] = useState13(defaultValue);
  const formContext = useRadioFormContext();
  const { dispatch } = useBridgeBind8({ bindId });
  const isFormControlled = !!(formContext && name);
  const selectedValue = isFormControlled ? formContext.values[name] ?? defaultValue : controlledValue !== void 0 ? controlledValue : internalValue;
  const fieldError = isFormControlled ? formContext.errors[name] : error;
  useEffect5(() => {
    if (!isFormControlled && controlledValue !== void 0) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue, isFormControlled]);
  const handleChange = (newValue) => {
    if (isFormControlled && formContext && name) {
      const syntheticEvent = {
        target: { name, value: newValue, type: "radio" }
      };
      formContext.handleChange(syntheticEvent);
    } else if (controlledValue === void 0) {
      setInternalValue(newValue);
    }
    dispatch("change", { value: newValue });
    if (onChange) onChange(newValue);
  };
  const handleBlur = () => {
    if (isFormControlled && formContext && name) {
      const syntheticEvent = { target: { name } };
      formContext.handleBlur(syntheticEvent);
    }
    if (onBlur) onBlur();
  };
  const contextValue = {
    selectedValue,
    onChange: handleChange,
    name: name || groupId,
    direction
  };
  const hasError = Boolean(fieldError);
  return /* @__PURE__ */ jsxs10("div", { ref, className, children: [
    /* @__PURE__ */ jsxs10("fieldset", { className: RADIO_CLASSES.fieldset, children: [
      label && /* @__PURE__ */ jsxs10("legend", { className: RADIO_CLASSES.legend, children: [
        label,
        required && /* @__PURE__ */ jsx15("span", { className: RADIO_CLASSES.legendRequired, children: "*" })
      ] }),
      /* @__PURE__ */ jsx15(
        "div",
        {
          className: buildRadioGroupContainerClasses(direction, unstyled),
          role: "radiogroup",
          "aria-label": label,
          "aria-required": required,
          "aria-invalid": hasError,
          onBlur: handleBlur,
          children: /* @__PURE__ */ jsx15(RadioGroupContext.Provider, { value: contextValue, children })
        }
      )
    ] }),
    fieldError && /* @__PURE__ */ jsx15("div", { className: RADIO_CLASSES.error, role: "alert", children: fieldError }),
    showSelection && selectedValue && !fieldError && /* @__PURE__ */ jsx15(
      "div",
      {
        className: RADIO_CLASSES.selectionPanel,
        role: "status",
        "aria-live": "polite",
        style: { backgroundColor: "var(--w3f-primary-600)" },
        children: /* @__PURE__ */ jsxs10("p", { className: RADIO_CLASSES.selectionText, children: [
          "Opci\xF3n seleccionada: ",
          /* @__PURE__ */ jsx15("strong", { children: selectedValue })
        ] })
      }
    )
  ] });
});
RadioGroup.displayName = "RadioGroup";

// src/INPUTS/RangeSlider/RangeSlider.tsx
import { forwardRef as forwardRef11, useState as useState14, useRef as useRef5, useEffect as useEffect6, useCallback as useCallback5 } from "react";

// src/INPUTS/RangeSlider/RangeSlider.constants.ts
var RANGE_SLIDER_DEFAULTS = {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  ariaLabel: "Selector de rango",
  className: "",
  unstyled: false
};
var RANGE_SLIDER_CLASSES = {
  wrapper: "w3f-range-slider-wrapper",
  isDisabled: "is-disabled",
  hasError: "has-error",
  track: "w3f-range-track",
  active: "w3f-range-active",
  thumb: "w3f-range-thumb-custom",
  thumbDragging: "is-dragging",
  thumbCloseMin: "is-close-min",
  thumbCloseMax: "is-close-max",
  clickable: "w3f-range-clickable-area",
  labelMin: "w3f-range-label w3f-range-label-min",
  labelMax: "w3f-range-label w3f-range-label-max",
  labelVisible: "w3f-range-label-visible",
  labelClose: "is-close",
  labelArrow: "w3f-range-label-arrow",
  inputA11y: "w3f-range-input-a11y",
  inputMin: "w3f-range-input-min",
  inputMax: "w3f-range-input-max",
  valueLabelWrapper: "w3f-value-label-wrapper",
  valueLabelGroup: "w3f-value-label-group",
  valueLabelText: "w3f-value-label-text",
  valueLabelValue: "w3f-value-label-value",
  srOnly: "w3f-sr-only",
  error: "w3f-mt-2 w3f-text-sm w3f-text-error"
};

// src/INPUTS/RangeSlider/RangeSlider.utils.ts
function snapToStep(value, step) {
  return Math.round(value / step) * step;
}
function getPercent(value, min, max) {
  return Math.round((value - min) / (max - min) * 100);
}
function defaultFormatLabel(value) {
  return value;
}

// src/INPUTS/RangeSlider/RangeSlider.hooks.ts
import { useContext as useContext13 } from "react";
var useRangeSliderFormContext = () => {
  return useContext13(FormContext);
};

// src/INPUTS/RangeSlider/RangeSlider.tsx
import { useBridgeBind as useBridgeBind9 } from "@w3f/bridge";
import { jsx as jsx16, jsxs as jsxs11 } from "react/jsx-runtime";
var RangeSlider = forwardRef11(({
  name,
  min = RANGE_SLIDER_DEFAULTS.min,
  max = RANGE_SLIDER_DEFAULTS.max,
  step = RANGE_SLIDER_DEFAULTS.step,
  value: controlledValue,
  defaultMinValue,
  defaultMaxValue,
  onChange,
  formatLabel,
  disabled = RANGE_SLIDER_DEFAULTS.disabled,
  ariaLabel = RANGE_SLIDER_DEFAULTS.ariaLabel,
  error,
  className = RANGE_SLIDER_DEFAULTS.className,
  onBlur,
  unstyled = RANGE_SLIDER_DEFAULTS.unstyled,
  bindId,
  ...props
}, ref) => {
  const formContext = useRangeSliderFormContext();
  const isFormControlled = !!(formContext && name);
  const { dispatch } = useBridgeBind9({ bindId });
  const [minVal, setMinVal] = useState14(() => {
    const initial = defaultMinValue !== void 0 ? defaultMinValue : min;
    return snapToStep(Math.max(min, Math.min(initial, max - step)), step);
  });
  const [maxVal, setMaxVal] = useState14(() => {
    const initial = defaultMaxValue !== void 0 ? defaultMaxValue : max;
    return snapToStep(Math.max(min + step, Math.min(initial, max)), step);
  });
  const [isDraggingMin, setIsDraggingMin] = useState14(false);
  const [isDraggingMax, setIsDraggingMax] = useState14(false);
  const [announcement, setAnnouncement] = useState14("");
  const rangeRef = useRef5(null);
  const minThumbRef = useRef5(null);
  const maxThumbRef = useRef5(null);
  const fieldValue = isFormControlled ? formContext.values[name] ?? { min: minVal, max: maxVal } : controlledValue ?? { min: minVal, max: maxVal };
  const fieldError = isFormControlled ? formContext.errors[name] : error;
  useEffect6(() => {
    if (isFormControlled || controlledValue) {
      if (fieldValue.min !== void 0) setMinVal(fieldValue.min);
      if (fieldValue.max !== void 0) setMaxVal(fieldValue.max);
    }
  }, [fieldValue, isFormControlled, controlledValue]);
  const formatValue2 = useCallback5(
    (value) => formatLabel ? formatLabel(value) : defaultFormatLabel(value),
    [formatLabel]
  );
  const notifyChange = useCallback5(
    (newMin, newMax) => {
      const newValue = { min: newMin, max: newMax };
      if (isFormControlled && formContext && name) {
        const syntheticEvent = { target: { name, value: newValue, type: "range" } };
        formContext.handleChange(syntheticEvent);
      }
      dispatch("change", { value: newValue });
      if (onChange && !disabled) onChange(newValue);
    },
    [isFormControlled, formContext, name, onChange, disabled, dispatch]
  );
  useEffect6(() => {
    const minPercent2 = getPercent(minVal, min, max);
    const maxPercent2 = getPercent(maxVal, min, max);
    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent2}%`;
      rangeRef.current.style.width = `${maxPercent2 - minPercent2}%`;
    }
  }, [minVal, maxVal, min, max]);
  const handleMinChange = (e) => {
    if (disabled) return;
    const value = snapToStep(Math.min(+e.target.value, maxVal - step), step);
    setMinVal(value);
    setAnnouncement(`Valor m\xEDnimo: ${formatValue2(value)}`);
    notifyChange(value, maxVal);
  };
  const handleMaxChange = (e) => {
    if (disabled) return;
    const value = snapToStep(Math.max(+e.target.value, minVal + step), step);
    setMaxVal(value);
    setAnnouncement(`Valor m\xE1ximo: ${formatValue2(value)}`);
    notifyChange(minVal, value);
  };
  const handleBlur = () => {
    if (isFormControlled && formContext && name) {
      const syntheticEvent = { target: { name } };
      formContext.handleBlur(syntheticEvent);
    }
    if (onBlur) onBlur();
  };
  const handleDrag = (isMinThumb) => (e) => {
    if (disabled) return;
    e.preventDefault();
    const startX = e.clientX;
    const startVal = isMinThumb ? minVal : maxVal;
    const container = e.currentTarget.parentElement;
    if (!container) return;
    const containerWidth = container.getBoundingClientRect().width;
    isMinThumb ? setIsDraggingMin(true) : setIsDraggingMax(true);
    const handleMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaPercent = deltaX / containerWidth * 100;
      const deltaValue = deltaPercent / 100 * (max - min);
      const newValue = snapToStep(startVal + deltaValue, step);
      if (isMinThumb) {
        const clamped = Math.max(min, Math.min(newValue, maxVal - step));
        setMinVal(clamped);
        notifyChange(clamped, maxVal);
      } else {
        const clamped = Math.max(minVal + step, Math.min(newValue, max));
        setMaxVal(clamped);
        notifyChange(minVal, clamped);
      }
    };
    const handleEnd = () => {
      isMinThumb ? setIsDraggingMin(false) : setIsDraggingMax(false);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      handleBlur();
    };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
  };
  const handleTrackClick = (e) => {
    if (disabled || isDraggingMin || isDraggingMax) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width * 100;
    const clickValue = min + percent / 100 * (max - min);
    const distToMin = Math.abs(clickValue - minVal);
    const distToMax = Math.abs(clickValue - maxVal);
    e.preventDefault();
    if (distToMin <= distToMax) {
      const clamped = Math.max(min, snapToStep(Math.min(clickValue, maxVal - step), step));
      setMinVal(clamped);
      notifyChange(clamped, maxVal);
    } else {
      const clamped = Math.min(max, snapToStep(Math.max(clickValue, minVal + step), step));
      setMaxVal(clamped);
      notifyChange(minVal, clamped);
    }
  };
  const minPercent = getPercent(minVal, min, max);
  const maxPercent = getPercent(maxVal, min, max);
  const thumbsAreClose = Math.abs(maxPercent - minPercent) < 3;
  const hasError = Boolean(fieldError);
  return /* @__PURE__ */ jsxs11("div", { ref, style: { padding: "2rem 0" }, className, children: [
    /* @__PURE__ */ jsxs11(
      "div",
      {
        className: [
          RANGE_SLIDER_CLASSES.wrapper,
          unstyled && "w3f-range-slider--unstyled",
          !unstyled && disabled && RANGE_SLIDER_CLASSES.isDisabled,
          !unstyled && hasError && RANGE_SLIDER_CLASSES.hasError
        ].filter(Boolean).join(" "),
        role: "group",
        "aria-label": ariaLabel,
        children: [
          /* @__PURE__ */ jsx16(
            "div",
            {
              className: RANGE_SLIDER_CLASSES.srOnly,
              role: "status",
              "aria-live": "polite",
              "aria-atomic": "true",
              children: announcement
            }
          ),
          /* @__PURE__ */ jsxs11(
            "div",
            {
              className: [
                RANGE_SLIDER_CLASSES.labelMin,
                (isDraggingMin || thumbsAreClose) && RANGE_SLIDER_CLASSES.labelVisible,
                thumbsAreClose && RANGE_SLIDER_CLASSES.labelClose
              ].filter(Boolean).join(" "),
              style: { left: `${minPercent}%` },
              "aria-hidden": "true",
              children: [
                "Min: ",
                formatValue2(minVal),
                /* @__PURE__ */ jsx16("div", { className: RANGE_SLIDER_CLASSES.labelArrow })
              ]
            }
          ),
          /* @__PURE__ */ jsxs11(
            "div",
            {
              className: [
                RANGE_SLIDER_CLASSES.labelMax,
                (isDraggingMax || thumbsAreClose) && RANGE_SLIDER_CLASSES.labelVisible,
                thumbsAreClose && RANGE_SLIDER_CLASSES.labelClose
              ].filter(Boolean).join(" "),
              style: { left: `${maxPercent}%` },
              "aria-hidden": "true",
              children: [
                "Max: ",
                formatValue2(maxVal),
                /* @__PURE__ */ jsx16("div", { className: RANGE_SLIDER_CLASSES.labelArrow })
              ]
            }
          ),
          /* @__PURE__ */ jsx16("div", { className: RANGE_SLIDER_CLASSES.track, children: /* @__PURE__ */ jsx16("div", { ref: rangeRef, className: RANGE_SLIDER_CLASSES.active }) }),
          /* @__PURE__ */ jsx16(
            "div",
            {
              ref: minThumbRef,
              className: [
                RANGE_SLIDER_CLASSES.thumb,
                isDraggingMin && RANGE_SLIDER_CLASSES.thumbDragging,
                thumbsAreClose && RANGE_SLIDER_CLASSES.thumbCloseMin
              ].filter(Boolean).join(" "),
              style: { left: `${minPercent}%` },
              onMouseDown: handleDrag(true),
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx16(
            "div",
            {
              ref: maxThumbRef,
              className: [
                RANGE_SLIDER_CLASSES.thumb,
                isDraggingMax && RANGE_SLIDER_CLASSES.thumbDragging,
                thumbsAreClose && RANGE_SLIDER_CLASSES.thumbCloseMax
              ].filter(Boolean).join(" "),
              style: { left: `${maxPercent}%` },
              onMouseDown: handleDrag(false),
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx16(
            "div",
            {
              className: RANGE_SLIDER_CLASSES.clickable,
              onMouseDown: handleTrackClick,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx16(
            "input",
            {
              type: "range",
              name: name ? `${name}_min` : void 0,
              min,
              max,
              step,
              value: minVal,
              onChange: handleMinChange,
              onFocus: () => !disabled && setIsDraggingMin(true),
              onBlur: () => {
                setIsDraggingMin(false);
                handleBlur();
              },
              disabled,
              "aria-label": "Valor m\xEDnimo del rango",
              "aria-valuemin": min,
              "aria-valuemax": max,
              "aria-valuenow": minVal,
              "aria-valuetext": `Valor m\xEDnimo: ${formatValue2(minVal)}`,
              "aria-invalid": hasError,
              className: `${RANGE_SLIDER_CLASSES.inputA11y} ${RANGE_SLIDER_CLASSES.inputMin}`
            }
          ),
          /* @__PURE__ */ jsx16(
            "input",
            {
              type: "range",
              name: name ? `${name}_max` : void 0,
              min,
              max,
              step,
              value: maxVal,
              onChange: handleMaxChange,
              onFocus: () => !disabled && setIsDraggingMax(true),
              onBlur: () => {
                setIsDraggingMax(false);
                handleBlur();
              },
              disabled,
              "aria-label": "Valor m\xE1ximo del rango",
              "aria-valuemin": min,
              "aria-valuemax": max,
              "aria-valuenow": maxVal,
              "aria-valuetext": `Valor m\xE1ximo: ${formatValue2(maxVal)}`,
              "aria-invalid": hasError,
              className: `${RANGE_SLIDER_CLASSES.inputA11y} ${RANGE_SLIDER_CLASSES.inputMax}`
            }
          ),
          /* @__PURE__ */ jsxs11("div", { className: RANGE_SLIDER_CLASSES.valueLabelWrapper, children: [
            /* @__PURE__ */ jsxs11("div", { className: RANGE_SLIDER_CLASSES.valueLabelGroup, children: [
              /* @__PURE__ */ jsx16("span", { className: RANGE_SLIDER_CLASSES.valueLabelText, children: "Valor m\xEDnimo" }),
              /* @__PURE__ */ jsx16("div", { className: RANGE_SLIDER_CLASSES.valueLabelValue, children: formatValue2(minVal) })
            ] }),
            /* @__PURE__ */ jsxs11("div", { className: RANGE_SLIDER_CLASSES.valueLabelGroup, children: [
              /* @__PURE__ */ jsx16("span", { className: RANGE_SLIDER_CLASSES.valueLabelText, children: "Valor m\xE1ximo" }),
              /* @__PURE__ */ jsx16("div", { className: RANGE_SLIDER_CLASSES.valueLabelValue, children: formatValue2(maxVal) })
            ] })
          ] })
        ]
      }
    ),
    fieldError && /* @__PURE__ */ jsx16("div", { className: RANGE_SLIDER_CLASSES.error, role: "alert", children: fieldError })
  ] });
});
RangeSlider.displayName = "RangeSlider";

// src/INPUTS/Rating/Rating.tsx
import { forwardRef as forwardRef12, useState as useState16 } from "react";
import { Star as Star2, Heart as Heart2, Smile as Smile2, Frown as Frown2, Meh as Meh2, X as X3 } from "lucide-react";

// src/INPUTS/Rating/Rating.constants.ts
var RATING_CLASSES = {
  wrapper: "w3f-rating-wrapper",
  container: "w3f-rating-container",
  sizes: {
    small: "w3f-rating-small",
    medium: "w3f-rating-medium",
    large: "w3f-rating-large"
  },
  error: "w3f-rating-error",
  disabled: "w3f-rating-disabled",
  label: "w3f-rating-label",
  required: "w3f-input-required",
  item: "w3f-rating-item",
  itemInteractive: "w3f-rating-interactive",
  itemActive: "w3f-rating-active",
  itemFocused: "w3f-rating-focused",
  itemDisabled: "w3f-rating-item--disabled",
  itemReadonly: "w3f-rating-item--readonly",
  clearBtn: "w3f-rating-clear",
  value: "w3f-rating-value",
  message: "w3f-input-message",
  messageError: "w3f-input-message--error",
  messageHelper: "w3f-input-message--helper",
  paddingX: "w3f-px-1"
};
var RATING_DEFAULTS = {
  defaultValue: 0,
  max: 5,
  readOnly: false,
  disabled: false,
  iconType: "star",
  precision: 1,
  size: "medium",
  showValue: false,
  allowClear: true,
  required: false,
  className: "",
  unstyled: false
};
var RATING_VARIANT_CLASSES = {
  solid: "w3f-rating--solid",
  outlined: "w3f-rating--outlined",
  ghost: "w3f-rating--ghost",
  soft: "w3f-rating--soft"
};
var RATING_ICON_SIZES = {
  small: 20,
  medium: 28,
  large: 36
};

// src/INPUTS/Rating/Rating.utils.ts
function buildContainerClasses4(size, hasError, disabled, className, unstyled, variant) {
  if (unstyled) {
    return [
      RATING_CLASSES.container,
      "w3f-rating--unstyled",
      className
    ].filter(Boolean).join(" ");
  }
  return [
    RATING_CLASSES.container,
    RATING_CLASSES.sizes[size],
    hasError && RATING_CLASSES.error,
    disabled && RATING_CLASSES.disabled,
    variant && RATING_VARIANT_CLASSES[variant],
    className
  ].filter(Boolean).join(" ");
}
function getIconColor(index, ratingVal, iconType, precision, disabled, hasError) {
  if (disabled) return "var(--w3f-gray-400)";
  if (hasError && ratingVal === 0) return "var(--w3f-danger-500)";
  if (iconType === "smiley") {
    if (index < ratingVal) {
      const colorMap = [
        "var(--w3f-danger-500)",
        "var(--w3f-secondary-500)",
        "var(--w3f-warning-500)",
        "var(--w3f-success-400)",
        "var(--w3f-success-600)"
      ];
      return colorMap[index] || "var(--w3f-gray-500)";
    }
    return "var(--w3f-gray-400)";
  }
  const isFilled = index < ratingVal;
  const isHalf = precision === 0.5 && index + 0.5 === ratingVal;
  if (isFilled || isHalf) {
    return iconType === "heart" ? "var(--w3f-danger-500)" : "var(--w3f-warning-500)";
  }
  return "var(--w3f-gray-400)";
}
function getFillPercentage(index, ratingVal) {
  if (index + 1 <= ratingVal) return 100;
  if (index < ratingVal && ratingVal < index + 1) return (ratingVal - index) * 100;
  return 0;
}

// src/INPUTS/Rating/Rating.hooks.ts
import { useContext as useContext14, useState as useState15 } from "react";
var useRatingFormContext = () => {
  return useContext14(FormContext);
};
var useRatingHover = () => {
  const [hover, setHover] = useState15(-1);
  const [focusedIndex, setFocusedIndex] = useState15(-1);
  return { hover, setHover, focusedIndex, setFocusedIndex };
};

// src/INPUTS/Rating/Rating.tsx
import { useBridgeBind as useBridgeBind10 } from "@w3f/bridge";
import { jsx as jsx17, jsxs as jsxs12 } from "react/jsx-runtime";
function renderRatingIcon(index, ratingVal, iconType, size, precision, disabled, hasError) {
  const iconSize = RATING_ICON_SIZES[size];
  const color = getIconColor(index, ratingVal, iconType, precision, disabled, hasError);
  const fillPercent = getFillPercentage(index, ratingVal);
  const isFilled = fillPercent === 100;
  const isPartial = fillPercent > 0 && fillPercent < 100;
  if (iconType === "smiley") {
    if (index < ratingVal) {
      if (index <= 1) return /* @__PURE__ */ jsx17(Frown2, { size: iconSize, style: { color } });
      if (index === 2) return /* @__PURE__ */ jsx17(Meh2, { size: iconSize, style: { color } });
      return /* @__PURE__ */ jsx17(Smile2, { size: iconSize, style: { color } });
    }
    return /* @__PURE__ */ jsx17(Smile2, { size: iconSize, style: { color } });
  }
  const IconComponent = iconType === "heart" ? Heart2 : Star2;
  if (isPartial && precision === 0.5) {
    const gradientId = `w3f-rating-grad-${index}-${fillPercent}`;
    return /* @__PURE__ */ jsxs12("span", { style: { position: "relative", display: "inline-block" }, children: [
      /* @__PURE__ */ jsx17("svg", { width: iconSize, height: iconSize, style: { display: "block" }, children: /* @__PURE__ */ jsx17("defs", { children: /* @__PURE__ */ jsxs12("linearGradient", { id: gradientId, children: [
        /* @__PURE__ */ jsx17("stop", { offset: `${fillPercent}%`, stopColor: color }),
        /* @__PURE__ */ jsx17("stop", { offset: `${fillPercent}%`, stopColor: "var(--w3f-gray-400)" })
      ] }) }) }),
      /* @__PURE__ */ jsx17(
        IconComponent,
        {
          size: iconSize,
          fill: `url(#${gradientId})`,
          style: { color, position: "absolute", top: 0, left: 0 }
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsx17(
    IconComponent,
    {
      size: iconSize,
      fill: isFilled ? color : "none",
      style: { color }
    }
  );
}
var Rating = forwardRef12(({
  name,
  defaultValue = RATING_DEFAULTS.defaultValue,
  value: controlledValue,
  max = RATING_DEFAULTS.max,
  readOnly = RATING_DEFAULTS.readOnly,
  disabled = RATING_DEFAULTS.disabled,
  onChange,
  onHoverChange,
  iconType = RATING_DEFAULTS.iconType,
  precision = RATING_DEFAULTS.precision,
  size = RATING_DEFAULTS.size,
  showValue = RATING_DEFAULTS.showValue,
  allowClear = RATING_DEFAULTS.allowClear,
  labels = [],
  error,
  helperText,
  required = RATING_DEFAULTS.required,
  label,
  className = RATING_DEFAULTS.className,
  variant,
  unstyled = RATING_DEFAULTS.unstyled,
  bindId
}, ref) => {
  const formContext = useRatingFormContext();
  const isFormControlled = !!(formContext && name);
  const { dispatch } = useBridgeBind10({ bindId });
  const ratingValue = isFormControlled ? formContext.values[name] ?? 0 : controlledValue !== void 0 ? controlledValue : null;
  const ratingError = isFormControlled ? formContext.errors[name] : error;
  const isControlled = controlledValue !== void 0 || isFormControlled;
  const [internalValue, setInternalValue] = useState16(defaultValue);
  const value = isControlled ? ratingValue : internalValue;
  const { hover, setHover, focusedIndex, setFocusedIndex } = useRatingHover();
  const isInteractive = !readOnly && !disabled;
  const handleChange = (newValue) => {
    if (!isInteractive) return;
    const next = allowClear && newValue === value ? 0 : newValue;
    if (isFormControlled && formContext && name) {
      formContext.setFieldValue(name, next);
    } else if (!isControlled) {
      setInternalValue(next);
    }
    dispatch("change", { value: next });
    if (onChange) onChange(next);
  };
  const handleMouseMove = (event, index) => {
    if (!isInteractive || precision === 1) return;
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const percent = (event.clientX - left) / width;
    const hoverValue = index + (percent > 0.5 ? 1 : 0.5);
    setHover(hoverValue);
    onHoverChange?.(hoverValue);
  };
  const handleMouseEnter = (ratingIndex) => {
    if (!isInteractive) return;
    if (precision === 1) {
      setHover(ratingIndex);
      onHoverChange?.(ratingIndex);
    }
  };
  const handleMouseLeave = () => {
    if (!isInteractive) return;
    setHover(-1);
    onHoverChange?.(-1);
  };
  const handleKeyDown = (e, index) => {
    if (!isInteractive) return;
    const currentValue = value || 0;
    let newValue = currentValue;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        newValue = Math.min(currentValue + precision, max);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        newValue = Math.max(currentValue - precision, 0);
        break;
      case "Home":
        e.preventDefault();
        newValue = precision;
        break;
      case "End":
        e.preventDefault();
        newValue = max;
        break;
      case " ":
      case "Enter":
        e.preventDefault();
        handleChange(index);
        return;
      case "Delete":
      case "Backspace":
        if (allowClear) {
          e.preventDefault();
          handleChange(0);
        }
        return;
      default:
        return;
    }
    handleChange(newValue);
  };
  const getLabel = (index) => labels[index - 1] || `${index} de ${max}`;
  const currentRatingValue = hover !== -1 ? hover : value;
  const hasError = Boolean(ratingError);
  const ratingIcons = Array.from({ length: max });
  return /* @__PURE__ */ jsxs12("div", { ref, className: RATING_CLASSES.wrapper, children: [
    label && /* @__PURE__ */ jsxs12("label", { className: RATING_CLASSES.label, children: [
      label,
      required && /* @__PURE__ */ jsx17("span", { className: RATING_CLASSES.required, children: " *" })
    ] }),
    /* @__PURE__ */ jsxs12(
      "div",
      {
        className: buildContainerClasses4(size, hasError, disabled, className, unstyled, variant),
        role: "radiogroup",
        "aria-label": label || "Rating",
        "aria-required": required,
        "aria-invalid": hasError,
        onMouseLeave: handleMouseLeave,
        children: [
          ratingIcons.map((_, index) => {
            const ratingIndex = index + 1;
            const isActive = value >= ratingIndex;
            const isFocused = focusedIndex === index;
            return /* @__PURE__ */ jsx17(
              "span",
              {
                className: [
                  RATING_CLASSES.item,
                  isInteractive && RATING_CLASSES.itemInteractive,
                  isActive && RATING_CLASSES.itemActive,
                  isFocused && RATING_CLASSES.itemFocused,
                  disabled && RATING_CLASSES.itemDisabled,
                  readOnly && !disabled && RATING_CLASSES.itemReadonly
                ].filter(Boolean).join(" "),
                onMouseEnter: () => handleMouseEnter(ratingIndex),
                onMouseMove: (e) => handleMouseMove(e, index),
                onClick: () => handleChange(ratingIndex),
                onFocus: () => setFocusedIndex(index),
                onBlur: () => setFocusedIndex(-1),
                "aria-label": getLabel(ratingIndex),
                role: "radio",
                "aria-checked": value === ratingIndex,
                tabIndex: disabled ? -1 : value === ratingIndex || value === 0 && index === 0 ? 0 : -1,
                onKeyDown: (e) => handleKeyDown(e, ratingIndex),
                title: getLabel(ratingIndex),
                children: renderRatingIcon(
                  index,
                  currentRatingValue,
                  iconType,
                  size,
                  precision,
                  disabled,
                  hasError
                )
              },
              ratingIndex
            );
          }),
          allowClear && value > 0 && isInteractive && /* @__PURE__ */ jsx17(
            "button",
            {
              className: RATING_CLASSES.clearBtn,
              onClick: () => handleChange(0),
              "aria-label": "Limpiar calificaci\xF3n",
              title: "Limpiar",
              type: "button",
              children: /* @__PURE__ */ jsx17(X3, { size: 16 })
            }
          )
        ]
      }
    ),
    showValue && /* @__PURE__ */ jsx17("span", { className: RATING_CLASSES.value, "aria-live": "polite", children: value > 0 ? `${value}/${max}` : "Sin calificar" }),
    /* @__PURE__ */ jsx17("div", { className: RATING_CLASSES.paddingX, children: ratingError ? /* @__PURE__ */ jsx17(
      "p",
      {
        className: `${RATING_CLASSES.message} ${RATING_CLASSES.messageError}`,
        role: "alert",
        children: ratingError
      }
    ) : helperText ? /* @__PURE__ */ jsx17("p", { className: `${RATING_CLASSES.message} ${RATING_CLASSES.messageHelper}`, children: helperText }) : null }),
    name && /* @__PURE__ */ jsx17("input", { type: "hidden", name, value })
  ] });
});
Rating.displayName = "Rating";

// src/INPUTS/Select/Select.tsx
import { forwardRef as forwardRef13, useId as useId9, useState as useState18 } from "react";

// src/INPUTS/Select/Select.constants.ts
var SELECT_DEFAULTS = {
  disabled: false,
  required: false,
  multiple: false,
  autoFocus: false,
  className: "",
  unstyled: false
};
var SELECT_CLASSES = {
  container: "w3f-select-container",
  wrapper: "w3f-select-wrapper",
  select: "w3f-select",
  label: "w3f-select-label",
  labelFloating: "w3f-select-label--floating",
  labelShifted: "w3f-select-label--shifted",
  required: "w3f-select-required",
  icon: "w3f-select-icon",
  iconLeading: "w3f-select-icon w3f-select-icon--leading",
  iconTrailing: "w3f-select-icon w3f-select-icon--trailing",
  hasLeading: "w3f-select--has-leading",
  hasTrailing: "w3f-select--has-trailing",
  message: "w3f-select-message",
  messageError: "w3f-select-message--error",
  messageHelper: "w3f-select-message--helper",
  paddingX: "w3f-px-1"
};
var SELECT_VARIANT_CLASSES = {
  solid: "w3f-select--solid",
  outlined: "w3f-select--outlined",
  ghost: "w3f-select--ghost",
  soft: "w3f-select--soft"
};

// src/INPUTS/Select/Select.utils.ts
function isOptionGroup(item) {
  return "options" in item && Array.isArray(item.options);
}
function buildSelectClasses(hasLeading, hasTrailing, unstyled, variant) {
  if (unstyled) {
    return [SELECT_CLASSES.select, "w3f-select--unstyled"].join(" ");
  }
  return [
    SELECT_CLASSES.select,
    hasLeading && SELECT_CLASSES.hasLeading,
    hasTrailing && SELECT_CLASSES.hasTrailing,
    variant && SELECT_VARIANT_CLASSES[variant]
  ].filter(Boolean).join(" ");
}
function buildLabelClasses5(isFloating, showShifted) {
  return [
    SELECT_CLASSES.label,
    isFloating && SELECT_CLASSES.labelFloating,
    showShifted && SELECT_CLASSES.labelShifted
  ].filter(Boolean).join(" ");
}
function hasSelectValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  return value !== "" && value !== null && value !== void 0;
}

// src/INPUTS/Select/Select.hooks.ts
import { useContext as useContext15, useState as useState17 } from "react";
var useSelectFormContext = () => {
  return useContext15(FormContext);
};
var useSelectFocus = () => {
  const [isFocused, setIsFocused] = useState17(false);
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);
  return { isFocused, onFocus, onBlur };
};

// src/INPUTS/Select/Select.tsx
import { useBridgeBind as useBridgeBind11 } from "@w3f/bridge";
import { jsx as jsx18, jsxs as jsxs13 } from "react/jsx-runtime";
function renderOptions(items) {
  return items.map((item, index) => {
    if (isOptionGroup(item)) {
      return /* @__PURE__ */ jsx18("optgroup", { label: item.label, disabled: item.disabled, children: item.options.map((opt, i) => /* @__PURE__ */ jsx18(
        "option",
        {
          value: opt.value === null || opt.value === void 0 ? "" : String(opt.value),
          disabled: opt.disabled,
          children: opt.label
        },
        `opt-${index}-${i}`
      )) }, `group-${index}`);
    }
    return /* @__PURE__ */ jsx18(
      "option",
      {
        value: item.value === null || item.value === void 0 ? "" : String(item.value),
        disabled: item.disabled,
        children: item.label
      },
      `opt-${index}`
    );
  });
}
var DefaultChevron = () => /* @__PURE__ */ jsx18(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx18("polyline", { points: "6 9 12 15 18 9" })
  }
);
var Select = forwardRef13(
  ({
    label,
    name,
    options = [],
    value: externalValue,
    onChange: externalOnChange,
    error: propError,
    helperText,
    disabled = SELECT_DEFAULTS.disabled,
    required = SELECT_DEFAULTS.required,
    multiple = SELECT_DEFAULTS.multiple,
    autoFocus = SELECT_DEFAULTS.autoFocus,
    leadingIcon,
    trailingIcon,
    className = SELECT_DEFAULTS.className,
    onBlur: externalOnBlur,
    unstyled = SELECT_DEFAULTS.unstyled,
    bindId,
    variant,
    ...props
  }, ref) => {
    const formContext = useSelectFormContext();
    const isFormControlled = !!(formContext && name);
    const { dispatch } = useBridgeBind11({ bindId });
    const [internalValue, setInternalValue] = useState18(
      multiple ? [] : ""
    );
    const { isFocused, onFocus, onBlur: onBlurFocus } = useSelectFocus();
    const inputId = useId9();
    const currentValue = isFormControlled ? formContext.values[name] !== void 0 ? formContext.values[name] : multiple ? [] : "" : externalValue !== void 0 ? externalValue : internalValue;
    const inputError = isFormControlled ? formContext.errors[name] : propError;
    const hasError = Boolean(inputError);
    const handleChange = (e) => {
      const val = multiple ? Array.from(e.target.options).filter((o) => o.selected).map((o) => o.value) : e.target.value;
      if (isFormControlled && formContext) {
        formContext.handleChange(e);
      } else if (externalOnChange) {
        externalOnChange(e);
      } else {
        setInternalValue(val);
      }
      dispatch("change", { value: val });
    };
    const handleBlur = (e) => {
      onBlurFocus();
      if (isFormControlled && formContext) formContext.handleBlur(e);
      dispatch("blur", { value: e.target.value });
      if (externalOnBlur) externalOnBlur(e);
    };
    const isFloating = isFocused || hasSelectValue(currentValue);
    const finalTrailingIcon = trailingIcon ?? (!multiple ? /* @__PURE__ */ jsx18(DefaultChevron, {}) : null);
    return /* @__PURE__ */ jsxs13("div", { className: [SELECT_CLASSES.container, unstyled && "w3f-select-container--unstyled", className].filter(Boolean).join(" "), children: [
      /* @__PURE__ */ jsxs13("div", { className: SELECT_CLASSES.wrapper, children: [
        leadingIcon && /* @__PURE__ */ jsx18("div", { className: SELECT_CLASSES.iconLeading, children: leadingIcon }),
        /* @__PURE__ */ jsxs13(
          "select",
          {
            ref,
            id: inputId,
            name,
            value: currentValue,
            onChange: handleChange,
            onFocus,
            onBlur: handleBlur,
            disabled,
            required,
            multiple,
            autoFocus,
            "aria-invalid": hasError,
            "aria-describedby": inputError ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0,
            className: buildSelectClasses(
              Boolean(leadingIcon),
              Boolean(finalTrailingIcon),
              unstyled,
              variant
            ),
            ...props,
            children: [
              !multiple && /* @__PURE__ */ jsx18("option", { value: "", disabled: true, hidden: true }),
              renderOptions(options)
            ]
          }
        ),
        finalTrailingIcon && /* @__PURE__ */ jsx18("div", { className: SELECT_CLASSES.iconTrailing, children: finalTrailingIcon }),
        /* @__PURE__ */ jsxs13(
          "label",
          {
            htmlFor: inputId,
            className: buildLabelClasses5(
              isFloating,
              !isFloating && Boolean(leadingIcon)
            ),
            children: [
              label,
              required && /* @__PURE__ */ jsx18("span", { className: SELECT_CLASSES.required, children: " *" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx18("div", { className: SELECT_CLASSES.paddingX, children: inputError ? /* @__PURE__ */ jsx18(
        "p",
        {
          id: `${inputId}-error`,
          className: `${SELECT_CLASSES.message} ${SELECT_CLASSES.messageError}`,
          role: "alert",
          children: inputError
        }
      ) : helperText ? /* @__PURE__ */ jsx18(
        "p",
        {
          id: `${inputId}-helper`,
          className: `${SELECT_CLASSES.message} ${SELECT_CLASSES.messageHelper}`,
          children: helperText
        }
      ) : null })
    ] });
  }
);
Select.displayName = "Select";

// src/INPUTS/Slider/Slider.tsx
import { forwardRef as forwardRef14, useState as useState19, useEffect as useEffect7, useId as useId10 } from "react";

// src/INPUTS/Slider/Slider.constants.ts
var SLIDER_CLASSES = {
  component: "w3f-slider-component",
  wrapper: "w3f-slider-wrapper",
  container: "w3f-slider-container",
  input: "w3f-range-input",
  label: "w3f-text-primary w3f-text-xl w3f-margin-bottom-4 w3f-block",
  valueWrapper: "w3f-margin-top-4",
  valueBadge: "w3f-bg-primary w3f-text-on-primary w3f-padding-x-2 w3f-padding-y-1 w3f-radius-lg w3f-margin-left-2 w3f-shadow-sm"
};
var SLIDER_VARIANT_CLASSES = {
  solid: "w3f-slider--solid",
  outlined: "w3f-slider--outlined",
  ghost: "w3f-slider--ghost",
  soft: "w3f-slider--soft"
};
var SLIDER_DEFAULTS = {
  min: 0,
  max: 100,
  step: 1,
  defaultValue: 50,
  showValue: true,
  disabled: false,
  unstyled: false
};

// src/INPUTS/Slider/Slider.utils.ts
function calcPercentage(value, min, max) {
  return (value - min) / (max - min) * 100;
}
function buildSliderBackground(percentage) {
  return `linear-gradient(to right, var(--w3f-slider-fill-bg, var(--w3f-primary)) 0%, var(--w3f-slider-fill-bg, var(--w3f-primary)) ${percentage}%, var(--w3f-slider-track-bg, var(--w3f-gray-200)) ${percentage}%, var(--w3f-slider-track-bg, var(--w3f-gray-200)) 100%)`;
}
function buildSliderClasses(className, unstyled, variant) {
  const base = "w3f-slider-component";
  if (unstyled) {
    return [base, "w3f-slider--unstyled", className].filter(Boolean).join(" ");
  }
  return [base, variant && SLIDER_VARIANT_CLASSES[variant], className].filter(Boolean).join(" ");
}

// src/INPUTS/Slider/Slider.hooks.ts
import { useContext as useContext16 } from "react";
var useSliderFormContext = () => {
  return useContext16(FormContext);
};

// src/INPUTS/Slider/Slider.tsx
import { useBridgeBind as useBridgeBind12 } from "@w3f/bridge";
import { jsx as jsx19, jsxs as jsxs14 } from "react/jsx-runtime";
var Slider = forwardRef14(({
  name,
  min = SLIDER_DEFAULTS.min,
  max = SLIDER_DEFAULTS.max,
  step = SLIDER_DEFAULTS.step,
  value,
  defaultValue = SLIDER_DEFAULTS.defaultValue,
  label = "",
  showValue = SLIDER_DEFAULTS.showValue,
  onChange,
  onBlur,
  disabled = SLIDER_DEFAULTS.disabled,
  className = "",
  variant,
  unstyled = SLIDER_DEFAULTS.unstyled,
  bindId,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState19(value ?? defaultValue);
  const formContext = useSliderFormContext();
  const sliderId = useId10();
  const { dispatch } = useBridgeBind12({ bindId });
  const isFormControlled = !!(formContext && name);
  const sliderValue = isFormControlled ? formContext.values[name] ?? defaultValue : value ?? internalValue;
  useEffect7(() => {
    if (!isFormControlled && value !== void 0) {
      setInternalValue(value);
    }
  }, [value, isFormControlled]);
  const handleSliderChange = (e) => {
    const newValue = Number(e.target.value);
    if (isFormControlled) {
      formContext.handleChange(e);
    } else {
      setInternalValue(newValue);
    }
    dispatch("change", { value: newValue });
    if (onChange) onChange(newValue);
  };
  const handleBlur = (e) => {
    if (isFormControlled) formContext.handleBlur(e);
    if (onBlur) onBlur(e);
  };
  const percentage = calcPercentage(sliderValue, min, max);
  return /* @__PURE__ */ jsxs14("div", { className: buildSliderClasses(className, unstyled, variant), children: [
    label && /* @__PURE__ */ jsx19("label", { htmlFor: sliderId, className: SLIDER_CLASSES.label, children: label }),
    /* @__PURE__ */ jsx19("div", { className: `${SLIDER_CLASSES.wrapper}${className ? ` ${className}` : ""}`, children: /* @__PURE__ */ jsx19(
      "div",
      {
        className: SLIDER_CLASSES.container,
        style: { background: buildSliderBackground(percentage) },
        children: /* @__PURE__ */ jsx19(
          "input",
          {
            ref,
            id: sliderId,
            className: SLIDER_CLASSES.input,
            type: "range",
            name,
            min,
            max,
            step,
            value: sliderValue,
            onChange: handleSliderChange,
            onBlur: handleBlur,
            disabled,
            "aria-label": label,
            "aria-valuemin": min,
            "aria-valuemax": max,
            "aria-valuenow": sliderValue
          }
        )
      }
    ) }),
    showValue && /* @__PURE__ */ jsxs14("p", { className: SLIDER_CLASSES.valueWrapper, children: [
      "Valor seleccionado:",
      /* @__PURE__ */ jsx19("span", { className: SLIDER_CLASSES.valueBadge, children: sliderValue })
    ] })
  ] });
});
Slider.displayName = "Slider";

// src/INPUTS/SlideToggle/SlideToggle.tsx
import { forwardRef as forwardRef15, useState as useState20, useRef as useRef6, useEffect as useEffect8 } from "react";

// src/INPUTS/SlideToggle/SlideToggle.constants.ts
var SLIDE_TOGGLE_SIZE_CONFIGS = {
  sm: { width: 36, height: 18, handleSize: 14, maxPosition: 14 },
  md: { width: 44, height: 22, handleSize: 18, maxPosition: 18 },
  lg: { width: 52, height: 26, handleSize: 22, maxPosition: 22 }
};
var SLIDE_TOGGLE_DEFAULTS = {
  checked: false,
  disabled: false,
  size: "md",
  variant: "primary",
  loading: false,
  labelPosition: "right",
  showIcon: true,
  className: "",
  unstyled: false
};
var SLIDE_TOGGLE_CLASSES = {
  base: "w3f-slide-toggle",
  track: "w3f-slide-toggle__track",
  handle: "w3f-slide-toggle__handle",
  trackChecked: "is-checked",
  handleDragging: "is-dragging",
  isDisabled: "is-disabled",
  isLoading: "is-loading",
  hasError: "has-error",
  container: "w3f-slide-toggle-container",
  containerLabelLeft: "w3f-slide-toggle-container--label-left",
  label: "w3f-slide-toggle__label",
  labelRight: "w3f-slide-toggle__label--right",
  labelLeft: "w3f-slide-toggle__label--left",
  labelDisabled: "w3f-slide-toggle__label--disabled",
  checkIcon: "w3f-slide-toggle__check-icon",
  messages: "w3f-slide-toggle__messages",
  message: "w3f-input-message",
  messageError: "w3f-input-message--error",
  messageHelper: "w3f-input-message--helper"
};

// src/INPUTS/SlideToggle/SlideToggle.utils.ts
function getSizeConfig(size) {
  return SLIDE_TOGGLE_SIZE_CONFIGS[size];
}
function buildToggleClasses(size, variant, disabled, loading, hasError, unstyled) {
  if (unstyled) {
    return [
      SLIDE_TOGGLE_CLASSES.base,
      "w3f-slide-toggle--unstyled"
    ].filter(Boolean).join(" ");
  }
  return [
    SLIDE_TOGGLE_CLASSES.base,
    size !== "md" && `${SLIDE_TOGGLE_CLASSES.base}--${size}`,
    variant !== "primary" && `${SLIDE_TOGGLE_CLASSES.base}--${variant}`,
    disabled && SLIDE_TOGGLE_CLASSES.isDisabled,
    loading && SLIDE_TOGGLE_CLASSES.isLoading,
    hasError && SLIDE_TOGGLE_CLASSES.hasError
  ].filter(Boolean).join(" ");
}
function buildTrackClasses(isChecked) {
  return [
    SLIDE_TOGGLE_CLASSES.track,
    isChecked && SLIDE_TOGGLE_CLASSES.trackChecked
  ].filter(Boolean).join(" ");
}
function buildHandleClasses(isDragging) {
  return [
    SLIDE_TOGGLE_CLASSES.handle,
    isDragging && SLIDE_TOGGLE_CLASSES.handleDragging
  ].filter(Boolean).join(" ");
}

// src/INPUTS/SlideToggle/SlideToggle.hooks.ts
import { useContext as useContext17 } from "react";
var useSlideToggleFormContext = () => {
  return useContext17(FormContext);
};

// src/INPUTS/SlideToggle/SlideToggle.tsx
import { useBridgeBind as useBridgeBind13 } from "@w3f/bridge";
import { jsx as jsx20, jsxs as jsxs15 } from "react/jsx-runtime";
var SlideToggle = forwardRef15(({
  name,
  checked = SLIDE_TOGGLE_DEFAULTS.checked,
  onChange,
  disabled = SLIDE_TOGGLE_DEFAULTS.disabled,
  size = SLIDE_TOGGLE_DEFAULTS.size,
  variant = SLIDE_TOGGLE_DEFAULTS.variant,
  loading = SLIDE_TOGGLE_DEFAULTS.loading,
  label,
  labelPosition = SLIDE_TOGGLE_DEFAULTS.labelPosition,
  showIcon = SLIDE_TOGGLE_DEFAULTS.showIcon,
  error,
  helperText,
  className = SLIDE_TOGGLE_DEFAULTS.className,
  unstyled = SLIDE_TOGGLE_DEFAULTS.unstyled,
  bindId
}, ref) => {
  const formContext = useSlideToggleFormContext();
  const isFormControlled = !!(formContext && name);
  const { dispatch } = useBridgeBind13({ bindId });
  const toggleValue = isFormControlled ? Boolean(formContext.values[name]) : checked;
  const toggleError = isFormControlled ? formContext.errors[name] : error;
  const { maxPosition } = getSizeConfig(size);
  const [isChecked, setIsChecked] = useState20(toggleValue);
  const [isDragging, setIsDragging] = useState20(false);
  const [handlePosition, setHandlePosition] = useState20(toggleValue ? maxPosition : 0);
  const startX = useRef6(0);
  const handleRef = useRef6(null);
  const handleToggleChange = (newState) => {
    setIsChecked(newState);
    setHandlePosition(newState ? maxPosition : 0);
    if (isFormControlled && formContext && name) {
      formContext.setFieldValue(name, newState);
    }
    dispatch("change", { value: newState });
    if (onChange) onChange(newState);
  };
  const handleMouseDown = (e) => {
    if (disabled || loading) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    startX.current = e.clientX - handlePosition;
  };
  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const shouldBeChecked = handlePosition > maxPosition / 2;
    if (shouldBeChecked !== isChecked) {
      handleToggleChange(shouldBeChecked);
    } else {
      setHandlePosition(shouldBeChecked ? maxPosition : 0);
    }
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newPos = e.clientX - startX.current;
    setHandlePosition(Math.max(0, Math.min(newPos, maxPosition)));
  };
  const handleTouchStart = (e) => {
    if (disabled || loading) return;
    e.stopPropagation();
    setIsDragging(true);
    startX.current = e.touches[0].clientX - handlePosition;
  };
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const newPos = e.touches[0].clientX - startX.current;
    setHandlePosition(Math.max(0, Math.min(newPos, maxPosition)));
  };
  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const shouldBeChecked = handlePosition > maxPosition / 2;
    if (shouldBeChecked !== isChecked) {
      handleToggleChange(shouldBeChecked);
    } else {
      setHandlePosition(shouldBeChecked ? maxPosition : 0);
    }
  };
  const handleClick = () => {
    if (disabled || loading || isDragging) return;
    handleToggleChange(!isChecked);
  };
  const handleKeyDown = (e) => {
    if (disabled || loading) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };
  useEffect8(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handlePosition, isChecked]);
  useEffect8(() => {
    if (!isDragging && toggleValue !== isChecked) {
      setIsChecked(toggleValue);
      setHandlePosition(toggleValue ? maxPosition : 0);
    }
  }, [toggleValue, isDragging, maxPosition]);
  const hasError = Boolean(toggleError);
  const renderToggle = () => /* @__PURE__ */ jsx20(
    "div",
    {
      className: buildToggleClasses(size, variant, disabled, loading, hasError, unstyled),
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      tabIndex: disabled || loading ? -1 : 0,
      role: "switch",
      "aria-checked": isChecked,
      "aria-disabled": disabled,
      "aria-label": label || "Toggle switch",
      "aria-invalid": hasError,
      children: /* @__PURE__ */ jsx20("div", { className: buildTrackClasses(isChecked), children: /* @__PURE__ */ jsx20(
        "span",
        {
          ref: handleRef,
          className: buildHandleClasses(isDragging),
          style: { transform: `translateX(${handlePosition}px)` },
          onMouseDown: handleMouseDown,
          onTouchStart: handleTouchStart
        }
      ) })
    }
  );
  const renderLabel = () => {
    if (!label) return null;
    const labelClasses = [
      SLIDE_TOGGLE_CLASSES.label,
      labelPosition === "right" ? SLIDE_TOGGLE_CLASSES.labelRight : SLIDE_TOGGLE_CLASSES.labelLeft,
      disabled || loading ? SLIDE_TOGGLE_CLASSES.labelDisabled : ""
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsxs15(
      "span",
      {
        onClick: handleClick,
        className: labelClasses,
        children: [
          label,
          showIcon && /* @__PURE__ */ jsx20(
            "span",
            {
              className: SLIDE_TOGGLE_CLASSES.checkIcon,
              style: { visibility: isChecked && !disabled && !loading ? "visible" : "hidden" },
              children: "\u2713"
            }
          )
        ]
      }
    );
  };
  const renderMessages = () => {
    if (!toggleError && !helperText) return null;
    return /* @__PURE__ */ jsx20("div", { className: SLIDE_TOGGLE_CLASSES.messages, children: toggleError ? /* @__PURE__ */ jsx20(
      "p",
      {
        className: `${SLIDE_TOGGLE_CLASSES.message} ${SLIDE_TOGGLE_CLASSES.messageError}`,
        role: "alert",
        children: toggleError
      }
    ) : helperText ? /* @__PURE__ */ jsx20(
      "p",
      {
        className: `${SLIDE_TOGGLE_CLASSES.message} ${SLIDE_TOGGLE_CLASSES.messageHelper}`,
        children: helperText
      }
    ) : null });
  };
  if (!label) {
    return /* @__PURE__ */ jsxs15("div", { ref, className, children: [
      renderToggle(),
      renderMessages()
    ] });
  }
  return /* @__PURE__ */ jsxs15("div", { ref, className, children: [
    /* @__PURE__ */ jsxs15(
      "div",
      {
        className: `${SLIDE_TOGGLE_CLASSES.container}${labelPosition === "left" ? ` ${SLIDE_TOGGLE_CLASSES.containerLabelLeft}` : ""}`,
        children: [
          renderToggle(),
          renderLabel()
        ]
      }
    ),
    renderMessages()
  ] });
});
SlideToggle.displayName = "SlideToggle";

// src/INPUTS/TextField/TextField.tsx
import { forwardRef as forwardRef16, useId as useId11, useRef as useRef7 } from "react";
import { X as X4 } from "lucide-react";

// src/INPUTS/TextField/TextField.constants.ts
var TEXTFIELD_CLASSES = {
  container: "w3f-input-container",
  wrapper: "w3f-input-wrapper",
  wrapperSizes: {
    sm: "w3f-input-wrapper--sm",
    md: "",
    lg: "w3f-input-wrapper--lg"
  },
  input: "w3f-input",
  hasLeading: "w3f-input--has-leading",
  hasTrailing: "w3f-input--has-trailing",
  label: "w3f-input-label",
  labelFloating: "w3f-input-label--floating",
  labelShifted: "w3f-input-label--shifted",
  required: "w3f-input-required",
  iconLeading: "w3f-input-icon w3f-input-icon--leading",
  iconTrailing: "w3f-input-icon w3f-input-icon--trailing",
  message: "w3f-input-message",
  messageError: "w3f-input-message--error",
  messageHelper: "w3f-input-message--helper",
  count: "w3f-input-count",
  paddingX: "w3f-px-1"
};
var TEXTFIELD_DEFAULTS = {
  size: "md",
  type: "text",
  disabled: false,
  required: false,
  autoFocus: false,
  clearable: false,
  showCount: false,
  unstyled: false
};

// src/INPUTS/TextField/TextField.utils.ts
function stripDigits(value) {
  return value.replace(/\d/g, "");
}
function isDigitKey(key) {
  return /^\d$/.test(key);
}
function buildContainerClasses5(className, unstyled) {
  const base = TEXTFIELD_CLASSES.container;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, className].filter(Boolean).join(" ");
}
function buildWrapperClasses5(size) {
  return [
    TEXTFIELD_CLASSES.wrapper,
    TEXTFIELD_CLASSES.wrapperSizes[size]
  ].filter(Boolean).join(" ");
}
function buildInputClasses5(hasLeading, hasTrailing) {
  return [
    TEXTFIELD_CLASSES.input,
    hasLeading && TEXTFIELD_CLASSES.hasLeading,
    hasTrailing && TEXTFIELD_CLASSES.hasTrailing
  ].filter(Boolean).join(" ");
}
function buildLabelClasses6(isFloating, showShifted) {
  return [
    TEXTFIELD_CLASSES.label,
    isFloating && TEXTFIELD_CLASSES.labelFloating,
    showShifted && TEXTFIELD_CLASSES.labelShifted
  ].filter(Boolean).join(" ");
}

// src/INPUTS/TextField/TextField.hooks.ts
import { useContext as useContext18, useState as useState21 } from "react";
var useTextFieldFormContext = () => {
  return useContext18(FormContext);
};
var useTextFieldFocus = () => {
  const [isFocused, setIsFocused] = useState21(false);
  return {
    isFocused,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  };
};

// src/INPUTS/TextField/TextField.tsx
import { jsx as jsx21, jsxs as jsxs16 } from "react/jsx-runtime";
var TextField = forwardRef16(
  ({
    label,
    name,
    value: externalValue,
    onChange: externalOnChange,
    type = TEXTFIELD_DEFAULTS.type,
    error: propError,
    helperText,
    disabled = TEXTFIELD_DEFAULTS.disabled,
    required = TEXTFIELD_DEFAULTS.required,
    size = TEXTFIELD_DEFAULTS.size,
    leadingIcon,
    trailingIcon,
    onIconClick,
    placeholder,
    unstyled = TEXTFIELD_DEFAULTS.unstyled,
    className = "",
    onBlur: onBlurProp,
    onFocus: onFocusProp,
    maxLength,
    showCount = TEXTFIELD_DEFAULTS.showCount,
    clearable = TEXTFIELD_DEFAULTS.clearable,
    onClear,
    autoFocus = TEXTFIELD_DEFAULTS.autoFocus,
    onKeyDown: onKeyDownProp,
    ...props
  }, ref) => {
    const formContext = useTextFieldFormContext();
    const isFormControlled = !!(formContext && name);
    const { isFocused, onFocus: onFocusHook, onBlur: onBlurHook } = useTextFieldFocus();
    const inputId = useId11();
    const internalRef = useRef7(null);
    const inputRef = ref ?? internalRef;
    const currentValue = isFormControlled ? formContext.values[name] ?? "" : externalValue !== void 0 ? externalValue : void 0;
    const fieldError = isFormControlled ? formContext.errors[name] : propError;
    const hasError = Boolean(fieldError);
    const handleChange = (e) => {
      const filtered = stripDigits(e.target.value);
      if (filtered === e.target.value) {
        if (isFormControlled && formContext) {
          formContext.handleChange(e);
        } else if (externalOnChange) {
          externalOnChange(e);
        }
      } else {
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: filtered, name: e.target.name }
        };
        if (isFormControlled && formContext) {
          formContext.handleChange(syntheticEvent);
        } else if (externalOnChange) {
          externalOnChange(syntheticEvent);
        }
      }
    };
    const handleKeyDown = (e) => {
      if (isDigitKey(e.key)) {
        e.preventDefault();
      }
      if (onKeyDownProp) onKeyDownProp(e);
    };
    const handleFocus = (e) => {
      if (!disabled) onFocusHook();
      if (onFocusProp) onFocusProp(e);
    };
    const handleBlur = (e) => {
      onBlurHook();
      if (isFormControlled && formContext) formContext.handleBlur(e);
      if (onBlurProp) onBlurProp(e);
    };
    const handleClear = () => {
      if (isFormControlled && formContext && name) {
        formContext.setFieldValue(name, "");
      } else if (externalOnChange) {
        const syntheticEvent = {
          target: { name: name ?? "", value: "", type: "text" }
        };
        externalOnChange(syntheticEvent);
      }
      if (onClear) onClear();
      inputRef.current?.focus();
    };
    const currentLength = String(currentValue ?? "").length;
    const hasValue = currentLength > 0;
    const isFloating = isFocused || hasValue || Boolean(placeholder);
    const showClearButton = clearable && hasValue && !disabled;
    const hasTrailingContent = Boolean(trailingIcon) || showClearButton;
    return /* @__PURE__ */ jsxs16("div", { className: buildContainerClasses5(className, unstyled), children: [
      /* @__PURE__ */ jsxs16("div", { className: buildWrapperClasses5(size), children: [
        leadingIcon && /* @__PURE__ */ jsx21("div", { className: TEXTFIELD_CLASSES.iconLeading, children: leadingIcon }),
        /* @__PURE__ */ jsx21(
          "input",
          {
            ref: inputRef,
            id: inputId,
            type,
            name,
            value: currentValue,
            onChange: handleChange,
            onKeyDown: handleKeyDown,
            onFocus: handleFocus,
            onBlur: handleBlur,
            disabled,
            required,
            placeholder,
            maxLength,
            autoFocus,
            "aria-invalid": hasError,
            "aria-describedby": fieldError ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0,
            className: buildInputClasses5(Boolean(leadingIcon), hasTrailingContent),
            ...props
          }
        ),
        (trailingIcon || showClearButton) && /* @__PURE__ */ jsx21(
          "div",
          {
            className: TEXTFIELD_CLASSES.iconTrailing,
            onClick: showClearButton ? handleClear : onIconClick,
            style: { cursor: showClearButton || onIconClick ? "pointer" : "default" },
            children: showClearButton ? /* @__PURE__ */ jsx21(X4, { size: 16 }) : trailingIcon
          }
        ),
        /* @__PURE__ */ jsxs16(
          "label",
          {
            htmlFor: inputId,
            className: buildLabelClasses6(isFloating, !isFloating && Boolean(leadingIcon)),
            children: [
              label,
              required && /* @__PURE__ */ jsx21("span", { className: TEXTFIELD_CLASSES.required, children: " *" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs16("div", { className: TEXTFIELD_CLASSES.paddingX, children: [
        showCount && maxLength && /* @__PURE__ */ jsxs16("span", { className: TEXTFIELD_CLASSES.count, children: [
          currentLength,
          "/",
          maxLength
        ] }),
        fieldError ? /* @__PURE__ */ jsx21(
          "p",
          {
            id: `${inputId}-error`,
            className: `${TEXTFIELD_CLASSES.message} ${TEXTFIELD_CLASSES.messageError}`,
            role: "alert",
            children: fieldError
          }
        ) : helperText ? /* @__PURE__ */ jsx21(
          "p",
          {
            id: `${inputId}-helper`,
            className: `${TEXTFIELD_CLASSES.message} ${TEXTFIELD_CLASSES.messageHelper}`,
            children: helperText
          }
        ) : null
      ] })
    ] });
  }
);
TextField.displayName = "TextField";

// src/INPUTS/ToggleButton/ToggleButton.tsx
import React20, { forwardRef as forwardRef17 } from "react";

// src/INPUTS/ToggleButton/ToggleButton.constants.ts
var TOGGLE_BUTTON_CLASSES = {
  button: "w3f-toggle-button",
  selected: "w3f-toggle-button--selected",
  full: "w3f-toggle-button--full",
  disabled: "w3f-toggle-button--disabled",
  colorModifiers: {
    primary: "",
    secondary: "w3f-toggle-button--secondary",
    success: "w3f-toggle-button--success",
    danger: "w3f-toggle-button--danger",
    warning: "w3f-toggle-button--warning",
    info: "w3f-toggle-button--info"
  },
  sizeModifiers: {
    sm: "w3f-toggle-button--sm",
    md: "w3f-toggle-button--md",
    lg: "w3f-toggle-button--lg"
  }
};
var TOGGLE_BUTTON_DEFAULTS = {
  selected: false,
  color: "primary",
  size: "md",
  fullWidth: false,
  disabled: false,
  className: "",
  unstyled: false
};
var TOGGLE_GROUP_DEFAULTS = {
  exclusive: false,
  color: "primary",
  size: "md",
  fullWidth: false,
  orientation: "horizontal",
  required: false,
  disabled: false,
  className: ""
};
var TOGGLE_GROUP_CLASSES = {
  wrapper: "w3f-toggle-group-wrapper",
  group: "w3f-toggle-group",
  label: "w3f-toggle-group-label",
  required: "w3f-input-required",
  full: "w3f-toggle-group--full",
  error: "w3f-toggle-group--error",
  disabled: "w3f-toggle-group--disabled",
  orientationModifiers: {
    horizontal: "w3f-toggle-group--horizontal",
    vertical: "w3f-toggle-group--vertical"
  },
  paddingX: "w3f-px-1",
  message: "w3f-input-message",
  messageError: "w3f-input-message--error",
  messageHelper: "w3f-input-message--helper"
};

// src/INPUTS/ToggleButton/ToggleButton.utils.ts
function buildToggleButtonClasses(selected, color, size, fullWidth, disabled, className, unstyled) {
  if (unstyled) {
    return [TOGGLE_BUTTON_CLASSES.button, "w3f-toggle-button--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    TOGGLE_BUTTON_CLASSES.button,
    selected && TOGGLE_BUTTON_CLASSES.selected,
    selected && color !== "primary" && TOGGLE_BUTTON_CLASSES.colorModifiers[color],
    TOGGLE_BUTTON_CLASSES.sizeModifiers[size],
    fullWidth && TOGGLE_BUTTON_CLASSES.full,
    disabled && TOGGLE_BUTTON_CLASSES.disabled,
    className
  ].filter(Boolean).join(" ");
}
function buildToggleGroupClasses(orientation, fullWidth, hasError, disabled, className) {
  return [
    TOGGLE_GROUP_CLASSES.group,
    TOGGLE_GROUP_CLASSES.orientationModifiers[orientation],
    fullWidth && TOGGLE_GROUP_CLASSES.full,
    hasError && TOGGLE_GROUP_CLASSES.error,
    disabled && TOGGLE_GROUP_CLASSES.disabled,
    className
  ].filter(Boolean).join(" ");
}
function isSelected(buttonValue, currentValue, exclusive) {
  if (exclusive) {
    return buttonValue === currentValue;
  }
  if (Array.isArray(currentValue)) {
    return currentValue.includes(buttonValue);
  }
  return false;
}
function computeNewValue(buttonValue, currentValue, exclusive) {
  if (exclusive) {
    return currentValue === buttonValue ? null : buttonValue;
  }
  const arr = Array.isArray(currentValue) ? currentValue : [];
  const idx = arr.indexOf(buttonValue);
  if (idx === -1) return [...arr, buttonValue];
  return arr.filter((v) => v !== buttonValue);
}

// src/INPUTS/ToggleButton/ToggleButton.hooks.ts
import { useContext as useContext19, useCallback as useCallback6 } from "react";
var useToggleGroupFormContext = () => {
  return useContext19(FormContext);
};
var useToggleGroup = ({
  name,
  value,
  onChange,
  exclusive = false,
  disabled = false
}) => {
  const formContext = useToggleGroupFormContext();
  const isFormControlled = !!(formContext && name);
  const groupValue = isFormControlled ? formContext.values[name] ?? (exclusive ? null : []) : value;
  const groupError = isFormControlled ? formContext.errors[name] : void 0;
  const currentValue = exclusive ? groupValue : Array.isArray(groupValue) ? groupValue : [];
  const handleToggleChange = useCallback6(
    (event, buttonValue) => {
      if (disabled) return;
      const newValue = computeNewValue(buttonValue, currentValue, exclusive ?? false);
      if (isFormControlled && formContext && name) {
        formContext.setFieldValue(name, newValue);
      }
      if (onChange) onChange(event, newValue);
    },
    [exclusive, currentValue, onChange, isFormControlled, disabled, name, formContext]
  );
  return {
    currentValue,
    groupError,
    handleToggleChange
  };
};

// src/INPUTS/ToggleButton/ToggleButton.tsx
import { jsx as jsx22, jsxs as jsxs17 } from "react/jsx-runtime";
var ToggleButton = forwardRef17(({
  children,
  value,
  selected = TOGGLE_BUTTON_DEFAULTS.selected,
  onChange,
  color = TOGGLE_BUTTON_DEFAULTS.color,
  size = TOGGLE_BUTTON_DEFAULTS.size,
  fullWidth = TOGGLE_BUTTON_DEFAULTS.fullWidth,
  className = TOGGLE_BUTTON_DEFAULTS.className,
  disabled = TOGGLE_BUTTON_DEFAULTS.disabled,
  "aria-label": ariaLabel,
  role,
  "aria-checked": ariaChecked,
  unstyled = TOGGLE_BUTTON_DEFAULTS.unstyled,
  ...props
}, ref) => {
  const handleClick = (event) => {
    if (!disabled && onChange) {
      onChange(event, value);
    }
  };
  const handleKeyDown = (event) => {
    if ((event.key === " " || event.key === "Enter") && !disabled) {
      event.preventDefault();
      if (onChange) onChange(event, value);
    }
  };
  return /* @__PURE__ */ jsx22(
    "button",
    {
      ref,
      type: "button",
      role: role ?? "button",
      className: buildToggleButtonClasses(selected, color, size, fullWidth, disabled, className, unstyled),
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      "aria-pressed": role ? void 0 : selected,
      "aria-checked": ariaChecked,
      "aria-label": ariaLabel,
      "aria-disabled": disabled,
      disabled,
      tabIndex: disabled ? -1 : 0,
      ...props,
      children
    }
  );
});
ToggleButton.displayName = "ToggleButton";
var ToggleButtonGroup = forwardRef17(({
  name,
  value,
  onChange,
  exclusive = TOGGLE_GROUP_DEFAULTS.exclusive,
  color = TOGGLE_GROUP_DEFAULTS.color,
  size = TOGGLE_GROUP_DEFAULTS.size,
  fullWidth = TOGGLE_GROUP_DEFAULTS.fullWidth,
  orientation = TOGGLE_GROUP_DEFAULTS.orientation,
  className = TOGGLE_GROUP_DEFAULTS.className,
  children,
  label,
  error: propError,
  helperText,
  required = TOGGLE_GROUP_DEFAULTS.required,
  disabled = TOGGLE_GROUP_DEFAULTS.disabled,
  "aria-label": ariaLabel,
  ...props
}, ref) => {
  const { currentValue, groupError, handleToggleChange } = useToggleGroup({
    name,
    value,
    onChange,
    exclusive,
    disabled
  });
  const fieldError = name ? groupError : propError;
  const hasError = Boolean(fieldError);
  const validChildren = React20.Children.toArray(children).filter(
    (child) => React20.isValidElement(child)
  );
  return /* @__PURE__ */ jsxs17("div", { ref, className: TOGGLE_GROUP_CLASSES.wrapper, children: [
    label && /* @__PURE__ */ jsxs17("label", { className: TOGGLE_GROUP_CLASSES.label, children: [
      label,
      required && /* @__PURE__ */ jsx22("span", { className: TOGGLE_GROUP_CLASSES.required, children: " *" })
    ] }),
    /* @__PURE__ */ jsx22(
      "div",
      {
        className: buildToggleGroupClasses(orientation, fullWidth, hasError, disabled, className),
        role: exclusive ? "radiogroup" : "group",
        "aria-label": ariaLabel || label,
        "aria-required": required,
        "aria-invalid": hasError,
        "aria-describedby": fieldError ? `${name ?? "tg"}-error` : helperText ? `${name ?? "tg"}-helper` : void 0,
        ...props,
        children: validChildren.map((child) => {
          const buttonValue = child.props.value;
          const selected = isSelected(buttonValue, currentValue, exclusive);
          return React20.cloneElement(child, {
            key: String(buttonValue),
            selected,
            onChange: handleToggleChange,
            color: child.props.color ?? color,
            size: child.props.size ?? size,
            fullWidth,
            disabled: child.props.disabled || disabled,
            role: exclusive ? "radio" : "checkbox",
            "aria-checked": selected
          });
        })
      }
    ),
    /* @__PURE__ */ jsx22("div", { className: TOGGLE_GROUP_CLASSES.paddingX, children: fieldError ? /* @__PURE__ */ jsx22(
      "p",
      {
        id: `${name ?? "tg"}-error`,
        className: `${TOGGLE_GROUP_CLASSES.message} ${TOGGLE_GROUP_CLASSES.messageError}`,
        role: "alert",
        children: fieldError
      }
    ) : helperText ? /* @__PURE__ */ jsx22(
      "p",
      {
        id: `${name ?? "tg"}-helper`,
        className: `${TOGGLE_GROUP_CLASSES.message} ${TOGGLE_GROUP_CLASSES.messageHelper}`,
        children: helperText
      }
    ) : null }),
    name && /* @__PURE__ */ jsx22(
      "input",
      {
        type: "hidden",
        name,
        value: exclusive ? String(currentValue ?? "") : JSON.stringify(currentValue)
      }
    )
  ] });
});
ToggleButtonGroup.displayName = "ToggleButtonGroup";

// src/INPUTS/TransferList/TransferList.tsx
import { forwardRef as forwardRef18, useRef as useRef8, useCallback as useCallback8, useEffect as useEffect9 } from "react";
import { Search as Search3, ChevronsRight as ChevronsRight2, ChevronRight as ChevronRight2, ChevronLeft as ChevronLeft2, ChevronsLeft as ChevronsLeft2 } from "lucide-react";

// src/INPUTS/TransferList/TransferList.constants.ts
var TRANSFER_CLASSES = {
  root: "w3f-transfer",
  disabled: "w3f-transfer-disabled",
  panel: "w3f-transfer-panel",
  panelHeader: "w3f-transfer-panel-header",
  panelTitle: "w3f-transfer-panel-title",
  panelCount: "w3f-transfer-panel-count",
  panelDropTarget: "w3f-transfer-panel-drop-target",
  search: "w3f-transfer-search",
  searchIcon: "w3f-transfer-search-icon",
  searchInput: "w3f-transfer-search-input",
  list: "w3f-transfer-list",
  empty: "w3f-transfer-empty",
  item: "w3f-transfer-item",
  itemSelected: "w3f-transfer-item-selected",
  itemDisabled: "w3f-transfer-item-disabled",
  itemDragging: "w3f-transfer-item-dragging",
  itemContent: "w3f-transfer-item-content",
  itemLabel: "w3f-transfer-item-label",
  itemDescription: "w3f-transfer-item-description",
  actions: "w3f-transfer-actions",
  btn: "w3f-transfer-btn",
  dragGhost: "w3f-transfer-drag-ghost",
  dropIndicator: "w3f-transfer-drop-indicator",
  draggingBody: "w3f-transfer-dragging"
};
var DRAG_DEAD_ZONE = 5;
var TRANSFER_LIST_DEFAULTS = {
  sourceTitle: "Disponibles",
  targetTitle: "Seleccionados",
  enableSearch: true,
  height: "360px",
  disabled: false,
  className: "",
  unstyled: false
};

// src/INPUTS/TransferList/TransferList.utils.ts
function filterItems(items, query) {
  if (!query.trim()) return items;
  const q = query.toLowerCase();
  return items.filter(
    (i) => i.label.toLowerCase().includes(q) || i.description && i.description.toLowerCase().includes(q)
  );
}
function getSelectAllState(filtered, selected) {
  const selectable = filtered.filter((i) => !i.disabled);
  if (selectable.length === 0) return { checked: false, indeterminate: false };
  const selectedCount = selectable.filter((i) => selected.has(i.id)).length;
  if (selectedCount === 0) return { checked: false, indeterminate: false };
  if (selectedCount === selectable.length) return { checked: true, indeterminate: false };
  return { checked: false, indeterminate: true };
}
function buildItemClasses(isSelected2, isDisabled) {
  return [
    "w3f-transfer-item",
    isSelected2 && "w3f-transfer-item-selected",
    isDisabled && "w3f-transfer-item-disabled"
  ].filter(Boolean).join(" ");
}

// src/INPUTS/TransferList/TransferList.hooks.ts
import { useState as useState22, useCallback as useCallback7, useMemo as useMemo3 } from "react";
var useTransferList = (initialSource, initialTarget, notify, disabled) => {
  const [sourceList, setSourceList] = useState22(initialSource);
  const [targetList, setTargetList] = useState22(initialTarget);
  const [sourceSelected, setSourceSelected] = useState22(/* @__PURE__ */ new Set());
  const [targetSelected, setTargetSelected] = useState22(/* @__PURE__ */ new Set());
  const [sourceFilter, setSourceFilter] = useState22("");
  const [targetFilter, setTargetFilter] = useState22("");
  const filteredSource = useMemo3(
    () => filterItems(sourceList, sourceFilter),
    [sourceList, sourceFilter]
  );
  const filteredTarget = useMemo3(
    () => filterItems(targetList, targetFilter),
    [targetList, targetFilter]
  );
  const handleItemClick = useCallback7(
    (e, id, side) => {
      if (disabled) return;
      const setSelected = side === "source" ? setSourceSelected : setTargetSelected;
      if (e.ctrlKey || e.metaKey) {
        setSelected((prev) => {
          const next = new Set(prev);
          next.has(id) ? next.delete(id) : next.add(id);
          return next;
        });
      } else {
        setSelected((prev) => {
          if (prev.has(id) && prev.size === 1) return /* @__PURE__ */ new Set();
          return /* @__PURE__ */ new Set([id]);
        });
      }
    },
    [disabled]
  );
  const handleCheckboxChange = useCallback7(
    (id, side) => {
      if (disabled) return;
      const setSelected = side === "source" ? setSourceSelected : setTargetSelected;
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    },
    [disabled]
  );
  const handleSelectAll = useCallback7(
    (side) => {
      if (disabled) return;
      const filtered = side === "source" ? filteredSource : filteredTarget;
      const selected = side === "source" ? sourceSelected : targetSelected;
      const setSelected = side === "source" ? setSourceSelected : setTargetSelected;
      const selectableIds = filtered.filter((i) => !i.disabled).map((i) => i.id);
      const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selected.has(id));
      if (allSelected) {
        setSelected((prev) => {
          const next = new Set(prev);
          selectableIds.forEach((id) => next.delete(id));
          return next;
        });
      } else {
        setSelected((prev) => {
          const next = new Set(prev);
          selectableIds.forEach((id) => next.add(id));
          return next;
        });
      }
    },
    [disabled, filteredSource, filteredTarget, sourceSelected, targetSelected]
  );
  const moveSelectedToTarget = useCallback7(() => {
    if (sourceSelected.size === 0) return;
    const toMove = sourceList.filter((i) => sourceSelected.has(i.id) && !i.disabled);
    if (toMove.length === 0) return;
    const moveIds = new Set(toMove.map((i) => i.id));
    const newSource = sourceList.filter((i) => !moveIds.has(i.id));
    const newTarget = [...targetList, ...toMove];
    setSourceList(newSource);
    setTargetList(newTarget);
    setSourceSelected(/* @__PURE__ */ new Set());
    notify(newSource, newTarget);
  }, [sourceList, targetList, sourceSelected, notify]);
  const moveSelectedToSource = useCallback7(() => {
    if (targetSelected.size === 0) return;
    const toMove = targetList.filter((i) => targetSelected.has(i.id) && !i.disabled);
    if (toMove.length === 0) return;
    const moveIds = new Set(toMove.map((i) => i.id));
    const newTarget = targetList.filter((i) => !moveIds.has(i.id));
    const newSource = [...sourceList, ...toMove];
    setSourceList(newSource);
    setTargetList(newTarget);
    setTargetSelected(/* @__PURE__ */ new Set());
    notify(newSource, newTarget);
  }, [sourceList, targetList, targetSelected, notify]);
  const moveAllToTarget = useCallback7(() => {
    const movable = sourceList.filter((i) => !i.disabled);
    if (movable.length === 0) return;
    const locked = sourceList.filter((i) => i.disabled);
    const newTarget = [...targetList, ...movable];
    setSourceList(locked);
    setTargetList(newTarget);
    setSourceSelected(/* @__PURE__ */ new Set());
    notify(locked, newTarget);
  }, [sourceList, targetList, notify]);
  const moveAllToSource = useCallback7(() => {
    const movable = targetList.filter((i) => !i.disabled);
    if (movable.length === 0) return;
    const locked = targetList.filter((i) => i.disabled);
    const newSource = [...sourceList, ...movable];
    setSourceList(newSource);
    setTargetList(locked);
    setTargetSelected(/* @__PURE__ */ new Set());
    notify(newSource, locked);
  }, [sourceList, targetList, notify]);
  return {
    sourceList,
    setSourceList,
    targetList,
    setTargetList,
    sourceSelected,
    setSourceSelected,
    targetSelected,
    setTargetSelected,
    sourceFilter,
    setSourceFilter,
    targetFilter,
    setTargetFilter,
    filteredSource,
    filteredTarget,
    handleItemClick,
    handleCheckboxChange,
    handleSelectAll,
    moveSelectedToTarget,
    moveSelectedToSource,
    moveAllToTarget,
    moveAllToSource
  };
};

// src/INPUTS/TransferList/TransferList.tsx
import { useBridgeBind as useBridgeBind14 } from "@w3f/bridge";
import { jsx as jsx23, jsxs as jsxs18 } from "react/jsx-runtime";
var TransferList = forwardRef18(({
  sourceItems = [],
  targetItems = [],
  onChange,
  sourceTitle = TRANSFER_LIST_DEFAULTS.sourceTitle,
  targetTitle = TRANSFER_LIST_DEFAULTS.targetTitle,
  enableSearch = TRANSFER_LIST_DEFAULTS.enableSearch,
  height = TRANSFER_LIST_DEFAULTS.height,
  disabled = TRANSFER_LIST_DEFAULTS.disabled,
  className = TRANSFER_LIST_DEFAULTS.className,
  unstyled = TRANSFER_LIST_DEFAULTS.unstyled,
  bindId
}, ref) => {
  const dragRef = useRef8(null);
  const ghostRef = useRef8(null);
  const dropIndicatorRef = useRef8(null);
  const sourcePanelRef = useRef8(null);
  const targetPanelRef = useRef8(null);
  const { dispatch } = useBridgeBind14({ bindId });
  const notify = useCallback8(
    (src, tgt) => {
      dispatch("change", { value: tgt.map((i) => i.label) });
      if (onChange) onChange(src, tgt);
    },
    [onChange, dispatch]
  );
  const {
    sourceList,
    setSourceList,
    targetList,
    setTargetList,
    sourceSelected,
    setSourceSelected,
    targetSelected,
    setTargetSelected,
    sourceFilter,
    setSourceFilter,
    targetFilter,
    setTargetFilter,
    filteredSource,
    filteredTarget,
    handleItemClick,
    handleCheckboxChange,
    handleSelectAll,
    moveSelectedToTarget,
    moveSelectedToSource,
    moveAllToTarget,
    moveAllToSource
  } = useTransferList(sourceItems, targetItems, notify, disabled);
  useEffect9(() => {
    setSourceList(sourceItems);
  }, [sourceItems]);
  useEffect9(() => {
    setTargetList(targetItems);
  }, [targetItems]);
  const handleDragMouseDown = useCallback8(
    (e, item, side) => {
      if (disabled || item.disabled) return;
      if (e.button !== 0) return;
      const startX = e.clientX;
      const startY = e.clientY;
      let isDragging = false;
      const selected = side === "source" ? sourceSelected : targetSelected;
      const dragIds = selected.has(item.id) ? new Set(selected) : /* @__PURE__ */ new Set([item.id]);
      const listFrom = side === "source" ? sourceList : targetList;
      const dragItems = listFrom.filter((i) => dragIds.has(i.id));
      const onMouseMove = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        if (!isDragging && Math.sqrt(dx * dx + dy * dy) < DRAG_DEAD_ZONE) return;
        if (!isDragging) {
          isDragging = true;
          dragRef.current = { item, side, dragItems, dragIds, dropTarget: null, dropIndex: -1 };
          document.body.classList.add(TRANSFER_CLASSES.draggingBody);
          dragIds.forEach((id) => {
            const el = document.querySelector(`[data-transfer-id="${id}"]`);
            if (el) el.classList.add(TRANSFER_CLASSES.itemDragging);
          });
          const ghost = document.createElement("div");
          ghost.className = TRANSFER_CLASSES.dragGhost;
          ghost.textContent = dragItems.length > 1 ? `${dragItems[0].label} (+${dragItems.length - 1})` : item.label;
          document.body.appendChild(ghost);
          ghostRef.current = ghost;
          const indicator = document.createElement("div");
          indicator.className = TRANSFER_CLASSES.dropIndicator;
          indicator.style.display = "none";
          document.body.appendChild(indicator);
          dropIndicatorRef.current = indicator;
        }
        if (ghostRef.current) {
          ghostRef.current.style.left = `${moveEvent.clientX + 14}px`;
          ghostRef.current.style.top = `${moveEvent.clientY - 12}px`;
        }
        const srcRect = sourcePanelRef.current?.getBoundingClientRect();
        const tgtRect = targetPanelRef.current?.getBoundingClientRect();
        let overPanel = null;
        if (srcRect && moveEvent.clientX >= srcRect.left && moveEvent.clientX <= srcRect.right && moveEvent.clientY >= srcRect.top && moveEvent.clientY <= srcRect.bottom) {
          overPanel = "source";
        } else if (tgtRect && moveEvent.clientX >= tgtRect.left && moveEvent.clientX <= tgtRect.right && moveEvent.clientY >= tgtRect.top && moveEvent.clientY <= tgtRect.bottom) {
          overPanel = "target";
        }
        sourcePanelRef.current?.classList.toggle(TRANSFER_CLASSES.panelDropTarget, overPanel === "source");
        targetPanelRef.current?.classList.toggle(TRANSFER_CLASSES.panelDropTarget, overPanel === "target");
        if (dragRef.current) {
          dragRef.current.dropTarget = overPanel;
          dragRef.current.dropIndex = -1;
        }
        if (overPanel && dropIndicatorRef.current) {
          const panelRef = overPanel === "source" ? sourcePanelRef : targetPanelRef;
          const listEl = panelRef.current?.querySelector(".w3f-transfer-list");
          if (listEl) {
            const items = Array.from(listEl.querySelectorAll(".w3f-transfer-item"));
            let closestEdge = null;
            let closestDist = Infinity;
            for (let idx = 0; idx <= items.length; idx++) {
              let edgeY;
              if (idx < items.length) {
                edgeY = items[idx].getBoundingClientRect().top;
              } else if (items.length > 0) {
                edgeY = items[items.length - 1].getBoundingClientRect().bottom;
              } else {
                edgeY = listEl.getBoundingClientRect().top + 4;
              }
              const dist = Math.abs(moveEvent.clientY - edgeY);
              if (dist < closestDist) {
                closestDist = dist;
                closestEdge = { y: edgeY, index: idx };
              }
            }
            if (closestEdge && closestDist < 50) {
              const listRect = listEl.getBoundingClientRect();
              dropIndicatorRef.current.style.display = "block";
              dropIndicatorRef.current.style.left = `${listRect.left + 8}px`;
              dropIndicatorRef.current.style.top = `${closestEdge.y - 1}px`;
              dropIndicatorRef.current.style.width = `${listRect.width - 16}px`;
              if (dragRef.current) dragRef.current.dropIndex = closestEdge.index;
            } else {
              dropIndicatorRef.current.style.display = "none";
            }
          }
        } else if (dropIndicatorRef.current) {
          dropIndicatorRef.current.style.display = "none";
        }
      };
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        if (isDragging && dragRef.current) {
          const { side: fromSide, dragItems: movedItems, dragIds: movedIds, dropTarget, dropIndex } = dragRef.current;
          document.body.classList.remove(TRANSFER_CLASSES.draggingBody);
          movedIds.forEach((id) => {
            const el = document.querySelector(`[data-transfer-id="${id}"]`);
            if (el) el.classList.remove(TRANSFER_CLASSES.itemDragging);
          });
          sourcePanelRef.current?.classList.remove(TRANSFER_CLASSES.panelDropTarget);
          targetPanelRef.current?.classList.remove(TRANSFER_CLASSES.panelDropTarget);
          if (ghostRef.current) {
            ghostRef.current.remove();
            ghostRef.current = null;
          }
          if (dropIndicatorRef.current) {
            dropIndicatorRef.current.remove();
            dropIndicatorRef.current = null;
          }
          if (dropTarget && dropIndex >= 0) {
            if (fromSide === dropTarget) {
              const setList = fromSide === "source" ? setSourceList : setTargetList;
              setList((prev) => {
                const remaining = prev.filter((i) => !movedIds.has(i.id));
                const insertIdx = Math.min(dropIndex, remaining.length);
                remaining.splice(insertIdx, 0, ...movedItems);
                return [...remaining];
              });
            } else {
              const fromList = fromSide === "source" ? sourceList : targetList;
              const toList = dropTarget === "source" ? sourceList : targetList;
              const newFrom = fromList.filter((i) => !movedIds.has(i.id));
              const newTo = [...toList];
              const insertIdx = Math.min(dropIndex, newTo.length);
              newTo.splice(insertIdx, 0, ...movedItems);
              if (fromSide === "source") {
                setSourceList(newFrom);
                setTargetList(newTo);
                setSourceSelected((prev) => {
                  const next = new Set(prev);
                  movedIds.forEach((id) => next.delete(id));
                  return next;
                });
                notify(newFrom, newTo);
              } else {
                setTargetList(newFrom);
                setSourceList(newTo);
                setTargetSelected((prev) => {
                  const next = new Set(prev);
                  movedIds.forEach((id) => next.delete(id));
                  return next;
                });
                notify(newTo, newFrom);
              }
            }
          }
          dragRef.current = null;
        }
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [disabled, sourceList, targetList, sourceSelected, targetSelected, notify]
  );
  const renderPanel = (side) => {
    const title = side === "source" ? sourceTitle : targetTitle;
    const list = side === "source" ? sourceList : targetList;
    const filtered = side === "source" ? filteredSource : filteredTarget;
    const selected = side === "source" ? sourceSelected : targetSelected;
    const filter = side === "source" ? sourceFilter : targetFilter;
    const setFilter = side === "source" ? setSourceFilter : setTargetFilter;
    const panelRef = side === "source" ? sourcePanelRef : targetPanelRef;
    const selectAllState = getSelectAllState(filtered, selected);
    const heightVal = typeof height === "number" ? `${height}px` : height;
    const heightStyle = heightVal !== "360px" ? { "--w3f-tl-height": heightVal } : void 0;
    return /* @__PURE__ */ jsxs18("div", { className: TRANSFER_CLASSES.panel, ref: panelRef, style: heightStyle, children: [
      /* @__PURE__ */ jsxs18("div", { className: TRANSFER_CLASSES.panelHeader, children: [
        /* @__PURE__ */ jsx23(
          "input",
          {
            type: "checkbox",
            checked: selectAllState.checked,
            ref: (el) => {
              if (el) el.indeterminate = selectAllState.indeterminate;
            },
            onChange: () => handleSelectAll(side)
          }
        ),
        /* @__PURE__ */ jsx23("span", { className: TRANSFER_CLASSES.panelTitle, children: title }),
        /* @__PURE__ */ jsxs18("span", { className: TRANSFER_CLASSES.panelCount, children: [
          selected.size > 0 ? `${selected.size}/` : "",
          list.length
        ] })
      ] }),
      enableSearch && /* @__PURE__ */ jsxs18("div", { className: TRANSFER_CLASSES.search, children: [
        /* @__PURE__ */ jsx23("span", { className: TRANSFER_CLASSES.searchIcon, children: /* @__PURE__ */ jsx23(Search3, { size: 14 }) }),
        /* @__PURE__ */ jsx23(
          "input",
          {
            type: "text",
            className: TRANSFER_CLASSES.searchInput,
            placeholder: "Buscar...",
            value: filter,
            onChange: (e) => setFilter(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsx23("div", { className: TRANSFER_CLASSES.list, children: filtered.length === 0 ? /* @__PURE__ */ jsx23("div", { className: TRANSFER_CLASSES.empty, children: "Sin elementos" }) : filtered.map((item) => {
        const isSelected2 = selected.has(item.id);
        return /* @__PURE__ */ jsxs18(
          "div",
          {
            className: buildItemClasses(isSelected2, Boolean(item.disabled)),
            "data-transfer-id": item.id,
            onClick: (e) => !item.disabled && handleItemClick(e, item.id, side),
            onMouseDown: (e) => handleDragMouseDown(e, item, side),
            children: [
              /* @__PURE__ */ jsx23(
                "input",
                {
                  type: "checkbox",
                  checked: isSelected2,
                  onChange: (e) => {
                    e.stopPropagation();
                    handleCheckboxChange(item.id, side);
                  },
                  onClick: (e) => e.stopPropagation(),
                  disabled: item.disabled
                }
              ),
              /* @__PURE__ */ jsxs18("div", { className: TRANSFER_CLASSES.itemContent, children: [
                /* @__PURE__ */ jsx23("div", { className: TRANSFER_CLASSES.itemLabel, children: item.label }),
                item.description && /* @__PURE__ */ jsx23("div", { className: TRANSFER_CLASSES.itemDescription, children: item.description })
              ] })
            ]
          },
          item.id
        );
      }) })
    ] });
  };
  return /* @__PURE__ */ jsxs18(
    "div",
    {
      ref,
      className: [TRANSFER_CLASSES.root, unstyled && "w3f-transfer-list--unstyled", !unstyled && disabled && TRANSFER_CLASSES.disabled, className].filter(Boolean).join(" "),
      children: [
        renderPanel("source"),
        /* @__PURE__ */ jsxs18("div", { className: TRANSFER_CLASSES.actions, children: [
          /* @__PURE__ */ jsx23(
            "button",
            {
              className: TRANSFER_CLASSES.btn,
              onClick: moveAllToTarget,
              disabled: disabled || sourceList.filter((i) => !i.disabled).length === 0,
              title: "Mover todos a la derecha",
              children: /* @__PURE__ */ jsx23(ChevronsRight2, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsx23(
            "button",
            {
              className: TRANSFER_CLASSES.btn,
              onClick: moveSelectedToTarget,
              disabled: disabled || sourceSelected.size === 0,
              title: "Mover seleccionados a la derecha",
              children: /* @__PURE__ */ jsx23(ChevronRight2, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsx23(
            "button",
            {
              className: TRANSFER_CLASSES.btn,
              onClick: moveSelectedToSource,
              disabled: disabled || targetSelected.size === 0,
              title: "Mover seleccionados a la izquierda",
              children: /* @__PURE__ */ jsx23(ChevronLeft2, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsx23(
            "button",
            {
              className: TRANSFER_CLASSES.btn,
              onClick: moveAllToSource,
              disabled: disabled || targetList.filter((i) => !i.disabled).length === 0,
              title: "Mover todos a la izquierda",
              children: /* @__PURE__ */ jsx23(ChevronsLeft2, { size: 18 })
            }
          )
        ] }),
        renderPanel("target")
      ]
    }
  );
});
TransferList.displayName = "TransferList";

// src/NAVIGATION/BottomNavigation/BottomNavigation.tsx
import { forwardRef as forwardRef19, useMemo as useMemo4 } from "react";

// src/NAVIGATION/BottomNavigation/BottomNavigation.constants.ts
var BOTTOM_NAV_DEFAULTS = {
  color: "primary",
  variant: "filled",
  showLabels: true,
  fixed: false,
  disabled: false,
  unstyled: false,
  className: ""
};
var BOTTOM_NAV_ACTION_DEFAULTS = {
  disabled: false,
  className: ""
};
var BOTTOM_NAV_CLASSES = {
  nav: "w3f-bottom-nav",
  action: "w3f-bottom-nav-action",
  actionActive: "w3f-bottom-nav-action--active",
  actionDisabled: "w3f-bottom-nav-action--disabled",
  actionIconOnly: "w3f-bottom-nav-action--icon-only",
  icon: "w3f-bottom-nav-action__icon",
  badge: "w3f-bottom-nav-action__badge",
  label: "w3f-bottom-nav-action__label"
};

// src/NAVIGATION/BottomNavigation/BottomNavigation.utils.ts
function buildBottomNavClasses(variant, color, fixed, disabled, className, unstyled) {
  const base = BOTTOM_NAV_CLASSES.nav;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    `w3f-bottom-nav--${variant}`,
    `w3f-bottom-nav--${color}`,
    fixed && "w3f-bottom-nav--fixed",
    disabled && "w3f-bottom-nav--disabled",
    className
  ].filter(Boolean).join(" ");
}
function buildActionClasses(isActive, disabled, showLabel, className) {
  return [
    BOTTOM_NAV_CLASSES.action,
    isActive && BOTTOM_NAV_CLASSES.actionActive,
    disabled && BOTTOM_NAV_CLASSES.actionDisabled,
    !showLabel && !isActive && BOTTOM_NAV_CLASSES.actionIconOnly,
    className
  ].filter(Boolean).join(" ");
}
function formatBadge(badge) {
  if (typeof badge === "number" && badge > 99) return "99+";
  return badge;
}

// src/NAVIGATION/BottomNavigation/BottomNavigation.hooks.ts
import { useState as useState23, useCallback as useCallback9, useContext as useContext20, createContext as createContext3 } from "react";
var BottomNavContext = createContext3({
  value: null,
  onChange: () => {
  },
  showLabels: true,
  color: "primary"
});
function useBottomNav(valueProp, defaultValue, onChange, disabled) {
  const [internalValue, setInternalValue] = useState23(
    defaultValue ?? null
  );
  const isControlled = valueProp !== void 0;
  const currentValue = isControlled ? valueProp : internalValue;
  const handleChange = useCallback9(
    (e, newValue) => {
      if (disabled) return;
      if (!isControlled) setInternalValue(newValue);
      if (onChange) onChange(e, newValue);
    },
    [disabled, isControlled, onChange]
  );
  return { currentValue, handleChange };
}
function useBottomNavAction() {
  return useContext20(BottomNavContext);
}
function useBottomNavContext(currentValue, handleChange, showLabels, color) {
  return { value: currentValue, onChange: handleChange, showLabels, color };
}

// src/NAVIGATION/BottomNavigation/BottomNavigation.tsx
import { jsx as jsx24, jsxs as jsxs19 } from "react/jsx-runtime";
var BottomNavigationAction = ({
  icon,
  label,
  value,
  showLabel: showLabelProp,
  disabled = BOTTOM_NAV_ACTION_DEFAULTS.disabled,
  badge,
  className = BOTTOM_NAV_ACTION_DEFAULTS.className,
  onClick,
  ...props
}) => {
  const ctx = useBottomNavAction();
  const isActive = ctx.value === value;
  const showLabel = showLabelProp !== void 0 ? showLabelProp : ctx.showLabels;
  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
    if (ctx.onChange && value !== void 0) ctx.onChange(e, value);
  };
  const cls = useMemo4(
    () => buildActionClasses(isActive, disabled, showLabel, className),
    [isActive, disabled, showLabel, className]
  );
  return /* @__PURE__ */ jsxs19(
    "button",
    {
      className: cls,
      onClick: handleClick,
      disabled,
      role: "tab",
      "aria-selected": isActive,
      "aria-label": label,
      ...props,
      children: [
        /* @__PURE__ */ jsxs19("span", { className: BOTTOM_NAV_CLASSES.icon, children: [
          icon,
          badge !== void 0 && badge !== null && /* @__PURE__ */ jsx24("span", { className: BOTTOM_NAV_CLASSES.badge, children: formatBadge(badge) })
        ] }),
        label && (showLabel || isActive) && /* @__PURE__ */ jsx24("span", { className: BOTTOM_NAV_CLASSES.label, children: label })
      ]
    }
  );
};
BottomNavigationAction.displayName = "BottomNavigationAction";
var BottomNavigation = forwardRef19(({
  value: valueProp,
  defaultValue,
  onChange,
  showLabels = BOTTOM_NAV_DEFAULTS.showLabels,
  color = BOTTOM_NAV_DEFAULTS.color,
  variant = BOTTOM_NAV_DEFAULTS.variant,
  fixed = BOTTOM_NAV_DEFAULTS.fixed,
  disabled = BOTTOM_NAV_DEFAULTS.disabled,
  unstyled = BOTTOM_NAV_DEFAULTS.unstyled,
  className = BOTTOM_NAV_DEFAULTS.className,
  children,
  ...props
}, ref) => {
  const { currentValue, handleChange } = useBottomNav(valueProp, defaultValue, onChange, disabled);
  const ctxValue = useBottomNavContext(currentValue, handleChange, showLabels, color);
  const cls = useMemo4(
    () => buildBottomNavClasses(variant, color, fixed, disabled, className, unstyled),
    [variant, color, fixed, disabled, className, unstyled]
  );
  return /* @__PURE__ */ jsx24(BottomNavContext.Provider, { value: ctxValue, children: /* @__PURE__ */ jsx24("nav", { ref, className: cls, role: "tablist", ...props, children }) });
});
BottomNavigation.displayName = "BottomNavigation";

// src/NAVIGATION/Breadcrumbs/Breadcrumbs.tsx
import React23, { forwardRef as forwardRef20, useMemo as useMemo5, useCallback as useCallback10 } from "react";
import { ChevronRight as ChevronRight3, MoreHorizontal as MoreHorizontal2 } from "lucide-react";

// src/NAVIGATION/Breadcrumbs/Breadcrumbs.constants.ts
var BREADCRUMBS_DEFAULTS = {
  maxItems: 0,
  itemsBeforeCollapse: 1,
  itemsAfterCollapse: 1,
  expandText: "Mostrar ruta",
  color: "default",
  size: "md",
  unstyled: false,
  className: ""
};
var BREADCRUMB_ITEM_DEFAULTS = {
  active: false,
  disabled: false,
  className: ""
};
var BREADCRUMBS_CLASSES = {
  nav: "w3f-breadcrumbs",
  list: "w3f-breadcrumbs__list",
  item: "w3f-breadcrumbs__item",
  separator: "w3f-breadcrumbs__separator",
  expandBtn: "w3f-breadcrumb-expand",
  crumb: "w3f-breadcrumb-item",
  crumbActive: "w3f-breadcrumb-item--active",
  crumbDisabled: "w3f-breadcrumb-item--disabled",
  crumbIcon: "w3f-breadcrumb-item__icon",
  crumbText: "w3f-breadcrumb-item__text"
};
var BREADCRUMBS_VARIANT_CLASSES = {
  solid: "w3f-breadcrumbs--solid",
  outlined: "w3f-breadcrumbs--outlined",
  ghost: "w3f-breadcrumbs--ghost",
  soft: "w3f-breadcrumbs--soft"
};
var ELLIPSIS_KEY = "__ellipsis";

// src/NAVIGATION/Breadcrumbs/Breadcrumbs.utils.ts
function buildBreadcrumbsClasses(size, color, className, unstyled, variant) {
  if (unstyled) {
    return [BREADCRUMBS_CLASSES.nav, "w3f-breadcrumbs--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    BREADCRUMBS_CLASSES.nav,
    `w3f-breadcrumbs--${size}`,
    color !== "default" && `w3f-breadcrumbs--${color}`,
    variant && BREADCRUMBS_VARIANT_CLASSES[variant],
    className
  ].filter(Boolean).join(" ");
}
function buildBreadcrumbItemClasses(active, disabled, className) {
  return [
    BREADCRUMBS_CLASSES.crumb,
    active && BREADCRUMBS_CLASSES.crumbActive,
    disabled && BREADCRUMBS_CLASSES.crumbDisabled,
    className
  ].filter(Boolean).join(" ");
}
function computeVisibleItems(items, expanded, maxItems, itemsBeforeCollapse, itemsAfterCollapse) {
  const shouldCollapse = maxItems > 0 && items.length > maxItems && !expanded;
  if (!shouldCollapse) return items;
  const before = items.slice(0, itemsBeforeCollapse);
  const after = items.slice(items.length - itemsAfterCollapse);
  return [...before, ELLIPSIS_KEY, ...after];
}

// src/NAVIGATION/Breadcrumbs/Breadcrumbs.hooks.ts
import { useState as useState24 } from "react";
function useBreadcrumbsExpand() {
  const [expanded, setExpanded] = useState24(false);
  const expand = () => setExpanded(true);
  return { expanded, expand };
}

// src/utils/sanitizeUrl.ts
var BLOCKED_PROTOCOLS = /^(javascript|data|vbscript):/i;
function sanitizeUrl(url) {
  if (!url) return url;
  const trimmed = url.trim();
  if (BLOCKED_PROTOCOLS.test(trimmed)) return void 0;
  return trimmed;
}

// src/NAVIGATION/Breadcrumbs/Breadcrumbs.tsx
import { Fragment as Fragment3, jsx as jsx25, jsxs as jsxs20 } from "react/jsx-runtime";
var BreadcrumbItem = ({
  href,
  icon,
  children,
  active = BREADCRUMB_ITEM_DEFAULTS.active,
  disabled = BREADCRUMB_ITEM_DEFAULTS.disabled,
  onClick,
  className = BREADCRUMB_ITEM_DEFAULTS.className,
  ...props
}) => {
  const cls = useMemo5(
    () => buildBreadcrumbItemClasses(active, disabled, className),
    [active, disabled, className]
  );
  const handleClick = useCallback10(
    (e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (onClick) onClick(e);
    },
    [disabled, onClick]
  );
  const content = /* @__PURE__ */ jsxs20(Fragment3, { children: [
    icon && /* @__PURE__ */ jsx25("span", { className: BREADCRUMBS_CLASSES.crumbIcon, children: icon }),
    children && /* @__PURE__ */ jsx25("span", { className: BREADCRUMBS_CLASSES.crumbText, children })
  ] });
  if (active || !href && !onClick) {
    return /* @__PURE__ */ jsx25("span", { className: cls, "aria-current": active ? "page" : void 0, ...props, children: content });
  }
  return /* @__PURE__ */ jsx25("a", { className: cls, href: sanitizeUrl(href) || "#", onClick: handleClick, ...props, children: content });
};
BreadcrumbItem.displayName = "BreadcrumbItem";
var Breadcrumbs = forwardRef20(({
  children,
  separator,
  maxItems = BREADCRUMBS_DEFAULTS.maxItems,
  itemsBeforeCollapse = BREADCRUMBS_DEFAULTS.itemsBeforeCollapse,
  itemsAfterCollapse = BREADCRUMBS_DEFAULTS.itemsAfterCollapse,
  expandText = BREADCRUMBS_DEFAULTS.expandText,
  color = BREADCRUMBS_DEFAULTS.color,
  size = BREADCRUMBS_DEFAULTS.size,
  variant,
  unstyled = BREADCRUMBS_DEFAULTS.unstyled,
  className = BREADCRUMBS_DEFAULTS.className,
  ...props
}, ref) => {
  const { expanded, expand } = useBreadcrumbsExpand();
  const items = useMemo5(
    () => React23.Children.toArray(children).filter(Boolean),
    [children]
  );
  const visibleItems = useMemo5(
    () => computeVisibleItems(items, expanded, maxItems, itemsBeforeCollapse, itemsAfterCollapse),
    [items, expanded, maxItems, itemsBeforeCollapse, itemsAfterCollapse]
  );
  const separatorNode = separator || /* @__PURE__ */ jsx25(ChevronRight3, { size: 14 });
  const cls = useMemo5(
    () => buildBreadcrumbsClasses(size, color, className, unstyled, variant),
    [size, color, className, unstyled, variant]
  );
  return /* @__PURE__ */ jsx25("nav", { ref, className: cls, "aria-label": "breadcrumb", ...props, children: /* @__PURE__ */ jsx25("ol", { className: BREADCRUMBS_CLASSES.list, children: visibleItems.map((item, index) => {
    const isLast = index === visibleItems.length - 1;
    if (item === ELLIPSIS_KEY) {
      return /* @__PURE__ */ jsxs20("li", { className: BREADCRUMBS_CLASSES.item, children: [
        /* @__PURE__ */ jsx25(
          "button",
          {
            className: BREADCRUMBS_CLASSES.expandBtn,
            onClick: expand,
            "aria-label": expandText,
            title: expandText,
            children: /* @__PURE__ */ jsx25(MoreHorizontal2, { size: 16 })
          }
        ),
        !isLast && /* @__PURE__ */ jsx25("span", { className: BREADCRUMBS_CLASSES.separator, "aria-hidden": "true", children: separatorNode })
      ] }, "__ellipsis");
    }
    const reactItem = item;
    return /* @__PURE__ */ jsxs20(
      "li",
      {
        className: BREADCRUMBS_CLASSES.item,
        children: [
          item,
          !isLast && /* @__PURE__ */ jsx25(
            "span",
            {
              className: BREADCRUMBS_CLASSES.separator,
              "aria-hidden": "true",
              children: separatorNode
            }
          )
        ]
      },
      reactItem.key ?? index
    );
  }) }) });
});
Breadcrumbs.displayName = "Breadcrumbs";

// src/NAVIGATION/Drawer/Drawer.tsx
import { forwardRef as forwardRef21, useRef as useRef10, useCallback as useCallback12 } from "react";
import { X as X5 } from "lucide-react";

// src/NAVIGATION/Drawer/Drawer.constants.ts
var DRAWER_DEFAULTS = {
  open: false,
  anchor: "left",
  variant: "temporary",
  width: 280,
  height: 300,
  showBackdrop: true,
  showCloseButton: false,
  closeOnBackdropClick: true,
  closeOnEsc: true,
  color: "default",
  unstyled: false,
  className: "",
  animationDuration: 300
};
var DRAWER_CLASSES = {
  root: "w3f-drawer-root",
  rootOpen: "w3f-drawer-root--open",
  drawer: "w3f-drawer",
  open: "w3f-drawer--open",
  backdrop: "w3f-drawer__backdrop",
  close: "w3f-drawer__close",
  content: "w3f-drawer__content"
};

// src/NAVIGATION/Drawer/Drawer.utils.ts
function buildDrawerClasses(anchor, variant, color, visible, open, className, unstyled) {
  if (unstyled) {
    return [DRAWER_CLASSES.drawer, "w3f-drawer--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    DRAWER_CLASSES.drawer,
    `w3f-drawer--${anchor}`,
    `w3f-drawer--${variant}`,
    color !== "default" && `w3f-drawer--${color}`,
    visible && open && DRAWER_CLASSES.open,
    className
  ].filter(Boolean).join(" ");
}
function buildDrawerSizeStyle(anchor, width, height) {
  const isHorizontal = anchor === "left" || anchor === "right";
  return isHorizontal ? { width: typeof width === "number" ? `${width}px` : width } : { height: typeof height === "number" ? `${height}px` : height };
}

// src/NAVIGATION/Drawer/Drawer.hooks.ts
import { useState as useState25, useEffect as useEffect10 } from "react";
function useDrawerAnimation(open, variant) {
  const [mounted, setMounted] = useState25(false);
  const [visible, setVisible] = useState25(false);
  useEffect10(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      if (variant === "temporary") {
        const timer = setTimeout(
          () => setMounted(false),
          DRAWER_DEFAULTS.animationDuration
        );
        return () => clearTimeout(timer);
      }
    }
  }, [open, variant]);
  return { mounted, visible };
}
function useDrawerEscKey(open, closeOnEsc, variant, onClose) {
  useEffect10(() => {
    if (!open || !closeOnEsc || variant === "permanent") return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && onClose) onClose(e, "escapeKeyDown");
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEsc, onClose, variant]);
}
function useDrawerBodyScroll(open, variant) {
  useEffect10(() => {
    if (variant !== "temporary") return;
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open, variant]);
}
function useDrawerFocusTrap(open, variant, drawerRef) {
  useEffect10(() => {
    if (!open || variant !== "temporary" || !drawerRef.current) return;
    const prev = document.activeElement;
    drawerRef.current.focus();
    return () => {
      if (prev?.focus) prev.focus();
    };
  }, [open, variant, drawerRef]);
}

// src/NAVIGATION/Drawer/Drawer.tsx
import { jsx as jsx26, jsxs as jsxs21 } from "react/jsx-runtime";
var Drawer = forwardRef21(({
  open = DRAWER_DEFAULTS.open,
  onClose,
  anchor = DRAWER_DEFAULTS.anchor,
  variant = DRAWER_DEFAULTS.variant,
  width = DRAWER_DEFAULTS.width,
  height = DRAWER_DEFAULTS.height,
  showBackdrop = DRAWER_DEFAULTS.showBackdrop,
  showCloseButton = DRAWER_DEFAULTS.showCloseButton,
  closeOnBackdropClick = DRAWER_DEFAULTS.closeOnBackdropClick,
  closeOnEsc = DRAWER_DEFAULTS.closeOnEsc,
  color = DRAWER_DEFAULTS.color,
  unstyled = DRAWER_DEFAULTS.unstyled,
  className = DRAWER_DEFAULTS.className,
  children,
  ...props
}, ref) => {
  const drawerRef = useRef10(null);
  const { mounted, visible } = useDrawerAnimation(open, variant);
  useDrawerEscKey(open, closeOnEsc, variant, onClose);
  useDrawerBodyScroll(open, variant);
  useDrawerFocusTrap(open, variant, drawerRef);
  const handleBackdropClick = useCallback12(
    (e) => {
      if (closeOnBackdropClick && onClose) onClose(e, "backdropClick");
    },
    [closeOnBackdropClick, onClose]
  );
  const handleCloseButton = useCallback12(
    (e) => {
      if (onClose) onClose(e, "closeButton");
    },
    [onClose]
  );
  const drawerCls = buildDrawerClasses(anchor, variant, color, visible, open, className, unstyled);
  const sizeStyle = buildDrawerSizeStyle(anchor, width, height);
  if (variant === "permanent") {
    return /* @__PURE__ */ jsx26("aside", { className: drawerCls, style: sizeStyle, ref: (node) => {
      drawerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }, ...props, children: /* @__PURE__ */ jsx26("div", { className: DRAWER_CLASSES.content, children }) });
  }
  if (variant === "persistent") {
    return /* @__PURE__ */ jsxs21("aside", { className: drawerCls, style: sizeStyle, ref: (node) => {
      drawerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }, ...props, children: [
      showCloseButton && /* @__PURE__ */ jsx26(
        "button",
        {
          className: DRAWER_CLASSES.close,
          onClick: handleCloseButton,
          "aria-label": "Cerrar",
          children: /* @__PURE__ */ jsx26(X5, { size: 20 })
        }
      ),
      /* @__PURE__ */ jsx26("div", { className: DRAWER_CLASSES.content, children })
    ] });
  }
  if (!mounted) return null;
  return /* @__PURE__ */ jsxs21(
    "div",
    {
      ref,
      className: `${DRAWER_CLASSES.root} ${visible && open ? DRAWER_CLASSES.rootOpen : ""}`,
      children: [
        showBackdrop && /* @__PURE__ */ jsx26(
          "div",
          {
            className: DRAWER_CLASSES.backdrop,
            onClick: handleBackdropClick,
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxs21(
          "aside",
          {
            className: drawerCls,
            style: sizeStyle,
            ref: drawerRef,
            tabIndex: -1,
            role: "dialog",
            "aria-modal": "true",
            ...props,
            children: [
              showCloseButton && /* @__PURE__ */ jsx26(
                "button",
                {
                  className: DRAWER_CLASSES.close,
                  onClick: handleCloseButton,
                  "aria-label": "Cerrar",
                  children: /* @__PURE__ */ jsx26(X5, { size: 20 })
                }
              ),
              /* @__PURE__ */ jsx26("div", { className: DRAWER_CLASSES.content, children })
            ]
          }
        )
      ]
    }
  );
});
Drawer.displayName = "Drawer";

// src/NAVIGATION/Link/Link.tsx
import { forwardRef as forwardRef22, useMemo as useMemo6 } from "react";

// src/NAVIGATION/Link/Link.constants.ts
var LINK_DEFAULTS = {
  color: "primary",
  underline: "always",
  variant: "body1",
  disabled: false,
  external: false,
  iconPosition: "left",
  unstyled: false,
  className: ""
};
var LINK_CLASSES = {
  base: "w3f-link",
  button: "w3f-link--button",
  disabled: "w3f-link--disabled",
  icon: "w3f-link__icon"
};

// src/NAVIGATION/Link/Link.utils.ts
function buildLinkClasses(color, underline, variant, disabled, isButton, className, unstyled) {
  if (unstyled) {
    return [LINK_CLASSES.base, "w3f-link--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    LINK_CLASSES.base,
    `w3f-link--${color}`,
    `w3f-link--underline-${underline}`,
    `w3f-link--${variant}`,
    disabled && LINK_CLASSES.disabled,
    isButton && LINK_CLASSES.button,
    className
  ].filter(Boolean).join(" ");
}
function buildExternalProps(external, isButton) {
  return external && !isButton ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

// src/NAVIGATION/Link/Link.hooks.ts
function useLinkClick(disabled, onClick) {
  return (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
  };
}

// src/NAVIGATION/Link/Link.tsx
import { Fragment as Fragment4, jsx as jsx27, jsxs as jsxs22 } from "react/jsx-runtime";
var Link = forwardRef22(({
  href,
  children,
  color = LINK_DEFAULTS.color,
  underline = LINK_DEFAULTS.underline,
  variant = LINK_DEFAULTS.variant,
  component,
  disabled = LINK_DEFAULTS.disabled,
  external = LINK_DEFAULTS.external,
  icon,
  iconPosition = LINK_DEFAULTS.iconPosition,
  unstyled = LINK_DEFAULTS.unstyled,
  className = LINK_DEFAULTS.className,
  onClick,
  ...props
}, ref) => {
  const Tag3 = component || (href ? "a" : "button");
  const isButton = Tag3 === "button";
  const cls = useMemo6(
    () => buildLinkClasses(color, underline, variant, disabled, isButton, className, unstyled),
    [color, underline, variant, disabled, isButton, className, unstyled]
  );
  const externalProps = buildExternalProps(external, isButton);
  const handleClick = useLinkClick(disabled, onClick);
  const content = /* @__PURE__ */ jsxs22(Fragment4, { children: [
    icon && iconPosition === "left" && /* @__PURE__ */ jsx27("span", { className: LINK_CLASSES.icon, children: icon }),
    children,
    icon && iconPosition === "right" && /* @__PURE__ */ jsx27("span", { className: LINK_CLASSES.icon, children: icon })
  ] });
  if (isButton) {
    return /* @__PURE__ */ jsx27(
      "button",
      {
        ref,
        className: cls,
        onClick: handleClick,
        disabled,
        type: "button",
        ...props,
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsx27(
    "a",
    {
      ref,
      className: cls,
      href: disabled ? void 0 : sanitizeUrl(href),
      onClick: handleClick,
      "aria-disabled": disabled || void 0,
      ...externalProps,
      ...props,
      children: content
    }
  );
});
Link.displayName = "Link";

// src/NAVIGATION/Pagination/Pagination.tsx
import { forwardRef as forwardRef23, useMemo as useMemo7 } from "react";
import {
  ChevronLeft as ChevronLeft3,
  ChevronRight as ChevronRight4,
  ChevronsLeft as ChevronsLeft3,
  ChevronsRight as ChevronsRight3,
  MoreHorizontal as MoreHorizontal3
} from "lucide-react";

// src/NAVIGATION/Pagination/Pagination.constants.ts
var PAGINATION_DEFAULTS = {
  count: 1,
  defaultPage: 1,
  variant: "text",
  shape: "rounded",
  size: "md",
  color: "primary",
  disabled: false,
  siblingCount: 1,
  boundaryCount: 1,
  showFirstButton: false,
  showLastButton: false,
  hideNextButton: false,
  hidePrevButton: false,
  unstyled: false,
  className: ""
};
var PAGINATION_CLASSES = {
  nav: "w3f-pagination",
  list: "w3f-pagination__list",
  item: "w3f-pagination__item",
  nav_btn: "w3f-pagination__nav",
  page: "w3f-pagination__page",
  pageActive: "w3f-pagination__page--active",
  ellipsis: "w3f-pagination__ellipsis"
};
var PAGINATION_ICON_SIZES = {
  sm: 16,
  md: 18,
  lg: 22
};

// src/NAVIGATION/Pagination/Pagination.utils.ts
function range(start, end) {
  const arr = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}
function buildPages(count, current, siblingCount, boundaryCount) {
  const totalSlots = boundaryCount * 2 + siblingCount * 2 + 3;
  if (count <= totalSlots) return range(1, count);
  const leftBound = Math.max(current - siblingCount, boundaryCount + 2);
  const rightBound = Math.min(current + siblingCount, count - boundaryCount - 1);
  const showLeftEllipsis = leftBound > boundaryCount + 2;
  const showRightEllipsis = rightBound < count - boundaryCount - 1;
  const items = [];
  for (let i = 1; i <= Math.min(boundaryCount, count); i++) items.push(i);
  if (showLeftEllipsis) {
    items.push("ellipsis-left");
  } else {
    for (let i = boundaryCount + 1; i < leftBound; i++) items.push(i);
  }
  for (let i = leftBound; i <= rightBound; i++) items.push(i);
  if (showRightEllipsis) {
    items.push("ellipsis-right");
  } else {
    for (let i = rightBound + 1; i <= count - boundaryCount; i++) items.push(i);
  }
  for (let i = Math.max(count - boundaryCount + 1, rightBound + 1); i <= count; i++)
    items.push(i);
  return items;
}
function buildPaginationClasses(variant, shape, size, color, disabled, className, unstyled) {
  if (unstyled) {
    return [PAGINATION_CLASSES.nav, "w3f-pagination--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    PAGINATION_CLASSES.nav,
    `w3f-pagination--${variant}`,
    `w3f-pagination--${shape}`,
    `w3f-pagination--${size}`,
    `w3f-pagination--${color}`,
    disabled && "w3f-pagination--disabled",
    className
  ].filter(Boolean).join(" ");
}
function buildPageItemClasses(isActive) {
  return [
    PAGINATION_CLASSES.item,
    PAGINATION_CLASSES.page,
    isActive && PAGINATION_CLASSES.pageActive
  ].filter(Boolean).join(" ");
}

// src/NAVIGATION/Pagination/Pagination.hooks.ts
import { useState as useState26, useCallback as useCallback13 } from "react";
function usePaginationPage(pageProp, defaultPage, count, disabled, onChange) {
  const [internalPage, setInternalPage] = useState26(defaultPage);
  const isControlled = pageProp !== void 0;
  const currentPage = isControlled ? pageProp : internalPage;
  const handlePageChange = useCallback13(
    (e, newPage) => {
      if (disabled || newPage < 1 || newPage > count || newPage === currentPage) return;
      if (!isControlled) setInternalPage(newPage);
      if (onChange) onChange(e, newPage);
    },
    [disabled, count, currentPage, isControlled, onChange]
  );
  return { currentPage, handlePageChange };
}

// src/NAVIGATION/Pagination/Pagination.tsx
import { jsx as jsx28, jsxs as jsxs23 } from "react/jsx-runtime";
var Pagination = forwardRef23(
  ({
    count = PAGINATION_DEFAULTS.count,
    page: pageProp,
    defaultPage = PAGINATION_DEFAULTS.defaultPage,
    onChange,
    variant = PAGINATION_DEFAULTS.variant,
    shape = PAGINATION_DEFAULTS.shape,
    size = PAGINATION_DEFAULTS.size,
    color = PAGINATION_DEFAULTS.color,
    disabled = PAGINATION_DEFAULTS.disabled,
    siblingCount = PAGINATION_DEFAULTS.siblingCount,
    boundaryCount = PAGINATION_DEFAULTS.boundaryCount,
    showFirstButton = PAGINATION_DEFAULTS.showFirstButton,
    showLastButton = PAGINATION_DEFAULTS.showLastButton,
    hideNextButton = PAGINATION_DEFAULTS.hideNextButton,
    hidePrevButton = PAGINATION_DEFAULTS.hidePrevButton,
    unstyled = PAGINATION_DEFAULTS.unstyled,
    className = PAGINATION_DEFAULTS.className,
    ...props
  }, ref) => {
    const { currentPage, handlePageChange } = usePaginationPage(
      pageProp,
      defaultPage,
      count,
      disabled,
      onChange
    );
    const pages = useMemo7(
      () => buildPages(count, currentPage, siblingCount, boundaryCount),
      [count, currentPage, siblingCount, boundaryCount]
    );
    const containerCls = useMemo7(
      () => buildPaginationClasses(variant, shape, size, color, disabled, className, unstyled),
      [variant, shape, size, color, disabled, className, unstyled]
    );
    const iconSize = PAGINATION_ICON_SIZES[size];
    return /* @__PURE__ */ jsx28("nav", { ref, className: containerCls, "aria-label": "paginacion", ...props, children: /* @__PURE__ */ jsxs23("ul", { className: PAGINATION_CLASSES.list, children: [
      showFirstButton && /* @__PURE__ */ jsx28("li", { children: /* @__PURE__ */ jsx28(
        "button",
        {
          className: `${PAGINATION_CLASSES.item} ${PAGINATION_CLASSES.nav_btn}`,
          onClick: (e) => handlePageChange(e, 1),
          disabled: disabled || currentPage === 1,
          "aria-label": "Primera pagina",
          children: /* @__PURE__ */ jsx28(ChevronsLeft3, { size: iconSize })
        }
      ) }),
      !hidePrevButton && /* @__PURE__ */ jsx28("li", { children: /* @__PURE__ */ jsx28(
        "button",
        {
          className: `${PAGINATION_CLASSES.item} ${PAGINATION_CLASSES.nav_btn}`,
          onClick: (e) => handlePageChange(e, currentPage - 1),
          disabled: disabled || currentPage === 1,
          "aria-label": "Pagina anterior",
          children: /* @__PURE__ */ jsx28(ChevronLeft3, { size: iconSize })
        }
      ) }),
      pages.map((item, idx) => {
        if (typeof item === "string") {
          return /* @__PURE__ */ jsx28("li", { children: /* @__PURE__ */ jsx28(
            "span",
            {
              className: `${PAGINATION_CLASSES.item} ${PAGINATION_CLASSES.ellipsis}`,
              children: /* @__PURE__ */ jsx28(MoreHorizontal3, { size: iconSize - 2 })
            }
          ) }, item);
        }
        const isActive = item === currentPage;
        return /* @__PURE__ */ jsx28("li", { children: /* @__PURE__ */ jsx28(
          "button",
          {
            className: buildPageItemClasses(isActive),
            onClick: (e) => handlePageChange(e, item),
            disabled,
            "aria-current": isActive ? "page" : void 0,
            "aria-label": `Pagina ${item}`,
            children: item
          }
        ) }, item);
      }),
      !hideNextButton && /* @__PURE__ */ jsx28("li", { children: /* @__PURE__ */ jsx28(
        "button",
        {
          className: `${PAGINATION_CLASSES.item} ${PAGINATION_CLASSES.nav_btn}`,
          onClick: (e) => handlePageChange(e, currentPage + 1),
          disabled: disabled || currentPage === count,
          "aria-label": "Pagina siguiente",
          children: /* @__PURE__ */ jsx28(ChevronRight4, { size: iconSize })
        }
      ) }),
      showLastButton && /* @__PURE__ */ jsx28("li", { children: /* @__PURE__ */ jsx28(
        "button",
        {
          className: `${PAGINATION_CLASSES.item} ${PAGINATION_CLASSES.nav_btn}`,
          onClick: (e) => handlePageChange(e, count),
          disabled: disabled || currentPage === count,
          "aria-label": "Ultima pagina",
          children: /* @__PURE__ */ jsx28(ChevronsRight3, { size: iconSize })
        }
      ) })
    ] }) });
  }
);
Pagination.displayName = "Pagination";
var Pagination_default = Pagination;

// src/NAVIGATION/SpeedDial/SpeedDial.tsx
import React27, { forwardRef as forwardRef24, useRef as useRef12, useCallback as useCallback15 } from "react";
import { Plus as Plus2 } from "lucide-react";

// src/NAVIGATION/SpeedDial/SpeedDial.constants.ts
var SPEED_DIAL_DEFAULTS = {
  direction: "up",
  defaultOpen: false,
  hidden: false,
  color: "primary",
  size: "default",
  position: "bottom-right",
  openOnHover: false,
  backdrop: false,
  unstyled: false,
  className: ""
};
var SPEED_DIAL_ACTION_DEFAULTS = {
  tooltipOpen: false,
  disabled: false,
  className: "",
  _direction: "up"
};
var SPEED_DIAL_CLASSES = {
  container: "w3f-speed-dial",
  open: "w3f-speed-dial--open",
  hidden: "w3f-speed-dial--hidden",
  fab: "w3f-speed-dial__fab",
  icon: "w3f-speed-dial__icon",
  iconRotate: "w3f-speed-dial__icon--rotate",
  iconDefault: "w3f-speed-dial__icon-default",
  iconOpen: "w3f-speed-dial__icon-open",
  actions: "w3f-speed-dial__actions",
  backdrop: "w3f-speed-dial__backdrop",
  action: "w3f-speed-dial-action",
  actionFab: "w3f-speed-dial-action__fab",
  actionTooltip: "w3f-speed-dial-action__tooltip",
  actionTooltipOpen: "w3f-speed-dial-action__tooltip--open"
};
var HOVER_CLOSE_DELAY = 100;

// src/NAVIGATION/SpeedDial/SpeedDial.utils.ts
function defaultTooltipPlacement(direction) {
  switch (direction) {
    case "up":
    case "down":
      return "left";
    case "left":
    case "right":
      return "top";
    default:
      return "left";
  }
}
function buildSpeedDialClasses(position, isOpen, hidden, className, unstyled) {
  const base = SPEED_DIAL_CLASSES.container;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    `w3f-speed-dial--${position}`,
    isOpen && SPEED_DIAL_CLASSES.open,
    hidden && SPEED_DIAL_CLASSES.hidden,
    className
  ].filter(Boolean).join(" ");
}
function buildFabClasses2(color, size) {
  return [
    SPEED_DIAL_CLASSES.fab,
    `w3f-speed-dial__fab--${color}`,
    size !== "default" && `w3f-speed-dial__fab--${size}`
  ].filter(Boolean).join(" ");
}
function buildActionsClasses(direction) {
  return [SPEED_DIAL_CLASSES.actions, `w3f-speed-dial__actions--${direction}`].filter(Boolean).join(" ");
}
function buildActionFabClasses(color, className) {
  return [
    SPEED_DIAL_CLASSES.actionFab,
    color && `w3f-speed-dial-action__fab--${color}`,
    className
  ].filter(Boolean).join(" ");
}
function buildActionTooltipClasses(placement, tooltipOpen) {
  return [
    SPEED_DIAL_CLASSES.actionTooltip,
    `w3f-speed-dial-action__tooltip--${placement}`,
    tooltipOpen && SPEED_DIAL_CLASSES.actionTooltipOpen
  ].filter(Boolean).join(" ");
}
function buildOffsetStyle(position, offset) {
  if (offset === void 0) return void 0;
  const style = {};
  if (position.includes("bottom")) style.bottom = `${offset}px`;
  if (position.includes("top")) style.top = `${offset}px`;
  if (position.includes("right")) style.right = `${offset}px`;
  if (position.includes("left")) style.left = `${offset}px`;
  return style;
}

// src/NAVIGATION/SpeedDial/SpeedDial.hooks.ts
import { useState as useState27, useCallback as useCallback14, useEffect as useEffect11, useRef as useRef11 } from "react";
function useSpeedDialOpen(openProp, defaultOpen, onOpen, onClose) {
  const [internalOpen, setInternalOpen] = useState27(defaultOpen);
  const isControlled = openProp !== void 0;
  const isOpen = isControlled ? openProp : internalOpen;
  const handleOpen = useCallback14(
    (event, reason) => {
      if (!isControlled) setInternalOpen(true);
      if (onOpen) onOpen(event, reason);
    },
    [isControlled, onOpen]
  );
  const handleClose = useCallback14(
    (event, reason) => {
      if (!isControlled) setInternalOpen(false);
      if (onClose) onClose(event, reason);
    },
    [isControlled, onClose]
  );
  const handleToggle = useCallback14(
    (event) => {
      if (isOpen) {
        handleClose(event, "toggle");
      } else {
        handleOpen(event, "toggle");
      }
    },
    [isOpen, handleClose, handleOpen]
  );
  const handleActionClick = useCallback14(
    (event) => {
      handleClose(event, "toggle");
    },
    [handleClose]
  );
  return { isOpen, handleOpen, handleClose, handleToggle, handleActionClick };
}
function useSpeedDialHover(openOnHover, handleOpen, handleClose, containerRef) {
  const hoverTimerRef = useRef11(null);
  const handleMouseEnter = useCallback14(
    (event) => {
      if (!openOnHover) return;
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      handleOpen(event, "hover");
    },
    [openOnHover, handleOpen]
  );
  const handleMouseLeave = useCallback14(
    (event) => {
      if (!openOnHover) return;
      hoverTimerRef.current = setTimeout(() => {
        handleClose(event, "hover");
      }, HOVER_CLOSE_DELAY);
    },
    [openOnHover, handleClose]
  );
  const handleFocus = useCallback14(
    (event) => {
      if (openOnHover) handleOpen(event, "focus");
    },
    [openOnHover, handleOpen]
  );
  const handleBlur = useCallback14(
    (event) => {
      if (openOnHover && containerRef.current && !containerRef.current.contains(event.relatedTarget)) {
        handleClose(event, "blur");
      }
    },
    [openOnHover, handleClose, containerRef]
  );
  useEffect11(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);
  return { handleMouseEnter, handleMouseLeave, handleFocus, handleBlur };
}
function useSpeedDialEscKey(isOpen, handleClose) {
  useEffect11(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") handleClose(event, "escapeKeyDown");
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);
}

// src/NAVIGATION/SpeedDial/SpeedDial.tsx
import { Fragment as Fragment5, jsx as jsx29, jsxs as jsxs24 } from "react/jsx-runtime";
var SpeedDialAction = ({
  icon,
  tooltipTitle,
  tooltipOpen = SPEED_DIAL_ACTION_DEFAULTS.tooltipOpen,
  tooltipPlacement,
  onClick,
  color,
  disabled = SPEED_DIAL_ACTION_DEFAULTS.disabled,
  className = SPEED_DIAL_ACTION_DEFAULTS.className,
  _direction = SPEED_DIAL_ACTION_DEFAULTS._direction,
  _onActionClick,
  ...rest
}) => {
  const placement = tooltipPlacement || defaultTooltipPlacement(_direction);
  const fabClasses = buildActionFabClasses(color, className);
  const tooltipClasses = buildActionTooltipClasses(placement, tooltipOpen);
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (_onActionClick) _onActionClick(e);
  };
  return /* @__PURE__ */ jsxs24("div", { className: SPEED_DIAL_CLASSES.action, children: [
    /* @__PURE__ */ jsx29(
      "button",
      {
        className: fabClasses,
        onClick: handleClick,
        disabled,
        "aria-label": tooltipTitle,
        ...rest,
        children: icon
      }
    ),
    tooltipTitle && /* @__PURE__ */ jsx29("span", { className: tooltipClasses, children: tooltipTitle })
  ] });
};
SpeedDialAction.displayName = "SpeedDialAction";
var SpeedDial = forwardRef24(
  ({
    ariaLabel,
    children,
    icon,
    openIcon,
    direction = SPEED_DIAL_DEFAULTS.direction,
    open: openProp,
    defaultOpen = SPEED_DIAL_DEFAULTS.defaultOpen,
    onOpen,
    onClose,
    hidden = SPEED_DIAL_DEFAULTS.hidden,
    color = SPEED_DIAL_DEFAULTS.color,
    size = SPEED_DIAL_DEFAULTS.size,
    position = SPEED_DIAL_DEFAULTS.position,
    offset,
    openOnHover = SPEED_DIAL_DEFAULTS.openOnHover,
    backdrop = SPEED_DIAL_DEFAULTS.backdrop,
    unstyled = SPEED_DIAL_DEFAULTS.unstyled,
    className = SPEED_DIAL_DEFAULTS.className,
    ...rest
  }, ref) => {
    const containerRef = useRef12(null);
    const mergedRef = useCallback15(
      (node) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          ref.current = node;
      },
      [ref]
    );
    const { isOpen, handleOpen, handleClose, handleToggle, handleActionClick } = useSpeedDialOpen(openProp, defaultOpen, onOpen, onClose);
    const { handleMouseEnter, handleMouseLeave, handleFocus, handleBlur } = useSpeedDialHover(
      openOnHover,
      handleOpen,
      handleClose,
      containerRef
    );
    useSpeedDialEscKey(
      isOpen,
      handleClose
    );
    const handleBackdropClick = useCallback15(
      (event) => {
        handleClose(
          event,
          "backdropClick"
        );
      },
      [handleClose]
    );
    const containerClasses = buildSpeedDialClasses(position, isOpen, hidden, className, unstyled);
    const fabClasses = buildFabClasses2(color, size);
    const actionsClasses = buildActionsClasses(direction);
    const offsetStyle = buildOffsetStyle(position, offset);
    const hasOpenIcon = !!openIcon;
    const defaultIcon = icon || /* @__PURE__ */ jsx29(Plus2, { size: 24 });
    const actions = React27.Children.map(children, (child) => {
      if (!React27.isValidElement(child)) return child;
      return React27.cloneElement(
        child,
        {
          _direction: direction,
          _onActionClick: handleActionClick
        }
      );
    });
    return /* @__PURE__ */ jsxs24(Fragment5, { children: [
      backdrop && isOpen && /* @__PURE__ */ jsx29(
        "div",
        {
          className: SPEED_DIAL_CLASSES.backdrop,
          onClick: handleBackdropClick
        }
      ),
      /* @__PURE__ */ jsxs24(
        "div",
        {
          ref: mergedRef,
          className: containerClasses,
          style: offsetStyle,
          role: "presentation",
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          onFocus: handleFocus,
          onBlur: handleBlur,
          ...rest,
          children: [
            /* @__PURE__ */ jsx29("div", { className: actionsClasses, role: "menu", children: actions }),
            /* @__PURE__ */ jsx29(
              "button",
              {
                className: fabClasses,
                onClick: handleToggle,
                "aria-label": ariaLabel,
                "aria-expanded": isOpen,
                "aria-haspopup": "menu",
                children: /* @__PURE__ */ jsx29(
                  "span",
                  {
                    className: [
                      SPEED_DIAL_CLASSES.icon,
                      !hasOpenIcon && SPEED_DIAL_CLASSES.iconRotate
                    ].filter(Boolean).join(" "),
                    children: hasOpenIcon ? /* @__PURE__ */ jsxs24(Fragment5, { children: [
                      /* @__PURE__ */ jsx29("span", { className: SPEED_DIAL_CLASSES.iconDefault, children: defaultIcon }),
                      /* @__PURE__ */ jsx29("span", { className: SPEED_DIAL_CLASSES.iconOpen, children: openIcon })
                    ] }) : /* @__PURE__ */ jsx29("span", { className: SPEED_DIAL_CLASSES.iconDefault, children: defaultIcon })
                  }
                )
              }
            )
          ]
        }
      )
    ] });
  }
);
SpeedDial.displayName = "SpeedDial";

// src/NAVIGATION/Stepper/Stepper.tsx
import React28, { forwardRef as forwardRef25, useMemo as useMemo8, useCallback as useCallback16 } from "react";
import { Check as Check2, X as X6 } from "lucide-react";

// src/NAVIGATION/Stepper/Stepper.constants.ts
var STEPPER_DEFAULTS = {
  activeStep: 0,
  orientation: "horizontal",
  alternativeLabel: false,
  nonLinear: false,
  color: "primary",
  unstyled: false,
  className: ""
};
var STEP_DEFAULTS = {
  active: false,
  completed: false,
  disabled: false,
  index: 0,
  last: false,
  className: "",
  _orientation: "horizontal",
  _alternativeLabel: false,
  _nonLinear: false
};
var STEP_LABEL_DEFAULTS = {
  error: false,
  className: "",
  _active: false,
  _completed: false,
  _disabled: false,
  _index: 0,
  _alternativeLabel: false,
  _nonLinear: false
};
var STEP_CONTENT_DEFAULTS = {
  transitionDuration: 300,
  className: "",
  _active: false,
  _last: false
};
var STEP_CONNECTOR_DEFAULTS = {
  className: "",
  _orientation: "horizontal",
  _active: false,
  _completed: false,
  _alternativeLabel: false
};
var STEPPER_CLASSES = {
  stepper: "w3f-stepper",
  step: "w3f-step",
  connector: "w3f-step-connector",
  connectorActive: "w3f-step-connector--active",
  connectorCompleted: "w3f-step-connector--completed",
  connectorAlternative: "w3f-step-connector--alternative",
  label: "w3f-step-label",
  labelClickable: "w3f-step-label--clickable",
  labelAlternative: "w3f-step-label--alternative",
  labelIconContainer: "w3f-step-label__icon-container",
  labelText: "w3f-step-label__text",
  labelTitle: "w3f-step-label__title",
  labelTitleActive: "w3f-step-label__title--active",
  labelTitleError: "w3f-step-label__title--error",
  labelOptional: "w3f-step-label__optional",
  labelOptionalError: "w3f-step-label__optional--error",
  icon: "w3f-step-label__icon",
  iconActive: "w3f-step-label__icon--active",
  iconCompleted: "w3f-step-label__icon--completed",
  iconPending: "w3f-step-label__icon--pending",
  iconError: "w3f-step-label__icon--error",
  content: "w3f-step-content",
  contentExpanded: "w3f-step-content--expanded",
  contentCollapsed: "w3f-step-content--collapsed",
  contentLast: "w3f-step-content--last"
};

// src/NAVIGATION/Stepper/Stepper.utils.ts
function buildStepperClasses(orientation, color, alternativeLabel, className, unstyled) {
  if (unstyled) {
    return [STEPPER_CLASSES.stepper, "w3f-stepper--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    STEPPER_CLASSES.stepper,
    `w3f-stepper--${orientation}`,
    `w3f-stepper--${color}`,
    alternativeLabel && "w3f-stepper--alternative-label",
    className
  ].filter(Boolean).join(" ");
}
function buildStepClasses(orientation, active, completed, disabled) {
  return [
    STEPPER_CLASSES.step,
    `w3f-step--${orientation}`,
    active && "w3f-step--active",
    completed && "w3f-step--completed",
    disabled && "w3f-step--disabled"
  ].filter(Boolean).join(" ");
}
function buildConnectorClasses(orientation, active, completed, alternativeLabel, className) {
  return [
    STEPPER_CLASSES.connector,
    `w3f-step-connector--${orientation}`,
    active && STEPPER_CLASSES.connectorActive,
    completed && STEPPER_CLASSES.connectorCompleted,
    alternativeLabel && STEPPER_CLASSES.connectorAlternative,
    className
  ].filter(Boolean).join(" ");
}
function buildLabelClasses7(isClickable, alternativeLabel, className) {
  return [
    STEPPER_CLASSES.label,
    isClickable && STEPPER_CLASSES.labelClickable,
    alternativeLabel && STEPPER_CLASSES.labelAlternative,
    className
  ].filter(Boolean).join(" ");
}
function buildStepIconClasses(active, completed, error) {
  return [
    STEPPER_CLASSES.icon,
    error ? STEPPER_CLASSES.iconError : completed ? STEPPER_CLASSES.iconCompleted : active ? STEPPER_CLASSES.iconActive : STEPPER_CLASSES.iconPending
  ].filter(Boolean).join(" ");
}
function buildTitleClasses(active, error) {
  return [
    STEPPER_CLASSES.labelTitle,
    active && STEPPER_CLASSES.labelTitleActive,
    error && STEPPER_CLASSES.labelTitleError
  ].filter(Boolean).join(" ");
}
function buildContentClasses(active, isLast, className) {
  return [
    STEPPER_CLASSES.content,
    active ? STEPPER_CLASSES.contentExpanded : STEPPER_CLASSES.contentCollapsed,
    isLast && STEPPER_CLASSES.contentLast,
    className
  ].filter(Boolean).join(" ");
}

// src/NAVIGATION/Stepper/Stepper.hooks.ts
import { useState as useState28, useEffect as useEffect12, useRef as useRef13 } from "react";
function useStepContentAnimation(active) {
  const contentRef = useRef13(null);
  const [maxHeight, setMaxHeight] = useState28(active ? "none" : "0");
  useEffect12(() => {
    if (active) {
      const el = contentRef.current;
      if (el) setMaxHeight(`${el.scrollHeight + 50}px`);
    } else {
      setMaxHeight("0");
    }
  }, [active]);
  return { contentRef, maxHeight };
}

// src/NAVIGATION/Stepper/Stepper.tsx
import { jsx as jsx30, jsxs as jsxs25 } from "react/jsx-runtime";
var StepConnector = ({
  className = STEP_CONNECTOR_DEFAULTS.className,
  _orientation = STEP_CONNECTOR_DEFAULTS._orientation,
  _active = STEP_CONNECTOR_DEFAULTS._active,
  _completed = STEP_CONNECTOR_DEFAULTS._completed,
  _alternativeLabel = STEP_CONNECTOR_DEFAULTS._alternativeLabel,
  ...rest
}) => {
  const cls = useMemo8(
    () => buildConnectorClasses(_orientation, _active, _completed, _alternativeLabel, className),
    [_orientation, _active, _completed, _alternativeLabel, className]
  );
  return /* @__PURE__ */ jsx30("span", { className: cls, ...rest });
};
StepConnector.displayName = "StepConnector";
var StepIcon = ({ index, active, completed, error }) => {
  const cls = buildStepIconClasses(active, completed, error);
  let content;
  if (error) {
    content = /* @__PURE__ */ jsx30(X6, { size: 18 });
  } else if (completed) {
    content = /* @__PURE__ */ jsx30(Check2, { size: 18 });
  } else {
    content = index + 1;
  }
  return /* @__PURE__ */ jsx30("span", { className: cls, children: content });
};
var StepLabel = ({
  children,
  optional,
  icon,
  error = STEP_LABEL_DEFAULTS.error,
  StepIconComponent,
  onClick,
  className = STEP_LABEL_DEFAULTS.className,
  _active = STEP_LABEL_DEFAULTS._active,
  _completed = STEP_LABEL_DEFAULTS._completed,
  _disabled = STEP_LABEL_DEFAULTS._disabled,
  _index = STEP_LABEL_DEFAULTS._index,
  _alternativeLabel = STEP_LABEL_DEFAULTS._alternativeLabel,
  _nonLinear = STEP_LABEL_DEFAULTS._nonLinear,
  ...rest
}) => {
  const isClickable = !_disabled && (!!onClick || _nonLinear);
  const cls = useMemo8(
    () => buildLabelClasses7(isClickable, _alternativeLabel, className),
    [isClickable, _alternativeLabel, className]
  );
  const handleClick = useCallback16(
    (e) => {
      if (_disabled) return;
      if (onClick) onClick(e, _index);
    },
    [_disabled, onClick, _index]
  );
  const renderIcon = () => {
    if (StepIconComponent) {
      return /* @__PURE__ */ jsx30(
        StepIconComponent,
        {
          active: _active,
          completed: _completed,
          error,
          icon: _index + 1
        }
      );
    }
    if (icon) {
      return /* @__PURE__ */ jsx30("span", { className: buildStepIconClasses(_active, _completed, error), children: icon });
    }
    return /* @__PURE__ */ jsx30(
      StepIcon,
      {
        index: _index,
        active: _active,
        completed: _completed,
        error
      }
    );
  };
  const titleCls = buildTitleClasses(_active, error);
  const optionalCls = [
    STEPPER_CLASSES.labelOptional,
    error && STEPPER_CLASSES.labelOptionalError
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs25(
    "div",
    {
      className: cls,
      onClick: isClickable ? handleClick : void 0,
      role: isClickable ? "button" : void 0,
      tabIndex: isClickable ? 0 : void 0,
      onKeyDown: isClickable ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e);
        }
      } : void 0,
      ...rest,
      children: [
        /* @__PURE__ */ jsx30("span", { className: STEPPER_CLASSES.labelIconContainer, children: renderIcon() }),
        /* @__PURE__ */ jsxs25("span", { className: STEPPER_CLASSES.labelText, children: [
          /* @__PURE__ */ jsx30("span", { className: titleCls, children }),
          optional && /* @__PURE__ */ jsx30("span", { className: optionalCls, children: optional })
        ] })
      ]
    }
  );
};
StepLabel.displayName = "StepLabel";
var StepContent = ({
  children,
  transitionDuration = STEP_CONTENT_DEFAULTS.transitionDuration,
  className = STEP_CONTENT_DEFAULTS.className,
  _active = STEP_CONTENT_DEFAULTS._active,
  _last = STEP_CONTENT_DEFAULTS._last,
  ...rest
}) => {
  const { contentRef, maxHeight } = useStepContentAnimation(_active);
  const cls = useMemo8(
    () => buildContentClasses(_active, _last, className),
    [_active, _last, className]
  );
  return /* @__PURE__ */ jsx30(
    "div",
    {
      ref: contentRef,
      className: cls,
      style: {
        maxHeight: _active ? maxHeight : "0",
        transitionDuration: `${transitionDuration}ms`
      },
      ...rest,
      children
    }
  );
};
StepContent.displayName = "StepContent";
var Step = ({
  active = STEP_DEFAULTS.active,
  completed = STEP_DEFAULTS.completed,
  disabled = STEP_DEFAULTS.disabled,
  index = STEP_DEFAULTS.index,
  last = STEP_DEFAULTS.last,
  children,
  className = STEP_DEFAULTS.className,
  _orientation = STEP_DEFAULTS._orientation,
  _alternativeLabel = STEP_DEFAULTS._alternativeLabel,
  _color,
  _nonLinear = STEP_DEFAULTS._nonLinear,
  _connector,
  ...rest
}) => {
  const cls = useMemo8(
    () => buildStepClasses(_orientation, active, completed, disabled),
    [_orientation, active, completed, disabled]
  );
  const enhancedChildren = React28.Children.map(children, (child) => {
    if (!React28.isValidElement(child)) return child;
    if (child.type === StepLabel) {
      return React28.cloneElement(child, {
        _active: active,
        _completed: completed,
        _disabled: disabled,
        _index: index,
        _alternativeLabel,
        _nonLinear
      });
    }
    if (child.type === StepContent) {
      return React28.cloneElement(child, {
        _active: active,
        _last: last
      });
    }
    return child;
  });
  return /* @__PURE__ */ jsx30("div", { className: cls, ...rest, children: enhancedChildren });
};
Step.displayName = "Step";
var Stepper = forwardRef25(({
  activeStep = STEPPER_DEFAULTS.activeStep,
  children,
  orientation = STEPPER_DEFAULTS.orientation,
  alternativeLabel = STEPPER_DEFAULTS.alternativeLabel,
  nonLinear = STEPPER_DEFAULTS.nonLinear,
  connector,
  color = STEPPER_DEFAULTS.color,
  unstyled = STEPPER_DEFAULTS.unstyled,
  className = STEPPER_DEFAULTS.className,
  ...rest
}, ref) => {
  const cls = useMemo8(
    () => buildStepperClasses(orientation, color, alternativeLabel, className, unstyled),
    [orientation, color, alternativeLabel, className, unstyled]
  );
  const connectorElement = connector !== void 0 ? connector : /* @__PURE__ */ jsx30(StepConnector, {});
  const steps = React28.Children.toArray(children).filter(Boolean);
  return /* @__PURE__ */ jsx30("div", { ref, className: cls, ...rest, children: steps.map((child, index) => {
    if (!React28.isValidElement(child)) return child;
    const childProps = child.props;
    const isActive = childProps.active !== void 0 ? childProps.active : index === activeStep;
    const isCompleted = childProps.completed !== void 0 ? childProps.completed : index < activeStep;
    const isDisabled = childProps.disabled !== void 0 ? childProps.disabled : !nonLinear && index > activeStep;
    const connectorProps = {
      _orientation: orientation,
      _active: index === activeStep,
      _completed: index <= activeStep,
      _alternativeLabel: alternativeLabel
    };
    return /* @__PURE__ */ jsxs25(React28.Fragment, { children: [
      index > 0 && connectorElement && React28.cloneElement(
        connectorElement,
        connectorProps
      ),
      React28.cloneElement(child, {
        active: isActive,
        completed: isCompleted,
        disabled: isDisabled,
        index,
        last: index === steps.length - 1,
        _orientation: orientation,
        _alternativeLabel: alternativeLabel,
        _color: color,
        _nonLinear: nonLinear,
        _connector: connectorElement
      })
    ] }, child.key ?? index);
  }) });
});
Stepper.displayName = "Stepper";

// src/SURFACES/Acordion/Accordion.tsx
import React29, { forwardRef as forwardRef26 } from "react";

// src/SURFACES/Acordion/Accordion.constants.ts
var ACCORDION_DEFAULTS = {
  multiple: false,
  variant: "default",
  size: "md",
  unstyled: false,
  className: ""
};
var ACCORDION_ITEM_DEFAULTS = {
  disabled: false,
  color: null,
  className: ""
};
var ACCORDION_SUMMARY_DEFAULTS = {
  disabled: false,
  className: ""
};
var ACCORDION_CLASSES = {
  container: "w3f-accordion",
  outlined: "w3f-accordion-outlined",
  borderless: "w3f-accordion-borderless",
  elevated: "w3f-accordion-elevated",
  sm: "w3f-accordion-sm",
  lg: "w3f-accordion-lg",
  item: "w3f-accordion-item",
  itemDisabled: "w3f-accordion-item-disabled",
  summary: "w3f-accordion-summary",
  icon: "w3f-accordion-icon",
  flexGrow: "w3f-flex-grow",
  contentContainer: "w3f-accordion-content-container",
  contentShow: "w3f-accordion-show",
  contentWrapper: "w3f-accordion-content-wrapper",
  details: "w3f-accordion-details",
  actions: "w3f-accordion-actions"
};
var ACCORDION_SUMMARY_STYLE = {
  justifyContent: "flex-start",
  textAlign: "left",
  padding: "var(--w3f-space-4) var(--w3f-space-6)",
  height: "auto",
  borderRadius: 0
};

// src/SURFACES/Acordion/Accordion.utils.ts
function buildAccordionClasses(variant, size, className, unstyled) {
  if (unstyled) {
    return [ACCORDION_CLASSES.container, "w3f-accordion--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    ACCORDION_CLASSES.container,
    variant === "outlined" && ACCORDION_CLASSES.outlined,
    variant === "borderless" && ACCORDION_CLASSES.borderless,
    variant === "elevated" && ACCORDION_CLASSES.elevated,
    size === "sm" && ACCORDION_CLASSES.sm,
    size === "lg" && ACCORDION_CLASSES.lg,
    className
  ].filter(Boolean).join(" ");
}
function buildAccordionItemClasses(disabled, color, className) {
  return [
    ACCORDION_CLASSES.item,
    disabled && ACCORDION_CLASSES.itemDisabled,
    color && `w3f-accordion-item-${color}`,
    className
  ].filter(Boolean).join(" ");
}
function buildContentContainerClasses(isExpanded) {
  return [
    ACCORDION_CLASSES.contentContainer,
    isExpanded && ACCORDION_CLASSES.contentShow
  ].filter(Boolean).join(" ");
}

// src/SURFACES/Acordion/Accordion.hooks.ts
import { useState as useState29, useCallback as useCallback17 } from "react";
function useAccordionState(multiple) {
  const [expanded, setExpanded] = useState29(
    multiple ? [] : null
  );
  const togglePanel = useCallback17(
    (id) => {
      if (multiple) {
        setExpanded((prev) => {
          const arr = prev;
          return arr.includes(id) ? arr.filter((panelId) => panelId !== id) : [...arr, id];
        });
      } else {
        setExpanded((prev) => prev === id ? null : id);
      }
    },
    [multiple]
  );
  const closePanel = useCallback17(
    (id) => {
      if (multiple) {
        setExpanded((prev) => prev.filter((panelId) => panelId !== id));
      } else {
        setExpanded(null);
      }
    },
    [multiple]
  );
  const isExpanded = (id) => {
    if (multiple) return expanded.includes(id);
    return expanded === id;
  };
  return { expanded, togglePanel, closePanel, isExpanded };
}

// src/SURFACES/Acordion/Accordion.tsx
import { jsx as jsx31, jsxs as jsxs26 } from "react/jsx-runtime";
var AccordionDetails = ({
  children,
  className = ""
}) => /* @__PURE__ */ jsx31("div", { className: [ACCORDION_CLASSES.details, className].filter(Boolean).join(" "), children });
AccordionDetails.displayName = "AccordionDetails";
var AccordionActions = ({
  children,
  closePanel,
  className = ""
}) => {
  const childrenWithProps = React29.Children.map(children, (child) => {
    if (!React29.isValidElement(child)) return child;
    const childProps = child.props;
    const childText = childProps.children?.toString().toLowerCase() || "";
    const childClass = childProps.className || "";
    if (childText.includes("cerrar") || childText.includes("close") || childClass.includes("close")) {
      return React29.cloneElement(child, {
        onClick: (e) => {
          if (typeof childProps.onClick === "function") childProps.onClick(e);
          if (closePanel) closePanel();
        }
      });
    }
    return child;
  });
  return /* @__PURE__ */ jsx31("div", { className: [ACCORDION_CLASSES.actions, className].filter(Boolean).join(" "), children: childrenWithProps });
};
AccordionActions.displayName = "AccordionActions";
var defaultChevronIcon = /* @__PURE__ */ jsx31(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: /* @__PURE__ */ jsx31("polyline", { points: "9 18 15 12 9 6" })
  }
);
var AccordionSummary = ({
  children,
  isExpanded = false,
  togglePanel,
  disabled = ACCORDION_SUMMARY_DEFAULTS.disabled,
  icon,
  className = ACCORDION_SUMMARY_DEFAULTS.className
}) => /* @__PURE__ */ jsxs26(
  Button_default,
  {
    variant: "text",
    fullWidth: true,
    className: [ACCORDION_CLASSES.summary, className].filter(Boolean).join(" "),
    onClick: togglePanel,
    "aria-expanded": isExpanded,
    disabled,
    type: "button",
    style: ACCORDION_SUMMARY_STYLE,
    children: [
      /* @__PURE__ */ jsx31("span", { className: ACCORDION_CLASSES.icon, children: icon || defaultChevronIcon }),
      /* @__PURE__ */ jsx31("span", { className: ACCORDION_CLASSES.flexGrow, children })
    ]
  }
);
AccordionSummary.displayName = "AccordionSummary";
var AccordionItem = ({
  id,
  children,
  isExpanded = false,
  togglePanel,
  closePanel,
  disabled = ACCORDION_ITEM_DEFAULTS.disabled,
  color = ACCORDION_ITEM_DEFAULTS.color,
  className = ACCORDION_ITEM_DEFAULTS.className
}) => {
  const childArray = React29.Children.toArray(children);
  const summary = childArray.find(
    (child) => React29.isValidElement(child) && child.type === AccordionSummary
  );
  const details = childArray.find(
    (child) => React29.isValidElement(child) && child.type === AccordionDetails
  );
  const actions = childArray.find(
    (child) => React29.isValidElement(child) && child.type === AccordionActions
  );
  const itemCls = buildAccordionItemClasses(disabled, color, className);
  const contentCls = buildContentContainerClasses(isExpanded);
  const summaryWithProps = summary ? React29.cloneElement(
    summary,
    { isExpanded, togglePanel, id, disabled }
  ) : null;
  const actionsWithProps = actions ? React29.cloneElement(
    actions,
    { closePanel }
  ) : null;
  return /* @__PURE__ */ jsxs26("div", { className: itemCls, children: [
    summaryWithProps,
    /* @__PURE__ */ jsx31("div", { className: contentCls, children: /* @__PURE__ */ jsxs26("div", { className: ACCORDION_CLASSES.contentWrapper, children: [
      details,
      actionsWithProps
    ] }) })
  ] });
};
AccordionItem.displayName = "AccordionItem";
var Accordion = forwardRef26(({
  children,
  multiple = ACCORDION_DEFAULTS.multiple,
  variant = ACCORDION_DEFAULTS.variant,
  size = ACCORDION_DEFAULTS.size,
  unstyled = ACCORDION_DEFAULTS.unstyled,
  className = ACCORDION_DEFAULTS.className
}, ref) => {
  const { togglePanel, closePanel, isExpanded } = useAccordionState(multiple);
  const cls = buildAccordionClasses(variant, size, className, unstyled);
  const accordionItems = React29.Children.map(children, (child) => {
    if (React29.isValidElement(child) && child.type === AccordionItem) {
      const childProps = child.props;
      const id = childProps.id;
      return React29.cloneElement(child, {
        isExpanded: isExpanded(id),
        togglePanel: () => togglePanel(id),
        closePanel: () => closePanel(id)
      });
    }
    return child;
  });
  return /* @__PURE__ */ jsx31("div", { ref, className: cls, children: accordionItems });
});
Accordion.displayName = "Accordion";

// src/SURFACES/AccordionHorizontal/AccordionHorizontal.tsx
import React30, { forwardRef as forwardRef27 } from "react";

// src/SURFACES/AccordionHorizontal/AccordionHorizontal.constants.ts
var ACCORDION_H_SPEED_MS = {
  fast: 150,
  normal: 400,
  slow: 700,
  "very-slow": 1200
};
var ACCORDION_H_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
var ACCORDION_H_DEFAULTS = {
  multiple: false,
  variant: "default",
  size: "md",
  height: "400px",
  textOrientation: "counter-clockwise",
  speed: "normal",
  unstyled: false,
  className: ""
};
var ACCORDION_H_ITEM_DEFAULTS = {
  disabled: false,
  color: null,
  className: ""
};
var ACCORDION_H_SUMMARY_DEFAULTS = {
  disabled: false,
  className: ""
};
var ACCORDION_H_CLASSES = {
  // Contenedor
  container: "w3f-accordion-horizontal",
  outlined: "w3f-accordion-h-outlined",
  elevated: "w3f-accordion-elevated",
  // compartida con variante vertical
  borderless: "w3f-accordion-borderless",
  // compartida con variante vertical
  sm: "w3f-accordion-h-sm",
  lg: "w3f-accordion-h-lg",
  // Item
  item: "w3f-accordion-item-horizontal",
  itemExpanded: "w3f-accordion-expanded",
  itemDisabled: "w3f-accordion-item-horizontal-disabled",
  // Summary
  summary: "w3f-accordion-summary-horizontal",
  summaryUpright: "w3f-accordion-summary-h-upright",
  summaryCw: "w3f-accordion-summary-h-cw",
  summaryCcw: "w3f-accordion-summary-h-ccw",
  icon: "w3f-accordion-icon-horizontal",
  // Content
  contentContainer: "w3f-accordion-content-horizontal",
  contentShow: "w3f-accordion-show",
  contentWrapper: "w3f-accordion-content-wrapper-horizontal",
  // Details & Actions
  details: "w3f-accordion-details-horizontal",
  actions: "w3f-accordion-actions-horizontal"
};

// src/SURFACES/AccordionHorizontal/AccordionHorizontal.utils.ts
function buildAccordionHClasses(variant, size, className, unstyled) {
  const base = ACCORDION_H_CLASSES.container;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    variant === "outlined" && ACCORDION_H_CLASSES.outlined,
    variant === "elevated" && ACCORDION_H_CLASSES.elevated,
    variant === "borderless" && ACCORDION_H_CLASSES.borderless,
    size === "sm" && ACCORDION_H_CLASSES.sm,
    size === "lg" && ACCORDION_H_CLASSES.lg,
    className
  ].filter(Boolean).join(" ");
}
function buildAccordionItemHClasses(isExpanded, disabled, color, className) {
  return [
    ACCORDION_H_CLASSES.item,
    isExpanded && ACCORDION_H_CLASSES.itemExpanded,
    disabled && ACCORDION_H_CLASSES.itemDisabled,
    color && `w3f-color-${color}`,
    className
  ].filter(Boolean).join(" ");
}
function buildAccordionHContentClasses(isExpanded) {
  return [
    ACCORDION_H_CLASSES.contentContainer,
    isExpanded && ACCORDION_H_CLASSES.contentShow
  ].filter(Boolean).join(" ");
}

// src/SURFACES/AccordionHorizontal/AccordionHorizontal.tsx
import { jsx as jsx32, jsxs as jsxs27 } from "react/jsx-runtime";
var defaultChevronIcon2 = /* @__PURE__ */ jsx32(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: /* @__PURE__ */ jsx32("polyline", { points: "9 18 15 12 9 6" })
  }
);
var AccordionDetailsH = ({
  children,
  className = ""
}) => /* @__PURE__ */ jsx32("div", { className: [ACCORDION_H_CLASSES.details, className].filter(Boolean).join(" "), children });
AccordionDetailsH.displayName = "AccordionDetailsH";
var AccordionActionsH = ({
  children,
  closePanel,
  className = ""
}) => {
  const childrenWithProps = React30.Children.map(children, (child) => {
    if (!React30.isValidElement(child)) return child;
    const childProps = child.props;
    const childText = childProps.children?.toString().toLowerCase() || "";
    const childClass = childProps.className || "";
    if (childText.includes("cerrar") || childText.includes("close") || childClass.includes("close")) {
      return React30.cloneElement(child, {
        onClick: (e) => {
          if (typeof childProps.onClick === "function") childProps.onClick(e);
          if (closePanel) closePanel();
        }
      });
    }
    return child;
  });
  return /* @__PURE__ */ jsx32("div", { className: [ACCORDION_H_CLASSES.actions, className].filter(Boolean).join(" "), children: childrenWithProps });
};
AccordionActionsH.displayName = "AccordionActionsH";
var ORIENTATION_CLASS = {
  upright: ACCORDION_H_CLASSES.summaryUpright,
  clockwise: ACCORDION_H_CLASSES.summaryCw,
  "counter-clockwise": ACCORDION_H_CLASSES.summaryCcw
};
var AccordionSummaryH = ({
  children,
  isExpanded = false,
  togglePanel,
  textOrientation = ACCORDION_H_DEFAULTS.textOrientation,
  disabled = ACCORDION_H_SUMMARY_DEFAULTS.disabled,
  icon,
  className = ACCORDION_H_SUMMARY_DEFAULTS.className
}) => /* @__PURE__ */ jsxs27(
  "button",
  {
    className: [
      ACCORDION_H_CLASSES.summary,
      ORIENTATION_CLASS[textOrientation],
      className
    ].filter(Boolean).join(" "),
    onClick: togglePanel,
    "aria-expanded": isExpanded,
    disabled,
    type: "button",
    children: [
      /* @__PURE__ */ jsx32("span", { children }),
      /* @__PURE__ */ jsx32("span", { className: ACCORDION_H_CLASSES.icon, children: icon ?? defaultChevronIcon2 })
    ]
  }
);
AccordionSummaryH.displayName = "AccordionSummaryH";
var AccordionItemH = ({
  id,
  children,
  isExpanded = false,
  togglePanel,
  textOrientation = ACCORDION_H_DEFAULTS.textOrientation,
  color = ACCORDION_H_ITEM_DEFAULTS.color,
  disabled = ACCORDION_H_ITEM_DEFAULTS.disabled,
  className = ACCORDION_H_ITEM_DEFAULTS.className
}) => {
  const childArray = React30.Children.toArray(children);
  const summary = childArray.find(
    (child) => React30.isValidElement(child) && child.type === AccordionSummaryH
  );
  const details = childArray.find(
    (child) => React30.isValidElement(child) && child.type === AccordionDetailsH
  );
  const actions = childArray.find(
    (child) => React30.isValidElement(child) && child.type === AccordionActionsH
  );
  const itemCls = buildAccordionItemHClasses(isExpanded, disabled, color, className);
  const contentCls = buildAccordionHContentClasses(isExpanded);
  const summaryWithProps = summary ? React30.cloneElement(
    summary,
    { isExpanded, togglePanel, id, disabled, textOrientation }
  ) : null;
  return /* @__PURE__ */ jsxs27("div", { className: itemCls, children: [
    summaryWithProps,
    /* @__PURE__ */ jsx32("div", { className: contentCls, children: /* @__PURE__ */ jsxs27("div", { className: ACCORDION_H_CLASSES.contentWrapper, children: [
      details,
      actions
    ] }) })
  ] });
};
AccordionItemH.displayName = "AccordionItemH";
var AccordionHorizontal = forwardRef27(({
  children,
  multiple = ACCORDION_H_DEFAULTS.multiple,
  variant = ACCORDION_H_DEFAULTS.variant,
  size = ACCORDION_H_DEFAULTS.size,
  height = ACCORDION_H_DEFAULTS.height,
  textOrientation = ACCORDION_H_DEFAULTS.textOrientation,
  speed = ACCORDION_H_DEFAULTS.speed,
  unstyled = ACCORDION_H_DEFAULTS.unstyled,
  className = ACCORDION_H_DEFAULTS.className
}, ref) => {
  const { togglePanel, closePanel, isExpanded } = useAccordionState(multiple);
  const cls = buildAccordionHClasses(variant, size, className, unstyled);
  const accordionItems = React30.Children.map(children, (child) => {
    if (React30.isValidElement(child) && child.type === AccordionItemH) {
      const childProps = child.props;
      const id = childProps.id;
      return React30.cloneElement(child, {
        isExpanded: isExpanded(id),
        togglePanel: () => togglePanel(id),
        textOrientation
      });
    }
    return child;
  });
  const heightValue = typeof height === "number" ? `${height}px` : height;
  const durationMs = typeof speed === "number" ? speed : ACCORDION_H_SPEED_MS[speed];
  const transitionValue = `${durationMs}ms ${ACCORDION_H_EASING}`;
  return /* @__PURE__ */ jsx32(
    "div",
    {
      ref,
      className: cls,
      style: {
        minHeight: heightValue,
        "--w3f-acch-transition": transitionValue,
        "--w3f-acch-transition-normal": transitionValue
      },
      children: accordionItems
    }
  );
});
AccordionHorizontal.displayName = "AccordionHorizontal";

// src/SURFACES/AppBar/AppBar.tsx
import { forwardRef as forwardRef28 } from "react";

// src/SURFACES/AppBar/AppBar.constants.ts
var APP_BAR_DEFAULTS = {
  color: "primary",
  position: "static",
  size: "md",
  elevated: true,
  unstyled: false,
  className: ""
};
var APP_BAR_CLASSES = {
  root: "w3f-app-bar",
  toolbar: "w3f-app-bar__toolbar",
  leading: "w3f-app-bar__leading",
  title: "w3f-app-bar__title",
  trailing: "w3f-app-bar__trailing",
  // colors
  primary: "w3f-app-bar--primary",
  secondary: "w3f-app-bar--secondary",
  surface: "w3f-app-bar--surface",
  transparent: "w3f-app-bar--transparent",
  dark: "w3f-app-bar--dark",
  // positions
  fixed: "w3f-app-bar--fixed",
  sticky: "w3f-app-bar--sticky",
  // sizes
  sm: "w3f-app-bar--sm",
  lg: "w3f-app-bar--lg",
  // elevated
  elevated: "w3f-app-bar--elevated"
};

// src/SURFACES/AppBar/AppBar.utils.ts
function buildAppBarClasses(color, position, size, elevated, className, unstyled) {
  if (unstyled) {
    return [
      APP_BAR_CLASSES.root,
      "w3f-app-bar--unstyled",
      position === "fixed" && APP_BAR_CLASSES.fixed,
      position === "sticky" && APP_BAR_CLASSES.sticky,
      className
    ].filter(Boolean).join(" ");
  }
  return [
    APP_BAR_CLASSES.root,
    color !== "primary" && APP_BAR_CLASSES[color],
    color === "primary" && APP_BAR_CLASSES.primary,
    position === "fixed" && APP_BAR_CLASSES.fixed,
    position === "sticky" && APP_BAR_CLASSES.sticky,
    size === "sm" && APP_BAR_CLASSES.sm,
    size === "lg" && APP_BAR_CLASSES.lg,
    elevated && APP_BAR_CLASSES.elevated,
    className
  ].filter(Boolean).join(" ");
}

// src/SURFACES/AppBar/AppBar.tsx
import { jsx as jsx33 } from "react/jsx-runtime";
var AppBar = forwardRef28(({
  children,
  color = APP_BAR_DEFAULTS.color,
  position = APP_BAR_DEFAULTS.position,
  size = APP_BAR_DEFAULTS.size,
  elevated = APP_BAR_DEFAULTS.elevated,
  unstyled = APP_BAR_DEFAULTS.unstyled,
  className = APP_BAR_DEFAULTS.className
}, ref) => {
  const cls = buildAppBarClasses(color, position, size, elevated, className, unstyled);
  return /* @__PURE__ */ jsx33("header", { ref, className: cls, children: /* @__PURE__ */ jsx33("div", { className: APP_BAR_CLASSES.toolbar, children }) });
});
AppBar.displayName = "AppBar";
var AppBarLeading = ({
  children,
  className = ""
}) => /* @__PURE__ */ jsx33("div", { className: [APP_BAR_CLASSES.leading, className].filter(Boolean).join(" "), children });
AppBarLeading.displayName = "AppBarLeading";
var AppBarTitle = ({
  children,
  className = ""
}) => /* @__PURE__ */ jsx33("div", { className: [APP_BAR_CLASSES.title, className].filter(Boolean).join(" "), children });
AppBarTitle.displayName = "AppBarTitle";
var AppBarTrailing = ({
  children,
  className = ""
}) => /* @__PURE__ */ jsx33("div", { className: [APP_BAR_CLASSES.trailing, className].filter(Boolean).join(" "), children });
AppBarTrailing.displayName = "AppBarTrailing";
var AppBar_default = AppBar;

// src/SURFACES/ContextMenu/ContextMenu.tsx
import { forwardRef as forwardRef29, useRef as useRef15, useCallback as useCallback19, useEffect as useEffect14, useState as useState31 } from "react";

// src/SURFACES/ContextMenu/ContextMenu.constants.ts
var CONTEXT_MENU_CLASSES = {
  wrapper: "w3f-context-menu-wrapper",
  dropdown: "w3f-nested-menu-dropdown",
  item: "w3f-nested-menu-item",
  button: "w3f-nested-menu-button",
  buttonParent: "w3f-nested-menu-button-parent",
  buttonLeaf: "w3f-nested-menu-button-leaf",
  label: "w3f-nested-menu-label",
  arrow: "w3f-nested-menu-arrow",
  submenu: "w3f-nested-menu-submenu",
  isActive: "is-active"
};
var CONTEXT_MENU_DEFAULTS = {
  unstyled: false,
  className: ""
};
var SUBMENU_CLOSE_DELAY = 200;
var MENU_WIDTH = 200;

// src/SURFACES/ContextMenu/ContextMenu.utils.ts
function calculateMenuPosition(clientX, clientY) {
  let x = clientX;
  const y = clientY;
  if (x + MENU_WIDTH > window.innerWidth) x -= MENU_WIDTH;
  return { x, y };
}
function calculateSubmenuPosition(itemRect, subItemCount) {
  const submenuWidth = MENU_WIDTH;
  const submenuHeight = subItemCount * 40;
  let left = "100%";
  let top = 0;
  if (itemRect.right + submenuWidth > window.innerWidth) {
    left = "-100%";
  }
  if (itemRect.top + submenuHeight > window.innerHeight) {
    top = -(submenuHeight - itemRect.height);
    if (itemRect.top + top < 0) {
      top = -itemRect.top + 10;
    }
  }
  return { left, top };
}
function buildContextMenuClasses(className, unstyled) {
  const base = CONTEXT_MENU_CLASSES.wrapper;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, className].filter(Boolean).join(" ");
}

// src/SURFACES/ContextMenu/ContextMenu.hooks.ts
import { useState as useState30, useCallback as useCallback18, useEffect as useEffect13, useRef as useRef14 } from "react";
function useContextMenu(wrapperRef) {
  const [menuState, setMenuState] = useState30({
    visible: false,
    x: 0,
    y: 0
  });
  const menuRef = useRef14(null);
  const showMenu = useCallback18((x, y) => {
    setMenuState({ visible: true, x, y });
  }, []);
  const hideMenu = useCallback18(() => {
    setMenuState((prev) => ({ ...prev, visible: false }));
  }, []);
  useEffect13(() => {
    if (!menuState.visible) return;
    const handleClose = (e) => {
      if (e.key === "Escape") {
        hideMenu();
        return;
      }
      const target = e.target;
      if (e.type === "click" && !menuRef.current?.contains(target)) {
        hideMenu();
        return;
      }
      if (e.type === "contextmenu" && !menuRef.current?.contains(target) && !wrapperRef?.current?.contains(target)) {
        hideMenu();
      }
    };
    document.addEventListener("click", handleClose);
    document.addEventListener("contextmenu", handleClose);
    document.addEventListener("keydown", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
      document.removeEventListener("contextmenu", handleClose);
      document.removeEventListener("keydown", handleClose);
    };
  }, [menuState.visible, hideMenu, wrapperRef]);
  return { menuState, menuRef, showMenu, hideMenu };
}

// src/SURFACES/ContextMenu/ContextMenu.tsx
import { jsx as jsx34, jsxs as jsxs28 } from "react/jsx-runtime";
var ContextMenuItem = ({
  item,
  onClose,
  onSelect,
  level = 0,
  path = []
}) => {
  const [showSubmenu, setShowSubmenu] = useState31(false);
  const [submenuPos, setSubmenuPos] = useState31({
    left: "100%",
    top: 0
  });
  const timeoutRef = useRef15(null);
  const itemRef = useRef15(null);
  const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
  const recalcSubmenu = useCallback19(() => {
    if (!itemRef.current || !hasSubItems) return;
    const rect = itemRef.current.getBoundingClientRect();
    const pos = calculateSubmenuPosition(rect, item.subItems?.length ?? 0);
    setSubmenuPos(pos);
  }, [hasSubItems, item.subItems]);
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (hasSubItems) {
      setShowSubmenu(true);
      setTimeout(recalcSubmenu, 0);
    }
  };
  const handleMouseLeave = () => {
    if (hasSubItems) {
      timeoutRef.current = setTimeout(() => setShowSubmenu(false), SUBMENU_CLOSE_DELAY);
    }
  };
  const handleClick = (e) => {
    e.stopPropagation();
    if (hasSubItems) {
      setShowSubmenu((prev) => !prev);
      recalcSubmenu();
    } else {
      const navData = {
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        selectedItem: {
          label: item.label,
          link: item.link ?? null,
          hasSubItems: false
        },
        navigationPath: path,
        level
      };
      if (onSelect) onSelect(navData);
      if (item.onClick) item.onClick(navData);
      onClose();
    }
  };
  useEffect14(() => {
    if (showSubmenu && hasSubItems) recalcSubmenu();
  }, [showSubmenu, hasSubItems, recalcSubmenu]);
  return /* @__PURE__ */ jsxs28(
    "div",
    {
      ref: itemRef,
      className: [
        CONTEXT_MENU_CLASSES.item,
        showSubmenu && CONTEXT_MENU_CLASSES.isActive
      ].filter(Boolean).join(" "),
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      style: { position: "relative" },
      children: [
        /* @__PURE__ */ jsxs28(
          Button_default,
          {
            className: [
              CONTEXT_MENU_CLASSES.button,
              hasSubItems ? CONTEXT_MENU_CLASSES.buttonParent : CONTEXT_MENU_CLASSES.buttonLeaf
            ].filter(Boolean).join(" "),
            onClick: handleClick,
            variant: "text",
            style: {
              width: "100%",
              border: "none",
              background: "transparent",
              textAlign: "left",
              cursor: "pointer",
              justifyContent: "flex-start",
              padding: "8px 12px",
              height: "auto",
              textTransform: "none"
            },
            children: [
              /* @__PURE__ */ jsx34("span", { className: CONTEXT_MENU_CLASSES.label, style: { flex: 1 }, children: item.label }),
              hasSubItems && /* @__PURE__ */ jsx34("span", { className: CONTEXT_MENU_CLASSES.arrow, children: "\u25B8" })
            ]
          }
        ),
        hasSubItems && showSubmenu && /* @__PURE__ */ jsx34(
          "div",
          {
            className: CONTEXT_MENU_CLASSES.submenu,
            style: {
              display: "block",
              position: "absolute",
              left: submenuPos.left,
              top: submenuPos.top,
              overflow: "visible"
            },
            children: item.subItems.map((subItem, index) => /* @__PURE__ */ jsx34(
              ContextMenuItem,
              {
                item: subItem,
                onClose,
                onSelect,
                level: level + 1,
                path: [...path, index]
              },
              subItem.id ?? index
            ))
          }
        )
      ]
    }
  );
};
ContextMenuItem.displayName = "ContextMenuItem";
var ContextMenu = forwardRef29(({
  children,
  items,
  onMenuAction,
  unstyled = CONTEXT_MENU_DEFAULTS.unstyled,
  className = CONTEXT_MENU_DEFAULTS.className
}, ref) => {
  const wrapperRef = useRef15(null);
  const { menuState, menuRef, showMenu, hideMenu } = useContextMenu(wrapperRef);
  const handleContextMenu = (e) => {
    e.preventDefault();
    const pos = calculateMenuPosition(e.clientX, e.clientY);
    showMenu(pos.x, pos.y);
  };
  return /* @__PURE__ */ jsxs28("div", { ref: (node) => {
    wrapperRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  }, onContextMenu: handleContextMenu, className: buildContextMenuClasses(className, unstyled), style: { position: "relative" }, children: [
    children,
    menuState.visible && /* @__PURE__ */ jsx34(
      "div",
      {
        ref: menuRef,
        className: CONTEXT_MENU_CLASSES.dropdown,
        style: { position: "fixed", left: menuState.x, top: menuState.y },
        children: items.map((item, index) => /* @__PURE__ */ jsx34(
          ContextMenuItem,
          {
            item,
            onClose: hideMenu,
            onSelect: onMenuAction,
            path: [index]
          },
          item.id ?? index
        ))
      }
    )
  ] });
});
ContextMenu.displayName = "ContextMenu";

// src/SURFACES/Desktop/Desktop.tsx
import React33, { forwardRef as forwardRef30 } from "react";

// src/LAYOUT/Grid/Grid.constants.ts
var VALID_COL_SPANS = ["full", "1", "2", "3", "4", "6"];

// src/LAYOUT/Grid/Grid.utils.ts
var buildGridItemClassNames = ({
  colSpan,
  className
}) => {
  const classes = [];
  if (colSpan) {
    const spanStr = String(colSpan);
    if (VALID_COL_SPANS.includes(spanStr)) {
      classes.push(`w3f-col-span-${spanStr}`);
    }
  }
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};
var buildGridInlineStyles = (props) => {
  const {
    grid,
    gridTemplate,
    templateColumns,
    templateRows,
    templateAreas,
    gap,
    rowGap,
    columnGap,
    autoColumns,
    autoRows,
    autoFlow,
    justifyContent,
    alignContent,
    placeContent,
    justifyItems,
    alignItems,
    placeItems,
    justifySelf,
    alignSelf,
    placeSelf,
    gridRow,
    gridColumn,
    gridArea,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    padding,
    margin,
    style
  } = props;
  const gridStyle = {
    display: "grid",
    grid,
    gridTemplate,
    gridTemplateColumns: templateColumns,
    gridTemplateRows: templateRows,
    gridTemplateAreas: templateAreas ? templateAreas.trim().split("\n").map((row) => `"${row.trim()}"`).join(" ") : void 0,
    gap,
    rowGap,
    columnGap,
    gridAutoColumns: autoColumns,
    gridAutoRows: autoRows,
    gridAutoFlow: autoFlow,
    justifyContent,
    alignContent,
    placeContent,
    justifyItems,
    alignItems,
    placeItems,
    justifySelf,
    alignSelf,
    placeSelf,
    gridRow,
    gridColumn,
    gridArea,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    padding,
    margin,
    ...style
  };
  Object.keys(gridStyle).forEach((key) => {
    if (gridStyle[key] === void 0) delete gridStyle[key];
  });
  return gridStyle;
};
var buildGridItemInlineStyles = ({
  gridArea,
  gridRow,
  gridColumn,
  justifySelf,
  alignSelf,
  placeSelf,
  style
}) => {
  const itemStyle = {
    gridArea,
    gridRow,
    gridColumn,
    justifySelf,
    alignSelf,
    placeSelf,
    ...style
  };
  Object.keys(itemStyle).forEach((key) => {
    if (itemStyle[key] === void 0) delete itemStyle[key];
  });
  return itemStyle;
};

// src/LAYOUT/Grid/Grid.tsx
import { jsx as jsx35 } from "react/jsx-runtime";
var Grid = ({
  children,
  className,
  style,
  ...props
}) => {
  const gridStyle = buildGridInlineStyles({ ...props, style });
  return /* @__PURE__ */ jsx35("div", { style: gridStyle, className, ...{}, children });
};
Grid.displayName = "Grid";
var GridAreaItem = ({
  children,
  colSpan,
  gridArea,
  gridRow,
  gridColumn,
  justifySelf,
  alignSelf,
  placeSelf,
  style,
  className,
  ...rest
}) => {
  const classNames = buildGridItemClassNames({ colSpan, className });
  const itemStyle = buildGridItemInlineStyles({
    gridArea,
    gridRow,
    gridColumn,
    justifySelf,
    alignSelf,
    placeSelf,
    style
  });
  return /* @__PURE__ */ jsx35("div", { style: itemStyle, className: classNames, ...rest, children });
};
GridAreaItem.displayName = "GridAreaItem";
var Grid_default = Grid;

// src/SURFACES/Desktop/Desktop.constants.ts
var DESKTOP_CLASSES = {
  root: "w3f-desktop"
};
var DESKTOP_DEFAULTS = {
  unstyled: false,
  className: "",
  background: "#f0f2f5"
};
var BASE_Z_INDEX = 100;

// src/SURFACES/Desktop/Desktop.utils.ts
function getWindowZIndex(windowOrder, key) {
  const index = windowOrder.indexOf(key);
  return index !== -1 ? BASE_Z_INDEX + index : BASE_Z_INDEX;
}
function bringToFront(order, key) {
  if (order[order.length - 1] === key) return order;
  return [...order.filter((k) => k !== key), key];
}
function syncWindowOrder(prevOrder, currentKeys) {
  const filtered = prevOrder.filter((key) => currentKeys.includes(key));
  currentKeys.forEach((key) => {
    if (!filtered.includes(key)) filtered.push(key);
  });
  return filtered;
}
function buildDesktopClasses(className, unstyled) {
  const base = DESKTOP_CLASSES.root;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, className].filter(Boolean).join(" ");
}

// src/SURFACES/Desktop/Desktop.hooks.ts
import { useState as useState32, useCallback as useCallback20, useEffect as useEffect15 } from "react";
function useWindowOrder(children) {
  const [windowOrder, setWindowOrder] = useState32([]);
  useEffect15(() => {
    const currentKeys = [];
    const childArray = Array.isArray(children) ? children : [children];
    for (const child of childArray) {
      if (child && typeof child === "object" && "key" in child && child.key) {
        currentKeys.push(String(child.key));
      }
    }
    setWindowOrder((prev) => syncWindowOrder(prev, currentKeys));
  }, [children]);
  const handleWindowFocus = useCallback20((key) => {
    setWindowOrder((prev) => bringToFront(prev, key));
  }, []);
  return { windowOrder, handleWindowFocus };
}

// src/SURFACES/Desktop/Desktop.tsx
import { jsx as jsx36 } from "react/jsx-runtime";
var Desktop = forwardRef30(({
  children,
  unstyled = DESKTOP_DEFAULTS.unstyled,
  className = DESKTOP_DEFAULTS.className,
  style,
  background = DESKTOP_DEFAULTS.background
}, ref) => {
  const { windowOrder, handleWindowFocus } = useWindowOrder(children);
  return /* @__PURE__ */ jsx36(
    Grid_default,
    {
      ref,
      className: buildDesktopClasses(className, unstyled),
      style: {
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background,
        ...style
      },
      children: React33.Children.map(children, (child) => {
        if (!React33.isValidElement(child)) return child;
        const key = child.key;
        if (!key) {
          console.warn(
            'Desktop: Window component is missing a unique "key" prop. Z-index management relies on keys.'
          );
          return child;
        }
        const zIndex = getWindowZIndex(windowOrder, String(key));
        return React33.cloneElement(
          child,
          {
            style: { ...child.props.style, zIndex },
            onFocus: () => {
              handleWindowFocus(String(key));
              const childProps = child.props;
              if (typeof childProps.onFocus === "function") childProps.onFocus();
            }
          }
        );
      })
    }
  );
});
Desktop.displayName = "Desktop";

// src/SURFACES/ImageGallery/ImageGallery.tsx
import { forwardRef as forwardRef32 } from "react";

// src/DATADISPLAY/Image/Image.tsx
import { forwardRef as forwardRef31 } from "react";

// src/DATADISPLAY/Image/Image.constants.ts
var IMAGE_DEFAULTS = {
  circle: false,
  border: false,
  className: "",
  wrapperClassName: "",
  unstyled: false
};

// src/DATADISPLAY/Image/Image.utils.ts
var buildImageClasses = (circle, rounded, border, shadow, filter, hoverEffect, unstyled, className) => {
  const base = "w3f-image-base";
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  const classes = [base];
  if (circle) {
    classes.push("w3f-rounded-full");
  } else if (rounded) {
    classes.push(`w3f-rounded-${rounded}`);
  }
  if (border) {
    classes.push("w3f-image-border");
  }
  if (shadow) {
    classes.push(`w3f-shadow-${shadow}`);
  }
  if (filter) {
    classes.push(`w3f-image-filter-${filter}`);
  }
  if (hoverEffect) {
    classes.push(`w3f-image-hover-${hoverEffect}`);
  }
  if (className) {
    classes.push(className);
  }
  return classes.filter(Boolean).join(" ");
};

// src/DATADISPLAY/Image/Image.tsx
import { useBridgeBind as useBridgeBind15 } from "@w3f/bridge";
import { jsx as jsx37 } from "react/jsx-runtime";
var Image2 = forwardRef31(({
  src,
  alt,
  rounded,
  circle = IMAGE_DEFAULTS.circle,
  border = IMAGE_DEFAULTS.border,
  shadow,
  filter,
  hoverEffect,
  unstyled = IMAGE_DEFAULTS.unstyled,
  className = IMAGE_DEFAULTS.className,
  wrapperClassName = IMAGE_DEFAULTS.wrapperClassName,
  width,
  height,
  bindId,
  ...rest
}, ref) => {
  useBridgeBind15({ bindId });
  const imageClasses = buildImageClasses(circle, rounded, border, shadow, filter, hoverEffect, unstyled, className);
  return /* @__PURE__ */ jsx37("div", { ref, className: `w3f-image-wrapper ${wrapperClassName}`, children: /* @__PURE__ */ jsx37(
    "img",
    {
      src: sanitizeUrl(src),
      alt,
      width,
      height,
      className: imageClasses,
      ...rest
    }
  ) });
});
Image2.displayName = "Image";

// src/LAYOUT/Container/Container.constants.ts
var CONTAINER_DEFAULTS = {
  as: "div"
};
var CONTAINER_CLASSES = {
  base: "w3f-container"
};

// src/LAYOUT/Container/Container.utils.ts
var buildContainerClass = (additionalClasses = "") => {
  return `${CONTAINER_CLASSES.base} ${additionalClasses}`.trim();
};

// src/LAYOUT/Container/Container.hooks.ts
var useContainerProps = ({ className = "", ...restProps }) => {
  const finalClassName = buildContainerClass(className);
  return {
    className: finalClassName,
    ...restProps
  };
};

// src/LAYOUT/Container/Container.tsx
import { jsx as jsx38 } from "react/jsx-runtime";
var Container = ({
  children,
  as: Element = CONTAINER_DEFAULTS.as,
  ...props
}) => {
  const processedProps = useContainerProps(props);
  return /* @__PURE__ */ jsx38(Element, { ...processedProps, children });
};
Container.displayName = "Container";
var Container_default = Container;

// src/LAYOUT/Panels/Panel.constants.ts
var PANEL_DEFAULTS = {
  padding: true
};
var PANEL_CLASSES = {
  base: "w3f-panel",
  padding: "w3f-p-6",
  card: "w3f-shadow-md",
  round: "w3f-round-2xl",
  border: "w3f-border"
};

// src/LAYOUT/Panels/Panel.utils.ts
var mapColorToW3Class = (color) => {
  return "";
};
var buildPanelClassNames = ({
  color,
  padding,
  card,
  round,
  border,
  className
}) => {
  const classes = [PANEL_CLASSES.base];
  classes.push(mapColorToW3Class(color));
  if (padding) classes.push(PANEL_CLASSES.padding);
  if (card) classes.push(PANEL_CLASSES.card);
  if (round) classes.push(PANEL_CLASSES.round);
  if (border) classes.push(PANEL_CLASSES.border);
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};

// src/LAYOUT/Panels/Panel.tsx
import { jsx as jsx39 } from "react/jsx-runtime";
var Panel = ({
  children,
  color,
  card,
  round,
  padding = PANEL_DEFAULTS.padding,
  border,
  className,
  ...rest
}) => {
  const classNames = buildPanelClassNames({
    color,
    card,
    round,
    padding,
    border,
    className
  });
  return /* @__PURE__ */ jsx39("div", { className: classNames, style: color ? { backgroundColor: color } : void 0, ...rest, children });
};
Panel.displayName = "Panel";

// src/SURFACES/ImageGallery/ImageGallery.constants.ts
var IMAGE_GALLERY_DEFAULTS = {
  images: [],
  layout: "grid",
  columns: 3,
  gap: 4,
  showCaptions: false,
  lightbox: true,
  imageRounded: "md",
  imageShadow: "sm",
  imageHoverEffect: "zoom",
  thumbnails: true,
  emptyMessage: "No hay im\xE1genes para mostrar",
  unstyled: false,
  className: ""
};
var IMAGE_GALLERY_CLASSES = {
  container: "w3f-gallery-container",
  title: "w3f-gallery-title",
  gallery: "w3f-gallery",
  grid: "w3f-gallery-grid",
  masonry: "w3f-gallery-masonry",
  carousel: "w3f-gallery-carousel",
  item: "w3f-gallery-item",
  image: "w3f-gallery-image",
  caption: "w3f-gallery-caption",
  empty: "w3f-gallery-empty",
  emptyIcon: "w3f-gallery-empty-icon",
  emptyText: "w3f-gallery-empty-text",
  lightboxOverlay: "w3f-lightbox-overlay",
  lightboxClose: "w3f-lightbox-close",
  lightboxNav: "w3f-lightbox-nav",
  lightboxPrev: "w3f-lightbox-prev",
  lightboxNext: "w3f-lightbox-next",
  lightboxContent: "w3f-lightbox-content",
  lightboxImage: "w3f-lightbox-image",
  lightboxCaption: "w3f-lightbox-caption",
  lightboxCounter: "w3f-lightbox-counter"
};

// src/SURFACES/ImageGallery/ImageGallery.utils.ts
function buildGalleryClasses(layout, className, unstyled) {
  const base = IMAGE_GALLERY_CLASSES.gallery;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  const layoutClass = IMAGE_GALLERY_CLASSES[layout] || "";
  return [base, layoutClass, className].filter(Boolean).join(" ");
}
function buildGridStyle(layout, columns, gap) {
  if (layout !== "grid") return {};
  return {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `var(--w3f-space-${gap})`
  };
}

// src/SURFACES/ImageGallery/ImageGallery.hooks.ts
import { useState as useState33, useEffect as useEffect16, useCallback as useCallback21 } from "react";
function useImageGallery(images, enabled) {
  const [selectedImage, setSelectedImage] = useState33(null);
  const [currentIndex, setCurrentIndex] = useState33(0);
  useEffect16(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);
  const openLightbox = useCallback21(
    (image, index) => {
      if (!enabled) return;
      setSelectedImage(image);
      setCurrentIndex(index);
    },
    [enabled]
  );
  const closeLightbox = useCallback21(() => {
    setSelectedImage(null);
  }, []);
  const goToPrevious = useCallback21(
    (e) => {
      e.stopPropagation();
      const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
      setCurrentIndex(newIndex);
      setSelectedImage(images[newIndex]);
    },
    [currentIndex, images]
  );
  const goToNext = useCallback21(
    (e) => {
      e.stopPropagation();
      const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(newIndex);
      setSelectedImage(images[newIndex]);
    },
    [currentIndex, images]
  );
  useEffect16(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") goToPrevious(e);
      else if (e.key === "ArrowRight") goToNext(e);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, goToPrevious, goToNext, closeLightbox]);
  return { selectedImage, currentIndex, openLightbox, closeLightbox, goToPrevious, goToNext };
}

// src/SURFACES/ImageGallery/ImageGallery.tsx
import { Fragment as Fragment6, jsx as jsx40, jsxs as jsxs29 } from "react/jsx-runtime";
var ImageGallery = forwardRef32(({
  images = IMAGE_GALLERY_DEFAULTS.images,
  title,
  layout = IMAGE_GALLERY_DEFAULTS.layout,
  columns = IMAGE_GALLERY_DEFAULTS.columns,
  gap = IMAGE_GALLERY_DEFAULTS.gap,
  showCaptions = IMAGE_GALLERY_DEFAULTS.showCaptions,
  lightbox = IMAGE_GALLERY_DEFAULTS.lightbox,
  imageRounded = IMAGE_GALLERY_DEFAULTS.imageRounded,
  imageShadow = IMAGE_GALLERY_DEFAULTS.imageShadow,
  imageHoverEffect = IMAGE_GALLERY_DEFAULTS.imageHoverEffect,
  thumbnails = IMAGE_GALLERY_DEFAULTS.thumbnails,
  emptyMessage = IMAGE_GALLERY_DEFAULTS.emptyMessage,
  unstyled = IMAGE_GALLERY_DEFAULTS.unstyled,
  className = IMAGE_GALLERY_DEFAULTS.className
}, ref) => {
  const { selectedImage, currentIndex, openLightbox, closeLightbox, goToPrevious, goToNext } = useImageGallery(images, lightbox);
  if (images.length === 0) {
    return /* @__PURE__ */ jsxs29(Container_default, { ref, className: IMAGE_GALLERY_CLASSES.container, children: [
      title && /* @__PURE__ */ jsx40("h3", { className: IMAGE_GALLERY_CLASSES.title, children: title }),
      /* @__PURE__ */ jsxs29(Panel, { className: IMAGE_GALLERY_CLASSES.empty, children: [
        /* @__PURE__ */ jsx40(
          "svg",
          {
            className: IMAGE_GALLERY_CLASSES.emptyIcon,
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx40(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx40("p", { className: IMAGE_GALLERY_CLASSES.emptyText, children: emptyMessage })
      ] })
    ] });
  }
  const galleryCls = buildGalleryClasses(layout, className, unstyled);
  const gridStyle = buildGridStyle(layout, columns, gap);
  return /* @__PURE__ */ jsxs29(Container_default, { ref, className: IMAGE_GALLERY_CLASSES.container, children: [
    title && /* @__PURE__ */ jsx40("h3", { className: IMAGE_GALLERY_CLASSES.title, children: title }),
    /* @__PURE__ */ jsx40("div", { className: galleryCls, style: gridStyle, children: images.map((image, index) => /* @__PURE__ */ jsxs29(
      Panel,
      {
        className: IMAGE_GALLERY_CLASSES.item,
        padding: false,
        card: true,
        children: [
          /* @__PURE__ */ jsx40(
            Image2,
            {
              src: thumbnails && image.thumbnail ? image.thumbnail : image.src,
              alt: image.alt ?? `Imagen ${index + 1}`,
              rounded: imageRounded,
              shadow: imageShadow,
              hoverEffect: lightbox ? imageHoverEffect : void 0,
              className: IMAGE_GALLERY_CLASSES.image,
              onClick: () => openLightbox(image, index),
              loading: "lazy"
            }
          ),
          showCaptions && image.caption && /* @__PURE__ */ jsx40("p", { className: IMAGE_GALLERY_CLASSES.caption, children: image.caption })
        ]
      },
      image.id ?? index
    )) }),
    lightbox && selectedImage && /* @__PURE__ */ jsxs29(
      "div",
      {
        className: IMAGE_GALLERY_CLASSES.lightboxOverlay,
        onClick: closeLightbox,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Vista ampliada de imagen",
        children: [
          /* @__PURE__ */ jsx40(
            Button_default,
            {
              className: IMAGE_GALLERY_CLASSES.lightboxClose,
              onClick: closeLightbox,
              "aria-label": "Cerrar lightbox",
              variant: "text",
              children: /* @__PURE__ */ jsx40("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx40(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M6 18L18 6M6 6l12 12"
                }
              ) })
            }
          ),
          images.length > 1 && /* @__PURE__ */ jsxs29(Fragment6, { children: [
            /* @__PURE__ */ jsx40(
              Button_default,
              {
                className: `${IMAGE_GALLERY_CLASSES.lightboxNav} ${IMAGE_GALLERY_CLASSES.lightboxPrev}`,
                onClick: goToPrevious,
                "aria-label": "Imagen anterior",
                variant: "text",
                children: /* @__PURE__ */ jsx40("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx40(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M15 19l-7-7 7-7"
                  }
                ) })
              }
            ),
            /* @__PURE__ */ jsx40(
              Button_default,
              {
                className: `${IMAGE_GALLERY_CLASSES.lightboxNav} ${IMAGE_GALLERY_CLASSES.lightboxNext}`,
                onClick: goToNext,
                "aria-label": "Siguiente imagen",
                variant: "text",
                children: /* @__PURE__ */ jsx40("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx40(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M9 5l7 7-7 7"
                  }
                ) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs29(
            Panel,
            {
              className: IMAGE_GALLERY_CLASSES.lightboxContent,
              onClick: (e) => e.stopPropagation(),
              padding: false,
              children: [
                /* @__PURE__ */ jsx40(
                  "img",
                  {
                    src: sanitizeUrl(selectedImage.src),
                    alt: selectedImage.alt ?? "Imagen ampliada",
                    className: IMAGE_GALLERY_CLASSES.lightboxImage
                  }
                ),
                selectedImage.caption && /* @__PURE__ */ jsxs29("div", { className: IMAGE_GALLERY_CLASSES.lightboxCaption, children: [
                  /* @__PURE__ */ jsx40("p", { children: selectedImage.caption }),
                  images.length > 1 && /* @__PURE__ */ jsxs29("span", { className: IMAGE_GALLERY_CLASSES.lightboxCounter, children: [
                    currentIndex + 1,
                    " / ",
                    images.length
                  ] })
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
});
ImageGallery.displayName = "ImageGallery";

// src/SURFACES/Masonry/Masonry.tsx
import { createContext as createContext4, useContext as useContext21, memo, forwardRef as forwardRef33 } from "react";

// src/SURFACES/Masonry/Masonry.constants.ts
var MSN_DEFAULTS = {
  variant: "column",
  columns: { xs: 1, sm: 2, md: 3, lg: 4 },
  baseColumnWidth: "280px",
  minCardWidth: "280px",
  gap: "1rem",
  padding: "1rem",
  headerHeight: "8rem",
  hover: true,
  size: "small",
  unstyled: false
};
var MSN_CLASSES = {
  // Container
  root: "w3f-masonry",
  varColumn: "w3f-masonry--column",
  varFlex: "w3f-masonry--flex",
  varGrid: "w3f-masonry--grid",
  // Items
  item: "w3f-masonry-item",
  itemSmall: "w3f-masonry-item--small",
  itemMedium: "w3f-masonry-item--medium",
  itemLarge: "w3f-masonry-item--large",
  itemFull: "w3f-masonry-item--full",
  // Card
  card: "w3f-masonry-card",
  cardHover: "w3f-masonry-card--hover",
  cardHeader: "w3f-masonry-card__header",
  cardBody: "w3f-masonry-card__body",
  cardTitle: "w3f-masonry-card__title"
};

// src/SURFACES/Masonry/Masonry.utils.ts
function buildMasonryRootClasses(variant, className, unstyled) {
  const base = MSN_CLASSES.root;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  const varCls = {
    column: MSN_CLASSES.varColumn,
    flex: MSN_CLASSES.varFlex,
    grid: MSN_CLASSES.varGrid
  }[variant];
  return [base, varCls, className].filter(Boolean).join(" ");
}
function buildMasonryRootStyle(variant, opts) {
  const gap = opts.gap ?? MSN_DEFAULTS.gap;
  const padding = opts.padding ?? MSN_DEFAULTS.padding;
  if (variant === "column") {
    const { xs = 1, sm = 2, md = 3, lg = 4, xl } = opts.columns ?? MSN_DEFAULTS.columns;
    return {
      padding,
      columnGap: gap,
      "--w3f-msn-cols-xs": xs,
      "--w3f-msn-cols-sm": sm,
      "--w3f-msn-cols-md": md,
      "--w3f-msn-cols-lg": lg,
      "--w3f-msn-cols-xl": xl ?? lg,
      "--w3f-msn-gap": gap,
      ...opts.style
    };
  }
  if (variant === "flex") {
    const base = opts.baseColumnWidth ?? MSN_DEFAULTS.baseColumnWidth;
    return {
      padding,
      gap,
      "--w3f-msn-base": base,
      "--w3f-msn-gap": gap,
      ...opts.style
    };
  }
  const min = opts.minCardWidth ?? MSN_DEFAULTS.minCardWidth;
  const cols = opts.gridColumns ? `repeat(${opts.gridColumns}, 1fr)` : `repeat(auto-fit, minmax(${min}, 1fr))`;
  return {
    padding,
    gap,
    gridTemplateColumns: cols,
    ...opts.style
  };
}
function buildMasonryItemClasses(variant, size, className) {
  const sizeClass = variant !== "column" ? {
    small: MSN_CLASSES.itemSmall,
    medium: MSN_CLASSES.itemMedium,
    large: MSN_CLASSES.itemLarge,
    full: MSN_CLASSES.itemFull
  }[size] ?? "" : "";
  return [MSN_CLASSES.item, sizeClass, className].filter(Boolean).join(" ");
}
function buildMasonryCardClasses(hover, className) {
  return [
    MSN_CLASSES.card,
    hover ? MSN_CLASSES.cardHover : "",
    className
  ].filter(Boolean).join(" ");
}

// src/SURFACES/Masonry/Masonry.tsx
import { jsx as jsx41, jsxs as jsxs30 } from "react/jsx-runtime";
var MasonryCtx = createContext4({ variant: "column" });
var MasonryItem = memo(({
  size = MSN_DEFAULTS.size,
  children,
  className,
  style
}) => {
  const { variant } = useContext21(MasonryCtx);
  const cls = buildMasonryItemClasses(variant, size, className);
  return /* @__PURE__ */ jsx41("div", { className: cls, style, children });
});
MasonryItem.displayName = "MasonryItem";
var MasonryCard = memo(({
  title,
  gradient,
  headerHeight = MSN_DEFAULTS.headerHeight,
  hover = MSN_DEFAULTS.hover,
  size = MSN_DEFAULTS.size,
  name,
  value,
  onClick,
  children,
  className,
  style
}) => {
  const { variant } = useContext21(MasonryCtx);
  const itemCls = buildMasonryItemClasses(variant, size);
  const cardCls = buildMasonryCardClasses(hover, className);
  return /* @__PURE__ */ jsx41("div", { className: itemCls, style, children: /* @__PURE__ */ jsxs30(
    "div",
    {
      className: cardCls,
      onClick,
      role: onClick ? "button" : void 0,
      tabIndex: onClick ? 0 : void 0,
      onKeyDown: onClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") onClick(e);
      } : void 0,
      children: [
        gradient && /* @__PURE__ */ jsx41(
          "div",
          {
            className: MSN_CLASSES.cardHeader,
            style: { height: headerHeight, background: gradient }
          }
        ),
        /* @__PURE__ */ jsxs30("div", { className: MSN_CLASSES.cardBody, children: [
          title && /* @__PURE__ */ jsx41("h3", { className: MSN_CLASSES.cardTitle, children: title }),
          children,
          name !== void 0 && /* @__PURE__ */ jsx41(
            "input",
            {
              type: "hidden",
              name,
              value: value !== void 0 ? String(value) : ""
            }
          )
        ] })
      ]
    }
  ) });
});
MasonryCard.displayName = "MasonryCard";
var Masonry = forwardRef33(({
  variant = MSN_DEFAULTS.variant,
  columns,
  baseColumnWidth,
  minCardWidth,
  gridColumns,
  gap,
  padding,
  children,
  unstyled = MSN_DEFAULTS.unstyled,
  className,
  style
}, ref) => {
  const rootCls = buildMasonryRootClasses(variant, className, unstyled);
  const rootStyle = buildMasonryRootStyle(variant, {
    columns,
    gap,
    padding,
    baseColumnWidth,
    minCardWidth,
    gridColumns,
    style
  });
  return /* @__PURE__ */ jsx41(MasonryCtx.Provider, { value: { variant }, children: /* @__PURE__ */ jsx41("div", { ref, className: rootCls, style: rootStyle, children }) });
});
Masonry.displayName = "Masonry";

// src/SURFACES/Menu/Menu.tsx
import { forwardRef as forwardRef34, useState as useState35, useEffect as useEffect18 } from "react";

// src/SURFACES/Menu/Menu.constants.ts
var MENU_BAR_CATEGORY_DEFAULTS = {
  position: "left",
  unstyled: false
};
var MENU_CLASSES = {
  container: "w3f-nested-menu-container",
  trigger: "w3f-nested-menu-trigger",
  dropdown: "w3f-nested-menu-dropdown",
  dropdownRight: "w3f-nested-menu-dropdown-right",
  dropdownCenter: "w3f-nested-menu-dropdown-center",
  dropdownTop: "w3f-nested-menu-dropdown-top",
  item: "w3f-nested-menu-item",
  button: "w3f-nested-menu-button",
  buttonParent: "w3f-nested-menu-button-parent",
  buttonLeaf: "w3f-nested-menu-button-leaf",
  label: "w3f-nested-menu-label",
  arrow: "w3f-nested-menu-arrow",
  submenu: "w3f-nested-menu-submenu",
  isActive: "is-active"
};
var SUBMENU_CLOSE_DELAY2 = 200;

// src/SURFACES/Menu/Menu.utils.ts
function buildDropdownClasses(position) {
  const positionClass = {
    right: MENU_CLASSES.dropdownRight,
    center: MENU_CLASSES.dropdownCenter,
    top: MENU_CLASSES.dropdownTop,
    left: ""
  }[position] || "";
  return [MENU_CLASSES.dropdown, positionClass].filter(Boolean).join(" ");
}
function buildMenuClasses(position, className, unstyled) {
  if (unstyled) {
    return [MENU_CLASSES.container, "w3f-menu--unstyled", className].filter(Boolean).join(" ");
  }
  return [MENU_CLASSES.container, className].filter(Boolean).join(" ");
}

// src/SURFACES/Menu/Menu.hooks.ts
import { useState as useState34, useCallback as useCallback22, useRef as useRef16, useEffect as useEffect17 } from "react";
function useMenuOpen() {
  const [isOpen, setIsOpen] = useState34(false);
  const containerRef = useRef16(null);
  const toggle = useCallback22(() => setIsOpen((prev) => !prev), []);
  const close = useCallback22(() => setIsOpen(false), []);
  useEffect17(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, close]);
  return { isOpen, toggle, close, containerRef };
}
function useMenuItemSubmenu() {
  const [showSubmenu, setShowSubmenu] = useState34(false);
  const timeoutRef = useRef16(null);
  const handleMouseEnter = useCallback22(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowSubmenu(true);
  }, []);
  const handleMouseLeave = useCallback22(() => {
    timeoutRef.current = setTimeout(() => setShowSubmenu(false), SUBMENU_CLOSE_DELAY2);
  }, []);
  return { showSubmenu, setShowSubmenu, handleMouseEnter, handleMouseLeave };
}

// src/SURFACES/Menu/Menu.tsx
import { jsx as jsx42, jsxs as jsxs31 } from "react/jsx-runtime";
var MenuItem = ({ item, onClose, onSelect }) => {
  const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
  const { showSubmenu, setShowSubmenu, handleMouseEnter, handleMouseLeave } = useMenuItemSubmenu();
  const handleClick = (e) => {
    e.stopPropagation();
    if (hasSubItems) {
      setShowSubmenu((prev) => !prev);
    } else {
      if (onSelect) onSelect(item.label);
      if (item.onClick) item.onClick(item.label);
      onClose();
    }
  };
  return /* @__PURE__ */ jsxs31(
    "div",
    {
      className: [MENU_CLASSES.item, showSubmenu && MENU_CLASSES.isActive].filter(Boolean).join(" "),
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      style: { position: "relative" },
      children: [
        /* @__PURE__ */ jsxs31(
          Button_default,
          {
            className: [
              MENU_CLASSES.button,
              hasSubItems ? MENU_CLASSES.buttonParent : MENU_CLASSES.buttonLeaf
            ].filter(Boolean).join(" "),
            onClick: handleClick,
            variant: "none",
            children: [
              /* @__PURE__ */ jsx42("span", { className: MENU_CLASSES.label, children: item.label }),
              hasSubItems && /* @__PURE__ */ jsx42("span", { className: MENU_CLASSES.arrow, children: "\u25B8" })
            ]
          }
        ),
        hasSubItems && showSubmenu && /* @__PURE__ */ jsx42(
          "div",
          {
            className: MENU_CLASSES.submenu,
            style: {
              display: "block",
              position: "absolute",
              left: "100%",
              top: 0,
              overflow: "visible"
            },
            children: item.subItems.map((subItem, index) => /* @__PURE__ */ jsx42(
              MenuItem,
              {
                item: subItem,
                onClose,
                onSelect
              },
              subItem.id ?? index
            ))
          }
        )
      ]
    }
  );
};
MenuItem.displayName = "MenuItem";
var MenuBarCategory = forwardRef34(({
  label,
  items,
  onSelect,
  position = MENU_BAR_CATEGORY_DEFAULTS.position,
  unstyled = MENU_BAR_CATEGORY_DEFAULTS.unstyled
}, ref) => {
  const { isOpen, toggle, close, containerRef } = useMenuOpen();
  const dropdownCls = buildDropdownClasses(position);
  const containerCls = buildMenuClasses(position, void 0, unstyled);
  const [anchorRect, setAnchorRect] = useState35(null);
  useEffect18(() => {
    if (isOpen && containerRef.current) {
      setAnchorRect(containerRef.current.getBoundingClientRect());
    }
  }, [isOpen, containerRef]);
  const DROPDOWN_MIN_WIDTH = 200;
  const dropdownStyle = isOpen && anchorRect ? {
    display: "block",
    overflow: "visible",
    position: "fixed",
    top: position === "top" ? anchorRect.top - 4 : anchorRect.bottom + 4,
    left: position === "right" ? Math.max(0, anchorRect.right - DROPDOWN_MIN_WIDTH) : position === "center" ? anchorRect.left + anchorRect.width / 2 : anchorRect.left,
    transform: position === "center" ? "translateX(-50%)" : void 0
  } : { display: "block", overflow: "visible" };
  return /* @__PURE__ */ jsxs31("div", { className: containerCls, ref: (node) => {
    containerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  }, children: [
    /* @__PURE__ */ jsx42(
      Button_default,
      {
        className: [MENU_CLASSES.trigger, isOpen && MENU_CLASSES.isActive].filter(Boolean).join(" "),
        onClick: toggle,
        variant: "none",
        children: label
      }
    ),
    isOpen && /* @__PURE__ */ jsx42("div", { className: dropdownCls, style: dropdownStyle, children: items.map((item, index) => /* @__PURE__ */ jsx42(
      MenuItem,
      {
        item,
        onClose: close,
        onSelect
      },
      item.id ?? index
    )) })
  ] });
});
MenuBarCategory.displayName = "MenuBarCategory";
var Menu_default = MenuBarCategory;

// src/SURFACES/Paper/Paper.tsx
import { forwardRef as forwardRef35 } from "react";

// src/SURFACES/Paper/Paper.constants.ts
var PAPER_DEFAULTS = {
  variant: "default",
  gridColor: "default",
  size: "md",
  fullWidth: false,
  debug: false,
  className: "",
  unstyled: false
};
var PAPER_CLASSES = {
  base: "w3f-paper",
  fullWidth: "w3f-paper--full-width",
  debug: "w3f-paper--debug"
};

// src/SURFACES/Paper/Paper.utils.ts
function buildPaperClasses(variant, gridColor, size, fullWidth, debug, className, unstyled) {
  if (unstyled) {
    return [PAPER_CLASSES.base, "w3f-paper--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    PAPER_CLASSES.base,
    variant !== "default" && `w3f-paper--${variant}`,
    gridColor !== "default" && `w3f-paper--grid-${gridColor}`,
    size !== "md" && `w3f-paper--${size}`,
    fullWidth && PAPER_CLASSES.fullWidth,
    debug && PAPER_CLASSES.debug,
    className
  ].filter(Boolean).join(" ");
}
function buildPaperStyle(widthUnits, heightUnits, style) {
  return {
    ...style,
    ...widthUnits ? { width: `calc(var(--w3f-paper-grid-size) * ${widthUnits})`, maxWidth: "none" } : {},
    ...heightUnits ? { height: `calc(var(--w3f-paper-grid-size) * ${heightUnits})` } : {}
  };
}

// src/SURFACES/Paper/Paper.tsx
import { jsx as jsx43 } from "react/jsx-runtime";
var Paper = forwardRef35(({
  children,
  className = PAPER_DEFAULTS.className,
  variant = PAPER_DEFAULTS.variant,
  gridColor = PAPER_DEFAULTS.gridColor,
  size = PAPER_DEFAULTS.size,
  fullWidth = PAPER_DEFAULTS.fullWidth,
  debug = PAPER_DEFAULTS.debug,
  unstyled = PAPER_DEFAULTS.unstyled,
  widthUnits,
  heightUnits,
  style = {}
}, ref) => {
  const cls = buildPaperClasses(variant, gridColor, size, fullWidth, debug, className, unstyled);
  const computedStyle = buildPaperStyle(widthUnits, heightUnits, style);
  return /* @__PURE__ */ jsx43("div", { ref, className: cls, style: computedStyle, children });
});
Paper.displayName = "Paper";
var Paper_default = Paper;

// src/SURFACES/PaperDesign/PaperDesign.constants.ts
var PAPER_DESIGN_DEFAULTS = {
  columns: 1,
  gap: "md",
  unstyled: false
};
var GAP_MAP = {
  none: "0",
  xs: "var(--w3f-space-1)",
  sm: "var(--w3f-space-2)",
  md: "var(--w3f-space-4)",
  lg: "var(--w3f-space-6)",
  xl: "var(--w3f-space-8)"
};
var PAPER_DESIGN_CLASSES = {
  grid: "w3f-paper-design-grid"
};

// src/SURFACES/PaperDesign/PaperDesign.utils.ts
function resolveGap(gap) {
  if (!gap) return void 0;
  return GAP_MAP[gap];
}
function buildGridStyle2(columns, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gap, rowGap, columnGap, justifyContent, alignContent, justifyItems, alignItems, gridStyle) {
  const raw = {
    display: "grid",
    gridTemplateColumns: gridTemplateColumns ?? (columns > 1 ? `repeat(${columns}, minmax(0, 1fr))` : void 0),
    gridTemplateRows,
    gridTemplateAreas: gridTemplateAreas ? gridTemplateAreas.trim().split("\n").map((row) => `"${row.trim()}"`).join(" ") : void 0,
    gap: resolveGap(gap),
    rowGap: resolveGap(rowGap),
    columnGap: resolveGap(columnGap),
    justifyContent,
    alignContent,
    justifyItems,
    alignItems,
    ...gridStyle
  };
  Object.keys(raw).forEach((key) => {
    if (raw[key] === void 0) delete raw[key];
  });
  return raw;
}
function buildPaperDesignClasses(className, unstyled) {
  const base = PAPER_DESIGN_CLASSES.grid;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, className].filter(Boolean).join(" ");
}

// src/SURFACES/PaperDesign/PaperDesign.tsx
import { jsx as jsx44 } from "react/jsx-runtime";
var PaperDesign = ({
  children,
  className,
  variant,
  gridColor,
  size,
  fullWidth,
  debug,
  widthUnits,
  heightUnits,
  style,
  // Grid
  columns = PAPER_DESIGN_DEFAULTS.columns,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gap = PAPER_DESIGN_DEFAULTS.gap,
  rowGap,
  columnGap,
  justifyContent,
  alignContent,
  justifyItems,
  alignItems,
  gridStyle,
  unstyled = PAPER_DESIGN_DEFAULTS.unstyled
}) => {
  const computedGridStyle = buildGridStyle2(
    columns,
    gridTemplateColumns,
    gridTemplateRows,
    gridTemplateAreas,
    gap,
    rowGap,
    columnGap,
    justifyContent,
    alignContent,
    justifyItems,
    alignItems,
    gridStyle
  );
  return /* @__PURE__ */ jsx44(
    Paper_default,
    {
      className,
      variant,
      gridColor,
      size,
      fullWidth,
      debug,
      widthUnits,
      heightUnits,
      style,
      children: /* @__PURE__ */ jsx44("div", { className: buildPaperDesignClasses(void 0, unstyled), style: computedGridStyle, children })
    }
  );
};
PaperDesign.displayName = "PaperDesign";

// src/SURFACES/PopUp/PopUp.tsx
import { forwardRef as forwardRef37 } from "react";
import { createPortal } from "react-dom";

// src/DATADISPLAY/Card/Card.tsx
import React40, { forwardRef as forwardRef36 } from "react";

// src/DATADISPLAY/Card/Card.constants.ts
var CARD_DEFAULTS = {
  imageAlt: "",
  imagePosition: "top",
  buttons: [],
  variant: "default",
  hoverable: false,
  clickable: false,
  className: "",
  headerClassName: "",
  contentClassName: "",
  actionsClassName: "",
  fullWidth: false,
  size: "md",
  actionsAlign: "start",
  unstyled: false
};

// src/DATADISPLAY/Card/Card.utils.ts
function buildCardClasses(variant, size, imagePosition, hoverable, clickable, onClick, fullWidth, layoutMode, className, unstyled) {
  if (unstyled) {
    return [
      "w3f-card",
      "w3f-card--unstyled",
      imagePosition === "left" || imagePosition === "right" ? "w3f-card--horizontal" : "",
      fullWidth ? "w3f-card--full-width" : "",
      layoutMode ? "w3f-card--layout" : "",
      className
    ].filter(Boolean).join(" ");
  }
  return [
    "w3f-card",
    `w3f-card--${variant}`,
    `w3f-card--${size}`,
    imagePosition === "left" || imagePosition === "right" ? "w3f-card--horizontal" : "",
    hoverable ? "w3f-card--hoverable" : "",
    clickable || onClick ? "w3f-card--clickable" : "",
    fullWidth ? "w3f-card--full-width" : "",
    layoutMode ? "w3f-card--layout" : "",
    className
  ].filter(Boolean).join(" ");
}
function buildHeaderClasses(headerClassName) {
  return ["w3f-card-header", headerClassName].filter(Boolean).join(" ");
}
function buildContentClasses2(contentClassName) {
  return ["w3f-card-content", contentClassName].filter(Boolean).join(" ");
}
function buildActionsClasses2(actionsAlign, actionsClassName) {
  return [
    "w3f-card-actions",
    `w3f-card-actions--${actionsAlign}`,
    actionsClassName
  ].filter(Boolean).join(" ");
}

// src/DATADISPLAY/Badge/Badge.tsx
import React39 from "react";

// src/DATADISPLAY/Badge/Badge.constants.ts
var BADGE_COLORS = {
  primary: "w3f-bg-primary",
  secondary: "w3f-bg-secondary",
  success: "w3f-bg-success",
  warning: "w3f-bg-warning",
  danger: "w3f-bg-danger",
  info: "w3f-bg-info",
  gray: "w3f-bg-gray"
};
var BADGE_POSITIONS = {
  "top-right": "badge-top-right",
  "top-left": "badge-top-left",
  "top-center": "badge-top-center",
  "bottom-right": "badge-bottom-right",
  "bottom-left": "badge-bottom-left",
  "bottom-center": "badge-bottom-center",
  "middle-right": "badge-middle-right",
  "middle-left": "badge-middle-left"
};
var BADGE_SIZES = {
  sm: "w3f-badge-sm",
  md: "w3f-badge-md",
  lg: "w3f-badge-lg"
};
var BADGE_VARIANTS = {
  solid: "",
  outline: "w3f-badge-outline",
  soft: "w3f-badge-soft",
  dot: "w3f-badge-dot"
};
var BADGE_DEFAULTS = {
  color: "primary",
  size: "md",
  variant: "solid",
  position: null,
  max: 99,
  pulse: false,
  animate: false,
  invisible: false,
  ariaLabel: "",
  className: "",
  unstyled: false
};

// src/DATADISPLAY/Badge/Badge.utils.ts
function buildBadgeClasses(color, size, variant, position, pulse, animate, className, unstyled) {
  if (unstyled) {
    return [
      "w3f-badge",
      "w3f-badge--unstyled",
      position ? BADGE_POSITIONS[position] : "",
      className
    ].filter(Boolean).join(" ");
  }
  return [
    "w3f-badge",
    BADGE_COLORS[color] || BADGE_COLORS.primary,
    BADGE_SIZES[size] || BADGE_SIZES.md,
    BADGE_VARIANTS[variant] || "",
    position ? BADGE_POSITIONS[position] : "",
    pulse ? "w3f-badge-pulse" : "",
    animate ? "w3f-badge-animate" : "",
    className
  ].filter(Boolean).join(" ");
}
function processContent(children, max, variant) {
  if (variant === "dot") return null;
  if (typeof children === "number" && children > max) return `${max}+`;
  return children;
}
function getAriaLabel(ariaLabel, variant, children, processedContent) {
  if (ariaLabel) return ariaLabel;
  if (variant === "dot") return "Notification indicator";
  if (typeof children === "number") return `${processedContent} notifications`;
  return void 0;
}

// src/DATADISPLAY/Badge/Badge.hooks.ts
import { useMemo as useMemo9 } from "react";
function useBadgeContent(children, max, variant, ariaLabel) {
  const processed = useMemo9(
    () => processContent(children, max, variant),
    [children, max, variant]
  );
  const effectiveAriaLabel = useMemo9(
    () => getAriaLabel(ariaLabel, variant, children, processed),
    [ariaLabel, variant, children, processed]
  );
  return { processed, effectiveAriaLabel };
}

// src/DATADISPLAY/Badge/Badge.tsx
import { useBridgeBind as useBridgeBind16 } from "@w3f/bridge";
import { jsx as jsx45 } from "react/jsx-runtime";
var Badge = React39.forwardRef(
  ({
    children,
    color = BADGE_DEFAULTS.color,
    position = BADGE_DEFAULTS.position,
    size = BADGE_DEFAULTS.size,
    variant = BADGE_DEFAULTS.variant,
    className = BADGE_DEFAULTS.className,
    invisible = BADGE_DEFAULTS.invisible,
    ariaLabel = BADGE_DEFAULTS.ariaLabel,
    max = BADGE_DEFAULTS.max,
    pulse = BADGE_DEFAULTS.pulse,
    animate = BADGE_DEFAULTS.animate,
    unstyled = BADGE_DEFAULTS.unstyled,
    bindId,
    ...rest
  }, ref) => {
    useBridgeBind16({ bindId });
    if (invisible) return null;
    const { processed, effectiveAriaLabel } = useBadgeContent(children, max, variant, ariaLabel);
    const badgeClasses = React39.useMemo(
      () => buildBadgeClasses(color, size, variant, position, pulse, animate, className, unstyled),
      [color, size, variant, position, pulse, animate, className, unstyled]
    );
    return /* @__PURE__ */ jsx45(
      "span",
      {
        ref,
        className: badgeClasses,
        role: "status",
        "aria-label": effectiveAriaLabel,
        ...rest,
        children: processed
      }
    );
  }
);
Badge.displayName = "Badge";
var Badge_default = Badge;

// src/DATADISPLAY/Card/Card.tsx
import { useBridgeBind as useBridgeBind17 } from "@w3f/bridge";
import { jsx as jsx46, jsxs as jsxs32 } from "react/jsx-runtime";
var Card = forwardRef36(({
  imageSrc,
  imageAlt = CARD_DEFAULTS.imageAlt,
  imagePosition = CARD_DEFAULTS.imagePosition,
  title,
  subtitle,
  content,
  actions,
  buttons = CARD_DEFAULTS.buttons,
  variant = CARD_DEFAULTS.variant,
  hoverable = CARD_DEFAULTS.hoverable,
  clickable = CARD_DEFAULTS.clickable,
  onClick,
  className = CARD_DEFAULTS.className,
  headerClassName = CARD_DEFAULTS.headerClassName,
  contentClassName = CARD_DEFAULTS.contentClassName,
  actionsClassName = CARD_DEFAULTS.actionsClassName,
  style,
  fullWidth = CARD_DEFAULTS.fullWidth,
  badge,
  size = CARD_DEFAULTS.size,
  actionsAlign = CARD_DEFAULTS.actionsAlign,
  layoutStyle,
  actionAreaContent,
  customContent,
  headerExtra,
  unstyled = CARD_DEFAULTS.unstyled,
  bindId
}, ref) => {
  const { dispatch } = useBridgeBind17({ bindId });
  const layoutMode = !!layoutStyle;
  const cardClasses = buildCardClasses(variant, size, imagePosition, hoverable, clickable, !!onClick, fullWidth, layoutMode, className, unstyled);
  const mergedStyle = layoutStyle ? { ...layoutStyle, ...style } : style;
  const headerClasses = buildHeaderClasses(headerClassName);
  const contentClasses = buildContentClasses2(contentClassName);
  const actionsClasses = buildActionsClasses2(actionsAlign, actionsClassName);
  const handleClick = (e) => {
    const target = e.target;
    const isInteractiveElement = target.closest("button, a, input, textarea, select");
    if (onClick && !isInteractiveElement) {
      onClick(e);
      dispatch("click");
    }
  };
  const handleKeyDown = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(e);
    }
  };
  const interactiveProps = clickable || onClick ? {
    role: "button",
    tabIndex: 0,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    "aria-pressed": false
  } : {};
  const renderImage = () => {
    if (!imageSrc) return null;
    return /* @__PURE__ */ jsx46(
      "img",
      {
        src: sanitizeUrl(imageSrc),
        alt: imageAlt,
        className: "w3f-card-image",
        loading: "lazy"
      }
    );
  };
  const renderHeader = () => {
    if (!title && !subtitle && !headerExtra) return null;
    return /* @__PURE__ */ jsxs32("header", { className: headerClasses, children: [
      title && /* @__PURE__ */ jsx46("h3", { className: "w3f-card-title", children: title }),
      subtitle && /* @__PURE__ */ jsx46("p", { className: "w3f-card-subtitle", children: subtitle }),
      headerExtra && /* @__PURE__ */ jsx46("div", { className: "w3f-card-header-extra", children: headerExtra })
    ] });
  };
  const renderContent = () => {
    if (!content) return null;
    return /* @__PURE__ */ jsx46("div", { className: contentClasses, children: content });
  };
  const renderActions = () => {
    if (!actions && (!buttons || buttons.length === 0)) return null;
    return /* @__PURE__ */ jsxs32("div", { className: actionsClasses, children: [
      actions && actions,
      !actions && buttons.length > 0 && buttons.map((buttonProps, index) => {
        const { key, ...restButtonProps } = buttonProps;
        return /* @__PURE__ */ jsx46(
          Button_default,
          {
            ...restButtonProps
          },
          key || `card-button-${index}`
        );
      })
    ] });
  };
  const renderActionArea = () => {
    if (!actionAreaContent) return null;
    return /* @__PURE__ */ jsx46("div", { className: "w3f-card-action-area", children: actionAreaContent });
  };
  const renderCustom = () => {
    if (!customContent) return null;
    return /* @__PURE__ */ jsx46("div", { className: "w3f-card-custom", children: customContent });
  };
  const renderBadge = () => {
    if (!badge) return null;
    if (typeof badge === "object" && !React40.isValidElement(badge)) {
      const {
        children: badgeChildren,
        content: badgeContent,
        ...badgeRestProps
      } = badge;
      const finalContent = badgeChildren !== void 0 ? badgeChildren : badgeContent;
      return /* @__PURE__ */ jsx46("div", { className: "w3f-card-badge", children: /* @__PURE__ */ jsx46(Badge_default, { ...badgeRestProps, children: finalContent }) });
    }
    if (React40.isValidElement(badge)) {
      return /* @__PURE__ */ jsx46("div", { className: "w3f-card-badge", children: badge });
    }
    return /* @__PURE__ */ jsx46("div", { className: "w3f-card-badge", children: /* @__PURE__ */ jsx46(Badge_default, { color: "primary", size: "md", children: badge }) });
  };
  if (layoutMode) {
    return /* @__PURE__ */ jsxs32("div", { ref, className: cardClasses, style: mergedStyle, ...interactiveProps, children: [
      renderBadge(),
      renderImage(),
      renderHeader(),
      renderContent(),
      renderActions(),
      renderActionArea(),
      renderCustom()
    ] });
  }
  if (imagePosition === "left" || imagePosition === "right") {
    return /* @__PURE__ */ jsxs32("div", { ref, className: cardClasses, style: mergedStyle, ...interactiveProps, children: [
      renderBadge(),
      imagePosition === "left" && renderImage(),
      /* @__PURE__ */ jsxs32("div", { className: "w3f-card-body", children: [
        renderHeader(),
        renderContent(),
        renderActions(),
        renderActionArea(),
        renderCustom()
      ] }),
      imagePosition === "right" && renderImage()
    ] });
  }
  return /* @__PURE__ */ jsxs32("div", { ref, className: cardClasses, style: mergedStyle, ...interactiveProps, children: [
    renderBadge(),
    imagePosition === "top" && renderImage(),
    renderHeader(),
    renderContent(),
    imagePosition === "bottom" && renderImage(),
    renderActions(),
    renderActionArea(),
    renderCustom()
  ] });
});
Card.displayName = "Card";
var Card_default = Card;

// src/SURFACES/PopUp/PopUp.constants.ts
var POPUP_DEFAULTS = {
  confirmText: "Aceptar",
  cancelText: "Cancelar",
  showCancel: true,
  variant: "elevated",
  size: "md",
  closeOnOverlayClick: true,
  unstyled: false,
  className: ""
};
var POPUP_CLASSES = {
  overlay: "w3f-popup-overlay",
  overlayOpen: "is-open",
  container: "w3f-popup-container",
  card: "w3f-popup-card",
  closeBtn: "w3f-popup-close-btn"
};

// src/SURFACES/PopUp/PopUp.hooks.ts
import { useEffect as useEffect19, useCallback as useCallback23 } from "react";
function usePopUpKeyboard(isOpen, onClose) {
  const handleKeyDown = useCallback23(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  useEffect19(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);
}

// src/SURFACES/PopUp/PopUp.utils.ts
function buildPopUpOverlayClasses(isOpen) {
  return [POPUP_CLASSES.overlay, isOpen && POPUP_CLASSES.overlayOpen].filter(Boolean).join(" ");
}
function buildPopUpContainerClasses(className, size, unstyled) {
  const base = POPUP_CLASSES.container;
  const sizeClass = `${base}--${size}`;
  if (unstyled) return [base, sizeClass, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, sizeClass, className].filter(Boolean).join(" ");
}

// src/SURFACES/PopUp/PopUp.tsx
import { Fragment as Fragment7, jsx as jsx47, jsxs as jsxs33 } from "react/jsx-runtime";
var PopUp = forwardRef37(({
  isOpen,
  onClose,
  title,
  subtitle,
  content,
  onConfirm,
  confirmText = POPUP_DEFAULTS.confirmText,
  cancelText = POPUP_DEFAULTS.cancelText,
  showCancel = POPUP_DEFAULTS.showCancel,
  variant = POPUP_DEFAULTS.variant,
  size = POPUP_DEFAULTS.size,
  closeOnOverlayClick = POPUP_DEFAULTS.closeOnOverlayClick,
  children,
  unstyled = POPUP_DEFAULTS.unstyled,
  className = POPUP_DEFAULTS.className,
  footerActions
}, ref) => {
  usePopUpKeyboard(isOpen, onClose);
  if (!isOpen) return null;
  const defaultActions = /* @__PURE__ */ jsxs33(Fragment7, { children: [
    showCancel && /* @__PURE__ */ jsx47(Button_default, { variant: "text", color: "gray", onClick: onClose, children: cancelText }),
    /* @__PURE__ */ jsx47(Button_default, { variant: "raised", color: "primary", onClick: onConfirm ?? onClose, children: confirmText })
  ] });
  const popUpContent = /* @__PURE__ */ jsx47(
    "div",
    {
      ref,
      className: buildPopUpOverlayClasses(isOpen),
      onClick: closeOnOverlayClick ? onClose : void 0,
      children: /* @__PURE__ */ jsxs33(
        "div",
        {
          className: buildPopUpContainerClasses(className, size, unstyled),
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsx47(
              Card_default,
              {
                title,
                subtitle,
                variant,
                size,
                fullWidth: true,
                content: content ?? children,
                actions: footerActions ?? defaultActions,
                actionsAlign: "end",
                className: POPUP_CLASSES.card
              }
            ),
            /* @__PURE__ */ jsx47(
              "button",
              {
                className: POPUP_CLASSES.closeBtn,
                onClick: onClose,
                "aria-label": "Close",
                children: "\xD7"
              }
            )
          ]
        }
      )
    }
  );
  return createPortal(popUpContent, document.body);
});
PopUp.displayName = "PopUp";

// src/SURFACES/Section/Section.tsx
import { forwardRef as forwardRef38 } from "react";

// src/SURFACES/Section/Section.constants.ts
var SECTION_DEFAULTS = {
  card: true,
  unstyled: false,
  className: ""
};
var SECTION_CLASSES = {
  header: "w3f-panel-header",
  title: "w3f-panel-title",
  body: "w3f-panel-body",
  description: "w3f-text-gray-600 w3f-text-sm w3f-mb-6",
  content: "w3f-flex w3f-flex-col w3f-gap-4",
  marginBottom: "w3f-mb-8"
};

// src/SURFACES/Section/Section.utils.ts
function buildSectionPanelClassName(className, unstyled) {
  const base = SECTION_CLASSES.marginBottom;
  if (unstyled) return [`${base}--unstyled`, className].filter(Boolean).join(" ");
  return `${base} ${className}`.trim();
}

// src/SURFACES/Section/Section.tsx
import { jsx as jsx48, jsxs as jsxs34 } from "react/jsx-runtime";
var Section = forwardRef38(({
  title,
  description,
  children,
  unstyled = SECTION_DEFAULTS.unstyled,
  className = SECTION_DEFAULTS.className,
  card = SECTION_DEFAULTS.card,
  round,
  color,
  border,
  ...rest
}, ref) => {
  const panelClassName = buildSectionPanelClassName(className, unstyled);
  return /* @__PURE__ */ jsxs34(
    Panel,
    {
      ref,
      card,
      round,
      color,
      border,
      className: panelClassName,
      padding: false,
      ...rest,
      children: [
        /* @__PURE__ */ jsx48("div", { className: SECTION_CLASSES.header, children: /* @__PURE__ */ jsx48("h3", { className: SECTION_CLASSES.title, children: title }) }),
        /* @__PURE__ */ jsxs34("div", { className: SECTION_CLASSES.body, children: [
          description && /* @__PURE__ */ jsx48("p", { className: SECTION_CLASSES.description, children: description }),
          /* @__PURE__ */ jsx48("div", { className: SECTION_CLASSES.content, children })
        ] })
      ]
    }
  );
});
Section.displayName = "Section";

// src/SURFACES/Sidenav/Sidenav.tsx
import { forwardRef as forwardRef39 } from "react";

// src/DATADISPLAY/TreeRefactorized/Tree.constants.tsx
import { jsx as jsx49 } from "react/jsx-runtime";
var folderClosedSvg = /* @__PURE__ */ jsx49("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 -960 960 960", width: "24px", fill: "#5f6368", children: /* @__PURE__ */ jsx49("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z" }) });
var folderOpenSvg = /* @__PURE__ */ jsx49("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 -960 960 960", width: "24px", fill: "#5f6368", children: /* @__PURE__ */ jsx49("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z" }) });
var fileSvg = /* @__PURE__ */ jsx49("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 -960 960 960", width: "24px", fill: "#5f6368", children: /* @__PURE__ */ jsx49("path", { d: "M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" }) });
var fileCodeSvg = /* @__PURE__ */ jsx49("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 -960 960 960", width: "24px", fill: "#5f6368", children: /* @__PURE__ */ jsx49("path", { d: "M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" }) });
var toggleCollapsedSvg = /* @__PURE__ */ jsx49("svg", { xmlns: "http://www.w3.org/2000/svg", height: "16px", viewBox: "0 -960 960 960", width: "16px", fill: "#5f6368", children: /* @__PURE__ */ jsx49("path", { d: "m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" }) });
var toggleExpandedSvg = /* @__PURE__ */ jsx49("svg", { xmlns: "http://www.w3.org/2000/svg", height: "16px", viewBox: "0 -960 960 960", width: "16px", fill: "#5f6368", children: /* @__PURE__ */ jsx49("path", { d: "M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" }) });
var TREE_DEFAULTS = {
  unstyled: false,
  className: ""
};
var TreeIconMap = {
  folderClosed: folderClosedSvg,
  folderOpen: folderOpenSvg,
  file: fileSvg,
  fileCode: fileCodeSvg
};
var ToggleIcons = {
  collapsed: toggleCollapsedSvg,
  expanded: toggleExpandedSvg
};

// src/DATADISPLAY/TreeRefactorized/TreeContext.tsx
import { createContext as createContext5, useContext as useContext22, useState as useState36, useCallback as useCallback24, useMemo as useMemo10 } from "react";

// src/DATADISPLAY/TreeRefactorized/Tree.utils.ts
var buildTreeClasses = (unstyled, className) => {
  const base = "w3f-tree";
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, "w3f-border w3f-border-gray-300 w3f-rounded w3f-p-2", className].filter(Boolean).join(" ");
};
var hasChildren = (node) => !!(node.children && Array.isArray(node.children) && node.children.length > 0);
var countNodes = (nodes) => {
  let count = nodes.length;
  nodes.forEach((node) => {
    if (hasChildren(node)) {
      count += countNodes(node.children);
    }
  });
  return count;
};
var collectAllExpandableNodeIds = (nodes) => {
  const ids = /* @__PURE__ */ new Set();
  const stack = [...nodes];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node.id && hasChildren(node)) {
      ids.add(node.id);
    }
    if (hasChildren(node)) {
      stack.push(...node.children);
    }
  }
  return ids;
};

// src/DATADISPLAY/TreeRefactorized/TreeContext.tsx
import { jsx as jsx50 } from "react/jsx-runtime";
var TreeContext = createContext5(void 0);
var useTreeContext = () => {
  const context = useContext22(TreeContext);
  if (!context) {
    throw new Error("useTreeContext debe ser usado dentro de un TreeProvider");
  }
  return context;
};
var TreeProvider = ({ children, data, onNodeSelect }) => {
  const [expandedNodes, setExpandedNodes] = useState36(/* @__PURE__ */ new Set());
  const isValid = useMemo10(() => data && Array.isArray(data) && data.length > 0, [data]);
  const totalNodes = useMemo10(() => isValid ? countNodes(data) : 0, [isValid, data]);
  const allExpandableNodeIds = useMemo10(
    () => isValid ? collectAllExpandableNodeIds(data) : /* @__PURE__ */ new Set(),
    [isValid, data]
  );
  const isExpanded = useMemo10(() => {
    if (!isValid || allExpandableNodeIds.size === 0) return false;
    return expandedNodes.size === allExpandableNodeIds.size;
  }, [expandedNodes, allExpandableNodeIds, isValid]);
  const toggleNode = useCallback24((nodeId) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);
  const expandAll = useCallback24(() => {
    setExpandedNodes(allExpandableNodeIds);
  }, [allExpandableNodeIds]);
  const collapseAll = useCallback24(() => {
    setExpandedNodes(/* @__PURE__ */ new Set());
  }, []);
  const handleToggleAll = useCallback24(() => {
    if (isExpanded) {
      collapseAll();
    } else {
      expandAll();
    }
  }, [isExpanded, collapseAll, expandAll]);
  const handleNodeClick = useCallback24((node) => {
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  }, [onNodeSelect]);
  const value = {
    data,
    expandedNodes,
    toggleNode,
    handleToggleAll,
    handleNodeClick,
    isExpanded,
    totalNodes,
    isValid
  };
  return /* @__PURE__ */ jsx50(TreeContext.Provider, { value, children });
};
TreeProvider.displayName = "TreeProvider";

// src/DATADISPLAY/TreeRefactorized/TreeControls.tsx
import { jsx as jsx51, jsxs as jsxs35 } from "react/jsx-runtime";
var ExpandAllIcon = (props) => /* @__PURE__ */ jsx51("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 -960 960 960", width: "24px", fill: "currentColor", children: /* @__PURE__ */ jsx51("path", { d: "M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" }) });
var CollapseAllIcon = (props) => /* @__PURE__ */ jsx51("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 -960 960 960", width: "24px", fill: "currentColor", children: /* @__PURE__ */ jsx51("path", { d: "M200-440v-80h560v80H200Z" }) });
var TreeControls = () => {
  const { handleToggleAll, isExpanded, totalNodes } = useTreeContext();
  const buttonClasses = "w3f-tree-simple-btn w3f-text-primary";
  return /* @__PURE__ */ jsxs35("div", { className: "w3f-tree-controls w3f-flex w3f-items-center w3f-mb-2", children: [
    /* @__PURE__ */ jsx51(
      "button",
      {
        className: buttonClasses,
        onClick: handleToggleAll,
        title: isExpanded ? "Colapsar todo" : "Expandir todo",
        children: isExpanded ? /* @__PURE__ */ jsx51(CollapseAllIcon, { className: "w3f-tree-simple-btn-icon" }) : /* @__PURE__ */ jsx51(ExpandAllIcon, { className: "w3f-tree-simple-btn-icon" })
      }
    ),
    totalNodes > 0 && /* @__PURE__ */ jsx51("span", { className: "w3f-text-gray-600 w3f-ml-2", children: /* @__PURE__ */ jsxs35("span", { className: "w3f-text-sm", children: [
      "(",
      totalNodes,
      " nodos)"
    ] }) })
  ] });
};
TreeControls.displayName = "TreeControls";

// src/DATADISPLAY/TreeRefactorized/TreeNode.tsx
import React44, { useCallback as useCallback25 } from "react";
import { jsx as jsx52, jsxs as jsxs36 } from "react/jsx-runtime";
var TreeNode = React44.memo(({ node, isChild = false }) => {
  const { expandedNodes, toggleNode, handleNodeClick } = useTreeContext();
  const isExpanded = expandedNodes.has(node.id);
  const nodeHasChildren = hasChildren(node);
  const iconKey = nodeHasChildren ? isExpanded ? "folderOpen" : "folderClosed" : node.iconId === "fileCode" ? "fileCode" : "file";
  const nodeIconSvg = TreeIconMap[iconKey] || TreeIconMap.file;
  const onNodeClick = useCallback25(() => {
    handleNodeClick(node);
    if (nodeHasChildren) {
      toggleNode(node.id);
    }
  }, [node, handleNodeClick, nodeHasChildren, toggleNode]);
  const itemClasses = "w3f-tree-item";
  let nodeClasses = "w3f-tree-node w3f-flex w3f-items-center w3f-p-1 w3f-rounded w3f-cursor-pointer";
  if (isChild) nodeClasses += " w3f-pl-4";
  const toggleClasses = `w3f-tree-toggle w3f-mr-1 ${isExpanded ? "expanded" : ""}`;
  const submenuClasses = `w3f-tree-submenu w3f-pl-2 ${isExpanded ? "" : "w3f-hidden"}`;
  return /* @__PURE__ */ jsxs36("li", { className: itemClasses, children: [
    /* @__PURE__ */ jsxs36("div", { className: nodeClasses, onClick: onNodeClick, children: [
      /* @__PURE__ */ jsx52("span", { className: toggleClasses, children: nodeHasChildren && (isExpanded ? ToggleIcons.expanded : ToggleIcons.collapsed) }),
      /* @__PURE__ */ jsx52("span", { className: "w3f-tree-icon w3f-mr-1", children: nodeIconSvg }),
      /* @__PURE__ */ jsx52("span", { className: nodeHasChildren ? "w3f-text-gray-800 w3f-font-medium" : "w3f-text-gray-700", children: node.name })
    ] }),
    nodeHasChildren && /* @__PURE__ */ jsx52("ul", { className: submenuClasses, children: /* @__PURE__ */ jsx52("div", { className: "w3f-tree-submenu-inner", children: node.children.map((childNode) => /* @__PURE__ */ jsx52(
      TreeNode,
      {
        node: childNode,
        isChild: true
      },
      childNode.id || childNode.name
    )) }) })
  ] });
});
TreeNode.displayName = "TreeNode";

// src/DATADISPLAY/TreeRefactorized/Tree.tsx
import { jsx as jsx53, jsxs as jsxs37 } from "react/jsx-runtime";
var Tree = ({
  unstyled = TREE_DEFAULTS.unstyled,
  className = TREE_DEFAULTS.className
}) => {
  const { data, isValid } = useTreeContext();
  const alertClasses = "w3f-bg-warning-light w3f-text-warning p-3 w3f-rounded w3f-flex w3f-items-center w3f-gap-2";
  if (!isValid) {
    return /* @__PURE__ */ jsxs37("div", { className: alertClasses, children: [
      /* @__PURE__ */ jsx53("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 -960 960 960", width: "24px", fill: "currentColor", children: /* @__PURE__ */ jsx53("path", { d: "m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T440-320q-17 0-28.5 11.5T480-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" }) }),
      /* @__PURE__ */ jsx53("span", { children: "No hay datos para mostrar en el \xE1rbol" })
    ] });
  }
  const containerClasses = buildTreeClasses(unstyled, className);
  return /* @__PURE__ */ jsxs37("div", { className: containerClasses, children: [
    /* @__PURE__ */ jsx53(TreeControls, {}),
    /* @__PURE__ */ jsx53("div", { className: "w3f-tree-main", children: /* @__PURE__ */ jsx53("ul", { className: "w3f-tree-list", children: data.map((node) => /* @__PURE__ */ jsx53(
      TreeNode,
      {
        node
      },
      node.id || node.name
    )) }) })
  ] });
};
Tree.displayName = "Tree";

// src/SURFACES/Sidenav/Sidenav.constants.ts
var SIDENAV_DEFAULTS = {
  loading: false,
  error: null,
  variant: "default",
  unstyled: false,
  className: ""
};
var SIDENAV_CLASSES = {
  container: "w3f-sidenav-container",
  compact: "w3f-sidenav-compact",
  expanded: "w3f-sidenav-expanded",
  light: "w3f-sidenav-light",
  alert: "w3f-sidenav-alert",
  alertLoading: "w3f-sidenav-alert-loading",
  alertError: "w3f-sidenav-alert-error",
  alertIcon: "w3f-sidenav-alert-icon"
};

// src/SURFACES/Sidenav/Sidenav.utils.ts
function buildSidenavContainerClasses(variant, className, unstyled) {
  const base = SIDENAV_CLASSES.container;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    variant === "compact" && SIDENAV_CLASSES.compact,
    variant === "expanded" && SIDENAV_CLASSES.expanded,
    variant === "light" && SIDENAV_CLASSES.light,
    className
  ].filter(Boolean).join(" ");
}

// src/SURFACES/Sidenav/Sidenav.tsx
import { jsx as jsx54, jsxs as jsxs38 } from "react/jsx-runtime";
var LoadingIcon = () => /* @__PURE__ */ jsx54(
  "svg",
  {
    className: SIDENAV_CLASSES.alertIcon,
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 -960 960 960",
    width: "24px",
    fill: "currentColor",
    children: /* @__PURE__ */ jsx54("path", { d: "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" })
  }
);
var ErrorIcon = () => /* @__PURE__ */ jsx54(
  "svg",
  {
    className: SIDENAV_CLASSES.alertIcon,
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 -960 960 960",
    width: "24px",
    fill: "currentColor",
    children: /* @__PURE__ */ jsx54("path", { d: "M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" })
  }
);
var WarningIcon = () => /* @__PURE__ */ jsx54(
  "svg",
  {
    className: SIDENAV_CLASSES.alertIcon,
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 -960 960 960",
    width: "24px",
    fill: "currentColor",
    children: /* @__PURE__ */ jsx54("path", { d: "m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T400-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" })
  }
);
var Sidenav = forwardRef39(({
  treeData,
  loading = SIDENAV_DEFAULTS.loading,
  error = SIDENAV_DEFAULTS.error,
  onNodeSelect,
  variant = SIDENAV_DEFAULTS.variant,
  unstyled = SIDENAV_DEFAULTS.unstyled,
  className = SIDENAV_DEFAULTS.className
}, ref) => {
  const containerCls = buildSidenavContainerClasses(variant, className, unstyled);
  if (loading) {
    return /* @__PURE__ */ jsx54("div", { ref, className: containerCls, children: /* @__PURE__ */ jsxs38("div", { className: `${SIDENAV_CLASSES.alert} ${SIDENAV_CLASSES.alertLoading}`, children: [
      /* @__PURE__ */ jsx54(LoadingIcon, {}),
      /* @__PURE__ */ jsx54("span", { children: "Cargando navegaci\xF3n..." })
    ] }) });
  }
  if (error) {
    return /* @__PURE__ */ jsx54("div", { ref, className: containerCls, children: /* @__PURE__ */ jsxs38("div", { className: `${SIDENAV_CLASSES.alert} ${SIDENAV_CLASSES.alertError}`, children: [
      /* @__PURE__ */ jsx54(ErrorIcon, {}),
      /* @__PURE__ */ jsxs38("span", { children: [
        "Error: ",
        error
      ] })
    ] }) });
  }
  if (!treeData || !Array.isArray(treeData) || treeData.length === 0) {
    return /* @__PURE__ */ jsx54("div", { ref, className: containerCls, children: /* @__PURE__ */ jsxs38("div", { className: `${SIDENAV_CLASSES.alert} ${SIDENAV_CLASSES.alertError}`, children: [
      /* @__PURE__ */ jsx54(WarningIcon, {}),
      /* @__PURE__ */ jsx54("span", { children: "No hay datos para mostrar" })
    ] }) });
  }
  return /* @__PURE__ */ jsx54("div", { ref, className: containerCls, children: /* @__PURE__ */ jsx54(TreeProvider, { data: treeData, onNodeSelect, children: /* @__PURE__ */ jsx54(Tree, {}) }) });
});
Sidenav.displayName = "Sidenav";

// src/SURFACES/Tabs/Tabs.tsx
import { forwardRef as forwardRef40 } from "react";

// src/SURFACES/Tabs/Tabs.constants.ts
var TABS_DEFAULTS = {
  initialTabsContent: [],
  closable: false,
  title: "Pesta\xF1as",
  highlightActiveTab: false,
  vertical: false,
  variant: "default",
  colorScheme: "primary",
  unstyled: false
};
var TABS_CLASSES = {
  container: "w3f-tabs-container",
  titleEl: "w3f-tabs-title",
  empty: "w3f-tabs-empty",
  emptyIcon: "w3f-tabs-empty-icon",
  emptyText: "w3f-tabs-empty-text",
  layout: "w3f-tabs-layout",
  horizontal: "w3f-tabs-horizontal",
  vertical: "w3f-tabs-vertical",
  list: "w3f-tabs-list",
  item: "w3f-tabs-item",
  itemActive: "w3f-tabs-item-active",
  itemHighlight: "w3f-tabs-item-highlight",
  itemText: "w3f-tabs-item-text",
  closeBtn: "w3f-tabs-close-btn",
  closeIcon: "w3f-tabs-close-icon",
  content: "w3f-tabs-content",
  panel: "w3f-tabs-panel",
  panelTitle: "w3f-tabs-panel-title",
  panelText: "w3f-tabs-panel-text"
};
var TABS_CLOSE_BTN_STYLE = {
  minWidth: "auto",
  padding: "0.25rem",
  height: "auto",
  marginLeft: "0.5rem"
};

// src/SURFACES/Tabs/Tabs.hooks.ts
import { useState as useState37, useEffect as useEffect20 } from "react";
function useTabsState(initialTabsContent, currentTabId, onTabChange) {
  const [tabs, setTabs] = useState37(initialTabsContent);
  const [internalActiveTab, setInternalActiveTab] = useState37(
    initialTabsContent[0]?.id ?? null
  );
  const activeTabId = currentTabId !== void 0 ? currentTabId : internalActiveTab;
  useEffect20(() => {
    setTabs(initialTabsContent);
    if (currentTabId === void 0 && initialTabsContent.length > 0) {
      setInternalActiveTab(initialTabsContent[0]?.id ?? null);
    }
  }, [initialTabsContent, currentTabId]);
  const handleTabClick = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };
  const handleCloseTab = (tabIdToClose, e) => {
    e.stopPropagation();
    const newTabs = tabs.filter((tab) => tab.id !== tabIdToClose);
    setTabs(newTabs);
    if (activeTabId === tabIdToClose) {
      const nextActiveTab = newTabs[0]?.id ?? null;
      if (onTabChange) {
        onTabChange(nextActiveTab);
      } else {
        setInternalActiveTab(nextActiveTab);
      }
    }
  };
  return { tabs, activeTabId: activeTabId ?? null, handleTabClick, handleCloseTab };
}

// src/SURFACES/Tabs/Tabs.utils.ts
function buildTabsLayoutClass(vertical) {
  return [
    TABS_CLASSES.layout,
    vertical ? TABS_CLASSES.vertical : TABS_CLASSES.horizontal
  ].filter(Boolean).join(" ");
}
function buildTabsContainerClass(className, unstyled) {
  return [
    TABS_CLASSES.container,
    unstyled && "w3f-tabs--unstyled",
    className
  ].filter(Boolean).join(" ");
}
function buildTabsListClass(variant, colorScheme, unstyled) {
  if (unstyled) {
    return TABS_CLASSES.list;
  }
  return [
    TABS_CLASSES.list,
    `w3f-tabs-${variant}`,
    `w3f-tabs-color-${colorScheme}`
  ].filter(Boolean).join(" ");
}
function buildTabsItemClass(isActive, highlightActiveTab) {
  return [
    TABS_CLASSES.item,
    isActive && TABS_CLASSES.itemActive,
    isActive && highlightActiveTab && TABS_CLASSES.itemHighlight
  ].filter(Boolean).join(" ");
}

// src/SURFACES/Tabs/Tabs.tsx
import { Fragment as Fragment8, jsx as jsx55, jsxs as jsxs39 } from "react/jsx-runtime";
var CloseIcon = () => /* @__PURE__ */ jsx55(
  "svg",
  {
    className: TABS_CLASSES.closeIcon,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    style: { width: "16px", height: "16px" },
    children: /* @__PURE__ */ jsx55("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })
  }
);
var EmptyIcon = () => /* @__PURE__ */ jsx55(
  "svg",
  {
    className: TABS_CLASSES.emptyIcon,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ jsx55(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      }
    )
  }
);
var Tabs = forwardRef40(({
  initialTabsContent = TABS_DEFAULTS.initialTabsContent,
  closable = TABS_DEFAULTS.closable,
  title = TABS_DEFAULTS.title,
  currentTabId,
  onTabChange,
  highlightActiveTab = TABS_DEFAULTS.highlightActiveTab,
  vertical = TABS_DEFAULTS.vertical,
  variant = TABS_DEFAULTS.variant,
  colorScheme = TABS_DEFAULTS.colorScheme,
  unstyled = TABS_DEFAULTS.unstyled
}, ref) => {
  const { tabs, activeTabId, handleTabClick, handleCloseTab } = useTabsState(
    initialTabsContent,
    currentTabId,
    onTabChange
  );
  const containerCls = buildTabsContainerClass(void 0, unstyled);
  if (tabs.length === 0) {
    return /* @__PURE__ */ jsxs39("div", { ref, className: containerCls, children: [
      title && /* @__PURE__ */ jsx55("h3", { className: TABS_CLASSES.titleEl, children: title }),
      /* @__PURE__ */ jsxs39("div", { className: TABS_CLASSES.empty, children: [
        /* @__PURE__ */ jsx55(EmptyIcon, {}),
        /* @__PURE__ */ jsx55("p", { className: TABS_CLASSES.emptyText, children: "No hay pesta\xF1as abiertas" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs39("div", { ref, className: containerCls, "aria-label": title, children: [
    title && /* @__PURE__ */ jsx55("h3", { className: TABS_CLASSES.titleEl, children: title }),
    /* @__PURE__ */ jsxs39("div", { className: buildTabsLayoutClass(vertical), children: [
      /* @__PURE__ */ jsx55("div", { className: buildTabsListClass(variant, colorScheme, unstyled), role: "tablist", children: tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        return /* @__PURE__ */ jsxs39(
          "div",
          {
            role: "tab",
            "aria-controls": `panel-${tab.id}`,
            "aria-selected": isActive,
            tabIndex: 0,
            className: buildTabsItemClass(isActive, highlightActiveTab),
            onClick: () => handleTabClick(tab.id),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleTabClick(tab.id);
              }
            },
            children: [
              /* @__PURE__ */ jsx55("span", { className: TABS_CLASSES.itemText, children: tab.title }),
              closable && /* @__PURE__ */ jsx55(
                Button_default,
                {
                  className: TABS_CLASSES.closeBtn,
                  onClick: (e) => handleCloseTab(tab.id, e),
                  "aria-label": `Cerrar ${tab.title}`,
                  type: "button",
                  variant: "text",
                  size: "sm",
                  style: TABS_CLOSE_BTN_STYLE,
                  icon: /* @__PURE__ */ jsx55(CloseIcon, {})
                }
              )
            ]
          },
          tab.id
        );
      }) }),
      /* @__PURE__ */ jsx55("div", { className: TABS_CLASSES.content, children: tabs.map((tab) => /* @__PURE__ */ jsx55(
        "div",
        {
          id: `panel-${tab.id}`,
          role: "tabpanel",
          "aria-labelledby": `tab-${tab.id}`,
          hidden: activeTabId !== tab.id,
          className: TABS_CLASSES.panel,
          children: typeof tab.content === "string" ? /* @__PURE__ */ jsxs39(Fragment8, { children: [
            /* @__PURE__ */ jsx55("h4", { className: TABS_CLASSES.panelTitle, children: tab.title }),
            /* @__PURE__ */ jsx55("p", { className: TABS_CLASSES.panelText, children: tab.content })
          ] }) : tab.content
        },
        tab.id
      )) })
    ] })
  ] });
});
Tabs.displayName = "Tabs";

// src/SURFACES/Titles/SectionTitle.constants.ts
var SECTION_TITLE_DEFAULTS = {
  align: "left",
  borderColor: "",
  unstyled: false,
  className: ""
};
var SECTION_TITLE_CLASSES = {
  container: "w3f-section-title",
  title: "w3f-section-title__h",
  subtitle: "w3f-section-title__sub",
  alignLeft: "w3f-section-title--left",
  alignCenter: "w3f-section-title--center",
  alignRight: "w3f-section-title--right",
  alignJustify: "w3f-section-title--justify"
};

// src/SURFACES/Titles/SectionTitle.utils.ts
var ALIGN_CLASS = {
  left: SECTION_TITLE_CLASSES.alignLeft,
  center: SECTION_TITLE_CLASSES.alignCenter,
  right: SECTION_TITLE_CLASSES.alignRight,
  justify: SECTION_TITLE_CLASSES.alignJustify
};
function buildSectionTitleClasses(align, className, unstyled) {
  const base = SECTION_TITLE_CLASSES.container;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    ALIGN_CLASS[align],
    className
  ].filter(Boolean).join(" ");
}
function buildSectionTitleStyle(borderColor, style) {
  return {
    ...borderColor ? { "--w3f-section-title-border": borderColor } : {},
    ...style
  };
}

// src/SURFACES/Titles/SectionTitle.tsx
import { jsx as jsx56, jsxs as jsxs40 } from "react/jsx-runtime";
var SectionTitle = ({
  title,
  subtitle,
  align = SECTION_TITLE_DEFAULTS.align,
  borderColor = SECTION_TITLE_DEFAULTS.borderColor,
  unstyled = SECTION_TITLE_DEFAULTS.unstyled,
  className = SECTION_TITLE_DEFAULTS.className,
  style = {}
}) => {
  const cls = buildSectionTitleClasses(align, className, unstyled);
  const computedStyle = buildSectionTitleStyle(borderColor, style);
  return /* @__PURE__ */ jsxs40("div", { className: cls, style: computedStyle, children: [
    title && /* @__PURE__ */ jsx56("h3", { className: SECTION_TITLE_CLASSES.title, children: title }),
    subtitle && /* @__PURE__ */ jsx56("p", { className: SECTION_TITLE_CLASSES.subtitle, children: subtitle })
  ] });
};
SectionTitle.displayName = "SectionTitle";

// src/SURFACES/Window/Window.tsx
import { forwardRef as forwardRef41 } from "react";

// src/SURFACES/Window/Window.constants.ts
var WINDOW_DEFAULTS = {
  title: "Window",
  osStyle: "windows",
  size: "md",
  modal: false,
  draggable: true,
  resizable: true,
  minimizable: true,
  maximizable: true,
  closable: true,
  className: "",
  bodyClassName: "",
  footerClassName: "",
  footerAlign: "end",
  open: true,
  noPadding: false,
  unstyled: false,
  buttons: []
};
var WINDOW_CLASSES = {
  base: "w3f-window",
  floating: "w3f-window--floating",
  modal: "w3f-window--modal",
  maximized: "w3f-window--maximized",
  minimized: "w3f-window--minimized",
  focused: "w3f-window--focused",
  dragging: "w3f-window--dragging",
  resizing: "w3f-window--resizing",
  titlebar: "w3f-window-titlebar",
  titlebarDragging: "w3f-window-titlebar--dragging",
  titlebarLeft: "w3f-window-titlebar-left",
  titlebarRight: "w3f-window-titlebar-right",
  title: "w3f-window-title",
  icon: "w3f-window-icon",
  body: "w3f-window-body",
  bodyNoPadding: "w3f-window-body--no-padding",
  footer: "w3f-window-footer",
  overlay: "w3f-window-overlay",
  controlBtn: "w3f-window-control-btn",
  controlClose: "w3f-window-control-btn--close",
  controlMinimize: "w3f-window-control-btn--minimize",
  controlMaximize: "w3f-window-control-btn--maximize",
  resizeHandle: "w3f-window-resize-handle"
};
var WINDOW_MIN_WIDTH = 300;
var WINDOW_MIN_HEIGHT = 200;
var RESIZE_DIRECTIONS = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

// src/SURFACES/Window/Window.hooks.ts
import { useState as useState38, useRef as useRef17, useEffect as useEffect21, useCallback as useCallback26 } from "react";
var windowZIndexCounter = 100;
function useWindowState(open, draggable, resizable, onClose, onMinimize, onMaximize, onFocus, initialPosition = null, initialSize = null) {
  const [isOpen, setIsOpen] = useState38(open);
  const [isMinimized, setIsMinimized] = useState38(false);
  const [isMaximized, setIsMaximized] = useState38(false);
  const [isFocused, setIsFocused] = useState38(false);
  const [isDragging, setIsDragging] = useState38(false);
  const [isResizing, setIsResizing] = useState38(false);
  const [zIndex, setZIndex] = useState38(() => ++windowZIndexCounter);
  const [position, setPosition] = useState38(initialPosition ?? { x: 100, y: 100 });
  const [dimensions, setDimensions] = useState38(initialSize ?? null);
  const windowRef = useRef17(null);
  const dragStartRef = useRef17({ x: 0, y: 0 });
  const resizeStartRef = useRef17({ x: 0, y: 0, width: 0, height: 0, startX: 0, startY: 0 });
  const resizeDirection = useRef17(null);
  const previousState = useRef17({
    position: null,
    dimensions: null
  });
  useEffect21(() => {
    setIsOpen(open);
  }, [open]);
  const parentOffsetRef = useRef17({ x: 0, y: 0 });
  useEffect21(() => {
    if (!isDragging) return;
    const onMouseMove = (e) => {
      setPosition({
        x: e.clientX - dragStartRef.current.x - parentOffsetRef.current.x,
        y: e.clientY - dragStartRef.current.y - parentOffsetRef.current.y
      });
    };
    const onMouseUp = () => {
      setIsDragging(false);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);
  const handleDragStart = useCallback26((e) => {
    if (!draggable || isMaximized || isMinimized) return;
    const el = windowRef.current;
    if (!el) return;
    const offsetParent = el.offsetParent;
    if (offsetParent) {
      const parentRect = offsetParent.getBoundingClientRect();
      parentOffsetRef.current = { x: parentRect.left, y: parentRect.top };
    } else {
      parentOffsetRef.current = { x: 0, y: 0 };
    }
    const rect = el.getBoundingClientRect();
    dragStartRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setIsDragging(true);
    setIsFocused(true);
    setZIndex(++windowZIndexCounter);
    if (onFocus) onFocus();
  }, [draggable, isMaximized, isMinimized, onFocus]);
  useEffect21(() => {
    if (!isResizing) return;
    const onMouseMove = (e) => {
      if (!resizeDirection.current) return;
      const { x, y, width, height, startX, startY } = resizeStartRef.current;
      const deltaX = e.clientX - x;
      const deltaY = e.clientY - y;
      const dir = resizeDirection.current;
      let newWidth = width;
      let newHeight = height;
      let newX = startX;
      let newY = startY;
      if (dir.includes("e")) newWidth += deltaX;
      if (dir.includes("w")) {
        newWidth -= deltaX;
        newX += deltaX;
      }
      if (dir.includes("s")) newHeight += deltaY;
      if (dir.includes("n")) {
        newHeight -= deltaY;
        newY += deltaY;
      }
      if (newWidth < WINDOW_MIN_WIDTH) {
        if (dir.includes("w")) newX = startX + width - WINDOW_MIN_WIDTH;
        newWidth = WINDOW_MIN_WIDTH;
      }
      if (newHeight < WINDOW_MIN_HEIGHT) {
        if (dir.includes("n")) newY = startY + height - WINDOW_MIN_HEIGHT;
        newHeight = WINDOW_MIN_HEIGHT;
      }
      setDimensions({ width: newWidth, height: newHeight });
      if (dir.includes("w") || dir.includes("n")) setPosition({ x: newX, y: newY });
    };
    const onMouseUp = () => {
      setIsResizing(false);
      resizeDirection.current = null;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isResizing]);
  const handleResizeStart = useCallback26((e, direction) => {
    if (!resizable || isMaximized) return;
    e.stopPropagation();
    resizeDirection.current = direction;
    const el = windowRef.current;
    const rect = el.getBoundingClientRect();
    const offsetParent = el.offsetParent;
    const pOff = offsetParent ? offsetParent.getBoundingClientRect() : { left: 0, top: 0 };
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: rect.width,
      height: rect.height,
      startX: rect.left - pOff.left,
      startY: rect.top - pOff.top
    };
    setIsResizing(true);
  }, [resizable, isMaximized]);
  const handleClose = useCallback26(() => {
    setIsOpen(false);
    if (onClose) onClose();
  }, [onClose]);
  const handleMinimize = useCallback26(() => {
    setIsMinimized((prev) => {
      if (onMinimize) onMinimize(!prev);
      return !prev;
    });
  }, [onMinimize]);
  const handleMaximize = useCallback26(() => {
    if (!isMaximized) {
      previousState.current = {
        position: { ...position },
        dimensions: dimensions ? { ...dimensions } : null
      };
    } else {
      if (previousState.current.position) setPosition(previousState.current.position);
      if (previousState.current.dimensions) setDimensions(previousState.current.dimensions);
    }
    setIsMaximized((prev) => {
      if (onMaximize) onMaximize(!prev);
      return !prev;
    });
  }, [isMaximized, position, dimensions, onMaximize]);
  const handleWindowClick = useCallback26(() => {
    setIsFocused(true);
    setZIndex(++windowZIndexCounter);
    if (onFocus) onFocus();
  }, [onFocus]);
  return {
    isOpen,
    isMinimized,
    isMaximized,
    isFocused,
    isDragging,
    isResizing,
    zIndex,
    position,
    dimensions,
    windowRef,
    handleDragStart,
    handleResizeStart,
    handleClose,
    handleMinimize,
    handleMaximize,
    handleWindowClick
  };
}

// src/SURFACES/Window/Window.utils.ts
function buildWindowClasses(osStyle, size, modal, isMaximized, isMinimized, isFocused, isDragging, isResizing, className, unstyled) {
  if (unstyled) {
    return [WINDOW_CLASSES.base, "w3f-window--unstyled", className].filter(Boolean).join(" ");
  }
  return [
    WINDOW_CLASSES.base,
    `w3f-window--${osStyle}`,
    `w3f-window--${size}`,
    modal ? WINDOW_CLASSES.modal : WINDOW_CLASSES.floating,
    isMaximized && WINDOW_CLASSES.maximized,
    isMinimized && WINDOW_CLASSES.minimized,
    isFocused && WINDOW_CLASSES.focused,
    isDragging && WINDOW_CLASSES.dragging,
    isResizing && WINDOW_CLASSES.resizing,
    className
  ].filter(Boolean).join(" ");
}
function buildWindowBodyClasses(noPadding, bodyClassName) {
  return [
    WINDOW_CLASSES.body,
    noPadding && WINDOW_CLASSES.bodyNoPadding,
    bodyClassName
  ].filter(Boolean).join(" ");
}
function buildWindowFooterClasses(align, footerClassName) {
  return [WINDOW_CLASSES.footer, `w3f-window-footer--${align}`, footerClassName].filter(Boolean).join(" ");
}
function buildWindowStyle(style, position, dimensions, isMaximized, zIndex) {
  return {
    ...style,
    zIndex,
    ...!isMaximized && position ? { left: `${position.x}px`, top: `${position.y}px` } : {},
    ...!isMaximized && dimensions ? { width: `${dimensions.width}px`, height: `${dimensions.height}px`, maxHeight: "none" } : {}
  };
}

// src/SURFACES/Window/Window.tsx
import { Fragment as Fragment9, jsx as jsx57, jsxs as jsxs41 } from "react/jsx-runtime";
var MinimizeIcon = () => /* @__PURE__ */ jsx57("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx57("rect", { x: "2", y: "5", width: "8", height: "2" }) });
var MaximizeIcon = () => /* @__PURE__ */ jsx57("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx57("rect", { x: "2", y: "2", width: "8", height: "8", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }) });
var RestoreIcon = () => /* @__PURE__ */ jsx57("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx57("path", { d: "M3,3 L3,9 L9,9 L9,3 Z M4,4 L8,4 L8,8 L4,8 Z M5,1 L11,1 L11,7 L10,7 L10,2 L5,2 Z" }) });
var CloseIcon2 = () => /* @__PURE__ */ jsx57("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx57("path", { d: "M2,2 L10,10 M10,2 L2,10", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
var Window = forwardRef41(({
  title = WINDOW_DEFAULTS.title,
  icon,
  children,
  footer,
  buttons = [],
  osStyle = WINDOW_DEFAULTS.osStyle,
  size = WINDOW_DEFAULTS.size,
  modal = WINDOW_DEFAULTS.modal,
  draggable = WINDOW_DEFAULTS.draggable,
  resizable = WINDOW_DEFAULTS.resizable,
  minimizable = WINDOW_DEFAULTS.minimizable,
  maximizable = WINDOW_DEFAULTS.maximizable,
  closable = WINDOW_DEFAULTS.closable,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  className = WINDOW_DEFAULTS.className,
  bodyClassName = WINDOW_DEFAULTS.bodyClassName,
  footerClassName = WINDOW_DEFAULTS.footerClassName,
  style,
  initialPosition = null,
  initialSize = null,
  footerAlign = WINDOW_DEFAULTS.footerAlign,
  open = WINDOW_DEFAULTS.open,
  noPadding = WINDOW_DEFAULTS.noPadding,
  unstyled = WINDOW_DEFAULTS.unstyled
}, ref) => {
  const {
    isOpen,
    isMinimized,
    isMaximized,
    isFocused,
    isDragging,
    isResizing,
    zIndex,
    position,
    dimensions,
    windowRef,
    handleDragStart,
    handleResizeStart,
    handleClose,
    handleMinimize,
    handleMaximize,
    handleWindowClick
  } = useWindowState(
    open,
    draggable,
    resizable,
    onClose,
    onMinimize,
    onMaximize,
    onFocus,
    initialPosition,
    initialSize
  );
  if (!isOpen) return null;
  const windowCls = buildWindowClasses(
    osStyle,
    size,
    modal,
    isMaximized,
    isMinimized,
    isFocused,
    isDragging,
    isResizing,
    className,
    unstyled
  );
  const bodyCls = buildWindowBodyClasses(noPadding, bodyClassName);
  const footerCls = buildWindowFooterClasses(footerAlign, footerClassName);
  const windowStyle = buildWindowStyle(style, position, dimensions, isMaximized, zIndex);
  const renderMacosButtons = () => /* @__PURE__ */ jsxs41("div", { className: WINDOW_CLASSES.titlebarLeft, children: [
    closable && /* @__PURE__ */ jsx57(
      "button",
      {
        className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlClose}`,
        onClick: handleClose,
        "aria-label": "Cerrar",
        title: "Cerrar",
        type: "button",
        children: /* @__PURE__ */ jsx57("span", { children: "\xD7" })
      }
    ),
    minimizable && /* @__PURE__ */ jsx57(
      "button",
      {
        className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMinimize}`,
        onClick: handleMinimize,
        "aria-label": "Minimizar",
        title: "Minimizar",
        type: "button",
        children: /* @__PURE__ */ jsx57("span", { children: "\u2212" })
      }
    ),
    maximizable && /* @__PURE__ */ jsx57(
      "button",
      {
        className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMaximize}`,
        onClick: handleMaximize,
        "aria-label": isMaximized ? "Restaurar" : "Maximizar",
        title: isMaximized ? "Restaurar" : "Maximizar",
        type: "button",
        children: /* @__PURE__ */ jsx57("span", { children: "+" })
      }
    ),
    icon && /* @__PURE__ */ jsx57("div", { className: WINDOW_CLASSES.icon, children: icon }),
    /* @__PURE__ */ jsx57("h2", { className: WINDOW_CLASSES.title, children: title })
  ] });
  const renderWindowsButtons = () => /* @__PURE__ */ jsxs41(Fragment9, { children: [
    /* @__PURE__ */ jsxs41("div", { className: WINDOW_CLASSES.titlebarLeft, children: [
      icon && /* @__PURE__ */ jsx57("div", { className: WINDOW_CLASSES.icon, children: icon }),
      /* @__PURE__ */ jsx57("h2", { className: WINDOW_CLASSES.title, children: title })
    ] }),
    /* @__PURE__ */ jsxs41("div", { className: WINDOW_CLASSES.titlebarRight, children: [
      minimizable && /* @__PURE__ */ jsx57(
        "button",
        {
          className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMinimize}`,
          onClick: handleMinimize,
          "aria-label": "Minimizar",
          title: "Minimizar",
          type: "button",
          children: /* @__PURE__ */ jsx57(MinimizeIcon, {})
        }
      ),
      maximizable && /* @__PURE__ */ jsx57(
        "button",
        {
          className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMaximize}`,
          onClick: handleMaximize,
          "aria-label": isMaximized ? "Restaurar" : "Maximizar",
          title: isMaximized ? "Restaurar" : "Maximizar",
          type: "button",
          children: isMaximized ? /* @__PURE__ */ jsx57(RestoreIcon, {}) : /* @__PURE__ */ jsx57(MaximizeIcon, {})
        }
      ),
      closable && /* @__PURE__ */ jsx57(
        "button",
        {
          className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlClose}`,
          onClick: handleClose,
          "aria-label": "Cerrar",
          title: "Cerrar",
          type: "button",
          children: /* @__PURE__ */ jsx57(CloseIcon2, {})
        }
      )
    ] })
  ] });
  const renderResizeHandles = () => {
    if (!resizable || isMaximized) return null;
    return RESIZE_DIRECTIONS.map((dir) => /* @__PURE__ */ jsx57(
      "div",
      {
        className: `${WINDOW_CLASSES.resizeHandle} ${WINDOW_CLASSES.resizeHandle}--${dir}`,
        onMouseDown: (e) => handleResizeStart(e, dir)
      },
      dir
    ));
  };
  const renderFooter = () => {
    if (!footer && (!buttons || buttons.length === 0)) return null;
    return /* @__PURE__ */ jsx57("div", { className: footerCls, children: footer ?? buttons.map(({ key, text, children: btnChildren, ...rest }, index) => /* @__PURE__ */ jsx57(Button_default, { ...rest, children: text ?? btnChildren }, key ?? `window-btn-${index}`)) });
  };
  const windowContent = /* @__PURE__ */ jsxs41("div", { ref: (node) => {
    windowRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  }, className: windowCls, style: windowStyle, onClick: handleWindowClick, children: [
    /* @__PURE__ */ jsx57(
      "div",
      {
        className: `${WINDOW_CLASSES.titlebar} ${isDragging ? WINDOW_CLASSES.titlebarDragging : ""}`,
        onMouseDown: handleDragStart,
        children: osStyle === "macos" ? renderMacosButtons() : renderWindowsButtons()
      }
    ),
    /* @__PURE__ */ jsx57("div", { className: bodyCls, children }),
    renderFooter(),
    renderResizeHandles()
  ] });
  if (modal) {
    return /* @__PURE__ */ jsx57("div", { className: WINDOW_CLASSES.overlay, children: windowContent });
  }
  return windowContent;
});
Window.displayName = "Window";

// src/SURFACES/WindowGrid/WindowGrid.tsx
import { forwardRef as forwardRef42 } from "react";

// src/SURFACES/WindowGrid/WindowGrid.constants.ts
var WINDOW_GRID_DEFAULTS = {
  unstyled: false,
  gap: "var(--w3f-space-4)",
  autoResponsive: true,
  responsiveBreakpoints: {
    sm: 400,
    md: 600,
    lg: 800,
    xl: 1e3
  },
  responsiveColumns: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6
  }
};
var WINDOW_GRID_CLASSES = {
  gridBase: "w3f-window-grid",
  gridBody: "w3f-window-grid-body"
};

// src/SURFACES/WindowGrid/WindowGrid.hooks.ts
import { useState as useState39, useRef as useRef18, useEffect as useEffect22, useCallback as useCallback27 } from "react";
function useResponsiveGrid(autoResponsive, responsiveBreakpoints, responsiveColumns, gridTemplateColumns, deps) {
  const [currentBreakpoint, setCurrentBreakpoint] = useState39("md");
  const [gridColumns, setGridColumns] = useState39(gridTemplateColumns ?? "");
  const bodyRef = useRef18(null);
  const calculateGridColumns = useCallback27(
    (width) => {
      if (!autoResponsive) return;
      const sorted = Object.entries(responsiveBreakpoints).sort((a, b) => a[1] - b[1]);
      let breakpoint = "xs";
      for (const [bp, minWidth] of sorted) {
        if (width >= minWidth) breakpoint = bp;
      }
      setCurrentBreakpoint(breakpoint);
      const cols = responsiveColumns[breakpoint] ?? responsiveColumns.xs ?? 1;
      setGridColumns(`repeat(${cols}, minmax(0, 1fr))`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [autoResponsive, responsiveBreakpoints, responsiveColumns]
  );
  useEffect22(() => {
    if (!bodyRef.current || !autoResponsive) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        calculateGridColumns(entry.contentRect.width);
      }
    });
    observer.observe(bodyRef.current);
    return () => observer.disconnect();
  }, [calculateGridColumns, autoResponsive]);
  useEffect22(() => {
    if (bodyRef.current && autoResponsive) {
      calculateGridColumns(bodyRef.current.offsetWidth);
    }
  }, [calculateGridColumns, autoResponsive, ...deps]);
  return { gridColumns, currentBreakpoint, bodyRef };
}

// src/SURFACES/WindowGrid/WindowGrid.utils.ts
function buildGridStyle3(options, resolvedColumns, autoResponsive) {
  const raw = {
    display: "grid",
    gridTemplateColumns: autoResponsive ? resolvedColumns : options.gridTemplateColumns ?? resolvedColumns,
    gridTemplateRows: options.gridTemplateRows,
    gridTemplateAreas: options.gridTemplateAreas ? options.gridTemplateAreas.trim().split("\n").map((row) => `"${row.trim()}"`).join(" ") : void 0,
    gap: options.gap,
    rowGap: options.rowGap,
    columnGap: options.columnGap,
    gridAutoColumns: options.autoColumns,
    gridAutoRows: options.autoRows,
    gridAutoFlow: options.autoFlow,
    justifyContent: options.justifyContent,
    alignContent: options.alignContent,
    justifyItems: options.justifyItems,
    alignItems: options.alignItems,
    height: "100%",
    width: "100%"
  };
  Object.keys(raw).forEach((key) => {
    if (raw[key] === void 0) delete raw[key];
  });
  return raw;
}
function buildWindowGridClasses(windowClasses, gridBaseClass, unstyled) {
  if (unstyled) return [windowClasses, gridBaseClass, `${gridBaseClass}--unstyled`].filter(Boolean).join(" ");
  return [windowClasses, gridBaseClass].join(" ");
}

// src/SURFACES/WindowGrid/WindowGrid.tsx
import { Fragment as Fragment10, jsx as jsx58, jsxs as jsxs42 } from "react/jsx-runtime";
var MinimizeIcon2 = () => /* @__PURE__ */ jsx58("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx58("rect", { x: "2", y: "5", width: "8", height: "2" }) });
var MaximizeIcon2 = () => /* @__PURE__ */ jsx58("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx58("rect", { x: "2", y: "2", width: "8", height: "8", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }) });
var RestoreIcon2 = () => /* @__PURE__ */ jsx58("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx58("path", { d: "M3,3 L3,9 L9,9 L9,3 Z M4,4 L8,4 L8,8 L4,8 Z M5,1 L11,1 L11,7 L10,7 L10,2 L5,2 Z" }) });
var CloseIcon3 = () => /* @__PURE__ */ jsx58("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "currentColor", children: /* @__PURE__ */ jsx58("path", { d: "M2,2 L10,10 M10,2 L2,10", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
var WindowGrid = forwardRef42(({
  // Window props
  title = WINDOW_DEFAULTS.title,
  icon,
  children,
  footer,
  buttons = [],
  osStyle = WINDOW_DEFAULTS.osStyle,
  size = WINDOW_DEFAULTS.size,
  modal = WINDOW_DEFAULTS.modal,
  draggable = WINDOW_DEFAULTS.draggable,
  resizable = WINDOW_DEFAULTS.resizable,
  minimizable = WINDOW_DEFAULTS.minimizable,
  maximizable = WINDOW_DEFAULTS.maximizable,
  closable = WINDOW_DEFAULTS.closable,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onResize,
  className = WINDOW_DEFAULTS.className,
  bodyClassName = WINDOW_DEFAULTS.bodyClassName,
  footerClassName = WINDOW_DEFAULTS.footerClassName,
  style,
  initialPosition = null,
  initialSize = null,
  footerAlign = WINDOW_DEFAULTS.footerAlign,
  open = WINDOW_DEFAULTS.open,
  noPadding = WINDOW_DEFAULTS.noPadding,
  // Grid props
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gap = WINDOW_GRID_DEFAULTS.gap,
  rowGap,
  columnGap,
  autoColumns,
  autoRows,
  autoFlow,
  justifyContent,
  alignContent,
  justifyItems,
  alignItems,
  // Responsive
  responsiveBreakpoints = WINDOW_GRID_DEFAULTS.responsiveBreakpoints,
  responsiveColumns = WINDOW_GRID_DEFAULTS.responsiveColumns,
  autoResponsive = WINDOW_GRID_DEFAULTS.autoResponsive,
  unstyled = WINDOW_GRID_DEFAULTS.unstyled
}, ref) => {
  const {
    isOpen,
    isMinimized,
    isMaximized,
    isFocused,
    isDragging,
    isResizing,
    position,
    dimensions,
    windowRef,
    handleDragStart,
    handleResizeStart,
    handleClose,
    handleMinimize,
    handleMaximize,
    handleWindowClick
  } = useWindowState(
    open,
    draggable,
    resizable,
    onClose,
    onMinimize,
    onMaximize,
    onFocus,
    initialPosition,
    initialSize
  );
  const { gridColumns, currentBreakpoint, bodyRef } = useResponsiveGrid(
    autoResponsive,
    responsiveBreakpoints,
    responsiveColumns,
    gridTemplateColumns,
    [dimensions, isMaximized]
  );
  if (!isOpen) return null;
  const windowCls = buildWindowGridClasses(
    buildWindowClasses(osStyle, size, modal, isMaximized, isMinimized, isFocused, isDragging, isResizing, className),
    WINDOW_GRID_CLASSES.gridBase,
    unstyled
  );
  const bodyCls = [
    buildWindowBodyClasses(noPadding, bodyClassName),
    WINDOW_GRID_CLASSES.gridBody
  ].join(" ");
  const footerCls = buildWindowFooterClasses(footerAlign, footerClassName);
  const windowStyle = buildWindowStyle(style, position, dimensions, isMaximized);
  const gridStyle = buildGridStyle3(
    { gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gap, rowGap, columnGap, autoColumns, autoRows, autoFlow, justifyContent, alignContent, justifyItems, alignItems },
    gridColumns,
    autoResponsive
  );
  const renderMacosButtons = () => /* @__PURE__ */ jsxs42("div", { className: WINDOW_CLASSES.titlebarLeft, children: [
    closable && /* @__PURE__ */ jsx58(
      Button_default,
      {
        className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlClose}`,
        onClick: handleClose,
        "aria-label": "Cerrar",
        variant: "text",
        size: "sm",
        children: /* @__PURE__ */ jsx58("span", { children: "\xD7" })
      }
    ),
    minimizable && /* @__PURE__ */ jsx58(
      Button_default,
      {
        className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMinimize}`,
        onClick: handleMinimize,
        "aria-label": "Minimizar",
        variant: "text",
        size: "sm",
        children: /* @__PURE__ */ jsx58("span", { children: "\u2212" })
      }
    ),
    maximizable && /* @__PURE__ */ jsx58(
      Button_default,
      {
        className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMaximize}`,
        onClick: handleMaximize,
        "aria-label": isMaximized ? "Restaurar" : "Maximizar",
        variant: "text",
        size: "sm",
        children: /* @__PURE__ */ jsx58("span", { children: "+" })
      }
    ),
    icon && /* @__PURE__ */ jsx58("div", { className: WINDOW_CLASSES.icon, children: icon }),
    /* @__PURE__ */ jsx58("h2", { className: WINDOW_CLASSES.title, children: title })
  ] });
  const renderWindowsButtons = () => /* @__PURE__ */ jsxs42(Fragment10, { children: [
    /* @__PURE__ */ jsxs42("div", { className: WINDOW_CLASSES.titlebarLeft, children: [
      icon && /* @__PURE__ */ jsx58("div", { className: WINDOW_CLASSES.icon, children: icon }),
      /* @__PURE__ */ jsx58("h2", { className: WINDOW_CLASSES.title, children: title }),
      autoResponsive && /* @__PURE__ */ jsxs42("span", { style: { fontSize: "0.75rem", opacity: 0.6, marginLeft: "8px" }, children: [
        "(",
        currentBreakpoint,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsxs42("div", { className: WINDOW_CLASSES.titlebarRight, children: [
      minimizable && /* @__PURE__ */ jsx58(
        Button_default,
        {
          className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMinimize}`,
          onClick: handleMinimize,
          "aria-label": "Minimizar",
          variant: "text",
          size: "sm",
          children: /* @__PURE__ */ jsx58(MinimizeIcon2, {})
        }
      ),
      maximizable && /* @__PURE__ */ jsx58(
        Button_default,
        {
          className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMaximize}`,
          onClick: handleMaximize,
          "aria-label": isMaximized ? "Restaurar" : "Maximizar",
          variant: "text",
          size: "sm",
          children: isMaximized ? /* @__PURE__ */ jsx58(RestoreIcon2, {}) : /* @__PURE__ */ jsx58(MaximizeIcon2, {})
        }
      ),
      closable && /* @__PURE__ */ jsx58(
        Button_default,
        {
          className: `${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlClose}`,
          onClick: handleClose,
          "aria-label": "Cerrar",
          variant: "text",
          size: "sm",
          children: /* @__PURE__ */ jsx58(CloseIcon3, {})
        }
      )
    ] })
  ] });
  const renderResizeHandles = () => {
    if (!resizable || isMaximized) return null;
    return RESIZE_DIRECTIONS.map((dir) => /* @__PURE__ */ jsx58(
      "div",
      {
        className: `${WINDOW_CLASSES.resizeHandle} ${WINDOW_CLASSES.resizeHandle}--${dir}`,
        onMouseDown: (e) => handleResizeStart(e, dir)
      },
      dir
    ));
  };
  const renderFooter = () => {
    if (!footer && (!buttons || buttons.length === 0)) return null;
    return /* @__PURE__ */ jsx58("div", { className: footerCls, children: footer ?? buttons.map(({ key, text, children: btnChildren, ...rest }, index) => /* @__PURE__ */ jsx58(Button_default, { ...rest, children: text ?? btnChildren }, key ?? `wg-btn-${index}`)) });
  };
  const windowContent = /* @__PURE__ */ jsxs42("div", { ref: (node) => {
    windowRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  }, className: windowCls, style: windowStyle, onClick: handleWindowClick, children: [
    /* @__PURE__ */ jsx58(
      "div",
      {
        className: `${WINDOW_CLASSES.titlebar} ${isDragging ? WINDOW_CLASSES.titlebarDragging : ""}`,
        onMouseDown: handleDragStart,
        children: osStyle === "macos" ? renderMacosButtons() : renderWindowsButtons()
      }
    ),
    /* @__PURE__ */ jsx58("div", { ref: bodyRef, className: bodyCls, children: /* @__PURE__ */ jsx58("div", { style: gridStyle, children }) }),
    renderFooter(),
    renderResizeHandles()
  ] });
  if (modal) return /* @__PURE__ */ jsx58("div", { className: WINDOW_CLASSES.overlay, children: windowContent });
  return windowContent;
});
WindowGrid.displayName = "WindowGrid";

// src/DATADISPLAY/Avatar/Avatar.tsx
import React49, { forwardRef as forwardRef43, useRef as useRef19 } from "react";

// src/DATADISPLAY/Avatar/Avatar.constants.ts
var AVATAR_SIZE_CLASSES = {
  small: "w3f-avatar-small",
  medium: "w3f-avatar-medium",
  large: "w3f-avatar-large",
  xlarge: "w3f-avatar-xlarge"
};
var AVATAR_DEFAULTS = {
  size: "medium",
  color: "gray",
  alt: "Avatar",
  hoverable: false,
  uploadable: false,
  unstyled: false,
  className: ""
};

// src/DATADISPLAY/Avatar/Avatar.utils.ts
function buildAvatarClasses(size, hoverable, src, color, className, unstyled) {
  if (unstyled) {
    return [
      "w3f-avatar",
      "w3f-avatar--unstyled",
      AVATAR_SIZE_CLASSES[size] || AVATAR_SIZE_CLASSES.medium,
      className
    ].filter(Boolean).join(" ");
  }
  return [
    "w3f-avatar",
    "w3f-avatar-circle",
    AVATAR_SIZE_CLASSES[size] || AVATAR_SIZE_CLASSES.medium,
    hoverable && "w3f-avatar-hoverable",
    !src && `w3f-avatar-${color}`,
    className
  ].filter(Boolean).join(" ");
}

// src/DATADISPLAY/Avatar/Avatar.hooks.ts
import { useContext as useContext23, useCallback as useCallback28 } from "react";
function useAvatarForm(name) {
  const formContext = useContext23(FormContext);
  const isFormControlled = !!(formContext && name);
  const formValue = isFormControlled ? formContext.values[name] : void 0;
  const setFormValue = useCallback28(
    (value) => {
      if (isFormControlled && formContext && name) {
        formContext.setFieldValue(name, value);
      }
    },
    [isFormControlled, formContext, name]
  );
  return { isFormControlled, formValue, setFormValue };
}

// src/DATADISPLAY/Avatar/Avatar.tsx
import { useBridgeBind as useBridgeBind18 } from "@w3f/bridge";
import { jsx as jsx59, jsxs as jsxs43 } from "react/jsx-runtime";
var Avatar = forwardRef43(({
  src,
  alt = AVATAR_DEFAULTS.alt,
  size = AVATAR_DEFAULTS.size,
  color = AVATAR_DEFAULTS.color,
  status,
  badge,
  hoverable = AVATAR_DEFAULTS.hoverable,
  uploadable = AVATAR_DEFAULTS.uploadable,
  accept = "image/*",
  unstyled = AVATAR_DEFAULTS.unstyled,
  className = AVATAR_DEFAULTS.className,
  children,
  onClick,
  name,
  onChange,
  bindId,
  ...rest
}, ref) => {
  const fileInputRef = useRef19(null);
  const { isFormControlled, formValue, setFormValue } = useAvatarForm(name);
  const { dispatch } = useBridgeBind18({ bindId });
  const effectiveSrc = src ?? (isFormControlled ? formValue : void 0);
  const safeSrc = sanitizeUrl(effectiveSrc);
  const avatarClasses = buildAvatarClasses(
    size,
    hoverable || uploadable,
    safeSrc,
    color,
    className,
    unstyled
  );
  const handleClick = (e) => {
    dispatch("click");
    if (uploadable && fileInputRef.current) {
      fileInputRef.current.click();
    }
    onClick?.(e);
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!ALLOWED_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      setFormValue(dataUrl);
      onChange?.(dataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const avatarContent = safeSrc ? /* @__PURE__ */ jsx59("img", { src: safeSrc, alt, className: "w3f-avatar-img" }) : /* @__PURE__ */ jsx59("span", { className: "w3f-avatar-text", children: children || "?" });
  const avatarElement = /* @__PURE__ */ jsxs43(
    "div",
    {
      ref,
      className: avatarClasses,
      onClick: handleClick,
      role: onClick || uploadable ? "button" : void 0,
      tabIndex: onClick || uploadable ? 0 : void 0,
      "aria-label": uploadable ? `${alt} \u2013 clic para cambiar imagen` : void 0,
      ...rest,
      children: [
        avatarContent,
        uploadable && /* @__PURE__ */ jsx59(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept,
            style: { display: "none" },
            onChange: handleFileChange,
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
  if (status || badge !== void 0) {
    return /* @__PURE__ */ jsxs43("div", { className: "w3f-avatar-wrapper", children: [
      avatarElement,
      status && /* @__PURE__ */ jsx59(
        "span",
        {
          className: `w3f-avatar-status w3f-avatar-status-${status}`,
          "aria-label": `Estado: ${status}`
        }
      ),
      badge !== void 0 && /* @__PURE__ */ jsx59("span", { className: "w3f-avatar-badge", children: badge > 99 ? "99+" : badge })
    ] });
  }
  return avatarElement;
});
Avatar.displayName = "Avatar";
var AvatarGroup = forwardRef43(({ children, max = 5, className = "" }, ref) => {
  const childrenArray = React49.Children.toArray(children);
  const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const extraCount = max && childrenArray.length > max ? childrenArray.length - max : 0;
  return /* @__PURE__ */ jsxs43("div", { ref, className: `w3f-avatar-group ${className}`, children: [
    visibleChildren,
    extraCount > 0 && /* @__PURE__ */ jsxs43(Avatar, { color: "gray", size: "medium", children: [
      "+",
      extraCount
    ] })
  ] });
});
AvatarGroup.displayName = "AvatarGroup";

// src/DATADISPLAY/Badge/BadgeWrapper.tsx
import React50 from "react";
import { jsx as jsx60, jsxs as jsxs44 } from "react/jsx-runtime";
var BadgeWrapper = React50.forwardRef(({
  children,
  badgeContent,
  badgeProps = {},
  className = "",
  style = {},
  overlap = true,
  offset,
  ...rest
}, ref) => {
  const shouldShowBadge = React50.useMemo(() => {
    if (badgeProps.invisible) return false;
    if (badgeContent === null || badgeContent === void 0) {
      return badgeProps.variant === "dot";
    }
    if (badgeContent === 0) {
      return badgeProps.showZero === true;
    }
    return true;
  }, [badgeContent, badgeProps]);
  const wrapperStyle = React50.useMemo(() => ({
    position: "relative",
    display: "inline-block",
    verticalAlign: "middle",
    ...offset !== void 0 ? { "--w3f-badge-offset": offset } : {},
    ...style
  }), [style, offset]);
  const wrapperClasses = React50.useMemo(() => {
    const classes = ["w3f-badge-wrapper"];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);
  const enhancedBadgeProps = React50.useMemo(() => {
    const defaultPosition = overlap ? "top-right" : null;
    return {
      position: defaultPosition,
      ...badgeProps
    };
  }, [badgeProps, overlap]);
  return /* @__PURE__ */ jsxs44(
    "div",
    {
      ref,
      className: wrapperClasses,
      style: wrapperStyle,
      ...rest,
      children: [
        children,
        shouldShowBadge && /* @__PURE__ */ jsx60(Badge_default, { ...enhancedBadgeProps, children: badgeContent })
      ]
    }
  );
});
BadgeWrapper.displayName = "BadgeWrapper";

// src/DATADISPLAY/BottomSheetPanel/BottomSheetPanel.tsx
import { forwardRef as forwardRef44, useRef as useRef21, useEffect as useEffect24 } from "react";

// src/DATADISPLAY/BottomSheetPanel/BottomSheetPanel.hooks.ts
import { useState as useState40, useEffect as useEffect23, useCallback as useCallback29, useRef as useRef20 } from "react";
function useBottomSheetAnimation(isOpen) {
  const [isAnimating, setIsAnimating] = useState40(false);
  const [shouldRender, setShouldRender] = useState40(false);
  const previousFocusRef = useRef20(null);
  useEffect23(() => {
    if (isOpen) {
      setShouldRender(true);
      previousFocusRef.current = document.activeElement;
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
        if (previousFocusRef.current && previousFocusRef.current.focus) {
          previousFocusRef.current.focus();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  return { isAnimating, shouldRender };
}
function useScrollLock(isOpen) {
  useEffect23(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
}
function useEscapeKey(isOpen, onClose, enabled) {
  const handleEscape = useCallback29((e) => {
    if (enabled && e.key === "Escape" && isOpen) {
      onClose();
    }
  }, [isOpen, onClose, enabled]);
  useEffect23(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);
}

// src/DATADISPLAY/BottomSheetPanel/BottomSheetPanel.constants.ts
var SIZE_MAX_HEIGHTS = {
  small: "35vh",
  medium: "60vh",
  large: "85vh",
  full: "95vh",
  auto: "calc(100vh - 64px)"
};
var BSP_DEFAULTS = {
  size: "auto",
  showCloseButton: true,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  className: "",
  unstyled: false
};

// src/DATADISPLAY/BottomSheetPanel/BottomSheetPanel.utils.ts
function getMaxHeight(size, maxHeight) {
  if (maxHeight) return maxHeight;
  return SIZE_MAX_HEIGHTS[size] ?? SIZE_MAX_HEIGHTS.auto;
}

// src/DATADISPLAY/BottomSheetPanel/BottomSheetPanel.tsx
import { jsx as jsx61, jsxs as jsxs45 } from "react/jsx-runtime";
var BottomSheetPanel = forwardRef44(({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = BSP_DEFAULTS.showCloseButton,
  closeOnBackdropClick = BSP_DEFAULTS.closeOnBackdropClick,
  closeOnEscape = BSP_DEFAULTS.closeOnEscape,
  size = BSP_DEFAULTS.size,
  maxHeight,
  className = BSP_DEFAULTS.className,
  footer,
  unstyled = BSP_DEFAULTS.unstyled
}, ref) => {
  const panelRef = useRef21(null);
  const { isAnimating, shouldRender } = useBottomSheetAnimation(isOpen);
  useScrollLock(isOpen);
  useEscapeKey(isOpen, onClose, closeOnEscape);
  useEffect24(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen]);
  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  if (!shouldRender) return null;
  const unstyledClass = unstyled ? "w3f-bottom-sheet-panel--unstyled" : "";
  const sizeClass = unstyled ? "" : size !== "auto" ? `bottom-sheet-panel--${size}` : "";
  return /* @__PURE__ */ jsx61(
    "div",
    {
      ref,
      className: `bottom-sheet-backdrop ${isAnimating ? "is-open" : ""}`,
      onClick: handleBackdropClick,
      role: "presentation",
      children: /* @__PURE__ */ jsxs45(
        "div",
        {
          ref: panelRef,
          className: `bottom-sheet-panel ${sizeClass} ${unstyledClass} ${isAnimating ? "is-open" : ""} ${className}`.trim().replace(/\s+/g, " "),
          style: size === "auto" && !maxHeight ? { maxHeight: "calc(100vh - 64px)" } : { height: getMaxHeight(size, maxHeight), maxHeight: getMaxHeight(size, maxHeight) },
          onClick: (e) => e.stopPropagation(),
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": title ? "bottom-sheet-title" : void 0,
          tabIndex: -1,
          children: [
            (title || showCloseButton) && /* @__PURE__ */ jsxs45("div", { className: "bottom-sheet-header", children: [
              title && /* @__PURE__ */ jsx61("h3", { id: "bottom-sheet-title", className: "bottom-sheet-title", children: title }),
              showCloseButton && /* @__PURE__ */ jsx61(
                "button",
                {
                  onClick: onClose,
                  className: "bottom-sheet-close-btn",
                  "aria-label": "Cerrar panel",
                  type: "button",
                  children: /* @__PURE__ */ jsx61(
                    "svg",
                    {
                      width: "24",
                      height: "24",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      children: /* @__PURE__ */ jsx61("path", { d: "M18 6L6 18M6 6l12 12" })
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx61("div", { className: "bottom-sheet-content", children }),
            footer && /* @__PURE__ */ jsx61("div", { className: "bottom-sheet-footer", children: footer })
          ]
        }
      )
    }
  );
});
BottomSheetPanel.displayName = "BottomSheetPanel";

// src/DATADISPLAY/Card_2/Card_2.tsx
import React52, { forwardRef as forwardRef45 } from "react";

// src/DATADISPLAY/Card_2/Card_2.constants.ts
var CARD2_DEFAULTS = {
  variant: "default",
  size: "md",
  actionsAlign: "start",
  hoverable: false,
  clickable: false,
  fullWidth: false,
  unstyled: false,
  imageAlt: "",
  className: ""
};
var CARD2_CLASSES = {
  // Root
  root: "w3f-card",
  // Layout base (from _layout-primitive.css)
  layout: "w3f-layout",
  // Variants
  default: "w3f-card--default",
  elevated: "w3f-card--elevated",
  outlined: "w3f-card--outlined",
  filled: "w3f-card--filled",
  // Sizes
  sm: "w3f-card--sm",
  md: "w3f-card--md",
  lg: "w3f-card--lg",
  fullWidth: "w3f-card--full-width",
  // States
  hoverable: "w3f-card--hoverable",
  clickable: "w3f-card--clickable",
  // Slot children (from _layout-primitive.css)
  slotHeader: "w3f-slot-header",
  slotMedia: "w3f-slot-media",
  slotContent: "w3f-slot-content",
  slotActions: "w3f-slot-actions",
  slotActionArea: "w3f-slot-action-area",
  slotCustom: "w3f-slot-custom",
  // Badge (absolutely positioned — no grid area needed)
  badge: "w3f-card-badge",
  // Inner elements
  title: "w3f-card-title",
  subtitle: "w3f-card-subtitle",
  headerExtra: "w3f-card-header-extra",
  image: "w3f-card-image"
};

// src/DATADISPLAY/Card_2/Card_2.utils.ts
function buildCard2Classes(variant, size, hoverable, clickable, hasClick, fullWidth, layoutName, unstyled, className) {
  const base = CARD2_CLASSES.root;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    CARD2_CLASSES.layout,
    `w3f-card--${variant}`,
    `w3f-card--${size}`,
    hoverable ? CARD2_CLASSES.hoverable : "",
    clickable || hasClick ? CARD2_CLASSES.clickable : "",
    fullWidth ? CARD2_CLASSES.fullWidth : "",
    layoutName ? `w3f-card-layout--${layoutName}` : "",
    className
  ].filter(Boolean).join(" ");
}
function buildCard2ActionsClasses(actionsAlign) {
  return [CARD2_CLASSES.slotActions, `w3f-card-actions--${actionsAlign}`].filter(Boolean).join(" ");
}

// src/DATADISPLAY/Card_2/Card_2.tsx
import { jsx as jsx62, jsxs as jsxs46 } from "react/jsx-runtime";
var Card_2 = forwardRef45(({
  layoutName,
  layoutStyle,
  variant = CARD2_DEFAULTS.variant,
  size = CARD2_DEFAULTS.size,
  hoverable = CARD2_DEFAULTS.hoverable,
  clickable = CARD2_DEFAULTS.clickable,
  onClick,
  unstyled = CARD2_DEFAULTS.unstyled,
  className = CARD2_DEFAULTS.className,
  style,
  fullWidth = CARD2_DEFAULTS.fullWidth,
  badge,
  title,
  subtitle,
  headerExtra,
  imageSrc,
  imageAlt = CARD2_DEFAULTS.imageAlt,
  content,
  actions,
  buttons = [],
  actionsAlign = CARD2_DEFAULTS.actionsAlign,
  actionAreaContent,
  customContent
}, ref) => {
  const cardClasses = buildCard2Classes(
    variant,
    size,
    hoverable,
    clickable,
    !!onClick,
    fullWidth,
    layoutName,
    unstyled,
    className
  );
  const mergedStyle = layoutStyle ? { ...layoutStyle, ...style } : style;
  const handleClick = (e) => {
    const target = e.target;
    if (onClick && !target.closest("button, a, input, textarea, select")) {
      onClick(e);
    }
  };
  const handleKeyDown = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(e);
    }
  };
  const interactiveProps = clickable || onClick ? { role: "button", tabIndex: 0, onClick: handleClick, onKeyDown: handleKeyDown, "aria-pressed": false } : {};
  const renderBadge = () => {
    if (!badge) return null;
    if (typeof badge === "object" && !React52.isValidElement(badge)) {
      const {
        children: badgeChildren,
        content: badgeContent,
        ...badgeRestProps
      } = badge;
      const finalContent = badgeChildren !== void 0 ? badgeChildren : badgeContent;
      return /* @__PURE__ */ jsx62("div", { className: "w3f-card-badge", children: /* @__PURE__ */ jsx62(Badge_default, { ...badgeRestProps, children: finalContent }) });
    }
    if (React52.isValidElement(badge)) {
      return /* @__PURE__ */ jsx62("div", { className: "w3f-card-badge", children: badge });
    }
    return /* @__PURE__ */ jsx62("div", { className: "w3f-card-badge", children: /* @__PURE__ */ jsx62(Badge_default, { color: "primary", size: "md", children: badge }) });
  };
  const renderHeader = () => {
    if (!title && !subtitle && !headerExtra) return null;
    return /* @__PURE__ */ jsxs46("header", { className: "w3f-slot-header", children: [
      title && /* @__PURE__ */ jsx62("h3", { className: "w3f-card-title", children: title }),
      subtitle && /* @__PURE__ */ jsx62("p", { className: "w3f-card-subtitle", children: subtitle }),
      headerExtra && /* @__PURE__ */ jsx62("div", { className: "w3f-card-header-extra", children: headerExtra })
    ] });
  };
  const renderMedia = () => {
    if (!imageSrc) return null;
    return /* @__PURE__ */ jsx62("div", { className: "w3f-slot-media", children: /* @__PURE__ */ jsx62(
      "img",
      {
        src: sanitizeUrl(imageSrc),
        alt: imageAlt,
        className: "w3f-card-image",
        loading: "lazy"
      }
    ) });
  };
  const renderContent = () => {
    if (!content) return null;
    return /* @__PURE__ */ jsx62("div", { className: "w3f-slot-content", children: content });
  };
  const renderActions = () => {
    if (!actions && (!buttons || buttons.length === 0)) return null;
    const actionsClasses = buildCard2ActionsClasses(actionsAlign);
    return /* @__PURE__ */ jsxs46("div", { className: actionsClasses, children: [
      actions,
      !actions && buttons.map((buttonProps, index) => {
        const { key, ...rest } = buttonProps;
        return /* @__PURE__ */ jsx62(Button_default, { ...rest }, key || `c2-btn-${index}`);
      })
    ] });
  };
  const renderActionArea = () => {
    if (!actionAreaContent) return null;
    return /* @__PURE__ */ jsx62("div", { className: "w3f-slot-action-area", children: actionAreaContent });
  };
  const renderCustom = () => {
    if (!customContent) return null;
    return /* @__PURE__ */ jsx62("div", { className: "w3f-slot-custom", children: customContent });
  };
  return /* @__PURE__ */ jsxs46("div", { ref, className: cardClasses, style: mergedStyle, ...interactiveProps, children: [
    renderBadge(),
    renderHeader(),
    renderMedia(),
    renderContent(),
    renderActions(),
    renderActionArea(),
    renderCustom()
  ] });
});
Card_2.displayName = "Card_2";

// src/DATADISPLAY/Chip/Chip.tsx
import React53 from "react";

// src/DATADISPLAY/Chip/Chip.constants.ts
var CHIP_DEFAULTS = {
  disabled: false,
  isFocused: false,
  unstyled: false
};
var CHIP_VARIANT_CLASSES = {
  solid: "w3f-chip--solid",
  outlined: "w3f-chip--outlined",
  ghost: "w3f-chip--ghost",
  soft: "w3f-chip--soft"
};

// src/DATADISPLAY/Chip/Chip.utils.ts
var buildChipClasses = (disabled, isFocused, className, unstyled, variant) => {
  if (unstyled) {
    return ["w3f-chip", "w3f-chip--unstyled", className].filter(Boolean).join(" ");
  }
  const classes = ["w3f-chip"];
  if (disabled) classes.push("w3f-chip--disabled");
  if (isFocused) classes.push("w3f-chip--focused");
  if (variant) classes.push(CHIP_VARIANT_CLASSES[variant]);
  if (className) classes.push(className);
  return classes.join(" ");
};

// src/DATADISPLAY/Chip/Chip.tsx
import { useBridgeBind as useBridgeBind19 } from "@w3f/bridge";
import { jsx as jsx63, jsxs as jsxs47 } from "react/jsx-runtime";
var Chip = React53.forwardRef(({
  label,
  variant,
  onClose,
  disabled = CHIP_DEFAULTS.disabled,
  onKeyDown,
  onFocus,
  onBlur,
  onClick,
  isFocused = CHIP_DEFAULTS.isFocused,
  className,
  style,
  unstyled = CHIP_DEFAULTS.unstyled,
  bindId
}, ref) => {
  const { dispatch } = useBridgeBind19({ bindId });
  const chipClasses = buildChipClasses(disabled, isFocused, className, unstyled, variant);
  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === "Delete" || e.key === "Backspace") && onClose && !disabled) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
    onKeyDown?.(e);
  };
  return /* @__PURE__ */ jsxs47(
    "div",
    {
      ref,
      className: chipClasses,
      tabIndex: disabled ? -1 : 0,
      role: "button",
      "aria-label": `${label}${onClose ? ", presione Enter o Suprimir para eliminar" : ""}`,
      "aria-disabled": disabled,
      onKeyDown: handleKeyDown,
      onFocus,
      onBlur,
      onClick: (e) => {
        onClick?.(e);
        dispatch("click");
      },
      style,
      children: [
        /* @__PURE__ */ jsx63("span", { className: "w3f-chip__label", children: label }),
        onClose && !disabled && /* @__PURE__ */ jsx63(
          "span",
          {
            onClick: (e) => {
              e.stopPropagation();
              onClose();
              dispatch("change", { action: "close" });
            },
            className: "w3f-chip-close",
            title: "Eliminar",
            role: "button",
            "aria-label": "Eliminar chip",
            children: "\xD7"
          }
        )
      ]
    }
  );
});
Chip.displayName = "Chip";
var Chip_default = Chip;

// src/DATADISPLAY/Chip/InputChipContainer.tsx
import { useRef as useRef22, useEffect as useEffect25, useCallback as useCallback31 } from "react";

// src/DATADISPLAY/Chip/Chip.hooks.ts
import { useState as useState41, useCallback as useCallback30 } from "react";
function useChipManager() {
  const [chips, setChips] = useState41([]);
  const [inputValue, setInputValue] = useState41("");
  const addChip = useCallback30((value) => {
    const trimmedValue = value.trim();
    if (trimmedValue === "") return false;
    const isDuplicate = chips.some(
      (chip) => chip.label.toLowerCase() === trimmedValue.toLowerCase()
    );
    if (isDuplicate) return false;
    const newChip = {
      id: Date.now(),
      label: trimmedValue
    };
    setChips((prev) => [...prev, newChip]);
    setInputValue("");
    return true;
  }, [chips]);
  const removeChip = useCallback30((idToRemove) => {
    let removedIndex = -1;
    setChips((prev) => {
      removedIndex = prev.findIndex((chip) => chip.id === idToRemove);
      return prev.filter((chip) => chip.id !== idToRemove);
    });
    return removedIndex;
  }, []);
  return { chips, inputValue, setInputValue, addChip, removeChip };
}
function useChipNavigation(chips, inputValue, inputRef, chipRefs, onAddChip, onRemoveChip) {
  const [focusedChipIndex, setFocusedChipIndex] = useState41(null);
  const handleContainerKeyDown = useCallback30((event) => {
    const isInputFocused = document.activeElement === inputRef.current;
    switch (event.key) {
      case "ArrowLeft":
        if (isInputFocused && chips.length > 0 && inputRef.current?.selectionStart === 0) {
          event.preventDefault();
          setFocusedChipIndex(chips.length - 1);
        } else if (focusedChipIndex !== null && focusedChipIndex > 0) {
          event.preventDefault();
          setFocusedChipIndex(focusedChipIndex - 1);
        }
        break;
      case "ArrowRight":
        if (focusedChipIndex !== null) {
          event.preventDefault();
          if (focusedChipIndex < chips.length - 1) {
            setFocusedChipIndex(focusedChipIndex + 1);
          } else {
            setFocusedChipIndex(null);
            inputRef.current?.focus();
          }
        }
        break;
      case "Backspace":
      case "Delete":
        if (focusedChipIndex !== null) {
          event.preventDefault();
          const chipToRemove = chips[focusedChipIndex];
          if (chipToRemove) {
            onRemoveChip(chipToRemove.id);
            const newLength = chips.length - 1;
            if (newLength === 0) {
              setFocusedChipIndex(null);
              requestAnimationFrame(() => inputRef.current?.focus());
            } else {
              setFocusedChipIndex(focusedChipIndex > 0 ? focusedChipIndex - 1 : 0);
            }
          }
        } else if (isInputFocused && !inputValue && chips.length > 0 && event.key === "Backspace") {
          event.preventDefault();
          setFocusedChipIndex(chips.length - 1);
        }
        break;
      case "Enter":
        if (isInputFocused) {
          event.preventDefault();
          onAddChip();
        }
        break;
      case "Escape":
        if (focusedChipIndex !== null) {
          event.preventDefault();
          setFocusedChipIndex(null);
          inputRef.current?.focus();
        }
        break;
    }
  }, [chips, focusedChipIndex, inputValue, inputRef, onAddChip, onRemoveChip]);
  return { focusedChipIndex, setFocusedChipIndex, handleContainerKeyDown };
}

// src/DATADISPLAY/Chip/InputChipContainer.tsx
import { jsx as jsx64, jsxs as jsxs48 } from "react/jsx-runtime";
var InputChipContainer = () => {
  const inputRef = useRef22(null);
  const chipRefs = useRef22([]);
  const containerRef = useRef22(null);
  const { chips, inputValue, setInputValue, addChip, removeChip } = useChipManager();
  const handleAddChip = useCallback31(() => {
    if (addChip(inputValue)) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [inputValue, addChip]);
  const handleRemoveChip = useCallback31((id) => {
    removeChip(id);
  }, [removeChip]);
  const { focusedChipIndex, setFocusedChipIndex, handleContainerKeyDown } = useChipNavigation(
    chips,
    inputValue,
    inputRef,
    chipRefs,
    handleAddChip,
    handleRemoveChip
  );
  useEffect25(() => {
    if (focusedChipIndex !== null && chipRefs.current[focusedChipIndex]) {
      chipRefs.current[focusedChipIndex].focus();
    }
  }, [focusedChipIndex]);
  useEffect25(() => {
    chipRefs.current = chipRefs.current.slice(0, chips.length);
  }, [chips.length]);
  return /* @__PURE__ */ jsxs48(
    "div",
    {
      ref: containerRef,
      className: "w3f-chip-input-container",
      onKeyDown: handleContainerKeyDown,
      role: "group",
      "aria-label": "Editor de etiquetas con navegaci\xF3n por teclado",
      children: [
        /* @__PURE__ */ jsxs48("div", { className: "w3f-chip-wrapper", children: [
          chips.map((chip, index) => /* @__PURE__ */ jsx64(
            Chip_default,
            {
              ref: (el) => {
                chipRefs.current[index] = el;
              },
              label: chip.label,
              onClose: () => handleRemoveChip(chip.id),
              isFocused: index === focusedChipIndex,
              onFocus: () => setFocusedChipIndex(index),
              onClick: () => setFocusedChipIndex(index)
            },
            chip.id
          )),
          /* @__PURE__ */ jsx64(
            "input",
            {
              ref: inputRef,
              className: "w3f-chip-input-field",
              type: "text",
              placeholder: chips.length > 0 ? "" : "Escriba una etiqueta y presione Enter...",
              value: inputValue,
              onChange: (e) => setInputValue(e.target.value),
              onFocus: () => setFocusedChipIndex(null),
              "aria-label": "A\xF1adir nueva etiqueta",
              "aria-describedby": "chip-help"
            }
          )
        ] }),
        /* @__PURE__ */ jsx64("div", { id: "chip-help", className: "w3f-chip-help", children: /* @__PURE__ */ jsxs48("p", { style: { margin: 0 }, children: [
          /* @__PURE__ */ jsx64("strong", { children: "Navegaci\xF3n:" }),
          " \u2190 \u2192 mover entre chips, ",
          /* @__PURE__ */ jsx64("strong", { children: "Enter" }),
          " agregar, ",
          /* @__PURE__ */ jsx64("strong", { children: "Backspace/Supr" }),
          " eliminar, ",
          /* @__PURE__ */ jsx64("strong", { children: "Esc" }),
          " volver al input"
        ] }) })
      ]
    }
  );
};
InputChipContainer.displayName = "InputChipContainer";

// src/DATADISPLAY/Console/Console.tsx
import React55 from "react";

// src/DATADISPLAY/Console/Console.constants.ts
var CONSOLE_DEFAULTS = {
  title: "Console",
  maxMessages: 500,
  showTimestamps: true,
  showLevelFilter: true,
  showSearch: false,
  showClearButton: true,
  showExportButton: false,
  defaultLevel: "all",
  height: "280px",
  theme: "dark",
  className: "",
  unstyled: false
};
var CONSOLE_CLASSES = {
  root: "w3f-console",
  themeDark: "w3f-console--dark",
  themeLight: "w3f-console--light",
  // Header
  header: "w3f-console-header",
  headerLeft: "w3f-console-header-left",
  headerRight: "w3f-console-header-right",
  title: "w3f-console-title",
  badge: "w3f-console-badge",
  // Controles
  controls: "w3f-console-controls",
  search: "w3f-console-search",
  searchInput: "w3f-console-search-input",
  actionBtn: "w3f-console-action-btn",
  // Filtro de nivel
  filter: "w3f-console-filter",
  filterBtn: "w3f-console-filter-btn",
  filterBtnActive: "w3f-console-filter-btn--active",
  filterInfo: "w3f-console-filter-btn--info",
  filterWarn: "w3f-console-filter-btn--warn",
  filterError: "w3f-console-filter-btn--error",
  filterSuccess: "w3f-console-filter-btn--success",
  filterDebug: "w3f-console-filter-btn--debug",
  // Área de mensajes
  body: "w3f-console-body",
  empty: "w3f-console-empty",
  // Mensaje individual
  message: "w3f-console-message",
  messageInfo: "w3f-console-message--info",
  messageWarn: "w3f-console-message--warn",
  messageError: "w3f-console-message--error",
  messageSuccess: "w3f-console-message--success",
  messageDebug: "w3f-console-message--debug",
  messageTimestamp: "w3f-console-message-timestamp",
  messageLevel: "w3f-console-message-level",
  messageLabel: "w3f-console-message-label",
  messageContent: "w3f-console-message-content",
  messageJson: "w3f-console-message-json",
  // Children slot
  children: "w3f-console-children"
};
var CONSOLE_LEVELS = [
  "all",
  "info",
  "success",
  "warn",
  "error",
  "debug"
];
var CONSOLE_LEVEL_LABELS = {
  all: "All",
  info: "Info",
  success: "OK",
  warn: "Warn",
  error: "Error",
  debug: "Debug"
};

// src/DATADISPLAY/Console/Console.utils.ts
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function createMessage(content, level = "info", label) {
  return {
    id: generateId(),
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    content,
    level,
    label
  };
}
function formatTimestamp(isoString) {
  return new Date(isoString).toLocaleTimeString(void 0, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
function isJsonable(value) {
  return typeof value === "object" && value !== null;
}
function formatContentAsString(content) {
  if (content === null) return "null";
  if (content === void 0) return "undefined";
  if (typeof content === "string") return content;
  if (typeof content === "number" || typeof content === "boolean") return String(content);
  return JSON.stringify(content, null, 2);
}
function buildConsoleClasses(theme, unstyled, className) {
  const base = CONSOLE_CLASSES.root;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    theme === "dark" ? CONSOLE_CLASSES.themeDark : CONSOLE_CLASSES.themeLight,
    className
  ].filter(Boolean).join(" ");
}
function buildMessageClasses(level) {
  const levelMap = {
    info: CONSOLE_CLASSES.messageInfo,
    warn: CONSOLE_CLASSES.messageWarn,
    error: CONSOLE_CLASSES.messageError,
    success: CONSOLE_CLASSES.messageSuccess,
    debug: CONSOLE_CLASSES.messageDebug
  };
  return [CONSOLE_CLASSES.message, levelMap[level]].filter(Boolean).join(" ");
}
function buildFilterBtnClasses(level, activeLevel) {
  const levelMap = {
    info: CONSOLE_CLASSES.filterInfo,
    warn: CONSOLE_CLASSES.filterWarn,
    error: CONSOLE_CLASSES.filterError,
    success: CONSOLE_CLASSES.filterSuccess,
    debug: CONSOLE_CLASSES.filterDebug
  };
  return [
    CONSOLE_CLASSES.filterBtn,
    levelMap[level] ?? "",
    level === activeLevel ? CONSOLE_CLASSES.filterBtnActive : ""
  ].filter(Boolean).join(" ");
}
function filterMessages(messages, levelFilter, searchQuery) {
  return messages.filter((msg) => {
    if (levelFilter !== "all" && msg.level !== levelFilter) return false;
    if (searchQuery) {
      const text = formatContentAsString(msg.content).toLowerCase();
      const label = (msg.label ?? "").toLowerCase();
      const q = searchQuery.toLowerCase();
      if (!text.includes(q) && !label.includes(q)) return false;
    }
    return true;
  });
}
function exportMessagesAsLog(messages) {
  const text = messages.map(
    (m) => `[${formatTimestamp(m.timestamp)}] [${m.level.toUpperCase()}]${m.label ? ` (${m.label})` : ""} ${formatContentAsString(m.content)}`
  ).join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `console-${Date.now()}.log`;
  a.click();
  URL.revokeObjectURL(url);
}

// src/DATADISPLAY/Console/Console.hooks.ts
import { useState as useState42, useCallback as useCallback32, useRef as useRef23, useEffect as useEffect26, useContext as useContext24 } from "react";

// src/DATADISPLAY/Console/Console.context.ts
import { createContext as createContext6 } from "react";
var ConsoleContext = createContext6(null);

// src/DATADISPLAY/Console/Console.hooks.ts
function useConsoleState(maxMessages) {
  const [messages, setMessages] = useState42([]);
  const logMessage = useCallback32(
    (content, level = "info", label) => {
      const msg = createMessage(content, level, label);
      setMessages((prev) => {
        const next = [...prev, msg];
        return next.length > maxMessages ? next.slice(next.length - maxMessages) : next;
      });
    },
    [maxMessages]
  );
  const log = useCallback32(
    (content, label) => logMessage(content, "info", label),
    [logMessage]
  );
  const warn = useCallback32(
    (content, label) => logMessage(content, "warn", label),
    [logMessage]
  );
  const error = useCallback32(
    (content, label) => logMessage(content, "error", label),
    [logMessage]
  );
  const success = useCallback32(
    (content, label) => logMessage(content, "success", label),
    [logMessage]
  );
  const debug = useCallback32(
    (content, label) => logMessage(content, "debug", label),
    [logMessage]
  );
  const clear = useCallback32(() => setMessages([]), []);
  return { messages, logMessage, log, warn, error, success, debug, clear };
}
function useConsoleFilter(defaultLevel) {
  const [levelFilter, setLevelFilter] = useState42(defaultLevel);
  const [searchQuery, setSearchQuery] = useState42("");
  return { levelFilter, setLevelFilter, searchQuery, setSearchQuery };
}
function useAutoScroll(messages) {
  const bodyRef = useRef23(null);
  useEffect26(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);
  return bodyRef;
}

// src/DATADISPLAY/Console/Console.tsx
import { jsx as jsx65, jsxs as jsxs49 } from "react/jsx-runtime";
var ConsoleMessageLine = ({ message, showTimestamp }) => {
  const { id, timestamp, content, level, label } = message;
  const cls = buildMessageClasses(level);
  const jsonContent = isJsonable(content);
  return /* @__PURE__ */ jsxs49("div", { className: cls, children: [
    showTimestamp && /* @__PURE__ */ jsx65("span", { className: CONSOLE_CLASSES.messageTimestamp, children: formatTimestamp(timestamp) }),
    /* @__PURE__ */ jsxs49("span", { className: CONSOLE_CLASSES.messageLevel, children: [
      "[",
      level.toUpperCase(),
      "]"
    ] }),
    label && /* @__PURE__ */ jsx65("span", { className: CONSOLE_CLASSES.messageLabel, children: label }),
    /* @__PURE__ */ jsx65("span", { className: CONSOLE_CLASSES.messageContent, children: jsonContent ? /* @__PURE__ */ jsx65("pre", { className: CONSOLE_CLASSES.messageJson, children: JSON.stringify(content, null, 2) }) : formatContentAsString(content) })
  ] }, id);
};
var Console = React55.forwardRef(({
  children,
  title = CONSOLE_DEFAULTS.title,
  maxMessages = CONSOLE_DEFAULTS.maxMessages,
  showTimestamps = CONSOLE_DEFAULTS.showTimestamps,
  showLevelFilter = CONSOLE_DEFAULTS.showLevelFilter,
  showSearch = CONSOLE_DEFAULTS.showSearch,
  showClearButton = CONSOLE_DEFAULTS.showClearButton,
  showExportButton = CONSOLE_DEFAULTS.showExportButton,
  defaultLevel = CONSOLE_DEFAULTS.defaultLevel,
  onExport,
  height = CONSOLE_DEFAULTS.height,
  theme = CONSOLE_DEFAULTS.theme,
  className = CONSOLE_DEFAULTS.className,
  unstyled = CONSOLE_DEFAULTS.unstyled
}, ref) => {
  const consoleState = useConsoleState(maxMessages);
  const { messages, clear } = consoleState;
  const { levelFilter, setLevelFilter, searchQuery, setSearchQuery } = useConsoleFilter(defaultLevel);
  const bodyRef = useAutoScroll(messages);
  const visibleMessages = filterMessages(messages, levelFilter, searchQuery);
  const counts = messages.reduce(
    (acc, m) => ({ ...acc, [m.level]: (acc[m.level] ?? 0) + 1 }),
    {}
  );
  const handleExport = () => {
    if (onExport) {
      onExport(messages);
    } else {
      exportMessagesAsLog(messages);
    }
  };
  const rootCls = buildConsoleClasses(theme, unstyled, className);
  return /* @__PURE__ */ jsxs49(ConsoleContext.Provider, { value: consoleState, children: [
    children && /* @__PURE__ */ jsx65("div", { className: CONSOLE_CLASSES.children, children }),
    /* @__PURE__ */ jsxs49("div", { ref, className: rootCls, children: [
      /* @__PURE__ */ jsxs49("div", { className: CONSOLE_CLASSES.header, children: [
        /* @__PURE__ */ jsxs49("div", { className: CONSOLE_CLASSES.headerLeft, children: [
          /* @__PURE__ */ jsx65("span", { className: CONSOLE_CLASSES.title, children: title }),
          /* @__PURE__ */ jsx65("span", { className: CONSOLE_CLASSES.badge, children: messages.length })
        ] }),
        /* @__PURE__ */ jsxs49("div", { className: CONSOLE_CLASSES.headerRight, children: [
          showLevelFilter && /* @__PURE__ */ jsx65("div", { className: CONSOLE_CLASSES.filter, children: CONSOLE_LEVELS.map((lvl) => /* @__PURE__ */ jsxs49(
            "button",
            {
              type: "button",
              className: buildFilterBtnClasses(lvl, levelFilter),
              onClick: () => setLevelFilter(lvl),
              title: `${lvl === "all" ? "Todos" : lvl}${counts[lvl] ? ` (${counts[lvl]})` : ""}`,
              children: [
                CONSOLE_LEVEL_LABELS[lvl],
                lvl !== "all" && counts[lvl] ? /* @__PURE__ */ jsx65("span", { className: CONSOLE_CLASSES.badge, children: counts[lvl] }) : null
              ]
            },
            lvl
          )) }),
          showSearch && /* @__PURE__ */ jsx65("div", { className: CONSOLE_CLASSES.search, children: /* @__PURE__ */ jsx65(
            "input",
            {
              type: "text",
              className: CONSOLE_CLASSES.searchInput,
              placeholder: "Buscar...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              "aria-label": "Buscar en consola"
            }
          ) }),
          showExportButton && /* @__PURE__ */ jsx65(
            "button",
            {
              type: "button",
              className: CONSOLE_CLASSES.actionBtn,
              onClick: handleExport,
              title: "Exportar log",
              "aria-label": "Exportar",
              children: "\u2193"
            }
          ),
          showClearButton && /* @__PURE__ */ jsx65(
            "button",
            {
              type: "button",
              className: CONSOLE_CLASSES.actionBtn,
              onClick: clear,
              title: "Limpiar consola",
              "aria-label": "Limpiar",
              children: "\u2715"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx65(
        "div",
        {
          ref: bodyRef,
          className: CONSOLE_CLASSES.body,
          style: { height },
          role: "log",
          "aria-live": "polite",
          "aria-label": title,
          children: visibleMessages.length === 0 ? /* @__PURE__ */ jsx65("div", { className: CONSOLE_CLASSES.empty, children: messages.length === 0 ? "\u25B6 Esperando mensajes\u2026" : "Sin resultados para el filtro activo." }) : visibleMessages.map((msg) => /* @__PURE__ */ jsx65(
            ConsoleMessageLine,
            {
              message: msg,
              showTimestamp: showTimestamps
            },
            msg.id
          ))
        }
      )
    ] })
  ] });
});
Console.displayName = "Console";

// src/DATADISPLAY/Dialog/Modal.tsx
import { useCallback as useCallback34, useRef as useRef24 } from "react";

// src/DATADISPLAY/Dialog/Modal.constants.ts
var MODAL_DEFAULTS = {
  size: "md",
  closeOnBackdrop: true,
  showCloseButton: true,
  headerVariant: "primary",
  unstyled: false
};
var MODAL_CONFIRM_DEFAULTS = {
  title: "\xBFEst\xE1s seguro?",
  confirmText: "Confirmar",
  cancelText: "Cancelar",
  variant: "danger"
};

// src/DATADISPLAY/Dialog/Modal.hooks.ts
import { useEffect as useEffect27, useCallback as useCallback33 } from "react";
function useModal(isOpen) {
  useEffect27(() => {
    if (isOpen) {
      document.body.classList.add("w3f-modal-open");
      const focusableElements = document.querySelectorAll(
        '.w3f-modal-card button, .w3f-modal-card [href], .w3f-modal-card input, .w3f-modal-card select, .w3f-modal-card textarea, .w3f-modal-card [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    } else {
      document.body.classList.remove("w3f-modal-open");
    }
    return () => {
      document.body.classList.remove("w3f-modal-open");
    };
  }, [isOpen]);
}
function useEscapeKey2(isOpen, onClose) {
  const handleEscape = useCallback33((e) => {
    if (e.key === "Escape" && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);
  useEffect27(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);
}

// src/DATADISPLAY/Dialog/Modal.tsx
import { Fragment as Fragment11, jsx as jsx66, jsxs as jsxs50 } from "react/jsx-runtime";
var Modal = ({
  show,
  onClose,
  title,
  children,
  size = MODAL_DEFAULTS.size,
  closeOnBackdrop = MODAL_DEFAULTS.closeOnBackdrop,
  showCloseButton = MODAL_DEFAULTS.showCloseButton,
  footer,
  headerVariant = MODAL_DEFAULTS.headerVariant,
  unstyled = MODAL_DEFAULTS.unstyled
}) => {
  const modalRef = useRef24(null);
  useModal(show);
  useEscapeKey2(show, onClose);
  const handleBackdropClick = useCallback34((e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  }, [closeOnBackdrop, onClose]);
  const unstyledMod = unstyled ? " w3f-dialog--unstyled" : "";
  const backdropClass = show ? `w3f-modal-backdrop is-open${unstyledMod}` : `w3f-modal-backdrop${unstyledMod}`;
  const sizeClass = unstyled ? "" : size !== "md" ? `w3f-modal-${size}` : "";
  return /* @__PURE__ */ jsx66(Fragment11, { children: /* @__PURE__ */ jsx66("div", { className: backdropClass, onClick: handleBackdropClick, children: /* @__PURE__ */ jsxs50("div", { className: `w3f-modal-card ${sizeClass}`, ref: modalRef, role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title", children: [
    /* @__PURE__ */ jsxs50("header", { className: `w3f-modal-header w3f-bg-${headerVariant}`, children: [
      /* @__PURE__ */ jsx66("h2", { id: "modal-title", className: "w3f-modal-title", children: title }),
      showCloseButton && /* @__PURE__ */ jsx66(
        Button_default,
        {
          onClick: onClose,
          className: "w3f-modal-close-icon",
          "aria-label": "Cerrar modal",
          variant: "text",
          color: "secondary",
          children: "\xD7"
        }
      )
    ] }),
    /* @__PURE__ */ jsx66("div", { className: "w3f-modal-body", children }),
    footer && /* @__PURE__ */ jsx66("footer", { className: "w3f-modal-footer", children: footer })
  ] }) }) });
};
Modal.displayName = "Modal";
var Modal_default = Modal;

// src/DATADISPLAY/Dialog/ModalConfirm.tsx
import { Fragment as Fragment12, jsx as jsx67, jsxs as jsxs51 } from "react/jsx-runtime";
var ModalConfirm = ({
  show,
  onClose,
  onConfirm,
  title = MODAL_CONFIRM_DEFAULTS.title,
  message,
  confirmText = MODAL_CONFIRM_DEFAULTS.confirmText,
  cancelText = MODAL_CONFIRM_DEFAULTS.cancelText,
  variant = MODAL_CONFIRM_DEFAULTS.variant
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  return /* @__PURE__ */ jsx67(
    Modal_default,
    {
      show,
      onClose,
      title,
      size: "sm",
      footer: /* @__PURE__ */ jsxs51(Fragment12, { children: [
        /* @__PURE__ */ jsx67(Button_default, { variant: "outlined", color: "secondary", onClick: onClose, children: cancelText }),
        /* @__PURE__ */ jsx67(Button_default, { variant: "raised", color: variant, onClick: handleConfirm, children: confirmText })
      ] }),
      children: /* @__PURE__ */ jsx67("p", { style: { margin: 0, color: "var(--w3f-on-surface)" }, children: message })
    }
  );
};
ModalConfirm.displayName = "ModalConfirm";

// src/DATADISPLAY/Dialog/ModalSimple.tsx
import { jsx as jsx68 } from "react/jsx-runtime";
var ModalSimple = ({ show, onClose, title, children, size = "md" }) => {
  return /* @__PURE__ */ jsx68(Modal_default, { show, onClose, title, size, children });
};
ModalSimple.displayName = "ModalSimple";

// src/DATADISPLAY/Dialog/ModalWithData.tsx
import { jsx as jsx69, jsxs as jsxs52 } from "react/jsx-runtime";
var ModalWithData = ({ show, onClose, title, data, size = "md" }) => {
  return /* @__PURE__ */ jsx69(
    Modal_default,
    {
      show,
      onClose,
      title,
      size,
      footer: /* @__PURE__ */ jsx69(Button_default, { variant: "raised", color: "danger", onClick: onClose, children: "Cerrar" }),
      children: data ? /* @__PURE__ */ jsxs52("div", { className: "w3f-modal-data-card", children: [
        /* @__PURE__ */ jsx69("h3", { children: "Detalles del Usuario" }),
        /* @__PURE__ */ jsxs52("div", { className: "w3f-modal-data-item", children: [
          /* @__PURE__ */ jsx69("span", { className: "w3f-modal-data-label", children: "Nombre:" }),
          /* @__PURE__ */ jsx69("span", { className: "w3f-modal-data-value", children: data.name })
        ] }),
        /* @__PURE__ */ jsxs52("div", { className: "w3f-modal-data-item", children: [
          /* @__PURE__ */ jsx69("span", { className: "w3f-modal-data-label", children: "Email:" }),
          /* @__PURE__ */ jsx69("span", { className: "w3f-modal-data-value", children: data.email })
        ] }),
        data.phone && /* @__PURE__ */ jsxs52("div", { className: "w3f-modal-data-item", children: [
          /* @__PURE__ */ jsx69("span", { className: "w3f-modal-data-label", children: "Tel\xE9fono:" }),
          /* @__PURE__ */ jsx69("span", { className: "w3f-modal-data-value", children: data.phone })
        ] })
      ] }) : /* @__PURE__ */ jsx69("p", { style: { color: "var(--w3f-gray-500)" }, children: "No se encontraron datos para mostrar." })
    }
  );
};
ModalWithData.displayName = "ModalWithData";

// src/DATADISPLAY/Dividers/Dividers.tsx
import { forwardRef as forwardRef46 } from "react";

// src/DATADISPLAY/Dividers/Dividers.constants.ts
var DIVIDERS_DEFAULTS = {
  type: "horizontal",
  className: "",
  spacing: "16px",
  thickness: "1px",
  height: "50px",
  color: null,
  variant: "solid",
  gradient: null,
  animated: false,
  children: null,
  contentPosition: "center",
  unstyled: false
};

// src/DATADISPLAY/Dividers/Dividers.utils.ts
var SEMANTIC_COLORS = /^(primary|secondary|success|warning|danger|info|gray)$/;
var resolveColor = (color) => {
  if (SEMANTIC_COLORS.test(color)) {
    return `var(--w3f-${color})`;
  }
  return color;
};
var buildDynamicStyles = (type, variant, thickness, spacing, height, color, gradient, animated, hasChildren2, baseStyle) => {
  const styles = {};
  if (thickness !== "1px") {
    styles["--w3f-divider-thickness"] = thickness;
  }
  if (spacing !== "16px") {
    styles["--w3f-divider-spacing"] = spacing;
  }
  if (color && variant !== "gradient") {
    styles["--w3f-divider-color"] = resolveColor(color);
  }
  if (type === "vertical") {
    styles["--w3f-divider-height"] = height;
  }
  if (variant === "gradient" && gradient) {
    const fromColor = gradient.from.startsWith("#") || gradient.from.startsWith("rgb") ? gradient.from : `var(--w3f-${gradient.from})`;
    const toColor = gradient.to.startsWith("#") || gradient.to.startsWith("rgb") ? gradient.to : `var(--w3f-${gradient.to})`;
    const direction = gradient.direction || "to right";
    if (type === "horizontal") {
      styles.background = `linear-gradient(${direction}, ${fromColor}, ${toColor})`;
    } else {
      styles.background = `linear-gradient(to bottom, ${fromColor}, ${toColor})`;
    }
  }
  return { ...styles, ...baseStyle };
};
var buildLineBackgroundColor = (color) => {
  if (color) {
    return resolveColor(color);
  }
  return "var(--w3f-gray-300)";
};

// src/DATADISPLAY/Dividers/Dividers.tsx
import { jsx as jsx70, jsxs as jsxs53 } from "react/jsx-runtime";
var Dividers = forwardRef46(({
  type = DIVIDERS_DEFAULTS.type,
  className = DIVIDERS_DEFAULTS.className,
  spacing = DIVIDERS_DEFAULTS.spacing,
  thickness = DIVIDERS_DEFAULTS.thickness,
  height = DIVIDERS_DEFAULTS.height,
  color = DIVIDERS_DEFAULTS.color,
  variant = DIVIDERS_DEFAULTS.variant,
  gradient = DIVIDERS_DEFAULTS.gradient,
  animated = DIVIDERS_DEFAULTS.animated,
  children = DIVIDERS_DEFAULTS.children,
  contentStyle = {},
  contentPosition = DIVIDERS_DEFAULTS.contentPosition,
  style = {},
  unstyled = DIVIDERS_DEFAULTS.unstyled,
  ...props
}, ref) => {
  const variantClass = variant === "gradient" ? "w3f-dividers-gradient" : "";
  const animatedClass = animated ? "w3f-dividers-animated" : "";
  const cssClass = unstyled ? `w3f-dividers w3f-divider--unstyled ${className}`.trim().replace(/\s+/g, " ") : `w3f-dividers w3f-dividers-${type} ${variantClass} ${animatedClass} ${className}`.trim().replace(/\s+/g, " ");
  if (children && type === "horizontal") {
    const lineColor = buildLineBackgroundColor(color);
    const cssVars = {
      ...spacing !== "16px" ? { "--w3f-divider-spacing": spacing } : {},
      ...thickness !== "1px" ? { "--w3f-divider-thickness": thickness } : {},
      ...lineColor !== "var(--w3f-gray-300)" ? { "--w3f-divider-line-bg": lineColor } : {},
      ...style
    };
    const posClass = `w3f-dividers-with-content--${contentPosition}`;
    const lineMinClass = contentPosition !== "center" ? "w3f-dividers-line w3f-dividers-line--min" : "w3f-dividers-line";
    return /* @__PURE__ */ jsxs53(
      "div",
      {
        ref,
        className: `w3f-dividers-with-content ${posClass} ${className}`.trim(),
        style: Object.keys(cssVars).length > 0 ? cssVars : void 0,
        ...props,
        children: [
          contentPosition !== "left" && /* @__PURE__ */ jsx70("div", { className: contentPosition === "center" ? "w3f-dividers-line" : lineMinClass }),
          /* @__PURE__ */ jsx70(
            "div",
            {
              className: "w3f-dividers-content",
              style: Object.keys(contentStyle).length > 0 ? contentStyle : void 0,
              children
            }
          ),
          contentPosition !== "right" && /* @__PURE__ */ jsx70("div", { className: contentPosition === "center" ? "w3f-dividers-line" : lineMinClass })
        ]
      }
    );
  }
  const dynamicStyles = buildDynamicStyles(
    type,
    variant,
    thickness,
    spacing,
    height,
    color,
    gradient,
    animated,
    !!children,
    style
  );
  if (type === "horizontal") {
    return /* @__PURE__ */ jsx70(
      "hr",
      {
        ref,
        className: cssClass,
        style: dynamicStyles,
        ...props
      }
    );
  }
  if (type === "vertical") {
    return /* @__PURE__ */ jsx70(
      "span",
      {
        ref,
        className: cssClass,
        style: dynamicStyles,
        role: "separator",
        "aria-orientation": "vertical",
        ...props
      }
    );
  }
  return null;
});
Dividers.displayName = "Dividers";

// src/DATADISPLAY/Fonts/Fonts.constants.ts
var FONTS_DEFAULTS = {
  text: "Texto de ejemplo",
  customClasses: "",
  size: "base",
  family: "sans",
  weight: "normal",
  italic: false,
  underline: false,
  writingMode: "horizontal",
  transform: "none",
  unstyled: false
};

// src/DATADISPLAY/Fonts/Fonts.utils.ts
var TRANSFORM_MAP = {
  "rotate-45": "rotate(45deg)",
  "rotate-neg45": "rotate(-45deg)",
  "rotate-90": "rotate(90deg)",
  "rotate-neg90": "rotate(-90deg)",
  "rotate-180": "rotate(180deg)",
  "skew-left": "skewX(-20deg)",
  "skew-right": "skewX(20deg)",
  "skew-up": "skewY(-10deg)",
  "skew-down": "skewY(10deg)",
  "mirror-h": "scaleX(-1)",
  "mirror-v": "scaleY(-1)",
  "scale-wide": "scaleX(2)",
  "scale-narrow": "scaleX(0.5)",
  "scale-tall": "scaleY(2)",
  "scale-flat": "scaleY(0.4)",
  "perspective-up": "perspective(300px) rotateX(35deg)",
  "perspective-down": "perspective(300px) rotateX(-35deg)",
  "perspective-right": "perspective(300px) rotateY(45deg)",
  "perspective-left": "perspective(300px) rotateY(-45deg)",
  "perspective-3d": "perspective(400px) rotateX(20deg) rotateY(25deg)"
};
var buildFontsStyle = (writingMode, transform) => {
  const style = {};
  let hasStyle = false;
  const isStacked = writingMode === "vertical-stacked" || writingMode === "vertical-stacked-up";
  if (writingMode !== "horizontal" && !isStacked) {
    hasStyle = true;
    style.display = "inline-block";
    style.writingMode = "vertical-lr";
    const upright = writingMode === "vertical-down-upright" || writingMode === "vertical-up-upright";
    style.textOrientation = upright ? "upright" : "sideways";
    if (writingMode === "vertical-up-rotated" || writingMode === "vertical-up-upright") {
      style.transform = "rotate(180deg)";
    }
  }
  if (transform !== "none") {
    const t = TRANSFORM_MAP[transform];
    if (t) {
      hasStyle = true;
      style.display = "inline-block";
      style.transform = style.transform ? `${style.transform} ${t}` : t;
    }
  }
  return hasStyle ? style : void 0;
};
var FONT_SIZES_MAP = {
  "2xs": "w3f-text-2xs",
  "xs": "w3f-text-xs",
  "sm": "w3f-text-sm",
  "base": "w3f-text-base",
  "lg": "w3f-text-lg",
  "xl": "w3f-text-xl",
  "2xl": "w3f-text-2xl",
  "3xl": "w3f-text-3xl",
  "4xl": "w3f-text-4xl",
  "5xl": "w3f-text-5xl",
  "6xl": "w3f-text-6xl"
};
var FONT_STYLES_MAP = {
  "sans": "w3f-font-sans",
  "display": "w3f-font-display",
  "mono": "w3f-font-mono",
  "roboto": "w3f-font-roboto",
  "playfair": "w3f-font-playfair",
  "spacemono": "w3f-font-space-mono"
};
var FONT_WEIGHTS_MAP = {
  "thin": "w3f-font-thin",
  "extralight": "w3f-font-extralight",
  "light": "w3f-font-light",
  "normal": "w3f-font-normal",
  "medium": "w3f-font-medium",
  "semibold": "w3f-font-semibold",
  "bold": "w3f-font-bold",
  "extrabold": "w3f-font-extrabold",
  "black": "w3f-font-black"
};
var generateOptions = (map, labelTransform = (key) => key.toUpperCase()) => {
  return Object.keys(map).map((key) => ({
    value: key,
    label: labelTransform(key),
    className: map[key]
  }));
};
var FONT_SIZE_OPTIONS = generateOptions(FONT_SIZES_MAP, (key) => key.toUpperCase());
var FONT_FAMILY_OPTIONS = generateOptions(FONT_STYLES_MAP, (key) => key.charAt(0).toUpperCase() + key.slice(1));
var FONT_WEIGHT_OPTIONS = generateOptions(FONT_WEIGHTS_MAP, (key) => key.charAt(0).toUpperCase() + key.slice(1));
var buildFontsClasses = (size, family, weight, italic, underline, unstyled, customClasses) => {
  const base = "w3f-fonts";
  if (unstyled) return [base, `${base}--unstyled`, customClasses].filter(Boolean).join(" ");
  const classes = [
    base,
    FONT_SIZES_MAP[size] || FONT_SIZES_MAP.base,
    FONT_STYLES_MAP[family] || FONT_STYLES_MAP.sans,
    FONT_WEIGHTS_MAP[weight] || FONT_WEIGHTS_MAP.normal
  ];
  if (italic) classes.push("w3f-italic");
  if (underline) classes.push("w3f-underline");
  if (customClasses) classes.push(customClasses);
  return classes.filter(Boolean).join(" ");
};

// src/DATADISPLAY/Fonts/Fonts.tsx
import { jsx as jsx71 } from "react/jsx-runtime";
var Fonts = ({
  text = FONTS_DEFAULTS.text,
  customClasses = FONTS_DEFAULTS.customClasses,
  size = FONTS_DEFAULTS.size,
  family = FONTS_DEFAULTS.family,
  weight = FONTS_DEFAULTS.weight,
  italic = FONTS_DEFAULTS.italic,
  underline = FONTS_DEFAULTS.underline,
  writingMode = FONTS_DEFAULTS.writingMode,
  transform = FONTS_DEFAULTS.transform,
  unstyled = FONTS_DEFAULTS.unstyled,
  element: Element = "span"
}) => {
  const finalClasses = buildFontsClasses(size, family, weight, italic, underline, unstyled, customClasses);
  const style = buildFontsStyle(writingMode, transform);
  if (writingMode === "vertical-stacked" || writingMode === "vertical-stacked-up") {
    const stackStyle = {
      display: "inline-flex",
      flexDirection: writingMode === "vertical-stacked-up" ? "column-reverse" : "column",
      alignItems: "center",
      // only forward the transform prop, not any writing-mode CSS
      ...style?.transform ? { transform: style.transform } : {}
    };
    return /* @__PURE__ */ jsx71(Element, { className: finalClasses, style: stackStyle, children: [...text].map((char, i) => /* @__PURE__ */ jsx71("span", { children: char }, i)) });
  }
  return /* @__PURE__ */ jsx71(Element, { className: finalClasses, style, children: text });
};
Fonts.displayName = "Fonts";

// src/DATADISPLAY/Marquee/Marquee.tsx
import { forwardRef as forwardRef47 } from "react";

// src/DATADISPLAY/Marquee/Marquee.constants.ts
var MARQUEE_DEFAULTS = {
  direction: "left",
  speed: 30,
  pauseOnHover: true,
  gap: 24,
  repeat: 2,
  fadeEdge: 40,
  unstyled: false,
  className: ""
};

// src/DATADISPLAY/Marquee/Marquee.utils.ts
function buildMarqueeClasses(direction, pauseOnHover, unstyled, className) {
  const base = "w3f-marquee";
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  const classes = [base];
  const isVertical = direction === "up" || direction === "down";
  classes.push(isVertical ? "w3f-marquee--vertical" : "w3f-marquee--horizontal");
  if (pauseOnHover) classes.push("w3f-marquee--pause-hover");
  if (className) classes.push(className);
  return classes.join(" ");
}
function buildTrackClasses2(direction) {
  const classes = ["w3f-marquee__track"];
  switch (direction) {
    case "left":
      classes.push("w3f-marquee__track--left");
      break;
    case "right":
      classes.push("w3f-marquee__track--right");
      break;
    case "up":
      classes.push("w3f-marquee__track--up");
      break;
    case "down":
      classes.push("w3f-marquee__track--down");
      break;
  }
  return classes.join(" ");
}
function buildFadeMask(direction, fadeEdge) {
  if (fadeEdge <= 0) return void 0;
  const isVertical = direction === "up" || direction === "down";
  const axis = isVertical ? "to bottom" : "to right";
  return `linear-gradient(${axis}, transparent, black ${fadeEdge}px, black calc(100% - ${fadeEdge}px), transparent)`;
}

// src/DATADISPLAY/Marquee/Marquee.tsx
import { jsx as jsx72 } from "react/jsx-runtime";
var Marquee = forwardRef47(({
  children,
  direction = MARQUEE_DEFAULTS.direction,
  speed = MARQUEE_DEFAULTS.speed,
  pauseOnHover = MARQUEE_DEFAULTS.pauseOnHover,
  gap = MARQUEE_DEFAULTS.gap,
  repeat = MARQUEE_DEFAULTS.repeat,
  fadeEdge = MARQUEE_DEFAULTS.fadeEdge,
  unstyled = MARQUEE_DEFAULTS.unstyled,
  className = MARQUEE_DEFAULTS.className,
  style = {},
  "aria-label": ariaLabel,
  ...rest
}, ref) => {
  const safeSpeed = Math.max(0.1, Math.min(Number(speed) || 30, 600));
  const safeGap = Math.max(0, Math.min(Number(gap) || 24, 500));
  const safeRepeat = Math.max(1, Math.min(Math.floor(Number(repeat) || 2), 10));
  const safeFadeEdge = Math.max(0, Math.min(Number(fadeEdge) || 40, 500));
  const classes = buildMarqueeClasses(direction, pauseOnHover, unstyled, className);
  const trackClasses = buildTrackClasses2(direction);
  const fadeMask = buildFadeMask(direction, safeFadeEdge);
  const wrapperStyle = {
    ...style,
    "--marquee-speed": `${safeSpeed}s`,
    "--marquee-gap": `${safeGap}px`,
    ...fadeMask ? { WebkitMaskImage: fadeMask, maskImage: fadeMask } : {}
  };
  const copies = safeRepeat;
  const tracks = Array.from({ length: copies }, (_, i) => /* @__PURE__ */ jsx72("div", { className: "w3f-marquee__group", "aria-hidden": i > 0 ? true : void 0, children }, i));
  return /* @__PURE__ */ jsx72(
    "div",
    {
      ref,
      className: classes,
      style: wrapperStyle,
      role: "marquee",
      "aria-label": ariaLabel || "Scrolling content",
      ...rest,
      children: /* @__PURE__ */ jsx72("div", { className: trackClasses, children: tracks })
    }
  );
});
Marquee.displayName = "Marquee";

// src/DATADISPLAY/Note/Note.tsx
import { forwardRef as forwardRef48, useMemo as useMemo11 } from "react";

// src/DATADISPLAY/Note/Note.constants.ts
var NOTE_DEFAULTS = {
  type: "info",
  round: true,
  shadow: false,
  border: "left",
  fullBorder: false,
  unstyled: false
};
var NOTE_VARIANT_CLASSES = {
  solid: "w3f-note--solid",
  outlined: "w3f-note--outlined",
  ghost: "w3f-note--ghost",
  soft: "w3f-note--soft"
};

// src/DATADISPLAY/Note/Note.utils.ts
var buildNoteClasses = (type, round, shadow, border, fullBorder, className, unstyled, variant) => {
  if (unstyled) {
    return [
      "w3f-note",
      "w3f-note--unstyled",
      className
    ].filter(Boolean).join(" ");
  }
  const classes = [
    "w3f-note",
    `w3f-note-${type}`
  ];
  if (round === true) classes.push("w3f-round-md");
  else if (typeof round === "string") classes.push(`w3f-round-${round}`);
  if (shadow === true) classes.push("w3f-shadow-md");
  else if (typeof shadow === "string") classes.push(`w3f-shadow-${shadow}`);
  if (fullBorder || border === true) {
    classes.push("w3f-border-full");
  } else {
    const borders = Array.isArray(border) ? border : [border];
    for (const side of borders) {
      switch (side) {
        case "left":
          classes.push("w3f-border-l-4");
          break;
        case "right":
          classes.push("w3f-border-r-4");
          break;
        case "top":
          classes.push("w3f-border-t-4");
          break;
        case "bottom":
          classes.push("w3f-border-b-4");
          break;
        default:
          break;
      }
    }
  }
  if (variant && NOTE_VARIANT_CLASSES[variant]) {
    classes.push(NOTE_VARIANT_CLASSES[variant]);
  }
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};

// src/DATADISPLAY/Note/Note.hooks.ts
import { useState as useState43, useCallback as useCallback35 } from "react";
var useNoteDismiss = (onDismiss) => {
  const [isVisible, setIsVisible] = useState43(true);
  const handleDismiss = useCallback35(() => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  }, [onDismiss]);
  return { isVisible, handleDismiss };
};

// src/DATADISPLAY/Note/Note.tsx
import { useBridgeBind as useBridgeBind20 } from "@w3f/bridge";
import { jsx as jsx73, jsxs as jsxs54 } from "react/jsx-runtime";
var Note = forwardRef48(({
  children,
  type = NOTE_DEFAULTS.type,
  round = NOTE_DEFAULTS.round,
  shadow = NOTE_DEFAULTS.shadow,
  border = NOTE_DEFAULTS.border,
  fullBorder = NOTE_DEFAULTS.fullBorder,
  className,
  dismissible,
  onDismiss,
  icon,
  unstyled = NOTE_DEFAULTS.unstyled,
  variant,
  bindId,
  ...rest
}, ref) => {
  const { dispatch } = useBridgeBind20({ bindId });
  const { isVisible, handleDismiss } = useNoteDismiss(onDismiss);
  const classNames = useMemo11(
    () => buildNoteClasses(type, round, shadow, border, fullBorder, className, unstyled, variant),
    [type, round, shadow, border, fullBorder, className, unstyled, variant]
  );
  if (!isVisible) {
    return null;
  }
  return /* @__PURE__ */ jsx73("div", { ref, className: classNames, role: "alert", ...rest, children: /* @__PURE__ */ jsxs54("div", { className: "w3f-note-content-container", children: [
    icon && /* @__PURE__ */ jsx73("div", { className: "w3f-note-icon", children: icon }),
    /* @__PURE__ */ jsx73("div", { className: "w3f-note-text-content", children }),
    dismissible && /* @__PURE__ */ jsx73(
      Button_default,
      {
        onClick: () => {
          handleDismiss();
          dispatch("change", { action: "dismiss" });
        },
        variant: "icon",
        size: "sm",
        className: "w3f-note-dismiss",
        "aria-label": "Cerrar",
        children: "\u2715"
      }
    )
  ] }) });
});
Note.displayName = "Note";

// src/DATADISPLAY/ProgressBar/ProgressBar.tsx
import { forwardRef as forwardRef49 } from "react";

// src/DATADISPLAY/ProgressBar/ProgressBar.constants.ts
var PROGRESS_BAR_DEFAULTS = {
  color: "success",
  showLabel: true,
  size: "md",
  unstyled: false
};
var PROGRESS_BAR_BUFFER_DEFAULTS = {
  progressColor: "success",
  bufferColor: "primary",
  showLabel: true,
  size: "md"
};
var PROGRESS_BAR_INDETERMINATE_DEFAULTS = {
  color: "primary",
  ariaLabel: "Cargando",
  size: "md",
  variant: "slide"
};

// src/DATADISPLAY/ProgressBar/ProgressBar.utils.ts
var PROGRESS_BAR_SIZE_CLASSES = {
  sm: "w3f-progress-bar-container-sm",
  md: "w3f-progress-bar-container",
  lg: "w3f-progress-bar-container-lg"
};
var clampProgress = (value) => {
  return Math.min(100, Math.max(0, value));
};
var getProgressBgClass = (color) => {
  return `w3f-bg-${color}`;
};
var getSizeClass = (size) => {
  return PROGRESS_BAR_SIZE_CLASSES[size] || PROGRESS_BAR_SIZE_CLASSES.md;
};
var buildProgressBarClasses = (size, unstyled) => {
  if (unstyled) {
    return "w3f-progress-bar-container w3f-progress-bar--unstyled";
  }
  return `${getSizeClass(size)} w3f-bg-gray-200`;
};

// src/DATADISPLAY/ProgressBar/ProgressBar.tsx
import { useBridgeBind as useBridgeBind21 } from "@w3f/bridge";
import { jsx as jsx74 } from "react/jsx-runtime";
var ProgressBar = forwardRef49(({
  progress,
  color = PROGRESS_BAR_DEFAULTS.color,
  showLabel = PROGRESS_BAR_DEFAULTS.showLabel,
  label,
  ariaLabel,
  size = PROGRESS_BAR_DEFAULTS.size,
  unstyled = PROGRESS_BAR_DEFAULTS.unstyled,
  bindId
}, ref) => {
  useBridgeBind21({ bindId, value: progress });
  const validatedProgress = clampProgress(progress);
  const progressBgClass = getProgressBgClass(color);
  const displayText = label || `${validatedProgress}%`;
  return /* @__PURE__ */ jsx74(
    "div",
    {
      ref,
      className: buildProgressBarClasses(size, unstyled),
      role: "progressbar",
      "aria-valuenow": validatedProgress,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": ariaLabel || `Progreso: ${validatedProgress}%`,
      children: /* @__PURE__ */ jsx74(
        "div",
        {
          className: `w3f-progress-bar-fill ${progressBgClass}`,
          style: { width: `${validatedProgress}%` },
          children: showLabel && validatedProgress > 0 && /* @__PURE__ */ jsx74("span", { className: "w3f-progress-bar-text w3f-text-on-primary", children: displayText })
        }
      )
    }
  );
});
ProgressBar.displayName = "ProgressBar";

// src/DATADISPLAY/ProgressBar/ProgressBarBuffer.tsx
import { jsx as jsx75, jsxs as jsxs55 } from "react/jsx-runtime";
var ProgressBarBuffer = ({
  progress,
  buffer,
  progressColor = PROGRESS_BAR_BUFFER_DEFAULTS.progressColor,
  bufferColor = PROGRESS_BAR_BUFFER_DEFAULTS.bufferColor,
  showLabel = PROGRESS_BAR_BUFFER_DEFAULTS.showLabel,
  label,
  ariaLabel,
  size = PROGRESS_BAR_BUFFER_DEFAULTS.size
}) => {
  const validatedProgress = clampProgress(progress);
  const validatedBuffer = clampProgress(buffer);
  const finalBuffer = Math.max(validatedBuffer, validatedProgress);
  const progressBgClass = getProgressBgClass(progressColor);
  const bufferBgClass = getProgressBgClass(bufferColor);
  const sizeClass = getSizeClass(size);
  const displayText = label || `${validatedProgress}%`;
  return /* @__PURE__ */ jsxs55(
    "div",
    {
      className: `${sizeClass} w3f-bg-gray-200`,
      role: "progressbar",
      "aria-valuenow": validatedProgress,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": ariaLabel || `Progreso: ${validatedProgress}% (B\xFAfer: ${finalBuffer}%)`,
      children: [
        /* @__PURE__ */ jsx75(
          "div",
          {
            className: `w3f-progress-bar-buffer ${bufferBgClass}`,
            style: { width: `${finalBuffer}%` },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx75(
          "div",
          {
            className: `w3f-progress-bar-fill ${progressBgClass}`,
            style: { width: `${validatedProgress}%` },
            children: showLabel && validatedProgress > 0 && /* @__PURE__ */ jsx75("span", { className: "w3f-progress-bar-text w3f-text-on-primary", children: displayText })
          }
        )
      ]
    }
  );
};
ProgressBarBuffer.displayName = "ProgressBarBuffer";

// src/DATADISPLAY/ProgressBar/ProgressBarIndeterminate.tsx
import { jsx as jsx76 } from "react/jsx-runtime";
var ProgressBarIndeterminate = ({
  color = PROGRESS_BAR_INDETERMINATE_DEFAULTS.color,
  ariaLabel = PROGRESS_BAR_INDETERMINATE_DEFAULTS.ariaLabel,
  size = PROGRESS_BAR_INDETERMINATE_DEFAULTS.size,
  variant = PROGRESS_BAR_INDETERMINATE_DEFAULTS.variant
}) => {
  const barBgClass = getProgressBgClass(color);
  const sizeClass = getSizeClass(size);
  const animationClass = variant === "pulse" ? "w3f-indeterminate-animation-pulse" : "w3f-indeterminate-animation";
  return /* @__PURE__ */ jsx76(
    "div",
    {
      className: `${sizeClass} w3f-indeterminate-bar w3f-bg-gray-200`,
      role: "progressbar",
      "aria-label": ariaLabel,
      "aria-valuenow": void 0,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-busy": "true",
      children: /* @__PURE__ */ jsx76(
        "div",
        {
          className: `${animationClass} ${barBgClass}`,
          "aria-hidden": "true"
        }
      )
    }
  );
};
ProgressBarIndeterminate.displayName = "ProgressBarIndeterminate";

// src/DATADISPLAY/ProgressSpinner/ProgressSpinner.tsx
import { forwardRef as forwardRef50, useMemo as useMemo12 } from "react";

// src/DATADISPLAY/ProgressSpinner/ProgressSpinner.constants.ts
var PROGRESS_SPINNER_DEFAULTS = {
  mode: "indeterminate",
  value: 0,
  strokeWidth: 4,
  size: "md",
  color: "primary",
  className: "",
  unstyled: false
};

// src/DATADISPLAY/ProgressSpinner/ProgressSpinner.utils.ts
var SPINNER_COLOR_MAP = {
  primary: "var(--w3f-primary)",
  secondary: "var(--w3f-secondary)",
  success: "var(--w3f-success)",
  warning: "var(--w3f-warning)",
  danger: "var(--w3f-danger)",
  info: "var(--w3f-info)",
  gray: "var(--w3f-gray-500)"
};
var SPINNER_SIZE_MAP = {
  xs: 16,
  sm: 24,
  md: 40,
  lg: 56,
  xl: 72
};
var resolveSpinnerDiameter = (size, diameter) => {
  if (diameter !== void 0) return diameter;
  if (typeof size === "string") {
    return SPINNER_SIZE_MAP[size] ?? SPINNER_SIZE_MAP.md;
  }
  return size;
};
var resolveSpinnerColor = (color) => {
  return SPINNER_COLOR_MAP[color] ?? color;
};
var buildProgressSpinnerClasses = (unstyled, className) => {
  const base = "w3f-progress-spinner";
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, "w3f-inline-block w3f-relative", className].filter(Boolean).join(" ");
};
var calcDashOffset = (mode, value, circumference) => {
  if (mode === "determinate") {
    const clamped = Math.max(0, Math.min(100, value));
    return circumference - clamped / 100 * circumference;
  }
  return 0;
};

// src/DATADISPLAY/ProgressSpinner/ProgressSpinner.tsx
import { jsx as jsx77, jsxs as jsxs56 } from "react/jsx-runtime";
var ProgressSpinner = forwardRef50(({
  mode = PROGRESS_SPINNER_DEFAULTS.mode,
  value = PROGRESS_SPINNER_DEFAULTS.value,
  strokeWidth = PROGRESS_SPINNER_DEFAULTS.strokeWidth,
  size = PROGRESS_SPINNER_DEFAULTS.size,
  diameter,
  color = PROGRESS_SPINNER_DEFAULTS.color,
  ariaLabel,
  className = PROGRESS_SPINNER_DEFAULTS.className,
  unstyled = PROGRESS_SPINNER_DEFAULTS.unstyled
}, ref) => {
  const finalDiameter = useMemo12(
    () => resolveSpinnerDiameter(size, diameter),
    [size, diameter]
  );
  const radius = (finalDiameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = finalDiameter / 2;
  const strokeColor = useMemo12(() => resolveSpinnerColor(color), [color]);
  const strokeDashoffset = useMemo12(
    () => calcDashOffset(mode, value, circumference),
    [mode, value, circumference]
  );
  const svgClass = mode === "indeterminate" ? "w3f-spinner-rotate" : "";
  const backgroundCircleColor = "var(--w3f-outline-variant)";
  const accessibilityLabel = ariaLabel || (mode === "determinate" ? `Progreso: ${Math.round(value)}%` : "Cargando");
  const wrapperClasses = buildProgressSpinnerClasses(unstyled, className);
  return /* @__PURE__ */ jsx77(
    "div",
    {
      ref,
      className: wrapperClasses,
      style: { width: finalDiameter, height: finalDiameter },
      role: "status",
      "aria-live": "polite",
      "aria-label": accessibilityLabel,
      children: /* @__PURE__ */ jsxs56(
        "svg",
        {
          width: finalDiameter,
          height: finalDiameter,
          viewBox: `0 0 ${finalDiameter} ${finalDiameter}`,
          className: svgClass,
          "aria-hidden": "true",
          children: [
            mode === "determinate" && /* @__PURE__ */ jsx77(
              "circle",
              {
                cx: center,
                cy: center,
                r: radius,
                fill: "none",
                stroke: backgroundCircleColor,
                strokeWidth
              }
            ),
            /* @__PURE__ */ jsx77(
              "circle",
              {
                cx: center,
                cy: center,
                r: radius,
                fill: "none",
                stroke: strokeColor,
                strokeWidth,
                strokeLinecap: "round",
                strokeDasharray: circumference,
                strokeDashoffset,
                className: mode === "indeterminate" ? "w3f-spinner-path" : "",
                style: {
                  transformOrigin: "center",
                  transition: mode === "determinate" ? "stroke-dashoffset var(--w3f-transition-normal) cubic-bezier(0.4, 0, 0.2, 1)" : "none"
                }
              }
            )
          ]
        }
      )
    }
  );
});
ProgressSpinner.displayName = "ProgressSpinner";
var ProgressSpinner_default = ProgressSpinner;

// src/DATADISPLAY/Quotes/Quotes.constants.ts
var QUOTES_DEFAULTS = {
  color: "primary",
  size: "md",
  showQuoteMark: true,
  unstyled: false
};

// src/DATADISPLAY/Quotes/Quotes.utils.ts
var buildQuoteClasses = (color, size, unstyled, className) => {
  const base = "w3f-quote";
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  const classes = [
    base,
    `w3f-quote-${size}`,
    `w3f-border-l-4`,
    `w3f-border-${color}`
  ];
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};
var getQuoteBgClass = (color) => {
  return `w3f-bg-${color}-subtle`;
};

// src/DATADISPLAY/Quotes/Quotes.tsx
import { jsx as jsx78, jsxs as jsxs57 } from "react/jsx-runtime";
var Quotes = ({
  children,
  text,
  author,
  color = QUOTES_DEFAULTS.color,
  size = QUOTES_DEFAULTS.size,
  showQuoteMark = QUOTES_DEFAULTS.showQuoteMark,
  icon,
  className,
  unstyled = QUOTES_DEFAULTS.unstyled
}) => {
  const quoteClasses = buildQuoteClasses(color, size, unstyled, className);
  const bgClass = unstyled ? "" : getQuoteBgClass(color);
  return /* @__PURE__ */ jsxs57("blockquote", { className: `${quoteClasses} ${bgClass}`, children: [
    /* @__PURE__ */ jsxs57("div", { className: "w3f-quote-content", children: [
      showQuoteMark && !icon && /* @__PURE__ */ jsx78("span", { className: `w3f-quote-mark w3f-text-${color}`, "aria-hidden": "true", children: "\u275D" }),
      icon && /* @__PURE__ */ jsx78("span", { className: "w3f-quote-icon", "aria-hidden": "true", children: icon }),
      /* @__PURE__ */ jsx78("div", { className: "w3f-quote-text", children: /* @__PURE__ */ jsx78("p", { children: children || text }) })
    ] }),
    author && /* @__PURE__ */ jsx78("footer", { className: "w3f-quote-author", children: /* @__PURE__ */ jsxs57("cite", { children: [
      "\u2014 ",
      author
    ] }) })
  ] });
};
Quotes.displayName = "Quotes";

// src/DATADISPLAY/Reloj/RelojAnalogico.tsx
import { useMemo as useMemo13 } from "react";

// src/DATADISPLAY/Text/Text.tsx
import React62, { forwardRef as forwardRef51 } from "react";

// src/DATADISPLAY/Text/Text.constants.ts
var TEXT_DEFAULTS = {
  customClasses: "",
  unstyled: false
};

// src/DATADISPLAY/Text/Text.utils.ts
var ALIGNMENT_MAP = {
  left: "w3f-text-left",
  center: "w3f-text-center",
  right: "w3f-text-right",
  justify: "w3f-text-justify"
};
var LEADING_MAP = {
  none: "w3f-leading-none",
  tight: "w3f-leading-tight",
  snug: "w3f-leading-snug",
  normal: "w3f-leading-normal",
  relaxed: "w3f-leading-relaxed",
  loose: "w3f-leading-loose"
};
var buildTextClasses = (customClasses, align, leading, unstyled) => {
  const base = "w3f-text";
  if (unstyled) return [base, `${base}--unstyled`, customClasses].filter(Boolean).join(" ");
  const classes = [base];
  if (customClasses) classes.push(customClasses);
  if (align && ALIGNMENT_MAP[align]) classes.push(ALIGNMENT_MAP[align]);
  if (leading && LEADING_MAP[leading]) classes.push(LEADING_MAP[leading]);
  return classes.filter(Boolean).join(" ");
};
var buildTextDirectionStyle = (direction, writingMode, existingStyle) => {
  if (!direction && !writingMode) return existingStyle;
  const dirStyle = { ...existingStyle };
  if (direction) dirStyle.direction = direction;
  if (writingMode) dirStyle.writingMode = writingMode;
  return dirStyle;
};

// src/DATADISPLAY/Text/Text.tsx
import { useBridgeBind as useBridgeBind22 } from "@w3f/bridge";
import { jsx as jsx79 } from "react/jsx-runtime";
var Text = forwardRef51(({
  content,
  element: Element = "p",
  customClasses = TEXT_DEFAULTS.customClasses,
  align,
  leading,
  direction,
  writingMode,
  children,
  style,
  unstyled = TEXT_DEFAULTS.unstyled,
  bindId,
  ...props
}, ref) => {
  useBridgeBind22({ bindId });
  const hasContentProp = content !== void 0 && content !== null;
  const contentToRender = hasContentProp ? Array.isArray(content) ? content : [content] : children;
  const finalClasses = buildTextClasses(customClasses, align, leading, unstyled);
  const finalStyle = buildTextDirectionStyle(direction, writingMode, style);
  return /* @__PURE__ */ jsx79(Element, { ref, className: finalClasses || void 0, style: finalStyle, ...props, children: hasContentProp ? contentToRender.map((item, index) => /* @__PURE__ */ jsx79(React62.Fragment, { children: item }, index)) : contentToRender });
});
Text.displayName = "Text";
var Text_default = Text;

// src/DATADISPLAY/Reloj/RelojAnalogico.utils.ts
var buildRelojClasses = (unstyled, className) => {
  const base = "w3f-clock-analog";
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, "w3f-position-container", className].filter(Boolean).join(" ");
};
var HAND_BASE_STYLE = {
  transformOrigin: "50% 100%"
};
var calculateAngles = (hours, minutes, seconds) => ({
  second: seconds / 60 * 360,
  minute: (minutes + seconds / 60) / 60 * 360,
  hour: hours % 12 / 12 * 360 + minutes / 60 * 30
});
var getVisibleNumbers = (showAllNumbers, numbersToShow) => {
  if (numbersToShow) return numbersToShow;
  if (showAllNumbers) return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return [12, 3, 6, 9];
};
var buildHourNumberStyle = (hourIndex, clockRadius) => {
  const angle = hourIndex * 30;
  const radians = (angle - 90) * (Math.PI / 180);
  const distance = clockRadius * 0.8;
  const x = Math.cos(radians) * distance;
  const y = Math.sin(radians) * distance;
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
    color: "var(--w3f-on-surface)",
    userSelect: "none"
  };
};
var generateTics = (isHourTic, clockRadius) => {
  const totalTics = isHourTic ? 12 : 60;
  const ticColor = isHourTic ? "var(--w3f-clock-tic-hour-color)" : "var(--w3f-clock-tic-minute-color)";
  const ticLength = isHourTic ? clockRadius * 0.05 : clockRadius * 0.025;
  const ticWidth = isHourTic ? clockRadius * 0.015 : clockRadius * 5e-3;
  const marginFromEdge = clockRadius * 0.15;
  const ticDistanceFromCenter = clockRadius - marginFromEdge;
  const styles = [];
  for (let i = 0; i < totalTics; i++) {
    if (!isHourTic && i % 5 === 0) continue;
    const angle = i * (360 / totalTics);
    styles.push({
      position: "absolute",
      width: `${ticWidth}px`,
      height: `${ticLength}px`,
      backgroundColor: ticColor,
      left: "50%",
      top: "50%",
      transformOrigin: `50% ${-ticDistanceFromCenter + ticLength / 2}px`,
      transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, ${-ticDistanceFromCenter + ticLength / 2}px)`
    });
  }
  return styles;
};

// src/DATADISPLAY/Reloj/RelojAnalogico.constants.ts
var RELOJ_DEFAULTS = {
  size: 300,
  showTics: true,
  showAllNumbers: false,
  showSeconds: true,
  className: "",
  unstyled: false
};

// src/DATADISPLAY/Reloj/RelojAnalogico.hooks.ts
import { useState as useState44, useEffect as useEffect28 } from "react";
var useClock = () => {
  const [date, setDate] = useState44(/* @__PURE__ */ new Date());
  useEffect28(() => {
    const timerID = setInterval(() => setDate(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(timerID);
  }, []);
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  };
};

// src/DATADISPLAY/Reloj/RelojAnalogico.tsx
import { Fragment as Fragment13, jsx as jsx80, jsxs as jsxs58 } from "react/jsx-runtime";
var RelojAnalogico = ({
  size = RELOJ_DEFAULTS.size,
  showTics = RELOJ_DEFAULTS.showTics,
  showAllNumbers = RELOJ_DEFAULTS.showAllNumbers,
  numbersToShow,
  showSeconds = RELOJ_DEFAULTS.showSeconds,
  className = RELOJ_DEFAULTS.className,
  unstyled = RELOJ_DEFAULTS.unstyled
}) => {
  const { hours, minutes, seconds } = useClock();
  const angles = useMemo13(
    () => calculateAngles(hours, minutes, seconds),
    [hours, minutes, seconds]
  );
  const clockRadius = size / 2;
  const visibleNumbers = useMemo13(
    () => getVisibleNumbers(showAllNumbers, numbersToShow),
    [showAllNumbers, numbersToShow]
  );
  const hourNumbers = useMemo13(() => {
    return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((hour, index) => {
      if (!visibleNumbers.includes(hour)) return null;
      const numberStyle = buildHourNumberStyle(index, clockRadius);
      return /* @__PURE__ */ jsx80(
        Text_default,
        {
          style: numberStyle,
          customClasses: `w3f-text-${showAllNumbers ? "xl" : "2xl"} w3f-font-display`,
          element: "div",
          content: hour
        },
        `hour-${hour}`
      );
    }).filter(Boolean);
  }, [clockRadius, visibleNumbers, showAllNumbers]);
  const ticElements = useMemo13(() => {
    if (!showTics) return null;
    const minuteTics = generateTics(false, clockRadius);
    const hourTics = generateTics(true, clockRadius);
    return /* @__PURE__ */ jsxs58(Fragment13, { children: [
      minuteTics.map((style, i) => /* @__PURE__ */ jsx80("div", { style }, `tic-m-${i}`)),
      hourTics.map((style, i) => /* @__PURE__ */ jsx80("div", { style }, `tic-h-${i}`))
    ] });
  }, [showTics, clockRadius]);
  return /* @__PURE__ */ jsxs58(
    "div",
    {
      className: buildRelojClasses(unstyled, className),
      style: { width: `${size}px`, height: `${size}px` },
      role: "img",
      "aria-label": `Reloj anal\xF3gico mostrando ${hours % 12 || 12}:${minutes.toString().padStart(2, "0")}`,
      children: [
        hourNumbers,
        ticElements,
        /* @__PURE__ */ jsx80(
          "div",
          {
            className: "w3f-clock-analog-hand w3f-clock-hour-hand",
            style: {
              ...HAND_BASE_STYLE,
              transform: `translate(-50%, -100%) rotate(${angles.hour}deg)`,
              backgroundColor: "var(--w3f-clock-hour-hand-color)",
              height: `${size * 0.2}px`,
              width: `${size * 0.02}px`,
              zIndex: 10
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx80(
          "div",
          {
            className: "w3f-clock-analog-hand w3f-clock-minute-hand",
            style: {
              ...HAND_BASE_STYLE,
              transform: `translate(-50%, -100%) rotate(${angles.minute}deg)`,
              backgroundColor: "var(--w3f-clock-minute-hand-color)",
              height: `${size * 0.35}px`,
              width: `${size * 0.015}px`,
              zIndex: 20
            },
            "aria-hidden": "true"
          }
        ),
        showSeconds && /* @__PURE__ */ jsx80(
          "div",
          {
            className: "w3f-clock-analog-hand w3f-clock-second-hand",
            style: {
              ...HAND_BASE_STYLE,
              transform: `translate(-50%, -100%) rotate(${angles.second}deg)`,
              backgroundColor: "var(--w3f-clock-second-hand-color)",
              height: `${size * 0.45}px`,
              width: `${size * 5e-3}px`,
              zIndex: 30
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx80("div", { className: "w3f-clock-center-dot", "aria-hidden": "true" })
      ]
    }
  );
};
RelojAnalogico.displayName = "RelojAnalogico";

// src/DATADISPLAY/Table/Table.tsx
import React64, { useMemo as useMemo15, useRef as useRef26, useEffect as useEffect30 } from "react";
import { ArrowUp as ArrowUp2, ArrowDown as ArrowDown2, ArrowUpDown as ArrowUpDown2, Search as Search4 } from "lucide-react";

// src/DATADISPLAY/Table/Table.constants.ts
var TABLE_DEFAULTS = {
  enableSorting: true,
  enableFiltering: true,
  enablePagination: true,
  enableColumnResize: false,
  enableColumnReorder: false,
  pageSize: 10,
  variant: "default",
  size: "md",
  color: "default",
  className: "",
  unstyled: false
};
var TABLE_COLORS = {
  default: "",
  primary: "w3f-table-color-primary",
  secondary: "w3f-table-color-secondary",
  success: "w3f-table-color-success",
  warning: "w3f-table-color-warning",
  danger: "w3f-table-color-danger",
  info: "w3f-table-color-info",
  gray: "w3f-table-color-gray"
};
var TABLE_SIZES = {
  sm: "w3f-table-sm",
  md: "",
  lg: "w3f-table-lg"
};
var TABLE_VARIANTS = {
  default: "",
  striped: "w3f-table-striped",
  bordered: "w3f-table-bordered"
};
var PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
var MIN_COLUMN_WIDTH = 50;
var DRAG_DEAD_ZONE2 = 5;

// src/DATADISPLAY/Table/Table.utils.ts
var buildContainerClasses6 = (className, unstyled) => {
  return ["w3f-table-container", unstyled && "w3f-table--unstyled", className].filter(Boolean).join(" ");
};
var buildTableClasses = (size, variant, color, enableColumnResize, unstyled) => {
  if (unstyled) {
    return "w3f-table w3f-table--unstyled";
  }
  return [
    "w3f-table",
    TABLE_SIZES[size] || "",
    TABLE_VARIANTS[variant] || "",
    TABLE_COLORS[color] || "",
    enableColumnResize ? "w3f-table-fixed" : ""
  ].filter(Boolean).join(" ");
};

// src/DATADISPLAY/Table/Table.hooks.ts
import { useState as useState45, useMemo as useMemo14, useCallback as useCallback36, useRef as useRef25, useEffect as useEffect29 } from "react";
var useTableSort = () => {
  const [sortState, setSortState] = useState45({ key: null, direction: null });
  const handleSort = useCallback36((columnKey) => {
    setSortState((prev) => {
      if (prev.key !== columnKey) return { key: columnKey, direction: "asc" };
      if (prev.direction === "asc") return { key: columnKey, direction: "desc" };
      return { key: null, direction: null };
    });
  }, []);
  return { sortState, handleSort };
};
var useTableFilter = (data, columns) => {
  const [globalFilter, setGlobalFilter] = useState45("");
  const handleFilterChange = useCallback36((e) => {
    setGlobalFilter(e.target.value);
  }, []);
  const filteredData = useMemo14(() => {
    if (!globalFilter.trim()) return data;
    const search = globalFilter.toLowerCase().trim();
    return data.filter(
      (row) => columns.some((col) => {
        if (col.cell) return false;
        const value = row[col.accessorKey];
        if (value == null) return false;
        return String(value).toLowerCase().includes(search);
      })
    );
  }, [data, columns, globalFilter]);
  return { globalFilter, handleFilterChange, filteredData };
};
var useTablePagination = (totalItems, initialPageSize) => {
  const [currentPage, setCurrentPage] = useState45(1);
  const [pageSize, setPageSize] = useState45(initialPageSize);
  const totalPages = useMemo14(
    () => Math.max(1, Math.ceil(totalItems / pageSize)),
    [totalItems, pageSize]
  );
  const handlePageSizeChange = useCallback36((e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  }, []);
  const resetPage = useCallback36(() => setCurrentPage(1), []);
  return { currentPage, setCurrentPage, pageSize, totalPages, handlePageSizeChange, resetPage };
};
var useColumnResize = () => {
  const [columnWidths, setColumnWidths] = useState45({});
  const resizeRef = useRef25(null);
  const widthsInitializedRef = useRef25(false);
  const initWidths = useCallback36((headerRow) => {
    if (widthsInitializedRef.current || !headerRow) return;
    const cells = headerRow.querySelectorAll("th");
    if (cells.length === 0) return;
    const widths = {};
    cells.forEach((cell) => {
      const key = cell.getAttribute("data-column-key");
      if (key) widths[key] = cell.offsetWidth;
    });
    if (Object.keys(widths).length > 0) {
      setColumnWidths(widths);
      widthsInitializedRef.current = true;
    }
  }, []);
  const handleResizeMouseDown = useCallback36((e, columnKey) => {
    e.stopPropagation();
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnWidths[columnKey] || 100;
    resizeRef.current = { columnKey, startX, startWidth };
    document.body.classList.add("w3f-table-resizing");
    const onMouseMove = (moveEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = Math.max(MIN_COLUMN_WIDTH, startWidth + delta);
      setColumnWidths((prev) => ({ ...prev, [columnKey]: newWidth }));
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.classList.remove("w3f-table-resizing");
      resizeRef.current = null;
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, [columnWidths]);
  return { columnWidths, initWidths, handleResizeMouseDown, widthsInitializedRef };
};
var useColumnReorder = (columns) => {
  const [columnOrder, setColumnOrder] = useState45(() => columns.map((c) => c.accessorKey));
  const dragRef = useRef25(null);
  const ghostRef = useRef25(null);
  const indicatorRef = useRef25(null);
  useEffect29(() => {
    setColumnOrder((prev) => {
      const currentKeys = columns.map((c) => c.accessorKey);
      const filtered = prev.filter((key) => currentKeys.includes(key));
      const newKeys = currentKeys.filter((key) => !filtered.includes(key));
      return [...filtered, ...newKeys];
    });
  }, [columns]);
  const orderedColumns = useMemo14(() => {
    const columnMap = {};
    columns.forEach((c) => {
      columnMap[c.accessorKey] = c;
    });
    return columnOrder.map((key) => columnMap[key]).filter(Boolean);
  }, [columns, columnOrder]);
  const handleDragMouseDown = useCallback36((e, columnKey, headerRowRef) => {
    if (e.target.closest(".w3f-table-resize-handle")) return;
    if (e.button !== 0) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const th = e.currentTarget;
    let isDragging = false;
    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      if (!isDragging && Math.sqrt(dx * dx + dy * dy) < DRAG_DEAD_ZONE2) return;
      if (!isDragging) {
        isDragging = true;
        dragRef.current = { columnKey, sourceEl: th };
        document.body.classList.add("w3f-table-dragging-body");
        th.classList.add("w3f-table-th-dragging");
        const ghost = document.createElement("div");
        ghost.className = "w3f-table-drag-ghost";
        ghost.textContent = th.textContent;
        document.body.appendChild(ghost);
        ghostRef.current = ghost;
        const indicator = document.createElement("div");
        indicator.className = "w3f-table-drop-indicator";
        indicator.style.display = "none";
        document.body.appendChild(indicator);
        indicatorRef.current = indicator;
      }
      if (ghostRef.current) {
        ghostRef.current.style.left = `${moveEvent.clientX + 12}px`;
        ghostRef.current.style.top = `${moveEvent.clientY - 16}px`;
      }
      if (headerRowRef.current && indicatorRef.current) {
        const headerCells = Array.from(headerRowRef.current.querySelectorAll("th"));
        let closestEdge = null;
        let closestDist = Infinity;
        for (const cell of headerCells) {
          const cellKey = cell.getAttribute("data-column-key");
          if (cellKey === columnKey) continue;
          const rect = cell.getBoundingClientRect();
          const leftDist = Math.abs(moveEvent.clientX - rect.left);
          const rightDist = Math.abs(moveEvent.clientX - rect.right);
          if (leftDist < closestDist) {
            closestDist = leftDist;
            closestEdge = { x: rect.left, top: rect.top, height: rect.height, beforeKey: cellKey ?? void 0 };
          }
          if (rightDist < closestDist) {
            closestDist = rightDist;
            closestEdge = { x: rect.right, top: rect.top, height: rect.height, afterKey: cellKey ?? void 0 };
          }
        }
        if (closestEdge && closestDist < 40) {
          indicatorRef.current.style.display = "block";
          indicatorRef.current.style.left = `${closestEdge.x - 1}px`;
          indicatorRef.current.style.top = `${closestEdge.top}px`;
          indicatorRef.current.style.height = `${closestEdge.height}px`;
          dragRef.current.dropEdge = closestEdge;
        } else {
          indicatorRef.current.style.display = "none";
          if (dragRef.current) dragRef.current.dropEdge = null;
        }
      }
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      if (isDragging && dragRef.current) {
        const { columnKey: dragKey, dropEdge, sourceEl } = dragRef.current;
        sourceEl.classList.remove("w3f-table-th-dragging");
        document.body.classList.remove("w3f-table-dragging-body");
        if (ghostRef.current) {
          ghostRef.current.remove();
          ghostRef.current = null;
        }
        if (indicatorRef.current) {
          indicatorRef.current.remove();
          indicatorRef.current = null;
        }
        if (dropEdge) {
          setColumnOrder((prev) => {
            const newOrder = prev.filter((k) => k !== dragKey);
            const targetKey = dropEdge.beforeKey || dropEdge.afterKey;
            if (!targetKey) return prev;
            let insertIdx = newOrder.indexOf(targetKey);
            if (insertIdx === -1) return prev;
            if (dropEdge.afterKey) insertIdx += 1;
            newOrder.splice(insertIdx, 0, dragKey);
            return newOrder;
          });
        }
        dragRef.current = null;
      }
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);
  return { columnOrder, orderedColumns, handleDragMouseDown };
};

// src/DATADISPLAY/Table/Table.tsx
import { jsx as jsx81, jsxs as jsxs59 } from "react/jsx-runtime";
var Table = React64.forwardRef(({
  data = [],
  columns = [],
  enableSorting = TABLE_DEFAULTS.enableSorting,
  enableFiltering = TABLE_DEFAULTS.enableFiltering,
  enablePagination = TABLE_DEFAULTS.enablePagination,
  enableColumnResize = TABLE_DEFAULTS.enableColumnResize,
  enableColumnReorder = TABLE_DEFAULTS.enableColumnReorder,
  maxHeight,
  pageSize: initialPageSize = TABLE_DEFAULTS.pageSize,
  variant = TABLE_DEFAULTS.variant,
  size = TABLE_DEFAULTS.size,
  color = TABLE_DEFAULTS.color,
  className = TABLE_DEFAULTS.className,
  paginationProps = {},
  unstyled = TABLE_DEFAULTS.unstyled,
  onRowClick,
  selectedRowKey,
  selectedRowValue,
  ...rest
}, ref) => {
  const headerRowRef = useRef26(null);
  const { sortState, handleSort } = useTableSort();
  const { globalFilter, handleFilterChange, filteredData } = useTableFilter(data, columns);
  const { columnWidths, initWidths, handleResizeMouseDown, widthsInitializedRef } = useColumnResize();
  const { orderedColumns, handleDragMouseDown } = useColumnReorder(columns);
  const sortedData = useMemo15(() => {
    if (!sortState.key || !sortState.direction) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortState.key];
      const bVal = b[sortState.key];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      let comparison;
      if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal), void 0, { numeric: true, sensitivity: "base" });
      }
      return sortState.direction === "desc" ? -comparison : comparison;
    });
  }, [filteredData, sortState]);
  const {
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    handlePageSizeChange,
    resetPage
  } = useTablePagination(sortedData.length, initialPageSize);
  useEffect30(() => {
    resetPage();
  }, [sortState, globalFilter, resetPage]);
  const paginatedData = useMemo15(() => {
    if (!enablePagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize, enablePagination]);
  useEffect30(() => {
    if (enableColumnResize && !widthsInitializedRef.current) {
      initWidths(headerRowRef.current);
    }
  }, [enableColumnResize, columns, initWidths, widthsInitializedRef]);
  const displayColumns = enableColumnReorder ? orderedColumns : columns;
  const containerClasses = buildContainerClasses6(className, unstyled);
  const tableClassList = buildTableClasses(size, variant, color, enableColumnResize, unstyled);
  const renderSortIcon = (columnKey) => {
    if (sortState.key === columnKey) {
      if (sortState.direction === "asc") return /* @__PURE__ */ jsx81(ArrowUp2, { size: 14 });
      if (sortState.direction === "desc") return /* @__PURE__ */ jsx81(ArrowDown2, { size: 14 });
    }
    return /* @__PURE__ */ jsx81(ArrowUpDown2, { size: 14 });
  };
  return /* @__PURE__ */ jsxs59("div", { ref, className: containerClasses, ...rest, children: [
    enableFiltering && /* @__PURE__ */ jsx81("div", { className: "w3f-table-toolbar", children: /* @__PURE__ */ jsxs59("div", { className: "w3f-table-filter", children: [
      /* @__PURE__ */ jsx81("span", { className: "w3f-table-filter-icon", children: /* @__PURE__ */ jsx81(Search4, { size: 16 }) }),
      /* @__PURE__ */ jsx81(
        "input",
        {
          type: "text",
          className: "w3f-table-filter-input",
          placeholder: "Buscar...",
          value: globalFilter,
          onChange: handleFilterChange,
          "aria-label": "Filtrar tabla"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx81(
      "div",
      {
        className: ["w3f-table-wrapper", maxHeight ? "w3f-table-wrapper-scrollable" : ""].filter(Boolean).join(" "),
        style: maxHeight ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight } : void 0,
        children: /* @__PURE__ */ jsxs59("table", { className: tableClassList, children: [
          /* @__PURE__ */ jsx81("thead", { children: /* @__PURE__ */ jsx81("tr", { ref: headerRowRef, children: displayColumns.map((col) => {
            const isSortable = enableSorting && col.sortable !== false && !col.cell;
            const isSorted = sortState.key === col.accessorKey;
            const width = enableColumnResize ? columnWidths[col.accessorKey] : void 0;
            return /* @__PURE__ */ jsxs59(
              "th",
              {
                "data-column-key": col.accessorKey,
                className: [
                  isSortable ? "w3f-table-sortable" : "",
                  isSorted ? "w3f-table-sorted" : "",
                  enableColumnReorder ? "w3f-table-draggable" : ""
                ].filter(Boolean).join(" "),
                style: width ? { width: `${width}px` } : void 0,
                onClick: isSortable ? () => handleSort(col.accessorKey) : void 0,
                onMouseDown: enableColumnReorder ? (e) => handleDragMouseDown(e, col.accessorKey, headerRowRef) : void 0,
                "aria-sort": isSorted ? sortState.direction === "asc" ? "ascending" : "descending" : void 0,
                children: [
                  /* @__PURE__ */ jsxs59("span", { className: "w3f-table-header-content", children: [
                    col.header,
                    isSortable && /* @__PURE__ */ jsx81("span", { className: "w3f-table-sort-icon", children: renderSortIcon(col.accessorKey) })
                  ] }),
                  enableColumnResize && /* @__PURE__ */ jsx81(
                    "div",
                    {
                      className: "w3f-table-resize-handle",
                      onMouseDown: (e) => handleResizeMouseDown(e, col.accessorKey)
                    }
                  )
                ]
              },
              col.accessorKey
            );
          }) }) }),
          /* @__PURE__ */ jsx81("tbody", { children: paginatedData.length === 0 ? /* @__PURE__ */ jsx81("tr", { children: /* @__PURE__ */ jsx81("td", { colSpan: displayColumns.length, className: "w3f-table-empty", children: "No se encontraron resultados" }) }) : paginatedData.map((row, rowIndex) => {
            const isSelected2 = selectedRowKey != null && row[selectedRowKey] === selectedRowValue;
            return /* @__PURE__ */ jsx81(
              "tr",
              {
                onClick: onRowClick ? () => onRowClick(row, rowIndex) : void 0,
                style: {
                  cursor: onRowClick ? "pointer" : void 0,
                  backgroundColor: isSelected2 ? "var(--w3f-primary-50, #eff6ff)" : void 0,
                  outline: isSelected2 ? "2px solid var(--w3f-primary, #3b82f6)" : void 0,
                  outlineOffset: "-2px"
                },
                children: displayColumns.map((col) => /* @__PURE__ */ jsx81("td", { children: col.cell ? col.cell(row) : row[col.accessorKey] }, col.accessorKey))
              },
              row.id ?? rowIndex
            );
          }) })
        ] })
      }
    ),
    enablePagination && /* @__PURE__ */ jsxs59("div", { className: "w3f-table-pagination", children: [
      /* @__PURE__ */ jsxs59("div", { className: "w3f-table-pagination-info", children: [
        /* @__PURE__ */ jsx81("span", { children: sortedData.length === 0 ? "0 resultados" : `${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, sortedData.length)} de ${sortedData.length}` }),
        /* @__PURE__ */ jsx81("span", { children: "|" }),
        /* @__PURE__ */ jsxs59("label", { children: [
          "Filas:",
          /* @__PURE__ */ jsx81(
            "select",
            {
              className: "w3f-table-page-size-select",
              value: pageSize,
              onChange: handlePageSizeChange,
              "aria-label": "Filas por p\xE1gina",
              children: PAGE_SIZE_OPTIONS.map((opt) => /* @__PURE__ */ jsx81("option", { value: opt, children: opt }, opt))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx81(
        Pagination_default,
        {
          count: totalPages,
          page: currentPage,
          onChange: (_e, newPage) => setCurrentPage(newPage),
          size: "sm",
          showFirstButton: true,
          showLastButton: true,
          ...paginationProps
        }
      )
    ] })
  ] });
});
Table.displayName = "Table";

// src/DATADISPLAY/Tag/Tag.tsx
import { forwardRef as forwardRef52 } from "react";

// src/DATADISPLAY/Tag/Tag.constants.ts
var TAG_DEFAULTS = {
  light: false,
  className: "",
  unstyled: false
};
var TAG_VARIANT_CLASSES = {
  solid: "w3f-tag--solid",
  outlined: "w3f-tag--outlined",
  ghost: "w3f-tag--ghost",
  soft: "w3f-tag--soft"
};

// src/DATADISPLAY/Tag/Tag.utils.ts
var buildTagClasses = (color, light, className, unstyled, variant) => {
  if (unstyled) {
    return ["w3f-tag-base", "w3f-tag--unstyled", className].filter(Boolean).join(" ");
  }
  const classes = ["w3f-tag-base", `w3f-tag--${color}`];
  if (light) classes.push("w3f-tag--light");
  if (variant) classes.push(TAG_VARIANT_CLASSES[variant]);
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};

// src/DATADISPLAY/Tag/Tag.tsx
import { useBridgeBind as useBridgeBind23 } from "@w3f/bridge";
import { jsx as jsx82 } from "react/jsx-runtime";
var Tag2 = forwardRef52(({
  color,
  light = TAG_DEFAULTS.light,
  variant,
  children,
  className = TAG_DEFAULTS.className,
  style = {},
  unstyled = TAG_DEFAULTS.unstyled,
  bindId,
  ...rest
}, ref) => {
  useBridgeBind23({ bindId });
  const classes = buildTagClasses(color, light, className, unstyled, variant);
  return /* @__PURE__ */ jsx82("span", { ref, className: classes, style, ...rest, children });
});
Tag2.displayName = "Tag";

// src/DATADISPLAY/Tooltip/Tooltip.tsx
import { forwardRef as forwardRef53 } from "react";

// src/DATADISPLAY/Tooltip/Tooltip.constants.ts
var TOOLTIP_DEFAULTS = {
  message: "Tooltip",
  position: "top",
  showDelay: 0,
  hideDelay: 0,
  arrow: true,
  variant: "dark",
  unstyled: false
};

// src/DATADISPLAY/Tooltip/Tooltip.utils.ts
var VARIANT_CLASSES = {
  dark: "w3f-tooltip-dark",
  light: "w3f-tooltip-light",
  primary: "w3f-tooltip-primary",
  success: "w3f-tooltip-success",
  warning: "w3f-tooltip-warning",
  danger: "w3f-tooltip-danger",
  info: "w3f-tooltip-info"
};
var buildTooltipClasses = (position, variant, isVisible, unstyled) => {
  if (unstyled) {
    return ["w3f-tooltip-content", "w3f-tooltip--unstyled", isVisible && "w3f-tooltip-visible"].filter(Boolean).join(" ");
  }
  const classes = [
    "w3f-tooltip-content",
    `w3f-tooltip-${position}`,
    VARIANT_CLASSES[variant] || VARIANT_CLASSES.dark
  ];
  if (isVisible) classes.push("w3f-tooltip-visible");
  return classes.filter(Boolean).join(" ");
};
var buildArrowClasses = (position) => {
  return `w3f-tooltip-arrow w3f-tooltip-arrow-${position}`;
};

// src/DATADISPLAY/Tooltip/Tooltip.hooks.ts
import { useState as useState46, useCallback as useCallback37, useEffect as useEffect31, useRef as useRef27 } from "react";
var useTooltipVisibility = (showDelay, hideDelay) => {
  const [isVisible, setIsVisible] = useState46(false);
  const showTimerRef = useRef27(null);
  const hideTimerRef = useRef27(null);
  const handleMouseEnter = useCallback37(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    showTimerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, showDelay);
  }, [showDelay]);
  const handleMouseLeave = useCallback37(() => {
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);
  }, [hideDelay]);
  useEffect31(() => {
    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);
  return { isVisible, handleMouseEnter, handleMouseLeave };
};

// src/DATADISPLAY/Tooltip/Tooltip.tsx
import { jsx as jsx83, jsxs as jsxs60 } from "react/jsx-runtime";
var Tooltip = forwardRef53(({ children, config = {}, unstyled = TOOLTIP_DEFAULTS.unstyled }, ref) => {
  const {
    message = TOOLTIP_DEFAULTS.message,
    position = TOOLTIP_DEFAULTS.position,
    showDelay = TOOLTIP_DEFAULTS.showDelay,
    hideDelay = TOOLTIP_DEFAULTS.hideDelay,
    arrow = TOOLTIP_DEFAULTS.arrow,
    variant = TOOLTIP_DEFAULTS.variant
  } = config;
  const { isVisible, handleMouseEnter, handleMouseLeave } = useTooltipVisibility(showDelay, hideDelay);
  const tooltipClass = buildTooltipClasses(position, variant, isVisible, unstyled);
  const arrowClass = buildArrowClasses(position);
  return /* @__PURE__ */ jsxs60(
    "div",
    {
      ref,
      className: "w3f-tooltip-wrapper",
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: [
        children,
        /* @__PURE__ */ jsxs60("div", { className: tooltipClass, children: [
          message,
          arrow && /* @__PURE__ */ jsx83("div", { className: arrowClass })
        ] })
      ]
    }
  );
});
Tooltip.displayName = "Tooltip";

// src/DATADISPLAY/Charts/BarChart/BarChart.tsx
import React67, { useRef as useRef29, useMemo as useMemo16 } from "react";
import { Group as Group2 } from "@visx/group";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";

// src/DATADISPLAY/Charts/BarChart/BarChart.constants.ts
var BAR_CHART_CLASSES = {
  root: "w3f-chart w3f-bar-chart",
  unstyled: "w3f-chart w3f-bar-chart w3f-bar-chart--unstyled",
  container: "w3f-chart__container"
};
var BAR_CHART_DEFAULTS = {
  width: 400,
  height: 300,
  color: "#6366f1",
  horizontal: false,
  unstyled: false
};
var BAR_CHART_MARGIN = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 50
};

// src/DATADISPLAY/Charts/BarChart/BarChart.utils.ts
import { scaleBand, scaleLinear } from "@visx/scale";
function buildBarChartClasses(className, unstyled) {
  const base = unstyled ? BAR_CHART_CLASSES.unstyled : BAR_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}
function buildBarScales(data, innerWidth, innerHeight, horizontal) {
  const labels = data.map((d) => d.label);
  const maxValue = Math.max(...data.map((d) => d.value), 0);
  if (horizontal) {
    const yScale2 = scaleBand({
      domain: labels,
      range: [0, innerHeight],
      padding: 0.2
    });
    const xScale2 = scaleLinear({
      domain: [0, maxValue * 1.1],
      range: [0, innerWidth],
      nice: true
    });
    return { xScale: xScale2, yScale: yScale2 };
  }
  const xScale = scaleBand({
    domain: labels,
    range: [0, innerWidth],
    padding: 0.2
  });
  const yScale = scaleLinear({
    domain: [0, maxValue * 1.1],
    range: [innerHeight, 0],
    nice: true
  });
  return { xScale, yScale };
}
function formatTick(value) {
  if (typeof value === "number") {
    return value >= 1e3 ? `${(value / 1e3).toFixed(1)}k` : String(value);
  }
  return String(value);
}

// src/DATADISPLAY/Charts/BarChart/BarChart.hooks.ts
import { useState as useState47, useEffect as useEffect32, useCallback as useCallback38 } from "react";
function useChartDimensions(containerRef, propWidth, propHeight, defaultWidth = 400, defaultHeight = 300) {
  const [dimensions, setDimensions] = useState47({
    width: propWidth ?? defaultWidth,
    height: propHeight ?? defaultHeight
  });
  const updateDimensions = useCallback38(() => {
    if (propWidth && propHeight) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setDimensions({
      width: propWidth ?? Math.max(rect.width, 100),
      height: propHeight ?? defaultHeight
    });
  }, [propWidth, propHeight, defaultWidth, defaultHeight, containerRef]);
  useEffect32(() => {
    if (propWidth && propHeight) {
      setDimensions({ width: propWidth, height: propHeight });
      return;
    }
    updateDimensions();
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(updateDimensions);
    ro.observe(el);
    return () => ro.disconnect();
  }, [propWidth, propHeight, updateDimensions, containerRef]);
  return dimensions;
}
function useHoveredIndex() {
  const [hoveredIndex, setHoveredIndex] = useState47(null);
  const onEnter = useCallback38((i) => setHoveredIndex(i), []);
  const onLeave = useCallback38(() => setHoveredIndex(null), []);
  return { hoveredIndex, onEnter, onLeave };
}

// src/DATADISPLAY/Charts/BarChart/BarChart.tsx
import { useBridgeBind as useBridgeBind24 } from "@w3f/bridge";
import { jsx as jsx84, jsxs as jsxs61 } from "react/jsx-runtime";
var BarChart = React67.forwardRef(
  ({
    data,
    width: propWidth,
    height: propHeight,
    color = BAR_CHART_DEFAULTS.color,
    horizontal = BAR_CHART_DEFAULTS.horizontal,
    unstyled = BAR_CHART_DEFAULTS.unstyled,
    bindId,
    className,
    ...rest
  }, ref) => {
    useBridgeBind24({ bindId });
    const containerRef = useRef29(null);
    const { width, height } = useChartDimensions(
      containerRef,
      propWidth,
      propHeight,
      BAR_CHART_DEFAULTS.width,
      BAR_CHART_DEFAULTS.height
    );
    const { hoveredIndex, onEnter, onLeave } = useHoveredIndex();
    const margin = BAR_CHART_MARGIN;
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
    const { xScale, yScale } = useMemo16(
      () => buildBarScales(data, innerWidth, innerHeight, horizontal),
      [data, innerWidth, innerHeight, horizontal]
    );
    const classes = useMemo16(
      () => buildBarChartClasses(className, unstyled),
      [className, unstyled]
    );
    return /* @__PURE__ */ jsx84("div", { ref, className: classes, ...rest, children: /* @__PURE__ */ jsx84("div", { ref: containerRef, className: "w3f-chart__container", children: /* @__PURE__ */ jsx84("svg", { width, height, children: /* @__PURE__ */ jsxs61(Group2, { top: margin.top, left: margin.left, children: [
      data.map((d, i) => {
        if (horizontal) {
          const bandScale2 = yScale;
          const linearScale2 = xScale;
          const barHeight2 = bandScale2.bandwidth?.() ?? 0;
          const barWidth2 = linearScale2(d.value) ?? 0;
          const barY2 = bandScale2(d.label) ?? 0;
          return /* @__PURE__ */ jsx84(
            Bar,
            {
              x: 0,
              y: barY2,
              width: barWidth2,
              height: barHeight2,
              fill: color,
              opacity: hoveredIndex === i ? 0.8 : 1,
              rx: 2,
              onMouseEnter: () => onEnter(i),
              onMouseLeave: onLeave
            },
            d.label
          );
        }
        const bandScale = xScale;
        const linearScale = yScale;
        const barWidth = bandScale.bandwidth?.() ?? 0;
        const barHeight = innerHeight - (linearScale(d.value) ?? 0);
        const barX = bandScale(d.label) ?? 0;
        const barY = linearScale(d.value) ?? 0;
        return /* @__PURE__ */ jsx84(
          Bar,
          {
            x: barX,
            y: barY,
            width: barWidth,
            height: barHeight,
            fill: color,
            opacity: hoveredIndex === i ? 0.8 : 1,
            rx: 2,
            onMouseEnter: () => onEnter(i),
            onMouseLeave: onLeave
          },
          d.label
        );
      }),
      /* @__PURE__ */ jsx84(
        AxisBottom,
        {
          top: innerHeight,
          scale: horizontal ? xScale : xScale,
          tickFormat: formatTick,
          stroke: "var(--w3f-text-secondary, #94a3b8)",
          tickStroke: "var(--w3f-text-secondary, #94a3b8)",
          tickLabelProps: { fill: "var(--w3f-text-secondary, #94a3b8)", fontSize: 11 }
        }
      ),
      /* @__PURE__ */ jsx84(
        AxisLeft,
        {
          scale: horizontal ? yScale : yScale,
          tickFormat: formatTick,
          stroke: "var(--w3f-text-secondary, #94a3b8)",
          tickStroke: "var(--w3f-text-secondary, #94a3b8)",
          tickLabelProps: { fill: "var(--w3f-text-secondary, #94a3b8)", fontSize: 11 }
        }
      )
    ] }) }) }) });
  }
);
BarChart.displayName = "BarChart";

// src/DATADISPLAY/Charts/LineChart/LineChart.tsx
import React68, { useRef as useRef30, useMemo as useMemo17 } from "react";
import { Group as Group3 } from "@visx/group";
import { LinePath } from "@visx/shape";
import { curveMonotoneX, curveLinear } from "@visx/curve";
import { AxisBottom as AxisBottom2, AxisLeft as AxisLeft2 } from "@visx/axis";

// src/DATADISPLAY/Charts/LineChart/LineChart.constants.ts
var LINE_CHART_CLASSES = {
  root: "w3f-chart w3f-line-chart",
  unstyled: "w3f-chart w3f-line-chart w3f-line-chart--unstyled",
  container: "w3f-chart__container"
};
var LINE_CHART_DEFAULTS = {
  width: 400,
  height: 300,
  color: "#6366f1",
  curved: true,
  showDots: true,
  unstyled: false
};
var LINE_CHART_MARGIN = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 50
};

// src/DATADISPLAY/Charts/LineChart/LineChart.utils.ts
import { scaleLinear as scaleLinear2 } from "@visx/scale";
function buildLineChartClasses(className, unstyled) {
  const base = unstyled ? LINE_CHART_CLASSES.unstyled : LINE_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}
function buildLineScales(data, innerWidth, innerHeight) {
  const xValues = data.map((d) => d.x);
  const yValues = data.map((d) => d.y);
  const xScale = scaleLinear2({
    domain: [Math.min(...xValues), Math.max(...xValues)],
    range: [0, innerWidth],
    nice: true
  });
  const yScale = scaleLinear2({
    domain: [Math.min(0, Math.min(...yValues)), Math.max(...yValues) * 1.1],
    range: [innerHeight, 0],
    nice: true
  });
  return { xScale, yScale };
}
function formatTick2(value) {
  if (typeof value === "number") {
    return value >= 1e3 ? `${(value / 1e3).toFixed(1)}k` : String(value);
  }
  return String(value);
}

// src/DATADISPLAY/Charts/LineChart/LineChart.tsx
import { useBridgeBind as useBridgeBind25 } from "@w3f/bridge";
import { jsx as jsx85, jsxs as jsxs62 } from "react/jsx-runtime";
var LineChart = React68.forwardRef(
  ({
    data,
    width: propWidth,
    height: propHeight,
    color = LINE_CHART_DEFAULTS.color,
    curved = LINE_CHART_DEFAULTS.curved,
    showDots = LINE_CHART_DEFAULTS.showDots,
    unstyled = LINE_CHART_DEFAULTS.unstyled,
    bindId,
    className,
    ...rest
  }, ref) => {
    useBridgeBind25({ bindId });
    const containerRef = useRef30(null);
    const { width, height } = useChartDimensions(
      containerRef,
      propWidth,
      propHeight,
      LINE_CHART_DEFAULTS.width,
      LINE_CHART_DEFAULTS.height
    );
    const margin = LINE_CHART_MARGIN;
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
    const { xScale, yScale } = useMemo17(
      () => buildLineScales(data, innerWidth, innerHeight),
      [data, innerWidth, innerHeight]
    );
    const classes = useMemo17(
      () => buildLineChartClasses(className, unstyled),
      [className, unstyled]
    );
    const getX = (d) => xScale(d.x) ?? 0;
    const getY = (d) => yScale(d.y) ?? 0;
    return /* @__PURE__ */ jsx85("div", { ref, className: classes, ...rest, children: /* @__PURE__ */ jsx85("div", { ref: containerRef, className: "w3f-chart__container", children: /* @__PURE__ */ jsx85("svg", { width, height, children: /* @__PURE__ */ jsxs62(Group3, { top: margin.top, left: margin.left, children: [
      /* @__PURE__ */ jsx85(
        LinePath,
        {
          data,
          x: getX,
          y: getY,
          stroke: color,
          strokeWidth: 2,
          curve: curved ? curveMonotoneX : curveLinear
        }
      ),
      showDots && data.map((d, i) => /* @__PURE__ */ jsx85(
        "circle",
        {
          cx: getX(d),
          cy: getY(d),
          r: 4,
          fill: color,
          stroke: "var(--w3f-surface, #fff)",
          strokeWidth: 2
        },
        i
      )),
      /* @__PURE__ */ jsx85(
        AxisBottom2,
        {
          top: innerHeight,
          scale: xScale,
          tickFormat: formatTick2,
          stroke: "var(--w3f-text-secondary, #94a3b8)",
          tickStroke: "var(--w3f-text-secondary, #94a3b8)",
          tickLabelProps: { fill: "var(--w3f-text-secondary, #94a3b8)", fontSize: 11 }
        }
      ),
      /* @__PURE__ */ jsx85(
        AxisLeft2,
        {
          scale: yScale,
          tickFormat: formatTick2,
          stroke: "var(--w3f-text-secondary, #94a3b8)",
          tickStroke: "var(--w3f-text-secondary, #94a3b8)",
          tickLabelProps: { fill: "var(--w3f-text-secondary, #94a3b8)", fontSize: 11 }
        }
      )
    ] }) }) }) });
  }
);
LineChart.displayName = "LineChart";

// src/DATADISPLAY/Charts/PieChart/PieChart.tsx
import React69, { useRef as useRef31, useMemo as useMemo18 } from "react";
import { Group as Group4 } from "@visx/group";
import { Pie } from "@visx/shape";

// src/DATADISPLAY/Charts/PieChart/PieChart.constants.ts
var PIE_CHART_CLASSES = {
  root: "w3f-chart w3f-pie-chart",
  unstyled: "w3f-chart w3f-pie-chart w3f-pie-chart--unstyled",
  container: "w3f-chart__container"
};
var PIE_CHART_DEFAULTS = {
  width: 300,
  height: 300,
  donut: false,
  unstyled: false
};
var PIE_COLOR_PALETTE = [
  "#6366f1",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
  "#ec4899"
];

// src/DATADISPLAY/Charts/PieChart/PieChart.utils.ts
function buildPieChartClasses(className, unstyled) {
  const base = unstyled ? PIE_CHART_CLASSES.unstyled : PIE_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}
function getSliceColor(datum, index) {
  return datum.color ?? PIE_COLOR_PALETTE[index % PIE_COLOR_PALETTE.length];
}
function getSliceValue(d) {
  return d.value;
}

// src/DATADISPLAY/Charts/PieChart/PieChart.tsx
import { useBridgeBind as useBridgeBind26 } from "@w3f/bridge";
import { jsx as jsx86, jsxs as jsxs63 } from "react/jsx-runtime";
var PieChart = React69.forwardRef(
  ({
    data,
    width: propWidth,
    height: propHeight,
    donut = PIE_CHART_DEFAULTS.donut,
    unstyled = PIE_CHART_DEFAULTS.unstyled,
    bindId,
    className,
    ...rest
  }, ref) => {
    useBridgeBind26({ bindId });
    const containerRef = useRef31(null);
    const { width, height } = useChartDimensions(
      containerRef,
      propWidth,
      propHeight,
      PIE_CHART_DEFAULTS.width,
      PIE_CHART_DEFAULTS.height
    );
    const { hoveredIndex, onEnter, onLeave } = useHoveredIndex();
    const radius = Math.min(width, height) / 2 - 10;
    const innerRadius = donut ? radius * 0.55 : 0;
    const centerX = width / 2;
    const centerY = height / 2;
    const classes = useMemo18(
      () => buildPieChartClasses(className, unstyled),
      [className, unstyled]
    );
    return /* @__PURE__ */ jsx86("div", { ref, className: classes, ...rest, children: /* @__PURE__ */ jsx86("div", { ref: containerRef, className: "w3f-chart__container", children: /* @__PURE__ */ jsx86("svg", { width, height, children: /* @__PURE__ */ jsx86(Group4, { top: centerY, left: centerX, children: /* @__PURE__ */ jsx86(
      Pie,
      {
        data,
        pieValue: getSliceValue,
        outerRadius: radius,
        innerRadius,
        padAngle: 0.01,
        children: (pie) => pie.arcs.map((arc, i) => {
          const pathD = pie.path(arc) ?? "";
          return /* @__PURE__ */ jsxs63("g", { children: [
            /* @__PURE__ */ jsx86(
              "path",
              {
                d: pathD,
                fill: getSliceColor(arc.data, i),
                opacity: hoveredIndex === i ? 0.8 : 1,
                onMouseEnter: () => onEnter(i),
                onMouseLeave: onLeave,
                style: { cursor: "pointer", transition: "opacity 0.15s" }
              }
            ),
            radius > 60 && /* @__PURE__ */ jsx86(
              "text",
              {
                x: pie.path.centroid(arc)[0],
                y: pie.path.centroid(arc)[1],
                textAnchor: "middle",
                dominantBaseline: "central",
                fill: "#fff",
                fontSize: 11,
                fontWeight: 600,
                pointerEvents: "none",
                children: arc.data.label
              }
            )
          ] }, arc.data.label);
        })
      }
    ) }) }) }) });
  }
);
PieChart.displayName = "PieChart";

// src/DATADISPLAY/Charts/AreaChart/AreaChart.tsx
import React70, { useRef as useRef32, useMemo as useMemo19, useId as useId12 } from "react";
import { Group as Group5 } from "@visx/group";
import { AreaClosed, LinePath as LinePath2 } from "@visx/shape";
import { curveMonotoneX as curveMonotoneX2 } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { AxisBottom as AxisBottom3, AxisLeft as AxisLeft3 } from "@visx/axis";

// src/DATADISPLAY/Charts/AreaChart/AreaChart.constants.ts
var AREA_CHART_CLASSES = {
  root: "w3f-chart w3f-area-chart",
  unstyled: "w3f-chart w3f-area-chart w3f-area-chart--unstyled",
  container: "w3f-chart__container"
};
var AREA_CHART_DEFAULTS = {
  width: 400,
  height: 300,
  color: "#6366f1",
  gradient: true,
  unstyled: false
};
var AREA_CHART_MARGIN = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 50
};

// src/DATADISPLAY/Charts/AreaChart/AreaChart.utils.ts
import { scaleLinear as scaleLinear3 } from "@visx/scale";
function buildAreaChartClasses(className, unstyled) {
  const base = unstyled ? AREA_CHART_CLASSES.unstyled : AREA_CHART_CLASSES.root;
  return className ? `${base} ${className}` : base;
}
function buildAreaScales(data, innerWidth, innerHeight) {
  const xValues = data.map((d) => d.x);
  const yValues = data.map((d) => d.y);
  const xScale = scaleLinear3({
    domain: [Math.min(...xValues), Math.max(...xValues)],
    range: [0, innerWidth],
    nice: true
  });
  const yScale = scaleLinear3({
    domain: [0, Math.max(...yValues) * 1.1],
    range: [innerHeight, 0],
    nice: true
  });
  return { xScale, yScale };
}
function formatTick3(value) {
  if (typeof value === "number") {
    return value >= 1e3 ? `${(value / 1e3).toFixed(1)}k` : String(value);
  }
  return String(value);
}

// src/DATADISPLAY/Charts/AreaChart/AreaChart.tsx
import { useBridgeBind as useBridgeBind27 } from "@w3f/bridge";
import { jsx as jsx87, jsxs as jsxs64 } from "react/jsx-runtime";
var AreaChart = React70.forwardRef(
  ({
    data,
    width: propWidth,
    height: propHeight,
    color = AREA_CHART_DEFAULTS.color,
    gradient = AREA_CHART_DEFAULTS.gradient,
    unstyled = AREA_CHART_DEFAULTS.unstyled,
    bindId,
    className,
    ...rest
  }, ref) => {
    useBridgeBind27({ bindId });
    const containerRef = useRef32(null);
    const gradientId = useId12();
    const { width, height } = useChartDimensions(
      containerRef,
      propWidth,
      propHeight,
      AREA_CHART_DEFAULTS.width,
      AREA_CHART_DEFAULTS.height
    );
    const margin = AREA_CHART_MARGIN;
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
    const { xScale, yScale } = useMemo19(
      () => buildAreaScales(data, innerWidth, innerHeight),
      [data, innerWidth, innerHeight]
    );
    const classes = useMemo19(
      () => buildAreaChartClasses(className, unstyled),
      [className, unstyled]
    );
    const getX = (d) => xScale(d.x) ?? 0;
    const getY = (d) => yScale(d.y) ?? 0;
    const safeGradientId = gradientId.replace(/:/g, "_");
    return /* @__PURE__ */ jsx87("div", { ref, className: classes, ...rest, children: /* @__PURE__ */ jsx87("div", { ref: containerRef, className: "w3f-chart__container", children: /* @__PURE__ */ jsxs64("svg", { width, height, children: [
      gradient && /* @__PURE__ */ jsx87(
        LinearGradient,
        {
          id: safeGradientId,
          from: color,
          to: color,
          fromOpacity: 0.4,
          toOpacity: 0.05
        }
      ),
      /* @__PURE__ */ jsxs64(Group5, { top: margin.top, left: margin.left, children: [
        /* @__PURE__ */ jsx87(
          AreaClosed,
          {
            data,
            x: getX,
            y: getY,
            yScale,
            curve: curveMonotoneX2,
            fill: gradient ? `url(#${safeGradientId})` : color,
            fillOpacity: gradient ? 1 : 0.3
          }
        ),
        /* @__PURE__ */ jsx87(
          LinePath2,
          {
            data,
            x: getX,
            y: getY,
            stroke: color,
            strokeWidth: 2,
            curve: curveMonotoneX2
          }
        ),
        /* @__PURE__ */ jsx87(
          AxisBottom3,
          {
            top: innerHeight,
            scale: xScale,
            tickFormat: formatTick3,
            stroke: "var(--w3f-text-secondary, #94a3b8)",
            tickStroke: "var(--w3f-text-secondary, #94a3b8)",
            tickLabelProps: { fill: "var(--w3f-text-secondary, #94a3b8)", fontSize: 11 }
          }
        ),
        /* @__PURE__ */ jsx87(
          AxisLeft3,
          {
            scale: yScale,
            tickFormat: formatTick3,
            stroke: "var(--w3f-text-secondary, #94a3b8)",
            tickStroke: "var(--w3f-text-secondary, #94a3b8)",
            tickLabelProps: { fill: "var(--w3f-text-secondary, #94a3b8)", fontSize: 11 }
          }
        )
      ] })
    ] }) }) });
  }
);
AreaChart.displayName = "AreaChart";

// src/DATADISPLAY/Charts/ScatterPlot/ScatterPlot.tsx
import React71, { useRef as useRef33, useMemo as useMemo20 } from "react";
import { Group as Group6 } from "@visx/group";
import { Circle as Circle2 } from "@visx/shape";
import { AxisBottom as AxisBottom4, AxisLeft as AxisLeft4 } from "@visx/axis";

// src/DATADISPLAY/Charts/ScatterPlot/ScatterPlot.constants.ts
var SCATTER_PLOT_CLASSES = {
  root: "w3f-chart w3f-scatter-plot",
  unstyled: "w3f-chart w3f-scatter-plot w3f-scatter-plot--unstyled",
  container: "w3f-chart__container"
};
var SCATTER_PLOT_DEFAULTS = {
  width: 400,
  height: 300,
  color: "#6366f1",
  defaultPointSize: 5,
  unstyled: false
};
var SCATTER_PLOT_MARGIN = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 50
};

// src/DATADISPLAY/Charts/ScatterPlot/ScatterPlot.utils.ts
import { scaleLinear as scaleLinear4 } from "@visx/scale";
function buildScatterPlotClasses(className, unstyled) {
  const base = unstyled ? SCATTER_PLOT_CLASSES.unstyled : SCATTER_PLOT_CLASSES.root;
  return className ? `${base} ${className}` : base;
}
function buildScatterScales(data, innerWidth, innerHeight) {
  const xValues = data.map((d) => d.x);
  const yValues = data.map((d) => d.y);
  const xScale = scaleLinear4({
    domain: [Math.min(...xValues) * 0.9, Math.max(...xValues) * 1.1],
    range: [0, innerWidth],
    nice: true
  });
  const yScale = scaleLinear4({
    domain: [Math.min(0, Math.min(...yValues)), Math.max(...yValues) * 1.1],
    range: [innerHeight, 0],
    nice: true
  });
  return { xScale, yScale };
}
function formatTick4(value) {
  if (typeof value === "number") {
    return value >= 1e3 ? `${(value / 1e3).toFixed(1)}k` : String(value);
  }
  return String(value);
}

// src/DATADISPLAY/Charts/ScatterPlot/ScatterPlot.tsx
import { useBridgeBind as useBridgeBind28 } from "@w3f/bridge";
import { jsx as jsx88, jsxs as jsxs65 } from "react/jsx-runtime";
var ScatterPlot = React71.forwardRef(
  ({
    data,
    width: propWidth,
    height: propHeight,
    color = SCATTER_PLOT_DEFAULTS.color,
    unstyled = SCATTER_PLOT_DEFAULTS.unstyled,
    bindId,
    className,
    ...rest
  }, ref) => {
    useBridgeBind28({ bindId });
    const containerRef = useRef33(null);
    const { width, height } = useChartDimensions(
      containerRef,
      propWidth,
      propHeight,
      SCATTER_PLOT_DEFAULTS.width,
      SCATTER_PLOT_DEFAULTS.height
    );
    const { hoveredIndex, onEnter, onLeave } = useHoveredIndex();
    const margin = SCATTER_PLOT_MARGIN;
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
    const { xScale, yScale } = useMemo20(
      () => buildScatterScales(data, innerWidth, innerHeight),
      [data, innerWidth, innerHeight]
    );
    const classes = useMemo20(
      () => buildScatterPlotClasses(className, unstyled),
      [className, unstyled]
    );
    return /* @__PURE__ */ jsx88("div", { ref, className: classes, ...rest, children: /* @__PURE__ */ jsx88("div", { ref: containerRef, className: "w3f-chart__container", children: /* @__PURE__ */ jsx88("svg", { width, height, children: /* @__PURE__ */ jsxs65(Group6, { top: margin.top, left: margin.left, children: [
      data.map((d, i) => /* @__PURE__ */ jsx88(
        Circle2,
        {
          cx: xScale(d.x) ?? 0,
          cy: yScale(d.y) ?? 0,
          r: d.size ?? SCATTER_PLOT_DEFAULTS.defaultPointSize,
          fill: d.color ?? color,
          opacity: hoveredIndex === i ? 0.7 : 0.85,
          onMouseEnter: () => onEnter(i),
          onMouseLeave: onLeave,
          style: { cursor: "pointer", transition: "opacity 0.15s" }
        },
        i
      )),
      /* @__PURE__ */ jsx88(
        AxisBottom4,
        {
          top: innerHeight,
          scale: xScale,
          tickFormat: formatTick4,
          stroke: "var(--w3f-text-secondary, #94a3b8)",
          tickStroke: "var(--w3f-text-secondary, #94a3b8)",
          tickLabelProps: { fill: "var(--w3f-text-secondary, #94a3b8)", fontSize: 11 }
        }
      ),
      /* @__PURE__ */ jsx88(
        AxisLeft4,
        {
          scale: yScale,
          tickFormat: formatTick4,
          stroke: "var(--w3f-text-secondary, #94a3b8)",
          tickStroke: "var(--w3f-text-secondary, #94a3b8)",
          tickLabelProps: { fill: "var(--w3f-text-secondary, #94a3b8)", fontSize: 11 }
        }
      )
    ] }) }) }) });
  }
);
ScatterPlot.displayName = "ScatterPlot";

// src/FEEDBACK/Backdrop/Backdrop.tsx
import React72, { useMemo as useMemo21 } from "react";
import { createPortal as createPortal2 } from "react-dom";

// src/FEEDBACK/Backdrop/Backdrop.constants.ts
var BACKDROP_DEFAULTS = {
  transitionDuration: 300,
  invisible: false,
  showSpinner: true,
  spinnerColor: "primary",
  spinnerSize: "lg"
};

// src/FEEDBACK/Backdrop/Backdrop.utils.ts
function buildBackdropClasses(open, invisible, className) {
  return [
    "w3f-backdrop",
    open ? "w3f-backdrop--open" : "w3f-backdrop--closed",
    invisible && "w3f-backdrop--invisible",
    className
  ].filter(Boolean).join(" ");
}

// src/FEEDBACK/Backdrop/Backdrop.hooks.ts
import { useState as useState48, useCallback as useCallback39, useEffect as useEffect33 } from "react";
var useScrollLock2 = (locked) => {
  useEffect33(() => {
    if (!locked) return;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
};

// src/FEEDBACK/Backdrop/Backdrop.tsx
import { jsx as jsx89 } from "react/jsx-runtime";
var Backdrop = React72.forwardRef(({
  open = false,
  children,
  invisible = BACKDROP_DEFAULTS.invisible,
  onClick,
  transitionDuration = BACKDROP_DEFAULTS.transitionDuration,
  className,
  sx,
  component: Component = "div",
  showSpinner = BACKDROP_DEFAULTS.showSpinner,
  spinnerColor = BACKDROP_DEFAULTS.spinnerColor,
  spinnerSize = BACKDROP_DEFAULTS.spinnerSize,
  ...rest
}, ref) => {
  useScrollLock2(open);
  const backdropClasses = useMemo21(
    () => buildBackdropClasses(open, invisible, className),
    [open, invisible, className]
  );
  const inlineStyles = useMemo21(() => ({
    transitionDuration: `${transitionDuration}ms`,
    ...sx
  }), [transitionDuration, sx]);
  if (!open) return null;
  const content = /* @__PURE__ */ jsx89(
    Component,
    {
      ref,
      className: backdropClasses,
      onClick,
      role: "presentation",
      style: inlineStyles,
      ...rest,
      children: children || showSpinner && /* @__PURE__ */ jsx89(
        ProgressSpinner_default,
        {
          mode: "indeterminate",
          color: spinnerColor,
          size: spinnerSize
        }
      )
    }
  );
  return createPortal2(content, document.body);
});
Backdrop.displayName = "Backdrop";

// src/FEEDBACK/Ripples/Ripple.tsx
import React73, { useCallback as useCallback41, useImperativeHandle, useMemo as useMemo22 } from "react";

// src/FEEDBACK/Ripples/Ripple.constants.ts
var RIPPLE_DEFAULTS = {
  duration: 600,
  enterDuration: 450,
  exitDuration: 400
};

// src/FEEDBACK/Ripples/Ripple.utils.ts
function buildRippleClasses(flat, disabled, className) {
  return [
    "w3f-ripple-container",
    flat && "w3f-ripple-flat",
    className
  ].filter(Boolean).join(" ");
}
function calculateRippleDimensions(rect, x, y, centered, radius) {
  let diameter;
  if (radius) {
    diameter = radius * 2;
  } else {
    diameter = Math.max(rect.width, rect.height);
  }
  const half = diameter / 2;
  let left;
  let top;
  if (centered) {
    left = (rect.width - diameter) / 2;
    top = (rect.height - diameter) / 2;
  } else {
    left = x - rect.left - half;
    top = y - rect.top - half;
  }
  return {
    width: diameter,
    height: diameter,
    left,
    top
  };
}

// src/FEEDBACK/Ripples/Ripple.hooks.ts
import { useRef as useRef34, useCallback as useCallback40 } from "react";
var useRipple = (options = {}) => {
  const {
    disabled = false,
    centered = false,
    unbounded = false,
    radius,
    enterDuration = RIPPLE_DEFAULTS.enterDuration,
    exitDuration = RIPPLE_DEFAULTS.exitDuration
  } = options;
  const containerRef = useRef34(null);
  const createRipple = useCallback40((e) => {
    if (disabled) return;
    const container = containerRef.current;
    if (!container) return;
    const ripple = document.createElement("span");
    ripple.classList.add("w3f-ripple");
    const rect = container.getBoundingClientRect();
    const dims = calculateRippleDimensions(rect, e.clientX, e.clientY, centered, radius);
    ripple.style.width = ripple.style.height = `${dims.width}px`;
    ripple.style.left = `${dims.left}px`;
    ripple.style.top = `${dims.top}px`;
    const totalDuration = enterDuration + exitDuration;
    if (totalDuration !== RIPPLE_DEFAULTS.enterDuration + RIPPLE_DEFAULTS.exitDuration) {
      ripple.style.animationDuration = `${totalDuration}ms`;
    }
    if (unbounded) {
      ripple.style.overflow = "visible";
    }
    container.appendChild(ripple);
    const timeoutId = setTimeout(() => {
      ripple.remove();
    }, totalDuration);
    ripple.dataset.timeoutId = String(timeoutId);
  }, [disabled, centered, unbounded, radius, enterDuration, exitDuration]);
  const clearRipples = useCallback40(() => {
    const container = containerRef.current;
    if (!container) return;
    const ripples = container.querySelectorAll(".w3f-ripple");
    ripples.forEach((ripple) => {
      const timeoutId = ripple.dataset.timeoutId;
      if (timeoutId) clearTimeout(Number(timeoutId));
      ripple.remove();
    });
  }, []);
  return { containerRef, createRipple, clearRipples };
};

// src/FEEDBACK/Ripples/Ripple.tsx
import { jsx as jsx90 } from "react/jsx-runtime";
var Ripple = React73.forwardRef(({
  children,
  className = "",
  color,
  disabled = false,
  unbounded = false,
  centered = false,
  radius,
  animation,
  flat = false,
  role = "button",
  tabIndex = 0,
  onClick,
  ...rest
}, ref) => {
  const { containerRef, createRipple, clearRipples } = useRipple({
    disabled,
    centered,
    unbounded,
    radius,
    enterDuration: animation?.enterDuration ?? RIPPLE_DEFAULTS.enterDuration,
    exitDuration: animation?.exitDuration ?? RIPPLE_DEFAULTS.exitDuration
  });
  useImperativeHandle(ref, () => ({
    launch: (x, y) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      createRipple({
        clientX: x ?? rect.left + rect.width / 2,
        clientY: y ?? rect.top + rect.height / 2
      });
    },
    fadeOutAll: clearRipples
  }), [containerRef, createRipple, clearRipples]);
  const handleClick = useCallback41((e) => {
    createRipple(e);
    onClick?.(e);
  }, [createRipple, onClick]);
  const handleKeyDown = useCallback41((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        createRipple({
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2
        });
      }
      onClick?.(e);
    }
  }, [containerRef, createRipple, onClick]);
  const containerClasses = useMemo22(
    () => buildRippleClasses(flat, disabled, className),
    [flat, disabled, className]
  );
  return /* @__PURE__ */ jsx90(
    "div",
    {
      ref: containerRef,
      className: containerClasses,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      role,
      tabIndex: disabled ? -1 : tabIndex,
      "aria-disabled": disabled,
      "data-ripple-color": color,
      ...rest,
      children: /* @__PURE__ */ jsx90("div", { className: "w3f-ripple-content", children })
    }
  );
});
Ripple.displayName = "Ripple";

// src/FEEDBACK/Snackbar/Snackbar.tsx
import React74, { useState as useState49, useEffect as useEffect34, useCallback as useCallback42, useMemo as useMemo23 } from "react";

// src/FEEDBACK/Snackbar/Snackbar.constants.ts
var SNACKBAR_DEFAULTS = {
  autoHideDuration: 3e3,
  variant: "default",
  anchorOrigin: { vertical: "bottom", horizontal: "center" },
  exitAnimationDuration: 150
};
var SNACKBAR_VARIANTS = {
  default: "",
  success: "w3f-snackbar--success",
  warning: "w3f-snackbar--warning",
  danger: "w3f-snackbar--danger",
  info: "w3f-snackbar--info"
};

// src/FEEDBACK/Snackbar/Snackbar.utils.ts
function getSnackbarPositionKey(anchorOrigin) {
  return `${anchorOrigin.vertical}-${anchorOrigin.horizontal}`;
}
function buildAnchorClasses(anchorOrigin) {
  const posKey = getSnackbarPositionKey(anchorOrigin);
  return `w3f-snackbar-anchor w3f-snackbar-anchor--${posKey}`;
}
function buildSnackbarClasses(variant, isExiting, className) {
  return [
    "w3f-snackbar",
    SNACKBAR_VARIANTS[variant] || "",
    isExiting && "w3f-snackbar--exit",
    className
  ].filter(Boolean).join(" ");
}

// src/FEEDBACK/Snackbar/Snackbar.tsx
import { jsx as jsx91, jsxs as jsxs66 } from "react/jsx-runtime";
var Snackbar = React74.forwardRef(({
  open,
  message,
  onClose,
  autoHideDuration,
  variant = SNACKBAR_DEFAULTS.variant,
  anchorOrigin = SNACKBAR_DEFAULTS.anchorOrigin,
  action,
  resumeHideDuration,
  className,
  // Backwards-compatible aliases
  show,
  duration,
  ...rest
}, ref) => {
  const isOpen = open ?? show ?? false;
  const hideDuration = autoHideDuration ?? duration ?? SNACKBAR_DEFAULTS.autoHideDuration;
  const [isVisible, setIsVisible] = useState49(isOpen);
  const [isExiting, setIsExiting] = useState49(false);
  const [isPaused, setIsPaused] = useState49(false);
  const handleClose = useCallback42((reason = "timeout") => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
      onClose?.(null, reason);
    }, SNACKBAR_DEFAULTS.exitAnimationDuration);
  }, [onClose]);
  useEffect34(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsExiting(false);
    }
  }, [isOpen]);
  useEffect34(() => {
    if (!isOpen || hideDuration === null || hideDuration <= 0 || isPaused) return;
    const effectiveDuration = isPaused && resumeHideDuration != null ? resumeHideDuration : hideDuration;
    const timer = setTimeout(() => {
      handleClose("timeout");
    }, effectiveDuration);
    return () => clearTimeout(timer);
  }, [isOpen, hideDuration, isPaused, resumeHideDuration, handleClose]);
  useEffect34(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose("escapeKeyDown");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);
  const anchorClasses = useMemo23(
    () => buildAnchorClasses(anchorOrigin),
    [anchorOrigin]
  );
  const snackbarClasses = useMemo23(
    () => buildSnackbarClasses(variant, isExiting, className),
    [variant, isExiting, className]
  );
  if (!isVisible) return null;
  return /* @__PURE__ */ jsx91("div", { className: anchorClasses, children: /* @__PURE__ */ jsxs66(
    "div",
    {
      ref,
      className: snackbarClasses,
      role: "alert",
      "aria-live": "polite",
      "aria-atomic": "true",
      onMouseEnter: () => setIsPaused(true),
      onMouseLeave: () => setIsPaused(false),
      ...rest,
      children: [
        /* @__PURE__ */ jsx91("p", { className: "w3f-snackbar__message", children: message }),
        action ? /* @__PURE__ */ jsx91("div", { className: "w3f-snackbar__action", children: action }) : /* @__PURE__ */ jsx91(
          "button",
          {
            className: "w3f-snackbar__close",
            onClick: () => handleClose("clickaway"),
            "aria-label": "Cerrar notificacion",
            type: "button",
            children: "\xD7"
          }
        )
      ]
    }
  ) });
});
Snackbar.displayName = "Snackbar";

// src/LAYOUT/ButtonGrid/ButtonGrid.constants.ts
var BUTTON_GRID_DEFAULTS = {
  align: "start",
  as: "div"
};
var BUTTON_GRID_CLASSES = {
  base: "w3f-flex",
  gap: "w3f-gap-4",
  wrap: "w3f-flex-wrap",
  mt: "w3f-mt-4"
};
var BUTTON_GRID_ALIGN_MAP = {
  start: "w3f-items-start",
  center: "w3f-items-center",
  end: "w3f-items-end",
  stretch: "w3f-items-stretch"
};

// src/LAYOUT/ButtonGrid/ButtonGrid.utils.ts
function buildButtonGridClasses(align = "start", className) {
  return [
    BUTTON_GRID_CLASSES.base,
    BUTTON_GRID_CLASSES.gap,
    BUTTON_GRID_CLASSES.wrap,
    BUTTON_GRID_CLASSES.mt,
    BUTTON_GRID_ALIGN_MAP[align],
    className
  ].filter(Boolean).join(" ");
}

// src/LAYOUT/ButtonGrid/ButtonGrid.tsx
import { jsx as jsx92 } from "react/jsx-runtime";
var ButtonGrid = ({
  children,
  align = BUTTON_GRID_DEFAULTS.align,
  as: Element = BUTTON_GRID_DEFAULTS.as,
  className,
  style,
  ...rest
}) => {
  const classes = buildButtonGridClasses(align, className);
  return /* @__PURE__ */ jsx92(Element, { className: classes, style, ...rest, children });
};
ButtonGrid.displayName = "ButtonGrid";

// src/LAYOUT/Cell/Cell.constants.ts
var CELL_CLASSES = {
  base: "w3f-cell",
  content: "w3f-cell-content",
  center: "w3f-cell-center",
  vCenter: "w3f-cell-vcenter"
};

// src/LAYOUT/Cell/Cell.utils.ts
var buildCellClassNames = ({
  content,
  center,
  vCenter,
  className
}) => {
  const classes = [CELL_CLASSES.base];
  if (content) classes.push(CELL_CLASSES.content);
  if (center) classes.push(CELL_CLASSES.center);
  if (vCenter && !center) classes.push(CELL_CLASSES.vCenter);
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};

// src/LAYOUT/Cell/Cell.tsx
import { jsx as jsx93 } from "react/jsx-runtime";
var CellRow = ({ children, className = "", style, ...props }) => {
  return /* @__PURE__ */ jsx93("div", { className, style, ...props, children });
};
CellRow.displayName = "CellRow";
var Cell = ({
  children,
  content = false,
  center = false,
  vCenter = false,
  className = "",
  style,
  ...props
}) => {
  const classes = buildCellClassNames({ content, center, vCenter, className });
  return /* @__PURE__ */ jsx93("div", { className: classes, style, ...props, children });
};
Cell.displayName = "Cell";

// src/LAYOUT/GridWiithDrawers/GridWithDrawer.tsx
import React75, { useState as useState51 } from "react";

// src/LAYOUT/GridWiithDrawers/GridWithDrawer.constants.ts
var GRID_DRAWER_DEFAULTS = {
  gap: "1px",
  collapsedSize: 50,
  drawerIndex: 0
};
var GRID_DRAWER_CLASSES = {
  wrapper: "w3f-grid-divider-wrapper",
  drawerArea: "w3f-drawer-area",
  collapsed: "is-collapsed",
  toggleContainer: "w3f-drawer-toggle-container",
  toggleBtn: "w3f-drawer-btn"
};

// src/LAYOUT/GridWiithDrawers/GridWithDrawer.utils.ts
function buildDrawerWrapperClasses(isDrawerArea, isDrawerOpen) {
  return [
    GRID_DRAWER_CLASSES.wrapper,
    isDrawerArea ? GRID_DRAWER_CLASSES.drawerArea : "",
    isDrawerArea && !isDrawerOpen ? GRID_DRAWER_CLASSES.collapsed : ""
  ].filter(Boolean).join(" ");
}

// src/LAYOUT/GridWithDividers/GridWithDividers.hooks.ts
import { useState as useState50, useRef as useRef35, useCallback as useCallback43, useEffect as useEffect35 } from "react";

// src/LAYOUT/GridWithDividers/GridWithDividers.constants.ts
var GRID_DIVIDER_DEFAULTS = {
  gap: "1px",
  initialSize: 250,
  minSize: 100,
  maxSize: 600,
  orientation: "vertical"
};

// src/LAYOUT/GridWithDividers/GridWithDividers.hooks.ts
var useGridDividers = (configs) => {
  const [sizes, setSizes] = useState50(
    () => configs.map((c) => c.initialSize ?? GRID_DIVIDER_DEFAULTS.initialSize)
  );
  const [draggingIdx, setDraggingIdx] = useState50(-1);
  const startPosRef = useRef35(0);
  const startSizeRef = useRef35(0);
  const invertedRef = useRef35(false);
  const configsRef = useRef35(configs);
  const sizesRef = useRef35(sizes);
  configsRef.current = configs;
  sizesRef.current = sizes;
  const handleMouseMove = useCallback43((e) => {
    const idx = draggingIdx;
    if (idx < 0) return;
    const config = configsRef.current[idx];
    const orientation = config.orientation ?? GRID_DIVIDER_DEFAULTS.orientation;
    const currentPos = orientation === "vertical" ? e.clientX : e.clientY;
    let delta = currentPos - startPosRef.current;
    if (invertedRef.current) delta = -delta;
    const minSize = config.minSize ?? GRID_DIVIDER_DEFAULTS.minSize;
    const maxSize = config.maxSize ?? GRID_DIVIDER_DEFAULTS.maxSize;
    const newSize = Math.max(minSize, Math.min(maxSize, startSizeRef.current + delta));
    setSizes((prev) => {
      const next = [...prev];
      next[idx] = newSize;
      return next;
    });
  }, [draggingIdx]);
  const handleMouseUp = useCallback43(() => {
    setDraggingIdx(-1);
    invertedRef.current = false;
  }, []);
  useEffect35(() => {
    if (draggingIdx >= 0) {
      const config = configsRef.current[draggingIdx];
      const orientation = config.orientation ?? GRID_DIVIDER_DEFAULTS.orientation;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = orientation === "vertical" ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [draggingIdx, handleMouseMove, handleMouseUp]);
  return configs.map((config, idx) => ({
    size: sizesRef.current[idx] ?? (config.initialSize ?? GRID_DIVIDER_DEFAULTS.initialSize),
    isDragging: draggingIdx === idx,
    handleMouseDown: (e, inverted = false) => {
      const orientation = config.orientation ?? GRID_DIVIDER_DEFAULTS.orientation;
      startPosRef.current = orientation === "vertical" ? e.clientX : e.clientY;
      startSizeRef.current = sizesRef.current[idx] ?? (config.initialSize ?? GRID_DIVIDER_DEFAULTS.initialSize);
      invertedRef.current = inverted;
      setDraggingIdx(idx);
      e.preventDefault();
    },
    setSize: ((newSize) => {
      setSizes((prev) => {
        const next = [...prev];
        next[idx] = typeof newSize === "function" ? newSize(prev[idx]) : newSize;
        return next;
      });
    }),
    reset: () => {
      setSizes((prev) => {
        const next = [...prev];
        next[idx] = config.initialSize ?? GRID_DIVIDER_DEFAULTS.initialSize;
        return next;
      });
    }
  }));
};
var GridWithDividers_hooks_default = useGridDividers;

// src/LAYOUT/GridWithDividers/GridWithDividers.utils.ts
var gridDividerUtils = {
  /**
   * Reemplaza el tamaño de una fracción específica en el template CSS.
   */
  replaceTemplateSize: (template, index, newSize) => {
    const parts = template.trim().split(/\s+/);
    if (index >= 0 && index < parts.length) {
      parts[index] = `${newSize}px`;
    }
    return parts.join(" ");
  },
  /**
   * Identifica la posición de un área específica en un gridTemplateAreas.
   */
  findAreaPosition: (templateAreas, areaName) => {
    const rows = templateAreas.trim().split("\n").map((row) => row.trim().split(/\s+/));
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const colIndex = rows[rowIndex].indexOf(areaName);
      if (colIndex !== -1) {
        return { row: rowIndex, col: colIndex };
      }
    }
    return null;
  }
};
var GridWithDividers_utils_default = gridDividerUtils;

// src/LAYOUT/GridWithDividers/Divider.tsx
import { jsx as jsx94 } from "react/jsx-runtime";
var Divider = ({
  onMouseDown,
  isDragging,
  orientation = "vertical",
  className
}) => {
  return /* @__PURE__ */ jsx94(
    "div",
    {
      className,
      onMouseDown
    }
  );
};
Divider.displayName = "Divider";

// src/LAYOUT/GridWiithDrawers/ToggleButton.tsx
import { jsx as jsx95 } from "react/jsx-runtime";
var ToggleButton2 = ({
  isDrawerOpen,
  onToggle,
  className = ""
}) => {
  return /* @__PURE__ */ jsx95("div", { className: `${GRID_DRAWER_CLASSES.toggleContainer} ${className}`, children: /* @__PURE__ */ jsx95(
    "button",
    {
      className: GRID_DRAWER_CLASSES.toggleBtn,
      onClick: onToggle,
      type: "button",
      title: isDrawerOpen ? "Colapsar panel" : "Expandir panel",
      children: isDrawerOpen ? "\xAB" : "\xBB"
    }
  ) });
};
ToggleButton2.displayName = "ToggleButton";

// src/LAYOUT/GridWiithDrawers/GridWithDrawer.tsx
import { jsx as jsx96, jsxs as jsxs67 } from "react/jsx-runtime";
var GridWithDrawer = ({
  templateColumns,
  templateRows,
  templateAreas,
  drawerAreaName,
  gap = GRID_DRAWER_DEFAULTS.gap,
  dividers = [],
  children,
  style = {}
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState51(true);
  const dividerStates = GridWithDividers_hooks_default(dividers);
  let adjustedTemplateColumns = templateColumns;
  let adjustedTemplateRows = templateRows;
  dividers.forEach((config, index) => {
    const state = dividerStates[index];
    const targetTemplate = config.orientation === "vertical" ? adjustedTemplateColumns : adjustedTemplateRows;
    const targetIndex = config.orientation === "vertical" ? config.columnIndex : config.rowIndex;
    if (targetIndex !== void 0 && targetTemplate) {
      let newSize = state.size;
      if (index === GRID_DRAWER_DEFAULTS.drawerIndex) {
        newSize = isDrawerOpen ? state.size : GRID_DRAWER_DEFAULTS.collapsedSize;
      }
      const newTemplate = GridWithDividers_utils_default.replaceTemplateSize(targetTemplate, targetIndex, newSize);
      if (config.orientation === "vertical") {
        adjustedTemplateColumns = newTemplate;
      } else {
        adjustedTemplateRows = newTemplate;
      }
    }
  });
  const mapChildrenAndAddDividers = (childNodes) => {
    return React75.Children.map(childNodes, (child) => {
      if (!React75.isValidElement(child)) return child;
      const childProps = child.props;
      const gridArea = childProps.gridArea || childProps.style?.gridArea;
      const isDrawerArea = gridArea === drawerAreaName;
      const childStyle = childProps.style || {};
      const { overflow, overflowX, overflowY } = childStyle;
      const childContent = React75.cloneElement(child, {
        ...childProps,
        gridArea: void 0,
        style: {
          ...childStyle,
          gridArea: void 0,
          overflow: void 0,
          overflowX: void 0,
          overflowY: void 0,
          position: void 0,
          width: "100%",
          height: "100%"
        }
      });
      const wrapperClasses = buildDrawerWrapperClasses(isDrawerArea, isDrawerOpen);
      const applicableDividers = dividers.map((config, index) => ({ config, index })).filter(
        ({ config }) => config.between && config.between[0] === gridArea || config.area === gridArea
      );
      return /* @__PURE__ */ jsxs67(
        GridAreaItem,
        {
          gridArea,
          className: wrapperClasses,
          style: {
            position: "relative",
            overflow: isDrawerArea && !isDrawerOpen ? "hidden" : overflow || "visible",
            overflowX: isDrawerArea && !isDrawerOpen ? "hidden" : overflowX,
            overflowY: isDrawerArea && !isDrawerOpen ? "hidden" : overflowY
          },
          children: [
            isDrawerArea && /* @__PURE__ */ jsx96(
              ToggleButton2,
              {
                isDrawerOpen,
                onToggle: () => setIsDrawerOpen(!isDrawerOpen)
              }
            ),
            childContent,
            applicableDividers.map(({ config, index }) => {
              if (index === GRID_DRAWER_DEFAULTS.drawerIndex && !isDrawerOpen) return null;
              const state = dividerStates[index];
              const orientation = config.orientation || "vertical";
              const position = config.position || (orientation === "vertical" ? "right" : "bottom");
              const handleMouseDown = (e) => {
                const inverted = position === "left" || position === "top";
                state.handleMouseDown(e, inverted);
              };
              const dividerClass = [
                "w3f-divider",
                `w3f-divider-${orientation}`,
                `w3f-divider-${position}`,
                state.isDragging ? "is-dragging" : ""
              ].filter(Boolean).join(" ");
              return /* @__PURE__ */ jsx96(
                Divider,
                {
                  className: dividerClass,
                  onMouseDown: handleMouseDown,
                  orientation,
                  isDragging: state.isDragging
                },
                `divider-${index}`
              );
            })
          ]
        }
      );
    });
  };
  return /* @__PURE__ */ jsx96(
    Grid,
    {
      templateColumns: adjustedTemplateColumns,
      templateRows: adjustedTemplateRows,
      templateAreas,
      gap,
      style,
      children: mapChildrenAndAddDividers(children)
    }
  );
};
GridWithDrawer.displayName = "GridWithDrawer";

// src/LAYOUT/GridWithDividers/GridWithDividers.tsx
import React76 from "react";
import { jsx as jsx97, jsxs as jsxs68 } from "react/jsx-runtime";
var normalizeAreas = (areas) => {
  if (!areas) return void 0;
  return areas.trim().split("\n").map((row) => row.trim().replace(/^["']|["']$/g, "")).join("\n");
};
var GridWithDividers = ({
  templateColumns,
  templateRows,
  templateAreas,
  gap = GRID_DIVIDER_DEFAULTS.gap,
  dividers = [],
  children,
  style = {}
}) => {
  const dividerStates = GridWithDividers_hooks_default(dividers);
  let adjustedTemplateColumns = templateColumns;
  let adjustedTemplateRows = templateRows;
  dividers.forEach((config, index) => {
    const state = dividerStates[index];
    const targetIndex = config.orientation === "vertical" ? config.columnIndex : config.rowIndex;
    const targetTpl = config.orientation === "vertical" ? adjustedTemplateColumns : adjustedTemplateRows;
    if (targetIndex !== void 0 && targetTpl) {
      const newTpl = GridWithDividers_utils_default.replaceTemplateSize(targetTpl, targetIndex, state.size);
      if (config.orientation === "vertical") {
        adjustedTemplateColumns = newTpl;
      } else {
        adjustedTemplateRows = newTpl;
      }
    }
  });
  const mapChildrenAndAddDividers = (childNodes) => {
    return React76.Children.map(childNodes, (child) => {
      if (!child || !React76.isValidElement(child)) return child;
      const childProps = child.props;
      const gridArea = childProps.gridArea || childProps.style?.gridArea;
      const childStyle = childProps.style || {};
      const applicableDividers = dividers.map((config, index) => ({ config, index })).filter(({ config }) => config.between && config.between[0] === gridArea);
      if (applicableDividers.length === 0) return child;
      const { gridArea: _areaProp, style: childRestyle, ...restProps } = childProps;
      const childWithoutGridArea = React76.cloneElement(child, {
        ...restProps,
        gridArea: void 0,
        style: {
          ...childRestyle,
          gridArea: void 0,
          overflow: void 0,
          overflowX: void 0,
          overflowY: void 0,
          position: void 0,
          width: "100%",
          height: "100%"
        }
      });
      return /* @__PURE__ */ jsxs68(
        GridAreaItem,
        {
          gridArea,
          className: "w3f-grid-divider-wrapper",
          style: {
            position: "relative",
            overflow: childStyle.overflow || "visible",
            overflowX: childStyle.overflowX,
            overflowY: childStyle.overflowY
          },
          children: [
            childWithoutGridArea,
            applicableDividers.map(({ config, index }) => {
              const state = dividerStates[index];
              const orientation = config.orientation || "vertical";
              const position = config.position || (orientation === "vertical" ? "right" : "bottom");
              const inverted = position === "left" || position === "top";
              const dividerClass = [
                "w3f-divider",
                `w3f-divider-${orientation}`,
                `w3f-divider-${position}`,
                state.isDragging ? "is-dragging" : ""
              ].filter(Boolean).join(" ");
              return /* @__PURE__ */ jsx97(
                Divider,
                {
                  className: dividerClass,
                  onMouseDown: (e) => state.handleMouseDown(e, inverted),
                  orientation,
                  isDragging: state.isDragging
                },
                `divider-${index}`
              );
            })
          ]
        }
      );
    });
  };
  return /* @__PURE__ */ jsx97(
    Grid,
    {
      templateColumns: adjustedTemplateColumns,
      templateRows: adjustedTemplateRows,
      templateAreas: normalizeAreas(templateAreas),
      gap,
      style,
      children: mapChildrenAndAddDividers(children)
    }
  );
};
GridWithDividers.displayName = "GridWithDividers";

// src/LAYOUT/ImageList/ImageList.constants.ts
var IMAGE_LIST_DEFAULTS = {
  variant: "standard",
  gap: "16px",
  rowHeight: "auto",
  quiltedCols: 4,
  standardMinWidth: "250px"
};

// src/LAYOUT/ImageList/ImageList.utils.ts
function getTemplateColumns(variant, cols) {
  if (variant === "standard") {
    return cols ? `repeat(${cols}, 1fr)` : `repeat(auto-fill, minmax(${IMAGE_LIST_DEFAULTS.standardMinWidth}, 1fr))`;
  }
  return `repeat(${cols || IMAGE_LIST_DEFAULTS.quiltedCols}, 1fr)`;
}

// src/LAYOUT/ImageList/ImageCard.tsx
import { Fragment as Fragment14, jsx as jsx98, jsxs as jsxs69 } from "react/jsx-runtime";
var ImageCard = ({ item, height }) => /* @__PURE__ */ jsxs69(Fragment14, { children: [
  /* @__PURE__ */ jsx98(
    "img",
    {
      src: item.src,
      alt: item.title,
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        minHeight: typeof height === "number" ? "100%" : "auto"
      }
    }
  ),
  item.title && /* @__PURE__ */ jsx98("div", { style: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(0,0,0,0.6)",
    color: "white",
    padding: "8px 12px",
    fontSize: "0.9rem"
  }, children: item.title })
] });
ImageCard.displayName = "ImageCard";

// src/LAYOUT/ImageList/ImageList.tsx
import { jsx as jsx99 } from "react/jsx-runtime";
var ImageList = ({
  items,
  variant = IMAGE_LIST_DEFAULTS.variant,
  cols,
  gap = IMAGE_LIST_DEFAULTS.gap,
  rowHeight = IMAGE_LIST_DEFAULTS.rowHeight,
  className,
  style
}) => {
  const templateColumns = getTemplateColumns(variant, cols);
  return /* @__PURE__ */ jsx99(
    Grid,
    {
      templateColumns,
      gap,
      autoRows: typeof rowHeight === "number" ? `${rowHeight}px` : rowHeight,
      autoFlow: "row dense",
      className,
      style,
      alignItems: "stretch",
      justifyItems: "stretch",
      children: items.map((item) => {
        if (variant === "quilted" && (item.cols || item.rows)) {
          return /* @__PURE__ */ jsx99(
            GridAreaItem,
            {
              gridColumn: item.cols ? `span ${item.cols}` : void 0,
              gridRow: item.rows ? `span ${item.rows}` : void 0,
              style: { position: "relative", overflow: "hidden", borderRadius: "8px" },
              children: /* @__PURE__ */ jsx99(ImageCard, { item, height: rowHeight })
            },
            item.id
          );
        }
        return /* @__PURE__ */ jsx99(
          "div",
          {
            style: { position: "relative", overflow: "hidden", borderRadius: "8px", minHeight: "200px" },
            children: /* @__PURE__ */ jsx99(ImageCard, { item, height: rowHeight })
          },
          item.id
        );
      })
    }
  );
};
ImageList.displayName = "ImageList";

// src/LAYOUT/Row/Row.constants.ts
var ROW_CLASSES = {
  base: "w3f-row"
};
var COL_CLASSES = {
  base: "w3f-col"
};

// src/LAYOUT/Row/Row.utils.ts
function buildRowClasses(className) {
  return [ROW_CLASSES.base, className].filter(Boolean).join(" ");
}
function buildColClasses({
  col,
  sm,
  md,
  lg,
  className
}) {
  const classes = [COL_CLASSES.base];
  if (col) classes.push(`w3f-col-${col}`);
  if (sm) classes.push(`w3f-sm:col-${sm}`);
  if (md) classes.push(`w3f-md:col-${md}`);
  if (lg) classes.push(`w3f-lg:col-${lg}`);
  if (className) classes.push(className);
  return classes.join(" ");
}

// src/LAYOUT/Row/Row.tsx
import { jsx as jsx100 } from "react/jsx-runtime";
var Row = ({
  children,
  className,
  style,
  ...rest
}) => {
  const classes = buildRowClasses(className);
  return /* @__PURE__ */ jsx100("div", { className: classes, style, ...rest, children });
};
Row.displayName = "Row";

// src/LAYOUT/Row/Col.tsx
import { jsx as jsx101 } from "react/jsx-runtime";
var Col = ({
  children,
  className,
  col,
  sm,
  md,
  lg,
  style,
  ...rest
}) => {
  const classes = buildColClasses({ col, sm, md, lg, className });
  return /* @__PURE__ */ jsx101("div", { className: classes, style, ...rest, children });
};
Col.displayName = "Col";

// src/LAYOUT/Section/Section.constants.ts
var SECTION_CLASSES2 = {
  base: "w3f-mb-16",
  title: "w3f-text-3xl w3f-mb-4 w3f-text-gray-800"
};
var SUBSECTION_CLASSES = {
  base: "w3f-mt-8",
  title: "w3f-text-xl w3f-mb-4 w3f-text-gray-700"
};

// src/LAYOUT/Section/Section.utils.ts
function buildSectionClasses(className) {
  return [SECTION_CLASSES2.base, className].filter(Boolean).join(" ");
}
function buildSubSectionClasses(className) {
  return [SUBSECTION_CLASSES.base, className].filter(Boolean).join(" ");
}

// src/LAYOUT/Section/Section.tsx
import { jsx as jsx102, jsxs as jsxs70 } from "react/jsx-runtime";
var Section2 = ({
  children,
  title,
  as: Element = "section",
  className,
  style,
  ...rest
}) => {
  const classes = buildSectionClasses(className);
  return /* @__PURE__ */ jsxs70(Element, { className: classes, style, ...rest, children: [
    title && /* @__PURE__ */ jsx102("h2", { className: SECTION_CLASSES2.title, children: title }),
    children
  ] });
};
Section2.displayName = "Section";

// src/LAYOUT/Section/SubSection.tsx
import { jsx as jsx103, jsxs as jsxs71 } from "react/jsx-runtime";
var SubSection = ({
  children,
  title,
  className,
  style,
  ...rest
}) => {
  const classes = buildSubSectionClasses(className);
  return /* @__PURE__ */ jsxs71("div", { className: classes, style, ...rest, children: [
    title && /* @__PURE__ */ jsx103("h3", { className: SUBSECTION_CLASSES.title, children: title }),
    children
  ] });
};
SubSection.displayName = "SubSection";

// src/LAYOUT/Stack/Stack.constants.ts
var STACK_DEFAULTS = {
  horizontal: false,
  size: "default"
};
var STACK_CLASSES = {
  vertical: "w3f-stack",
  verticalSm: "w3f-stack-sm",
  horizontal: "w3f-h-stack"
};
var ALIGN_MAP = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline"
};
var JUSTIFY_MAP = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly"
};

// src/LAYOUT/Stack/Stack.utils.ts
function buildStackClasses(horizontal, size, spacing, gap, className) {
  const classes = [];
  if (horizontal) {
    classes.push(STACK_CLASSES.horizontal);
  } else {
    classes.push(size === "sm" ? STACK_CLASSES.verticalSm : STACK_CLASSES.vertical);
  }
  if (spacing && !gap) {
    classes.push(`w3f-gap-${spacing}`);
  }
  if (className) classes.push(className);
  return classes.join(" ");
}
function buildStackStyles(gap, align, justify, style) {
  const result = { ...style };
  if (gap) result.gap = gap;
  if (align) result.alignItems = ALIGN_MAP[align] ?? align;
  if (justify) result.justifyContent = JUSTIFY_MAP[justify] ?? justify;
  return Object.keys(result).length ? result : void 0;
}

// src/LAYOUT/Stack/Stack.tsx
import { jsx as jsx104 } from "react/jsx-runtime";
var Stack = ({
  as: Tag3 = "div",
  children,
  horizontal = STACK_DEFAULTS.horizontal,
  size = STACK_DEFAULTS.size,
  spacing,
  gap,
  align,
  justify,
  className,
  style,
  ...rest
}) => {
  const classes = buildStackClasses(horizontal, size, spacing, gap, className);
  const inlineStyle = buildStackStyles(gap, align, justify, style);
  return /* @__PURE__ */ jsx104(Tag3, { className: classes, style: inlineStyle, ...rest, children });
};
Stack.displayName = "Stack";

// src/LAYOUT/VerticalPadding/VerticalPadding.constants.ts
var VERTICAL_PADDING_DEFAULTS = {
  size: "md"
};
var SIZE_TO_PADDING_CLASS = {
  "0": "w3f-py-0",
  none: "w3f-py-0",
  xs: "w3f-py-1",
  sm: "w3f-py-2",
  md: "w3f-py-4",
  lg: "w3f-py-6",
  xl: "w3f-py-8",
  "2xl": "w3f-py-12",
  "3xl": "w3f-py-16"
};

// src/LAYOUT/VerticalPadding/VerticalPadding.utils.ts
var mapSizeToPaddingClass = (size) => {
  if (SIZE_TO_PADDING_CLASS[size]) {
    return SIZE_TO_PADDING_CLASS[size];
  }
  if (!isNaN(parseInt(size)) && size !== "") {
    return `w3f-py-${size}`;
  }
  return "w3f-py-4";
};
var buildVerticalPaddingClassNames = ({
  size,
  utilityClass,
  className
}) => {
  const classes = [];
  if (utilityClass) {
    classes.push(utilityClass);
  } else if (size) {
    classes.push(mapSizeToPaddingClass(size));
  }
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};

// src/LAYOUT/VerticalPadding/VerticalPadding.tsx
import { jsx as jsx105 } from "react/jsx-runtime";
var VerticalPadding = ({
  children,
  size = VERTICAL_PADDING_DEFAULTS.size,
  utilityClass,
  className,
  ...rest
}) => {
  const classNames = buildVerticalPaddingClassNames({
    size,
    utilityClass,
    className
  });
  return /* @__PURE__ */ jsx105("div", { className: classNames, ...rest, children });
};
VerticalPadding.displayName = "VerticalPadding";

// src/MEDIA/AudioPlayer/AudioPlayer.tsx
import React77, { useRef as useRef36, useCallback as useCallback45, useMemo as useMemo24 } from "react";
import {
  Play as Play2,
  Pause as Pause2,
  Volume2,
  VolumeX as VolumeX2,
  Volume1
} from "lucide-react";

// src/MEDIA/AudioPlayer/AudioPlayer.constants.ts
var AUDIO_BASE_CLASS = "w3f-audio-player";
var AUDIO_VARIANTS = {
  default: "",
  compact: "w3f-audio-player--compact",
  card: "w3f-audio-player--card",
  minimal: "w3f-audio-player--minimal"
};
var AUDIO_COLORS = {
  primary: "w3f-audio-player--primary",
  secondary: "w3f-audio-player--secondary",
  danger: "w3f-audio-player--danger",
  info: "w3f-audio-player--info"
};
var AUDIO_DEFAULTS = {
  autoPlay: false,
  loop: false,
  variant: "default",
  color: "primary",
  showVolume: true,
  showPlaybackSpeed: false,
  showProgress: true,
  playbackSpeeds: [0.5, 1, 1.5, 2],
  className: ""
};

// src/MEDIA/AudioPlayer/AudioPlayer.hooks.ts
import { useState as useState52, useCallback as useCallback44, useEffect as useEffect36 } from "react";
function useAudioPlayer(audioRef, callbacks) {
  const [state, setState] = useState52({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    playbackSpeed: 1,
    speedMenuOpen: false
  });
  const togglePlay = useCallback44(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [audioRef]);
  const seek = useCallback44(
    (time) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = Math.max(0, Math.min(time, audio.duration || 0));
    },
    [audioRef]
  );
  const setVolume = useCallback44(
    (vol) => {
      const audio = audioRef.current;
      if (!audio) return;
      const clamped = Math.max(0, Math.min(1, vol));
      audio.volume = clamped;
      audio.muted = clamped === 0;
      setState((s) => ({ ...s, volume: clamped, isMuted: clamped === 0 }));
    },
    [audioRef]
  );
  const toggleMute = useCallback44(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setState((s) => ({ ...s, isMuted: audio.muted }));
  }, [audioRef]);
  const setPlaybackSpeed = useCallback44(
    (speed) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.playbackRate = speed;
      setState((s) => ({ ...s, playbackSpeed: speed, speedMenuOpen: false }));
    },
    [audioRef]
  );
  const toggleSpeedMenu = useCallback44(() => {
    setState((s) => ({ ...s, speedMenuOpen: !s.speedMenuOpen }));
  }, []);
  useEffect36(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => {
      setState((s) => ({ ...s, isPlaying: true }));
      callbacks?.onPlay?.();
    };
    const onPause = () => {
      setState((s) => ({ ...s, isPlaying: false }));
      callbacks?.onPause?.();
    };
    const onEnded = () => {
      setState((s) => ({ ...s, isPlaying: false }));
      callbacks?.onEnded?.();
    };
    const onTimeUpdate = () => {
      setState((s) => ({
        ...s,
        currentTime: audio.currentTime,
        duration: audio.duration || 0
      }));
      callbacks?.onTimeUpdate?.(audio.currentTime, audio.duration || 0);
    };
    const onLoadedMetadata = () => {
      setState((s) => ({ ...s, duration: audio.duration || 0 }));
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [audioRef, callbacks]);
  return {
    state,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    setPlaybackSpeed,
    toggleSpeedMenu
  };
}

// src/MEDIA/AudioPlayer/AudioPlayer.utils.ts
function buildAudioPlayerClasses(variant, color, className) {
  return [
    AUDIO_BASE_CLASS,
    AUDIO_VARIANTS[variant] || "",
    AUDIO_COLORS[color] || "",
    className
  ].filter(Boolean).join(" ");
}
function formatTime(seconds) {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
function getProgressPercent(currentTime, duration) {
  if (!duration || duration === 0) return 0;
  return currentTime / duration * 100;
}

// src/MEDIA/AudioPlayer/AudioPlayer.tsx
import { jsx as jsx106, jsxs as jsxs72 } from "react/jsx-runtime";
var AudioPlayer = React77.forwardRef(
  ({
    src,
    title,
    artist,
    cover,
    autoPlay = AUDIO_DEFAULTS.autoPlay,
    loop = AUDIO_DEFAULTS.loop,
    variant = AUDIO_DEFAULTS.variant,
    color = AUDIO_DEFAULTS.color,
    showVolume = AUDIO_DEFAULTS.showVolume,
    showPlaybackSpeed = AUDIO_DEFAULTS.showPlaybackSpeed,
    showProgress = AUDIO_DEFAULTS.showProgress,
    playbackSpeeds = AUDIO_DEFAULTS.playbackSpeeds,
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate,
    className = AUDIO_DEFAULTS.className,
    ...rest
  }, ref) => {
    const audioRef = useRef36(null);
    const progressRef = useRef36(null);
    const callbacks = useMemo24(
      () => ({ onPlay, onPause, onEnded, onTimeUpdate }),
      [onPlay, onPause, onEnded, onTimeUpdate]
    );
    const {
      state,
      togglePlay,
      seek,
      setVolume,
      toggleMute,
      setPlaybackSpeed,
      toggleSpeedMenu
    } = useAudioPlayer(audioRef, callbacks);
    const rootClasses = useMemo24(
      () => buildAudioPlayerClasses(variant, color, className),
      [variant, color, className]
    );
    const progressPercent = getProgressPercent(state.currentTime, state.duration);
    const handleProgressClick = useCallback45(
      (e) => {
        const bar = progressRef.current;
        if (!bar || !state.duration) return;
        const rect = bar.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        seek(ratio * state.duration);
      },
      [seek, state.duration]
    );
    const handleKeyDown = useCallback45(
      (e) => {
        switch (e.key) {
          case " ":
            e.preventDefault();
            togglePlay();
            break;
          case "m":
          case "M":
            toggleMute();
            break;
        }
      },
      [togglePlay, toggleMute]
    );
    const handleVolumeChange = useCallback45(
      (e) => {
        setVolume(parseFloat(e.target.value));
      },
      [setVolume]
    );
    const VolumeIcon = state.isMuted || state.volume === 0 ? VolumeX2 : state.volume < 0.5 ? Volume1 : Volume2;
    const isCompact = variant === "compact";
    const isCard = variant === "card";
    const isMinimal = variant === "minimal";
    return /* @__PURE__ */ jsxs72(
      "div",
      {
        ref,
        className: rootClasses,
        onKeyDown: handleKeyDown,
        tabIndex: 0,
        role: "application",
        "aria-label": title ? `Audio player: ${title}` : "Audio player",
        ...rest,
        children: [
          /* @__PURE__ */ jsx106(
            "audio",
            {
              ref: audioRef,
              src: sanitizeUrl(src),
              autoPlay,
              loop,
              preload: "metadata"
            }
          ),
          isCard && cover && /* @__PURE__ */ jsx106("div", { className: "w3f-audio-player__cover", children: /* @__PURE__ */ jsx106(
            "img",
            {
              src: sanitizeUrl(cover),
              alt: title ? `${title} cover` : "Album cover",
              className: "w3f-audio-player__cover-img"
            }
          ) }),
          /* @__PURE__ */ jsxs72("div", { className: "w3f-audio-player__body", children: [
            (title || artist) && !isMinimal && /* @__PURE__ */ jsxs72("div", { className: "w3f-audio-player__info", children: [
              title && /* @__PURE__ */ jsx106("span", { className: "w3f-audio-player__title", children: title }),
              artist && /* @__PURE__ */ jsx106("span", { className: "w3f-audio-player__artist", children: artist })
            ] }),
            showProgress && /* @__PURE__ */ jsxs72("div", { className: "w3f-audio-player__progress-row", children: [
              !isCompact && /* @__PURE__ */ jsx106("span", { className: "w3f-audio-player__time", children: formatTime(state.currentTime) }),
              /* @__PURE__ */ jsx106(
                "div",
                {
                  ref: progressRef,
                  className: "w3f-audio-player__progress",
                  onClick: handleProgressClick,
                  role: "slider",
                  "aria-label": "Seek",
                  "aria-valuemin": 0,
                  "aria-valuemax": 100,
                  "aria-valuenow": Math.round(progressPercent),
                  children: /* @__PURE__ */ jsx106(
                    "div",
                    {
                      className: "w3f-audio-player__progress-fill",
                      style: { width: `${progressPercent}%` }
                    }
                  )
                }
              ),
              !isCompact && /* @__PURE__ */ jsx106("span", { className: "w3f-audio-player__time", children: formatTime(state.duration) })
            ] }),
            /* @__PURE__ */ jsxs72("div", { className: "w3f-audio-player__controls", children: [
              /* @__PURE__ */ jsx106(
                "button",
                {
                  className: "w3f-audio-player__btn w3f-audio-player__play-btn",
                  onClick: togglePlay,
                  "aria-label": state.isPlaying ? "Pause" : "Play",
                  type: "button",
                  children: state.isPlaying ? /* @__PURE__ */ jsx106(Pause2, { size: isCompact ? 16 : 20 }) : /* @__PURE__ */ jsx106(Play2, { size: isCompact ? 16 : 20 })
                }
              ),
              isCompact && /* @__PURE__ */ jsxs72("span", { className: "w3f-audio-player__time w3f-audio-player__time--inline", children: [
                formatTime(state.currentTime),
                " / ",
                formatTime(state.duration)
              ] }),
              isCompact && title && /* @__PURE__ */ jsx106("span", { className: "w3f-audio-player__title w3f-audio-player__title--inline", children: title }),
              /* @__PURE__ */ jsx106("span", { className: "w3f-audio-player__spacer" }),
              showVolume && !isMinimal && /* @__PURE__ */ jsxs72("div", { className: "w3f-audio-player__volume", children: [
                /* @__PURE__ */ jsx106(
                  "button",
                  {
                    className: "w3f-audio-player__btn",
                    onClick: toggleMute,
                    "aria-label": state.isMuted ? "Unmute" : "Mute",
                    type: "button",
                    children: /* @__PURE__ */ jsx106(VolumeIcon, { size: isCompact ? 14 : 18 })
                  }
                ),
                !isCompact && /* @__PURE__ */ jsx106(
                  "input",
                  {
                    className: "w3f-audio-player__volume-slider",
                    type: "range",
                    min: 0,
                    max: 1,
                    step: 0.05,
                    value: state.isMuted ? 0 : state.volume,
                    onChange: handleVolumeChange,
                    "aria-label": "Volume"
                  }
                )
              ] }),
              showPlaybackSpeed && !isMinimal && !isCompact && /* @__PURE__ */ jsxs72("div", { className: "w3f-audio-player__speed", children: [
                /* @__PURE__ */ jsxs72(
                  "button",
                  {
                    className: "w3f-audio-player__btn w3f-audio-player__speed-btn",
                    onClick: toggleSpeedMenu,
                    "aria-label": "Playback speed",
                    type: "button",
                    children: [
                      state.playbackSpeed,
                      "x"
                    ]
                  }
                ),
                state.speedMenuOpen && /* @__PURE__ */ jsx106("div", { className: "w3f-audio-player__speed-menu", children: playbackSpeeds.map((speed) => /* @__PURE__ */ jsxs72(
                  "button",
                  {
                    className: [
                      "w3f-audio-player__speed-option",
                      state.playbackSpeed === speed ? "w3f-audio-player__speed-option--active" : ""
                    ].filter(Boolean).join(" "),
                    onClick: () => setPlaybackSpeed(speed),
                    type: "button",
                    children: [
                      speed,
                      "x"
                    ]
                  },
                  speed
                )) })
              ] })
            ] })
          ] })
        ]
      }
    );
  }
);
AudioPlayer.displayName = "AudioPlayer";

// src/MEDIA/VideoPlayer/VideoPlayer.tsx
import React78, { useRef as useRef38, useCallback as useCallback47, useMemo as useMemo25 } from "react";
import {
  Play as Play3,
  Pause as Pause3,
  Volume2 as Volume22,
  VolumeX as VolumeX3,
  Volume1 as Volume12,
  Maximize,
  Minimize
} from "lucide-react";

// src/MEDIA/VideoPlayer/VideoPlayer.constants.ts
var VIDEO_BASE_CLASS = "w3f-video-player";
var VIDEO_ASPECT_RATIOS = {
  "16:9": "w3f-video-player--16-9",
  "4:3": "w3f-video-player--4-3",
  "21:9": "w3f-video-player--21-9",
  "1:1": "w3f-video-player--1-1"
};
var VIDEO_VARIANTS = {
  default: "",
  minimal: "w3f-video-player--minimal",
  cinema: "w3f-video-player--cinema"
};
var VIDEO_COLORS = {
  primary: "w3f-video-player--primary",
  secondary: "w3f-video-player--secondary",
  danger: "w3f-video-player--danger",
  info: "w3f-video-player--info"
};
var VIDEO_DEFAULTS = {
  controls: true,
  autoPlay: false,
  muted: false,
  loop: false,
  aspectRatio: "16:9",
  variant: "default",
  color: "primary",
  showProgress: true,
  showVolume: true,
  showFullscreen: true,
  showPlaybackSpeed: false,
  playbackSpeeds: [0.5, 1, 1.5, 2],
  className: ""
};
var CONTROLS_HIDE_DELAY = 3e3;

// src/MEDIA/VideoPlayer/VideoPlayer.hooks.ts
import { useState as useState53, useCallback as useCallback46, useRef as useRef37, useEffect as useEffect37 } from "react";
function useVideoPlayer(videoRef, containerRef, callbacks) {
  const [state, setState] = useState53({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isFullscreen: false,
    playbackSpeed: 1,
    controlsVisible: true,
    speedMenuOpen: false
  });
  const hideTimerRef = useRef37(null);
  const resetHideTimer = useCallback46(() => {
    setState((s) => ({ ...s, controlsVisible: true }));
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setState((s) => s.isPlaying ? { ...s, controlsVisible: false, speedMenuOpen: false } : s);
    }, CONTROLS_HIDE_DELAY);
  }, []);
  const togglePlay = useCallback46(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }, [videoRef]);
  const seek = useCallback46(
    (time) => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = Math.max(0, Math.min(time, video.duration || 0));
    },
    [videoRef]
  );
  const seekRelative = useCallback46(
    (delta) => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = Math.max(0, Math.min(video.currentTime + delta, video.duration || 0));
    },
    [videoRef]
  );
  const setVolume = useCallback46(
    (vol) => {
      const video = videoRef.current;
      if (!video) return;
      const clamped = Math.max(0, Math.min(1, vol));
      video.volume = clamped;
      video.muted = clamped === 0;
      setState((s) => ({ ...s, volume: clamped, isMuted: clamped === 0 }));
    },
    [videoRef]
  );
  const toggleMute = useCallback46(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setState((s) => ({ ...s, isMuted: video.muted }));
  }, [videoRef]);
  const toggleFullscreen = useCallback46(() => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  }, [containerRef]);
  const setPlaybackSpeed = useCallback46(
    (speed) => {
      const video = videoRef.current;
      if (!video) return;
      video.playbackRate = speed;
      setState((s) => ({ ...s, playbackSpeed: speed, speedMenuOpen: false }));
    },
    [videoRef]
  );
  const toggleSpeedMenu = useCallback46(() => {
    setState((s) => ({ ...s, speedMenuOpen: !s.speedMenuOpen }));
  }, []);
  useEffect37(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => {
      setState((s) => ({ ...s, isPlaying: true }));
      callbacks?.onPlay?.();
    };
    const onPause = () => {
      setState((s) => ({ ...s, isPlaying: false, controlsVisible: true }));
      callbacks?.onPause?.();
    };
    const onEnded = () => {
      setState((s) => ({ ...s, isPlaying: false, controlsVisible: true }));
      callbacks?.onEnded?.();
    };
    const onTimeUpdate = () => {
      setState((s) => ({
        ...s,
        currentTime: video.currentTime,
        duration: video.duration || 0
      }));
      callbacks?.onTimeUpdate?.(video.currentTime, video.duration || 0);
    };
    const onLoadedMetadata = () => {
      setState((s) => ({ ...s, duration: video.duration || 0 }));
    };
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [videoRef, callbacks]);
  useEffect37(() => {
    const onFsChange = () => {
      setState((s) => ({ ...s, isFullscreen: !!document.fullscreenElement }));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);
  useEffect37(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);
  return {
    state,
    togglePlay,
    seek,
    seekRelative,
    setVolume,
    toggleMute,
    toggleFullscreen,
    setPlaybackSpeed,
    toggleSpeedMenu,
    resetHideTimer
  };
}

// src/MEDIA/VideoPlayer/VideoPlayer.utils.ts
function buildVideoPlayerClasses(aspectRatio, variant, color, isFullscreen, className) {
  return [
    VIDEO_BASE_CLASS,
    VIDEO_ASPECT_RATIOS[aspectRatio] || "",
    VIDEO_VARIANTS[variant] || "",
    VIDEO_COLORS[color] || "",
    isFullscreen ? "w3f-video-player--fullscreen" : "",
    className
  ].filter(Boolean).join(" ");
}
function formatTime2(seconds) {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
function getProgressPercent2(currentTime, duration) {
  if (!duration || duration === 0) return 0;
  return currentTime / duration * 100;
}

// src/MEDIA/VideoPlayer/VideoPlayer.tsx
import { jsx as jsx107, jsxs as jsxs73 } from "react/jsx-runtime";
var VideoPlayer = React78.forwardRef(
  ({
    src,
    poster,
    autoPlay = VIDEO_DEFAULTS.autoPlay,
    muted = VIDEO_DEFAULTS.muted,
    loop = VIDEO_DEFAULTS.loop,
    controls = VIDEO_DEFAULTS.controls,
    width,
    height,
    aspectRatio = VIDEO_DEFAULTS.aspectRatio,
    variant = VIDEO_DEFAULTS.variant,
    color = VIDEO_DEFAULTS.color,
    showProgress = VIDEO_DEFAULTS.showProgress,
    showVolume = VIDEO_DEFAULTS.showVolume,
    showFullscreen = VIDEO_DEFAULTS.showFullscreen,
    showPlaybackSpeed = VIDEO_DEFAULTS.showPlaybackSpeed,
    playbackSpeeds = VIDEO_DEFAULTS.playbackSpeeds,
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate,
    className = VIDEO_DEFAULTS.className,
    style,
    ...rest
  }, ref) => {
    const videoRef = useRef38(null);
    const containerRef = useRef38(null);
    const progressRef = useRef38(null);
    const setRefs = useCallback47(
      (node) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );
    const callbacks = useMemo25(
      () => ({ onPlay, onPause, onEnded, onTimeUpdate }),
      [onPlay, onPause, onEnded, onTimeUpdate]
    );
    const {
      state,
      togglePlay,
      seek,
      seekRelative,
      setVolume,
      toggleMute,
      toggleFullscreen,
      setPlaybackSpeed,
      toggleSpeedMenu,
      resetHideTimer
    } = useVideoPlayer(videoRef, containerRef, callbacks);
    const rootClasses = useMemo25(
      () => buildVideoPlayerClasses(aspectRatio, variant, color, state.isFullscreen, className),
      [aspectRatio, variant, color, state.isFullscreen, className]
    );
    const progressPercent = getProgressPercent2(state.currentTime, state.duration);
    const handleProgressClick = useCallback47(
      (e) => {
        const bar = progressRef.current;
        if (!bar || !state.duration) return;
        const rect = bar.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        seek(ratio * state.duration);
      },
      [seek, state.duration]
    );
    const handleKeyDown = useCallback47(
      (e) => {
        switch (e.key) {
          case " ":
            e.preventDefault();
            togglePlay();
            break;
          case "m":
          case "M":
            toggleMute();
            break;
          case "f":
          case "F":
            toggleFullscreen();
            break;
          case "ArrowLeft":
            e.preventDefault();
            seekRelative(-5);
            break;
          case "ArrowRight":
            e.preventDefault();
            seekRelative(5);
            break;
        }
        resetHideTimer();
      },
      [togglePlay, toggleMute, toggleFullscreen, seekRelative, resetHideTimer]
    );
    const handleVolumeChange = useCallback47(
      (e) => {
        setVolume(parseFloat(e.target.value));
      },
      [setVolume]
    );
    const VolumeIcon = state.isMuted || state.volume === 0 ? VolumeX3 : state.volume < 0.5 ? Volume12 : Volume22;
    const containerStyle = {
      ...style,
      ...width ? { width } : {},
      ...height ? { height } : {}
    };
    const isMinimal = variant === "minimal";
    return /* @__PURE__ */ jsxs73(
      "div",
      {
        ref: setRefs,
        className: rootClasses,
        style: containerStyle,
        onMouseMove: resetHideTimer,
        onKeyDown: handleKeyDown,
        tabIndex: 0,
        role: "application",
        "aria-label": "Video player",
        ...rest,
        children: [
          /* @__PURE__ */ jsx107(
            "video",
            {
              ref: videoRef,
              className: "w3f-video-player__video",
              src: sanitizeUrl(src),
              poster: sanitizeUrl(poster),
              autoPlay,
              muted,
              loop,
              playsInline: true,
              onClick: togglePlay
            }
          ),
          controls && !state.isPlaying && /* @__PURE__ */ jsx107(
            "button",
            {
              className: "w3f-video-player__overlay-btn",
              onClick: togglePlay,
              "aria-label": "Play",
              type: "button",
              children: /* @__PURE__ */ jsx107(Play3, { size: 48 })
            }
          ),
          controls && /* @__PURE__ */ jsxs73(
            "div",
            {
              className: [
                "w3f-video-player__controls",
                state.controlsVisible ? "w3f-video-player__controls--visible" : ""
              ].filter(Boolean).join(" "),
              children: [
                showProgress && /* @__PURE__ */ jsx107(
                  "div",
                  {
                    ref: progressRef,
                    className: "w3f-video-player__progress",
                    onClick: handleProgressClick,
                    role: "slider",
                    "aria-label": "Seek",
                    "aria-valuemin": 0,
                    "aria-valuemax": 100,
                    "aria-valuenow": Math.round(progressPercent),
                    children: /* @__PURE__ */ jsx107(
                      "div",
                      {
                        className: "w3f-video-player__progress-fill",
                        style: { width: `${progressPercent}%` }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxs73("div", { className: "w3f-video-player__controls-row", children: [
                  /* @__PURE__ */ jsx107(
                    "button",
                    {
                      className: "w3f-video-player__btn",
                      onClick: togglePlay,
                      "aria-label": state.isPlaying ? "Pause" : "Play",
                      type: "button",
                      children: state.isPlaying ? /* @__PURE__ */ jsx107(Pause3, { size: 18 }) : /* @__PURE__ */ jsx107(Play3, { size: 18 })
                    }
                  ),
                  !isMinimal && /* @__PURE__ */ jsxs73("span", { className: "w3f-video-player__time", children: [
                    formatTime2(state.currentTime),
                    " / ",
                    formatTime2(state.duration)
                  ] }),
                  /* @__PURE__ */ jsx107("span", { className: "w3f-video-player__spacer" }),
                  showVolume && !isMinimal && /* @__PURE__ */ jsxs73("div", { className: "w3f-video-player__volume", children: [
                    /* @__PURE__ */ jsx107(
                      "button",
                      {
                        className: "w3f-video-player__btn",
                        onClick: toggleMute,
                        "aria-label": state.isMuted ? "Unmute" : "Mute",
                        type: "button",
                        children: /* @__PURE__ */ jsx107(VolumeIcon, { size: 18 })
                      }
                    ),
                    /* @__PURE__ */ jsx107(
                      "input",
                      {
                        className: "w3f-video-player__volume-slider",
                        type: "range",
                        min: 0,
                        max: 1,
                        step: 0.05,
                        value: state.isMuted ? 0 : state.volume,
                        onChange: handleVolumeChange,
                        "aria-label": "Volume"
                      }
                    )
                  ] }),
                  showPlaybackSpeed && !isMinimal && /* @__PURE__ */ jsxs73("div", { className: "w3f-video-player__speed", children: [
                    /* @__PURE__ */ jsxs73(
                      "button",
                      {
                        className: "w3f-video-player__btn w3f-video-player__speed-btn",
                        onClick: toggleSpeedMenu,
                        "aria-label": "Playback speed",
                        type: "button",
                        children: [
                          state.playbackSpeed,
                          "x"
                        ]
                      }
                    ),
                    state.speedMenuOpen && /* @__PURE__ */ jsx107("div", { className: "w3f-video-player__speed-menu", children: playbackSpeeds.map((speed) => /* @__PURE__ */ jsxs73(
                      "button",
                      {
                        className: [
                          "w3f-video-player__speed-option",
                          state.playbackSpeed === speed ? "w3f-video-player__speed-option--active" : ""
                        ].filter(Boolean).join(" "),
                        onClick: () => setPlaybackSpeed(speed),
                        type: "button",
                        children: [
                          speed,
                          "x"
                        ]
                      },
                      speed
                    )) })
                  ] }),
                  showFullscreen && /* @__PURE__ */ jsx107(
                    "button",
                    {
                      className: "w3f-video-player__btn",
                      onClick: toggleFullscreen,
                      "aria-label": state.isFullscreen ? "Exit fullscreen" : "Fullscreen",
                      type: "button",
                      children: state.isFullscreen ? /* @__PURE__ */ jsx107(Minimize, { size: 18 }) : /* @__PURE__ */ jsx107(Maximize, { size: 18 })
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    );
  }
);
VideoPlayer.displayName = "VideoPlayer";

// src/AUTH/AuthLogin/AuthLogin.tsx
import { forwardRef as forwardRef54, useCallback as useCallback49 } from "react";
import { Eye as Eye3, EyeOff as EyeOff3, Mail as Mail3, Lock as Lock3, User as User2, ArrowLeft as ArrowLeft2, Loader2 as Loader23, Chrome, Github as Github2, Facebook as Facebook2 } from "lucide-react";

// src/AUTH/AuthLogin/AuthLogin.constants.ts
var AUTH_DEFAULTS = {
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
var AUTH_CLASSES = {
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
var VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordMinLength: 8,
  nameMinLength: 2
};
var INITIAL_FORM_STATE = {
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
var VIEW_TITLES = {
  login: { title: "Welcome back", subtitle: "Sign in to your account" },
  register: { title: "Create account", subtitle: "Get started with a free account" },
  "forgot-password": { title: "Forgot password?", subtitle: "Enter your email to reset your password" },
  "reset-password": { title: "Reset password", subtitle: "Enter your new password" }
};

// src/AUTH/AuthLogin/AuthLogin.utils.ts
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

// src/AUTH/AuthLogin/AuthLogin.hooks.ts
import { useState as useState54, useCallback as useCallback48 } from "react";
function useAuthForm(initialView = "login", onViewChange) {
  const [state, setState] = useState54({
    ...INITIAL_FORM_STATE,
    view: initialView
  });
  const setField = useCallback48(
    (key, value) => {
      setState((prev) => ({
        ...prev,
        [key]: value,
        // Clear specific field error on change
        fieldErrors: { ...prev.fieldErrors, [key]: void 0 }
      }));
    },
    []
  );
  const setEmail = useCallback48((v) => setField("email", v), [setField]);
  const setPassword = useCallback48((v) => setField("password", v), [setField]);
  const setConfirmPassword = useCallback48(
    (v) => setField("confirmPassword", v),
    [setField]
  );
  const setName = useCallback48((v) => setField("name", v), [setField]);
  const setRememberMe = useCallback48((v) => setField("rememberMe", v), [setField]);
  const setAcceptTerms = useCallback48((v) => setField("acceptTerms", v), [setField]);
  const toggleShowPassword = useCallback48(() => {
    setState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  }, []);
  const toggleShowConfirmPassword = useCallback48(() => {
    setState((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }));
  }, []);
  const switchView = useCallback48(
    (view) => {
      setState((prev) => ({
        ...prev,
        view,
        fieldErrors: {},
        password: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false
      }));
      onViewChange?.(view);
    },
    [onViewChange]
  );
  const validateLogin = useCallback48(() => {
    const errors = validateLoginForm(state.email, state.password);
    setState((prev) => ({ ...prev, fieldErrors: errors }));
    return errors;
  }, [state.email, state.password]);
  const validateRegister = useCallback48(() => {
    const errors = validateRegisterForm(
      state.name,
      state.email,
      state.password,
      state.confirmPassword,
      state.acceptTerms
    );
    setState((prev) => ({ ...prev, fieldErrors: errors }));
    return errors;
  }, [state.name, state.email, state.password, state.confirmPassword, state.acceptTerms]);
  const validateForgot = useCallback48(() => {
    const errors = validateForgotForm(state.email);
    setState((prev) => ({ ...prev, fieldErrors: errors }));
    return errors;
  }, [state.email]);
  const tryLogin = useCallback48(() => {
    const errors = validateLoginForm(state.email, state.password);
    setState((prev) => ({ ...prev, fieldErrors: errors }));
    return !hasErrors(errors);
  }, [state.email, state.password]);
  const tryRegister = useCallback48(() => {
    const errors = validateRegisterForm(
      state.name,
      state.email,
      state.password,
      state.confirmPassword,
      state.acceptTerms
    );
    setState((prev) => ({ ...prev, fieldErrors: errors }));
    return !hasErrors(errors);
  }, [state.name, state.email, state.password, state.confirmPassword, state.acceptTerms]);
  const tryForgot = useCallback48(() => {
    const errors = validateForgotForm(state.email);
    setState((prev) => ({ ...prev, fieldErrors: errors }));
    return !hasErrors(errors);
  }, [state.email]);
  return {
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
    validateLogin,
    validateRegister,
    validateForgot,
    tryLogin,
    tryRegister,
    tryForgot
  };
}

// src/AUTH/AuthLogin/AuthLogin.tsx
import { Fragment as Fragment15, jsx as jsx108, jsxs as jsxs74 } from "react/jsx-runtime";
var DEFAULT_SOCIAL_PROVIDERS = [
  { id: "google", name: "Google", icon: /* @__PURE__ */ jsx108(Chrome, { size: 18 }), color: "#DB4437" },
  { id: "facebook", name: "Facebook", icon: /* @__PURE__ */ jsx108(Facebook2, { size: 18 }), color: "#4267B2" },
  { id: "github", name: "GitHub", icon: /* @__PURE__ */ jsx108(Github2, { size: 18 }), color: "#333333" }
];
function PasswordStrengthBar({ password }) {
  if (!password) return null;
  const { strength, score } = validatePassword(password);
  const colors = ["#ef4444", "#f59e0b", "#22c55e", "#16a34a"];
  return /* @__PURE__ */ jsxs74("div", { className: AUTH_CLASSES.strengthBar, children: [
    [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx108(
      "div",
      {
        className: AUTH_CLASSES.strengthSegment,
        style: { backgroundColor: i <= score ? colors[score - 1] : void 0 }
      },
      i
    )),
    /* @__PURE__ */ jsx108("span", { className: AUTH_CLASSES.strengthLabel, children: strength })
  ] });
}
var AuthLogin = forwardRef54(
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
    const handleLoginSubmit = useCallback49(
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
    const handleRegisterSubmit = useCallback49(
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
    const handleForgotSubmit = useCallback49(
      (e) => {
        e.preventDefault();
        if (loading) return;
        if (tryForgot()) {
          onForgotPassword?.(state.email);
        }
      },
      [loading, tryForgot, onForgotPassword, state.email]
    );
    const renderHeader = () => /* @__PURE__ */ jsxs74("div", { className: AUTH_CLASSES.header, children: [
      logo && /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.logo, children: logo }),
      /* @__PURE__ */ jsx108("h2", { className: AUTH_CLASSES.title, children: displayTitle }),
      /* @__PURE__ */ jsx108("p", { className: AUTH_CLASSES.subtitle, children: displaySubtitle })
    ] });
    const renderError = () => error ? /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.error, children: error }) : null;
    const renderSocial = () => {
      if (!showSocialLogin || providers.length === 0) return null;
      return /* @__PURE__ */ jsxs74(Fragment15, { children: [
        /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.divider, children: /* @__PURE__ */ jsx108("span", { className: AUTH_CLASSES.dividerText, children: "or" }) }),
        /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.social, children: providers.map((p) => /* @__PURE__ */ jsxs74(
          "button",
          {
            type: "button",
            className: AUTH_CLASSES.socialBtn,
            style: p.color ? { "--w3f-auth-social-accent": p.color } : void 0,
            onClick: () => onSocialLogin?.(p.id),
            disabled: loading,
            children: [
              p.icon,
              /* @__PURE__ */ jsx108("span", { children: p.name })
            ]
          },
          p.id
        )) })
      ] });
    };
    const renderLoginForm = () => /* @__PURE__ */ jsxs74("form", { className: AUTH_CLASSES.form, onSubmit: handleLoginSubmit, noValidate: true, children: [
      /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.field, children: /* @__PURE__ */ jsx108(
        Input_default,
        {
          label: "Email",
          type: "email",
          value: state.email,
          onChange: (e) => setEmail(e.target.value),
          leadingIcon: /* @__PURE__ */ jsx108(Mail3, { size: 18 }),
          error: state.fieldErrors.email,
          autoComplete: "email",
          required: true
        }
      ) }),
      /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.field, children: /* @__PURE__ */ jsx108(
        Input_default,
        {
          label: "Password",
          type: state.showPassword ? "text" : "password",
          value: state.password,
          onChange: (e) => setPassword(e.target.value),
          leadingIcon: /* @__PURE__ */ jsx108(Lock3, { size: 18 }),
          trailingIcon: state.showPassword ? /* @__PURE__ */ jsx108(EyeOff3, { size: 18 }) : /* @__PURE__ */ jsx108(Eye3, { size: 18 }),
          onIconClick: toggleShowPassword,
          error: state.fieldErrors.password,
          autoComplete: "current-password",
          required: true
        }
      ) }),
      /* @__PURE__ */ jsxs74("div", { className: AUTH_CLASSES.rememberRow, children: [
        showRememberMe && /* @__PURE__ */ jsx108(
          Checkbox_default,
          {
            label: "Remember me",
            checked: state.rememberMe,
            onChange: setRememberMe
          }
        ),
        showForgotPassword && /* @__PURE__ */ jsx108(
          "button",
          {
            type: "button",
            className: AUTH_CLASSES.footerLink,
            onClick: () => switchView("forgot-password"),
            children: "Forgot password?"
          }
        )
      ] }),
      /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.submit, children: /* @__PURE__ */ jsx108(
        Button_default,
        {
          type: "submit",
          color: color === "dark" ? "secondary" : "primary",
          variant: "raised",
          fullWidth: true,
          disabled: loading,
          icon: loading ? /* @__PURE__ */ jsx108(Loader23, { size: 18, className: "w3f-auth__spinner" }) : void 0,
          children: loading ? "Signing in..." : "Sign in"
        }
      ) }),
      renderSocial(),
      showRegister && /* @__PURE__ */ jsxs74("div", { className: AUTH_CLASSES.footer, children: [
        /* @__PURE__ */ jsx108("span", { children: "Don't have an account?" }),
        /* @__PURE__ */ jsx108(
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
    const renderRegisterForm = () => /* @__PURE__ */ jsxs74("form", { className: AUTH_CLASSES.form, onSubmit: handleRegisterSubmit, noValidate: true, children: [
      /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.field, children: /* @__PURE__ */ jsx108(
        Input_default,
        {
          label: "Full name",
          type: "text",
          value: state.name,
          onChange: (e) => setName(e.target.value),
          leadingIcon: /* @__PURE__ */ jsx108(User2, { size: 18 }),
          error: state.fieldErrors.name,
          autoComplete: "name",
          required: true
        }
      ) }),
      /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.field, children: /* @__PURE__ */ jsx108(
        Input_default,
        {
          label: "Email",
          type: "email",
          value: state.email,
          onChange: (e) => setEmail(e.target.value),
          leadingIcon: /* @__PURE__ */ jsx108(Mail3, { size: 18 }),
          error: state.fieldErrors.email,
          autoComplete: "email",
          required: true
        }
      ) }),
      /* @__PURE__ */ jsxs74("div", { className: AUTH_CLASSES.field, children: [
        /* @__PURE__ */ jsx108(
          Input_default,
          {
            label: "Password",
            type: state.showPassword ? "text" : "password",
            value: state.password,
            onChange: (e) => setPassword(e.target.value),
            leadingIcon: /* @__PURE__ */ jsx108(Lock3, { size: 18 }),
            trailingIcon: state.showPassword ? /* @__PURE__ */ jsx108(EyeOff3, { size: 18 }) : /* @__PURE__ */ jsx108(Eye3, { size: 18 }),
            onIconClick: toggleShowPassword,
            error: state.fieldErrors.password,
            autoComplete: "new-password",
            required: true
          }
        ),
        /* @__PURE__ */ jsx108(PasswordStrengthBar, { password: state.password })
      ] }),
      /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.field, children: /* @__PURE__ */ jsx108(
        Input_default,
        {
          label: "Confirm password",
          type: state.showConfirmPassword ? "text" : "password",
          value: state.confirmPassword,
          onChange: (e) => setConfirmPassword(e.target.value),
          leadingIcon: /* @__PURE__ */ jsx108(Lock3, { size: 18 }),
          trailingIcon: state.showConfirmPassword ? /* @__PURE__ */ jsx108(EyeOff3, { size: 18 }) : /* @__PURE__ */ jsx108(Eye3, { size: 18 }),
          onIconClick: toggleShowConfirmPassword,
          error: state.fieldErrors.confirmPassword,
          autoComplete: "new-password",
          required: true
        }
      ) }),
      /* @__PURE__ */ jsxs74("div", { className: AUTH_CLASSES.field, children: [
        /* @__PURE__ */ jsx108(
          Checkbox_default,
          {
            label: "I agree to the Terms of Service and Privacy Policy",
            checked: state.acceptTerms,
            onChange: setAcceptTerms
          }
        ),
        state.fieldErrors.terms && /* @__PURE__ */ jsx108("span", { className: AUTH_CLASSES.fieldError, children: state.fieldErrors.terms })
      ] }),
      /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.submit, children: /* @__PURE__ */ jsx108(
        Button_default,
        {
          type: "submit",
          color: color === "dark" ? "secondary" : "primary",
          variant: "raised",
          fullWidth: true,
          disabled: loading,
          icon: loading ? /* @__PURE__ */ jsx108(Loader23, { size: 18, className: "w3f-auth__spinner" }) : void 0,
          children: loading ? "Creating account..." : "Create account"
        }
      ) }),
      renderSocial(),
      /* @__PURE__ */ jsxs74("div", { className: AUTH_CLASSES.footer, children: [
        /* @__PURE__ */ jsx108("span", { children: "Already have an account?" }),
        /* @__PURE__ */ jsx108(
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
    const renderForgotForm = () => /* @__PURE__ */ jsxs74("form", { className: AUTH_CLASSES.form, onSubmit: handleForgotSubmit, noValidate: true, children: [
      /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.field, children: /* @__PURE__ */ jsx108(
        Input_default,
        {
          label: "Email",
          type: "email",
          value: state.email,
          onChange: (e) => setEmail(e.target.value),
          leadingIcon: /* @__PURE__ */ jsx108(Mail3, { size: 18 }),
          error: state.fieldErrors.email,
          autoComplete: "email",
          required: true
        }
      ) }),
      /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.submit, children: /* @__PURE__ */ jsx108(
        Button_default,
        {
          type: "submit",
          color: color === "dark" ? "secondary" : "primary",
          variant: "raised",
          fullWidth: true,
          disabled: loading,
          icon: loading ? /* @__PURE__ */ jsx108(Loader23, { size: 18, className: "w3f-auth__spinner" }) : void 0,
          children: loading ? "Sending..." : "Send reset link"
        }
      ) }),
      /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.footer, children: /* @__PURE__ */ jsxs74(
        "button",
        {
          type: "button",
          className: AUTH_CLASSES.backLink,
          onClick: () => switchView("login"),
          children: [
            /* @__PURE__ */ jsx108(ArrowLeft2, { size: 16 }),
            /* @__PURE__ */ jsx108("span", { children: "Back to sign in" })
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
      return /* @__PURE__ */ jsxs74("div", { ref, className: rootClasses, children: [
        /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.splitImage, children: logo && /* @__PURE__ */ jsx108("div", { className: AUTH_CLASSES.logo, children: logo }) }),
        /* @__PURE__ */ jsxs74("div", { className: AUTH_CLASSES.splitForm, children: [
          renderHeader(),
          renderError(),
          renderView()
        ] })
      ] });
    }
    return /* @__PURE__ */ jsxs74("div", { ref, className: rootClasses, children: [
      renderHeader(),
      renderError(),
      renderView()
    ] });
  }
);
AuthLogin.displayName = "AuthLogin";

// src/COMMERCE/PaymentGateway/PaymentGateway.tsx
import { forwardRef as forwardRef55, useCallback as useCallback51 } from "react";
import {
  CreditCard as CreditCard2,
  Check as Check3,
  AlertCircle as AlertCircle2,
  Loader2 as Loader24,
  Landmark,
  Wallet
} from "lucide-react";

// src/COMMERCE/PaymentGateway/PaymentGateway.constants.ts
var PAYMENT_DEFAULTS = {
  currency: "USD",
  currencySymbol: "$",
  methods: [
    "credit-card",
    "debit-card",
    "mercadopago",
    "paypal",
    "bank-transfer"
  ],
  defaultMethod: "credit-card",
  variant: "default",
  color: "primary",
  showOrderSummary: true,
  successMessage: "Payment successful!"
};
var PAYMENT_CLASSES = {
  root: "w3f-payment",
  methods: "w3f-payment__methods",
  method: "w3f-payment__method",
  methodActive: "w3f-payment__method--active",
  methodIcon: "w3f-payment__method-icon",
  methodLabel: "w3f-payment__method-label",
  form: "w3f-payment__form",
  field: "w3f-payment__field",
  fieldLabel: "w3f-payment__field-label",
  fieldInput: "w3f-payment__field-input",
  fieldError: "w3f-payment__field-error",
  fieldRow: "w3f-payment__field-row",
  cardNumber: "w3f-payment__card-number",
  cardBrand: "w3f-payment__card-brand",
  summary: "w3f-payment__summary",
  summaryTitle: "w3f-payment__summary-title",
  summaryItem: "w3f-payment__summary-item",
  summaryTotal: "w3f-payment__summary-total",
  submit: "w3f-payment__submit",
  success: "w3f-payment__success",
  successIcon: "w3f-payment__success-icon",
  successMessage: "w3f-payment__success-message",
  error: "w3f-payment__error",
  loading: "w3f-payment__loading",
  spinner: "w3f-payment__spinner",
  altMethod: "w3f-payment__alt-method",
  altMethodInfo: "w3f-payment__alt-method-info",
  bankDetails: "w3f-payment__bank-details",
  stepIndicator: "w3f-payment__step-indicator",
  step: "w3f-payment__step",
  stepActive: "w3f-payment__step--active",
  stepCompleted: "w3f-payment__step--completed",
  stepNav: "w3f-payment__step-nav",
  body: "w3f-payment__body"
};
var METHOD_LABELS = {
  "credit-card": "Credit Card",
  "debit-card": "Debit Card",
  mercadopago: "MercadoPago",
  paypal: "PayPal",
  "bank-transfer": "Bank Transfer"
};
var BANK_DETAILS = {
  bank: "W3F International Bank",
  account: "0000-1234-5678-9012",
  routing: "021000021",
  swift: "W3FBUS33"
};

// src/COMMERCE/PaymentGateway/PaymentGateway.hooks.ts
import { useState as useState55, useCallback as useCallback50, useMemo as useMemo26 } from "react";

// src/COMMERCE/PaymentGateway/PaymentGateway.utils.ts
function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "");
  const brand = detectCardBrand(digits);
  if (brand === "amex") {
    const parts2 = [
      digits.slice(0, 4),
      digits.slice(4, 10),
      digits.slice(10, 15)
    ].filter(Boolean);
    return parts2.join(" ");
  }
  const parts = [];
  for (let i = 0; i < digits.length && i < 16; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }
  return parts.join(" ");
}
function formatExpiry(value) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}
function detectCardBrand(number) {
  const digits = number.replace(/\D/g, "");
  if (!digits) return "unknown";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "mastercard";
  if (/^4/.test(digits)) return "visa";
  return "unknown";
}
function validateCardNumber(number) {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let alternate = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}
function validateExpiry(expiry) {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;
  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10) + 2e3;
  if (month < 1 || month > 12) return false;
  const now = /* @__PURE__ */ new Date();
  const expiryDate = new Date(year, month);
  return expiryDate > now;
}
function validateCVV(cvv, brand) {
  const digits = cvv.replace(/\D/g, "");
  const expectedLength = brand === "amex" ? 4 : 3;
  return digits.length === expectedLength;
}
function buildPaymentClasses(variant, color, className) {
  const classes = [PAYMENT_CLASSES.root];
  if (variant !== "default") {
    classes.push(`${PAYMENT_CLASSES.root}--${variant}`);
  }
  classes.push(`${PAYMENT_CLASSES.root}--${color}`);
  if (className) {
    classes.push(className);
  }
  return classes.join(" ");
}
function formatAmount(amount, symbol) {
  return `${symbol}${amount.toFixed(2)}`;
}
function maxCardLength(brand) {
  return brand === "amex" ? 15 : 16;
}

// src/COMMERCE/PaymentGateway/PaymentGateway.hooks.ts
var EMPTY_CARD = {
  number: "",
  name: "",
  expiry: "",
  cvv: ""
};
var EMPTY_VALIDATION = {
  number: null,
  name: null,
  expiry: null,
  cvv: null
};
function usePaymentForm(defaultMethod) {
  const [method, setMethod] = useState55(defaultMethod);
  const [card, setCard] = useState55(EMPTY_CARD);
  const [validation, setValidation] = useState55(EMPTY_VALIDATION);
  const [step, setStep] = useState55(0);
  const brand = useMemo26(() => detectCardBrand(card.number), [card.number]);
  const handleCardNumberChange = useCallback50(
    (value) => {
      const digits = value.replace(/\D/g, "");
      const currentBrand = detectCardBrand(digits);
      const max = maxCardLength(currentBrand);
      const trimmed = digits.slice(0, max);
      const formatted = formatCardNumber(trimmed);
      setCard((prev) => ({ ...prev, number: formatted }));
      setValidation((prev) => ({
        ...prev,
        number: trimmed.length >= 13 ? validateCardNumber(trimmed) : null
      }));
    },
    []
  );
  const handleCardNameChange = useCallback50((value) => {
    setCard((prev) => ({ ...prev, name: value }));
    setValidation((prev) => ({
      ...prev,
      name: value.trim().length > 0 ? true : null
    }));
  }, []);
  const handleExpiryChange = useCallback50((value) => {
    const formatted = formatExpiry(value);
    setCard((prev) => ({ ...prev, expiry: formatted }));
    setValidation((prev) => ({
      ...prev,
      expiry: formatted.length === 5 ? validateExpiry(formatted) : null
    }));
  }, []);
  const handleCvvChange = useCallback50(
    (value) => {
      const digits = value.replace(/\D/g, "").slice(0, brand === "amex" ? 4 : 3);
      setCard((prev) => ({ ...prev, cvv: digits }));
      const expectedLen = brand === "amex" ? 4 : 3;
      setValidation((prev) => ({
        ...prev,
        cvv: digits.length === expectedLen ? validateCVV(digits, brand) : null
      }));
    },
    [brand]
  );
  const validateAll = useCallback50(() => {
    const numValid = validateCardNumber(card.number);
    const nameValid = card.name.trim().length > 0;
    const expValid = validateExpiry(card.expiry);
    const cvvValid = validateCVV(card.cvv, brand);
    setValidation({
      number: numValid,
      name: nameValid,
      expiry: expValid,
      cvv: cvvValid
    });
    return numValid && nameValid && expValid && cvvValid;
  }, [card, brand]);
  const isCardFormValid = useMemo26(
    () => validation.number === true && validation.name === true && validation.expiry === true && validation.cvv === true,
    [validation]
  );
  const resetForm = useCallback50(() => {
    setCard(EMPTY_CARD);
    setValidation(EMPTY_VALIDATION);
    setStep(0);
  }, []);
  return {
    method,
    setMethod,
    card,
    brand,
    validation,
    step,
    setStep,
    isCardFormValid,
    handleCardNumberChange,
    handleCardNameChange,
    handleExpiryChange,
    handleCvvChange,
    validateAll,
    resetForm
  };
}

// src/COMMERCE/PaymentGateway/PaymentGateway.tsx
import { Fragment as Fragment16, jsx as jsx109, jsxs as jsxs75 } from "react/jsx-runtime";
var MethodIcon = ({ method }) => {
  switch (method) {
    case "credit-card":
    case "debit-card":
      return /* @__PURE__ */ jsx109(CreditCard2, { size: 18 });
    case "paypal":
    case "mercadopago":
      return /* @__PURE__ */ jsx109(Wallet, { size: 18 });
    case "bank-transfer":
      return /* @__PURE__ */ jsx109(Landmark, { size: 18 });
  }
};
var BrandLabel = ({ brand }) => {
  const labels = {
    visa: "VISA",
    mastercard: "MC",
    amex: "AMEX",
    unknown: ""
  };
  const label = labels[brand] || "";
  if (!label) return null;
  return /* @__PURE__ */ jsx109("span", { className: PAYMENT_CLASSES.cardBrand, children: label });
};
var CardForm = ({ form, compact }) => {
  const { card, brand, validation } = form;
  const fieldClass = (valid) => [
    PAYMENT_CLASSES.fieldInput,
    valid === false ? `${PAYMENT_CLASSES.fieldInput}--invalid` : "",
    valid === true ? `${PAYMENT_CLASSES.fieldInput}--valid` : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.form, children: [
    /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.field, children: [
      /* @__PURE__ */ jsx109("label", { className: PAYMENT_CLASSES.fieldLabel, children: "Card Number" }),
      /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.cardNumber, children: [
        /* @__PURE__ */ jsx109(
          "input",
          {
            type: "text",
            className: fieldClass(validation.number),
            value: card.number,
            onChange: (e) => form.handleCardNumberChange(e.target.value),
            placeholder: "1234 5678 9012 3456",
            inputMode: "numeric",
            autoComplete: "cc-number",
            maxLength: brand === "amex" ? 17 : 19
          }
        ),
        /* @__PURE__ */ jsx109(BrandLabel, { brand })
      ] }),
      validation.number === false && /* @__PURE__ */ jsx109("span", { className: PAYMENT_CLASSES.fieldError, children: "Invalid card number" })
    ] }),
    /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.field, children: [
      /* @__PURE__ */ jsx109("label", { className: PAYMENT_CLASSES.fieldLabel, children: "Cardholder Name" }),
      /* @__PURE__ */ jsx109(
        "input",
        {
          type: "text",
          className: fieldClass(validation.name),
          value: card.name,
          onChange: (e) => form.handleCardNameChange(e.target.value),
          placeholder: "John Doe",
          autoComplete: "cc-name"
        }
      ),
      validation.name === false && /* @__PURE__ */ jsx109("span", { className: PAYMENT_CLASSES.fieldError, children: "Name is required" })
    ] }),
    /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.fieldRow, children: [
      /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.field, children: [
        /* @__PURE__ */ jsx109("label", { className: PAYMENT_CLASSES.fieldLabel, children: "Expiry" }),
        /* @__PURE__ */ jsx109(
          "input",
          {
            type: "text",
            className: fieldClass(validation.expiry),
            value: card.expiry,
            onChange: (e) => form.handleExpiryChange(e.target.value),
            placeholder: "MM/YY",
            inputMode: "numeric",
            autoComplete: "cc-exp",
            maxLength: 5
          }
        ),
        validation.expiry === false && /* @__PURE__ */ jsx109("span", { className: PAYMENT_CLASSES.fieldError, children: "Invalid date" })
      ] }),
      /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.field, children: [
        /* @__PURE__ */ jsx109("label", { className: PAYMENT_CLASSES.fieldLabel, children: "CVV" }),
        /* @__PURE__ */ jsx109(
          "input",
          {
            type: "password",
            className: fieldClass(validation.cvv),
            value: card.cvv,
            onChange: (e) => form.handleCvvChange(e.target.value),
            placeholder: brand === "amex" ? "1234" : "123",
            inputMode: "numeric",
            autoComplete: "cc-csc",
            maxLength: brand === "amex" ? 4 : 3
          }
        ),
        validation.cvv === false && /* @__PURE__ */ jsx109("span", { className: PAYMENT_CLASSES.fieldError, children: "Invalid CVV" })
      ] })
    ] })
  ] });
};
var AltMethodPanel = ({ method, amount, currencySymbol, color, onPay, loading }) => {
  if (method === "bank-transfer") {
    return /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.altMethod, children: [
      /* @__PURE__ */ jsx109("div", { className: PAYMENT_CLASSES.altMethodInfo, children: "Transfer the amount to the following account:" }),
      /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.bankDetails, children: [
        /* @__PURE__ */ jsxs75("div", { children: [
          /* @__PURE__ */ jsx109("strong", { children: "Bank:" }),
          " ",
          BANK_DETAILS.bank
        ] }),
        /* @__PURE__ */ jsxs75("div", { children: [
          /* @__PURE__ */ jsx109("strong", { children: "Account:" }),
          " ",
          BANK_DETAILS.account
        ] }),
        /* @__PURE__ */ jsxs75("div", { children: [
          /* @__PURE__ */ jsx109("strong", { children: "Routing:" }),
          " ",
          BANK_DETAILS.routing
        ] }),
        /* @__PURE__ */ jsxs75("div", { children: [
          /* @__PURE__ */ jsx109("strong", { children: "SWIFT:" }),
          " ",
          BANK_DETAILS.swift
        ] }),
        /* @__PURE__ */ jsxs75("div", { children: [
          /* @__PURE__ */ jsx109("strong", { children: "Amount:" }),
          " ",
          formatAmount(amount, currencySymbol)
        ] })
      ] })
    ] });
  }
  const label = method === "mercadopago" ? "Continue with MercadoPago" : "Continue with PayPal";
  return /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.altMethod, children: [
    /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.altMethodInfo, children: [
      "You will be redirected to ",
      METHOD_LABELS[method],
      " to complete the payment."
    ] }),
    /* @__PURE__ */ jsx109(
      Button_default,
      {
        variant: "raised",
        color,
        fullWidth: true,
        onClick: onPay,
        disabled: loading,
        children: loading ? "Redirecting..." : label
      }
    )
  ] });
};
var STEP_LABELS = ["Method", "Details", "Confirm"];
var StepIndicator = ({ current }) => /* @__PURE__ */ jsx109("div", { className: PAYMENT_CLASSES.stepIndicator, children: STEP_LABELS.map((label, i) => {
  const cls = [
    PAYMENT_CLASSES.step,
    i === current ? PAYMENT_CLASSES.stepActive : "",
    i < current ? PAYMENT_CLASSES.stepCompleted : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs75("div", { className: cls, children: [
    /* @__PURE__ */ jsx109("span", { children: i + 1 }),
    /* @__PURE__ */ jsx109("span", { children: label })
  ] }, label);
}) });
var PaymentGateway = forwardRef55(
  ({
    amount,
    currency = PAYMENT_DEFAULTS.currency,
    currencySymbol = PAYMENT_DEFAULTS.currencySymbol,
    methods = PAYMENT_DEFAULTS.methods,
    defaultMethod = PAYMENT_DEFAULTS.defaultMethod,
    variant = PAYMENT_DEFAULTS.variant,
    color = PAYMENT_DEFAULTS.color,
    showOrderSummary = PAYMENT_DEFAULTS.showOrderSummary,
    orderItems,
    onPayment,
    onMethodChange,
    loading = false,
    error = null,
    success = false,
    successMessage = PAYMENT_DEFAULTS.successMessage,
    className
  }, ref) => {
    const form = usePaymentForm(defaultMethod);
    const rootClass = buildPaymentClasses(variant, color, className);
    const isStepped = variant === "stepped";
    const isCardMethod = form.method === "credit-card" || form.method === "debit-card";
    const handleMethodSelect = useCallback51(
      (m) => {
        form.setMethod(m);
        onMethodChange?.(m);
        if (isStepped) form.setStep(1);
      },
      [form, onMethodChange, isStepped]
    );
    const handleSubmit = useCallback51(() => {
      if (isCardMethod) {
        if (!form.validateAll()) return;
      }
      const data = {
        method: form.method,
        amount,
        currency
      };
      if (isCardMethod) {
        data.card = {
          number: form.card.number.replace(/\s/g, ""),
          name: form.card.name,
          expiry: form.card.expiry,
          cvv: form.card.cvv
        };
      }
      onPayment?.(data);
    }, [form, isCardMethod, amount, currency, onPayment]);
    if (success) {
      return /* @__PURE__ */ jsx109("div", { ref, className: rootClass, role: "status", children: /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.success, children: [
        /* @__PURE__ */ jsx109("div", { className: PAYMENT_CLASSES.successIcon, children: /* @__PURE__ */ jsx109(Check3, { size: 48 }) }),
        /* @__PURE__ */ jsx109("span", { className: PAYMENT_CLASSES.successMessage, children: successMessage })
      ] }) });
    }
    if (isStepped) {
      return /* @__PURE__ */ jsxs75("div", { ref, className: rootClass, children: [
        /* @__PURE__ */ jsx109(StepIndicator, { current: form.step }),
        /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.body, children: [
          form.step === 0 && /* @__PURE__ */ jsx109("div", { className: PAYMENT_CLASSES.methods, role: "tablist", children: methods.map((m) => /* @__PURE__ */ jsxs75(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": form.method === m,
              className: [
                PAYMENT_CLASSES.method,
                form.method === m ? PAYMENT_CLASSES.methodActive : ""
              ].filter(Boolean).join(" "),
              onClick: () => handleMethodSelect(m),
              children: [
                /* @__PURE__ */ jsx109("span", { className: PAYMENT_CLASSES.methodIcon, children: /* @__PURE__ */ jsx109(MethodIcon, { method: m }) }),
                /* @__PURE__ */ jsx109("span", { className: PAYMENT_CLASSES.methodLabel, children: METHOD_LABELS[m] })
              ]
            },
            m
          )) }),
          form.step === 1 && /* @__PURE__ */ jsx109(Fragment16, { children: isCardMethod ? /* @__PURE__ */ jsx109(CardForm, { form }) : /* @__PURE__ */ jsx109(
            AltMethodPanel,
            {
              method: form.method,
              amount,
              currencySymbol,
              color,
              onPay: handleSubmit,
              loading
            }
          ) }),
          form.step === 2 && /* @__PURE__ */ jsxs75(Fragment16, { children: [
            showOrderSummary && orderItems && /* @__PURE__ */ jsx109(
              OrderSummary,
              {
                items: orderItems,
                amount,
                currencySymbol
              }
            ),
            /* @__PURE__ */ jsx109("div", { className: PAYMENT_CLASSES.submit, children: /* @__PURE__ */ jsx109(
              Button_default,
              {
                variant: "raised",
                color,
                fullWidth: true,
                onClick: handleSubmit,
                disabled: loading || isCardMethod && !form.isCardFormValid,
                children: loading ? /* @__PURE__ */ jsx109(Loader24, { size: 18, className: PAYMENT_CLASSES.spinner }) : `Pay ${formatAmount(amount, currencySymbol)}`
              }
            ) })
          ] })
        ] }),
        error && /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.error, role: "alert", children: [
          /* @__PURE__ */ jsx109(AlertCircle2, { size: 16 }),
          /* @__PURE__ */ jsx109("span", { children: error })
        ] }),
        form.step > 0 && /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.stepNav, children: [
          /* @__PURE__ */ jsx109(
            Button_default,
            {
              variant: "text",
              size: "small",
              onClick: () => form.setStep(form.step - 1),
              children: "Back"
            }
          ),
          form.step < 2 && isCardMethod && /* @__PURE__ */ jsx109(
            Button_default,
            {
              variant: "outline",
              size: "small",
              color,
              onClick: () => {
                if (form.step === 1 && isCardMethod && !form.validateAll()) return;
                form.setStep(form.step + 1);
              },
              children: "Next"
            }
          )
        ] })
      ] });
    }
    return /* @__PURE__ */ jsxs75("div", { ref, className: rootClass, children: [
      /* @__PURE__ */ jsx109("div", { className: PAYMENT_CLASSES.methods, role: "tablist", children: methods.map((m) => /* @__PURE__ */ jsxs75(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": form.method === m,
          className: [
            PAYMENT_CLASSES.method,
            form.method === m ? PAYMENT_CLASSES.methodActive : ""
          ].filter(Boolean).join(" "),
          onClick: () => handleMethodSelect(m),
          children: [
            /* @__PURE__ */ jsx109("span", { className: PAYMENT_CLASSES.methodIcon, children: /* @__PURE__ */ jsx109(MethodIcon, { method: m }) }),
            /* @__PURE__ */ jsx109("span", { className: PAYMENT_CLASSES.methodLabel, children: METHOD_LABELS[m] })
          ]
        },
        m
      )) }),
      /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.body, children: [
        isCardMethod ? /* @__PURE__ */ jsx109(CardForm, { form, compact: variant === "compact" }) : /* @__PURE__ */ jsx109(
          AltMethodPanel,
          {
            method: form.method,
            amount,
            currencySymbol,
            color,
            onPay: handleSubmit,
            loading
          }
        ),
        showOrderSummary && orderItems && /* @__PURE__ */ jsx109(
          OrderSummary,
          {
            items: orderItems,
            amount,
            currencySymbol
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.error, role: "alert", children: [
        /* @__PURE__ */ jsx109(AlertCircle2, { size: 16 }),
        /* @__PURE__ */ jsx109("span", { children: error })
      ] }),
      isCardMethod && /* @__PURE__ */ jsx109("div", { className: PAYMENT_CLASSES.submit, children: /* @__PURE__ */ jsx109(
        Button_default,
        {
          variant: "raised",
          color,
          fullWidth: true,
          onClick: handleSubmit,
          disabled: loading,
          children: loading ? /* @__PURE__ */ jsx109(Loader24, { size: 18, className: PAYMENT_CLASSES.spinner }) : `Pay ${formatAmount(amount, currencySymbol)}`
        }
      ) })
    ] });
  }
);
PaymentGateway.displayName = "PaymentGateway";
var OrderSummary = ({ items, amount, currencySymbol }) => /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.summary, children: [
  /* @__PURE__ */ jsx109("div", { className: PAYMENT_CLASSES.summaryTitle, children: "Order Summary" }),
  items.map((item, i) => /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.summaryItem, children: [
    /* @__PURE__ */ jsxs75("span", { children: [
      item.name,
      " x",
      item.quantity
    ] }),
    /* @__PURE__ */ jsx109("span", { children: formatAmount(item.price * item.quantity, currencySymbol) })
  ] }, `${item.name}-${i}`)),
  /* @__PURE__ */ jsxs75("div", { className: PAYMENT_CLASSES.summaryTotal, children: [
    /* @__PURE__ */ jsx109("span", { children: "Total" }),
    /* @__PURE__ */ jsx109("span", { children: formatAmount(amount, currencySymbol) })
  ] })
] });

// src/COMMERCE/ShoppingCart/ShoppingCart.tsx
import { forwardRef as forwardRef56, useCallback as useCallback53 } from "react";
import { ShoppingCart as ShoppingCartIcon, Trash2 as Trash22, Plus as Plus3, Minus as Minus2, PackageOpen } from "lucide-react";

// src/COMMERCE/ShoppingCart/ShoppingCart.constants.ts
var CART_DEFAULTS = {
  currency: "USD",
  currencySymbol: "$",
  taxRate: 0,
  shippingCost: 0,
  freeShippingThreshold: 0,
  variant: "default",
  color: "primary",
  showImage: true,
  showQuantityControls: true,
  showRemoveButton: true,
  showSubtotal: true,
  showTax: true,
  showShipping: true,
  emptyMessage: "Your cart is empty"
};
var CART_CLASSES = {
  root: "w3f-cart",
  items: "w3f-cart__items",
  item: "w3f-cart__item",
  itemImage: "w3f-cart__item-image",
  itemInfo: "w3f-cart__item-info",
  itemName: "w3f-cart__item-name",
  itemDescription: "w3f-cart__item-description",
  itemPrice: "w3f-cart__item-price",
  itemQty: "w3f-cart__item-qty",
  itemQtyBtn: "w3f-cart__item-qty-btn",
  itemQtyValue: "w3f-cart__item-qty-value",
  itemRemove: "w3f-cart__item-remove",
  itemTotal: "w3f-cart__item-total",
  summary: "w3f-cart__summary",
  summaryRow: "w3f-cart__summary-row",
  summaryLabel: "w3f-cart__summary-label",
  summaryValue: "w3f-cart__summary-value",
  summaryTotal: "w3f-cart__summary-row--total",
  freeShipping: "w3f-cart__free-shipping",
  checkout: "w3f-cart__checkout",
  clear: "w3f-cart__clear",
  empty: "w3f-cart__empty",
  emptyIcon: "w3f-cart__empty-icon",
  emptyMessage: "w3f-cart__empty-message",
  header: "w3f-cart__header",
  itemRemoving: "w3f-cart__item--removing"
};

// src/COMMERCE/ShoppingCart/ShoppingCart.hooks.ts
import { useMemo as useMemo27, useState as useState56, useCallback as useCallback52 } from "react";

// src/COMMERCE/ShoppingCart/ShoppingCart.utils.ts
function formatCurrency2(amount, symbol, _currency) {
  return `${symbol}${amount.toFixed(2)}`;
}
function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function buildCartClasses(variant, color, className) {
  const classes = [CART_CLASSES.root];
  if (variant !== "default") {
    classes.push(`${CART_CLASSES.root}--${variant}`);
  }
  classes.push(`${CART_CLASSES.root}--${color}`);
  if (className) {
    classes.push(className);
  }
  return classes.join(" ");
}
function countItems(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

// src/COMMERCE/ShoppingCart/ShoppingCart.hooks.ts
function useCartCalculations(items, taxRate, shippingCost, freeShippingThreshold) {
  return useMemo27(() => {
    const subtotal = calculateSubtotal(items);
    const tax = subtotal * taxRate;
    const qualifiesForFreeShipping = freeShippingThreshold > 0 && subtotal >= freeShippingThreshold;
    const shipping = items.length === 0 ? 0 : qualifiesForFreeShipping ? 0 : shippingCost;
    const total = subtotal + tax + shipping;
    const itemCount = countItems(items);
    return { items, subtotal, tax, shipping, total, itemCount };
  }, [items, taxRate, shippingCost, freeShippingThreshold]);
}
function useItemRemoveAnimation() {
  const [removingIds, setRemovingIds] = useState56(/* @__PURE__ */ new Set());
  const startRemove = useCallback52(
    (id, onComplete) => {
      setRemovingIds((prev) => new Set(prev).add(id));
      setTimeout(() => {
        setRemovingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        onComplete();
      }, 300);
    },
    []
  );
  return { removingIds, startRemove };
}

// src/COMMERCE/ShoppingCart/ShoppingCart.tsx
import { jsx as jsx110, jsxs as jsxs76 } from "react/jsx-runtime";
var CartItemRow = ({
  item,
  currencySymbol,
  currency,
  showImage,
  showQuantityControls,
  showRemoveButton,
  isRemoving,
  onQuantityChange,
  onRemove,
  startRemove
}) => {
  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange?.(item.id, item.quantity - 1);
    }
  };
  const handleIncrement = () => {
    const max = item.maxQuantity ?? 99;
    if (item.quantity < max) {
      onQuantityChange?.(item.id, item.quantity + 1);
    }
  };
  const handleRemove = () => {
    if (onRemove) {
      startRemove(item.id, () => onRemove(item.id));
    }
  };
  const rowClass = [
    CART_CLASSES.item,
    isRemoving ? CART_CLASSES.itemRemoving : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs76("div", { className: rowClass, role: "listitem", children: [
    showImage && item.image && /* @__PURE__ */ jsx110("div", { className: CART_CLASSES.itemImage, children: /* @__PURE__ */ jsx110("img", { src: sanitizeUrl(item.image), alt: item.name }) }),
    /* @__PURE__ */ jsxs76("div", { className: CART_CLASSES.itemInfo, children: [
      /* @__PURE__ */ jsx110("span", { className: CART_CLASSES.itemName, children: item.name }),
      item.description && /* @__PURE__ */ jsx110("span", { className: CART_CLASSES.itemDescription, children: item.description })
    ] }),
    /* @__PURE__ */ jsx110("div", { className: CART_CLASSES.itemPrice, children: formatCurrency2(item.price, currencySymbol, currency) }),
    showQuantityControls && /* @__PURE__ */ jsxs76("div", { className: CART_CLASSES.itemQty, children: [
      /* @__PURE__ */ jsx110(
        "button",
        {
          type: "button",
          className: CART_CLASSES.itemQtyBtn,
          onClick: handleDecrement,
          disabled: item.quantity <= 1,
          "aria-label": "Decrease quantity",
          children: /* @__PURE__ */ jsx110(Minus2, { size: 14 })
        }
      ),
      /* @__PURE__ */ jsx110("span", { className: CART_CLASSES.itemQtyValue, children: item.quantity }),
      /* @__PURE__ */ jsx110(
        "button",
        {
          type: "button",
          className: CART_CLASSES.itemQtyBtn,
          onClick: handleIncrement,
          disabled: item.quantity >= (item.maxQuantity ?? 99),
          "aria-label": "Increase quantity",
          children: /* @__PURE__ */ jsx110(Plus3, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ jsx110("div", { className: CART_CLASSES.itemTotal, children: formatCurrency2(item.price * item.quantity, currencySymbol, currency) }),
    showRemoveButton && /* @__PURE__ */ jsx110(
      "button",
      {
        type: "button",
        className: CART_CLASSES.itemRemove,
        onClick: handleRemove,
        "aria-label": `Remove ${item.name}`,
        children: /* @__PURE__ */ jsx110(Trash22, { size: 16 })
      }
    )
  ] });
};
var ShoppingCart2 = forwardRef56(
  ({
    items,
    currency = CART_DEFAULTS.currency,
    currencySymbol = CART_DEFAULTS.currencySymbol,
    taxRate = CART_DEFAULTS.taxRate,
    shippingCost = CART_DEFAULTS.shippingCost,
    freeShippingThreshold = CART_DEFAULTS.freeShippingThreshold,
    variant = CART_DEFAULTS.variant,
    color = CART_DEFAULTS.color,
    showImage = CART_DEFAULTS.showImage,
    showQuantityControls = CART_DEFAULTS.showQuantityControls,
    showRemoveButton = CART_DEFAULTS.showRemoveButton,
    showSubtotal = CART_DEFAULTS.showSubtotal,
    showTax = CART_DEFAULTS.showTax,
    showShipping = CART_DEFAULTS.showShipping,
    emptyMessage = CART_DEFAULTS.emptyMessage,
    emptyIcon,
    onQuantityChange,
    onRemoveItem,
    onClearCart,
    onCheckout,
    className
  }, ref) => {
    const summary = useCartCalculations(
      items,
      taxRate,
      shippingCost,
      freeShippingThreshold
    );
    const { removingIds, startRemove } = useItemRemoveAnimation();
    const rootClass = buildCartClasses(variant, color, className);
    const handleCheckout = useCallback53(() => {
      onCheckout?.(summary);
    }, [onCheckout, summary]);
    const isEmpty = items.length === 0;
    const qualifiesForFreeShipping = freeShippingThreshold > 0 && summary.subtotal >= freeShippingThreshold;
    return /* @__PURE__ */ jsxs76("div", { ref, className: rootClass, role: "region", "aria-label": "Shopping cart", children: [
      /* @__PURE__ */ jsxs76("div", { className: CART_CLASSES.header, children: [
        /* @__PURE__ */ jsx110(ShoppingCartIcon, { size: 20 }),
        /* @__PURE__ */ jsxs76("span", { children: [
          "Cart (",
          summary.itemCount,
          ")"
        ] }),
        !isEmpty && onClearCart && /* @__PURE__ */ jsx110(
          Button_default,
          {
            variant: "text",
            color: "error",
            size: "small",
            onClick: onClearCart,
            className: CART_CLASSES.clear,
            children: "Clear all"
          }
        )
      ] }),
      isEmpty && /* @__PURE__ */ jsxs76("div", { className: CART_CLASSES.empty, children: [
        /* @__PURE__ */ jsx110("div", { className: CART_CLASSES.emptyIcon, children: emptyIcon ?? /* @__PURE__ */ jsx110(PackageOpen, { size: 48 }) }),
        /* @__PURE__ */ jsx110("span", { className: CART_CLASSES.emptyMessage, children: emptyMessage })
      ] }),
      !isEmpty && /* @__PURE__ */ jsx110("div", { className: CART_CLASSES.items, role: "list", children: items.map((item) => /* @__PURE__ */ jsx110(
        CartItemRow,
        {
          item,
          currencySymbol,
          currency,
          showImage,
          showQuantityControls,
          showRemoveButton,
          isRemoving: removingIds.has(item.id),
          onQuantityChange,
          onRemove: onRemoveItem,
          startRemove
        },
        item.id
      )) }),
      !isEmpty && /* @__PURE__ */ jsxs76("div", { className: CART_CLASSES.summary, children: [
        showSubtotal && /* @__PURE__ */ jsxs76("div", { className: CART_CLASSES.summaryRow, children: [
          /* @__PURE__ */ jsx110("span", { className: CART_CLASSES.summaryLabel, children: "Subtotal" }),
          /* @__PURE__ */ jsx110("span", { className: CART_CLASSES.summaryValue, children: formatCurrency2(summary.subtotal, currencySymbol, currency) })
        ] }),
        showTax && taxRate > 0 && /* @__PURE__ */ jsxs76("div", { className: CART_CLASSES.summaryRow, children: [
          /* @__PURE__ */ jsxs76("span", { className: CART_CLASSES.summaryLabel, children: [
            "Tax (",
            (taxRate * 100).toFixed(0),
            "%)"
          ] }),
          /* @__PURE__ */ jsx110("span", { className: CART_CLASSES.summaryValue, children: formatCurrency2(summary.tax, currencySymbol, currency) })
        ] }),
        showShipping && /* @__PURE__ */ jsxs76("div", { className: CART_CLASSES.summaryRow, children: [
          /* @__PURE__ */ jsx110("span", { className: CART_CLASSES.summaryLabel, children: "Shipping" }),
          /* @__PURE__ */ jsx110("span", { className: CART_CLASSES.summaryValue, children: summary.shipping === 0 ? "Free" : formatCurrency2(summary.shipping, currencySymbol, currency) })
        ] }),
        qualifiesForFreeShipping && /* @__PURE__ */ jsx110("div", { className: CART_CLASSES.freeShipping, children: "Free shipping applied!" }),
        /* @__PURE__ */ jsxs76("div", { className: `${CART_CLASSES.summaryRow} ${CART_CLASSES.summaryTotal}`, children: [
          /* @__PURE__ */ jsx110("span", { className: CART_CLASSES.summaryLabel, children: "Total" }),
          /* @__PURE__ */ jsx110("span", { className: CART_CLASSES.summaryValue, children: formatCurrency2(summary.total, currencySymbol, currency) })
        ] })
      ] }),
      !isEmpty && onCheckout && /* @__PURE__ */ jsx110("div", { className: CART_CLASSES.checkout, children: /* @__PURE__ */ jsxs76(
        Button_default,
        {
          variant: "raised",
          color,
          fullWidth: true,
          onClick: handleCheckout,
          children: [
            "Checkout (",
            formatCurrency2(summary.total, currencySymbol, currency),
            ")"
          ]
        }
      ) })
    ] });
  }
);
ShoppingCart2.displayName = "ShoppingCart";

// src/UTILS/DatePicker/DatePicker.tsx
import { memo as memo2, useRef as useRef40, useState as useState58, useEffect as useEffect39 } from "react";

// src/UTILS/DatePicker/DatePicker.constants.ts
var DP_WEEKDAYS_SHORT = ["Dom", "Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b"];
var DP_WEEKDAYS_LONG = ["Domingo", "Lunes", "Martes", "Mi\xE9rcoles", "Jueves", "Viernes", "S\xE1bado"];
var DP_MONTHS_SHORT = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic"
];
var DP_MONTHS_LONG = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];
var DP_CLASSES = {
  root: "w3f-datepicker",
  inputWrapper: "w3f-datepicker-input-wrapper",
  input: "w3f-datepicker-input",
  inputIcon: "w3f-datepicker-input-icon",
  dropdown: "w3f-datepicker-dropdown",
  calendar: "w3f-datepicker-calendar",
  header: "w3f-datepicker-header",
  navBtn: "w3f-datepicker-nav-btn",
  title: "w3f-datepicker-title",
  weekdays: "w3f-datepicker-weekdays",
  weekday: "w3f-datepicker-weekday",
  weekdaySun: "w3f-datepicker-weekday--sun",
  days: "w3f-datepicker-days",
  day: "w3f-datepicker-day",
  dayToday: "w3f-datepicker-day--today",
  daySelected: "w3f-datepicker-day--selected",
  daySunday: "w3f-datepicker-day--sunday",
  dayOtherMonth: "w3f-datepicker-day--other-month",
  dayDisabled: "w3f-datepicker-day--disabled",
  dayInRange: "w3f-datepicker-day--in-range",
  dayRangeStart: "w3f-datepicker-day--range-start",
  dayRangeEnd: "w3f-datepicker-day--range-end",
  dayRangeSingle: "w3f-datepicker-day--range-single",
  dual: "w3f-datepicker-dual",
  dualDivider: "w3f-datepicker-dual-divider",
  multiple: "w3f-datepicker-multiple",
  multipleList: "w3f-datepicker-multiple-list",
  multipleItem: "w3f-datepicker-multiple-item",
  multipleItemLabel: "w3f-datepicker-multiple-item-label",
  multipleItemRemove: "w3f-datepicker-multiple-item-remove",
  actions: "w3f-datepicker-actions",
  output: "w3f-datepicker-output",
  titleCaret: "w3f-datepicker-title-caret",
  ymPicker: "w3f-datepicker-ym-picker",
  yearList: "w3f-datepicker-year-list",
  yearItem: "w3f-datepicker-year-item",
  yearItemSelected: "w3f-datepicker-year-item--selected",
  monthGrid: "w3f-datepicker-month-grid",
  monthItem: "w3f-datepicker-month-item",
  monthItemSelected: "w3f-datepicker-month-item--selected"
};

// src/UTILS/DatePicker/DatePicker.hooks.ts
import { useState as useState57, useCallback as useCallback54, useRef as useRef39, useEffect as useEffect38 } from "react";

// src/UTILS/DatePicker/DatePicker.utils.ts
function toDateValue(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return {
    date,
    formatted: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    display: `${date.getDate()} ${DP_MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`,
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    weekday: DP_WEEKDAYS_LONG[date.getDay()],
    timestamp: date.getTime()
  };
}
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isBetween(date, start, end) {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return t > s && t < e;
}
function isDateDisabled(date, disabledDates, minDate, maxDate) {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  if (disabledDates?.some((d) => isSameDay(d, date))) return true;
  return false;
}
function buildCalendarDays(year, month) {
  const today = /* @__PURE__ */ new Date();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const cells = [];
  const leadingDays = firstDay.getDay();
  for (let i = leadingDays - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    cells.push({
      date: d,
      dayNum: d.getDate(),
      isCurrentMonth: false,
      isToday: isSameDay(d, today),
      isSunday: d.getDay() === 0,
      isDisabled: false
    });
  }
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const d = new Date(year, month, day);
    cells.push({
      date: d,
      dayNum: day,
      isCurrentMonth: true,
      isToday: isSameDay(d, today),
      isSunday: d.getDay() === 0,
      isDisabled: false
    });
  }
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    cells.push({
      date: d,
      dayNum: d.getDate(),
      isCurrentMonth: false,
      isToday: isSameDay(d, today),
      isSunday: d.getDay() === 0,
      isDisabled: false
    });
  }
  return cells;
}
function prevMonth(cal) {
  if (cal.month === 0) return { year: cal.year - 1, month: 11 };
  return { year: cal.year, month: cal.month - 1 };
}
function nextMonth(cal) {
  if (cal.month === 11) return { year: cal.year + 1, month: 0 };
  return { year: cal.year, month: cal.month + 1 };
}
function formatMonthTitle(year, month) {
  return `${DP_MONTHS_LONG[month]} ${year}`;
}
function buildRangeValue(startDate, endDate) {
  const sv = startDate ? toDateValue(startDate) : null;
  const ev = endDate ? toDateValue(endDate) : null;
  let days = 0;
  if (startDate && endDate) {
    days = Math.round(
      Math.abs(endDate.getTime() - startDate.getTime()) / 864e5
    ) + 1;
  }
  return {
    startDate: sv,
    endDate: ev,
    formattedRange: sv && ev ? `${sv.formatted} \u2192 ${ev.formatted}` : sv?.formatted ?? "",
    days
  };
}
function parseInitialMonth(initialMonth) {
  if (!initialMonth) {
    const now = /* @__PURE__ */ new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  }
  if (typeof initialMonth === "string") {
    const [y, m] = initialMonth.split("-").map(Number);
    return { year: y, month: (m || 1) - 1 };
  }
  return { year: initialMonth.getFullYear(), month: initialMonth.getMonth() };
}

// src/UTILS/DatePicker/DatePicker.hooks.ts
function useMonthNavigation(initialMonth) {
  const [current, setCurrent] = useState57(
    () => parseInitialMonth(initialMonth)
  );
  const goPrev = useCallback54(() => setCurrent(prevMonth), []);
  const goNext = useCallback54(() => setCurrent(nextMonth), []);
  const setMonth = useCallback54((cal) => setCurrent(cal), []);
  const days = buildCalendarDays(current.year, current.month);
  return { current, days, goPrev, goNext, setMonth };
}
function useDropdown() {
  const [isOpen, setIsOpen] = useState57(false);
  const rootRef = useRef39(null);
  const open = useCallback54(() => setIsOpen(true), []);
  const close = useCallback54(() => setIsOpen(false), []);
  const toggle = useCallback54(() => setIsOpen((p) => !p), []);
  useEffect38(() => {
    const onClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [close]);
  return { isOpen, open, close, toggle, rootRef };
}
function useSingleDate(defaultValue, onChange, disabledDates, minDate, maxDate) {
  const [selected, setSelected] = useState57(defaultValue ?? null);
  const select = useCallback54((date) => {
    if (isDateDisabled(date, disabledDates, minDate, maxDate)) return;
    setSelected(date);
    onChange?.(toDateValue(date));
  }, [onChange, disabledDates, minDate, maxDate]);
  const clear = useCallback54(() => {
    setSelected(null);
    onChange?.(null);
  }, [onChange]);
  return { selected, select, clear };
}
function useDateRange(defaultValue, onChange, disabledDates, minDate, maxDate) {
  const [startDate, setStartDate] = useState57(
    defaultValue?.startDate?.date ?? null
  );
  const [endDate, setEndDate] = useState57(
    defaultValue?.endDate?.date ?? null
  );
  const [selecting, setSelecting] = useState57("start");
  const selectDate = useCallback54((date) => {
    if (isDateDisabled(date, disabledDates, minDate, maxDate)) return;
    if (selecting === "start" || !startDate) {
      setStartDate(date);
      setEndDate(null);
      setSelecting("end");
      onChange?.(buildRangeValue(date, null));
    } else {
      const [s, e] = date < startDate ? [date, startDate] : [startDate, date];
      setStartDate(s);
      setEndDate(e);
      setSelecting("start");
      onChange?.(buildRangeValue(s, e));
    }
  }, [selecting, startDate, onChange, disabledDates, minDate, maxDate]);
  const clear = useCallback54(() => {
    setStartDate(null);
    setEndDate(null);
    setSelecting("start");
    onChange?.(buildRangeValue(null, null));
  }, [onChange]);
  const isDayInRange = useCallback54((date) => isBetween(date, startDate, endDate), [startDate, endDate]);
  const isDayStart = useCallback54((date) => startDate ? isSameDay(date, startDate) : false, [startDate]);
  const isDayEnd = useCallback54((date) => endDate ? isSameDay(date, endDate) : false, [endDate]);
  return {
    startDate,
    endDate,
    selecting,
    selectDate,
    clear,
    isDayInRange,
    isDayStart,
    isDayEnd
  };
}
function useMultipleDatePicker(onChange, onAccept) {
  const [pickers, setPickers] = useState57([
    { id: 1, value: null, initialMonth: /* @__PURE__ */ new Date() }
  ]);
  const nextId = useRef39(2);
  const addPicker = useCallback54(() => {
    setPickers((prev) => [
      ...prev,
      { id: nextId.current++, value: null, initialMonth: /* @__PURE__ */ new Date() }
    ]);
  }, []);
  const removePicker = useCallback54((id) => {
    setPickers((prev) => prev.length > 1 ? prev.filter((p) => p.id !== id) : prev);
  }, []);
  const updateValue = useCallback54((id, value) => {
    setPickers((prev) => prev.map((p) => p.id === id ? { ...p, value } : p));
    const current = pickers.map((p) => p.id === id ? value : p.value).filter(Boolean);
    onChange?.(current);
  }, [pickers, onChange]);
  const accept = useCallback54(() => {
    const values = pickers.map((p) => p.value).filter(Boolean);
    onAccept?.(values);
  }, [pickers, onAccept]);
  return { pickers, addPicker, removePicker, updateValue, accept };
}

// src/UTILS/DatePicker/DatePicker.tsx
import { Fragment as Fragment17, jsx as jsx111, jsxs as jsxs77 } from "react/jsx-runtime";
var MonthYearPicker = ({ year, month, onSelect }) => {
  const [selectedYear, setSelectedYear] = useState58(year);
  const selectedYearRef = useRef40(null);
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const years = Array.from({ length: 151 }, (_, i) => currentYear - 100 + i);
  useEffect39(() => {
    selectedYearRef.current?.scrollIntoView({ block: "center", behavior: "auto" });
  }, []);
  return /* @__PURE__ */ jsxs77("div", { className: DP_CLASSES.ymPicker, children: [
    /* @__PURE__ */ jsx111("div", { className: DP_CLASSES.yearList, children: years.map((y) => /* @__PURE__ */ jsx111(
      "button",
      {
        ref: y === selectedYear ? selectedYearRef : void 0,
        className: [DP_CLASSES.yearItem, y === selectedYear ? DP_CLASSES.yearItemSelected : ""].filter(Boolean).join(" "),
        onClick: () => setSelectedYear(y),
        children: y
      },
      y
    )) }),
    /* @__PURE__ */ jsx111("div", { className: DP_CLASSES.monthGrid, children: DP_MONTHS_SHORT.map((m, i) => /* @__PURE__ */ jsx111(
      "button",
      {
        className: [DP_CLASSES.monthItem, i === month && selectedYear === year ? DP_CLASSES.monthItemSelected : ""].filter(Boolean).join(" "),
        onClick: () => onSelect(selectedYear, i),
        children: m
      },
      m
    )) })
  ] });
};
MonthYearPicker.displayName = "MonthYearPicker";
var Calendar2 = memo2(({
  year,
  month,
  days,
  selectedDate,
  startDate,
  endDate,
  onDayClick,
  disabledDates,
  minDate,
  maxDate,
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  setMonth
}) => {
  const [mode, setMode] = useState58("days");
  return /* @__PURE__ */ jsxs77("div", { className: DP_CLASSES.calendar, children: [
    /* @__PURE__ */ jsxs77("div", { className: DP_CLASSES.header, children: [
      /* @__PURE__ */ jsx111("button", { className: DP_CLASSES.navBtn, onClick: onPrev, disabled: prevDisabled || mode === "month-year", children: "\u2039" }),
      /* @__PURE__ */ jsxs77(
        "button",
        {
          className: DP_CLASSES.title,
          onClick: () => setMode((m) => m === "days" ? "month-year" : "days"),
          children: [
            formatMonthTitle(year, month),
            /* @__PURE__ */ jsx111("span", { className: DP_CLASSES.titleCaret, children: mode === "month-year" ? "\u25B2" : "\u25BC" })
          ]
        }
      ),
      /* @__PURE__ */ jsx111("button", { className: DP_CLASSES.navBtn, onClick: onNext, disabled: nextDisabled || mode === "month-year", children: "\u203A" })
    ] }),
    mode === "month-year" ? /* @__PURE__ */ jsx111(
      MonthYearPicker,
      {
        year,
        month,
        onSelect: (y, m) => {
          setMonth({ year: y, month: m });
          setMode("days");
        }
      }
    ) : /* @__PURE__ */ jsxs77(Fragment17, { children: [
      /* @__PURE__ */ jsx111("div", { className: DP_CLASSES.weekdays, children: DP_WEEKDAYS_SHORT.map((d, i) => /* @__PURE__ */ jsx111("div", { className: `${DP_CLASSES.weekday}${i === 0 ? ` ${DP_CLASSES.weekdaySun}` : ""}`, children: d }, d)) }),
      /* @__PURE__ */ jsx111("div", { className: DP_CLASSES.days, children: days.map((cell, idx) => {
        const isSel = selectedDate ? isSameDay(cell.date, selectedDate) : false;
        const isStart = startDate ? isSameDay(cell.date, startDate) : false;
        const isEnd = endDate ? isSameDay(cell.date, endDate) : false;
        const isRange = startDate && endDate ? cell.date > startDate && cell.date < endDate : false;
        const disabled = isDateDisabled(cell.date, disabledDates, minDate, maxDate);
        const cls = [
          DP_CLASSES.day,
          cell.isToday ? DP_CLASSES.dayToday : "",
          isSel ? DP_CLASSES.daySelected : "",
          cell.isSunday ? DP_CLASSES.daySunday : "",
          !cell.isCurrentMonth ? DP_CLASSES.dayOtherMonth : "",
          disabled ? DP_CLASSES.dayDisabled : "",
          isRange ? DP_CLASSES.dayInRange : "",
          isStart && isEnd ? DP_CLASSES.dayRangeSingle : "",
          isStart && !isEnd ? DP_CLASSES.dayRangeStart : "",
          !isStart && isEnd ? DP_CLASSES.dayRangeEnd : ""
        ].filter(Boolean).join(" ");
        return /* @__PURE__ */ jsx111(
          "button",
          {
            className: cls,
            onClick: () => !disabled && onDayClick(cell.date),
            disabled,
            tabIndex: cell.isCurrentMonth ? 0 : -1,
            "aria-label": cell.date.toDateString(),
            "aria-selected": isSel || isStart || isEnd,
            children: cell.dayNum
          },
          idx
        );
      }) })
    ] })
  ] });
});
Calendar2.displayName = "Calendar";
var DatePicker = ({
  defaultValue,
  onChange,
  inline = false,
  clearable = true,
  placeholder = "Seleccionar fecha\u2026",
  disabledDates,
  minDate,
  maxDate,
  initialMonth,
  name
}) => {
  const { isOpen, toggle, close, rootRef } = useDropdown();
  const { current, days, goPrev, goNext, setMonth } = useMonthNavigation(initialMonth);
  const { selected, select, clear } = useSingleDate(defaultValue, onChange, disabledDates, minDate, maxDate);
  const displayValue = selected ? toDateValue(selected).display : "";
  const calendar = /* @__PURE__ */ jsx111(
    Calendar2,
    {
      year: current.year,
      month: current.month,
      days,
      selectedDate: selected,
      onDayClick: (d) => {
        select(d);
        if (!inline) close();
      },
      disabledDates,
      minDate,
      maxDate,
      onPrev: goPrev,
      onNext: goNext,
      setMonth
    }
  );
  if (inline) {
    return /* @__PURE__ */ jsxs77("div", { className: DP_CLASSES.root, children: [
      name && /* @__PURE__ */ jsx111("input", { type: "hidden", name, value: selected ? toDateValue(selected).formatted : "" }),
      calendar,
      clearable && selected && /* @__PURE__ */ jsx111("div", { className: DP_CLASSES.actions, children: /* @__PURE__ */ jsx111("button", { onClick: clear, style: { fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid var(--w3f-outline-variant)", cursor: "pointer", background: "transparent" }, children: "Limpiar" }) })
    ] });
  }
  return /* @__PURE__ */ jsxs77("div", { className: DP_CLASSES.root, ref: rootRef, children: [
    name && /* @__PURE__ */ jsx111("input", { type: "hidden", name, value: selected ? toDateValue(selected).formatted : "" }),
    /* @__PURE__ */ jsxs77("div", { className: DP_CLASSES.inputWrapper, children: [
      /* @__PURE__ */ jsx111(
        "input",
        {
          readOnly: true,
          className: DP_CLASSES.input,
          value: displayValue,
          placeholder,
          onClick: toggle
        }
      ),
      /* @__PURE__ */ jsx111("span", { className: DP_CLASSES.inputIcon, children: "\u{1F4C5}" })
    ] }),
    isOpen && /* @__PURE__ */ jsx111("div", { className: DP_CLASSES.dropdown, children: calendar })
  ] });
};
DatePicker.displayName = "DatePicker";
var StaticDatePicker = (props) => /* @__PURE__ */ jsx111(DatePicker, { ...props, inline: true });
StaticDatePicker.displayName = "StaticDatePicker";
var DateRangePicker = ({
  defaultValue,
  onChange,
  placeholder = "Seleccionar rango\u2026",
  disabledDates,
  minDate,
  maxDate,
  initialMonth,
  name,
  dual = false,
  discontinuous = false
}) => {
  const { isOpen, toggle, rootRef } = useDropdown();
  const leftNav = useMonthNavigation(initialMonth);
  const rightNav = useMonthNavigation(
    initialMonth instanceof Date ? new Date(initialMonth.getFullYear(), initialMonth.getMonth() + 1, 1) : void 0
  );
  const {
    startDate,
    endDate,
    selectDate,
    clear,
    isDayInRange,
    isDayStart,
    isDayEnd
  } = useDateRange(defaultValue, onChange, disabledDates, minDate, maxDate);
  const displayValue = startDate ? buildRangeValue(startDate, endDate).formattedRange || toDateValue(startDate).display : "";
  const calendarBase = (nav, prevDis = false, nextDis = false) => /* @__PURE__ */ jsx111(
    Calendar2,
    {
      year: nav.current.year,
      month: nav.current.month,
      days: nav.days,
      startDate,
      endDate,
      onDayClick: selectDate,
      disabledDates,
      minDate,
      maxDate,
      onPrev: nav.goPrev,
      onNext: nav.goNext,
      prevDisabled: prevDis,
      nextDisabled: nextDis,
      setMonth: nav.setMonth
    }
  );
  const singleCalendar = calendarBase(leftNav);
  const dualCalendar = /* @__PURE__ */ jsxs77("div", { className: DP_CLASSES.dual, children: [
    calendarBase(
      leftNav,
      false,
      !discontinuous ? leftNav.current.month === rightNav.current.month - 1 && leftNav.current.year === rightNav.current.year : false
    ),
    /* @__PURE__ */ jsx111("div", { className: DP_CLASSES.dualDivider }),
    calendarBase(
      rightNav,
      !discontinuous ? rightNav.current.month === leftNav.current.month + 1 && rightNav.current.year === leftNav.current.year : false,
      false
    )
  ] });
  const content = dual ? dualCalendar : singleCalendar;
  return /* @__PURE__ */ jsxs77("div", { className: DP_CLASSES.root, ref: rootRef, children: [
    name && /* @__PURE__ */ jsx111("input", { type: "hidden", name, value: displayValue }),
    /* @__PURE__ */ jsxs77("div", { className: DP_CLASSES.inputWrapper, children: [
      /* @__PURE__ */ jsx111("input", { readOnly: true, className: DP_CLASSES.input, value: displayValue, placeholder, onClick: toggle }),
      /* @__PURE__ */ jsx111("span", { className: DP_CLASSES.inputIcon, children: "\u{1F4C5}" })
    ] }),
    isOpen && /* @__PURE__ */ jsxs77("div", { className: DP_CLASSES.dropdown, children: [
      content,
      /* @__PURE__ */ jsx111("div", { className: DP_CLASSES.actions, children: /* @__PURE__ */ jsx111("button", { onClick: clear, style: { fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid var(--w3f-outline-variant)", cursor: "pointer", background: "transparent" }, children: "Limpiar" }) })
    ] })
  ] });
};
DateRangePicker.displayName = "DateRangePicker";
var DateRangePickerDual = (props) => /* @__PURE__ */ jsx111(DateRangePicker, { ...props, dual: true });
DateRangePickerDual.displayName = "DateRangePickerDual";
var MultipleDatePicker = ({
  onChange,
  onAccept,
  maxPickers = 10,
  acceptLabel = "Aceptar",
  disabledDates,
  minDate,
  maxDate,
  children,
  name
}) => {
  const { pickers, addPicker, removePicker, updateValue, accept } = useMultipleDatePicker(onChange, onAccept);
  return /* @__PURE__ */ jsxs77("div", { className: DP_CLASSES.multiple, children: [
    name && /* @__PURE__ */ jsx111(
      "input",
      {
        type: "hidden",
        name,
        value: JSON.stringify(pickers.map((p) => p.value?.formatted ?? ""))
      }
    ),
    /* @__PURE__ */ jsx111("div", { className: DP_CLASSES.multipleList, children: pickers.map((p, idx) => /* @__PURE__ */ jsxs77("div", { className: DP_CLASSES.multipleItem, children: [
      /* @__PURE__ */ jsxs77("div", { className: DP_CLASSES.multipleItemLabel, children: [
        "Fecha ",
        idx + 1
      ] }),
      pickers.length > 1 && /* @__PURE__ */ jsx111(
        "button",
        {
          className: DP_CLASSES.multipleItemRemove,
          onClick: () => removePicker(p.id),
          "aria-label": "Eliminar",
          children: "\u2715"
        }
      ),
      /* @__PURE__ */ jsx111(
        StaticDatePicker,
        {
          defaultValue: p.value?.date ?? null,
          initialMonth: p.initialMonth,
          disabledDates,
          minDate,
          maxDate,
          onChange: (v) => updateValue(p.id, v)
        }
      )
    ] }, p.id)) }),
    children,
    /* @__PURE__ */ jsxs77("div", { className: DP_CLASSES.actions, children: [
      pickers.length < maxPickers && /* @__PURE__ */ jsx111(
        "button",
        {
          onClick: addPicker,
          style: { fontSize: 13, padding: "6px 14px", borderRadius: 8, border: "1px dashed var(--w3f-primary)", color: "var(--w3f-primary)", cursor: "pointer", background: "transparent", fontWeight: 600 },
          children: "+ Agregar fecha"
        }
      ),
      /* @__PURE__ */ jsx111(
        "button",
        {
          onClick: accept,
          style: { fontSize: 13, padding: "6px 14px", borderRadius: 8, border: "none", background: "var(--w3f-primary)", color: "#fff", cursor: "pointer", fontWeight: 600 },
          children: acceptLabel
        }
      )
    ] })
  ] });
};
MultipleDatePicker.displayName = "MultipleDatePicker";

// src/UTILS/TimePicker/TimePicker.tsx
import { memo as memo3, useRef as useRef42 } from "react";

// src/UTILS/TimePicker/TimePicker.constants.ts
var TP_CLASSES = {
  root: "w3f-timepicker",
  inputWrapper: "w3f-timepicker-input-wrapper",
  input: "w3f-timepicker-input",
  inputIcon: "w3f-timepicker-input-icon",
  dropdown: "w3f-timepicker-dropdown",
  panel: "w3f-timepicker-panel",
  display: "w3f-timepicker-display",
  displayTime: "w3f-timepicker-display-time",
  displayAmpm: "w3f-timepicker-display-ampm",
  wheels: "w3f-timepicker-wheels",
  separator: "w3f-timepicker-separator",
  column: "w3f-timepicker-column",
  columnLabel: "w3f-timepicker-column-label",
  scroll: "w3f-timepicker-scroll",
  item: "w3f-timepicker-item",
  itemSelected: "w3f-timepicker-item--selected",
  ampm: "w3f-timepicker-ampm",
  ampmBtn: "w3f-timepicker-ampm-btn",
  ampmBtnActive: "w3f-timepicker-ampm-btn--active",
  stepBtn: "w3f-timepicker-step-btn",
  actions: "w3f-timepicker-actions",
  inline: "w3f-timepicker-inline",
  output: "w3f-timepicker-output"
};
function generateRange(max, step) {
  const result = [];
  for (let i = 0; i <= max; i += step) result.push(i);
  return result;
}
var HOURS_24 = Array.from({ length: 24 }, (_, i) => i);
var HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1);
var ALL_MINUTES = Array.from({ length: 60 }, (_, i) => i);
var ALL_SECONDS = Array.from({ length: 60 }, (_, i) => i);

// src/UTILS/TimePicker/TimePicker.hooks.ts
import { useState as useState59, useCallback as useCallback55, useRef as useRef41, useEffect as useEffect40 } from "react";

// src/UTILS/TimePicker/TimePicker.utils.ts
function buildTimeValue(hours24, minutes, seconds, format) {
  const pad = (n) => String(n).padStart(2, "0");
  const ampm = hours24 < 12 ? "AM" : "PM";
  const h12 = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24;
  const formatted24 = `${pad(hours24)}:${pad(minutes)}:${pad(seconds)}`;
  const formatted12 = `${pad(h12)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
  return {
    hours: hours24,
    minutes,
    seconds,
    ampm,
    formatted24,
    formatted12,
    display: format === 12 ? formatted12 : formatted24,
    timestamp: hours24 * 3600 + minutes * 60 + seconds
  };
}
function parsePartialTime(partial) {
  return {
    hours24: partial?.hours ?? 0,
    minutes: partial?.minutes ?? 0,
    seconds: partial?.seconds ?? 0
  };
}
function getNowValues() {
  const n = /* @__PURE__ */ new Date();
  return { hours24: n.getHours(), minutes: n.getMinutes(), seconds: n.getSeconds() };
}
function to24Hour(h12, ampm) {
  if (ampm === "AM") return h12 === 12 ? 0 : h12;
  return h12 === 12 ? 12 : h12 + 12;
}
function to12Hour(h24) {
  if (h24 === 0) return 12;
  if (h24 <= 12) return h24;
  return h24 - 12;
}
function formatTimeDisplay(hours24, minutes, seconds, format, showSeconds) {
  const pad = (n) => String(n).padStart(2, "0");
  const ampm = hours24 < 12 ? "AM" : "PM";
  const h = format === 12 ? to12Hour(hours24) : hours24;
  const base = `${pad(h)}:${pad(minutes)}`;
  const withSec = showSeconds ? `${base}:${pad(seconds)}` : base;
  return format === 12 ? `${withSec} ${ampm}` : withSec;
}

// src/UTILS/TimePicker/TimePicker.hooks.ts
function useTPDropdown() {
  const [isOpen, setIsOpen] = useState59(false);
  const rootRef = useRef41(null);
  const open = useCallback55(() => setIsOpen(true), []);
  const close = useCallback55(() => setIsOpen(false), []);
  const toggle = useCallback55(() => setIsOpen((p) => !p), []);
  useEffect40(() => {
    const onOut = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) close();
    };
    document.addEventListener("mousedown", onOut);
    return () => document.removeEventListener("mousedown", onOut);
  }, [close]);
  return { isOpen, open, close, toggle, rootRef };
}
function useTimePicker(options) {
  const {
    defaultValue,
    format = 24,
    showSeconds = false,
    minuteStep = 1,
    secondStep = 1,
    onChange
  } = options;
  const parsed = parsePartialTime(defaultValue);
  const [hours24, setHours24] = useState59(parsed.hours24);
  const [minutes, setMinutes] = useState59(parsed.minutes);
  const [seconds, setSeconds] = useState59(parsed.seconds);
  const ampm = hours24 < 12 ? "AM" : "PM";
  const hours12 = to12Hour(hours24);
  const hourValues = format === 12 ? HOURS_12 : HOURS_24;
  const minuteValues = generateRange(59, minuteStep);
  const secondValues = generateRange(59, secondStep);
  const emitChange = useCallback55((h, m, s) => {
    onChange?.(buildTimeValue(h, m, s, format));
  }, [onChange, format]);
  const setHour = useCallback55((raw) => {
    const h = format === 12 ? to24Hour(raw, ampm) : raw;
    setHours24(h);
    emitChange(h, minutes, seconds);
  }, [format, ampm, minutes, seconds, emitChange]);
  const setMinute = useCallback55((m) => {
    setMinutes(m);
    emitChange(hours24, m, seconds);
  }, [hours24, seconds, emitChange]);
  const setSecond = useCallback55((s) => {
    setSeconds(s);
    emitChange(hours24, minutes, s);
  }, [hours24, minutes, emitChange]);
  const toggleAmPm = useCallback55(() => {
    const newAmPm = ampm === "AM" ? "PM" : "AM";
    const newH = to24Hour(hours12, newAmPm);
    setHours24(newH);
    emitChange(newH, minutes, seconds);
  }, [ampm, hours12, minutes, seconds, emitChange]);
  const setNow = useCallback55(() => {
    const { hours24: h, minutes: m, seconds: s } = getNowValues();
    setHours24(h);
    setMinutes(m);
    setSeconds(s);
    emitChange(h, m, s);
  }, [emitChange]);
  const clear = useCallback55(() => {
    setHours24(0);
    setMinutes(0);
    setSeconds(0);
  }, []);
  const currentValue = buildTimeValue(hours24, minutes, seconds, format);
  return {
    hours24,
    minutes,
    seconds,
    ampm,
    hours12,
    hourValues,
    minuteValues,
    secondValues,
    currentValue,
    setHour,
    setMinute,
    setSecond,
    toggleAmPm,
    setNow,
    clear
  };
}
function useScrollWheel(containerRef, values, selected, onSelect) {
  const ITEM_HEIGHT = 44;
  const isMounted = useRef41(false);
  const isProgrammatic = useRef41(false);
  const programmaticTimer = useRef41(null);
  const snapTimer = useRef41(null);
  useEffect40(() => {
    const el = containerRef.current;
    if (!el) return;
    const idx = values.indexOf(selected);
    if (idx < 0) return;
    const target = Math.max(0, idx * ITEM_HEIGHT - (el.clientHeight - ITEM_HEIGHT) / 2);
    if (snapTimer.current) clearTimeout(snapTimer.current);
    isProgrammatic.current = true;
    if (!isMounted.current) {
      el.scrollTop = target;
      isMounted.current = true;
      isProgrammatic.current = false;
    } else {
      el.scrollTo({ top: target, behavior: "smooth" });
      if (programmaticTimer.current) clearTimeout(programmaticTimer.current);
      programmaticTimer.current = setTimeout(() => {
        isProgrammatic.current = false;
      }, 500);
    }
  }, [selected, values, containerRef]);
  const onScroll = useCallback55(() => {
    if (isProgrammatic.current) return;
    const el = containerRef.current;
    if (!el) return;
    if (snapTimer.current) clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(() => {
      if (isProgrammatic.current) return;
      const idx = Math.round((el.scrollTop + (el.clientHeight - ITEM_HEIGHT) / 2) / ITEM_HEIGHT);
      const clamped = Math.max(0, Math.min(values.length - 1, idx));
      const newValue = values[clamped];
      if (newValue !== void 0 && newValue !== selected) onSelect(newValue);
    }, 150);
  }, [containerRef, values, selected, onSelect]);
  return { onScroll };
}

// src/UTILS/TimePicker/TimePicker.tsx
import { Fragment as Fragment18, jsx as jsx112, jsxs as jsxs78 } from "react/jsx-runtime";
var WheelColumn = memo3(({ label, values, selected, onSelect, pad = 2 }) => {
  const scrollRef = useRef42(null);
  const { onScroll } = useScrollWheel(scrollRef, values, selected, onSelect);
  return /* @__PURE__ */ jsxs78("div", { className: TP_CLASSES.column, children: [
    /* @__PURE__ */ jsx112("span", { className: TP_CLASSES.columnLabel, children: label }),
    /* @__PURE__ */ jsx112(
      "button",
      {
        className: TP_CLASSES.stepBtn,
        onClick: () => {
          const idx = values.indexOf(selected);
          if (idx > 0) onSelect(values[idx - 1]);
        },
        children: "\u25B2"
      }
    ),
    /* @__PURE__ */ jsxs78("div", { className: TP_CLASSES.scroll, ref: scrollRef, onScroll, children: [
      /* @__PURE__ */ jsx112("div", { style: { height: 44, flexShrink: 0 } }),
      values.map((v) => /* @__PURE__ */ jsx112(
        "button",
        {
          className: `${TP_CLASSES.item}${v === selected ? ` ${TP_CLASSES.itemSelected}` : ""}`,
          onClick: () => onSelect(v),
          tabIndex: 0,
          children: String(v).padStart(pad, "0")
        },
        v
      )),
      /* @__PURE__ */ jsx112("div", { style: { height: 44, flexShrink: 0 } })
    ] }),
    /* @__PURE__ */ jsx112(
      "button",
      {
        className: TP_CLASSES.stepBtn,
        onClick: () => {
          const idx = values.indexOf(selected);
          if (idx < values.length - 1) onSelect(values[idx + 1]);
        },
        children: "\u25BC"
      }
    )
  ] });
});
WheelColumn.displayName = "WheelColumn";
var TimePickerPanel = memo3(({
  state,
  format,
  showSeconds,
  showNow,
  onAccept,
  onClear,
  onClose
}) => {
  const {
    hours24,
    minutes,
    seconds,
    ampm,
    hours12,
    hourValues,
    minuteValues,
    secondValues,
    currentValue,
    setHour,
    setMinute,
    setSecond,
    toggleAmPm,
    setNow,
    clear
  } = state;
  const displayH = format === 12 ? hours12 : hours24;
  return /* @__PURE__ */ jsxs78("div", { className: TP_CLASSES.panel, children: [
    /* @__PURE__ */ jsx112("div", { className: TP_CLASSES.display, children: /* @__PURE__ */ jsx112("span", { className: TP_CLASSES.displayTime, children: currentValue.display }) }),
    /* @__PURE__ */ jsxs78("div", { className: TP_CLASSES.wheels, children: [
      /* @__PURE__ */ jsx112(
        WheelColumn,
        {
          label: "Horas",
          values: hourValues,
          selected: displayH,
          onSelect: setHour
        }
      ),
      /* @__PURE__ */ jsx112("span", { className: TP_CLASSES.separator, children: ":" }),
      /* @__PURE__ */ jsx112(
        WheelColumn,
        {
          label: "Minutos",
          values: minuteValues,
          selected: minutes,
          onSelect: setMinute
        }
      ),
      showSeconds && /* @__PURE__ */ jsxs78(Fragment18, { children: [
        /* @__PURE__ */ jsx112("span", { className: TP_CLASSES.separator, children: ":" }),
        /* @__PURE__ */ jsx112(
          WheelColumn,
          {
            label: "Segundos",
            values: secondValues,
            selected: seconds,
            onSelect: setSecond
          }
        )
      ] }),
      format === 12 && /* @__PURE__ */ jsxs78("div", { className: TP_CLASSES.ampm, children: [
        /* @__PURE__ */ jsx112(
          "button",
          {
            className: `${TP_CLASSES.ampmBtn}${ampm === "AM" ? ` ${TP_CLASSES.ampmBtnActive}` : ""}`,
            onClick: () => ampm !== "AM" && toggleAmPm(),
            children: "AM"
          }
        ),
        /* @__PURE__ */ jsx112(
          "button",
          {
            className: `${TP_CLASSES.ampmBtn}${ampm === "PM" ? ` ${TP_CLASSES.ampmBtnActive}` : ""}`,
            onClick: () => ampm !== "PM" && toggleAmPm(),
            children: "PM"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs78("div", { className: TP_CLASSES.actions, children: [
      showNow && /* @__PURE__ */ jsx112(
        "button",
        {
          onClick: () => {
            setNow();
          },
          style: { fontSize: 12, padding: "4px 10px", borderRadius: 6, border: "1px solid var(--w3f-outline-variant)", cursor: "pointer", background: "transparent" },
          children: "Ahora"
        }
      ),
      onClear && /* @__PURE__ */ jsx112(
        "button",
        {
          onClick: () => {
            clear();
            onClear();
          },
          style: { fontSize: 12, padding: "4px 10px", borderRadius: 6, border: "1px solid var(--w3f-outline-variant)", cursor: "pointer", background: "transparent" },
          children: "Limpiar"
        }
      ),
      onAccept && /* @__PURE__ */ jsx112(
        "button",
        {
          onClick: () => {
            onAccept();
            onClose?.();
          },
          style: { fontSize: 12, padding: "4px 12px", borderRadius: 6, border: "none", background: "var(--w3f-primary)", color: "#fff", cursor: "pointer", fontWeight: 600 },
          children: "Aceptar"
        }
      )
    ] })
  ] });
});
TimePickerPanel.displayName = "TimePickerPanel";
var TimePicker = ({
  defaultValue,
  format = 24,
  showSeconds = false,
  minuteStep = 1,
  secondStep = 1,
  placeholder = "Seleccionar hora\u2026",
  name,
  onChange,
  onAccept,
  inline = false,
  clearable = true,
  showNow = true,
  children,
  className
}) => {
  const { isOpen, toggle, close, rootRef } = useTPDropdown();
  const state = useTimePicker({
    defaultValue,
    format,
    showSeconds,
    minuteStep,
    secondStep,
    onChange
  });
  const displayStr = formatTimeDisplay(
    state.hours24,
    state.minutes,
    state.seconds,
    format,
    showSeconds
  );
  const panel = /* @__PURE__ */ jsx112(
    TimePickerPanel,
    {
      state,
      format,
      showSeconds,
      showNow,
      onAccept: onAccept ? () => onAccept(state.currentValue) : void 0,
      onClear: clearable ? state.clear : void 0,
      onClose: close
    }
  );
  if (inline) {
    return /* @__PURE__ */ jsxs78("div", { className: `${TP_CLASSES.inline}${className ? ` ${className}` : ""}`, children: [
      name && /* @__PURE__ */ jsx112("input", { type: "hidden", name, value: state.currentValue.formatted24 }),
      panel,
      children
    ] });
  }
  return /* @__PURE__ */ jsxs78("div", { className: `${TP_CLASSES.root}${className ? ` ${className}` : ""}`, ref: rootRef, children: [
    name && /* @__PURE__ */ jsx112("input", { type: "hidden", name, value: state.currentValue.formatted24 }),
    /* @__PURE__ */ jsxs78("div", { className: TP_CLASSES.inputWrapper, children: [
      /* @__PURE__ */ jsx112(
        "input",
        {
          readOnly: true,
          className: TP_CLASSES.input,
          value: displayStr,
          placeholder,
          onClick: toggle
        }
      ),
      /* @__PURE__ */ jsx112("span", { className: TP_CLASSES.inputIcon, children: "\u{1F550}" })
    ] }),
    isOpen && /* @__PURE__ */ jsx112("div", { className: TP_CLASSES.dropdown, children: panel }),
    children
  ] });
};
TimePicker.displayName = "TimePicker";
var StaticTimePicker = (props) => /* @__PURE__ */ jsx112(TimePicker, { ...props, inline: true });
StaticTimePicker.displayName = "StaticTimePicker";
export {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionHorizontal,
  AccordionItem,
  AccordionSummary,
  AppBar_default as AppBar,
  AppBarLeading,
  AppBarTitle,
  AppBarTrailing,
  AreaChart,
  AudioPlayer,
  AuthLogin,
  Autocomplete,
  Avatar,
  Backdrop,
  Badge,
  BadgeWrapper,
  BarChart,
  BottomNavigation,
  BottomSheetPanel,
  Breadcrumbs,
  Button,
  ButtonGrid,
  ButtonGroup,
  ButtonToggle,
  Card,
  Card_2,
  Cell,
  Checkbox,
  Chip,
  Col,
  Console,
  Container,
  ContextMenu,
  ContextMenuItem,
  DatePicker,
  DateRangePicker,
  DateRangePickerDual,
  Desktop,
  Dividers,
  Drawer,
  EmailField,
  FloatingActionButton,
  Fonts,
  Form,
  FormField,
  Grid,
  GridWithDividers,
  GridWithDrawer,
  Icon,
  Image2 as Image,
  ImageCard,
  ImageGallery,
  ImageList,
  Input,
  InputChipContainer,
  Section2 as LayoutSection,
  LineChart,
  Link,
  LiveForm,
  Marquee,
  Masonry,
  Menu_default as MenuBarCategory,
  MenuItem,
  Modal,
  ModalConfirm,
  ModalSimple,
  ModalWithData,
  MultipleDatePicker,
  Note,
  NumberField,
  Pagination,
  Panel,
  Paper,
  PaperDesign,
  PasswordField,
  PaymentGateway,
  PieChart,
  PopUp,
  ProgressBar,
  ProgressBarBuffer,
  ProgressBarIndeterminate,
  ProgressSpinner,
  Quotes,
  RadioButton,
  RangeSlider,
  Rating,
  RelojAnalogico,
  Ripple,
  Row,
  ScatterPlot,
  Section,
  SectionTitle,
  Select,
  ShoppingCart2 as ShoppingCart,
  Sidenav,
  SlideToggle,
  Slider,
  Snackbar,
  SpeedDial,
  Stack,
  StaticDatePicker,
  StaticTimePicker,
  Stepper,
  SubSection,
  Table,
  Tabs,
  Tag2 as Tag,
  Text,
  TextField,
  TimePicker,
  ToggleButton,
  Tooltip,
  TransferList,
  Tree,
  TreeControls,
  VerticalPadding,
  VideoPlayer,
  Window,
  WindowGrid
};
//# sourceMappingURL=index.js.map
