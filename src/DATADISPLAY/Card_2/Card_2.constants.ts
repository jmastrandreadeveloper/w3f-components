import type { Card2Variant, Card2Size, Card2ActionsAlign } from './Card_2.types';

export const CARD2_DEFAULTS = {
  variant:      'default' as Card2Variant,
  size:         'md'      as Card2Size,
  actionsAlign: 'start'   as Card2ActionsAlign,
  hoverable:    false,
  clickable:    false,
  fullWidth:    false,
  unstyled:     false,
  imageAlt:     '',
  className:    '',
} as const;

export const CARD2_CLASSES = {
  // Root
  root:       'w3f-card',
  // Layout base (from _layout-primitive.css)
  layout:     'w3f-layout',
  // Variants
  default:    'w3f-card--default',
  elevated:   'w3f-card--elevated',
  outlined:   'w3f-card--outlined',
  filled:     'w3f-card--filled',
  // Sizes
  sm:         'w3f-card--sm',
  md:         'w3f-card--md',
  lg:         'w3f-card--lg',
  fullWidth:  'w3f-card--full-width',
  // States
  hoverable:  'w3f-card--hoverable',
  clickable:  'w3f-card--clickable',
  // Slot children (from _layout-primitive.css)
  slotHeader:     'w3f-slot-header',
  slotMedia:      'w3f-slot-media',
  slotContent:    'w3f-slot-content',
  slotActions:    'w3f-slot-actions',
  slotActionArea: 'w3f-slot-action-area',
  slotCustom:     'w3f-slot-custom',
  // Badge (absolutely positioned — no grid area needed)
  badge:      'w3f-card-badge',
  // Inner elements
  title:      'w3f-card-title',
  subtitle:   'w3f-card-subtitle',
  headerExtra:'w3f-card-header-extra',
  image:      'w3f-card-image',
} as const;
