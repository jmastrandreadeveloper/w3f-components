import { useContext, useCallback, useRef, useSyncExternalStore } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "./Form";
const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext debe ser usado dentro de un <Form> o <LiveForm>");
  }
  return context;
};
const useFormField = (name) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormContext();
  return {
    value: values[name] ?? "",
    error: errors[name],
    touched: touched[name] ?? false,
    onChange: handleChange,
    onBlur: handleBlur,
    setValue: (value) => setFieldValue(name, value)
  };
};
const useFormDispatch = () => {
  return useContext(FormDispatchContext);
};
const useFormMeta = () => {
  return useContext(FormMetaContext);
};
const useFormFieldStore = () => {
  return useContext(FormFieldStoreContext);
};
const useFormFieldValue = (name) => {
  const store = useContext(FormFieldStoreContext);
  const nameRef = useRef(name);
  nameRef.current = name;
  const subscribe = useCallback(
    (onStoreChange) => {
      if (!store) return () => {
      };
      return store.subscribe(nameRef.current, onStoreChange);
    },
    [store]
  );
  const getSnapshot = useCallback(() => {
    if (!store) return void 0;
    return store.getFieldValue(nameRef.current);
  }, [store]);
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};
const useFormFieldError = (name) => {
  const meta = useContext(FormMetaContext);
  if (!meta) return void 0;
  return meta.errors[name];
};
const useFormFieldTouched = (name) => {
  const meta = useContext(FormMetaContext);
  if (!meta) return false;
  return meta.touched[name] ?? false;
};
const useOptimizedFormField = (name) => {
  const dispatch = useContext(FormDispatchContext);
  const meta = useContext(FormMetaContext);
  const store = useContext(FormFieldStoreContext);
  if (!dispatch || !meta || !store) return null;
  const value = useFormFieldValue(name);
  return {
    value: value ?? "",
    error: meta.errors[name],
    touched: meta.touched[name] ?? false,
    onChange: dispatch.handleChange,
    onBlur: dispatch.handleBlur,
    setValue: (v) => dispatch.setFieldValue(name, v),
    setError: (err) => dispatch.setFieldError(name, err),
    clearError: () => dispatch.clearFieldError(name),
    dispatch
  };
};
export {
  useFormContext,
  useFormDispatch,
  useFormField,
  useFormFieldError,
  useFormFieldStore,
  useFormFieldTouched,
  useFormFieldValue,
  useFormMeta,
  useOptimizedFormField
};
//# sourceMappingURL=Form.hooks.js.map
