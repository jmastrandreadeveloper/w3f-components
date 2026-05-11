import React, { forwardRef } from 'react';
import type { TooltipProps } from './Tooltip.types';
import { TOOLTIP_DEFAULTS } from './Tooltip.constants';
import { buildTooltipClasses, buildArrowClasses } from './Tooltip.utils';
import { useTooltipVisibility } from './Tooltip.hooks';

/**
 * Componente Tooltip - W3F Framework.
 * Muestra un tooltip configurable al hacer hover sobre un elemento.
 */
const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({ children, config = {}, unstyled = TOOLTIP_DEFAULTS.unstyled }, ref) => {
    const {
        message = TOOLTIP_DEFAULTS.message,
        position = TOOLTIP_DEFAULTS.position,
        showDelay = TOOLTIP_DEFAULTS.showDelay,
        hideDelay = TOOLTIP_DEFAULTS.hideDelay,
        arrow = TOOLTIP_DEFAULTS.arrow,
        variant = TOOLTIP_DEFAULTS.variant,
    } = config;

    const { isVisible, handleMouseEnter, handleMouseLeave } = useTooltipVisibility(showDelay, hideDelay);

    const tooltipClass = buildTooltipClasses(position, variant, isVisible, unstyled);
    const arrowClass = buildArrowClasses(position);

    return (
        <div
            ref={ref}
            className="w3f-tooltip-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            <div className={tooltipClass}>
                {message}
                {arrow && <div className={arrowClass} />}
            </div>
        </div>
    );
});

Tooltip.displayName = 'Tooltip';

export { Tooltip };
export default Tooltip;
