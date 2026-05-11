export const CHIP_DEFAULTS = {
  disabled: false as const,
  isFocused: false as const,
  unstyled: false as const,
} as const;

export const CHIP_VARIANT_CLASSES = {
  solid: 'w3f-chip--solid',
  outlined: 'w3f-chip--outlined',
  ghost: 'w3f-chip--ghost',
  soft: 'w3f-chip--soft',
} as const;
