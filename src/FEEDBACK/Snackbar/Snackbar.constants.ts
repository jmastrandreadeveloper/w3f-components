import type { SnackbarVariant, SnackbarAnchorOrigin } from './Snackbar.types';

export const SNACKBAR_DEFAULTS = {
  autoHideDuration: 3000,
  variant: 'default' as SnackbarVariant,
  anchorOrigin: { vertical: 'bottom', horizontal: 'center' } as SnackbarAnchorOrigin,
  exitAnimationDuration: 150,
} as const;

export const SNACKBAR_VARIANTS: Record<SnackbarVariant, string> = {
  default: '',
  success: 'w3f-snackbar--success',
  warning: 'w3f-snackbar--warning',
  danger: 'w3f-snackbar--danger',
  info: 'w3f-snackbar--info',
};

export const SNACKBAR_POSITIONS: Record<string, string> = {
  'top-left': 'w3f-snackbar--top-left',
  'top-center': 'w3f-snackbar--top-center',
  'top-right': 'w3f-snackbar--top-right',
  'bottom-left': 'w3f-snackbar--bottom-left',
  'bottom-center': '',
  'bottom-right': 'w3f-snackbar--bottom-right',
};
