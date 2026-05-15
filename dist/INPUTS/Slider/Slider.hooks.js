import { useContext } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
const useSliderFormContext = () => {
  return useContext(FormContext);
};
const useSliderFormDispatch = () => useContext(FormDispatchContext);
const useSliderFormMeta = () => useContext(FormMetaContext);
const useSliderFieldStore = () => useContext(FormFieldStoreContext);
export {
  useSliderFieldStore,
  useSliderFormContext,
  useSliderFormDispatch,
  useSliderFormMeta
};
//# sourceMappingURL=Slider.hooks.js.map
