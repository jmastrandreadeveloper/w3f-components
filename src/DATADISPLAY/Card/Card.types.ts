import type React from 'react';
import type { BadgeProps } from '../Badge/Badge.types';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type CardSize = 'sm' | 'md' | 'lg';
export type CardImagePosition = 'top' | 'bottom' | 'left' | 'right';
export type CardActionsAlign = 'start' | 'center' | 'end' | 'space-between';

export interface CardButtonProps {
  text?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'raised' | 'outlined' | 'flat' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  key?: string;
}

export interface CardBadgeConfig extends Omit<BadgeProps, 'children'> {
  children?: React.ReactNode;
  content?: React.ReactNode;
}

export interface CardProps {
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: CardImagePosition;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  buttons?: CardButtonProps[];
  variant?: CardVariant;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  actionsClassName?: string;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  badge?: CardBadgeConfig | React.ReactNode | string | number;
  size?: CardSize;
  actionsAlign?: CardActionsAlign;
  layoutStyle?: React.CSSProperties;
  actionAreaContent?: React.ReactNode;
  customContent?: React.ReactNode;
  headerExtra?: React.ReactNode;
  /** When true, strips visual styles — compose appearance via trait classes. */
  unstyled?: boolean;
  /** Bridge binding ID — connects this component to business logic via the Bridge. */
  bindId?: string;
}
