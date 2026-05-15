import { useRef, useCallback } from "react";
import { RIPPLE_DEFAULTS } from "./Ripple.constants";
import { calculateRippleDimensions } from "./Ripple.utils";
const useRipple = (options = {}) => {
  const {
    disabled = false,
    centered = false,
    unbounded = false,
    radius,
    enterDuration = RIPPLE_DEFAULTS.enterDuration,
    exitDuration = RIPPLE_DEFAULTS.exitDuration
  } = options;
  const containerRef = useRef(null);
  const createRipple = useCallback((e) => {
    if (disabled) return;
    const container = containerRef.current;
    if (!container) return;
    const ripple = document.createElement("span");
    ripple.classList.add("w3f-ripple");
    const rect = container.getBoundingClientRect();
    const dims = calculateRippleDimensions(rect, e.clientX, e.clientY, centered, radius);
    ripple.style.width = ripple.style.height = `${dims.width}px`;
    ripple.style.left = `${dims.left}px`;
    ripple.style.top = `${dims.top}px`;
    const totalDuration = enterDuration + exitDuration;
    if (totalDuration !== RIPPLE_DEFAULTS.enterDuration + RIPPLE_DEFAULTS.exitDuration) {
      ripple.style.animationDuration = `${totalDuration}ms`;
    }
    if (unbounded) {
      ripple.style.overflow = "visible";
    }
    container.appendChild(ripple);
    const timeoutId = setTimeout(() => {
      ripple.remove();
    }, totalDuration);
    ripple.dataset.timeoutId = String(timeoutId);
  }, [disabled, centered, unbounded, radius, enterDuration, exitDuration]);
  const clearRipples = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const ripples = container.querySelectorAll(".w3f-ripple");
    ripples.forEach((ripple) => {
      const timeoutId = ripple.dataset.timeoutId;
      if (timeoutId) clearTimeout(Number(timeoutId));
      ripple.remove();
    });
  }, []);
  return { containerRef, createRipple, clearRipples };
};
export {
  useRipple
};
//# sourceMappingURL=Ripple.hooks.js.map
