import { jsx, jsxs } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarGroup } from "../Avatar";
describe("Avatar", () => {
  it("renders with default props", () => {
    const { container } = render(/* @__PURE__ */ jsx(Avatar, {}));
    const avatar = container.firstElementChild;
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass("w3f-avatar");
    expect(avatar).toHaveClass("w3f-avatar-circle");
    expect(avatar).toHaveClass("w3f-avatar-medium");
  });
  it("has displayName set", () => {
    expect(Avatar.displayName).toBe("Avatar");
  });
  it("forwards ref", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Avatar, { ref }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("renders size classes correctly", () => {
    const { container: small } = render(/* @__PURE__ */ jsx(Avatar, { size: "small" }));
    expect(small.firstElementChild).toHaveClass("w3f-avatar-small");
    const { container: large } = render(/* @__PURE__ */ jsx(Avatar, { size: "large" }));
    expect(large.firstElementChild).toHaveClass("w3f-avatar-large");
    const { container: xlarge } = render(/* @__PURE__ */ jsx(Avatar, { size: "xlarge" }));
    expect(xlarge.firstElementChild).toHaveClass("w3f-avatar-xlarge");
  });
  it("renders color class when no src", () => {
    const { container } = render(/* @__PURE__ */ jsx(Avatar, { color: "blue" }));
    expect(container.firstElementChild).toHaveClass("w3f-avatar-blue");
  });
  it("does not render color class when src is provided", () => {
    const { container } = render(/* @__PURE__ */ jsx(Avatar, { src: "test.jpg", color: "blue" }));
    expect(container.firstElementChild).not.toHaveClass("w3f-avatar-blue");
  });
  it("renders image when src is provided", () => {
    render(/* @__PURE__ */ jsx(Avatar, { src: "test.jpg", alt: "Test" }));
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "test.jpg");
    expect(img).toHaveAttribute("alt", "Test");
    expect(img).toHaveClass("w3f-avatar-img");
  });
  it("renders children text when no src", () => {
    const { container } = render(/* @__PURE__ */ jsx(Avatar, { children: "AB" }));
    const textEl = container.querySelector(".w3f-avatar-text");
    expect(textEl).toBeInTheDocument();
    expect(textEl).toHaveTextContent("AB");
  });
  it('renders fallback "?" when no src and no children', () => {
    const { container } = render(/* @__PURE__ */ jsx(Avatar, {}));
    const textEl = container.querySelector(".w3f-avatar-text");
    expect(textEl).toHaveTextContent("?");
  });
  it("applies hoverable class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Avatar, { hoverable: true }));
    expect(container.firstElementChild).toHaveClass("w3f-avatar-hoverable");
  });
  it("renders status indicator", () => {
    const { container } = render(/* @__PURE__ */ jsx(Avatar, { status: "online" }));
    expect(container.querySelector(".w3f-avatar-wrapper")).toBeInTheDocument();
    expect(container.querySelector(".w3f-avatar-status-online")).toBeInTheDocument();
  });
  it("renders badge with capping at 99+", () => {
    const { container } = render(/* @__PURE__ */ jsx(Avatar, { badge: 150 }));
    expect(container.querySelector(".w3f-avatar-badge")).toHaveTextContent("99+");
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(Avatar, { className: "my-custom" }));
    expect(container.firstElementChild).toHaveClass("my-custom");
  });
});
describe("AvatarGroup", () => {
  it("has displayName set", () => {
    expect(AvatarGroup.displayName).toBe("AvatarGroup");
  });
  it("forwards ref", () => {
    const ref = { current: null };
    render(
      /* @__PURE__ */ jsx(AvatarGroup, { ref, children: /* @__PURE__ */ jsx(Avatar, { children: "A" }) })
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("renders with w3f-avatar-group class", () => {
    const { container } = render(
      /* @__PURE__ */ jsxs(AvatarGroup, { children: [
        /* @__PURE__ */ jsx(Avatar, { children: "A" }),
        /* @__PURE__ */ jsx(Avatar, { children: "B" })
      ] })
    );
    expect(container.firstElementChild).toHaveClass("w3f-avatar-group");
  });
  it("limits visible avatars via max prop and shows overflow", () => {
    const { container } = render(
      /* @__PURE__ */ jsxs(AvatarGroup, { max: 2, children: [
        /* @__PURE__ */ jsx(Avatar, { children: "A" }),
        /* @__PURE__ */ jsx(Avatar, { children: "B" }),
        /* @__PURE__ */ jsx(Avatar, { children: "C" }),
        /* @__PURE__ */ jsx(Avatar, { children: "D" })
      ] })
    );
    const group = container.firstElementChild;
    expect(group.textContent).toContain("+2");
  });
});
//# sourceMappingURL=Avatar.test.js.map
