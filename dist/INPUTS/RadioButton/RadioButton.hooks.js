import { createContext, useContext } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
const RadioGroupContext = createContext(null);
const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error("RadioButton debe usarse dentro de un RadioGroup");
  }
  return context;
};
const useRadioFormContext = () => {
  return useContext(FormContext);
};
const useRadioFormDispatch = () => useContext(FormDispatchContext);
const useRadioFormMeta = () => useContext(FormMetaContext);
const useRadioFieldStore = () => useContext(FormFieldStoreContext);
export {
  RadioGroupContext,
  useRadioFieldStore,
  useRadioFormContext,
  useRadioFormDispatch,
  useRadioFormMeta,
  useRadioGroup
};
//# sourceMappingURL=RadioButton.hooks.js.map
