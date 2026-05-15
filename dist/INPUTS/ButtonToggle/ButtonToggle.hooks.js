import { useState, useContext } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
function useButtonToggle({
  name,
  multiple,
  defaultValue,
  value: controlledValue
}) {
  const formContext = useContext(FormContext);
  const isFormControlled = !!(formContext && name);
  const [internalValue, setInternalValue] = useState(() => {
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
const useButtonToggleFormDispatch = () => useContext(FormDispatchContext);
const useButtonToggleFormMeta = () => useContext(FormMetaContext);
const useButtonToggleFieldStore = () => useContext(FormFieldStoreContext);
export {
  useButtonToggle,
  useButtonToggleFieldStore,
  useButtonToggleFormDispatch,
  useButtonToggleFormMeta
};
//# sourceMappingURL=ButtonToggle.hooks.js.map
