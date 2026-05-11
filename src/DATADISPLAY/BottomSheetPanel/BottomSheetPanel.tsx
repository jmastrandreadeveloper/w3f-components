import React, { forwardRef, useRef, useEffect } from 'react';
import type { BottomSheetPanelProps } from './BottomSheetPanel.types';
import { useBottomSheetAnimation, useScrollLock, useEscapeKey } from './BottomSheetPanel.hooks';
import { getMaxHeight } from './BottomSheetPanel.utils';
import { BSP_DEFAULTS } from './BottomSheetPanel.constants';

const BottomSheetPanel = forwardRef<HTMLDivElement, BottomSheetPanelProps>(({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = BSP_DEFAULTS.showCloseButton,
  closeOnBackdropClick = BSP_DEFAULTS.closeOnBackdropClick,
  closeOnEscape = BSP_DEFAULTS.closeOnEscape,
  size = BSP_DEFAULTS.size,
  maxHeight,
  className = BSP_DEFAULTS.className,
  footer,
  unstyled = BSP_DEFAULTS.unstyled,
}, ref) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const { isAnimating, shouldRender } = useBottomSheetAnimation(isOpen);
  useScrollLock(isOpen);
  useEscapeKey(isOpen, onClose, closeOnEscape);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!shouldRender) return null;

  const unstyledClass = unstyled ? 'w3f-bottom-sheet-panel--unstyled' : '';
  const sizeClass = unstyled ? '' : (size !== 'auto' ? `bottom-sheet-panel--${size}` : '');

  return (
    <div
      ref={ref}
      className={`bottom-sheet-backdrop ${isAnimating ? 'is-open' : ''}`}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={panelRef}
        className={`bottom-sheet-panel ${sizeClass} ${unstyledClass} ${isAnimating ? 'is-open' : ''} ${className}`.trim().replace(/\s+/g, ' ')}
        style={size === 'auto' && !maxHeight
          ? { maxHeight: 'calc(100vh - 64px)' }
          : { height: getMaxHeight(size, maxHeight), maxHeight: getMaxHeight(size, maxHeight) }
        }
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'bottom-sheet-title' : undefined}
        tabIndex={-1}
      >
        {(title || showCloseButton) && (
          <div className="bottom-sheet-header">
            {title && (
              <h3 id="bottom-sheet-title" className="bottom-sheet-title">
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="bottom-sheet-close-btn"
                aria-label="Cerrar panel"
                type="button"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="bottom-sheet-content">{children}</div>

        {footer && <div className="bottom-sheet-footer">{footer}</div>}
      </div>
    </div>
  );
});

BottomSheetPanel.displayName = 'BottomSheetPanel';

export { BottomSheetPanel };
export default BottomSheetPanel;
