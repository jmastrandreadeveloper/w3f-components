import React from 'react';
import type { ProgressBarBufferProps } from './ProgressBar.types';
import { PROGRESS_BAR_BUFFER_DEFAULTS } from './ProgressBar.constants';
import { clampProgress, getProgressBgClass, getSizeClass } from './ProgressBar.utils';

const ProgressBarBuffer: React.FC<ProgressBarBufferProps> = ({
    progress,
    buffer,
    progressColor = PROGRESS_BAR_BUFFER_DEFAULTS.progressColor,
    bufferColor = PROGRESS_BAR_BUFFER_DEFAULTS.bufferColor,
    showLabel = PROGRESS_BAR_BUFFER_DEFAULTS.showLabel,
    label,
    ariaLabel,
    size = PROGRESS_BAR_BUFFER_DEFAULTS.size
}) => {
    const validatedProgress = clampProgress(progress);
    const validatedBuffer = clampProgress(buffer);

    // Aseguramos que el buffer sea mayor o igual al progreso
    const finalBuffer = Math.max(validatedBuffer, validatedProgress);

    const progressBgClass = getProgressBgClass(progressColor);
    const bufferBgClass = getProgressBgClass(bufferColor);
    const sizeClass = getSizeClass(size);
    const displayText = label || `${validatedProgress}%`;

    return (
        <div
            className={`${sizeClass} w3f-bg-gray-200`}
            role="progressbar"
            aria-valuenow={validatedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={ariaLabel || `Progreso: ${validatedProgress}% (Búfer: ${finalBuffer}%)`}
        >
            {/* Barra de búfer */}
            <div
                className={`w3f-progress-bar-buffer ${bufferBgClass}`}
                style={{ width: `${finalBuffer}%` }}
                aria-hidden="true"
            />

            {/* Barra de progreso principal */}
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
};

ProgressBarBuffer.displayName = 'ProgressBarBuffer';

export { ProgressBarBuffer };
export default ProgressBarBuffer;
