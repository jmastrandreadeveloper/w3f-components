import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Tag from "../Tag";
describe("Tag", () => {
  it("renders with base class", () => {
    render(/* @__PURE__ */ jsx(Tag, { color: "primary", children: "Label" }));
    const tag = screen.getByText("Label");
    expect(tag).toHaveClass("w3f-tag-base");
  });
  it("has displayName set", () => {
    expect(Tag.displayName).toBe("Tag");
  });
  it("forwards ref", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Tag, { ref, color: "primary", children: "T" }));
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
  it("renders children content", () => {
    render(/* @__PURE__ */ jsx(Tag, { color: "success", children: "Status OK" }));
    expect(screen.getByText("Status OK")).toBeInTheDocument();
  });
  it("applies color background class", () => {
    render(/* @__PURE__ */ jsx(Tag, { color: "danger", children: "Error" }));
    expect(screen.getByText("Error")).toHaveClass("w3f-bg-danger");
  });
  it("applies light variant classes", () => {
    render(/* @__PURE__ */ jsx(Tag, { color: "primary", light: true, children: "Light" }));
    const tag = screen.getByText("Light");
    expect(tag).toHaveClass("w3f-bg-primary-light");
    expect(tag).toHaveClass("w3f-text-primary");
  });
  it("does not apply text color class without light", () => {
    render(/* @__PURE__ */ jsx(Tag, { color: "info", children: "Normal" }));
    const tag = screen.getByText("Normal");
    expect(tag).toHaveClass("w3f-bg-info");
    expect(tag).not.toHaveClass("w3f-text-info");
  });
  it("applies unstyled class", () => {
    render(/* @__PURE__ */ jsx(Tag, { color: "primary", unstyled: true, children: "Unstyled" }));
    const tag = screen.getByText("Unstyled");
    expect(tag).toHaveClass("w3f-tag-base");
    expect(tag).toHaveClass("w3f-tag--unstyled");
    expect(tag).not.toHaveClass("w3f-bg-primary");
  });
  it("applies custom className", () => {
    render(/* @__PURE__ */ jsx(Tag, { color: "gray", className: "my-tag", children: "Custom" }));
    expect(screen.getByText("Custom")).toHaveClass("my-tag");
  });
  it("renders as a span element", () => {
    const { container } = render(/* @__PURE__ */ jsx(Tag, { color: "primary", children: "Span" }));
    expect(container.firstElementChild?.tagName).toBe("SPAN");
  });
});
//# sourceMappingURL=Tag.test.js.map
