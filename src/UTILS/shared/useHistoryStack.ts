import { useState, useRef, useCallback } from 'react';

const DEFAULT_MAX = 50;
const DEFAULT_DEBOUNCE = 100;

export function useHistoryStack<T>(
  initial: T,
  options?: { maxEntries?: number; debounceMs?: number },
): {
  state: T;
  push:    (newState: T, immediate?: boolean) => void;
  undo:    () => void;
  redo:    () => void;
  canUndo: boolean;
  canRedo: boolean;
  historyIndex:  number;
  historyLength: number;
} {
  const maxEntries  = options?.maxEntries  ?? DEFAULT_MAX;
  const debounceMs  = options?.debounceMs  ?? DEFAULT_DEBOUNCE;

  const [state, setState] = useState<T>(initial);

  const historyRef  = useRef<T[]>([initial]);
  const indexRef    = useRef<number>(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Force re-render when canUndo/canRedo change
  const [, forceUpdate] = useState(0);

  const commitState = useCallback((newState: T) => {
    // Truncate forward history
    historyRef.current = historyRef.current.slice(0, indexRef.current + 1);
    // Evict oldest if at capacity
    if (historyRef.current.length >= maxEntries) {
      historyRef.current.shift();
    } else {
      indexRef.current++;
    }
    historyRef.current.push(newState);
    setState(newState);
    forceUpdate(n => n + 1);
  }, [maxEntries]);

  const push = useCallback((newState: T, immediate = false) => {
    if (immediate) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      commitState(newState);
    } else {
      // Optimistic UI update without committing to history yet
      setState(newState);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        debounceRef.current = null;
        commitState(newState);
      }, debounceMs);
    }
  }, [commitState, debounceMs]);

  const undo = useCallback(() => {
    if (indexRef.current <= 0) return;
    indexRef.current--;
    const prev = historyRef.current[indexRef.current];
    setState(prev);
    forceUpdate(n => n + 1);
  }, []);

  const redo = useCallback(() => {
    if (indexRef.current >= historyRef.current.length - 1) return;
    indexRef.current++;
    const next = historyRef.current[indexRef.current];
    setState(next);
    forceUpdate(n => n + 1);
  }, []);

  return {
    state,
    push,
    undo,
    redo,
    get canUndo() { return indexRef.current > 0; },
    get canRedo() { return indexRef.current < historyRef.current.length - 1; },
    get historyIndex()  { return indexRef.current; },
    get historyLength() { return historyRef.current.length; },
  };
}
