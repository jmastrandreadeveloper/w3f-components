import { useState } from 'react';

/**
 * Hook que gestiona el estado expandido/colapsado de los breadcrumbs.
 */
export function useBreadcrumbsExpand() {
    const [expanded, setExpanded] = useState(false);
    const expand = () => setExpanded(true);
    return { expanded, expand };
}
