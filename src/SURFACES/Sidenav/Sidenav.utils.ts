import type { SidenavVariant } from './Sidenav.types';
import { SIDENAV_CLASSES } from './Sidenav.constants';

export function buildSidenavContainerClasses(
    variant: SidenavVariant,
    className: string,
    unstyled?: boolean,
): string {
    const base = SIDENAV_CLASSES.container;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [
        base,
        variant === 'compact' && SIDENAV_CLASSES.compact,
        variant === 'expanded' && SIDENAV_CLASSES.expanded,
        variant === 'light' && SIDENAV_CLASSES.light,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}
