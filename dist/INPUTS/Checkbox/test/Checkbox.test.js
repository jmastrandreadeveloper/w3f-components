import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from "../Checkbox";
describe("Checkbox", () => {
  it("renders a checkbox input", () => {
    render(/* @__PURE__ */ jsx(Checkbox, { label: "Accept" }));
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });
  it("renders the label text", () => {
    render(/* @__PURE__ */ jsx(Checkbox, { label: "Terms" }));
    expect(screen.getByText("Terms")).toBeInTheDocument();
  });
  it("applies wrapper class w3f-checkbox-wrapper", () => {
    const { container } = render(/* @__PURE__ */ jsx(Checkbox, { label: "Test" }));
    expect(container.querySelector(".w3f-checkbox-wrapper")).toBeInTheDocument();
  });
  it("applies w3f-checkbox-input class to the input", () => {
    render(/* @__PURE__ */ jsx(Checkbox, { label: "Test" }));
    expect(screen.getByRole("checkbox")).toHaveClass("w3f-checkbox-input");
  });
  it("applies disabled class w3f-checkbox-wrapper--disabled", () => {
    const { container } = render(/* @__PURE__ */ jsx(Checkbox, { label: "Test", disabled: true }));
    expect(container.querySelector(".w3f-checkbox-wrapper--disabled")).toBeInTheDocument();
  });
  it("applies color modifier class", () => {
    render(/* @__PURE__ */ jsx(Checkbox, { label: "Test", color: "success" }));
    expect(screen.getByRole("checkbox")).toHaveClass("w3f-checkbox--success");
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(Checkbox, { label: "Test", className: "my-class" }));
    expect(container.firstElementChild).toHaveClass("my-class");
  });
  it("disables the checkbox", () => {
    render(/* @__PURE__ */ jsx(Checkbox, { label: "Disabled", disabled: true }));
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });
  it("fires onChange when clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(/* @__PURE__ */ jsx(Checkbox, { label: "Click", onChange }));
    await user.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true);
  });
  it("does not fire onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(/* @__PURE__ */ jsx(Checkbox, { label: "Click", disabled: true, onChange }));
    await user.click(screen.getByRole("checkbox"));
    expect(onChange).not.toHaveBeenCalled();
  });
  it("shows children content when checked", async () => {
    const user = userEvent.setup();
    render(
      /* @__PURE__ */ jsx(Checkbox, { label: "Toggle", children: /* @__PURE__ */ jsx("span", { "data-testid": "nested", children: "Nested content" }) })
    );
    await user.click(screen.getByRole("checkbox"));
    expect(screen.getByTestId("nested")).toBeInTheDocument();
  });
  it("forwards ref to the input element", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Checkbox, { label: "Ref", ref }));
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
  it("has displayName set", () => {
    expect(Checkbox.displayName).toBe("Checkbox");
  });
});
//# sourceMappingURL=Checkbox.test.js.map
