export const NOTE_DEFAULTS = {
  type: 'info' as const,
  round: true as const,
  shadow: false as const,
  border: 'left' as const,
  fullBorder: false as const,
  unstyled: false as const,
} as const;

export const NOTE_VARIANT_CLASSES: Record<string, string> = {
  solid: 'w3f-note--solid',
  outlined: 'w3f-note--outlined',
  ghost: 'w3f-note--ghost',
  soft: 'w3f-note--soft',
};
