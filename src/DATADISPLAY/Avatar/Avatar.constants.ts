import type { AvatarSize, AvatarColor } from './Avatar.types';

export const AVATAR_SIZE_CLASSES: Record<AvatarSize, string> = {
  small: 'w3f-avatar-small',
  medium: 'w3f-avatar-medium',
  large: 'w3f-avatar-large',
  xlarge: 'w3f-avatar-xlarge',
};

export const AVATAR_DEFAULTS = {
  size: 'medium' as AvatarSize,
  color: 'gray' as AvatarColor,
  alt: 'Avatar',
  hoverable: false,
  uploadable: false,
  unstyled: false,
  className: '',
} as const;
