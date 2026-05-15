import { useContext } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
const useSlideToggleFormContext = () => {
  return useContext(FormContext);
};
const useSlideToggleFormDispatch = () => useContext(FormDispatchContext);
const useSlideToggleFormMeta = () => useContext(FormMetaContext);
const useSlideToggleFieldStore = () => useContext(FormFieldStoreContext);
export {
  useSlideToggleFieldStore,
  useSlideToggleFormContext,
  useSlideToggleFormDispatch,
  useSlideToggleFormMeta
};
//# sourceMappingURL=SlideToggle.hooks.js.map
