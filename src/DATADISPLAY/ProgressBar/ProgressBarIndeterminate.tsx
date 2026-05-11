import React from 'react';
import type { ProgressBarIndeterminateProps } from './ProgressBar.types';
import { PROGRESS_BAR_INDETERMINATE_DEFAULTS } from './ProgressBar.constants';
import { getProgressBgClass, getSizeClass } from './ProgressBar.utils';

const ProgressBarIndeterminate: React.FC<ProgressBarIndeterminateProps> = ({
    color = PROGRESS_BAR_INDETERMINATE_DEFAULTS.color,
    ariaLabel = PROGRESS_BAR_INDETERMINATE_DEFAULTS.ariaLabel,
    size = PROGRESS_BAR_INDETERMINATE_DEFAULTS.size,
    variant = PROGRESS_BAR_INDETERMINATE_DEFAULTS.variant
}) => {
    const barBgClass = getProgressBgClass(color);
    const sizeClass = getSizeClass(size);

    const animationClass = variant === 'pulse'
        ? 'w3f-indeterminate-animation-pulse'
        : 'w3f-indeterminate-animation';

    return (
        <div
            className={`${sizeClass} w3f-indeterminate-bar w3f-bg-gray-200`}
            role="progressbar"
            aria-label={ariaLabel}
            aria-valuenow={undefined}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-busy="true"
        >
            <div
                className={`${animationClass} ${barBgClass}`}
                aria-hidden="true"
            />
        </div>
    );
};

ProgressBarIndeterminate.displayName = 'ProgressBarIndeterminate';

export { ProgressBarIndeterminate };
export default ProgressBarIndeterminate;
