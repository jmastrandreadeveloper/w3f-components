export type SpinnerMode = 'indeterminate' | 'determinate';
export type SpinnerSizeName = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColorName = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'gray';

export interface ProgressSpinnerProps {
    mode?: SpinnerMode;
    value?: number;
    strokeWidth?: number;
    size?: number | SpinnerSizeName;
    /** @deprecated Usar `size` en su lugar */
    diameter?: number;
    color?: SpinnerColorName | string;
    ariaLabel?: string;
    className?: string;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
}
