import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    AccordionHorizontal,
    AccordionItemH,
    AccordionSummaryH,
    AccordionDetailsH,
    AccordionActionsH,
} from '../AccordionHorizontal';
import { createRef } from 'react';

describe('AccordionHorizontal', () => {
    it('renders with base class', () => {
        const { container } = render(
            <AccordionHorizontal>
                <AccordionItemH id="p1">
                    <AccordionSummaryH>Title</AccordionSummaryH>
                    <AccordionDetailsH><p>Content</p></AccordionDetailsH>
                </AccordionItemH>
            </AccordionHorizontal>
        );
        expect(container.firstChild).toHaveClass('w3f-accordion-horizontal');
    });

    it('has displayName set', () => {
        expect(AccordionHorizontal.displayName).toBe('AccordionHorizontal');
    });

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <AccordionHorizontal ref={ref}>
                <AccordionItemH id="p1">
                    <AccordionSummaryH>Title</AccordionSummaryH>
                    <AccordionDetailsH><p>Content</p></AccordionDetailsH>
                </AccordionItemH>
            </AccordionHorizontal>
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies variant outlined class', () => {
        const { container } = render(
            <AccordionHorizontal variant="outlined">
                <AccordionItemH id="p1">
                    <AccordionSummaryH>Title</AccordionSummaryH>
                    <AccordionDetailsH><p>Content</p></AccordionDetailsH>
                </AccordionItemH>
            </AccordionHorizontal>
        );
        expect(container.firstChild).toHaveClass('w3f-accordion-h-outlined');
    });

    it('applies size sm class', () => {
        const { container } = render(
            <AccordionHorizontal size="sm">
                <AccordionItemH id="p1">
                    <AccordionSummaryH>Title</AccordionSummaryH>
                    <AccordionDetailsH><p>Content</p></AccordionDetailsH>
                </AccordionItemH>
            </AccordionHorizontal>
        );
        expect(container.firstChild).toHaveClass('w3f-accordion-h-sm');
    });

    it('applies custom className', () => {
        const { container } = render(
            <AccordionHorizontal className="custom-h">
                <AccordionItemH id="p1">
                    <AccordionSummaryH>Title</AccordionSummaryH>
                    <AccordionDetailsH><p>Content</p></AccordionDetailsH>
                </AccordionItemH>
            </AccordionHorizontal>
        );
        expect(container.firstChild).toHaveClass('custom-h');
    });

    it('applies height as inline style', () => {
        const { container } = render(
            <AccordionHorizontal height="500px">
                <AccordionItemH id="p1">
                    <AccordionSummaryH>Title</AccordionSummaryH>
                    <AccordionDetailsH><p>Content</p></AccordionDetailsH>
                </AccordionItemH>
            </AccordionHorizontal>
        );
        expect(container.firstChild).toHaveStyle({ minHeight: '500px' });
    });

    it('renders AccordionDetailsH with correct class', () => {
        const { container } = render(
            <AccordionDetailsH><p>Horizontal detail</p></AccordionDetailsH>
        );
        expect(container.firstChild).toHaveClass('w3f-accordion-details-horizontal');
    });

    it('renders AccordionActionsH with correct class', () => {
        const { container } = render(
            <AccordionActionsH><button>Action</button></AccordionActionsH>
        );
        expect(container.firstChild).toHaveClass('w3f-accordion-actions-horizontal');
    });

    it('AccordionSummaryH renders with summary class', () => {
        const { container } = render(
            <AccordionSummaryH>Summary text</AccordionSummaryH>
        );
        expect(container.querySelector('button')).toHaveClass('w3f-accordion-summary-horizontal');
    });

    it('AccordionSummaryH applies counter-clockwise orientation by default', () => {
        const { container } = render(
            <AccordionSummaryH>Text</AccordionSummaryH>
        );
        expect(container.querySelector('button')).toHaveClass('w3f-accordion-summary-h-ccw');
    });

    it('sub-components have displayName set', () => {
        expect(AccordionItemH.displayName).toBe('AccordionItemH');
        expect(AccordionSummaryH.displayName).toBe('AccordionSummaryH');
        expect(AccordionDetailsH.displayName).toBe('AccordionDetailsH');
        expect(AccordionActionsH.displayName).toBe('AccordionActionsH');
    });
});
