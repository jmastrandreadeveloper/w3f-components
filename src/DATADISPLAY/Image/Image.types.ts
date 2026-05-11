import type React from 'react';

export type ImageRounded = 'sm' | 'md' | 'lg';
export type ImageShadow = 'sm' | 'md' | 'lg' | 'xl';
export type ImageFilter = 'grayscale' | 'sepia' | 'opacity';
export type ImageHoverEffect = 'zoom' | 'lift';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    rounded?: ImageRounded;
    circle?: boolean;
    border?: boolean;
    shadow?: ImageShadow;
    filter?: ImageFilter;
    hoverEffect?: ImageHoverEffect;
    className?: string;
    wrapperClassName?: string;
    width?: number;
    height?: number;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
}
