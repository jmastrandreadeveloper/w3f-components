/**
 * Curated icon registry — imports ONLY the icons actually used in the project.
 * This avoids `import * as LucideIcons from 'lucide-react'` which pulls ~565 KB.
 *
 * To add a new icon: import it from 'lucide-react' and add it to the ICON_REGISTRY map.
 */
import type { LucideIcon } from 'lucide-react';
/**
 * The curated map: PascalCase name → LucideIcon component.
 * Every icon used anywhere in the project must be listed here.
 */
export declare const ICON_REGISTRY: Record<string, LucideIcon>;
//# sourceMappingURL=Icon.registry.d.ts.map