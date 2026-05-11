import React, { forwardRef } from 'react';
import type { ImageProps } from './Image.types';
import { IMAGE_DEFAULTS } from './Image.constants';
import { buildImageClasses } from './Image.utils';
import { sanitizeUrl } from '../../utils/sanitizeUrl';
import { useBridgeBind } from '@w3f/bridge';

const Image = forwardRef<HTMLDivElement, ImageProps>(({
    src,
    alt,
    rounded,
    circle = IMAGE_DEFAULTS.circle,
    border = IMAGE_DEFAULTS.border,
    shadow,
    filter,
    hoverEffect,
    unstyled = IMAGE_DEFAULTS.unstyled,
    className = IMAGE_DEFAULTS.className,
    wrapperClassName = IMAGE_DEFAULTS.wrapperClassName,
    width,
    height,
    bindId,
    ...rest
}, ref) => {
    useBridgeBind({ bindId });
    const imageClasses = buildImageClasses(circle, rounded, border, shadow, filter, hoverEffect, unstyled, className);

    return (
        <div ref={ref} className={`w3f-image-wrapper ${wrapperClassName}`}>
            <img
                src={sanitizeUrl(src)}
                alt={alt}
                width={width}
                height={height}
                className={imageClasses}
                {...rest}
            />
        </div>
    );
});

Image.displayName = 'Image';

export { Image };
export default Image;
