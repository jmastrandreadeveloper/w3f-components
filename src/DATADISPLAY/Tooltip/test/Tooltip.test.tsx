import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  it('renders children and tooltip wrapper', () => {
    const { container } = render(
      <Tooltip config={{ message: 'Hint' }}>
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(container.querySelector('.w3f-tooltip-wrapper')).toBeInTheDocument();
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('has displayName set', () => {
    expect(Tooltip.displayName).toBe('Tooltip');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <Tooltip ref={ref} config={{ message: 'Tip' }}>
        <span>Target</span>
      </Tooltip>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('w3f-tooltip-wrapper');
  });

  it('renders tooltip content with correct classes', () => {
    const { container } = render(
      <Tooltip config={{ message: 'Info', position: 'bottom', variant: 'primary' }}>
        <span>T</span>
      </Tooltip>,
    );
    const tooltipContent = container.querySelector('.w3f-tooltip-content');
    expect(tooltipContent).toBeInTheDocument();
    expect(tooltipContent).toHaveClass('w3f-tooltip-bottom');
    expect(tooltipContent).toHaveClass('w3f-tooltip-primary');
  });

  it('defaults to top position and dark variant', () => {
    const { container } = render(
      <Tooltip>
        <span>Default</span>
      </Tooltip>,
    );
    const tooltipContent = container.querySelector('.w3f-tooltip-content');
    expect(tooltipContent).toHaveClass('w3f-tooltip-top');
    expect(tooltipContent).toHaveClass('w3f-tooltip-dark');
  });

  it('renders arrow by default', () => {
    const { container } = render(
      <Tooltip config={{ message: 'Arrow', position: 'left' }}>
        <span>A</span>
      </Tooltip>,
    );
    const arrow = container.querySelector('.w3f-tooltip-arrow');
    expect(arrow).toBeInTheDocument();
    expect(arrow).toHaveClass('w3f-tooltip-arrow-left');
  });

  it('hides arrow when arrow=false', () => {
    const { container } = render(
      <Tooltip config={{ message: 'No arrow', arrow: false }}>
        <span>A</span>
      </Tooltip>,
    );
    expect(container.querySelector('.w3f-tooltip-arrow')).toBeNull();
  });

  it('shows tooltip on mouse enter', async () => {
    const { container } = render(
      <Tooltip config={{ message: 'Visible' }}>
        <span>Hover</span>
      </Tooltip>,
    );
    const wrapper = container.querySelector('.w3f-tooltip-wrapper') as HTMLElement;
    await userEvent.hover(wrapper);
    const tooltipContent = container.querySelector('.w3f-tooltip-content');
    expect(tooltipContent).toHaveClass('w3f-tooltip-visible');
  });

  it('hides tooltip on mouse leave', async () => {
    const { container } = render(
      <Tooltip config={{ message: 'Hidden' }}>
        <span>Hover</span>
      </Tooltip>,
    );
    const wrapper = container.querySelector('.w3f-tooltip-wrapper') as HTMLElement;
    await userEvent.hover(wrapper);
    await userEvent.unhover(wrapper);
    const tooltipContent = container.querySelector('.w3f-tooltip-content');
    expect(tooltipContent).not.toHaveClass('w3f-tooltip-visible');
  });

  it('renders tooltip message text', () => {
    render(
      <Tooltip config={{ message: 'Custom message' }}>
        <span>Target</span>
      </Tooltip>,
    );
    expect(screen.getByText('Custom message')).toBeInTheDocument();
  });
});
