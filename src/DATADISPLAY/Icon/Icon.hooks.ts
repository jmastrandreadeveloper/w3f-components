import { ICON_REGISTRY } from './Icon.registry';
import { resolveIconName, resolveIconSize, resolveIconColor } from './Icon.utils';
import { IconDefaults } from './Icon.constants';
import type { UseIconResult } from './Icon.types';

/**
 * Hook para preparar y normalizar las props del componente Icon.
 */
const useIcon = ({
    name,
    size = IconDefaults.size,
    color = IconDefaults.color,
    className = IconDefaults.className
}: {
    name: string;
    size?: number | string;
    color?: string;
    className?: string;
}): UseIconResult => {
    // 1. Normalizar el nombre (resolviendo alias)
    const resolvedName = resolveIconName(name);

    // 2. Normalizar el tamaño (resolviendo alias)
    const resolvedSize = resolveIconSize(size);

    // 3. Normalizar el color (resolviendo alias W3.CSS)
    const resolvedColor = resolveIconColor(color);

    // 4. Obtener el componente LucideIcon
    const LucideIcon = resolvedName
        ? ((ICON_REGISTRY as Record<string, unknown>)[resolvedName] as UseIconResult['LucideIcon']) || null
        : null;

    return {
        LucideIcon,
        size: resolvedSize,
        color: resolvedColor,
        className,
        name: resolvedName,
    };
};

export default useIcon;
