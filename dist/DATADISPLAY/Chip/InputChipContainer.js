"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useCallback } from "react";
import Chip from "./Chip";
import { useChipManager, useChipNavigation } from "./Chip.hooks";
const InputChipContainer = () => {
  const inputRef = useRef(null);
  const chipRefs = useRef([]);
  const containerRef = useRef(null);
  const { chips, inputValue, setInputValue, addChip, removeChip } = useChipManager();
  const handleAddChip = useCallback(() => {
    if (addChip(inputValue)) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [inputValue, addChip]);
  const handleRemoveChip = useCallback((id) => {
    removeChip(id);
  }, [removeChip]);
  const { focusedChipIndex, setFocusedChipIndex, handleContainerKeyDown } = useChipNavigation(
    chips,
    inputValue,
    inputRef,
    chipRefs,
    handleAddChip,
    handleRemoveChip
  );
  useEffect(() => {
    if (focusedChipIndex !== null && chipRefs.current[focusedChipIndex]) {
      chipRefs.current[focusedChipIndex].focus();
    }
  }, [focusedChipIndex]);
  useEffect(() => {
    chipRefs.current = chipRefs.current.slice(0, chips.length);
  }, [chips.length]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: "w3f-chip-input-container",
      onKeyDown: handleContainerKeyDown,
      role: "group",
      "aria-label": "Editor de etiquetas con navegaci\xF3n por teclado",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "w3f-chip-wrapper", children: [
          chips.map((chip, index) => /* @__PURE__ */ jsx(
            Chip,
            {
              ref: (el) => {
                chipRefs.current[index] = el;
              },
              label: chip.label,
              onClose: () => handleRemoveChip(chip.id),
              isFocused: index === focusedChipIndex,
              onFocus: () => setFocusedChipIndex(index),
              onClick: () => setFocusedChipIndex(index)
            },
            chip.id
          )),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              className: "w3f-chip-input-field",
              type: "text",
              placeholder: chips.length > 0 ? "" : "Escriba una etiqueta y presione Enter...",
              value: inputValue,
              onChange: (e) => setInputValue(e.target.value),
              onFocus: () => setFocusedChipIndex(null),
              "aria-label": "A\xF1adir nueva etiqueta",
              "aria-describedby": "chip-help"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { id: "chip-help", className: "w3f-chip-help", children: /* @__PURE__ */ jsxs("p", { style: { margin: 0 }, children: [
          /* @__PURE__ */ jsx("strong", { children: "Navegaci\xF3n:" }),
          " \u2190 \u2192 mover entre chips, ",
          /* @__PURE__ */ jsx("strong", { children: "Enter" }),
          " agregar, ",
          /* @__PURE__ */ jsx("strong", { children: "Backspace/Supr" }),
          " eliminar, ",
          /* @__PURE__ */ jsx("strong", { children: "Esc" }),
          " volver al input"
        ] }) })
      ]
    }
  );
};
InputChipContainer.displayName = "InputChipContainer";
var InputChipContainer_default = InputChipContainer;
export {
  InputChipContainer,
  InputChipContainer_default as default
};
//# sourceMappingURL=InputChipContainer.js.map
