"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { memo, useRef } from "react";
import { TP_CLASSES } from "./TimePicker.constants";
import { useTimePicker, useTPDropdown, useScrollWheel } from "./TimePicker.hooks";
import { formatTimeDisplay } from "./TimePicker.utils";
const WheelColumn = memo(({ label, values, selected, onSelect, pad = 2 }) => {
  const scrollRef = useRef(null);
  const { onScroll } = useScrollWheel(scrollRef, values, selected, onSelect);
  return /* @__PURE__ */ jsxs("div", { className: TP_CLASSES.column, children: [
    /* @__PURE__ */ jsx("span", { className: TP_CLASSES.columnLabel, children: label }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: TP_CLASSES.stepBtn,
        onClick: () => {
          const idx = values.indexOf(selected);
          if (idx > 0) onSelect(values[idx - 1]);
        },
        children: "\u25B2"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: TP_CLASSES.scroll, ref: scrollRef, onScroll, children: [
      /* @__PURE__ */ jsx("div", { style: { height: 44, flexShrink: 0 } }),
      values.map((v) => /* @__PURE__ */ jsx(
        "button",
        {
          className: `${TP_CLASSES.item}${v === selected ? ` ${TP_CLASSES.itemSelected}` : ""}`,
          onClick: () => onSelect(v),
          tabIndex: 0,
          children: String(v).padStart(pad, "0")
        },
        v
      )),
      /* @__PURE__ */ jsx("div", { style: { height: 44, flexShrink: 0 } })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: TP_CLASSES.stepBtn,
        onClick: () => {
          const idx = values.indexOf(selected);
          if (idx < values.length - 1) onSelect(values[idx + 1]);
        },
        children: "\u25BC"
      }
    )
  ] });
});
WheelColumn.displayName = "WheelColumn";
const TimePickerPanel = memo(({
  state,
  format,
  showSeconds,
  showNow,
  onAccept,
  onClear,
  onClose
}) => {
  const {
    hours24,
    minutes,
    seconds,
    ampm,
    hours12,
    hourValues,
    minuteValues,
    secondValues,
    currentValue,
    setHour,
    setMinute,
    setSecond,
    toggleAmPm,
    setNow,
    clear
  } = state;
  const displayH = format === 12 ? hours12 : hours24;
  return /* @__PURE__ */ jsxs("div", { className: TP_CLASSES.panel, children: [
    /* @__PURE__ */ jsx("div", { className: TP_CLASSES.display, children: /* @__PURE__ */ jsx("span", { className: TP_CLASSES.displayTime, children: currentValue.display }) }),
    /* @__PURE__ */ jsxs("div", { className: TP_CLASSES.wheels, children: [
      /* @__PURE__ */ jsx(
        WheelColumn,
        {
          label: "Horas",
          values: hourValues,
          selected: displayH,
          onSelect: setHour
        }
      ),
      /* @__PURE__ */ jsx("span", { className: TP_CLASSES.separator, children: ":" }),
      /* @__PURE__ */ jsx(
        WheelColumn,
        {
          label: "Minutos",
          values: minuteValues,
          selected: minutes,
          onSelect: setMinute
        }
      ),
      showSeconds && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: TP_CLASSES.separator, children: ":" }),
        /* @__PURE__ */ jsx(
          WheelColumn,
          {
            label: "Segundos",
            values: secondValues,
            selected: seconds,
            onSelect: setSecond
          }
        )
      ] }),
      format === 12 && /* @__PURE__ */ jsxs("div", { className: TP_CLASSES.ampm, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `${TP_CLASSES.ampmBtn}${ampm === "AM" ? ` ${TP_CLASSES.ampmBtnActive}` : ""}`,
            onClick: () => ampm !== "AM" && toggleAmPm(),
            children: "AM"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `${TP_CLASSES.ampmBtn}${ampm === "PM" ? ` ${TP_CLASSES.ampmBtnActive}` : ""}`,
            onClick: () => ampm !== "PM" && toggleAmPm(),
            children: "PM"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: TP_CLASSES.actions, children: [
      showNow && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setNow();
          },
          style: { fontSize: 12, padding: "4px 10px", borderRadius: 6, border: "1px solid var(--w3f-outline-variant)", cursor: "pointer", background: "transparent" },
          children: "Ahora"
        }
      ),
      onClear && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            clear();
            onClear();
          },
          style: { fontSize: 12, padding: "4px 10px", borderRadius: 6, border: "1px solid var(--w3f-outline-variant)", cursor: "pointer", background: "transparent" },
          children: "Limpiar"
        }
      ),
      onAccept && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            onAccept();
            onClose?.();
          },
          style: { fontSize: 12, padding: "4px 12px", borderRadius: 6, border: "none", background: "var(--w3f-primary)", color: "#fff", cursor: "pointer", fontWeight: 600 },
          children: "Aceptar"
        }
      )
    ] })
  ] });
});
TimePickerPanel.displayName = "TimePickerPanel";
const TimePicker = ({
  defaultValue,
  format = 24,
  showSeconds = false,
  minuteStep = 1,
  secondStep = 1,
  placeholder = "Seleccionar hora\u2026",
  name,
  onChange,
  onAccept,
  inline = false,
  clearable = true,
  showNow = true,
  children,
  className
}) => {
  const { isOpen, toggle, close, rootRef } = useTPDropdown();
  const state = useTimePicker({
    defaultValue,
    format,
    showSeconds,
    minuteStep,
    secondStep,
    onChange
  });
  const displayStr = formatTimeDisplay(
    state.hours24,
    state.minutes,
    state.seconds,
    format,
    showSeconds
  );
  const panel = /* @__PURE__ */ jsx(
    TimePickerPanel,
    {
      state,
      format,
      showSeconds,
      showNow,
      onAccept: onAccept ? () => onAccept(state.currentValue) : void 0,
      onClear: clearable ? state.clear : void 0,
      onClose: close
    }
  );
  if (inline) {
    return /* @__PURE__ */ jsxs("div", { className: `${TP_CLASSES.inline}${className ? ` ${className}` : ""}`, children: [
      name && /* @__PURE__ */ jsx("input", { type: "hidden", name, value: state.currentValue.formatted24 }),
      panel,
      children
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: `${TP_CLASSES.root}${className ? ` ${className}` : ""}`, ref: rootRef, children: [
    name && /* @__PURE__ */ jsx("input", { type: "hidden", name, value: state.currentValue.formatted24 }),
    /* @__PURE__ */ jsxs("div", { className: TP_CLASSES.inputWrapper, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          readOnly: true,
          className: TP_CLASSES.input,
          value: displayStr,
          placeholder,
          onClick: toggle
        }
      ),
      /* @__PURE__ */ jsx("span", { className: TP_CLASSES.inputIcon, children: "\u{1F550}" })
    ] }),
    isOpen && /* @__PURE__ */ jsx("div", { className: TP_CLASSES.dropdown, children: panel }),
    children
  ] });
};
TimePicker.displayName = "TimePicker";
const StaticTimePicker = (props) => /* @__PURE__ */ jsx(TimePicker, { ...props, inline: true });
StaticTimePicker.displayName = "StaticTimePicker";
export {
  StaticTimePicker,
  TimePicker
};
//# sourceMappingURL=TimePicker.js.map
