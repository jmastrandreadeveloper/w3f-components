import React, { forwardRef, useRef } from 'react';
import type { AvatarProps, AvatarGroupProps } from './Avatar.types';
import { buildAvatarClasses } from './Avatar.utils';
import { useAvatarForm } from './Avatar.hooks';
import { AVATAR_DEFAULTS } from './Avatar.constants';
import { sanitizeUrl } from '../../utils/sanitizeUrl';
import { useBridgeBind } from '@w3f/bridge';

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({
  src,
  alt = AVATAR_DEFAULTS.alt,
  size = AVATAR_DEFAULTS.size,
  color = AVATAR_DEFAULTS.color,
  status,
  badge,
  hoverable = AVATAR_DEFAULTS.hoverable,
  uploadable = AVATAR_DEFAULTS.uploadable,
  accept = 'image/*',
  unstyled = AVATAR_DEFAULTS.unstyled,
  className = AVATAR_DEFAULTS.className,
  children,
  onClick,
  name,
  onChange,
  bindId,
  ...rest
}, ref) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isFormControlled, formValue, setFormValue } = useAvatarForm(name);
  const { dispatch } = useBridgeBind({ bindId });

  // Si está controlado por Form y no se pasa src explícito, usar el valor del form
  const effectiveSrc = src ?? (isFormControlled ? formValue : undefined);
  const safeSrc = sanitizeUrl(effectiveSrc);

  const avatarClasses = buildAvatarClasses(
    size,
    hoverable || uploadable,
    safeSrc,
    color,
    className,
    unstyled,
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch('click');
    if (uploadable && fileInputRef.current) {
      fileInputRef.current.click();
    }
    onClick?.(e);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

    if (!ALLOWED_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setFormValue(dataUrl);
      onChange?.(dataUrl);
    };
    reader.readAsDataURL(file);
    // Limpiar input para permitir re-selección del mismo archivo
    e.target.value = '';
  };

  const avatarContent = safeSrc ? (
    <img src={safeSrc} alt={alt} className="w3f-avatar-img" />
  ) : (
    <span className="w3f-avatar-text">{children || '?'}</span>
  );

  const avatarElement = (
    <div
      ref={ref}
      className={avatarClasses}
      onClick={handleClick}
      role={onClick || uploadable ? 'button' : undefined}
      tabIndex={onClick || uploadable ? 0 : undefined}
      aria-label={uploadable ? `${alt} – clic para cambiar imagen` : undefined}
      {...rest}
    >
      {avatarContent}
      {uploadable && (
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          aria-hidden="true"
        />
      )}
    </div>
  );

  if (status || badge !== undefined) {
    return (
      <div className="w3f-avatar-wrapper">
        {avatarElement}
        {status && (
          <span
            className={`w3f-avatar-status w3f-avatar-status-${status}`}
            aria-label={`Estado: ${status}`}
          />
        )}
        {badge !== undefined && (
          <span className="w3f-avatar-badge">{badge > 99 ? '99+' : badge}</span>
        )}
      </div>
    );
  }

  return avatarElement;
});

Avatar.displayName = 'Avatar';

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(({ children, max = 5, className = '' }, ref) => {
  const childrenArray = React.Children.toArray(children);
  const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const extraCount = max && childrenArray.length > max ? childrenArray.length - max : 0;

  return (
    <div ref={ref} className={`w3f-avatar-group ${className}`}>
      {visibleChildren}
      {extraCount > 0 && (
        <Avatar color="gray" size="medium">
          +{extraCount}
        </Avatar>
      )}
    </div>
  );
});

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarGroup };
export default Avatar;
