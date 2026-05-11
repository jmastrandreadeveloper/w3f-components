import React, { forwardRef } from 'react';
import type { CardProps } from './Card.types';
import { CARD_DEFAULTS } from './Card.constants';
import { buildCardClasses, buildHeaderClasses, buildContentClasses, buildActionsClasses } from './Card.utils';
import Badge from '../../DATADISPLAY/Badge/Badge';
import Button from '../../INPUTS/Button/Button';
import { sanitizeUrl } from '../../utils/sanitizeUrl';
import { useBridgeBind } from '@w3f/bridge';

const Card = forwardRef<HTMLDivElement, CardProps>(({
  imageSrc,
  imageAlt = CARD_DEFAULTS.imageAlt,
  imagePosition = CARD_DEFAULTS.imagePosition,
  title,
  subtitle,
  content,
  actions,
  buttons = CARD_DEFAULTS.buttons as unknown as CardProps['buttons'],
  variant = CARD_DEFAULTS.variant,
  hoverable = CARD_DEFAULTS.hoverable,
  clickable = CARD_DEFAULTS.clickable,
  onClick,
  className = CARD_DEFAULTS.className,
  headerClassName = CARD_DEFAULTS.headerClassName,
  contentClassName = CARD_DEFAULTS.contentClassName,
  actionsClassName = CARD_DEFAULTS.actionsClassName,
  style,
  fullWidth = CARD_DEFAULTS.fullWidth,
  badge,
  size = CARD_DEFAULTS.size,
  actionsAlign = CARD_DEFAULTS.actionsAlign,
  layoutStyle,
  actionAreaContent,
  customContent,
  headerExtra,
  unstyled = CARD_DEFAULTS.unstyled,
  bindId,
}, ref) => {
  const { dispatch } = useBridgeBind({ bindId });
  const layoutMode = !!layoutStyle;
  const cardClasses = buildCardClasses(variant, size, imagePosition, hoverable, clickable, !!onClick, fullWidth, layoutMode, className, unstyled);
  const mergedStyle = layoutStyle ? { ...layoutStyle, ...style } : style;
  const headerClasses = buildHeaderClasses(headerClassName);
  const contentClasses = buildContentClasses(contentClassName);
  const actionsClasses = buildActionsClasses(actionsAlign, actionsClassName);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const isInteractiveElement = target.closest('button, a, input, textarea, select');
    if (onClick && !isInteractiveElement) {
      onClick(e);
      dispatch('click');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  const interactiveProps = (clickable || onClick) ? {
    role: 'button' as const,
    tabIndex: 0,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    'aria-pressed': false,
  } : {};

  const renderImage = () => {
    if (!imageSrc) return null;
    return (
      <img
        src={sanitizeUrl(imageSrc)}
        alt={imageAlt}
        className="w3f-card-image"
        loading="lazy"
      />
    );
  };

  const renderHeader = () => {
    if (!title && !subtitle && !headerExtra) return null;
    return (
      <header className={headerClasses}>
        {title && <h3 className="w3f-card-title">{title}</h3>}
        {subtitle && <p className="w3f-card-subtitle">{subtitle}</p>}
        {headerExtra && <div className="w3f-card-header-extra">{headerExtra}</div>}
      </header>
    );
  };

  const renderContent = () => {
    if (!content) return null;
    return (
      <div className={contentClasses}>
        {content}
      </div>
    );
  };

  const renderActions = () => {
    if (!actions && (!buttons || buttons.length === 0)) return null;
    return (
      <div className={actionsClasses}>
        {actions && actions}
        {!actions && buttons.length > 0 && buttons.map((buttonProps, index) => {
          const { key, ...restButtonProps } = buttonProps;
          return (
            <Button
              key={key || `card-button-${index}`}
              {...restButtonProps}
            />
          );
        })}
      </div>
    );
  };

  const renderActionArea = () => {
    if (!actionAreaContent) return null;
    return <div className="w3f-card-action-area">{actionAreaContent}</div>;
  };

  const renderCustom = () => {
    if (!customContent) return null;
    return <div className="w3f-card-custom">{customContent}</div>;
  };

  const renderBadge = () => {
    if (!badge) return null;

    if (typeof badge === 'object' && !React.isValidElement(badge)) {
      const {
        children: badgeChildren,
        content: badgeContent,
        ...badgeRestProps
      } = badge as { children?: React.ReactNode; content?: React.ReactNode; [key: string]: unknown };

      const finalContent = badgeChildren !== undefined ? badgeChildren : badgeContent;

      return (
        <div className="w3f-card-badge">
          <Badge {...badgeRestProps}>
            {finalContent}
          </Badge>
        </div>
      );
    }

    if (React.isValidElement(badge)) {
      return (
        <div className="w3f-card-badge">
          {badge}
        </div>
      );
    }

    return (
      <div className="w3f-card-badge">
        <Badge color="primary" size="md">
          {badge as React.ReactNode}
        </Badge>
      </div>
    );
  };

  // Layout mode: always render flat (grid-area children), ignore imagePosition
  if (layoutMode) {
    return (
      <div ref={ref} className={cardClasses} style={mergedStyle} {...interactiveProps}>
        {renderBadge()}
        {renderImage()}
        {renderHeader()}
        {renderContent()}
        {renderActions()}
        {renderActionArea()}
        {renderCustom()}
      </div>
    );
  }

  if (imagePosition === 'left' || imagePosition === 'right') {
    return (
      <div ref={ref} className={cardClasses} style={mergedStyle} {...interactiveProps}>
        {renderBadge()}
        {imagePosition === 'left' && renderImage()}
        <div className="w3f-card-body">
          {renderHeader()}
          {renderContent()}
          {renderActions()}
          {renderActionArea()}
          {renderCustom()}
        </div>
        {imagePosition === 'right' && renderImage()}
      </div>
    );
  }

  return (
    <div ref={ref} className={cardClasses} style={mergedStyle} {...interactiveProps}>
      {renderBadge()}
      {imagePosition === 'top' && renderImage()}
      {renderHeader()}
      {renderContent()}
      {imagePosition === 'bottom' && renderImage()}
      {renderActions()}
      {renderActionArea()}
      {renderCustom()}
    </div>
  );
});

Card.displayName = 'Card';

export { Card };
export default Card;
