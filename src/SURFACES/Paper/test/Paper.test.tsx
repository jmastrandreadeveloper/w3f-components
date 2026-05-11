import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Paper } from '../Paper';
import { createRef } from 'react';

describe('Paper', () => {
    it('renders with base class', () => {
        const { container } = render(<Paper>Content</Paper>);
        expect(container.firstChild).toHaveClass('w3f-paper');
    });

    it('has displayName set', () => {
        expect(Paper.displayName).toBe('Paper');
    });

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>();
        render(<Paper ref={ref}>Content</Paper>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('renders children', () => {
        render(<Paper><span>Hello Paper</span></Paper>);
        expect(screen.getByText('Hello Paper')).toBeInTheDocument();
    });

    it('applies variant class', () => {
        const { container } = render(<Paper variant="bold">Content</Paper>);
        expect(container.firstChild).toHaveClass('w3f-paper--bold');
    });

    it('applies elevated variant class', () => {
        const { container } = render(<Paper variant="elevated">Content</Paper>);
        expect(container.firstChild).toHaveClass('w3f-paper--elevated');
    });

    it('applies gridColor class', () => {
        const { container } = render(<Paper gridColor="primary">Content</Paper>);
        expect(container.firstChild).toHaveClass('w3f-paper--grid-primary');
    });

    it('applies size sm class', () => {
        const { container } = render(<Paper size="sm">Content</Paper>);
        expect(container.firstChild).toHaveClass('w3f-paper--sm');
    });

    it('applies fullWidth class', () => {
        const { container } = render(<Paper fullWidth>Content</Paper>);
        expect(container.firstChild).toHaveClass('w3f-paper--full-width');
    });

    it('applies debug class', () => {
        const { container } = render(<Paper debug>Content</Paper>);
        expect(container.firstChild).toHaveClass('w3f-paper--debug');
    });

    it('applies custom className', () => {
        const { container } = render(<Paper className="my-paper">Content</Paper>);
        expect(container.firstChild).toHaveClass('my-paper');
    });

    it('does not apply variant class for default', () => {
        const { container } = render(<Paper variant="default">Content</Paper>);
        expect(container.firstChild).not.toHaveClass('w3f-paper--default');
    });
});
