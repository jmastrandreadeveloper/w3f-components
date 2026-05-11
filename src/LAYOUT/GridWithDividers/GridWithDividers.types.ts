import type React from 'react';

// ─── Divider orientation ──────────────────────────────────────────
export type DividerOrientation = 'vertical' | 'horizontal';
export type DividerPosition = 'left' | 'right' | 'top' | 'bottom';

// ─── Divider config ───────────────────────────────────────────────
export interface DividerConfig {
    initialSize?: number;
    minSize?: number;
    maxSize?: number;
    orientation?: DividerOrientation;
    columnIndex?: number;
    rowIndex?: number;
    between?: [string, string];
    position?: DividerPosition;
}

// ─── Props del componente GridWithDividers ─────────────────────────
export interface GridWithDividersProps {
    children: React.ReactNode;
    templateColumns?: string;
    templateRows?: string;
    templateAreas?: string;
    gap?: string;
    dividers?: DividerConfig[];
    style?: React.CSSProperties;
}

// ─── Props del componente Divider ─────────────────────────────────
export interface DividerProps {
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    isDragging?: boolean;
    orientation?: DividerOrientation;
    position?: DividerPosition;
    className?: string;
}

// ─── Props del componente SliderControl ───────────────────────────
export interface SliderControlProps {
    label: string;
    configKey: string;
    config: { minSize: number; maxSize: number };
    onLimitChange: (key: string, prop: string, value: string) => void;
    min: number;
    max: number;
    step?: number;
}

// ─── Hook return type ─────────────────────────────────────────────
export interface GridDividerState {
    size: number;
    isDragging: boolean;
    handleMouseDown: (e: React.MouseEvent, inverted?: boolean) => void;
    setSize: React.Dispatch<React.SetStateAction<number>>;
    reset: () => void;
}
