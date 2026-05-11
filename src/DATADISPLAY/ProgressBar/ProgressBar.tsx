import React, { forwardRef } from 'react';
import type { ProgressBarProps } from './ProgressBar.types';
import { PROGRESS_BAR_DEFAULTS } from './ProgressBar.constants';
import { clampProgress, getProgressBgClass, buildProgressBarClasses } from './ProgressBar.utils';
import { useBridgeBind } from '@w3f/bridge';

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(({
    progress,
    color = PROGRESS_BAR_DEFAULTS.color,
    showLabel = PROGRESS_BAR_DEFAULTS.showLabel,
    label,
    ariaLabel,
    size = PROGRESS_BAR_DEFAULTS.size,
    unstyled = PROGRESS_BAR_DEFAULTS.unstyled,
    bindId,
}, ref) => {
    useBridgeBind({ bindId, value: progress });
    const validatedProgress = clampProgress(progress);
    const progressBgClass = getProgressBgClass(color);
    const displayText = label || `${validatedProgress}%`;

    return (
        <div
            ref={ref}
            className={buildProgressBarClasses(size, unstyled)}
            role="progressbar"
            aria-valuenow={validatedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={ariaLabel || `Progreso: ${validatedProgress}%`}
        >
            <div
                className={`w3f-progress-bar-fill ${progressBgClass}`}
                style={{ width: `${validatedProgress}%` }}
            >
                {showLabel && validatedProgress > 0 && (
                    <span className="w3f-progress-bar-text w3f-text-on-primary">
                        {displayText}
                    </span>
                )}
            </div>
        </div>
    );
});

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };
export default ProgressBar;
