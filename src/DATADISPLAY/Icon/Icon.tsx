import React, { forwardRef } from 'react';
import useIcon from './Icon.hooks';
import type { IconProps } from './Icon.types';
import { IconDefaults } from './Icon.constants';
import { buildIconClasses } from './Icon.utils';
import { useBridgeBind } from '@w3f/bridge';

const Icon = forwardRef<HTMLSpanElement, IconProps>(({ name, size, color, className, unstyled = IconDefaults.unstyled, bindId }, ref) => {
    useBridgeBind({ bindId });
    const { LucideIcon, size: finalSize, color: finalColor, className: finalClassName, name: resolvedName } = useIcon({ name, size, color, className });

    if (!LucideIcon) {
        console.warn(`Icono no encontrado: ${resolvedName || name}`);
        return <span ref={ref} className="w3f-text-sm w3f-text-gray">{resolvedName || name}</span>;
    }

    const wrapperClasses = buildIconClasses(unstyled, finalClassName);

    return (
        <span
            ref={ref}
            className={wrapperClasses}
            style={{ lineHeight: 0 }}
            aria-hidden="true"
            role="img"
        >
            <LucideIcon
                size={finalSize}
                color={finalColor}
                strokeWidth={2}
            />
        </span>
    );
});

Icon.displayName = 'Icon';

export { Icon };
export default Icon;
