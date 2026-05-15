import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberField from "../NumberField";
describe("NumberField", () => {
  it("renders a text input with decimal inputMode", () => {
    render(/* @__PURE__ */ jsx(NumberField, { label: "Amount" }));
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("inputMode", "decimal");
  });
  it("renders label text", () => {
    render(/* @__PURE__ */ jsx(NumberField, { label: "Quantity" }));
    expect(screen.getByText("Quantity")).toBeInTheDocument();
  });
  it("applies container class w3f-input-container", () => {
    const { container } = render(/* @__PURE__ */ jsx(NumberField, { label: "Test" }));
    expect(container.querySelector(".w3f-input-container")).toBeInTheDocument();
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(NumberField, { label: "Test", className: "my-num" }));
    expect(container.firstElementChild).toHaveClass("my-num");
  });
  it("renders required indicator", () => {
    render(/* @__PURE__ */ jsx(NumberField, { label: "Qty", required: true }));
    expect(screen.getByText("*")).toBeInTheDocument();
  });
  it("renders spin buttons", () => {
    render(/* @__PURE__ */ jsx(NumberField, { label: "Qty" }));
    expect(screen.getByLabelText("Incrementar valor")).toBeInTheDocument();
    expect(screen.getByLabelText("Decrementar valor")).toBeInTheDocument();
  });
  it("disables the input", () => {
    render(/* @__PURE__ */ jsx(NumberField, { label: "Qty", disabled: true }));
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
  it("disables spin buttons when disabled", () => {
    render(/* @__PURE__ */ jsx(NumberField, { label: "Qty", disabled: true }));
    expect(screen.getByLabelText("Incrementar valor")).toBeDisabled();
    expect(screen.getByLabelText("Decrementar valor")).toBeDisabled();
  });
  it("increments value via spin button", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(/* @__PURE__ */ jsx(NumberField, { label: "Qty", value: 5, onChange }));
    await user.click(screen.getByLabelText("Incrementar valor"));
    expect(onChange).toHaveBeenCalled();
  });
  it("shows error message with role alert", () => {
    render(/* @__PURE__ */ jsx(NumberField, { label: "Qty", error: "Invalid" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid");
  });
  it("shows helper text", () => {
    render(/* @__PURE__ */ jsx(NumberField, { label: "Qty", helperText: "Enter a number" }));
    expect(screen.getByText("Enter a number")).toBeInTheDocument();
  });
  it("forwards ref to the input element", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(NumberField, { label: "Qty", ref }));
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
  it("has displayName set", () => {
    expect(NumberField.displayName).toBe("NumberField");
  });
});
//# sourceMappingURL=NumberField.test.js.map
