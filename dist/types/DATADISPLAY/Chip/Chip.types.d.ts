import type React from 'react';
export type ChipVariant = 'solid' | 'outlined' | 'ghost' | 'soft';
export interface ChipProps {
    label: string;
    /** Visual variant of the chip */
    variant?: ChipVariant;
    onClose?: () => void;
    disabled?: boolean;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    isFocused?: boolean;
    className?: string;
    style?: React.CSSProperties;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
}
export interface ChipData {
    id: number;
    label: string;
}
export interface InputChipContainerProps {
}
//# sourceMappingURL=Chip.types.d.ts.map