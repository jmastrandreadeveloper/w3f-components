import React from 'react';
import type { SliderControlProps } from './GridWithDividers.types';

/**
 * SliderControl - Control para modificar los límites min/max de un divisor.
 */
const SliderControl: React.FC<SliderControlProps> = ({
    label,
    configKey,
    config,
    onLimitChange,
    min,
    max,
    step = 10,
}) => (
    <div style={{ marginBottom: '12px', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '8px', color: '#1f2937' }}>
            {label}
        </h4>
        <div style={{ marginBottom: '8px' }}>
            <label style={{ fontSize: '12px', color: '#4b5563', display: 'block' }}>
                Mínimo: {config.minSize}px
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={config.minSize}
                onChange={(e) => onLimitChange(configKey, 'minSize', e.target.value)}
                style={{ width: '100%' }}
            />
        </div>
        <div>
            <label style={{ fontSize: '12px', color: '#4b5563', display: 'block' }}>
                Máximo: {config.maxSize}px
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={config.maxSize}
                onChange={(e) => onLimitChange(configKey, 'maxSize', e.target.value)}
                style={{ width: '100%' }}
            />
        </div>
    </div>
);

SliderControl.displayName = 'SliderControl';

export { SliderControl };
export default SliderControl;
