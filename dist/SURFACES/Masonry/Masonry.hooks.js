import { useState, useEffect } from "react";
function getBreakpoint() {
  if (typeof window === "undefined") return "xs";
  const w = window.innerWidth;
  if (w >= 1280) return "xl";
  if (w >= 1024) return "lg";
  if (w >= 768) return "md";
  if (w >= 640) return "sm";
  return "xs";
}
function useMasonryBreakpoint() {
  const [bp, setBp] = useState(getBreakpoint);
  useEffect(() => {
    const handler = () => setBp(getBreakpoint());
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);
  return bp;
}
export {
  useMasonryBreakpoint
};
//# sourceMappingURL=Masonry.hooks.js.map
