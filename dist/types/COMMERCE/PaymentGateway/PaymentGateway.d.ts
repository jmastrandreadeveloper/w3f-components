/**
 * @security PCI Compliance Note
 * This component is a UI-only payment form for development/demo purposes.
 * In production, card data should NEVER be handled directly by the frontend.
 * Use a PCI-compliant tokenization SDK (Stripe Elements, MercadoPago SDK,
 * Braintree, etc.) to collect and tokenize card details before they reach
 * your server. Direct card handling requires PCI DSS SAQ D certification.
 */
import React from 'react';
import type { PaymentGatewayProps } from './PaymentGateway.types';
declare const PaymentGateway: React.ForwardRefExoticComponent<PaymentGatewayProps & React.RefAttributes<HTMLDivElement>>;
export { PaymentGateway };
export default PaymentGateway;
//# sourceMappingURL=PaymentGateway.d.ts.map