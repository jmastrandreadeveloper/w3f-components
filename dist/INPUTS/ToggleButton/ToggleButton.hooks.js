import { useContext, useCallback } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
import { computeNewValue } from "./ToggleButton.utils";
const useToggleGroupFormContext = () => {
  return useContext(FormContext);
};
const useToggleGroupFormDispatch = () => useContext(FormDispatchContext);
const useToggleGroupFormMeta = () => useContext(FormMetaContext);
const useToggleGroupFieldStore = () => useContext(FormFieldStoreContext);
const useToggleGroup = ({
  name,
  value,
  onChange,
  exclusive = false,
  disabled = false
}) => {
  const formContext = useToggleGroupFormContext();
  const isFormControlled = !!(formContext && name);
  const groupValue = isFormControlled ? formContext.values[name] ?? (exclusive ? null : []) : value;
  const groupError = isFormControlled ? formContext.errors[name] : void 0;
  const currentValue = exclusive ? groupValue : Array.isArray(groupValue) ? groupValue : [];
  const handleToggleChange = useCallback(
    (event, buttonValue) => {
      if (disabled) return;
      const newValue = computeNewValue(buttonValue, currentValue, exclusive ?? false);
      if (isFormControlled && formContext && name) {
        formContext.setFieldValue(name, newValue);
      }
      if (onChange) onChange(event, newValue);
    },
    [exclusive, currentValue, onChange, isFormControlled, disabled, name, formContext]
  );
  return {
    currentValue,
    groupError,
    handleToggleChange
  };
};
export {
  useToggleGroup,
  useToggleGroupFieldStore,
  useToggleGroupFormContext,
  useToggleGroupFormDispatch,
  useToggleGroupFormMeta
};
//# sourceMappingURL=ToggleButton.hooks.js.map
