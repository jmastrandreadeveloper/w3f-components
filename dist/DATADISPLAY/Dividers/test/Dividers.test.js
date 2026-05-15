import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Dividers from "../Dividers";
describe("Dividers", () => {
  it("renders horizontal divider by default", () => {
    const { container } = render(/* @__PURE__ */ jsx(Dividers, {}));
    const hr = container.querySelector("hr");
    expect(hr).toBeInTheDocument();
    expect(hr).toHaveClass("w3f-dividers");
    expect(hr).toHaveClass("w3f-dividers-horizontal");
  });
  it("has displayName set", () => {
    expect(Dividers.displayName).toBe("Dividers");
  });
  it("forwards ref", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Dividers, { ref }));
    expect(ref.current).toBeTruthy();
  });
  it("renders vertical divider with separator role", () => {
    const { container } = render(/* @__PURE__ */ jsx(Dividers, { type: "vertical" }));
    const span = container.querySelector("span");
    expect(span).toBeInTheDocument();
    expect(span).toHaveClass("w3f-dividers");
    expect(span).toHaveClass("w3f-dividers-vertical");
    expect(span).toHaveAttribute("role", "separator");
    expect(span).toHaveAttribute("aria-orientation", "vertical");
  });
  it("applies gradient variant class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Dividers, { variant: "gradient" }));
    expect(container.firstElementChild).toHaveClass("w3f-dividers-gradient");
  });
  it("applies animated class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Dividers, { animated: true }));
    expect(container.firstElementChild).toHaveClass("w3f-dividers-animated");
  });
  it("renders horizontal divider with content", () => {
    const { container } = render(/* @__PURE__ */ jsx(Dividers, { type: "horizontal", children: "OR" }));
    const wrapper = container.querySelector(".w3f-dividers-with-content");
    expect(wrapper).toBeInTheDocument();
    const content = container.querySelector(".w3f-dividers-content");
    expect(content).toHaveTextContent("OR");
  });
  it("applies content position class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Dividers, { type: "horizontal", contentPosition: "left", children: "Text" })
    );
    const wrapper = container.querySelector(".w3f-dividers-with-content");
    expect(wrapper).toHaveClass("w3f-dividers-with-content--left");
  });
  it("renders lines around centered content", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Dividers, { type: "horizontal", children: "Center" })
    );
    const lines = container.querySelectorAll(".w3f-dividers-line");
    expect(lines.length).toBe(2);
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(Dividers, { className: "my-divider" }));
    expect(container.firstElementChild).toHaveClass("my-divider");
  });
});
//# sourceMappingURL=Dividers.test.js.map
