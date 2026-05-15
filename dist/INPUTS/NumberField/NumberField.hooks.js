import { useContext, useState, useCallback, useEffect } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
import { clampValue, isValidNumber, formatValue } from "./NumberField.utils";
const useNumberFieldFormContext = () => {
  return useContext(FormContext);
};
const useNumberFieldFormDispatch = () => useContext(FormDispatchContext);
const useNumberFieldFormMeta = () => useContext(FormMetaContext);
const useNumberFieldFieldStore = () => useContext(FormFieldStoreContext);
const useNumberField = ({
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
  const [internalValue, setInternalValue] = useState(String(fieldValue));
  useEffect(() => {
    setInternalValue(String(fieldValue));
  }, [fieldValue]);
  const notifyChange = useCallback(
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
  const handleSpin = useCallback(
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
export {
  useNumberField,
  useNumberFieldFieldStore,
  useNumberFieldFormContext,
  useNumberFieldFormDispatch,
  useNumberFieldFormMeta
};
//# sourceMappingURL=NumberField.hooks.js.map
