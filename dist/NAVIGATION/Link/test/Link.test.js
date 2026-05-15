import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Link from "../Link";
describe("Link", () => {
  it("renders with base CSS class", () => {
    render(/* @__PURE__ */ jsx(Link, { href: "/home", children: "Home" }));
    const link = screen.getByRole("link");
    expect(link.className).toContain("w3f-link");
  });
  it("has displayName set", () => {
    expect(Link.displayName).toBe("Link");
  });
  it("forwards ref to the anchor element", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Link, { href: "/test", ref, children: "Test" }));
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });
  it("renders as anchor when href is provided", () => {
    render(/* @__PURE__ */ jsx(Link, { href: "/home", children: "Home" }));
    const link = screen.getByRole("link");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/home");
  });
  it("renders as button when no href is provided", () => {
    render(/* @__PURE__ */ jsx(Link, { onClick: () => {
    }, children: "Click" }));
    const btn = screen.getByRole("button");
    expect(btn.tagName).toBe("BUTTON");
    expect(btn.className).toContain("w3f-link--button");
  });
  it("applies color class", () => {
    render(/* @__PURE__ */ jsx(Link, { href: "#", color: "danger", children: "Danger" }));
    const link = screen.getByRole("link");
    expect(link.className).toContain("w3f-link--danger");
  });
  it("applies underline class", () => {
    render(/* @__PURE__ */ jsx(Link, { href: "#", underline: "hover", children: "Link" }));
    const link = screen.getByRole("link");
    expect(link.className).toContain("w3f-link--underline-hover");
  });
  it("applies variant class", () => {
    render(/* @__PURE__ */ jsx(Link, { href: "#", variant: "h3", children: "Title" }));
    const link = screen.getByRole("link");
    expect(link.className).toContain("w3f-link--h3");
  });
  it("applies disabled class and aria-disabled", () => {
    const { container } = render(/* @__PURE__ */ jsx(Link, { href: "/test", disabled: true, children: "Disabled" }));
    const anchor = container.querySelector("a");
    expect(anchor).toBeInTheDocument();
    expect(anchor?.className).toContain("w3f-link--disabled");
    expect(anchor).toHaveAttribute("aria-disabled", "true");
  });
  it("applies custom className", () => {
    render(/* @__PURE__ */ jsx(Link, { href: "#", className: "my-link", children: "Custom" }));
    const link = screen.getByRole("link");
    expect(link.className).toContain("my-link");
  });
  it("fires onClick callback", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(/* @__PURE__ */ jsx(Link, { onClick, children: "Click me" }));
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it("does not navigate when disabled", () => {
    const { container } = render(/* @__PURE__ */ jsx(Link, { href: "/test", disabled: true, children: "Disabled" }));
    const anchor = container.querySelector("a");
    expect(anchor).not.toHaveAttribute("href");
  });
  it("renders icon on the left by default", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Link, { href: "#", icon: /* @__PURE__ */ jsx("span", { "data-testid": "icon" }), children: "With icon" })
    );
    const iconWrapper = container.querySelector(".w3f-link__icon");
    expect(iconWrapper).toBeInTheDocument();
  });
  it("adds external props when external is true", () => {
    render(/* @__PURE__ */ jsx(Link, { href: "https://example.com", external: true, children: "External" }));
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
//# sourceMappingURL=Link.test.js.map
