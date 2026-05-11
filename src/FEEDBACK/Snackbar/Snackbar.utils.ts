import type { SnackbarVariant, SnackbarAnchorOrigin } from './Snackbar.types';
import { SNACKBAR_VARIANTS } from './Snackbar.constants';

export function getSnackbarPositionKey(anchorOrigin: SnackbarAnchorOrigin): string {
  return `${anchorOrigin.vertical}-${anchorOrigin.horizontal}`;
}

export function buildAnchorClasses(anchorOrigin: SnackbarAnchorOrigin): string {
  const posKey = getSnackbarPositionKey(anchorOrigin);
  return `w3f-snackbar-anchor w3f-snackbar-anchor--${posKey}`;
}

export function buildSnackbarClasses(
  variant: SnackbarVariant,
  isExiting: boolean,
  className?: string
): string {
  return [
    'w3f-snackbar',
    SNACKBAR_VARIANTS[variant] || '',
    isExiting && 'w3f-snackbar--exit',
    className,
  ].filter(Boolean).join(' ');
}
