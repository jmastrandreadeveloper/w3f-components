import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RangeSlider from "../RangeSlider";
describe("RangeSlider", () => {
  it("renders a group element", () => {
    render(/* @__PURE__ */ jsx(RangeSlider, {}));
    expect(screen.getByRole("group")).toBeInTheDocument();
  });
  it("renders two accessible range inputs", () => {
    render(/* @__PURE__ */ jsx(RangeSlider, {}));
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });
  it("applies the wrapper class w3f-range-slider-wrapper", () => {
    const { container } = render(/* @__PURE__ */ jsx(RangeSlider, {}));
    expect(container.querySelector(".w3f-range-slider-wrapper")).toBeInTheDocument();
  });
  it("applies custom className to outer div", () => {
    const { container } = render(/* @__PURE__ */ jsx(RangeSlider, { className: "custom-range" }));
    expect(container.firstElementChild).toHaveClass("custom-range");
  });
  it("sets default aria-label", () => {
    render(/* @__PURE__ */ jsx(RangeSlider, {}));
    expect(screen.getByRole("group")).toHaveAttribute("aria-label", "Selector de rango");
  });
  it("accepts custom ariaLabel", () => {
    render(/* @__PURE__ */ jsx(RangeSlider, { ariaLabel: "Price range" }));
    expect(screen.getByRole("group")).toHaveAttribute("aria-label", "Price range");
  });
  it("renders value labels", () => {
    render(/* @__PURE__ */ jsx(RangeSlider, {}));
    expect(screen.getByText("Valor m\xEDnimo")).toBeInTheDocument();
    expect(screen.getByText("Valor m\xE1ximo")).toBeInTheDocument();
  });
  it("applies is-disabled class when disabled", () => {
    const { container } = render(/* @__PURE__ */ jsx(RangeSlider, { disabled: true }));
    expect(container.querySelector(".is-disabled")).toBeInTheDocument();
  });
  it("disables both range inputs", () => {
    render(/* @__PURE__ */ jsx(RangeSlider, { disabled: true }));
    const sliders = screen.getAllByRole("slider");
    sliders.forEach((s) => expect(s).toBeDisabled());
  });
  it("shows error message with role alert", () => {
    render(/* @__PURE__ */ jsx(RangeSlider, { error: "Invalid range" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid range");
  });
  it("applies has-error class when error", () => {
    const { container } = render(/* @__PURE__ */ jsx(RangeSlider, { error: "err" }));
    expect(container.querySelector(".has-error")).toBeInTheDocument();
  });
  it("forwards ref to wrapper div", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(RangeSlider, { ref }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("has displayName set", () => {
    expect(RangeSlider.displayName).toBe("RangeSlider");
  });
});
//# sourceMappingURL=RangeSlider.test.js.map
