import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Badge from "../Badge";
import BadgeWrapper from "../BadgeWrapper";
describe("Badge", () => {
  it("renders with default props", () => {
    render(/* @__PURE__ */ jsx(Badge, { children: "5" }));
    const badge = screen.getByRole("status");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("w3f-badge");
    expect(badge).toHaveClass("w3f-bg-primary");
    expect(badge).toHaveClass("w3f-badge-md");
  });
  it("has displayName set", () => {
    expect(Badge.displayName).toBe("Badge");
  });
  it("forwards ref", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Badge, { ref, children: "1" }));
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
  it("applies color classes", () => {
    const { rerender } = render(/* @__PURE__ */ jsx(Badge, { color: "success", children: "1" }));
    expect(screen.getByRole("status")).toHaveClass("w3f-bg-success");
    rerender(/* @__PURE__ */ jsx(Badge, { color: "danger", children: "1" }));
    expect(screen.getByRole("status")).toHaveClass("w3f-bg-danger");
  });
  it("applies size classes", () => {
    const { rerender } = render(/* @__PURE__ */ jsx(Badge, { size: "sm", children: "1" }));
    expect(screen.getByRole("status")).toHaveClass("w3f-badge-sm");
    rerender(/* @__PURE__ */ jsx(Badge, { size: "lg", children: "1" }));
    expect(screen.getByRole("status")).toHaveClass("w3f-badge-lg");
  });
  it("applies variant classes", () => {
    const { rerender } = render(/* @__PURE__ */ jsx(Badge, { variant: "outline", children: "1" }));
    expect(screen.getByRole("status")).toHaveClass("w3f-badge-outline");
    rerender(/* @__PURE__ */ jsx(Badge, { variant: "soft", children: "1" }));
    expect(screen.getByRole("status")).toHaveClass("w3f-badge-soft");
    rerender(/* @__PURE__ */ jsx(Badge, { variant: "dot" }));
    expect(screen.getByRole("status")).toHaveClass("w3f-badge-dot");
  });
  it("applies position class", () => {
    render(/* @__PURE__ */ jsx(Badge, { position: "top-right", children: "1" }));
    expect(screen.getByRole("status")).toHaveClass("badge-top-right");
  });
  it("applies pulse class", () => {
    render(/* @__PURE__ */ jsx(Badge, { pulse: true, children: "1" }));
    expect(screen.getByRole("status")).toHaveClass("w3f-badge-pulse");
  });
  it("applies animate class", () => {
    render(/* @__PURE__ */ jsx(Badge, { animate: true, children: "1" }));
    expect(screen.getByRole("status")).toHaveClass("w3f-badge-animate");
  });
  it("returns null when invisible", () => {
    const { container } = render(/* @__PURE__ */ jsx(Badge, { invisible: true, children: "5" }));
    expect(container.firstElementChild).toBeNull();
  });
  it("caps content at max", () => {
    render(/* @__PURE__ */ jsx(Badge, { max: 99, children: 150 }));
    expect(screen.getByRole("status")).toHaveTextContent("99+");
  });
  it("applies unstyled class", () => {
    render(/* @__PURE__ */ jsx(Badge, { unstyled: true, children: "1" }));
    const badge = screen.getByRole("status");
    expect(badge).toHaveClass("w3f-badge--unstyled");
    expect(badge).not.toHaveClass("w3f-bg-primary");
  });
  it("applies custom className", () => {
    render(/* @__PURE__ */ jsx(Badge, { className: "my-badge", children: "1" }));
    expect(screen.getByRole("status")).toHaveClass("my-badge");
  });
});
describe("BadgeWrapper", () => {
  it("has displayName set", () => {
    expect(BadgeWrapper.displayName).toBe("BadgeWrapper");
  });
  it("forwards ref", () => {
    const ref = { current: null };
    render(
      /* @__PURE__ */ jsx(BadgeWrapper, { ref, badgeContent: 5, children: /* @__PURE__ */ jsx("span", { children: "child" }) })
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("renders with w3f-badge-wrapper class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(BadgeWrapper, { badgeContent: 3, children: /* @__PURE__ */ jsx("span", { children: "child" }) })
    );
    expect(container.firstElementChild).toHaveClass("w3f-badge-wrapper");
  });
  it("renders badge content", () => {
    render(
      /* @__PURE__ */ jsx(BadgeWrapper, { badgeContent: 7, children: /* @__PURE__ */ jsx("span", { children: "child" }) })
    );
    expect(screen.getByRole("status")).toHaveTextContent("7");
  });
  it("hides badge when badgeContent is 0 without showZero", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(BadgeWrapper, { badgeContent: 0, children: /* @__PURE__ */ jsx("span", { children: "child" }) })
    );
    expect(container.querySelector('[role="status"]')).toBeNull();
  });
  it("shows badge when badgeContent is 0 with showZero", () => {
    render(
      /* @__PURE__ */ jsx(BadgeWrapper, { badgeContent: 0, badgeProps: { showZero: true }, children: /* @__PURE__ */ jsx("span", { children: "child" }) })
    );
    expect(screen.getByRole("status")).toHaveTextContent("0");
  });
});
//# sourceMappingURL=Badge.test.js.map
