"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { CHART_LEGEND_CLASSES, CHART_LEGEND_DEFAULTS } from "./ChartLegend.constants";
import { buildLegendClasses, buildItemClasses, getSwatchStyle } from "./ChartLegend.utils";
const ChartLegend = (props) => {
  const {
    items,
    swatchShape = CHART_LEGEND_DEFAULTS.swatchShape,
    direction = CHART_LEGEND_DEFAULTS.direction,
    onToggle,
    className
  } = props;
  const rootClass = buildLegendClasses(direction, className);
  const clickable = !!onToggle;
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: rootClass, role: "list", "aria-label": "Chart legend", children: items.map((item, i) => /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: buildItemClasses(item.disabled, clickable),
      onClick: clickable ? () => onToggle(item, i) : void 0,
      disabled: !clickable,
      role: "listitem",
      "aria-label": `${item.label}${item.disabled ? " (hidden)" : ""}`,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: CHART_LEGEND_CLASSES.swatch,
            style: getSwatchStyle(item.color, swatchShape, item.disabled),
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsx("span", { className: CHART_LEGEND_CLASSES.label, children: item.label })
      ]
    },
    item.id
  )) });
};
ChartLegend.displayName = "ChartLegend";
var ChartLegend_default = ChartLegend;
export {
  ChartLegend,
  ChartLegend_default as default
};
//# sourceMappingURL=ChartLegend.js.map
