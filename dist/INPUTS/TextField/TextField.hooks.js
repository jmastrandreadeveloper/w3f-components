import { useContext, useState } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
const useTextFieldFormContext = () => {
  return useContext(FormContext);
};
const useTextFieldFormDispatch = () => useContext(FormDispatchContext);
const useTextFieldFormMeta = () => useContext(FormMetaContext);
const useTextFieldFieldStore = () => useContext(FormFieldStoreContext);
const useTextFieldFocus = () => {
  const [isFocused, setIsFocused] = useState(false);
  return {
    isFocused,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  };
};
export {
  useTextFieldFieldStore,
  useTextFieldFocus,
  useTextFieldFormContext,
  useTextFieldFormDispatch,
  useTextFieldFormMeta
};
//# sourceMappingURL=TextField.hooks.js.map
