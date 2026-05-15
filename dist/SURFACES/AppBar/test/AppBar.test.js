import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppBar, AppBarLeading, AppBarTitle, AppBarTrailing } from "../AppBar";
import { createRef } from "react";
describe("AppBar", () => {
  it("renders with base class", () => {
    const { container } = render(/* @__PURE__ */ jsx(AppBar, { children: "Content" }));
    expect(container.querySelector("header")).toHaveClass("w3f-app-bar");
  });
  it("has displayName set", () => {
    expect(AppBar.displayName).toBe("AppBar");
  });
  it("forwards ref to header element", () => {
    const ref = createRef();
    render(/* @__PURE__ */ jsx(AppBar, { ref, children: "Content" }));
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("HEADER");
  });
  it("renders children inside toolbar", () => {
    render(/* @__PURE__ */ jsx(AppBar, { children: /* @__PURE__ */ jsx("span", { children: "My App" }) }));
    expect(screen.getByText("My App")).toBeInTheDocument();
  });
  it("applies primary color class by default", () => {
    const { container } = render(/* @__PURE__ */ jsx(AppBar, { children: "Content" }));
    expect(container.querySelector("header")).toHaveClass("w3f-app-bar--primary");
  });
  it("applies secondary color class", () => {
    const { container } = render(/* @__PURE__ */ jsx(AppBar, { color: "secondary", children: "Content" }));
    expect(container.querySelector("header")).toHaveClass("w3f-app-bar--secondary");
  });
  it("applies dark color class", () => {
    const { container } = render(/* @__PURE__ */ jsx(AppBar, { color: "dark", children: "Content" }));
    expect(container.querySelector("header")).toHaveClass("w3f-app-bar--dark");
  });
  it("applies fixed position class", () => {
    const { container } = render(/* @__PURE__ */ jsx(AppBar, { position: "fixed", children: "Content" }));
    expect(container.querySelector("header")).toHaveClass("w3f-app-bar--fixed");
  });
  it("applies sticky position class", () => {
    const { container } = render(/* @__PURE__ */ jsx(AppBar, { position: "sticky", children: "Content" }));
    expect(container.querySelector("header")).toHaveClass("w3f-app-bar--sticky");
  });
  it("applies sm size class", () => {
    const { container } = render(/* @__PURE__ */ jsx(AppBar, { size: "sm", children: "Content" }));
    expect(container.querySelector("header")).toHaveClass("w3f-app-bar--sm");
  });
  it("applies elevated class by default", () => {
    const { container } = render(/* @__PURE__ */ jsx(AppBar, { children: "Content" }));
    expect(container.querySelector("header")).toHaveClass("w3f-app-bar--elevated");
  });
  it("does not apply elevated class when elevated=false", () => {
    const { container } = render(/* @__PURE__ */ jsx(AppBar, { elevated: false, children: "Content" }));
    expect(container.querySelector("header")).not.toHaveClass("w3f-app-bar--elevated");
  });
  it("renders toolbar div with correct class", () => {
    const { container } = render(/* @__PURE__ */ jsx(AppBar, { children: "Content" }));
    expect(container.querySelector(".w3f-app-bar__toolbar")).toBeInTheDocument();
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(AppBar, { className: "my-bar", children: "Content" }));
    expect(container.querySelector("header")).toHaveClass("my-bar");
  });
});
describe("AppBar slot components", () => {
  it("AppBarLeading renders with correct class", () => {
    const { container } = render(/* @__PURE__ */ jsx(AppBarLeading, { children: "Logo" }));
    expect(container.firstChild).toHaveClass("w3f-app-bar__leading");
  });
  it("AppBarTitle renders with correct class", () => {
    const { container } = render(/* @__PURE__ */ jsx(AppBarTitle, { children: "Title" }));
    expect(container.firstChild).toHaveClass("w3f-app-bar__title");
  });
  it("AppBarTrailing renders with correct class", () => {
    const { container } = render(/* @__PURE__ */ jsx(AppBarTrailing, { children: "Actions" }));
    expect(container.firstChild).toHaveClass("w3f-app-bar__trailing");
  });
  it("slot components have displayName set", () => {
    expect(AppBarLeading.displayName).toBe("AppBarLeading");
    expect(AppBarTitle.displayName).toBe("AppBarTitle");
    expect(AppBarTrailing.displayName).toBe("AppBarTrailing");
  });
});
//# sourceMappingURL=AppBar.test.js.map
