"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useMemo } from "react";
import Button from "../../INPUTS/Button/Button";
import { NOTE_DEFAULTS } from "./Note.constants";
import { buildNoteClasses } from "./Note.utils";
import { useNoteDismiss } from "./Note.hooks";
import { useBridgeBind } from "@w3f/bridge";
const Note = forwardRef(({
  children,
  type = NOTE_DEFAULTS.type,
  round = NOTE_DEFAULTS.round,
  shadow = NOTE_DEFAULTS.shadow,
  border = NOTE_DEFAULTS.border,
  fullBorder = NOTE_DEFAULTS.fullBorder,
  className,
  dismissible,
  onDismiss,
  icon,
  unstyled = NOTE_DEFAULTS.unstyled,
  variant,
  bindId,
  ...rest
}, ref) => {
  const { dispatch } = useBridgeBind({ bindId });
  const { isVisible, handleDismiss } = useNoteDismiss(onDismiss);
  const classNames = useMemo(
    () => buildNoteClasses(type, round, shadow, border, fullBorder, className, unstyled, variant),
    [type, round, shadow, border, fullBorder, className, unstyled, variant]
  );
  if (!isVisible) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { ref, className: classNames, role: "alert", ...rest, children: /* @__PURE__ */ jsxs("div", { className: "w3f-note-content-container", children: [
    icon && /* @__PURE__ */ jsx("div", { className: "w3f-note-icon", children: icon }),
    /* @__PURE__ */ jsx("div", { className: "w3f-note-text-content", children }),
    dismissible && /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => {
          handleDismiss();
          dispatch("change", { action: "dismiss" });
        },
        variant: "icon",
        size: "sm",
        className: "w3f-note-dismiss",
        "aria-label": "Cerrar",
        children: "\u2715"
      }
    )
  ] }) });
});
Note.displayName = "Note";
var Note_default = Note;
export {
  Note,
  Note_default as default
};
//# sourceMappingURL=Note.js.map
