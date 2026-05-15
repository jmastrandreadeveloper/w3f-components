import { jsx, jsxs } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Breadcrumbs, BreadcrumbItem } from "../Breadcrumbs";
describe("Breadcrumbs", () => {
  it("renders with base CSS class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Breadcrumbs, {}));
    expect(container.querySelector(".w3f-breadcrumbs")).toBeInTheDocument();
  });
  it("has displayName set", () => {
    expect(Breadcrumbs.displayName).toBe("Breadcrumbs");
  });
  it("forwards ref to the nav element", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Breadcrumbs, { ref }));
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("NAV");
  });
  it("applies size class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Breadcrumbs, { size: "lg" }));
    expect(container.querySelector(".w3f-breadcrumbs--lg")).toBeInTheDocument();
  });
  it("applies color class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Breadcrumbs, { color: "primary" }));
    expect(container.querySelector(".w3f-breadcrumbs--primary")).toBeInTheDocument();
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(Breadcrumbs, { className: "my-crumbs" }));
    expect(container.querySelector(".w3f-breadcrumbs.my-crumbs")).toBeInTheDocument();
  });
  it('renders aria-label="breadcrumb"', () => {
    render(/* @__PURE__ */ jsx(Breadcrumbs, {}));
    expect(screen.getByLabelText("breadcrumb")).toBeInTheDocument();
  });
  it("renders children as list items", () => {
    const { container } = render(
      /* @__PURE__ */ jsxs(Breadcrumbs, { children: [
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: "Home" }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: "Page" })
      ] })
    );
    const items = container.querySelectorAll(".w3f-breadcrumbs__item");
    expect(items).toHaveLength(2);
  });
  it("renders separators between items", () => {
    const { container } = render(
      /* @__PURE__ */ jsxs(Breadcrumbs, { children: [
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: "Home" }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: "Page" }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { active: true, children: "Current" })
      ] })
    );
    const separators = container.querySelectorAll(".w3f-breadcrumbs__separator");
    expect(separators).toHaveLength(2);
  });
  it("collapses items when maxItems is set", () => {
    const { container } = render(
      /* @__PURE__ */ jsxs(Breadcrumbs, { maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 1, children: [
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: "Home" }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: "Products" }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: "Category" }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { active: true, children: "Item" })
      ] })
    );
    const expandBtn = container.querySelector(".w3f-breadcrumb-expand");
    expect(expandBtn).toBeInTheDocument();
  });
  it("expands collapsed items on button click", async () => {
    const user = userEvent.setup();
    const { container } = render(
      /* @__PURE__ */ jsxs(Breadcrumbs, { maxItems: 3, itemsBeforeCollapse: 1, itemsAfterCollapse: 1, children: [
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: "Home" }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: "Products" }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: "Category" }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { active: true, children: "Item" })
      ] })
    );
    const expandBtn = container.querySelector(".w3f-breadcrumb-expand");
    await user.click(expandBtn);
    expect(container.querySelector(".w3f-breadcrumb-expand")).not.toBeInTheDocument();
    const items = container.querySelectorAll(".w3f-breadcrumbs__item");
    expect(items).toHaveLength(4);
  });
});
describe("BreadcrumbItem", () => {
  it("has displayName set", () => {
    expect(BreadcrumbItem.displayName).toBe("BreadcrumbItem");
  });
  it("renders active class and aria-current when active", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Breadcrumbs, { children: /* @__PURE__ */ jsx(BreadcrumbItem, { active: true, children: "Current" }) })
    );
    const item = container.querySelector(".w3f-breadcrumb-item--active");
    expect(item).toBeInTheDocument();
    expect(item).toHaveAttribute("aria-current", "page");
  });
  it("renders disabled class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Breadcrumbs, { children: /* @__PURE__ */ jsx(BreadcrumbItem, { href: "/x", disabled: true, children: "Disabled" }) })
    );
    expect(container.querySelector(".w3f-breadcrumb-item--disabled")).toBeInTheDocument();
  });
  it("renders as link when href is provided", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Breadcrumbs, { children: /* @__PURE__ */ jsx(BreadcrumbItem, { href: "/home", children: "Home" }) })
    );
    const link = container.querySelector("a.w3f-breadcrumb-item");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/home");
  });
  it("fires onClick callback", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = render(
      /* @__PURE__ */ jsx(Breadcrumbs, { children: /* @__PURE__ */ jsx(BreadcrumbItem, { onClick, children: "Click me" }) })
    );
    const link = container.querySelector("a.w3f-breadcrumb-item");
    await user.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it("renders icon element", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Breadcrumbs, { children: /* @__PURE__ */ jsx(BreadcrumbItem, { icon: /* @__PURE__ */ jsx("span", { "data-testid": "icon" }), children: "With icon" }) })
    );
    expect(container.querySelector(".w3f-breadcrumb-item__icon")).toBeInTheDocument();
  });
});
//# sourceMappingURL=Breadcrumbs.test.js.map
