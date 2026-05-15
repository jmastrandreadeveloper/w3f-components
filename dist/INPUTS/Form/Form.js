"use client";
import { jsx } from "react/jsx-runtime";
import { createContext, useState, useCallback, useMemo, useRef } from "react";
import { FORM_DEFAULTS } from "./Form.constants";
import { buildFormClasses, getFieldValue, validateAllFields } from "./Form.utils";
const FormDispatchContext = createContext(null);
const FormMetaContext = createContext(null);
const FormFieldStoreContext = createContext(null);
const FormContext = createContext(null);
const Form = ({
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
var Form_default = Form;
export {
  Form,
  FormContext,
  FormDispatchContext,
  FormFieldStoreContext,
  FormMetaContext,
  Form_default as default
};
//# sourceMappingURL=Form.js.map
