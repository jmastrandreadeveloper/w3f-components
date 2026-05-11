import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Masonry, MasonryItem, MasonryCard } from '../Masonry';
import { createRef } from 'react';

describe('Masonry', () => {
    it('renders with base class', () => {
        const { container } = render(
            <Masonry><div>Item 1</div></Masonry>
        );
        expect(container.firstChild).toHaveClass('w3f-masonry');
    });

    it('has displayName set', () => {
        expect(Masonry.displayName).toBe('Masonry');
    });

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>();
        render(<Masonry ref={ref}><div>Item</div></Masonry>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies column variant class by default', () => {
        const { container } = render(
            <Masonry><div>Item</div></Masonry>
        );
        expect(container.firstChild).toHaveClass('w3f-masonry--column');
    });

    it('applies flex variant class', () => {
        const { container } = render(
            <Masonry variant="flex"><div>Item</div></Masonry>
        );
        expect(container.firstChild).toHaveClass('w3f-masonry--flex');
    });

    it('applies grid variant class', () => {
        const { container } = render(
            <Masonry variant="grid"><div>Item</div></Masonry>
        );
        expect(container.firstChild).toHaveClass('w3f-masonry--grid');
    });

    it('applies custom className', () => {
        const { container } = render(
            <Masonry className="my-masonry"><div>Item</div></Masonry>
        );
        expect(container.firstChild).toHaveClass('my-masonry');
    });

    it('renders children', () => {
        render(
            <Masonry>
                <div>Child A</div>
                <div>Child B</div>
            </Masonry>
        );
        expect(screen.getByText('Child A')).toBeInTheDocument();
        expect(screen.getByText('Child B')).toBeInTheDocument();
    });
});

describe('MasonryItem', () => {
    it('has displayName set', () => {
        expect(MasonryItem.displayName).toBe('MasonryItem');
    });

    it('renders with item class', () => {
        const { container } = render(
            <Masonry><MasonryItem><p>Content</p></MasonryItem></Masonry>
        );
        expect(container.querySelector('.w3f-masonry-item')).toBeInTheDocument();
    });

    it('renders children', () => {
        render(
            <Masonry><MasonryItem><span>Item content</span></MasonryItem></Masonry>
        );
        expect(screen.getByText('Item content')).toBeInTheDocument();
    });
});

describe('MasonryCard', () => {
    it('has displayName set', () => {
        expect(MasonryCard.displayName).toBe('MasonryCard');
    });

    it('renders card with correct class', () => {
        const { container } = render(
            <Masonry><MasonryCard title="Card 1">Body</MasonryCard></Masonry>
        );
        expect(container.querySelector('.w3f-masonry-card')).toBeInTheDocument();
    });

    it('renders title', () => {
        render(
            <Masonry><MasonryCard title="Test Card">Body</MasonryCard></Masonry>
        );
        expect(screen.getByText('Test Card')).toBeInTheDocument();
    });

    it('applies hover class by default', () => {
        const { container } = render(
            <Masonry><MasonryCard>Body</MasonryCard></Masonry>
        );
        expect(container.querySelector('.w3f-masonry-card--hover')).toBeInTheDocument();
    });

    it('does not apply hover class when hover=false', () => {
        const { container } = render(
            <Masonry><MasonryCard hover={false}>Body</MasonryCard></Masonry>
        );
        expect(container.querySelector('.w3f-masonry-card--hover')).not.toBeInTheDocument();
    });

    it('renders gradient header when provided', () => {
        const { container } = render(
            <Masonry><MasonryCard gradient="linear-gradient(red, blue)">Body</MasonryCard></Masonry>
        );
        expect(container.querySelector('.w3f-masonry-card__header')).toBeInTheDocument();
    });

    it('renders card body with correct class', () => {
        const { container } = render(
            <Masonry><MasonryCard>Body</MasonryCard></Masonry>
        );
        expect(container.querySelector('.w3f-masonry-card__body')).toBeInTheDocument();
    });

    it('renders hidden input for form integration', () => {
        const { container } = render(
            <Masonry><MasonryCard name="field" value="val">Body</MasonryCard></Masonry>
        );
        const input = container.querySelector('input[type="hidden"]');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('name', 'field');
        expect(input).toHaveAttribute('value', 'val');
    });

    it('calls onClick when clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(
            <Masonry><MasonryCard onClick={onClick}>Body</MasonryCard></Masonry>
        );
        await user.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalled();
    });
});
