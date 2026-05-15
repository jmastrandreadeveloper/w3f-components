import { useState, useEffect, useRef, useContext } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
import { AUTOCOMPLETE_DEFAULTS } from "./Autocomplete.constants";
import { getOptionText, defaultFilter } from "./Autocomplete.utils";
function useAutocomplete({
  data,
  onSelect,
  optionLabel,
  filterFn,
  maxResults,
  name,
  value: externalValue,
  onChange: externalOnChange
}) {
  const formContext = useContext(FormContext);
  const isFormControlled = !!(formContext && name);
  const [internalValue, setInternalValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debounceTimeout = useRef(null);
  const currentValue = isFormControlled ? formContext.values[name] ?? "" : externalValue !== void 0 ? externalValue : internalValue;
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const updateValue = (value, source) => {
    if (isFormControlled && formContext) {
      formContext.handleChange({
        target: { name, value, type: "text" }
      });
      if (source === "select") {
        formContext.handleBlur({
          target: { name, value }
        });
      }
    } else if (externalOnChange) {
      externalOnChange({ target: { name, value } });
    } else {
      setInternalValue(value);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    updateValue(value, "change");
    setIsLoading(true);
    setShowSuggestions(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (value) {
        const filterLogic = filterFn ?? ((item, q) => defaultFilter(item, q, optionLabel));
        const filtered = data.filter((item) => filterLogic(item, value)).slice(0, maxResults);
        setSuggestions(filtered);
        setActiveSuggestionIndex(-1);
      } else {
        setSuggestions([]);
      }
      setIsLoading(false);
    }, AUTOCOMPLETE_DEFAULTS.debounceTime);
  };
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex(
        (prev) => prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex(
        (prev) => prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeSuggestionIndex > -1) {
        handleItemClick(suggestions[activeSuggestionIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };
  const handleItemClick = (suggestion) => {
    const text = getOptionText(suggestion, optionLabel);
    updateValue(text, "select");
    setSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    if (onSelect) onSelect(suggestion);
    if (inputRef.current) inputRef.current.focus();
  };
  const handleClearInput = () => {
    updateValue("", "select");
    setSuggestions([]);
    setShowSuggestions(false);
    if (onSelect) onSelect(null);
    if (inputRef.current) inputRef.current.focus();
  };
  return {
    inputValue: currentValue,
    suggestions,
    activeSuggestionIndex,
    showSuggestions,
    isLoading,
    inputRef,
    containerRef,
    handleChange,
    handleKeyDown,
    handleItemClick,
    handleClearInput,
    isFormControlled,
    formContext
  };
}
const useAutocompleteFormDispatch = () => useContext(FormDispatchContext);
const useAutocompleteFormMeta = () => useContext(FormMetaContext);
const useAutocompleteFieldStore = () => useContext(FormFieldStoreContext);
export {
  useAutocomplete,
  useAutocompleteFieldStore,
  useAutocompleteFormDispatch,
  useAutocompleteFormMeta
};
//# sourceMappingURL=Autocomplete.hooks.js.map
