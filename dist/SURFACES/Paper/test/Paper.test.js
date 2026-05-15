import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Paper } from "../Paper";
import { createRef } from "react";
describe("Paper", () => {
  it("renders with base class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Paper, { children: "Content" }));
    expect(container.firstChild).toHaveClass("w3f-paper");
  });
  it("has displayName set", () => {
    expect(Paper.displayName).toBe("Paper");
  });
  it("forwards ref", () => {
    const ref = createRef();
    render(/* @__PURE__ */ jsx(Paper, { ref, children: "Content" }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("renders children", () => {
    render(/* @__PURE__ */ jsx(Paper, { children: /* @__PURE__ */ jsx("span", { children: "Hello Paper" }) }));
    expect(screen.getByText("Hello Paper")).toBeInTheDocument();
  });
  it("applies variant class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Paper, { variant: "bold", children: "Content" }));
    expect(container.firstChild).toHaveClass("w3f-paper--bold");
  });
  it("applies elevated variant class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Paper, { variant: "elevated", children: "Content" }));
    expect(container.firstChild).toHaveClass("w3f-paper--elevated");
  });
  it("applies gridColor class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Paper, { gridColor: "primary", children: "Content" }));
    expect(container.firstChild).toHaveClass("w3f-paper--grid-primary");
  });
  it("applies size sm class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Paper, { size: "sm", children: "Content" }));
    expect(container.firstChild).toHaveClass("w3f-paper--sm");
  });
  it("applies fullWidth class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Paper, { fullWidth: true, children: "Content" }));
    expect(container.firstChild).toHaveClass("w3f-paper--full-width");
  });
  it("applies debug class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Paper, { debug: true, children: "Content" }));
    expect(container.firstChild).toHaveClass("w3f-paper--debug");
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(Paper, { className: "my-paper", children: "Content" }));
    expect(container.firstChild).toHaveClass("my-paper");
  });
  it("does not apply variant class for default", () => {
    const { container } = render(/* @__PURE__ */ jsx(Paper, { variant: "default", children: "Content" }));
    expect(container.firstChild).not.toHaveClass("w3f-paper--default");
  });
});
//# sourceMappingURL=Paper.test.js.map
