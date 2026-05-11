import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section } from '../Section';
import { createRef } from 'react';

describe('Section', () => {
    it('renders with header and title', () => {
        render(<Section title="Settings"><p>Body</p></Section>);
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Settings').tagName).toBe('H3');
    });

    it('has displayName set', () => {
        expect(Section.displayName).toBe('Section');
    });

    it('renders children in content area', () => {
        render(<Section title="Test"><span>Child content</span></Section>);
        expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
        render(<Section title="Test" description="Some description"><p>Body</p></Section>);
        expect(screen.getByText('Some description')).toBeInTheDocument();
    });

    it('does not render description when not provided', () => {
        const { container } = render(<Section title="Test"><p>Body</p></Section>);
        expect(container.querySelector('.w3f-text-gray-600')).not.toBeInTheDocument();
    });

    it('header has correct class', () => {
        const { container } = render(<Section title="Test"><p>Body</p></Section>);
        expect(container.querySelector('.w3f-panel-header')).toBeInTheDocument();
    });

    it('title has correct class', () => {
        const { container } = render(<Section title="Test"><p>Body</p></Section>);
        expect(container.querySelector('.w3f-panel-title')).toBeInTheDocument();
    });

    it('body has correct class', () => {
        const { container } = render(<Section title="Test"><p>Body</p></Section>);
        expect(container.querySelector('.w3f-panel-body')).toBeInTheDocument();
    });

    it('content wrapper has flex layout classes', () => {
        const { container } = render(<Section title="Test"><p>Body</p></Section>);
        const content = container.querySelector('.w3f-flex.w3f-flex-col.w3f-gap-4');
        expect(content).toBeInTheDocument();
    });

    it('applies custom className with margin bottom', () => {
        const { container } = render(<Section title="Test" className="my-section"><p>Body</p></Section>);
        // The root Panel should have w3f-mb-8 from buildSectionPanelClassName
        const root = container.firstChild as HTMLElement;
        expect(root.className).toContain('w3f-mb-8');
        expect(root.className).toContain('my-section');
    });
});
