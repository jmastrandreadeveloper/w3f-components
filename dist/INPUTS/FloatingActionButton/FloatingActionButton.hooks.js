import { useContext } from "react";
import { FormContext, FormDispatchContext, FormMetaContext } from "../Form/Form";
function useFabFormContext() {
  return useContext(FormContext);
}
const useFabFormDispatch = () => useContext(FormDispatchContext);
const useFabFormMeta = () => useContext(FormMetaContext);
export {
  useFabFormContext,
  useFabFormDispatch,
  useFabFormMeta
};
//# sourceMappingURL=FloatingActionButton.hooks.js.map
