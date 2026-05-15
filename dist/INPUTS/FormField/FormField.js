"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from "react";
import { FORM_FIELD_CLASSES, FORM_FIELD_DEFAULTS } from "./FormField.constants";
import { buildFormFieldClasses } from "./FormField.utils";
import { useFormFieldContext } from "./FormField.hooks";
import { useBridgeBind } from "@w3f/bridge";
const FormField = forwardRef(({
  label,
  name,
  error: propError,
  helperText,
  required = false,
  disabled = false,
  layout = "stacked",
  children,
  className = "",
  unstyled = FORM_FIELD_DEFAULTS.unstyled,
  bindId
}, ref) => {
  const formContext = useFormFieldContext();
  const labelId = useId();
  useBridgeBind({ bindId });
  const isFormControlled = !!(formContext && name);
  const fieldError = isFormControlled ? formContext.errors[name] : propError;
  const hasError = Boolean(fieldError);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: buildFormFieldClasses(layout, hasError, disabled, className, unstyled),
      role: "group",
      "aria-labelledby": label ? labelId : void 0,
      children: [
        label && /* @__PURE__ */ jsxs("label", { id: labelId, className: FORM_FIELD_CLASSES.label, children: [
          label,
          required && /* @__PURE__ */ jsxs("span", { className: FORM_FIELD_CLASSES.required, "aria-hidden": "true", children: [
            " ",
            "*"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: FORM_FIELD_CLASSES.content, children }),
        (fieldError || helperText) && /* @__PURE__ */ jsx("div", { children: fieldError ? /* @__PURE__ */ jsx(
          "p",
          {
            className: `${FORM_FIELD_CLASSES.message} ${FORM_FIELD_CLASSES.messageError}`,
            role: "alert",
            children: fieldError
          }
        ) : helperText ? /* @__PURE__ */ jsx(
          "p",
          {
            className: `${FORM_FIELD_CLASSES.message} ${FORM_FIELD_CLASSES.messageHelper}`,
            children: helperText
          }
        ) : null })
      ]
    }
  );
});
FormField.displayName = "FormField";
var FormField_default = FormField;
export {
  FormField,
  FormField_default as default
};
//# sourceMappingURL=FormField.js.map
