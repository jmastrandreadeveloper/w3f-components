import React from 'react';
import type { AppBarProps } from './AppBar.types';
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
export declare const AppBar: React.ForwardRefExoticComponent<AppBarProps & React.RefAttributes<HTMLElement>>;
export declare const AppBarLeading: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const AppBarTitle: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const AppBarTrailing: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export default AppBar;
//# sourceMappingURL=AppBar.d.ts.map