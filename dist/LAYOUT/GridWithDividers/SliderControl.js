"use client";
import { jsx, jsxs } from "react/jsx-runtime";
const SliderControl = ({
  label,
  configKey,
  config,
  onLimitChange,
  min,
  max,
  step = 10
}) => /* @__PURE__ */ jsxs("div", { style: { marginBottom: "12px", padding: "8px", border: "1px solid #e5e7eb", borderRadius: "4px" }, children: [
  /* @__PURE__ */ jsx("h4", { style: { fontWeight: "bold", fontSize: "14px", marginBottom: "8px", color: "#1f2937" }, children: label }),
  /* @__PURE__ */ jsxs("div", { style: { marginBottom: "8px" }, children: [
    /* @__PURE__ */ jsxs("label", { style: { fontSize: "12px", color: "#4b5563", display: "block" }, children: [
      "M\xEDnimo: ",
      config.minSize,
      "px"
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "range",
        min,
        max,
        step,
        value: config.minSize,
        onChange: (e) => onLimitChange(configKey, "minSize", e.target.value),
        style: { width: "100%" }
      }
    )
  ] }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("label", { style: { fontSize: "12px", color: "#4b5563", display: "block" }, children: [
      "M\xE1ximo: ",
      config.maxSize,
      "px"
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "range",
        min,
        max,
        step,
        value: config.maxSize,
        onChange: (e) => onLimitChange(configKey, "maxSize", e.target.value),
        style: { width: "100%" }
      }
    )
  ] })
] });
SliderControl.displayName = "SliderControl";
var SliderControl_default = SliderControl;
export {
  SliderControl,
  SliderControl_default as default
};
//# sourceMappingURL=SliderControl.js.map
