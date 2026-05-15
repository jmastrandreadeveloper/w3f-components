import { useState, useRef, useCallback } from "react";
const DEFAULT_MAX = 50;
const DEFAULT_DEBOUNCE = 100;
function useHistoryStack(initial, options) {
  const maxEntries = options?.maxEntries ?? DEFAULT_MAX;
  const debounceMs = options?.debounceMs ?? DEFAULT_DEBOUNCE;
  const [state, setState] = useState(initial);
  const historyRef = useRef([initial]);
  const indexRef = useRef(0);
  const debounceRef = useRef(null);
  const [, forceUpdate] = useState(0);
  const commitState = useCallback((newState) => {
    historyRef.current = historyRef.current.slice(0, indexRef.current + 1);
    if (historyRef.current.length >= maxEntries) {
      historyRef.current.shift();
    } else {
      indexRef.current++;
    }
    historyRef.current.push(newState);
    setState(newState);
    forceUpdate((n) => n + 1);
  }, [maxEntries]);
  const push = useCallback((newState, immediate = false) => {
    if (immediate) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      commitState(newState);
    } else {
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
    forceUpdate((n) => n + 1);
  }, []);
  const redo = useCallback(() => {
    if (indexRef.current >= historyRef.current.length - 1) return;
    indexRef.current++;
    const next = historyRef.current[indexRef.current];
    setState(next);
    forceUpdate((n) => n + 1);
  }, []);
  return {
    state,
    push,
    undo,
    redo,
    get canUndo() {
      return indexRef.current > 0;
    },
    get canRedo() {
      return indexRef.current < historyRef.current.length - 1;
    },
    get historyIndex() {
      return indexRef.current;
    },
    get historyLength() {
      return historyRef.current.length;
    }
  };
}
export {
  useHistoryStack
};
//# sourceMappingURL=useHistoryStack.js.map
