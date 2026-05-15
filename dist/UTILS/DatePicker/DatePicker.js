"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { memo, useRef, useState, useEffect } from "react";
import { DP_CLASSES, DP_WEEKDAYS_SHORT, DP_MONTHS_SHORT } from "./DatePicker.constants";
import {
  useMonthNavigation,
  useDropdown,
  useSingleDate,
  useDateRange,
  useMultipleDatePicker
} from "./DatePicker.hooks";
import {
  formatMonthTitle,
  toDateValue,
  isSameDay,
  isDateDisabled,
  buildRangeValue
} from "./DatePicker.utils";
const MonthYearPicker = ({ year, month, onSelect }) => {
  const [selectedYear, setSelectedYear] = useState(year);
  const selectedYearRef = useRef(null);
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const years = Array.from({ length: 151 }, (_, i) => currentYear - 100 + i);
  useEffect(() => {
    selectedYearRef.current?.scrollIntoView({ block: "center", behavior: "auto" });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: DP_CLASSES.ymPicker, children: [
    /* @__PURE__ */ jsx("div", { className: DP_CLASSES.yearList, children: years.map((y) => /* @__PURE__ */ jsx(
      "button",
      {
        ref: y === selectedYear ? selectedYearRef : void 0,
        className: [DP_CLASSES.yearItem, y === selectedYear ? DP_CLASSES.yearItemSelected : ""].filter(Boolean).join(" "),
        onClick: () => setSelectedYear(y),
        children: y
      },
      y
    )) }),
    /* @__PURE__ */ jsx("div", { className: DP_CLASSES.monthGrid, children: DP_MONTHS_SHORT.map((m, i) => /* @__PURE__ */ jsx(
      "button",
      {
        className: [DP_CLASSES.monthItem, i === month && selectedYear === year ? DP_CLASSES.monthItemSelected : ""].filter(Boolean).join(" "),
        onClick: () => onSelect(selectedYear, i),
        children: m
      },
      m
    )) })
  ] });
};
MonthYearPicker.displayName = "MonthYearPicker";
const Calendar = memo(({
  year,
  month,
  days,
  selectedDate,
  startDate,
  endDate,
  onDayClick,
  disabledDates,
  minDate,
  maxDate,
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  setMonth
}) => {
  const [mode, setMode] = useState("days");
  return /* @__PURE__ */ jsxs("div", { className: DP_CLASSES.calendar, children: [
    /* @__PURE__ */ jsxs("div", { className: DP_CLASSES.header, children: [
      /* @__PURE__ */ jsx("button", { className: DP_CLASSES.navBtn, onClick: onPrev, disabled: prevDisabled || mode === "month-year", children: "\u2039" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: DP_CLASSES.title,
          onClick: () => setMode((m) => m === "days" ? "month-year" : "days"),
          children: [
            formatMonthTitle(year, month),
            /* @__PURE__ */ jsx("span", { className: DP_CLASSES.titleCaret, children: mode === "month-year" ? "\u25B2" : "\u25BC" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("button", { className: DP_CLASSES.navBtn, onClick: onNext, disabled: nextDisabled || mode === "month-year", children: "\u203A" })
    ] }),
    mode === "month-year" ? /* @__PURE__ */ jsx(
      MonthYearPicker,
      {
        year,
        month,
        onSelect: (y, m) => {
          setMonth({ year: y, month: m });
          setMode("days");
        }
      }
    ) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: DP_CLASSES.weekdays, children: DP_WEEKDAYS_SHORT.map((d, i) => /* @__PURE__ */ jsx("div", { className: `${DP_CLASSES.weekday}${i === 0 ? ` ${DP_CLASSES.weekdaySun}` : ""}`, children: d }, d)) }),
      /* @__PURE__ */ jsx("div", { className: DP_CLASSES.days, children: days.map((cell, idx) => {
        const isSel = selectedDate ? isSameDay(cell.date, selectedDate) : false;
        const isStart = startDate ? isSameDay(cell.date, startDate) : false;
        const isEnd = endDate ? isSameDay(cell.date, endDate) : false;
        const isRange = startDate && endDate ? cell.date > startDate && cell.date < endDate : false;
        const disabled = isDateDisabled(cell.date, disabledDates, minDate, maxDate);
        const cls = [
          DP_CLASSES.day,
          cell.isToday ? DP_CLASSES.dayToday : "",
          isSel ? DP_CLASSES.daySelected : "",
          cell.isSunday ? DP_CLASSES.daySunday : "",
          !cell.isCurrentMonth ? DP_CLASSES.dayOtherMonth : "",
          disabled ? DP_CLASSES.dayDisabled : "",
          isRange ? DP_CLASSES.dayInRange : "",
          isStart && isEnd ? DP_CLASSES.dayRangeSingle : "",
          isStart && !isEnd ? DP_CLASSES.dayRangeStart : "",
          !isStart && isEnd ? DP_CLASSES.dayRangeEnd : ""
        ].filter(Boolean).join(" ");
        return /* @__PURE__ */ jsx(
          "button",
          {
            className: cls,
            onClick: () => !disabled && onDayClick(cell.date),
            disabled,
            tabIndex: cell.isCurrentMonth ? 0 : -1,
            "aria-label": cell.date.toDateString(),
            "aria-selected": isSel || isStart || isEnd,
            children: cell.dayNum
          },
          idx
        );
      }) })
    ] })
  ] });
});
Calendar.displayName = "Calendar";
const DatePicker = ({
  defaultValue,
  onChange,
  inline = false,
  clearable = true,
  placeholder = "Seleccionar fecha\u2026",
  disabledDates,
  minDate,
  maxDate,
  initialMonth,
  name
}) => {
  const { isOpen, toggle, close, rootRef } = useDropdown();
  const { current, days, goPrev, goNext, setMonth } = useMonthNavigation(initialMonth);
  const { selected, select, clear } = useSingleDate(defaultValue, onChange, disabledDates, minDate, maxDate);
  const displayValue = selected ? toDateValue(selected).display : "";
  const calendar = /* @__PURE__ */ jsx(
    Calendar,
    {
      year: current.year,
      month: current.month,
      days,
      selectedDate: selected,
      onDayClick: (d) => {
        select(d);
        if (!inline) close();
      },
      disabledDates,
      minDate,
      maxDate,
      onPrev: goPrev,
      onNext: goNext,
      setMonth
    }
  );
  if (inline) {
    return /* @__PURE__ */ jsxs("div", { className: DP_CLASSES.root, children: [
      name && /* @__PURE__ */ jsx("input", { type: "hidden", name, value: selected ? toDateValue(selected).formatted : "" }),
      calendar,
      clearable && selected && /* @__PURE__ */ jsx("div", { className: DP_CLASSES.actions, children: /* @__PURE__ */ jsx("button", { onClick: clear, style: { fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid var(--w3f-outline-variant)", cursor: "pointer", background: "transparent" }, children: "Limpiar" }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: DP_CLASSES.root, ref: rootRef, children: [
    name && /* @__PURE__ */ jsx("input", { type: "hidden", name, value: selected ? toDateValue(selected).formatted : "" }),
    /* @__PURE__ */ jsxs("div", { className: DP_CLASSES.inputWrapper, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          readOnly: true,
          className: DP_CLASSES.input,
          value: displayValue,
          placeholder,
          onClick: toggle
        }
      ),
      /* @__PURE__ */ jsx("span", { className: DP_CLASSES.inputIcon, children: "\u{1F4C5}" })
    ] }),
    isOpen && /* @__PURE__ */ jsx("div", { className: DP_CLASSES.dropdown, children: calendar })
  ] });
};
DatePicker.displayName = "DatePicker";
const StaticDatePicker = (props) => /* @__PURE__ */ jsx(DatePicker, { ...props, inline: true });
StaticDatePicker.displayName = "StaticDatePicker";
const DateRangePicker = ({
  defaultValue,
  onChange,
  placeholder = "Seleccionar rango\u2026",
  disabledDates,
  minDate,
  maxDate,
  initialMonth,
  name,
  dual = false,
  discontinuous = false
}) => {
  const { isOpen, toggle, rootRef } = useDropdown();
  const leftNav = useMonthNavigation(initialMonth);
  const rightNav = useMonthNavigation(
    initialMonth instanceof Date ? new Date(initialMonth.getFullYear(), initialMonth.getMonth() + 1, 1) : void 0
  );
  const {
    startDate,
    endDate,
    selectDate,
    clear,
    isDayInRange,
    isDayStart,
    isDayEnd
  } = useDateRange(defaultValue, onChange, disabledDates, minDate, maxDate);
  const displayValue = startDate ? buildRangeValue(startDate, endDate).formattedRange || toDateValue(startDate).display : "";
  const calendarBase = (nav, prevDis = false, nextDis = false) => /* @__PURE__ */ jsx(
    Calendar,
    {
      year: nav.current.year,
      month: nav.current.month,
      days: nav.days,
      startDate,
      endDate,
      onDayClick: selectDate,
      disabledDates,
      minDate,
      maxDate,
      onPrev: nav.goPrev,
      onNext: nav.goNext,
      prevDisabled: prevDis,
      nextDisabled: nextDis,
      setMonth: nav.setMonth
    }
  );
  const singleCalendar = calendarBase(leftNav);
  const dualCalendar = /* @__PURE__ */ jsxs("div", { className: DP_CLASSES.dual, children: [
    calendarBase(
      leftNav,
      false,
      !discontinuous ? leftNav.current.month === rightNav.current.month - 1 && leftNav.current.year === rightNav.current.year : false
    ),
    /* @__PURE__ */ jsx("div", { className: DP_CLASSES.dualDivider }),
    calendarBase(
      rightNav,
      !discontinuous ? rightNav.current.month === leftNav.current.month + 1 && rightNav.current.year === leftNav.current.year : false,
      false
    )
  ] });
  const content = dual ? dualCalendar : singleCalendar;
  return /* @__PURE__ */ jsxs("div", { className: DP_CLASSES.root, ref: rootRef, children: [
    name && /* @__PURE__ */ jsx("input", { type: "hidden", name, value: displayValue }),
    /* @__PURE__ */ jsxs("div", { className: DP_CLASSES.inputWrapper, children: [
      /* @__PURE__ */ jsx("input", { readOnly: true, className: DP_CLASSES.input, value: displayValue, placeholder, onClick: toggle }),
      /* @__PURE__ */ jsx("span", { className: DP_CLASSES.inputIcon, children: "\u{1F4C5}" })
    ] }),
    isOpen && /* @__PURE__ */ jsxs("div", { className: DP_CLASSES.dropdown, children: [
      content,
      /* @__PURE__ */ jsx("div", { className: DP_CLASSES.actions, children: /* @__PURE__ */ jsx("button", { onClick: clear, style: { fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid var(--w3f-outline-variant)", cursor: "pointer", background: "transparent" }, children: "Limpiar" }) })
    ] })
  ] });
};
DateRangePicker.displayName = "DateRangePicker";
const DateRangePickerDual = (props) => /* @__PURE__ */ jsx(DateRangePicker, { ...props, dual: true });
DateRangePickerDual.displayName = "DateRangePickerDual";
const MultipleDatePicker = ({
  onChange,
  onAccept,
  maxPickers = 10,
  acceptLabel = "Aceptar",
  disabledDates,
  minDate,
  maxDate,
  children,
  name
}) => {
  const { pickers, addPicker, removePicker, updateValue, accept } = useMultipleDatePicker(onChange, onAccept);
  return /* @__PURE__ */ jsxs("div", { className: DP_CLASSES.multiple, children: [
    name && /* @__PURE__ */ jsx(
      "input",
      {
        type: "hidden",
        name,
        value: JSON.stringify(pickers.map((p) => p.value?.formatted ?? ""))
      }
    ),
    /* @__PURE__ */ jsx("div", { className: DP_CLASSES.multipleList, children: pickers.map((p, idx) => /* @__PURE__ */ jsxs("div", { className: DP_CLASSES.multipleItem, children: [
      /* @__PURE__ */ jsxs("div", { className: DP_CLASSES.multipleItemLabel, children: [
        "Fecha ",
        idx + 1
      ] }),
      pickers.length > 1 && /* @__PURE__ */ jsx(
        "button",
        {
          className: DP_CLASSES.multipleItemRemove,
          onClick: () => removePicker(p.id),
          "aria-label": "Eliminar",
          children: "\u2715"
        }
      ),
      /* @__PURE__ */ jsx(
        StaticDatePicker,
        {
          defaultValue: p.value?.date ?? null,
          initialMonth: p.initialMonth,
          disabledDates,
          minDate,
          maxDate,
          onChange: (v) => updateValue(p.id, v)
        }
      )
    ] }, p.id)) }),
    children,
    /* @__PURE__ */ jsxs("div", { className: DP_CLASSES.actions, children: [
      pickers.length < maxPickers && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: addPicker,
          style: { fontSize: 13, padding: "6px 14px", borderRadius: 8, border: "1px dashed var(--w3f-primary)", color: "var(--w3f-primary)", cursor: "pointer", background: "transparent", fontWeight: 600 },
          children: "+ Agregar fecha"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: accept,
          style: { fontSize: 13, padding: "6px 14px", borderRadius: 8, border: "none", background: "var(--w3f-primary)", color: "#fff", cursor: "pointer", fontWeight: 600 },
          children: acceptLabel
        }
      )
    ] })
  ] });
};
MultipleDatePicker.displayName = "MultipleDatePicker";
export {
  DatePicker,
  DateRangePicker,
  DateRangePickerDual,
  MultipleDatePicker,
  StaticDatePicker
};
//# sourceMappingURL=DatePicker.js.map
