import { useState, useCallback, useEffect } from 'react';
import type { UseBackdropResult } from './Backdrop.types';

/**
 * Hook para controlar el estado open/close del Backdrop.
 */
export const useBackdrop = (initialOpen = false): UseBackdropResult => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
};

/**
 * Hook que bloquea el scroll del body cuando está activo.
 * Reutilizable para cualquier componente que necesite bloquear scroll.
 */
export const useScrollLock = (locked: boolean): void => {
  useEffect(() => {
    if (!locked) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Calcular scrollbar width para evitar salto de layout
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
};
