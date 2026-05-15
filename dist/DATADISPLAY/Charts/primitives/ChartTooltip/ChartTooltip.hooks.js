import { useCallback, useState } from "react";
function useChartTooltip() {
  const [state, setState] = useState({ data: null, left: 0, top: 0, open: false });
  const showTooltip = useCallback(
    (args) => {
      setState({ data: args.data, left: args.left, top: args.top, open: true });
    },
    []
  );
  const hideTooltip = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);
  return {
    tooltipData: state.data,
    tooltipLeft: state.left,
    tooltipTop: state.top,
    tooltipOpen: state.open,
    showTooltip,
    hideTooltip
  };
}
export {
  useChartTooltip
};
//# sourceMappingURL=ChartTooltip.hooks.js.map
