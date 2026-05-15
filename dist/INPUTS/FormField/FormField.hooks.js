import { useContext } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
const useFormFieldContext = () => {
  return useContext(FormContext);
};
const useFormFieldDispatch = () => useContext(FormDispatchContext);
const useFormFieldMeta = () => useContext(FormMetaContext);
const useFormFieldFieldStore = () => useContext(FormFieldStoreContext);
export {
  useFormFieldContext,
  useFormFieldDispatch,
  useFormFieldFieldStore,
  useFormFieldMeta
};
//# sourceMappingURL=FormField.hooks.js.map
