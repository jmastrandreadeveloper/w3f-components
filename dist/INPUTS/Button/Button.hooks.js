import { useContext } from "react";
import { FormContext, FormDispatchContext, FormMetaContext } from "../Form/Form";
function useButtonFormContext() {
  return useContext(FormContext);
}
const useButtonFormDispatch = () => useContext(FormDispatchContext);
const useButtonFormMeta = () => useContext(FormMetaContext);
export {
  useButtonFormContext,
  useButtonFormDispatch,
  useButtonFormMeta
};
//# sourceMappingURL=Button.hooks.js.map
