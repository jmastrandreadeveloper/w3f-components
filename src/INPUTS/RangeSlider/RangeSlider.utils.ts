export function snapToStep(value: number, step: number): number {
    return Math.round(value / step) * step;
}

export function getPercent(value: number, min: number, max: number): number {
    return Math.round(((value - min) / (max - min)) * 100);
}

export function defaultFormatLabel(value: number): string | number {
    return value;
}
