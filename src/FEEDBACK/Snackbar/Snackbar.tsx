import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { SnackbarProps, SnackbarAnchorOrigin } from './Snackbar.types';
import { SNACKBAR_DEFAULTS } from './Snackbar.constants';
import { buildAnchorClasses, buildSnackbarClasses } from './Snackbar.utils';

export type {
  SnackbarVariant,
  SnackbarCloseReason,
  SnackbarAnchorOrigin,
  SnackbarProps,
  UseSnackbarOptions,
  UseSnackbarReturn,
  ShowSnackbarConfig,
} from './Snackbar.types';
export { default as useSnackbar } from './Snackbar.hooks';

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(({
  open,
  message,
  onClose,
  autoHideDuration,
  variant = SNACKBAR_DEFAULTS.variant,
  anchorOrigin = SNACKBAR_DEFAULTS.anchorOrigin,
  action,
  resumeHideDuration,
  className,
  // Backwards-compatible aliases
  show,
  duration,
  ...rest
}, ref) => {

  // Backwards compatibility: show -> open, duration -> autoHideDuration
  const isOpen = open ?? show ?? false;
  const hideDuration = autoHideDuration ?? duration ?? SNACKBAR_DEFAULTS.autoHideDuration;

  const [isVisible, setIsVisible] = useState(isOpen);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleClose = useCallback((reason: 'timeout' | 'clickaway' | 'escapeKeyDown' = 'timeout') => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
      onClose?.(null, reason);
    }, SNACKBAR_DEFAULTS.exitAnimationDuration);
  }, [onClose]);

  // Sync visibility with open prop
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsExiting(false);
    }
  }, [isOpen]);

  // Auto-hide timer with pause support
  useEffect(() => {
    if (!isOpen || hideDuration === null || hideDuration <= 0 || isPaused) return;

    const effectiveDuration = isPaused && resumeHideDuration != null
      ? resumeHideDuration
      : hideDuration;

    const timer = setTimeout(() => {
      handleClose('timeout');
    }, effectiveDuration);

    return () => clearTimeout(timer);
  }, [isOpen, hideDuration, isPaused, resumeHideDuration, handleClose]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose('escapeKeyDown');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const anchorClasses = useMemo(
    () => buildAnchorClasses(anchorOrigin as SnackbarAnchorOrigin),
    [anchorOrigin]
  );

  const snackbarClasses = useMemo(
    () => buildSnackbarClasses(variant, isExiting, className),
    [variant, isExiting, className]
  );

  if (!isVisible) return null;

  return (
    <div className={anchorClasses}>
      <div
        ref={ref}
        className={snackbarClasses}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        {...rest}
      >
        <p className="w3f-snackbar__message">
          {message}
        </p>
        {action ? (
          <div className="w3f-snackbar__action">
            {action}
          </div>
        ) : (
          <button
            className="w3f-snackbar__close"
            onClick={() => handleClose('clickaway')}
            aria-label="Cerrar notificacion"
            type="button"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
});

Snackbar.displayName = 'Snackbar';

export { Snackbar };
export default Snackbar;
