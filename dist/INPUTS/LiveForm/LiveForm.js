"use client";
import { jsx } from "react/jsx-runtime";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
import { LIVE_FORM_DEFAULTS } from "./LiveForm.constants";
import { buildLiveFormClasses } from "./LiveForm.utils";
import { getFieldValue } from "../Form/Form.utils";
const LiveForm = ({
  children,
  initialValues = LIVE_FORM_DEFAULTS.initialValues,
  onValuesChange,
  unstyled = LIVE_FORM_DEFAULTS.unstyled,
  className = LIVE_FORM_DEFAULTS.className,
  ...props
}) => {
  const [values, setValues] = useState({ ...initialValues });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
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
  const resetForm = useCallback(() => {
    setValuesAndNotify({ ...initialValues });
    setErrors({});
    setTouched({});
  }, [initialValues, setValuesAndNotify]);
  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(values);
    }
  }, [values, onValuesChange]);
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
    isSubmitting: false
  }), [errors, touched]);
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
      isSubmitting: false
    }),
    [values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldError, clearFieldError, resetForm]
  );
  const hasValues = Object.values(values).some((v) => v !== "" && v !== void 0 && v !== null);
  const containerClasses = buildLiveFormClasses(className, hasValues, unstyled);
  return /* @__PURE__ */ jsx(FormDispatchContext.Provider, { value: dispatchValue, children: /* @__PURE__ */ jsx(FormMetaContext.Provider, { value: metaValue, children: /* @__PURE__ */ jsx(FormFieldStoreContext.Provider, { value: fieldStore, children: /* @__PURE__ */ jsx(FormContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: containerClasses,
      ...props,
      children
    }
  ) }) }) }) });
};
LiveForm.displayName = "LiveForm";
var LiveForm_default = LiveForm;
export {
  LiveForm,
  LiveForm_default as default
};
//# sourceMappingURL=LiveForm.js.map
