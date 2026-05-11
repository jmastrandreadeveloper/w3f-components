import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import PaymentGateway from '../PaymentGateway';

describe('PaymentGateway', () => {
  it('renders without crashing', () => {
    const { container } = render(<PaymentGateway amount={99.99} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('has displayName set', () => {
    expect(PaymentGateway.displayName).toBe('PaymentGateway');
  });

  it('forwards ref to the root div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<PaymentGateway amount={50} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('shows payment method tabs', () => {
    render(<PaymentGateway amount={100} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(5); // credit-card, debit-card, mercadopago, paypal, bank-transfer
    expect(screen.getByText('Credit Card')).toBeTruthy();
    expect(screen.getByText('PayPal')).toBeTruthy();
    expect(screen.getByText('Bank Transfer')).toBeTruthy();
  });

  it('shows card form fields by default (credit-card is default method)', () => {
    render(<PaymentGateway amount={100} />);
    expect(screen.getByText('Card Number')).toBeTruthy();
    expect(screen.getByText('Cardholder Name')).toBeTruthy();
    expect(screen.getByText('Expiry')).toBeTruthy();
    expect(screen.getByText('CVV')).toBeTruthy();
  });

  it('applies variant classes', () => {
    const { container: c1 } = render(<PaymentGateway amount={100} variant="compact" />);
    expect(c1.firstChild).toHaveClass('w3f-payment--compact');

    const { container: c2 } = render(<PaymentGateway amount={100} variant="inline" />);
    expect(c2.firstChild).toHaveClass('w3f-payment--inline');
  });

  it('applies color classes', () => {
    const { container: c1 } = render(<PaymentGateway amount={100} color="secondary" />);
    expect(c1.firstChild).toHaveClass('w3f-payment--secondary');

    const { container: c2 } = render(<PaymentGateway amount={100} color="dark" />);
    expect(c2.firstChild).toHaveClass('w3f-payment--dark');
  });

  it('shows order summary when configured with items', () => {
    const orderItems = [
      { name: 'Product A', quantity: 2, price: 25 },
      { name: 'Product B', quantity: 1, price: 49.99 },
    ];
    render(
      <PaymentGateway amount={99.99} showOrderSummary orderItems={orderItems} />,
    );
    expect(screen.getByText('Order Summary')).toBeTruthy();
    expect(screen.getByText(/Product A/)).toBeTruthy();
    expect(screen.getByText(/Product B/)).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(<PaymentGateway amount={100} className="my-payment" />);
    expect(container.firstChild).toHaveClass('my-payment');
  });

  it('shows success state when success=true', () => {
    render(<PaymentGateway amount={100} success />);
    expect(screen.getByText('Payment successful!')).toBeTruthy();
  });

  it('shows custom success message', () => {
    render(<PaymentGateway amount={100} success successMessage="Done!" />);
    expect(screen.getByText('Done!')).toBeTruthy();
  });

  it('shows error message', () => {
    render(<PaymentGateway amount={100} error="Payment failed" />);
    expect(screen.getByText('Payment failed')).toBeTruthy();
  });
});
