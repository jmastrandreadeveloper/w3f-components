import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../Pagination';

describe('Pagination', () => {
    it('renders with base CSS class', () => {
        const { container } = render(<Pagination count={5} />);
        expect(container.querySelector('.w3f-pagination')).toBeInTheDocument();
    });

    it('has displayName set', () => {
        expect(Pagination.displayName).toBe('Pagination');
    });

    it('forwards ref to the nav element', () => {
        const ref = { current: null } as React.RefObject<HTMLElement | null>;
        render(<Pagination count={5} ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLElement);
        expect(ref.current?.tagName).toBe('NAV');
    });

    it('applies variant class', () => {
        const { container } = render(<Pagination count={5} variant="outlined" />);
        expect(container.querySelector('.w3f-pagination--outlined')).toBeInTheDocument();
    });

    it('applies shape class', () => {
        const { container } = render(<Pagination count={5} shape="circular" />);
        expect(container.querySelector('.w3f-pagination--circular')).toBeInTheDocument();
    });

    it('applies size class', () => {
        const { container } = render(<Pagination count={5} size="lg" />);
        expect(container.querySelector('.w3f-pagination--lg')).toBeInTheDocument();
    });

    it('applies color class', () => {
        const { container } = render(<Pagination count={5} color="secondary" />);
        expect(container.querySelector('.w3f-pagination--secondary')).toBeInTheDocument();
    });

    it('applies disabled class', () => {
        const { container } = render(<Pagination count={5} disabled />);
        expect(container.querySelector('.w3f-pagination--disabled')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<Pagination count={5} className="my-pagination" />);
        expect(container.querySelector('.w3f-pagination.my-pagination')).toBeInTheDocument();
    });

    it('renders correct number of page buttons', () => {
        const { container } = render(<Pagination count={5} />);
        const pages = container.querySelectorAll('.w3f-pagination__page');
        expect(pages).toHaveLength(5);
    });

    it('marks current page as active', () => {
        const { container } = render(<Pagination count={5} defaultPage={3} />);
        const active = container.querySelector('.w3f-pagination__page--active');
        expect(active).toBeInTheDocument();
        expect(active).toHaveTextContent('3');
    });

    it('fires onChange on page click', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Pagination count={5} onChange={onChange} />);
        const page3 = screen.getByLabelText('Pagina 3');
        await user.click(page3);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][1]).toBe(3);
    });

    it('renders prev and next buttons by default', () => {
        render(<Pagination count={5} />);
        expect(screen.getByLabelText('Pagina anterior')).toBeInTheDocument();
        expect(screen.getByLabelText('Pagina siguiente')).toBeInTheDocument();
    });

    it('hides prev button when hidePrevButton is true', () => {
        render(<Pagination count={5} hidePrevButton />);
        expect(screen.queryByLabelText('Pagina anterior')).not.toBeInTheDocument();
    });

    it('hides next button when hideNextButton is true', () => {
        render(<Pagination count={5} hideNextButton />);
        expect(screen.queryByLabelText('Pagina siguiente')).not.toBeInTheDocument();
    });

    it('shows first/last buttons when props are set', () => {
        render(<Pagination count={5} showFirstButton showLastButton />);
        expect(screen.getByLabelText('Primera pagina')).toBeInTheDocument();
        expect(screen.getByLabelText('Ultima pagina')).toBeInTheDocument();
    });

    it('disables prev button on first page', () => {
        render(<Pagination count={5} defaultPage={1} />);
        expect(screen.getByLabelText('Pagina anterior')).toBeDisabled();
    });

    it('disables next button on last page', () => {
        render(<Pagination count={5} defaultPage={5} />);
        expect(screen.getByLabelText('Pagina siguiente')).toBeDisabled();
    });
});
