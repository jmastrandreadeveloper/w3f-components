import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Stepper, Step, StepLabel, StepContent, StepConnector } from '../Stepper';

describe('Stepper', () => {
    it('renders with base CSS class', () => {
        const { container } = render(
            <Stepper>
                <Step><StepLabel>Step 1</StepLabel></Step>
            </Stepper>,
        );
        expect(container.querySelector('.w3f-stepper')).toBeInTheDocument();
    });

    it('has displayName set', () => {
        expect(Stepper.displayName).toBe('Stepper');
    });

    it('forwards ref to the container div', () => {
        const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
        render(
            <Stepper ref={ref}>
                <Step><StepLabel>Step 1</StepLabel></Step>
            </Stepper>,
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies orientation class', () => {
        const { container } = render(
            <Stepper orientation="vertical">
                <Step><StepLabel>Step 1</StepLabel></Step>
            </Stepper>,
        );
        expect(container.querySelector('.w3f-stepper--vertical')).toBeInTheDocument();
    });

    it('applies color class', () => {
        const { container } = render(
            <Stepper color="success">
                <Step><StepLabel>Step 1</StepLabel></Step>
            </Stepper>,
        );
        expect(container.querySelector('.w3f-stepper--success')).toBeInTheDocument();
    });

    it('applies alternative label class', () => {
        const { container } = render(
            <Stepper alternativeLabel>
                <Step><StepLabel>Step 1</StepLabel></Step>
            </Stepper>,
        );
        expect(container.querySelector('.w3f-stepper--alternative-label')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(
            <Stepper className="my-stepper">
                <Step><StepLabel>Step 1</StepLabel></Step>
            </Stepper>,
        );
        expect(container.querySelector('.w3f-stepper.my-stepper')).toBeInTheDocument();
    });

    it('marks the correct step as active based on activeStep', () => {
        const { container } = render(
            <Stepper activeStep={1}>
                <Step><StepLabel>Step 1</StepLabel></Step>
                <Step><StepLabel>Step 2</StepLabel></Step>
                <Step><StepLabel>Step 3</StepLabel></Step>
            </Stepper>,
        );
        const steps = container.querySelectorAll('.w3f-step');
        expect(steps[0]?.className).toContain('w3f-step--completed');
        expect(steps[1]?.className).toContain('w3f-step--active');
    });

    it('renders connectors between steps', () => {
        const { container } = render(
            <Stepper activeStep={0}>
                <Step><StepLabel>Step 1</StepLabel></Step>
                <Step><StepLabel>Step 2</StepLabel></Step>
                <Step><StepLabel>Step 3</StepLabel></Step>
            </Stepper>,
        );
        const connectors = container.querySelectorAll('.w3f-step-connector');
        expect(connectors).toHaveLength(2);
    });

    it('does not render connectors when connector is null', () => {
        const { container } = render(
            <Stepper connector={null}>
                <Step><StepLabel>Step 1</StepLabel></Step>
                <Step><StepLabel>Step 2</StepLabel></Step>
            </Stepper>,
        );
        expect(container.querySelector('.w3f-step-connector')).not.toBeInTheDocument();
    });
});

describe('Step', () => {
    it('has displayName set', () => {
        expect(Step.displayName).toBe('Step');
    });

    it('renders with step CSS class', () => {
        const { container } = render(
            <Stepper><Step><StepLabel>S</StepLabel></Step></Stepper>,
        );
        expect(container.querySelector('.w3f-step')).toBeInTheDocument();
    });
});

describe('StepLabel', () => {
    it('has displayName set', () => {
        expect(StepLabel.displayName).toBe('StepLabel');
    });

    it('renders label text', () => {
        render(
            <Stepper activeStep={0}>
                <Step><StepLabel>My Step</StepLabel></Step>
            </Stepper>,
        );
        expect(screen.getByText('My Step')).toBeInTheDocument();
    });

    it('renders icon container', () => {
        const { container } = render(
            <Stepper activeStep={0}>
                <Step><StepLabel>Step 1</StepLabel></Step>
            </Stepper>,
        );
        expect(container.querySelector('.w3f-step-label__icon-container')).toBeInTheDocument();
    });

    it('renders active icon class for active step', () => {
        const { container } = render(
            <Stepper activeStep={0}>
                <Step><StepLabel>Step 1</StepLabel></Step>
            </Stepper>,
        );
        expect(container.querySelector('.w3f-step-label__icon--active')).toBeInTheDocument();
    });

    it('renders completed icon class for completed step', () => {
        const { container } = render(
            <Stepper activeStep={1}>
                <Step><StepLabel>Step 1</StepLabel></Step>
                <Step><StepLabel>Step 2</StepLabel></Step>
            </Stepper>,
        );
        expect(container.querySelector('.w3f-step-label__icon--completed')).toBeInTheDocument();
    });

    it('renders optional text when provided', () => {
        render(
            <Stepper activeStep={0}>
                <Step><StepLabel optional={<span>Optional</span>}>Step 1</StepLabel></Step>
            </Stepper>,
        );
        expect(screen.getByText('Optional')).toBeInTheDocument();
    });

    it('is clickable in nonLinear mode', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        const { container } = render(
            <Stepper activeStep={0} nonLinear>
                <Step><StepLabel onClick={onClick}>Step 1</StepLabel></Step>
            </Stepper>,
        );
        const label = container.querySelector('.w3f-step-label--clickable')!;
        expect(label).toBeInTheDocument();
        await user.click(label);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});

describe('StepContent', () => {
    it('has displayName set', () => {
        expect(StepContent.displayName).toBe('StepContent');
    });

    it('renders with content CSS class', () => {
        const { container } = render(
            <Stepper orientation="vertical" activeStep={0}>
                <Step>
                    <StepLabel>Step 1</StepLabel>
                    <StepContent>Content here</StepContent>
                </Step>
            </Stepper>,
        );
        expect(container.querySelector('.w3f-step-content')).toBeInTheDocument();
    });

    it('applies expanded class for active step', () => {
        const { container } = render(
            <Stepper orientation="vertical" activeStep={0}>
                <Step>
                    <StepLabel>Step 1</StepLabel>
                    <StepContent>Content</StepContent>
                </Step>
            </Stepper>,
        );
        expect(container.querySelector('.w3f-step-content--expanded')).toBeInTheDocument();
    });
});

describe('StepConnector', () => {
    it('has displayName set', () => {
        expect(StepConnector.displayName).toBe('StepConnector');
    });
});
