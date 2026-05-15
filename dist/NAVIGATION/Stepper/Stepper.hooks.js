import { useState, useEffect, useRef } from "react";
function useStepContentAnimation(active) {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(active ? "none" : "0");
  useEffect(() => {
    if (active) {
      const el = contentRef.current;
      if (el) setMaxHeight(`${el.scrollHeight + 50}px`);
    } else {
      setMaxHeight("0");
    }
  }, [active]);
  return { contentRef, maxHeight };
}
export {
  useStepContentAnimation
};
//# sourceMappingURL=Stepper.hooks.js.map
