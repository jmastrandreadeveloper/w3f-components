import { useState, useCallback } from 'react';
import type { ChipData } from './Chip.types';

export function useChipManager() {
  const [chips, setChips] = useState<ChipData[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addChip = useCallback((value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue === '') return false;

    const isDuplicate = chips.some(chip =>
      chip.label.toLowerCase() === trimmedValue.toLowerCase()
    );
    if (isDuplicate) return false;

    const newChip: ChipData = {
      id: Date.now(),
      label: trimmedValue,
    };

    setChips(prev => [...prev, newChip]);
    setInputValue('');
    return true;
  }, [chips]);

  const removeChip = useCallback((idToRemove: number) => {
    let removedIndex = -1;
    setChips(prev => {
      removedIndex = prev.findIndex(chip => chip.id === idToRemove);
      return prev.filter(chip => chip.id !== idToRemove);
    });
    return removedIndex;
  }, []);

  return { chips, inputValue, setInputValue, addChip, removeChip };
}

export function useChipNavigation(
  chips: ChipData[],
  inputValue: string,
  inputRef: React.RefObject<HTMLInputElement | null>,
  chipRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  onAddChip: () => void,
  onRemoveChip: (id: number) => void
) {
  const [focusedChipIndex, setFocusedChipIndex] = useState<number | null>(null);

  const handleContainerKeyDown = useCallback((event: React.KeyboardEvent) => {
    const isInputFocused = document.activeElement === inputRef.current;

    switch (event.key) {
      case 'ArrowLeft':
        if (isInputFocused && chips.length > 0 && inputRef.current?.selectionStart === 0) {
          event.preventDefault();
          setFocusedChipIndex(chips.length - 1);
        } else if (focusedChipIndex !== null && focusedChipIndex > 0) {
          event.preventDefault();
          setFocusedChipIndex(focusedChipIndex - 1);
        }
        break;

      case 'ArrowRight':
        if (focusedChipIndex !== null) {
          event.preventDefault();
          if (focusedChipIndex < chips.length - 1) {
            setFocusedChipIndex(focusedChipIndex + 1);
          } else {
            setFocusedChipIndex(null);
            inputRef.current?.focus();
          }
        }
        break;

      case 'Backspace':
      case 'Delete':
        if (focusedChipIndex !== null) {
          event.preventDefault();
          const chipToRemove = chips[focusedChipIndex];
          if (chipToRemove) {
            onRemoveChip(chipToRemove.id);
            const newLength = chips.length - 1;
            if (newLength === 0) {
              setFocusedChipIndex(null);
              requestAnimationFrame(() => inputRef.current?.focus());
            } else {
              setFocusedChipIndex(focusedChipIndex > 0 ? focusedChipIndex - 1 : 0);
            }
          }
        } else if (isInputFocused && !inputValue && chips.length > 0 && event.key === 'Backspace') {
          event.preventDefault();
          setFocusedChipIndex(chips.length - 1);
        }
        break;

      case 'Enter':
        if (isInputFocused) {
          event.preventDefault();
          onAddChip();
        }
        break;

      case 'Escape':
        if (focusedChipIndex !== null) {
          event.preventDefault();
          setFocusedChipIndex(null);
          inputRef.current?.focus();
        }
        break;
    }
  }, [chips, focusedChipIndex, inputValue, inputRef, onAddChip, onRemoveChip]);

  return { focusedChipIndex, setFocusedChipIndex, handleContainerKeyDown };
}
