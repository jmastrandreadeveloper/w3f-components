import type { LinkColor, LinkUnderline, LinkVariant } from './Link.types';
/**
 * Construye las clases del componente Link.
 */
export declare function buildLinkClasses(color: LinkColor, underline: LinkUnderline, variant: LinkVariant, disabled: boolean, isButton: boolean, className: string, unstyled?: boolean): string;
/**
 * Retorna los atributos necesarios para links externos (target + rel).
 */
export declare function buildExternalProps(external: boolean, isButton: boolean): Record<string, string>;
//# sourceMappingURL=Link.utils.d.ts.map