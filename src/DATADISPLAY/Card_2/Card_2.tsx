import React, { forwardRef } from 'react';
import type { Card2Props } from './Card_2.types';
import { CARD2_DEFAULTS } from './Card_2.constants';
import { buildCard2Classes, buildCard2ActionsClasses } from './Card_2.utils';
import Badge from '../Badge/Badge';
import Button from '../../INPUTS/Button/Button';
import { sanitizeUrl } from '../../utils/sanitizeUrl';

/**
 * Card_2 — composition-first card powered by CSS Grid.
 *
 * Unlike Card (flex-based, fixed slot order), Card_2 always renders as a CSS
 * Grid and maps each slot to a named grid area via .w3f-slot-* classes.
 * The layout is controlled by:
 *   - `layoutName`  → applies .w3f-card-layout--{name} (output of CardBuilder)
 *   - `layoutStyle` → inline CSS vars (--w3f-areas / --w3f-cols / --w3f-rows / --w3f-gap)
 *
 * Visual theming (variant, hover, size) is identical to Card.
 * `imagePosition` is removed — position is determined by the grid layout.
 */
const Card_2 = forwardRef<HTMLDivElement, Card2Props>(({
  layoutName,
  layoutStyle,
  variant      = CARD2_DEFAULTS.variant,
  size         = CARD2_DEFAULTS.size,
  hoverable    = CARD2_DEFAULTS.hoverable,
  clickable    = CARD2_DEFAULTS.clickable,
  onClick,
  unstyled     = CARD2_DEFAULTS.unstyled,
  className    = CARD2_DEFAULTS.className,
  style,
  fullWidth    = CARD2_DEFAULTS.fullWidth,
  badge,
  title,
  subtitle,
  headerExtra,
  imageSrc,
  imageAlt     = CARD2_DEFAULTS.imageAlt,
  content,
  actions,
  buttons      = [],
  actionsAlign = CARD2_DEFAULTS.actionsAlign,
  actionAreaContent,
  customContent,
}, ref) => {
  const cardClasses = buildCard2Classes(
    variant, size, hoverable, clickable, !!onClick, fullWidth, layoutName, unstyled, className,
  );

  // layoutStyle provides CSS vars; style is additional overrides
  const mergedStyle: React.CSSProperties | undefined =
    layoutStyle ? { ...layoutStyle, ...style } : style;

  // ── Interaction ─────────────────────────────────────────────────────────────

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (onClick && !target.closest('button, a, input, textarea, select')) {
      onClick(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  const interactiveProps = (clickable || onClick)
    ? { role: 'button' as const, tabIndex: 0, onClick: handleClick, onKeyDown: handleKeyDown, 'aria-pressed': false as const }
    : {};

  // ── Slot renderers ───────────────────────────────────────────────────────────

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
          <Badge {...badgeRestProps}>{finalContent}</Badge>
        </div>
      );
    }

    if (React.isValidElement(badge)) {
      return <div className="w3f-card-badge">{badge}</div>;
    }

    return (
      <div className="w3f-card-badge">
        <Badge color="primary" size="md">{badge as React.ReactNode}</Badge>
      </div>
    );
  };

  const renderHeader = () => {
    if (!title && !subtitle && !headerExtra) return null;
    return (
      <header className="w3f-slot-header">
        {title    && <h3 className="w3f-card-title">{title}</h3>}
        {subtitle && <p  className="w3f-card-subtitle">{subtitle}</p>}
        {headerExtra && <div className="w3f-card-header-extra">{headerExtra}</div>}
      </header>
    );
  };

  const renderMedia = () => {
    if (!imageSrc) return null;
    return (
      <div className="w3f-slot-media">
        <img
          src={sanitizeUrl(imageSrc)}
          alt={imageAlt}
          className="w3f-card-image"
          loading="lazy"
        />
      </div>
    );
  };

  const renderContent = () => {
    if (!content) return null;
    return <div className="w3f-slot-content">{content}</div>;
  };

  const renderActions = () => {
    if (!actions && (!buttons || buttons.length === 0)) return null;
    const actionsClasses = buildCard2ActionsClasses(actionsAlign);
    return (
      <div className={actionsClasses}>
        {actions}
        {!actions && buttons.map((buttonProps, index) => {
          const { key, ...rest } = buttonProps;
          return <Button key={key || `c2-btn-${index}`} {...rest} />;
        })}
      </div>
    );
  };

  const renderActionArea = () => {
    if (!actionAreaContent) return null;
    return <div className="w3f-slot-action-area">{actionAreaContent}</div>;
  };

  const renderCustom = () => {
    if (!customContent) return null;
    return <div className="w3f-slot-custom">{customContent}</div>;
  };

  return (
    <div ref={ref} className={cardClasses} style={mergedStyle} {...interactiveProps}>
      {renderBadge()}
      {renderHeader()}
      {renderMedia()}
      {renderContent()}
      {renderActions()}
      {renderActionArea()}
      {renderCustom()}
    </div>
  );
});

Card_2.displayName = 'Card_2';

export { Card_2 };
export default Card_2;
