import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContextMenu, ContextMenuItem } from '../ContextMenu';
import { createRef } from 'react';

const sampleItems = [
    { label: 'Copy', id: 'copy' },
    { label: 'Paste', id: 'paste' },
    { label: 'More', id: 'more', subItems: [{ label: 'Option A', id: 'a' }] },
];

describe('ContextMenu', () => {
    it('renders children in wrapper', () => {
        render(
            <ContextMenu items={sampleItems}>
                <div>Right click here</div>
            </ContextMenu>
        );
        expect(screen.getByText('Right click here')).toBeInTheDocument();
    });

    it('has displayName set', () => {
        expect(ContextMenu.displayName).toBe('ContextMenu');
    });

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <ContextMenu ref={ref} items={sampleItems}>
                <div>Content</div>
            </ContextMenu>
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('wrapper has correct CSS class', () => {
        const { container } = render(
            <ContextMenu items={sampleItems}>
                <div>Content</div>
            </ContextMenu>
        );
        expect(container.firstChild).toHaveClass('w3f-context-menu-wrapper');
    });

    it('does not show dropdown by default', () => {
        const { container } = render(
            <ContextMenu items={sampleItems}>
                <div>Content</div>
            </ContextMenu>
        );
        expect(container.querySelector('.w3f-nested-menu-dropdown')).not.toBeInTheDocument();
    });

    it('shows dropdown on context menu event', () => {
        const { container } = render(
            <ContextMenu items={sampleItems}>
                <div>Content</div>
            </ContextMenu>
        );
        fireEvent.contextMenu(container.firstChild!);
        expect(container.querySelector('.w3f-nested-menu-dropdown')).toBeInTheDocument();
    });

    it('renders menu items inside dropdown', () => {
        const { container } = render(
            <ContextMenu items={sampleItems}>
                <div>Content</div>
            </ContextMenu>
        );
        fireEvent.contextMenu(container.firstChild!);
        expect(screen.getByText('Copy')).toBeInTheDocument();
        expect(screen.getByText('Paste')).toBeInTheDocument();
        expect(screen.getByText('More')).toBeInTheDocument();
    });

    it('ContextMenuItem has displayName', () => {
        expect(ContextMenuItem.displayName).toBe('ContextMenuItem');
    });

    it('shows arrow indicator for items with subItems', () => {
        const { container } = render(
            <ContextMenu items={sampleItems}>
                <div>Content</div>
            </ContextMenu>
        );
        fireEvent.contextMenu(container.firstChild!);
        const arrows = container.querySelectorAll('.w3f-nested-menu-arrow');
        expect(arrows.length).toBeGreaterThanOrEqual(1);
    });
});
