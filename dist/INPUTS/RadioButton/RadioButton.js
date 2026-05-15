"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useState, useEffect, useId } from "react";
import { RADIO_CLASSES, RADIO_GROUP_DEFAULTS } from "./RadioButton.constants";
import { buildRadioButtonClasses, buildRadioGroupContainerClasses } from "./RadioButton.utils";
import { RadioGroupContext, useRadioGroup, useRadioFormContext } from "./RadioButton.hooks";
import { useBridgeBind } from "@w3f/bridge";
const RadioButton = forwardRef(({
  label,
  value,
  disabled = false,
  className = "",
  unstyled = RADIO_GROUP_DEFAULTS.unstyled
}, ref) => {
  const { selectedValue, onChange, name, direction } = useRadioGroup();
  const radioId = useId();
  const isChecked = selectedValue === value;
  const handleChange = (e) => {
    if (!disabled) onChange(e.target.value);
  };
  return /* @__PURE__ */ jsxs(
    "label",
    {
      className: buildRadioButtonClasses(direction, disabled, className, unstyled),
      htmlFor: radioId,
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ref,
            id: radioId,
            type: "radio",
            name,
            value,
            checked: isChecked,
            onChange: handleChange,
            disabled
          }
        ),
        /* @__PURE__ */ jsx("span", { className: RADIO_CLASSES.checkmark }),
        /* @__PURE__ */ jsx("span", { className: disabled ? "w3f-text-gray-400" : "", children: label })
      ]
    }
  );
});
RadioButton.displayName = "RadioButton";
const RadioGroup = forwardRef(({
  children,
  name,
  value: controlledValue,
  defaultValue = RADIO_GROUP_DEFAULTS.defaultValue,
  onChange,
  direction = RADIO_GROUP_DEFAULTS.direction,
  label,
  showSelection = RADIO_GROUP_DEFAULTS.showSelection,
  className = RADIO_GROUP_DEFAULTS.className,
  error,
  required = RADIO_GROUP_DEFAULTS.required,
  onBlur,
  unstyled = RADIO_GROUP_DEFAULTS.unstyled,
  bindId,
  ...props
}, ref) => {
  const groupId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const formContext = useRadioFormContext();
  const { dispatch } = useBridgeBind({ bindId });
  const isFormControlled = !!(formContext && name);
  const selectedValue = isFormControlled ? formContext.values[name] ?? defaultValue : controlledValue !== void 0 ? controlledValue : internalValue;
  const fieldError = isFormControlled ? formContext.errors[name] : error;
  useEffect(() => {
    if (!isFormControlled && controlledValue !== void 0) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue, isFormControlled]);
  const handleChange = (newValue) => {
    if (isFormControlled && formContext && name) {
      const syntheticEvent = {
        target: { name, value: newValue, type: "radio" }
      };
      formContext.handleChange(syntheticEvent);
    } else if (controlledValue === void 0) {
      setInternalValue(newValue);
    }
    dispatch("change", { value: newValue });
    if (onChange) onChange(newValue);
  };
  const handleBlur = () => {
    if (isFormControlled && formContext && name) {
      const syntheticEvent = { target: { name } };
      formContext.handleBlur(syntheticEvent);
    }
    if (onBlur) onBlur();
  };
  const contextValue = {
    selectedValue,
    onChange: handleChange,
    name: name || groupId,
    direction
  };
  const hasError = Boolean(fieldError);
  return /* @__PURE__ */ jsxs("div", { ref, className, children: [
    /* @__PURE__ */ jsxs("fieldset", { className: RADIO_CLASSES.fieldset, children: [
      label && /* @__PURE__ */ jsxs("legend", { className: RADIO_CLASSES.legend, children: [
        label,
        required && /* @__PURE__ */ jsx("span", { className: RADIO_CLASSES.legendRequired, children: "*" })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: buildRadioGroupContainerClasses(direction, unstyled),
          role: "radiogroup",
          "aria-label": label,
          "aria-required": required,
          "aria-invalid": hasError,
          onBlur: handleBlur,
          children: /* @__PURE__ */ jsx(RadioGroupContext.Provider, { value: contextValue, children })
        }
      )
    ] }),
    fieldError && /* @__PURE__ */ jsx("div", { className: RADIO_CLASSES.error, role: "alert", children: fieldError }),
    showSelection && selectedValue && !fieldError && /* @__PURE__ */ jsx(
      "div",
      {
        className: RADIO_CLASSES.selectionPanel,
        role: "status",
        "aria-live": "polite",
        style: { backgroundColor: "var(--w3f-primary-600)" },
        children: /* @__PURE__ */ jsxs("p", { className: RADIO_CLASSES.selectionText, children: [
          "Opci\xF3n seleccionada: ",
          /* @__PURE__ */ jsx("strong", { children: selectedValue })
        ] })
      }
    )
  ] });
});
RadioGroup.displayName = "RadioGroup";
var RadioButton_default = RadioGroup;
export {
  RadioButton,
  RadioGroup,
  RadioButton_default as default
};
//# sourceMappingURL=RadioButton.js.map
