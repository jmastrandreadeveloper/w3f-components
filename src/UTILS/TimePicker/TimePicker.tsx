import React, { memo, useRef } from 'react';
import type { TimePickerProps } from './TimePicker.types';
import { TP_CLASSES } from './TimePicker.constants';
import { useTimePicker, useTPDropdown, useScrollWheel } from './TimePicker.hooks';
import { formatTimeDisplay } from './TimePicker.utils';

// ── Scroll Wheel Column ───────────────────────────────────────
interface WheelColumnProps {
  label: string;
  values: number[];
  selected: number;
  onSelect: (v: number) => void;
  pad?: number; // min digits
}

const WheelColumn = memo(({ label, values, selected, onSelect, pad = 2 }: WheelColumnProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { onScroll } = useScrollWheel(scrollRef, values, selected, onSelect);

  return (
    <div className={TP_CLASSES.column}>
      <span className={TP_CLASSES.columnLabel}>{label}</span>
      {/* Up button */}
      <button className={TP_CLASSES.stepBtn}
        onClick={() => {
          const idx = values.indexOf(selected);
          if (idx > 0) onSelect(values[idx - 1]);
        }}>▲</button>

      {/* Scroll wheel */}
      <div className={TP_CLASSES.scroll} ref={scrollRef} onScroll={onScroll}>
        {/* Spacer so first/last items can center */}
        <div style={{ height: 44, flexShrink: 0 }} />
        {values.map(v => (
          <button
            key={v}
            className={`${TP_CLASSES.item}${v === selected ? ` ${TP_CLASSES.itemSelected}` : ''}`}
            onClick={() => onSelect(v)}
            tabIndex={0}
          >
            {String(v).padStart(pad, '0')}
          </button>
        ))}
        <div style={{ height: 44, flexShrink: 0 }} />
      </div>

      {/* Down button */}
      <button className={TP_CLASSES.stepBtn}
        onClick={() => {
          const idx = values.indexOf(selected);
          if (idx < values.length - 1) onSelect(values[idx + 1]);
        }}>▼</button>
    </div>
  );
});
WheelColumn.displayName = 'WheelColumn';

// ── TimePicker Panel (shared inner UI) ───────────────────────
interface PanelProps {
  state: ReturnType<typeof useTimePicker>;
  format: 12 | 24;
  showSeconds: boolean;
  showNow?: boolean;
  onAccept?: () => void;
  onClear?: () => void;
  onClose?: () => void;
}

const TimePickerPanel = memo(({
  state, format, showSeconds, showNow, onAccept, onClear, onClose,
}: PanelProps) => {
  const { hours24, minutes, seconds, ampm, hours12, hourValues, minuteValues, secondValues,
    currentValue, setHour, setMinute, setSecond, toggleAmPm, setNow, clear } = state;

  const displayH = format === 12 ? hours12 : hours24;

  return (
    <div className={TP_CLASSES.panel}>
      {/* Digital display */}
      <div className={TP_CLASSES.display}>
        <span className={TP_CLASSES.displayTime}>{currentValue.display}</span>
      </div>

      {/* Wheels */}
      <div className={TP_CLASSES.wheels}>
        <WheelColumn
          label="Horas" values={hourValues} selected={displayH}
          onSelect={setHour}
        />
        <span className={TP_CLASSES.separator}>:</span>
        <WheelColumn
          label="Minutos" values={minuteValues} selected={minutes}
          onSelect={setMinute}
        />
        {showSeconds && (
          <>
            <span className={TP_CLASSES.separator}>:</span>
            <WheelColumn
              label="Segundos" values={secondValues} selected={seconds}
              onSelect={setSecond}
            />
          </>
        )}

        {/* AM/PM */}
        {format === 12 && (
          <div className={TP_CLASSES.ampm}>
            <button
              className={`${TP_CLASSES.ampmBtn}${ampm === 'AM' ? ` ${TP_CLASSES.ampmBtnActive}` : ''}`}
              onClick={() => ampm !== 'AM' && toggleAmPm()}>AM</button>
            <button
              className={`${TP_CLASSES.ampmBtn}${ampm === 'PM' ? ` ${TP_CLASSES.ampmBtnActive}` : ''}`}
              onClick={() => ampm !== 'PM' && toggleAmPm()}>PM</button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className={TP_CLASSES.actions}>
        {showNow && (
          <button onClick={() => { setNow(); }}
            style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, border: '1px solid var(--w3f-outline-variant)', cursor: 'pointer', background: 'transparent' }}>
            Ahora
          </button>
        )}
        {onClear && (
          <button onClick={() => { clear(); onClear(); }}
            style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, border: '1px solid var(--w3f-outline-variant)', cursor: 'pointer', background: 'transparent' }}>
            Limpiar
          </button>
        )}
        {onAccept && (
          <button onClick={() => { onAccept(); onClose?.(); }}
            style={{ fontSize: 12, padding: '4px 12px', borderRadius: 6, border: 'none', background: 'var(--w3f-primary)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
            Aceptar
          </button>
        )}
      </div>
    </div>
  );
});
TimePickerPanel.displayName = 'TimePickerPanel';

// ─────────────────────────────────────────────────────────────
// TimePicker — dropdown mode
// ─────────────────────────────────────────────────────────────
export const TimePicker: React.FC<TimePickerProps> = ({
  defaultValue, format = 24, showSeconds = false,
  minuteStep = 1, secondStep = 1,
  placeholder = 'Seleccionar hora…',
  name, onChange, onAccept, inline = false,
  clearable = true, showNow = true, children, className,
}) => {
  const { isOpen, toggle, close, rootRef } = useTPDropdown();
  const state = useTimePicker({
    defaultValue, format, showSeconds, minuteStep, secondStep, onChange,
  });

  const displayStr = formatTimeDisplay(
    state.hours24, state.minutes, state.seconds, format, showSeconds
  );

  const panel = (
    <TimePickerPanel
      state={state} format={format} showSeconds={showSeconds}
      showNow={showNow}
      onAccept={onAccept ? () => onAccept(state.currentValue) : undefined}
      onClear={clearable ? state.clear : undefined}
      onClose={close}
    />
  );

  if (inline) {
    return (
      <div className={`${TP_CLASSES.inline}${className ? ` ${className}` : ''}`}>
        {name && <input type="hidden" name={name} value={state.currentValue.formatted24} />}
        {panel}
        {children}
      </div>
    );
  }

  return (
    <div className={`${TP_CLASSES.root}${className ? ` ${className}` : ''}`} ref={rootRef}>
      {name && <input type="hidden" name={name} value={state.currentValue.formatted24} />}
      <div className={TP_CLASSES.inputWrapper}>
        <input
          readOnly
          className={TP_CLASSES.input}
          value={displayStr}
          placeholder={placeholder}
          onClick={toggle}
        />
        <span className={TP_CLASSES.inputIcon}>🕐</span>
      </div>
      {isOpen && (
        <div className={TP_CLASSES.dropdown}>{panel}</div>
      )}
      {children}
    </div>
  );
};
TimePicker.displayName = 'TimePicker';

// ─────────────────────────────────────────────────────────────
// StaticTimePicker — always visible
// ─────────────────────────────────────────────────────────────
export const StaticTimePicker: React.FC<TimePickerProps> = (props) => (
  <TimePicker {...props} inline />
);
StaticTimePicker.displayName = 'StaticTimePicker';
