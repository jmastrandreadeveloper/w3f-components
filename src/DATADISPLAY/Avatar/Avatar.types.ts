import type React from 'react';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

export type AvatarColor =
  | 'red' | 'pink' | 'purple' | 'deep-purple' | 'indigo' | 'blue'
  | 'light-blue' | 'cyan' | 'teal' | 'green' | 'light-green'
  | 'lime' | 'yellow' | 'amber' | 'orange' | 'brown' | 'gray';

export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  color?: AvatarColor;
  status?: AvatarStatus;
  badge?: number;
  hoverable?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Nombre del campo para integración con Form/LiveForm */
  name?: string;
  /** Callback cuando cambia la imagen (URL o dataURL) */
  onChange?: (value: string) => void;
  /**
   * Activa modo upload: al hacer clic abre el selector de archivos.
   * El valor resultante (dataURL) se sincroniza con Form/LiveForm si `name` está definido.
   */
  uploadable?: boolean;
  /** Tipos de archivo aceptados cuando uploadable=true */
  accept?: string;
  /** When true, strips visual styles — compose appearance via trait classes. */
  unstyled?: boolean;
  /** Bridge binding ID — connects this component to business logic via the Bridge. */
  bindId?: string;
}

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  className?: string;
}
