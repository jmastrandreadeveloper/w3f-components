import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import ShoppingCart from "../ShoppingCart";
const sampleItems = [
  { id: "1", name: "Widget A", price: 9.99, quantity: 2 },
  { id: "2", name: "Widget B", price: 14.99, quantity: 1 }
];
describe("ShoppingCart", () => {
  it("renders with items", () => {
    const { container } = render(/* @__PURE__ */ jsx(ShoppingCart, { items: sampleItems }));
    expect(container.firstChild).toBeTruthy();
  });
  it("has displayName set", () => {
    expect(ShoppingCart.displayName).toBe("ShoppingCart");
  });
  it("forwards ref to the root div", () => {
    const ref = React.createRef();
    render(/* @__PURE__ */ jsx(ShoppingCart, { items: sampleItems, ref }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("shows item names", () => {
    render(/* @__PURE__ */ jsx(ShoppingCart, { items: sampleItems }));
    expect(screen.getByText("Widget A")).toBeTruthy();
    expect(screen.getByText("Widget B")).toBeTruthy();
  });
  it("shows prices", () => {
    render(/* @__PURE__ */ jsx(ShoppingCart, { items: sampleItems }));
    expect(screen.getAllByText("$9.99").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("$14.99").length).toBeGreaterThanOrEqual(1);
  });
  it("shows quantity controls", () => {
    render(/* @__PURE__ */ jsx(ShoppingCart, { items: sampleItems, showQuantityControls: true }));
    const decreaseButtons = screen.getAllByLabelText("Decrease quantity");
    const increaseButtons = screen.getAllByLabelText("Increase quantity");
    expect(decreaseButtons.length).toBe(2);
    expect(increaseButtons.length).toBe(2);
  });
  it("shows remove buttons", () => {
    render(/* @__PURE__ */ jsx(ShoppingCart, { items: sampleItems, showRemoveButton: true }));
    expect(screen.getByLabelText("Remove Widget A")).toBeTruthy();
    expect(screen.getByLabelText("Remove Widget B")).toBeTruthy();
  });
  it("shows empty state when no items", () => {
    render(/* @__PURE__ */ jsx(ShoppingCart, { items: [] }));
    expect(screen.getByText("Your cart is empty")).toBeTruthy();
  });
  it("shows custom empty message", () => {
    render(/* @__PURE__ */ jsx(ShoppingCart, { items: [], emptyMessage: "Nothing here yet" }));
    expect(screen.getByText("Nothing here yet")).toBeTruthy();
  });
  it("applies variant classes", () => {
    const { container: c1 } = render(/* @__PURE__ */ jsx(ShoppingCart, { items: sampleItems, variant: "compact" }));
    expect(c1.firstChild).toHaveClass("w3f-cart--compact");
    const { container: c2 } = render(/* @__PURE__ */ jsx(ShoppingCart, { items: sampleItems, variant: "sidebar" }));
    expect(c2.firstChild).toHaveClass("w3f-cart--sidebar");
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(ShoppingCart, { items: sampleItems, className: "my-cart" }));
    expect(container.firstChild).toHaveClass("my-cart");
  });
  it("renders checkout button when onCheckout is provided", () => {
    const handleCheckout = vi.fn();
    render(/* @__PURE__ */ jsx(ShoppingCart, { items: sampleItems, onCheckout: handleCheckout }));
    expect(screen.getByText(/Checkout/)).toBeTruthy();
  });
  it("does not render checkout button when onCheckout is not provided", () => {
    render(/* @__PURE__ */ jsx(ShoppingCart, { items: sampleItems }));
    expect(screen.queryByText(/Checkout/)).toBeNull();
  });
});
//# sourceMappingURL=ShoppingCart.test.js.map
