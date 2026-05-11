import type React from 'react';

export type SpinnerColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface BackdropProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  open: boolean;
  children?: React.ReactNode;
  invisible?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  transitionDuration?: number;
  className?: string;
  sx?: React.CSSProperties;
  component?: React.ElementType;
  showSpinner?: boolean;
  spinnerColor?: SpinnerColor;
  spinnerSize?: SpinnerSize | number;
}

export interface UseBackdropResult {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
