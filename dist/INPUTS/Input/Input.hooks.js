import { useContext, useState, useCallback, useRef } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
import { resolveMask } from "./Input.masks";
const useInputFormContext = () => {
  return useContext(FormContext);
};
const useInputFormDispatch = () => useContext(FormDispatchContext);
const useInputFormMeta = () => useContext(FormMetaContext);
const useInputFieldStore = () => useContext(FormFieldStoreContext);
const useInputFocus = (disabled) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    if (!disabled) setIsFocused(true);
  };
  const handleBlurFocus = (hasValue) => {
    if (!hasValue) setIsFocused(false);
  };
  return { isFocused, handleFocus, handleBlurFocus };
};
const useInputMask = (maskProp, externalValue) => {
  const maskDef = maskProp ? resolveMask(maskProp) : null;
  const [internalDisplay, setInternalDisplay] = useState("");
  const cleanRef = useRef("");
  const formatAndUpdate = useCallback((raw) => {
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
const usePatternValidation = (patternProp) => {
  const [patternError, setPatternError] = useState();
  const validateOnBlur = useCallback((value) => {
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
export {
  useInputFieldStore,
  useInputFocus,
  useInputFormContext,
  useInputFormDispatch,
  useInputFormMeta,
  useInputMask,
  usePatternValidation
};
//# sourceMappingURL=Input.hooks.js.map
