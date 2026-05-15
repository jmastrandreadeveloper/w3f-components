const TOOLTIP_DEFAULTS = {
  message: "Tooltip",
  position: "top",
  showDelay: 0,
  hideDelay: 0,
  arrow: true,
  variant: "dark",
  unstyled: false
};
const tooltipConfigs = {
  DEFAULT: {
    message: "Tooltip cargado desde un archivo de configuraci\xF3n externo (JSON)."
  },
  UPPER_DELAYED: {
    message: "Aparezco arriba despu\xE9s de 500ms, \xA1como en Angular Material!",
    position: "top",
    showDelay: 500
  },
  SLOW_HIDE: {
    message: "\xA1Me quedo 1 segundo extra! (hideDelay: 1000ms)",
    position: "left",
    hideDelay: 1e3
  },
  BELOW_IMPORTANT: {
    message: "Advertencia: posici\xF3n inferior.",
    position: "bottom"
  }
};
export {
  TOOLTIP_DEFAULTS,
  tooltipConfigs
};
//# sourceMappingURL=Tooltip.constants.js.map
