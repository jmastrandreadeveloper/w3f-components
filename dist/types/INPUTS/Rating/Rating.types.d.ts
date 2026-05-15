export type RatingIconType = 'star' | 'heart' | 'smiley';
export type RatingSize = 'small' | 'medium' | 'large';
export type RatingVariant = 'solid' | 'outlined' | 'ghost' | 'soft';
export interface RatingProps {
    name?: string;
    defaultValue?: number;
    value?: number;
    max?: number;
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: (value: number) => void;
    onHoverChange?: (value: number) => void;
    iconType?: RatingIconType;
    precision?: 1 | 0.5;
    size?: RatingSize;
    showValue?: boolean;
    allowClear?: boolean;
    labels?: string[];
    error?: string;
    helperText?: string;
    required?: boolean;
    label?: string;
    className?: string;
    variant?: RatingVariant;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
}
//# sourceMappingURL=Rating.types.d.ts.map