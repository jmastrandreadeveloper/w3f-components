import { jsx, jsxs } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Masonry, MasonryItem, MasonryCard } from "../Masonry";
import { createRef } from "react";
describe("Masonry", () => {
  it("renders with base class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Masonry, { children: /* @__PURE__ */ jsx("div", { children: "Item 1" }) })
    );
    expect(container.firstChild).toHaveClass("w3f-masonry");
  });
  it("has displayName set", () => {
    expect(Masonry.displayName).toBe("Masonry");
  });
  it("forwards ref", () => {
    const ref = createRef();
    render(/* @__PURE__ */ jsx(Masonry, { ref, children: /* @__PURE__ */ jsx("div", { children: "Item" }) }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("applies column variant class by default", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Masonry, { children: /* @__PURE__ */ jsx("div", { children: "Item" }) })
    );
    expect(container.firstChild).toHaveClass("w3f-masonry--column");
  });
  it("applies flex variant class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Masonry, { variant: "flex", children: /* @__PURE__ */ jsx("div", { children: "Item" }) })
    );
    expect(container.firstChild).toHaveClass("w3f-masonry--flex");
  });
  it("applies grid variant class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Masonry, { variant: "grid", children: /* @__PURE__ */ jsx("div", { children: "Item" }) })
    );
    expect(container.firstChild).toHaveClass("w3f-masonry--grid");
  });
  it("applies custom className", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Masonry, { className: "my-masonry", children: /* @__PURE__ */ jsx("div", { children: "Item" }) })
    );
    expect(container.firstChild).toHaveClass("my-masonry");
  });
  it("renders children", () => {
    render(
      /* @__PURE__ */ jsxs(Masonry, { children: [
        /* @__PURE__ */ jsx("div", { children: "Child A" }),
        /* @__PURE__ */ jsx("div", { children: "Child B" })
      ] })
    );
    expect(screen.getByText("Child A")).toBeInTheDocument();
    expect(screen.getByText("Child B")).toBeInTheDocument();
  });
});
describe("MasonryItem", () => {
  it("has displayName set", () => {
    expect(MasonryItem.displayName).toBe("MasonryItem");
  });
  it("renders with item class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Masonry, { children: /* @__PURE__ */ jsx(MasonryItem, { children: /* @__PURE__ */ jsx("p", { children: "Content" }) }) })
    );
    expect(container.querySelector(".w3f-masonry-item")).toBeInTheDocument();
  });
  it("renders children", () => {
    render(
      /* @__PURE__ */ jsx(Masonry, { children: /* @__PURE__ */ jsx(MasonryItem, { children: /* @__PURE__ */ jsx("span", { children: "Item content" }) }) })
    );
    expect(screen.getByText("Item content")).toBeInTheDocument();
  });
});
describe("MasonryCard", () => {
  it("has displayName set", () => {
    expect(MasonryCard.displayName).toBe("MasonryCard");
  });
  it("renders card with correct class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Masonry, { children: /* @__PURE__ */ jsx(MasonryCard, { title: "Card 1", children: "Body" }) })
    );
    expect(container.querySelector(".w3f-masonry-card")).toBeInTheDocument();
  });
  it("renders title", () => {
    render(
      /* @__PURE__ */ jsx(Masonry, { children: /* @__PURE__ */ jsx(MasonryCard, { title: "Test Card", children: "Body" }) })
    );
    expect(screen.getByText("Test Card")).toBeInTheDocument();
  });
  it("applies hover class by default", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Masonry, { children: /* @__PURE__ */ jsx(MasonryCard, { children: "Body" }) })
    );
    expect(container.querySelector(".w3f-masonry-card--hover")).toBeInTheDocument();
  });
  it("does not apply hover class when hover=false", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Masonry, { children: /* @__PURE__ */ jsx(MasonryCard, { hover: false, children: "Body" }) })
    );
    expect(container.querySelector(".w3f-masonry-card--hover")).not.toBeInTheDocument();
  });
  it("renders gradient header when provided", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Masonry, { children: /* @__PURE__ */ jsx(MasonryCard, { gradient: "linear-gradient(red, blue)", children: "Body" }) })
    );
    expect(container.querySelector(".w3f-masonry-card__header")).toBeInTheDocument();
  });
  it("renders card body with correct class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Masonry, { children: /* @__PURE__ */ jsx(MasonryCard, { children: "Body" }) })
    );
    expect(container.querySelector(".w3f-masonry-card__body")).toBeInTheDocument();
  });
  it("renders hidden input for form integration", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Masonry, { children: /* @__PURE__ */ jsx(MasonryCard, { name: "field", value: "val", children: "Body" }) })
    );
    const input = container.querySelector('input[type="hidden"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "field");
    expect(input).toHaveAttribute("value", "val");
  });
  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      /* @__PURE__ */ jsx(Masonry, { children: /* @__PURE__ */ jsx(MasonryCard, { onClick, children: "Body" }) })
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
//# sourceMappingURL=Masonry.test.js.map
