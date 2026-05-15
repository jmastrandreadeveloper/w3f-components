import type { ButtonVariant, ButtonColor, ButtonSize } from './Button.types';
/**
 * Construye las clases CSS del botón a partir de sus props de estilo.
 * When `unstyled` is true, only structural classes are emitted —
 * visual appearance must be composed via trait classes on `className`.
 */
export declare function buildButtonClasses(variant: ButtonVariant, color: ButtonColor, size: ButtonSize, fullWidth: boolean, className?: string, unstyled?: boolean): string;
//# sourceMappingURL=Button.utils.d.ts.map