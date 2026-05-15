import { useContext, useState } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
const useEmailFieldFormContext = () => {
  return useContext(FormContext);
};
const useEmailFieldFormDispatch = () => useContext(FormDispatchContext);
const useEmailFieldFormMeta = () => useContext(FormMetaContext);
const useEmailFieldFieldStore = () => useContext(FormFieldStoreContext);
const useEmailFieldFocus = () => {
  const [isFocused, setIsFocused] = useState(false);
  return {
    isFocused,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  };
};
export {
  useEmailFieldFieldStore,
  useEmailFieldFocus,
  useEmailFieldFormContext,
  useEmailFieldFormDispatch,
  useEmailFieldFormMeta
};
//# sourceMappingURL=EmailField.hooks.js.map
