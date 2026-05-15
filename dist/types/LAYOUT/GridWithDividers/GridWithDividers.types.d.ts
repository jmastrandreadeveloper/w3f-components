import type React from 'react';
export type DividerOrientation = 'vertical' | 'horizontal';
export type DividerPosition = 'left' | 'right' | 'top' | 'bottom';
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
export interface GridWithDividersProps {
    children: React.ReactNode;
    templateColumns?: string;
    templateRows?: string;
    templateAreas?: string;
    gap?: string;
    dividers?: DividerConfig[];
    style?: React.CSSProperties;
}
export interface DividerProps {
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    isDragging?: boolean;
    orientation?: DividerOrientation;
    position?: DividerPosition;
    className?: string;
}
export interface SliderControlProps {
    label: string;
    configKey: string;
    config: {
        minSize: number;
        maxSize: number;
    };
    onLimitChange: (key: string, prop: string, value: string) => void;
    min: number;
    max: number;
    step?: number;
}
export interface GridDividerState {
    size: number;
    isDragging: boolean;
    handleMouseDown: (e: React.MouseEvent, inverted?: boolean) => void;
    setSize: React.Dispatch<React.SetStateAction<number>>;
    reset: () => void;
}
//# sourceMappingURL=GridWithDividers.types.d.ts.map