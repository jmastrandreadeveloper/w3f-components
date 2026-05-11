import { useMemo } from 'react';
import type React from 'react';
import type { BadgeVariant } from './Badge.types';
import { processContent, getAriaLabel } from './Badge.utils';

/**
 * Centraliza el procesamiento de contenido y aria-label del Badge.
 * Permite reutilizar la lógica fuera del componente si fuera necesario.
 */
export function useBadgeContent(
  children: React.ReactNode,
  max: number,
  variant: BadgeVariant,
  ariaLabel: string,
) {
  const processed = useMemo(
    () => processContent(children, max, variant),
    [children, max, variant],
  );

  const effectiveAriaLabel = useMemo(
    () => getAriaLabel(ariaLabel, variant, children, processed),
    [ariaLabel, variant, children, processed],
  );

  return { processed, effectiveAriaLabel };
}
