import { ICON_REGISTRY } from './Icon.registry';
import { IconSizes, IconColors, IconAliases } from './Icon.constants';

/**
 * Convierte kebab-case a PascalCase: "panel-left" → "PanelLeft", "grid-3x3" → "Grid3x3"
 */
const kebabToPascal = (name: string): string =>
    name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');

/**
 * Normaliza el nombre del icono, resolviendo alias y convirtiendo
 * kebab-case a PascalCase para coincidir con los exports de lucide-react.
 */
export const resolveIconName = (name: string): string => {
    // 1. Resolver alias explícitos
    const aliased = IconAliases[name] || name;

    // 2. Si ya existe en Lucide tal cual, devolverlo
    if ((ICON_REGISTRY as Record<string, unknown>)[aliased]) {
        return aliased;
    }

    // 3. Intentar conversión kebab-case → PascalCase
    const pascal = kebabToPascal(aliased);
    if ((ICON_REGISTRY as Record<string, unknown>)[pascal]) {
        return pascal;
    }

    // 4. Devolver el nombre original para que el warning muestre el nombre real
    return name;
};

/**
 * Normaliza el tamaño del icono (convierte alias 'sm', 'md' a números).
 */
export const resolveIconSize = (size: number | string): number => {
    if (typeof size === 'string') {
        return (IconSizes as Record<string, number>)[size.toLowerCase()] || IconSizes.md;
    }
    return size;
};

/**
 * Normaliza el color del icono (convierte alias 'primary', 'danger' a valores CSS).
 */
export const resolveIconColor = (color: string): string => {
    return (IconColors as Record<string, string>)[color.toLowerCase()] || color;
};

/**
 * Build CSS classes for the Icon wrapper.
 */
export const buildIconClasses = (
    unstyled?: boolean,
    className?: string,
): string => {
    const base = 'w3f-icon';
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [`w3f-inline-flex w3f-items-center w3f-justify-center`, className].filter(Boolean).join(' ');
};
