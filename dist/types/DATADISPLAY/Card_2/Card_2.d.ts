import React from 'react';
import type { Card2Props } from './Card_2.types';
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
declare const Card_2: React.ForwardRefExoticComponent<Card2Props & React.RefAttributes<HTMLDivElement>>;
export { Card_2 };
export default Card_2;
//# sourceMappingURL=Card_2.d.ts.map