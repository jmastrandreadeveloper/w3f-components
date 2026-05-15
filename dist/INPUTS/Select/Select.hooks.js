import { useContext, useState } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
const useSelectFormContext = () => {
  return useContext(FormContext);
};
const useSelectFormDispatch = () => useContext(FormDispatchContext);
const useSelectFormMeta = () => useContext(FormMetaContext);
const useSelectFieldStore = () => useContext(FormFieldStoreContext);
const useSelectFocus = () => {
  const [isFocused, setIsFocused] = useState(false);
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);
  return { isFocused, onFocus, onBlur };
};
export {
  useSelectFieldStore,
  useSelectFocus,
  useSelectFormContext,
  useSelectFormDispatch,
  useSelectFormMeta
};
//# sourceMappingURL=Select.hooks.js.map
