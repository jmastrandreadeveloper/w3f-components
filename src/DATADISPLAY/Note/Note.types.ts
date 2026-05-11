import type React from 'react';

export type NoteType = 'info' | 'success' | 'warning' | 'danger';
export type NoteRound = boolean | 'sm' | 'md' | 'lg' | 'xl';
export type NoteShadow = boolean | 'sm' | 'md' | 'lg';
export type NoteBorderSide = 'left' | 'right' | 'top' | 'bottom';
export type NoteVariant = 'solid' | 'outlined' | 'ghost' | 'soft';

export interface NoteProps {
    children: React.ReactNode;
    type?: NoteType;
    variant?: NoteVariant;
    round?: NoteRound;
    shadow?: NoteShadow;
    border?: NoteBorderSide | NoteBorderSide[];
    fullBorder?: boolean;
    className?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
    icon?: React.ReactNode;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
    [key: string]: unknown;
}
