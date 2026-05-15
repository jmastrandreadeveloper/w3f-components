import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "../Slider";
describe("Slider", () => {
  it("renders a range input", () => {
    render(/* @__PURE__ */ jsx(Slider, {}));
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });
  it("renders label when provided", () => {
    render(/* @__PURE__ */ jsx(Slider, { label: "Volume" }));
    expect(screen.getByText("Volume")).toBeInTheDocument();
  });
  it("applies the component class w3f-slider-component", () => {
    const { container } = render(/* @__PURE__ */ jsx(Slider, {}));
    expect(container.querySelector(".w3f-slider-component")).toBeInTheDocument();
  });
  it("applies the input class w3f-range-input", () => {
    render(/* @__PURE__ */ jsx(Slider, {}));
    expect(screen.getByRole("slider")).toHaveClass("w3f-range-input");
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(Slider, { className: "my-slider" }));
    expect(container.firstElementChild).toHaveClass("my-slider");
  });
  it("sets min, max, step attributes", () => {
    render(/* @__PURE__ */ jsx(Slider, { min: 10, max: 200, step: 5 }));
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("min", "10");
    expect(slider).toHaveAttribute("max", "200");
    expect(slider).toHaveAttribute("step", "5");
  });
  it("shows value display by default", () => {
    render(/* @__PURE__ */ jsx(Slider, { value: 42 }));
    expect(screen.getByText("42")).toBeInTheDocument();
  });
  it("hides value display when showValue is false", () => {
    render(/* @__PURE__ */ jsx(Slider, { value: 42, showValue: false }));
    expect(screen.queryByText("42")).not.toBeInTheDocument();
  });
  it("disables the slider", () => {
    render(/* @__PURE__ */ jsx(Slider, { disabled: true }));
    expect(screen.getByRole("slider")).toBeDisabled();
  });
  it("fires onChange when value changes", () => {
    const onChange = vi.fn();
    render(/* @__PURE__ */ jsx(Slider, { onChange, value: 50 }));
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "75" } });
    expect(onChange).toHaveBeenCalledWith(75);
  });
  it("forwards ref to the input element", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Slider, { ref }));
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
  it("has displayName set", () => {
    expect(Slider.displayName).toBe("Slider");
  });
});
//# sourceMappingURL=Slider.test.js.map
