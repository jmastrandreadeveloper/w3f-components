import type { NetworkNode, NetworkLink, NetworkData } from './Network.types';
import { NETWORK_ROOT_CLASS } from './Network.constants';
import { buildChartRootClasses } from '../_base/utils';

export function buildNetworkClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(NETWORK_ROOT_CLASS, className, unstyled);
}

/**
 * Simple force-directed layout using velocity Verlet integration.
 * No external physics library needed — just iterative repulsion + attraction.
 */
export function computeForceLayout(
    data: NetworkData,
    width: number,
    height: number,
    iterations: number,
): { nodes: (NetworkNode & { x: number; y: number })[]; links: NetworkLink[] } {
    const nodeMap = new Map<string, { x: number; y: number; vx: number; vy: number; id: string; label?: string; group?: string }>();

    // Initialize nodes with random positions centered in the viewport
    for (const n of data.nodes) {
        nodeMap.set(n.id, {
            ...n,
            x: width / 2 + (Math.random() - 0.5) * width * 0.6,
            y: height / 2 + (Math.random() - 0.5) * height * 0.6,
            vx: 0,
            vy: 0,
        });
    }

    const nodes = [...nodeMap.values()];
    const links = [...data.links];

    // Build adjacency for quick lookup
    const linkPairs = links.map((l) => ({
        source: nodeMap.get(l.source)!,
        target: nodeMap.get(l.target)!,
        value: l.value,
    })).filter((l) => l.source && l.target);

    const repulsionStrength = 800;
    const attractionStrength = 0.05;
    const idealLength = Math.min(width, height) * 0.15;
    const damping = 0.85;
    const centerStrength = 0.01;

    for (let iter = 0; iter < iterations; iter++) {
        // Repulsion: every node pushes every other node away
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i];
                const b = nodes[j];
                let dx = b.x - a.x;
                let dy = b.y - a.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 1) dist = 1;
                const force = repulsionStrength / (dist * dist);
                const fx = (dx / dist) * force;
                const fy = (dy / dist) * force;
                a.vx -= fx;
                a.vy -= fy;
                b.vx += fx;
                b.vy += fy;
            }
        }

        // Attraction: linked nodes pull toward each other
        for (const { source, target } of linkPairs) {
            let dx = target.x - source.x;
            let dy = target.y - source.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 1) dist = 1;
            const displacement = dist - idealLength;
            const force = displacement * attractionStrength;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            source.vx += fx;
            source.vy += fy;
            target.vx -= fx;
            target.vy -= fy;
        }

        // Center gravity
        for (const n of nodes) {
            n.vx += (width / 2 - n.x) * centerStrength;
            n.vy += (height / 2 - n.y) * centerStrength;
        }

        // Apply velocities with damping
        for (const n of nodes) {
            n.vx *= damping;
            n.vy *= damping;
            n.x += n.vx;
            n.y += n.vy;
            // Constrain to bounds
            n.x = Math.max(20, Math.min(width - 20, n.x));
            n.y = Math.max(20, Math.min(height - 20, n.y));
        }
    }

    return {
        nodes: nodes.map(({ vx, vy, ...rest }) => rest),
        links,
    };
}

export function buildTooltipContent(node: NetworkNode): string {
    return node.label ?? node.id;
}
