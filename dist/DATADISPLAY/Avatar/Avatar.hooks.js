import { useContext, useCallback } from "react";
import { FormContext, FormDispatchContext, FormFieldStoreContext } from "../../INPUTS/Form/Form";
function useAvatarForm(name) {
  const formContext = useContext(FormContext);
  const isFormControlled = !!(formContext && name);
  const formValue = isFormControlled ? formContext.values[name] : void 0;
  const setFormValue = useCallback(
    (value) => {
      if (isFormControlled && formContext && name) {
        formContext.setFieldValue(name, value);
      }
    },
    [isFormControlled, formContext, name]
  );
  return { isFormControlled, formValue, setFormValue };
}
const useAvatarFormDispatch = () => useContext(FormDispatchContext);
const useAvatarFieldStore = () => useContext(FormFieldStoreContext);
export {
  useAvatarFieldStore,
  useAvatarForm,
  useAvatarFormDispatch
};
//# sourceMappingURL=Avatar.hooks.js.map
