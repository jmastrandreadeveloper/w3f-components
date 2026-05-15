import { useContext, useState } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
const usePasswordFieldFormContext = () => {
  return useContext(FormContext);
};
const usePasswordFieldFormDispatch = () => useContext(FormDispatchContext);
const usePasswordFieldFormMeta = () => useContext(FormMetaContext);
const usePasswordFieldFieldStore = () => useContext(FormFieldStoreContext);
const usePasswordFieldFocus = () => {
  const [isFocused, setIsFocused] = useState(false);
  return {
    isFocused,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  };
};
const usePasswordVisibility = () => {
  const [showPassword, setShowPassword] = useState(false);
  return {
    showPassword,
    toggleVisibility: () => setShowPassword((prev) => !prev)
  };
};
export {
  usePasswordFieldFieldStore,
  usePasswordFieldFocus,
  usePasswordFieldFormContext,
  usePasswordFieldFormDispatch,
  usePasswordFieldFormMeta,
  usePasswordVisibility
};
//# sourceMappingURL=PasswordField.hooks.js.map
