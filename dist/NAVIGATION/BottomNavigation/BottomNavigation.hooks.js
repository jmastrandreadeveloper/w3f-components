import { useState, useCallback, useContext, createContext } from "react";
const BottomNavContext = createContext({
  value: null,
  onChange: () => {
  },
  showLabels: true,
  color: "primary"
});
function useBottomNav(valueProp, defaultValue, onChange, disabled) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? null
  );
  const isControlled = valueProp !== void 0;
  const currentValue = isControlled ? valueProp : internalValue;
  const handleChange = useCallback(
    (e, newValue) => {
      if (disabled) return;
      if (!isControlled) setInternalValue(newValue);
      if (onChange) onChange(e, newValue);
    },
    [disabled, isControlled, onChange]
  );
  return { currentValue, handleChange };
}
function useBottomNavAction() {
  return useContext(BottomNavContext);
}
function useBottomNavContext(currentValue, handleChange, showLabels, color) {
  return { value: currentValue, onChange: handleChange, showLabels, color };
}
export {
  BottomNavContext,
  useBottomNav,
  useBottomNavAction,
  useBottomNavContext
};
//# sourceMappingURL=BottomNavigation.hooks.js.map
