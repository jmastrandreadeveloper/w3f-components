import { useContext } from "react";
import { FormContext, FormDispatchContext, FormMetaContext } from "../Form/Form";
function useButtonGroupFormContext() {
  return useContext(FormContext);
}
const useButtonGroupFormDispatch = () => useContext(FormDispatchContext);
const useButtonGroupFormMeta = () => useContext(FormMetaContext);
export {
  useButtonGroupFormContext,
  useButtonGroupFormDispatch,
  useButtonGroupFormMeta
};
//# sourceMappingURL=ButtonGroup.hooks.js.map
