import React from 'react';
import type { PanelProps } from './Panel.types';
import { PANEL_DEFAULTS } from './Panel.constants';
import { buildPanelClassNames } from './Panel.utils';

export type { PanelProps } from './Panel.types';

/**
 * Panel Component - W3F Framework
 *
 * Contenedor de propósito general para presentar contenido.
 *
 * @example
 * <Panel card round padding>
 *   <h3>Título</h3>
 *   <p>Contenido del panel</p>
 * </Panel>
 */
const Panel: React.FC<PanelProps> = ({
    children,
    color,
    card,
    round,
    padding = PANEL_DEFAULTS.padding,
    border,
    className,
    ...rest
}) => {
    const classNames = buildPanelClassNames({
        color,
        card,
        round,
        padding,
        border,
        className,
    });

    return (
        <div className={classNames} style={color ? { backgroundColor: color } : undefined} {...rest}>
            {children}
        </div>
    );
};

Panel.displayName = 'Panel';

export { Panel };
export default Panel;
