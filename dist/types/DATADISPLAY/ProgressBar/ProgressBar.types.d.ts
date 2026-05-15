export type ProgressBarSize = 'sm' | 'md' | 'lg';
export type ProgressBarColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export interface ProgressBarProps {
    progress: number;
    color?: ProgressBarColor;
    showLabel?: boolean;
    label?: string;
    ariaLabel?: string;
    size?: ProgressBarSize;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
}
export interface ProgressBarBufferProps {
    progress: number;
    buffer: number;
    progressColor?: ProgressBarColor;
    bufferColor?: ProgressBarColor;
    showLabel?: boolean;
    label?: string;
    ariaLabel?: string;
    size?: ProgressBarSize;
}
export type ProgressBarIndeterminateVariant = 'slide' | 'pulse';
export interface ProgressBarIndeterminateProps {
    color?: ProgressBarColor;
    ariaLabel?: string;
    size?: ProgressBarSize;
    variant?: ProgressBarIndeterminateVariant;
}
//# sourceMappingURL=ProgressBar.types.d.ts.map