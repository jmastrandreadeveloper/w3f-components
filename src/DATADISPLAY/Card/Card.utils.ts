import type { CardVariant, CardSize, CardImagePosition, CardActionsAlign } from './Card.types';

export function buildCardClasses(
  variant: CardVariant,
  size: CardSize,
  imagePosition: CardImagePosition,
  hoverable: boolean,
  clickable: boolean,
  onClick: boolean,
  fullWidth: boolean,
  layoutMode: boolean,
  className: string,
  unstyled?: boolean,
): string {
  if (unstyled) {
    return [
      'w3f-card',
      'w3f-card--unstyled',
      imagePosition === 'left' || imagePosition === 'right' ? 'w3f-card--horizontal' : '',
      fullWidth ? 'w3f-card--full-width' : '',
      layoutMode ? 'w3f-card--layout' : '',
      className,
    ].filter(Boolean).join(' ');
  }

  return [
    'w3f-card',
    `w3f-card--${variant}`,
    `w3f-card--${size}`,
    imagePosition === 'left' || imagePosition === 'right' ? 'w3f-card--horizontal' : '',
    hoverable ? 'w3f-card--hoverable' : '',
    clickable || onClick ? 'w3f-card--clickable' : '',
    fullWidth ? 'w3f-card--full-width' : '',
    layoutMode ? 'w3f-card--layout' : '',
    className,
  ].filter(Boolean).join(' ');
}

export function buildHeaderClasses(headerClassName: string): string {
  return ['w3f-card-header', headerClassName].filter(Boolean).join(' ');
}

export function buildContentClasses(contentClassName: string): string {
  return ['w3f-card-content', contentClassName].filter(Boolean).join(' ');
}

export function buildActionsClasses(actionsAlign: CardActionsAlign, actionsClassName: string): string {
  return [
    'w3f-card-actions',
    `w3f-card-actions--${actionsAlign}`,
    actionsClassName,
  ].filter(Boolean).join(' ');
}
