"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import Text from "../Text/Text";
import {
  HAND_BASE_STYLE,
  calculateAngles,
  getVisibleNumbers,
  buildHourNumberStyle,
  generateTics,
  buildRelojClasses
} from "./RelojAnalogico.utils";
import { RELOJ_DEFAULTS } from "./RelojAnalogico.constants";
import { useClock } from "./RelojAnalogico.hooks";
const RelojAnalogico = ({
  size = RELOJ_DEFAULTS.size,
  showTics = RELOJ_DEFAULTS.showTics,
  showAllNumbers = RELOJ_DEFAULTS.showAllNumbers,
  numbersToShow,
  showSeconds = RELOJ_DEFAULTS.showSeconds,
  className = RELOJ_DEFAULTS.className,
  unstyled = RELOJ_DEFAULTS.unstyled
}) => {
  const { hours, minutes, seconds } = useClock();
  const angles = useMemo(
    () => calculateAngles(hours, minutes, seconds),
    [hours, minutes, seconds]
  );
  const clockRadius = size / 2;
  const visibleNumbers = useMemo(
    () => getVisibleNumbers(showAllNumbers, numbersToShow),
    [showAllNumbers, numbersToShow]
  );
  const hourNumbers = useMemo(() => {
    return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((hour, index) => {
      if (!visibleNumbers.includes(hour)) return null;
      const numberStyle = buildHourNumberStyle(index, clockRadius);
      return /* @__PURE__ */ jsx(
        Text,
        {
          style: numberStyle,
          customClasses: `w3f-text-${showAllNumbers ? "xl" : "2xl"} w3f-font-display`,
          element: "div",
          content: hour
        },
        `hour-${hour}`
      );
    }).filter(Boolean);
  }, [clockRadius, visibleNumbers, showAllNumbers]);
  const ticElements = useMemo(() => {
    if (!showTics) return null;
    const minuteTics = generateTics(false, clockRadius);
    const hourTics = generateTics(true, clockRadius);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      minuteTics.map((style, i) => /* @__PURE__ */ jsx("div", { style }, `tic-m-${i}`)),
      hourTics.map((style, i) => /* @__PURE__ */ jsx("div", { style }, `tic-h-${i}`))
    ] });
  }, [showTics, clockRadius]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: buildRelojClasses(unstyled, className),
      style: { width: `${size}px`, height: `${size}px` },
      role: "img",
      "aria-label": `Reloj anal\xF3gico mostrando ${hours % 12 || 12}:${minutes.toString().padStart(2, "0")}`,
      children: [
        hourNumbers,
        ticElements,
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w3f-clock-analog-hand w3f-clock-hour-hand",
            style: {
              ...HAND_BASE_STYLE,
              transform: `translate(-50%, -100%) rotate(${angles.hour}deg)`,
              backgroundColor: "var(--w3f-clock-hour-hand-color)",
              height: `${size * 0.2}px`,
              width: `${size * 0.02}px`,
              zIndex: 10
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w3f-clock-analog-hand w3f-clock-minute-hand",
            style: {
              ...HAND_BASE_STYLE,
              transform: `translate(-50%, -100%) rotate(${angles.minute}deg)`,
              backgroundColor: "var(--w3f-clock-minute-hand-color)",
              height: `${size * 0.35}px`,
              width: `${size * 0.015}px`,
              zIndex: 20
            },
            "aria-hidden": "true"
          }
        ),
        showSeconds && /* @__PURE__ */ jsx(
          "div",
          {
            className: "w3f-clock-analog-hand w3f-clock-second-hand",
            style: {
              ...HAND_BASE_STYLE,
              transform: `translate(-50%, -100%) rotate(${angles.second}deg)`,
              backgroundColor: "var(--w3f-clock-second-hand-color)",
              height: `${size * 0.45}px`,
              width: `${size * 5e-3}px`,
              zIndex: 30
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w3f-clock-center-dot", "aria-hidden": "true" })
      ]
    }
  );
};
RelojAnalogico.displayName = "RelojAnalogico";
var RelojAnalogico_default = RelojAnalogico;
export {
  RelojAnalogico,
  RelojAnalogico_default as default
};
//# sourceMappingURL=RelojAnalogico.js.map
