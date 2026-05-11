import { useState, useEffect, useCallback, useRef } from 'react';

export function useBottomSheetAnimation(isOpen: boolean) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      previousFocusRef.current = document.activeElement as HTMLElement;
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
        if (previousFocusRef.current && previousFocusRef.current.focus) {
          previousFocusRef.current.focus();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return { isAnimating, shouldRender };
}

export function useScrollLock(isOpen: boolean): void {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
}

export function useEscapeKey(isOpen: boolean, onClose: () => void, enabled: boolean): void {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (enabled && e.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose, enabled]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);
}
