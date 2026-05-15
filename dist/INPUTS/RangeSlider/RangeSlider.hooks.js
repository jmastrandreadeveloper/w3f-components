import { useContext } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
const useRangeSliderFormContext = () => {
  return useContext(FormContext);
};
const useRangeSliderFormDispatch = () => useContext(FormDispatchContext);
const useRangeSliderFormMeta = () => useContext(FormMetaContext);
const useRangeSliderFieldStore = () => useContext(FormFieldStoreContext);
export {
  useRangeSliderFieldStore,
  useRangeSliderFormContext,
  useRangeSliderFormDispatch,
  useRangeSliderFormMeta
};
//# sourceMappingURL=RangeSlider.hooks.js.map
