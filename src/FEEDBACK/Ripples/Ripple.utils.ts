export function buildRippleClasses(
  flat: boolean,
  disabled: boolean,
  className?: string
): string {
  return [
    'w3f-ripple-container',
    flat && 'w3f-ripple-flat',
    className,
  ].filter(Boolean).join(' ');
}

export interface RippleDimensions {
  width: number;
  height: number;
  left: number;
  top: number;
}

export function calculateRippleDimensions(
  rect: DOMRect,
  x: number,
  y: number,
  centered: boolean,
  radius?: number
): RippleDimensions {
  let diameter: number;

  if (radius) {
    diameter = radius * 2;
  } else {
    diameter = Math.max(rect.width, rect.height);
  }

  const half = diameter / 2;

  let left: number;
  let top: number;

  if (centered) {
    left = (rect.width - diameter) / 2;
    top = (rect.height - diameter) / 2;
  } else {
    left = x - rect.left - half;
    top = y - rect.top - half;
  }

  return {
    width: diameter,
    height: diameter,
    left,
    top,
  };
}
