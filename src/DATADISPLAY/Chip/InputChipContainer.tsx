import React, { useRef, useEffect, useCallback } from 'react';
import Chip from './Chip';
import { useChipManager, useChipNavigation } from './Chip.hooks';

const InputChipContainer = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const { chips, inputValue, setInputValue, addChip, removeChip } = useChipManager();

  const handleAddChip = useCallback(() => {
    if (addChip(inputValue)) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [inputValue, addChip]);

  const handleRemoveChip = useCallback((id: number) => {
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

  // Sync chip focus with index
  useEffect(() => {
    if (focusedChipIndex !== null && chipRefs.current[focusedChipIndex]) {
      chipRefs.current[focusedChipIndex]!.focus();
    }
  }, [focusedChipIndex]);

  // Clean up refs when chips change
  useEffect(() => {
    chipRefs.current = chipRefs.current.slice(0, chips.length);
  }, [chips.length]);

  return (
    <div
      ref={containerRef}
      className="w3f-chip-input-container"
      onKeyDown={handleContainerKeyDown}
      role="group"
      aria-label="Editor de etiquetas con navegación por teclado"
    >
      <div className="w3f-chip-wrapper">
        {chips.map((chip, index) => (
          <Chip
            key={chip.id}
            ref={(el: HTMLDivElement | null) => { chipRefs.current[index] = el; }}
            label={chip.label}
            onClose={() => handleRemoveChip(chip.id)}
            isFocused={index === focusedChipIndex}
            onFocus={() => setFocusedChipIndex(index)}
            onClick={() => setFocusedChipIndex(index)}
          />
        ))}

        <input
          ref={inputRef}
          className="w3f-chip-input-field"
          type="text"
          placeholder={chips.length > 0 ? "" : "Escriba una etiqueta y presione Enter..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setFocusedChipIndex(null)}
          aria-label="Añadir nueva etiqueta"
          aria-describedby="chip-help"
        />
      </div>

      <div id="chip-help" className="w3f-chip-help">
        <p style={{ margin: 0 }}>
          <strong>Navegación:</strong> ← → mover entre chips, <strong>Enter</strong> agregar, <strong>Backspace/Supr</strong> eliminar, <strong>Esc</strong> volver al input
        </p>
      </div>
    </div>
  );
};

InputChipContainer.displayName = 'InputChipContainer';

export { InputChipContainer };
export default InputChipContainer;
