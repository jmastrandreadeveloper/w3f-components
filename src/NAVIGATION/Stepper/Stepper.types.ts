import type React from 'react';

// ─── Tipos base ─────────────────────────────────────────────────────────────
export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperColor =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';

// ─── StepConnector ──────────────────────────────────────────────────────────
export interface StepConnectorProps extends React.HTMLAttributes<HTMLSpanElement> {
    className?: string;
    _orientation?: StepperOrientation;
    _active?: boolean;
    _completed?: boolean;
    _alternativeLabel?: boolean;
}

// ─── StepIcon (interno) ─────────────────────────────────────────────────────
export interface StepIconProps {
    index: number;
    active: boolean;
    completed: boolean;
    error: boolean;
}

export interface CustomStepIconProps {
    active: boolean;
    completed: boolean;
    error: boolean;
    icon: number;
}

// ─── StepLabel ──────────────────────────────────────────────────────────────
export interface StepLabelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    children?: React.ReactNode;
    optional?: React.ReactNode;
    icon?: React.ReactNode;
    error?: boolean;
    StepIconComponent?: React.ComponentType<CustomStepIconProps>;
    onClick?: (event: React.SyntheticEvent, index: number) => void;
    className?: string;
    _active?: boolean;
    _completed?: boolean;
    _disabled?: boolean;
    _index?: number;
    _alternativeLabel?: boolean;
    _nonLinear?: boolean;
}

// ─── StepContent ────────────────────────────────────────────────────────────
export interface StepContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    transitionDuration?: number;
    className?: string;
    _active?: boolean;
    _last?: boolean;
}

// ─── Step ────────────────────────────────────────────────────────────────────
export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
    active?: boolean;
    completed?: boolean;
    disabled?: boolean;
    index?: number;
    last?: boolean;
    children?: React.ReactNode;
    className?: string;
    _orientation?: StepperOrientation;
    _alternativeLabel?: boolean;
    _color?: StepperColor;
    _nonLinear?: boolean;
    _connector?: React.ReactNode;
}

// ─── Stepper ─────────────────────────────────────────────────────────────────
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
    activeStep?: number;
    children?: React.ReactNode;
    orientation?: StepperOrientation;
    alternativeLabel?: boolean;
    nonLinear?: boolean;
    connector?: React.ReactElement | null;
    color?: StepperColor;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    className?: string;
}
