import React from 'react';
import type { VerticalPaddingProps } from './VerticalPadding.types';
import { VERTICAL_PADDING_DEFAULTS } from './VerticalPadding.constants';
import { buildVerticalPaddingClassNames } from './VerticalPadding.utils';

export type { VerticalPaddingProps, VerticalPaddingSize } from './VerticalPadding.types';

/**
 * VerticalPadding Component - W3F Framework
 *
 * Componente de utilidad para aplicar padding vertical.
 *
 * @example
 * <VerticalPadding size="lg">
 *   <p>Contenido con padding vertical</p>
 * </VerticalPadding>
 */
const VerticalPadding: React.FC<VerticalPaddingProps> = ({
    children,
    size = VERTICAL_PADDING_DEFAULTS.size,
    utilityClass,
    className,
    ...rest
}) => {
    const classNames = buildVerticalPaddingClassNames({
        size,
        utilityClass,
        className,
    });

    return (
        <div className={classNames} {...rest}>
            {children}
        </div>
    );
};

VerticalPadding.displayName = 'VerticalPadding';

export { VerticalPadding };
export default VerticalPadding;
