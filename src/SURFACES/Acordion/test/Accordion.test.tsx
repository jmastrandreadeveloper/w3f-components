import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItem, AccordionSummary, AccordionDetails, AccordionActions } from '../Accordion';
import { createRef } from 'react';

describe('Accordion', () => {
    it('renders with base class', () => {
        const { container } = render(
            <Accordion>
                <AccordionItem id="p1">
                    <AccordionSummary>Title</AccordionSummary>
                    <AccordionDetails><p>Content</p></AccordionDetails>
                </AccordionItem>
            </Accordion>
        );
        expect(container.firstChild).toHaveClass('w3f-accordion');
    });

    it('has displayName set', () => {
        expect(Accordion.displayName).toBe('Accordion');
    });

    it('forwards ref', () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <Accordion ref={ref}>
                <AccordionItem id="p1">
                    <AccordionSummary>Title</AccordionSummary>
                    <AccordionDetails><p>Content</p></AccordionDetails>
                </AccordionItem>
            </Accordion>
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies variant outlined class', () => {
        const { container } = render(
            <Accordion variant="outlined">
                <AccordionItem id="p1">
                    <AccordionSummary>Title</AccordionSummary>
                    <AccordionDetails><p>Content</p></AccordionDetails>
                </AccordionItem>
            </Accordion>
        );
        expect(container.firstChild).toHaveClass('w3f-accordion-outlined');
    });

    it('applies variant elevated class', () => {
        const { container } = render(
            <Accordion variant="elevated">
                <AccordionItem id="p1">
                    <AccordionSummary>Title</AccordionSummary>
                    <AccordionDetails><p>Content</p></AccordionDetails>
                </AccordionItem>
            </Accordion>
        );
        expect(container.firstChild).toHaveClass('w3f-accordion-elevated');
    });

    it('applies size sm class', () => {
        const { container } = render(
            <Accordion size="sm">
                <AccordionItem id="p1">
                    <AccordionSummary>Title</AccordionSummary>
                    <AccordionDetails><p>Content</p></AccordionDetails>
                </AccordionItem>
            </Accordion>
        );
        expect(container.firstChild).toHaveClass('w3f-accordion-sm');
    });

    it('applies custom className', () => {
        const { container } = render(
            <Accordion className="my-custom">
                <AccordionItem id="p1">
                    <AccordionSummary>Title</AccordionSummary>
                    <AccordionDetails><p>Content</p></AccordionDetails>
                </AccordionItem>
            </Accordion>
        );
        expect(container.firstChild).toHaveClass('my-custom');
    });

    it('expands an item when summary is clicked', async () => {
        const user = userEvent.setup();
        render(
            <Accordion>
                <AccordionItem id="p1">
                    <AccordionSummary>Click me</AccordionSummary>
                    <AccordionDetails><p>Expanded content</p></AccordionDetails>
                </AccordionItem>
            </Accordion>
        );
        const summary = screen.getByText('Click me');
        await user.click(summary);
        // After clicking, the content container should have the show class
        const contentContainer = summary.closest('.w3f-accordion-item')?.querySelector('.w3f-accordion-content-container');
        expect(contentContainer).toHaveClass('w3f-accordion-show');
    });

    it('renders AccordionDetails with correct class', () => {
        const { container } = render(
            <AccordionDetails><p>Detail content</p></AccordionDetails>
        );
        expect(container.firstChild).toHaveClass('w3f-accordion-details');
    });

    it('renders AccordionActions with correct class', () => {
        const { container } = render(
            <AccordionActions><button>Action</button></AccordionActions>
        );
        expect(container.firstChild).toHaveClass('w3f-accordion-actions');
    });

    it('AccordionItem applies color class', () => {
        const { container } = render(
            <AccordionItem id="p1" color="primary">
                <AccordionSummary>Title</AccordionSummary>
                <AccordionDetails><p>Content</p></AccordionDetails>
            </AccordionItem>
        );
        expect(container.firstChild).toHaveClass('w3f-accordion-item-primary');
    });

    it('AccordionItem applies disabled class', () => {
        const { container } = render(
            <AccordionItem id="p1" disabled>
                <AccordionSummary>Title</AccordionSummary>
                <AccordionDetails><p>Content</p></AccordionDetails>
            </AccordionItem>
        );
        expect(container.firstChild).toHaveClass('w3f-accordion-item-disabled');
    });
});
