import type { MasonryBreakpoints } from './Masonry.types';

// ── Defaults ───────────────────────────────────────────────────
export const MSN_DEFAULTS = {
  variant:         'column' as const,
  columns:         { xs: 1, sm: 2, md: 3, lg: 4 } satisfies MasonryBreakpoints,
  baseColumnWidth: '280px',
  minCardWidth:    '280px',
  gap:             '1rem',
  padding:         '1rem',
  headerHeight:    '8rem',
  hover:           true,
  size:            'small' as const,
  unstyled:        false,
};

// ── CSS Class Tokens ───────────────────────────────────────────
export const MSN_CLASSES = {
  // Container
  root:        'w3f-masonry',
  varColumn:   'w3f-masonry--column',
  varFlex:     'w3f-masonry--flex',
  varGrid:     'w3f-masonry--grid',

  // Items
  item:        'w3f-masonry-item',
  itemSmall:   'w3f-masonry-item--small',
  itemMedium:  'w3f-masonry-item--medium',
  itemLarge:   'w3f-masonry-item--large',
  itemFull:    'w3f-masonry-item--full',

  // Card
  card:        'w3f-masonry-card',
  cardHover:   'w3f-masonry-card--hover',
  cardHeader:  'w3f-masonry-card__header',
  cardBody:    'w3f-masonry-card__body',
  cardTitle:   'w3f-masonry-card__title',
} as const;
