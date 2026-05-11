import type { Card2Variant, Card2Size, Card2ActionsAlign } from './Card_2.types';
import { CARD2_CLASSES } from './Card_2.constants';

export function buildCard2Classes(
  variant:   Card2Variant,
  size:      Card2Size,
  hoverable: boolean,
  clickable: boolean,
  hasClick:  boolean,
  fullWidth: boolean,
  layoutName: string | undefined,
  unstyled?: boolean,
  className?: string,
): string {
  const base = CARD2_CLASSES.root;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
  return [
    base,
    CARD2_CLASSES.layout,
    `w3f-card--${variant}`,
    `w3f-card--${size}`,
    hoverable               ? CARD2_CLASSES.hoverable : '',
    clickable || hasClick   ? CARD2_CLASSES.clickable  : '',
    fullWidth               ? CARD2_CLASSES.fullWidth  : '',
    layoutName              ? `w3f-card-layout--${layoutName}` : '',
    className,
  ].filter(Boolean).join(' ');
}

export function buildCard2ActionsClasses(
  actionsAlign: Card2ActionsAlign,
): string {
  return [CARD2_CLASSES.slotActions, `w3f-card-actions--${actionsAlign}`].filter(Boolean).join(' ');
}
