import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Text from "../Text";
describe("Text", () => {
  it("renders as a p element by default", () => {
    const { container } = render(/* @__PURE__ */ jsx(Text, { children: "Hello" }));
    expect(container.firstElementChild?.tagName).toBe("P");
    expect(container.firstElementChild).toHaveTextContent("Hello");
  });
  it("has displayName set", () => {
    expect(Text.displayName).toBe("Text");
  });
  it("forwards ref", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Text, { ref, children: "Ref" }));
    expect(ref.current).toBeTruthy();
    expect(ref.current?.tagName).toBe("P");
  });
  it('renders as h1 when element="h1"', () => {
    const { container } = render(/* @__PURE__ */ jsx(Text, { element: "h1", children: "Title" }));
    expect(container.firstElementChild?.tagName).toBe("H1");
  });
  it('renders as span when element="span"', () => {
    const { container } = render(/* @__PURE__ */ jsx(Text, { element: "span", children: "Inline" }));
    expect(container.firstElementChild?.tagName).toBe("SPAN");
  });
  it('renders as div when element="div"', () => {
    const { container } = render(/* @__PURE__ */ jsx(Text, { element: "div", children: "Block" }));
    expect(container.firstElementChild?.tagName).toBe("DIV");
  });
  it("applies alignment class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Text, { align: "center", children: "Centered" }));
    expect(container.firstElementChild).toHaveClass("w3f-text-center");
  });
  it("applies leading class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Text, { leading: "relaxed", children: "Spaced" }));
    expect(container.firstElementChild).toHaveClass("w3f-leading-relaxed");
  });
  it("applies customClasses", () => {
    const { container } = render(/* @__PURE__ */ jsx(Text, { customClasses: "my-text w3f-bold", children: "Bold" }));
    expect(container.firstElementChild).toHaveClass("my-text");
    expect(container.firstElementChild).toHaveClass("w3f-bold");
  });
  it("renders children content", () => {
    render(/* @__PURE__ */ jsx(Text, { children: "Some text content" }));
    expect(screen.getByText("Some text content")).toBeInTheDocument();
  });
  it("renders content prop array", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Text, { content: ["Part 1", " Part 2"] })
    );
    expect(container.firstElementChild).toHaveTextContent("Part 1 Part 2");
  });
  it("applies direction style", () => {
    const { container } = render(/* @__PURE__ */ jsx(Text, { direction: "rtl", children: "RTL" }));
    expect(container.firstElementChild).toHaveStyle({ direction: "rtl" });
  });
});
//# sourceMappingURL=Text.test.js.map
