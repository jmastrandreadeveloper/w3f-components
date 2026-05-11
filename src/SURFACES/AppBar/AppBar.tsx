import React, { forwardRef } from 'react';
import type { AppBarProps } from './AppBar.types';
import { APP_BAR_DEFAULTS, APP_BAR_CLASSES } from './AppBar.constants';
import { buildAppBarClasses } from './AppBar.utils';

/**
 * AppBar Component - W3F Framework
 *
 * Barra de aplicación superior con soporte para colores, posición y tamaño.
 * Acepta children como contenido personalizado del toolbar.
 *
 * @example
 * <AppBar color="primary" position="sticky">
 *   <span>Mi App</span>
 *   <Button variant="text">Login</Button>
 * </AppBar>
 */
export const AppBar = forwardRef<HTMLElement, AppBarProps>(({
    children,
    color = APP_BAR_DEFAULTS.color,
    position = APP_BAR_DEFAULTS.position,
    size = APP_BAR_DEFAULTS.size,
    elevated = APP_BAR_DEFAULTS.elevated,
    unstyled = APP_BAR_DEFAULTS.unstyled,
    className = APP_BAR_DEFAULTS.className,
}, ref) => {
    const cls = buildAppBarClasses(color, position, size, elevated, className, unstyled);

    return (
        <header ref={ref} className={cls}>
            <div className={APP_BAR_CLASSES.toolbar}>{children}</div>
        </header>
    );
});

AppBar.displayName = 'AppBar';

// ─────────────────────────────────────────────────────────────────────────────
// AppBarLeading — slot izquierdo (logo, menú hamburguesa, etc.)
// ─────────────────────────────────────────────────────────────────────────────

export const AppBarLeading: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = '',
}) => (
    <div className={[APP_BAR_CLASSES.leading, className].filter(Boolean).join(' ')}>
        {children}
    </div>
);
AppBarLeading.displayName = 'AppBarLeading';

// ─────────────────────────────────────────────────────────────────────────────
// AppBarTitle — título central/izquierdo
// ─────────────────────────────────────────────────────────────────────────────

export const AppBarTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = '',
}) => (
    <div className={[APP_BAR_CLASSES.title, className].filter(Boolean).join(' ')}>
        {children}
    </div>
);
AppBarTitle.displayName = 'AppBarTitle';

// ─────────────────────────────────────────────────────────────────────────────
// AppBarTrailing — slot derecho (acciones, avatar, etc.)
// ─────────────────────────────────────────────────────────────────────────────

export const AppBarTrailing: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = '',
}) => (
    <div className={[APP_BAR_CLASSES.trailing, className].filter(Boolean).join(' ')}>
        {children}
    </div>
);
AppBarTrailing.displayName = 'AppBarTrailing';

export default AppBar;
