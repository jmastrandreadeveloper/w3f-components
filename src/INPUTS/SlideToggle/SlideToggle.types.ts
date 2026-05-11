export type SlideToggleSize = 'sm' | 'md' | 'lg';
export type SlideToggleVariant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';
export type SlideToggleLabelPosition = 'left' | 'right';

export interface SlideToggleSizeConfig {
    width: number;
    height: number;
    handleSize: number;
    maxPosition: number;
}

export interface SlideToggleProps {
    name?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    size?: SlideToggleSize;
    variant?: SlideToggleVariant;
    loading?: boolean;
    label?: string;
    labelPosition?: SlideToggleLabelPosition;
    showIcon?: boolean;
    error?: string;
    helperText?: string;
    className?: string;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
}
