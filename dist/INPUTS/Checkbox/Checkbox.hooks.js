import { useState, useEffect, useContext, useId } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
function useCheckbox({ name, checked: initialChecked }) {
  const formContext = useContext(FormContext);
  const isFormControlled = !!(formContext && name);
  const uniqueId = useId();
  const [isChecked, setIsChecked] = useState(initialChecked ?? false);
  const checkboxValue = isFormControlled ? Boolean(formContext.values[name]) : isChecked;
  useEffect(() => {
    if (!isFormControlled) {
      setIsChecked(initialChecked ?? false);
    }
  }, [initialChecked, isFormControlled]);
  return {
    formContext,
    isFormControlled,
    checkboxValue,
    setIsChecked,
    uniqueId
  };
}
const useCheckboxFormDispatch = () => useContext(FormDispatchContext);
const useCheckboxFormMeta = () => useContext(FormMetaContext);
const useCheckboxFieldStore = () => useContext(FormFieldStoreContext);
export {
  useCheckbox,
  useCheckboxFieldStore,
  useCheckboxFormDispatch,
  useCheckboxFormMeta
};
//# sourceMappingURL=Checkbox.hooks.js.map
