import React, { memo, useRef, useState, useEffect } from 'react';
import type {
  DatePickerProps, DateRangePickerProps, MultipleDatePickerProps,
  DayCell, CalendarMonth,
} from './DatePicker.types';
import { DP_CLASSES, DP_WEEKDAYS_SHORT, DP_MONTHS_SHORT } from './DatePicker.constants';
import {
  useMonthNavigation, useDropdown,
  useSingleDate, useDateRange, useMultipleDatePicker,
} from './DatePicker.hooks';
import {
  formatMonthTitle, toDateValue, isSameDay,
  isDateDisabled, buildRangeValue,
} from './DatePicker.utils';

// ── Shared Calendar Grid ──────────────────────────────────────
interface CalendarProps {
  year: number;
  month: number;
  days: DayCell[];
  selectedDate?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  onDayClick: (date: Date) => void;
  disabledDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  setMonth: (cal: CalendarMonth) => void;
}

// ── MonthYearPicker ───────────────────────────────────────────
interface MonthYearPickerProps {
  year: number;
  month: number;
  onSelect: (year: number, month: number) => void;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ year, month, onSelect }) => {
  const [selectedYear, setSelectedYear] = useState(year);
  const selectedYearRef = useRef<HTMLButtonElement>(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 151 }, (_, i) => currentYear - 100 + i);

  useEffect(() => {
    selectedYearRef.current?.scrollIntoView({ block: 'center', behavior: 'auto' });
  }, []);

  return (
    <div className={DP_CLASSES.ymPicker}>
      <div className={DP_CLASSES.yearList}>
        {years.map(y => (
          <button
            key={y}
            ref={y === selectedYear ? selectedYearRef : undefined}
            className={[DP_CLASSES.yearItem, y === selectedYear ? DP_CLASSES.yearItemSelected : ''].filter(Boolean).join(' ')}
            onClick={() => setSelectedYear(y)}
          >
            {y}
          </button>
        ))}
      </div>
      <div className={DP_CLASSES.monthGrid}>
        {DP_MONTHS_SHORT.map((m, i) => (
          <button
            key={m}
            className={[DP_CLASSES.monthItem, i === month && selectedYear === year ? DP_CLASSES.monthItemSelected : ''].filter(Boolean).join(' ')}
            onClick={() => onSelect(selectedYear, i)}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
};
MonthYearPicker.displayName = 'MonthYearPicker';

// ── Calendar ──────────────────────────────────────────────────
const Calendar = memo(({
  year, month, days, selectedDate, startDate, endDate,
  onDayClick, disabledDates, minDate, maxDate,
  onPrev, onNext, prevDisabled = false, nextDisabled = false,
  setMonth,
}: CalendarProps) => {
  const [mode, setMode] = useState<'days' | 'month-year'>('days');

  return (
    <div className={DP_CLASSES.calendar}>
      {/* Header */}
      <div className={DP_CLASSES.header}>
        <button className={DP_CLASSES.navBtn} onClick={onPrev} disabled={prevDisabled || mode === 'month-year'}>‹</button>
        <button
          className={DP_CLASSES.title}
          onClick={() => setMode(m => m === 'days' ? 'month-year' : 'days')}
        >
          {formatMonthTitle(year, month)}
          <span className={DP_CLASSES.titleCaret}>{mode === 'month-year' ? '▲' : '▼'}</span>
        </button>
        <button className={DP_CLASSES.navBtn} onClick={onNext} disabled={nextDisabled || mode === 'month-year'}>›</button>
      </div>

      {mode === 'month-year' ? (
        <MonthYearPicker
          year={year} month={month}
          onSelect={(y, m) => { setMonth({ year: y, month: m }); setMode('days'); }}
        />
      ) : (
        <>
          {/* Weekdays */}
          <div className={DP_CLASSES.weekdays}>
            {DP_WEEKDAYS_SHORT.map((d, i) => (
              <div key={d} className={`${DP_CLASSES.weekday}${i === 0 ? ` ${DP_CLASSES.weekdaySun}` : ''}`}>
                {d}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className={DP_CLASSES.days}>
            {days.map((cell, idx) => {
              const isSel   = selectedDate ? isSameDay(cell.date, selectedDate) : false;
              const isStart = startDate ? isSameDay(cell.date, startDate) : false;
              const isEnd   = endDate   ? isSameDay(cell.date, endDate)   : false;
              const isRange = startDate && endDate
                ? cell.date > startDate && cell.date < endDate
                : false;
              const disabled = isDateDisabled(cell.date, disabledDates, minDate, maxDate);

              const cls = [
                DP_CLASSES.day,
                cell.isToday       ? DP_CLASSES.dayToday      : '',
                isSel              ? DP_CLASSES.daySelected    : '',
                cell.isSunday      ? DP_CLASSES.daySunday      : '',
                !cell.isCurrentMonth ? DP_CLASSES.dayOtherMonth : '',
                disabled           ? DP_CLASSES.dayDisabled    : '',
                isRange            ? DP_CLASSES.dayInRange     : '',
                isStart && isEnd   ? DP_CLASSES.dayRangeSingle : '',
                isStart && !isEnd  ? DP_CLASSES.dayRangeStart  : '',
                !isStart && isEnd  ? DP_CLASSES.dayRangeEnd    : '',
              ].filter(Boolean).join(' ');

              return (
                <button key={idx} className={cls}
                  onClick={() => !disabled && onDayClick(cell.date)}
                  disabled={disabled}
                  tabIndex={cell.isCurrentMonth ? 0 : -1}
                  aria-label={cell.date.toDateString()}
                  aria-selected={isSel || isStart || isEnd}>
                  {cell.dayNum}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
});
Calendar.displayName = 'Calendar';

// ─────────────────────────────────────────────────────────────
// 1. DatePicker — single date, dropdown or inline
// ─────────────────────────────────────────────────────────────
export const DatePicker: React.FC<DatePickerProps> = ({
  defaultValue, onChange, inline = false, clearable = true,
  placeholder = 'Seleccionar fecha…', disabledDates, minDate, maxDate,
  initialMonth, name,
}) => {
  const { isOpen, toggle, close, rootRef } = useDropdown();
  const { current, days, goPrev, goNext, setMonth } = useMonthNavigation(initialMonth);
  const { selected, select, clear } = useSingleDate(defaultValue, onChange, disabledDates, minDate, maxDate);

  const displayValue = selected
    ? toDateValue(selected).display
    : '';

  const calendar = (
    <Calendar
      year={current.year} month={current.month} days={days}
      selectedDate={selected}
      onDayClick={d => { select(d); if (!inline) close(); }}
      disabledDates={disabledDates} minDate={minDate} maxDate={maxDate}
      onPrev={goPrev} onNext={goNext}
      setMonth={setMonth}
    />
  );

  if (inline) {
    return (
      <div className={DP_CLASSES.root}>
        {name && <input type="hidden" name={name} value={selected ? toDateValue(selected).formatted : ''} />}
        {calendar}
        {clearable && selected && (
          <div className={DP_CLASSES.actions}>
            <button onClick={clear} style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--w3f-outline-variant)', cursor: 'pointer', background: 'transparent' }}>
              Limpiar
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={DP_CLASSES.root} ref={rootRef}>
      {name && <input type="hidden" name={name} value={selected ? toDateValue(selected).formatted : ''} />}
      <div className={DP_CLASSES.inputWrapper}>
        <input
          readOnly
          className={DP_CLASSES.input}
          value={displayValue}
          placeholder={placeholder}
          onClick={toggle}
        />
        <span className={DP_CLASSES.inputIcon}>📅</span>
      </div>
      {isOpen && (
        <div className={DP_CLASSES.dropdown}>{calendar}</div>
      )}
    </div>
  );
};
DatePicker.displayName = 'DatePicker';

// ─────────────────────────────────────────────────────────────
// 2. StaticDatePicker — always visible
// ─────────────────────────────────────────────────────────────
export const StaticDatePicker: React.FC<DatePickerProps> = (props) => (
  <DatePicker {...props} inline />
);
StaticDatePicker.displayName = 'StaticDatePicker';

// ─────────────────────────────────────────────────────────────
// 3. DateRangePicker — range in one calendar
// ─────────────────────────────────────────────────────────────
export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  defaultValue, onChange, placeholder = 'Seleccionar rango…',
  disabledDates, minDate, maxDate, initialMonth, name, dual = false, discontinuous = false,
}) => {
  const { isOpen, toggle, rootRef } = useDropdown();
  const leftNav  = useMonthNavigation(initialMonth);
  const rightNav = useMonthNavigation(
    initialMonth instanceof Date
      ? new Date(initialMonth.getFullYear(), initialMonth.getMonth() + 1, 1)
      : undefined
  );
  const {
    startDate, endDate, selectDate, clear,
    isDayInRange, isDayStart, isDayEnd,
  } = useDateRange(defaultValue, onChange, disabledDates, minDate, maxDate);

  const displayValue = startDate
    ? buildRangeValue(startDate, endDate).formattedRange || toDateValue(startDate).display
    : '';

  const calendarBase = (nav: typeof leftNav, prevDis = false, nextDis = false) => (
    <Calendar
      year={nav.current.year} month={nav.current.month} days={nav.days}
      startDate={startDate} endDate={endDate}
      onDayClick={selectDate}
      disabledDates={disabledDates} minDate={minDate} maxDate={maxDate}
      onPrev={nav.goPrev} onNext={nav.goNext}
      prevDisabled={prevDis} nextDisabled={nextDis}
      setMonth={nav.setMonth}
    />
  );

  const singleCalendar = calendarBase(leftNav);

  const dualCalendar = (
    <div className={DP_CLASSES.dual}>
      {calendarBase(
        leftNav,
        false,
        !discontinuous
          ? leftNav.current.month === rightNav.current.month - 1 &&
            leftNav.current.year === rightNav.current.year
          : false,
      )}
      <div className={DP_CLASSES.dualDivider} />
      {calendarBase(
        rightNav,
        !discontinuous
          ? rightNav.current.month === leftNav.current.month + 1 &&
            rightNav.current.year === leftNav.current.year
          : false,
        false,
      )}
    </div>
  );

  const content = dual ? dualCalendar : singleCalendar;

  return (
    <div className={DP_CLASSES.root} ref={rootRef}>
      {name && <input type="hidden" name={name} value={displayValue} />}
      <div className={DP_CLASSES.inputWrapper}>
        <input readOnly className={DP_CLASSES.input} value={displayValue} placeholder={placeholder} onClick={toggle} />
        <span className={DP_CLASSES.inputIcon}>📅</span>
      </div>
      {isOpen && (
        <div className={DP_CLASSES.dropdown}>
          {content}
          <div className={DP_CLASSES.actions}>
            <button onClick={clear} style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--w3f-outline-variant)', cursor: 'pointer', background: 'transparent' }}>
              Limpiar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
DateRangePicker.displayName = 'DateRangePicker';

// ─────────────────────────────────────────────────────────────
// 4. DateRangePickerDual — always dual (convenience wrapper)
// ─────────────────────────────────────────────────────────────
export const DateRangePickerDual: React.FC<DateRangePickerProps> = (props) => (
  <DateRangePicker {...props} dual />
);
DateRangePickerDual.displayName = 'DateRangePickerDual';

// ─────────────────────────────────────────────────────────────
// 5. MultipleDatePicker — multiple independent date pickers
// ─────────────────────────────────────────────────────────────
export const MultipleDatePicker: React.FC<MultipleDatePickerProps> = ({
  onChange, onAccept, maxPickers = 10,
  acceptLabel = 'Aceptar', disabledDates, minDate, maxDate, children, name,
}) => {
  const { pickers, addPicker, removePicker, updateValue, accept } =
    useMultipleDatePicker(onChange, onAccept);

  return (
    <div className={DP_CLASSES.multiple}>
      {/* Hidden input for form integration */}
      {name && (
        <input type="hidden" name={name}
          value={JSON.stringify(pickers.map(p => p.value?.formatted ?? ''))} />
      )}

      <div className={DP_CLASSES.multipleList}>
        {pickers.map((p, idx) => (
          <div key={p.id} className={DP_CLASSES.multipleItem}>
            <div className={DP_CLASSES.multipleItemLabel}>Fecha {idx + 1}</div>
            {pickers.length > 1 && (
              <button className={DP_CLASSES.multipleItemRemove}
                onClick={() => removePicker(p.id)} aria-label="Eliminar">
                ✕
              </button>
            )}
            <StaticDatePicker
              defaultValue={p.value?.date ?? null}
              initialMonth={p.initialMonth}
              disabledDates={disabledDates}
              minDate={minDate} maxDate={maxDate}
              onChange={v => updateValue(p.id, v)}
            />
          </div>
        ))}
      </div>

      {children}

      <div className={DP_CLASSES.actions}>
        {pickers.length < maxPickers && (
          <button onClick={addPicker}
            style={{ fontSize: 13, padding: '6px 14px', borderRadius: 8, border: '1px dashed var(--w3f-primary)', color: 'var(--w3f-primary)', cursor: 'pointer', background: 'transparent', fontWeight: 600 }}>
            + Agregar fecha
          </button>
        )}
        <button onClick={accept}
          style={{ fontSize: 13, padding: '6px 14px', borderRadius: 8, border: 'none', background: 'var(--w3f-primary)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
          {acceptLabel}
        </button>
      </div>
    </div>
  );
};
MultipleDatePicker.displayName = 'MultipleDatePicker';
