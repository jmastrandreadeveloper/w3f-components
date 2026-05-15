import { useState, useEffect } from "react";
const useClock = () => {
  const [date, setDate] = useState(/* @__PURE__ */ new Date());
  useEffect(() => {
    const timerID = setInterval(() => setDate(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(timerID);
  }, []);
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  };
};
export {
  useClock
};
//# sourceMappingURL=RelojAnalogico.hooks.js.map
