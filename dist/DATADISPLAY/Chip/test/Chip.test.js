import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Chip from "../Chip";
describe("Chip", () => {
  it("renders with base class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Chip, { label: "Tag" }));
    const chip = container.firstElementChild;
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass("w3f-chip");
  });
  it("has displayName set", () => {
    expect(Chip.displayName).toBe("Chip");
  });
  it("forwards ref", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Chip, { ref, label: "Ref" }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("renders label text", () => {
    const { container } = render(/* @__PURE__ */ jsx(Chip, { label: "Hello" }));
    const label = container.querySelector(".w3f-chip__label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Hello");
  });
  it("applies disabled class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Chip, { label: "Disabled", disabled: true }));
    expect(container.firstElementChild).toHaveClass("w3f-chip--disabled");
  });
  it("applies focused class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Chip, { label: "Focused", isFocused: true }));
    expect(container.firstElementChild).toHaveClass("w3f-chip--focused");
  });
  it("renders close button when onClose is provided", () => {
    const { container } = render(/* @__PURE__ */ jsx(Chip, { label: "Close", onClose: () => {
    } }));
    const closeBtn = container.querySelector(".w3f-chip-close");
    expect(closeBtn).toBeInTheDocument();
    expect(closeBtn).toHaveTextContent("\xD7");
  });
  it("does not render close button when disabled", () => {
    const { container } = render(/* @__PURE__ */ jsx(Chip, { label: "No Close", onClose: () => {
    }, disabled: true }));
    expect(container.querySelector(".w3f-chip-close")).toBeNull();
  });
  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    const { container } = render(/* @__PURE__ */ jsx(Chip, { label: "Closeable", onClose }));
    const closeBtn = container.querySelector(".w3f-chip-close");
    await userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it("applies unstyled class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Chip, { label: "Unstyled", unstyled: true }));
    expect(container.firstElementChild).toHaveClass("w3f-chip--unstyled");
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(Chip, { label: "Custom", className: "my-chip" }));
    expect(container.firstElementChild).toHaveClass("my-chip");
  });
  it("has correct ARIA attributes", () => {
    render(/* @__PURE__ */ jsx(Chip, { label: "Aria" }));
    const chip = screen.getByRole("button");
    expect(chip).toHaveAttribute("aria-disabled", "false");
  });
});
//# sourceMappingURL=Chip.test.js.map
