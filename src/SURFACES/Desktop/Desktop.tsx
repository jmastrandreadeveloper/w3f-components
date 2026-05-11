import React, { forwardRef } from 'react';
import Grid from '../../LAYOUT/Grid/Grid';
import type { DesktopProps } from './Desktop.types';
import { DESKTOP_DEFAULTS } from './Desktop.constants';
import { getWindowZIndex, buildDesktopClasses } from './Desktop.utils';
import { useWindowOrder } from './Desktop.hooks';

/**
 * Desktop Component - W3F Framework
 *
 * Entorno de escritorio para gestionar ventanas (Window) con z-index dinámico.
 * La ventana enfocada siempre queda encima de las demás.
 * Requiere que cada Window hijo tenga una prop `key` única.
 *
 * @example
 * <Desktop background="#e8eaf6">
 *   <Window key="win1" title="Editor">...</Window>
 *   <Window key="win2" title="Terminal">...</Window>
 * </Desktop>
 */
const Desktop = forwardRef<HTMLDivElement, DesktopProps>(({
    children,
    unstyled = DESKTOP_DEFAULTS.unstyled,
    className = DESKTOP_DEFAULTS.className,
    style,
    background = DESKTOP_DEFAULTS.background,
}, ref) => {
    const { windowOrder, handleWindowFocus } = useWindowOrder(children);

    return (
        <Grid
            ref={ref}
            className={buildDesktopClasses(className, unstyled)}
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                background,
                ...style,
            }}
        >
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;

                const key = child.key;
                if (!key) {
                    console.warn(
                        'Desktop: Window component is missing a unique "key" prop. Z-index management relies on keys.',
                    );
                    return child;
                }

                const zIndex = getWindowZIndex(windowOrder, String(key));

                return React.cloneElement(
                    child as React.ReactElement<Record<string, unknown>>,
                    {
                        style: { ...(child.props as Record<string, unknown>).style as object, zIndex },
                        onFocus: () => {
                            handleWindowFocus(String(key));
                            const childProps = child.props as Record<string, unknown>;
                            if (typeof childProps.onFocus === 'function') childProps.onFocus();
                        },
                    },
                );
            })}
        </Grid>
    );
});

Desktop.displayName = 'Desktop';

export { Desktop };
export default Desktop;
