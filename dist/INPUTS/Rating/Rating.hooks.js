import { useContext, useState } from "react";
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from "../Form/Form";
const useRatingFormContext = () => {
  return useContext(FormContext);
};
const useRatingFormDispatch = () => useContext(FormDispatchContext);
const useRatingFormMeta = () => useContext(FormMetaContext);
const useRatingFieldStore = () => useContext(FormFieldStoreContext);
const useRatingHover = () => {
  const [hover, setHover] = useState(-1);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  return { hover, setHover, focusedIndex, setFocusedIndex };
};
export {
  useRatingFieldStore,
  useRatingFormContext,
  useRatingFormDispatch,
  useRatingFormMeta,
  useRatingHover
};
//# sourceMappingURL=Rating.hooks.js.map
