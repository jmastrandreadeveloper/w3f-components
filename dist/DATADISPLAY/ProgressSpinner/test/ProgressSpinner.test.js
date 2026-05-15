import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProgressSpinner from "../ProgressSpinner";
describe("ProgressSpinner", () => {
  it("renders with status role", () => {
    render(/* @__PURE__ */ jsx(ProgressSpinner, {}));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
  it("has displayName set", () => {
    expect(ProgressSpinner.displayName).toBe("ProgressSpinner");
  });
  it("forwards ref", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(ProgressSpinner, { ref }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("renders SVG element", () => {
    const { container } = render(/* @__PURE__ */ jsx(ProgressSpinner, {}));
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
  it("applies rotate class in indeterminate mode", () => {
    const { container } = render(/* @__PURE__ */ jsx(ProgressSpinner, { mode: "indeterminate" }));
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("w3f-spinner-rotate");
  });
  it("does not apply rotate class in determinate mode", () => {
    const { container } = render(/* @__PURE__ */ jsx(ProgressSpinner, { mode: "determinate", value: 50 }));
    const svg = container.querySelector("svg");
    expect(svg).not.toHaveClass("w3f-spinner-rotate");
  });
  it("renders background circle in determinate mode", () => {
    const { container } = render(/* @__PURE__ */ jsx(ProgressSpinner, { mode: "determinate", value: 50 }));
    const circles = container.querySelectorAll("circle");
    expect(circles.length).toBe(2);
  });
  it("renders only main circle in indeterminate mode", () => {
    const { container } = render(/* @__PURE__ */ jsx(ProgressSpinner, { mode: "indeterminate" }));
    const circles = container.querySelectorAll("circle");
    expect(circles.length).toBe(1);
  });
  it("applies spinner-path class on main circle in indeterminate mode", () => {
    const { container } = render(/* @__PURE__ */ jsx(ProgressSpinner, { mode: "indeterminate" }));
    const circle = container.querySelector("circle");
    expect(circle).toHaveClass("w3f-spinner-path");
  });
  it("has correct aria-label for indeterminate mode", () => {
    render(/* @__PURE__ */ jsx(ProgressSpinner, { mode: "indeterminate" }));
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Cargando");
  });
  it("has correct aria-label for determinate mode", () => {
    render(/* @__PURE__ */ jsx(ProgressSpinner, { mode: "determinate", value: 75 }));
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Progreso: 75%");
  });
  it("accepts custom ariaLabel", () => {
    render(/* @__PURE__ */ jsx(ProgressSpinner, { ariaLabel: "Loading data" }));
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading data");
  });
});
//# sourceMappingURL=ProgressSpinner.test.js.map
