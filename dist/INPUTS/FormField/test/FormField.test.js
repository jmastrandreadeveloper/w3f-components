import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FormField from "../FormField";
describe("FormField", () => {
  it("renders a group element", () => {
    render(/* @__PURE__ */ jsx(FormField, { children: /* @__PURE__ */ jsx("input", {}) }));
    expect(screen.getByRole("group")).toBeInTheDocument();
  });
  it("renders children", () => {
    render(
      /* @__PURE__ */ jsx(FormField, { children: /* @__PURE__ */ jsx("input", { "data-testid": "child" }) })
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
  it("applies base class w3f-form-field", () => {
    const { container } = render(/* @__PURE__ */ jsx(FormField, { children: /* @__PURE__ */ jsx("input", {}) }));
    expect(container.querySelector(".w3f-form-field")).toBeInTheDocument();
  });
  it("applies stacked layout class by default", () => {
    const { container } = render(/* @__PURE__ */ jsx(FormField, { children: /* @__PURE__ */ jsx("input", {}) }));
    expect(container.querySelector(".w3f-form-field--stacked")).toBeInTheDocument();
  });
  it("applies inline layout class", () => {
    const { container } = render(/* @__PURE__ */ jsx(FormField, { layout: "inline", children: /* @__PURE__ */ jsx("input", {}) }));
    expect(container.querySelector(".w3f-form-field--inline")).toBeInTheDocument();
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(FormField, { className: "my-field", children: /* @__PURE__ */ jsx("input", {}) }));
    expect(container.querySelector(".w3f-form-field")).toHaveClass("my-field");
  });
  it("renders label text", () => {
    render(/* @__PURE__ */ jsx(FormField, { label: "Name", children: /* @__PURE__ */ jsx("input", {}) }));
    expect(screen.getByText("Name")).toBeInTheDocument();
  });
  it("renders required indicator", () => {
    render(/* @__PURE__ */ jsx(FormField, { label: "Name", required: true, children: /* @__PURE__ */ jsx("input", {}) }));
    expect(screen.getByText("*")).toBeInTheDocument();
  });
  it("applies label class w3f-form-field__label", () => {
    const { container } = render(/* @__PURE__ */ jsx(FormField, { label: "Name", children: /* @__PURE__ */ jsx("input", {}) }));
    expect(container.querySelector(".w3f-form-field__label")).toBeInTheDocument();
  });
  it("applies content class w3f-form-field__content", () => {
    const { container } = render(/* @__PURE__ */ jsx(FormField, { children: /* @__PURE__ */ jsx("input", {}) }));
    expect(container.querySelector(".w3f-form-field__content")).toBeInTheDocument();
  });
  it("shows error message with role alert", () => {
    render(/* @__PURE__ */ jsx(FormField, { error: "Required", children: /* @__PURE__ */ jsx("input", {}) }));
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });
  it("shows helper text when no error", () => {
    render(/* @__PURE__ */ jsx(FormField, { helperText: "Enter your name", children: /* @__PURE__ */ jsx("input", {}) }));
    expect(screen.getByText("Enter your name")).toBeInTheDocument();
  });
  it("forwards ref to the wrapper div", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(FormField, { ref, children: /* @__PURE__ */ jsx("input", {}) }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("has displayName set", () => {
    expect(FormField.displayName).toBe("FormField");
  });
});
//# sourceMappingURL=FormField.test.js.map
