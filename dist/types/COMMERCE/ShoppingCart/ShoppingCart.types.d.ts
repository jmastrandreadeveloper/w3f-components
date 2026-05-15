import type React from 'react';
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    description?: string;
    maxQuantity?: number;
}
export interface CartSummary {
    items: CartItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    itemCount: number;
}
export interface ShoppingCartProps {
    items: CartItem[];
    currency?: string;
    currencySymbol?: string;
    taxRate?: number;
    shippingCost?: number;
    freeShippingThreshold?: number;
    variant?: 'default' | 'compact' | 'sidebar' | 'full';
    color?: 'primary' | 'secondary' | 'info';
    showImage?: boolean;
    showQuantityControls?: boolean;
    showRemoveButton?: boolean;
    showSubtotal?: boolean;
    showTax?: boolean;
    showShipping?: boolean;
    emptyMessage?: string;
    emptyIcon?: React.ReactNode;
    onQuantityChange?: (itemId: string, quantity: number) => void;
    onRemoveItem?: (itemId: string) => void;
    onClearCart?: () => void;
    onCheckout?: (summary: CartSummary) => void;
    className?: string;
}
//# sourceMappingURL=ShoppingCart.types.d.ts.map