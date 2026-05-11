import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from '../Tabs';
import { createRef } from 'react';

const sampleTabs = [
    { id: 'tab1', title: 'Home', content: 'Home content' },
    { id: 'tab2', title: 'Profile', content: 'Profile content' },
    { id: 'tab3', title: 'Settings', content: <p>Settings JSX</p> },
];

describe('Tabs', () => {
    it('renders with container class', () => {
        const { container } = render(<Tabs initialTabsContent={sampleTabs} />);
        expect(container.querySelector('.w3f-tabs-container')).toBeInTheDocument();
    });

    it('has displayName set', () => {
        expect(Tabs.displayName).toBe('Tabs');
    });

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>();
        render(<Tabs ref={ref} initialTabsContent={sampleTabs} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('renders tab items', () => {
        render(<Tabs initialTabsContent={sampleTabs} />);
        // Tab titles appear in both the tab list and the panel (for string content)
        expect(screen.getAllByText('Home').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('Profile').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('Settings').length).toBeGreaterThanOrEqual(1);
    });

    it('renders title when provided', () => {
        render(<Tabs initialTabsContent={sampleTabs} title="My Tabs" />);
        expect(screen.getByText('My Tabs')).toBeInTheDocument();
    });

    it('shows empty state when no tabs', () => {
        render(<Tabs initialTabsContent={[]} />);
        expect(screen.getByText('No hay pestañas abiertas')).toBeInTheDocument();
    });

    it('empty state has correct classes', () => {
        const { container } = render(<Tabs initialTabsContent={[]} />);
        expect(container.querySelector('.w3f-tabs-empty')).toBeInTheDocument();
        expect(container.querySelector('.w3f-tabs-empty-text')).toBeInTheDocument();
    });

    it('first tab is active by default', () => {
        const { container } = render(<Tabs initialTabsContent={sampleTabs} />);
        const panels = container.querySelectorAll('[role="tabpanel"]');
        expect(panels[0]).not.toHaveAttribute('hidden');
        expect(panels[1]).toHaveAttribute('hidden');
    });

    it('switches active tab on click', async () => {
        const user = userEvent.setup();
        const { container } = render(<Tabs initialTabsContent={sampleTabs} />);
        // Click on Profile tab
        const tabs = container.querySelectorAll('[role="tab"]');
        await user.click(tabs[1]);
        const panels = container.querySelectorAll('[role="tabpanel"]');
        expect(panels[1]).not.toHaveAttribute('hidden');
        expect(panels[0]).toHaveAttribute('hidden');
    });

    it('renders tablist with correct class', () => {
        const { container } = render(<Tabs initialTabsContent={sampleTabs} />);
        expect(container.querySelector('.w3f-tabs-list')).toBeInTheDocument();
    });

    it('renders content area with correct class', () => {
        const { container } = render(<Tabs initialTabsContent={sampleTabs} />);
        expect(container.querySelector('.w3f-tabs-content')).toBeInTheDocument();
    });

    it('renders tab panels with correct class', () => {
        const { container } = render(<Tabs initialTabsContent={sampleTabs} />);
        const panels = container.querySelectorAll('.w3f-tabs-panel');
        expect(panels.length).toBe(3);
    });

    it('renders close buttons when closable', () => {
        const { container } = render(<Tabs initialTabsContent={sampleTabs} closable />);
        const closeBtns = container.querySelectorAll('.w3f-tabs-close-btn');
        expect(closeBtns.length).toBe(3);
    });
});
