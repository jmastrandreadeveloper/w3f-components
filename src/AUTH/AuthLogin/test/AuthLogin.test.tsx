import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import AuthLogin from '../AuthLogin';

describe('AuthLogin', () => {
  it('renders login view by default', () => {
    render(<AuthLogin />);
    expect(screen.getByText('Welcome back')).toBeTruthy();
    expect(screen.getByText('Sign in')).toBeTruthy();
  });

  it('has displayName set', () => {
    expect(AuthLogin.displayName).toBe('AuthLogin');
  });

  it('forwards ref to the root div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<AuthLogin ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders email and password fields', () => {
    render(<AuthLogin />);
    // Input component renders with labels
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Password')).toBeTruthy();
  });

  it('renders submit button', () => {
    render(<AuthLogin />);
    expect(screen.getByText('Sign in')).toBeTruthy();
  });

  it('shows social login buttons by default', () => {
    render(<AuthLogin />);
    expect(screen.getByText('Google')).toBeTruthy();
    expect(screen.getByText('Facebook')).toBeTruthy();
    expect(screen.getByText('GitHub')).toBeTruthy();
  });

  it('hides social login when showSocialLogin=false', () => {
    render(<AuthLogin showSocialLogin={false} />);
    expect(screen.queryByText('Google')).toBeNull();
    expect(screen.queryByText('Facebook')).toBeNull();
  });

  it('switches to register view when Sign up is clicked', () => {
    render(<AuthLogin showRegister />);
    fireEvent.click(screen.getByText('Sign up'));
    // Heading shows "Create account" and button also shows it; use getAllByText
    expect(screen.getAllByText('Create account').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Full name')).toBeTruthy();
  });

  it('shows forgot password link by default', () => {
    render(<AuthLogin />);
    expect(screen.getByText('Forgot password?')).toBeTruthy();
  });

  it('hides forgot password link when showForgotPassword=false', () => {
    render(<AuthLogin showForgotPassword={false} />);
    expect(screen.queryByText('Forgot password?')).toBeNull();
  });

  it('applies variant classes', () => {
    const { container: c1 } = render(<AuthLogin variant="card" />);
    expect(c1.firstChild).toHaveClass('w3f-auth--card');

    const { container: c2 } = render(<AuthLogin variant="split" />);
    expect(c2.firstChild).toHaveClass('w3f-auth--split');

    const { container: c3 } = render(<AuthLogin variant="minimal" />);
    expect(c3.firstChild).toHaveClass('w3f-auth--minimal');
  });

  it('applies color classes', () => {
    const { container: c1 } = render(<AuthLogin color="secondary" />);
    expect(c1.firstChild).toHaveClass('w3f-auth--secondary');

    const { container: c2 } = render(<AuthLogin color="dark" />);
    expect(c2.firstChild).toHaveClass('w3f-auth--dark');
  });

  it('applies custom className', () => {
    const { container } = render(<AuthLogin className="my-auth" />);
    expect(container.firstChild).toHaveClass('my-auth');
  });
});
