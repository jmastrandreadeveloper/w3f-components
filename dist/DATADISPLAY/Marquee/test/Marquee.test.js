import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Marquee from "../Marquee";
import { buildFadeMask } from "../Marquee.utils";
describe("Marquee", () => {
  it("renders with base class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { children: /* @__PURE__ */ jsx("span", { children: "Item 1" }) })
    );
    expect(container.firstElementChild).toHaveClass("w3f-marquee");
  });
  it("has displayName set", () => {
    expect(Marquee.displayName).toBe("Marquee");
  });
  it("forwards ref", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Marquee, { ref, children: /* @__PURE__ */ jsx("span", { children: "Ref" }) }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("renders children content", () => {
    render(/* @__PURE__ */ jsx(Marquee, { children: /* @__PURE__ */ jsx("span", { children: "Logo A" }) }));
    const items = screen.getAllByText("Logo A");
    expect(items.length).toBeGreaterThanOrEqual(1);
    expect(items[0]).toBeInTheDocument();
  });
  it("applies horizontal class by default", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { children: /* @__PURE__ */ jsx("span", { children: "H" }) })
    );
    expect(container.firstElementChild).toHaveClass("w3f-marquee--horizontal");
  });
  it("applies vertical class for up direction", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { direction: "up", children: /* @__PURE__ */ jsx("span", { children: "V" }) })
    );
    expect(container.firstElementChild).toHaveClass("w3f-marquee--vertical");
  });
  it("applies vertical class for down direction", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { direction: "down", children: /* @__PURE__ */ jsx("span", { children: "V" }) })
    );
    expect(container.firstElementChild).toHaveClass("w3f-marquee--vertical");
  });
  it("applies pause-hover class by default", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { children: /* @__PURE__ */ jsx("span", { children: "P" }) })
    );
    expect(container.firstElementChild).toHaveClass("w3f-marquee--pause-hover");
  });
  it("does not apply pause-hover when disabled", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { pauseOnHover: false, children: /* @__PURE__ */ jsx("span", { children: "NP" }) })
    );
    expect(container.firstElementChild).not.toHaveClass("w3f-marquee--pause-hover");
  });
  it("applies left track direction by default", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { children: /* @__PURE__ */ jsx("span", { children: "L" }) })
    );
    const track = container.querySelector(".w3f-marquee__track");
    expect(track).toHaveClass("w3f-marquee__track--left");
  });
  it("applies right track direction", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { direction: "right", children: /* @__PURE__ */ jsx("span", { children: "R" }) })
    );
    const track = container.querySelector(".w3f-marquee__track");
    expect(track).toHaveClass("w3f-marquee__track--right");
  });
  it("applies up track direction", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { direction: "up", children: /* @__PURE__ */ jsx("span", { children: "U" }) })
    );
    const track = container.querySelector(".w3f-marquee__track");
    expect(track).toHaveClass("w3f-marquee__track--up");
  });
  it("applies down track direction", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { direction: "down", children: /* @__PURE__ */ jsx("span", { children: "D" }) })
    );
    const track = container.querySelector(".w3f-marquee__track");
    expect(track).toHaveClass("w3f-marquee__track--down");
  });
  it("duplicates children based on repeat prop", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { repeat: 3, children: /* @__PURE__ */ jsx("span", { children: "Item" }) })
    );
    const groups = container.querySelectorAll(".w3f-marquee__group");
    expect(groups.length).toBe(3);
  });
  it("defaults to 2 repetitions", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { children: /* @__PURE__ */ jsx("span", { children: "Item" }) })
    );
    const groups = container.querySelectorAll(".w3f-marquee__group");
    expect(groups.length).toBe(2);
  });
  it("marks duplicate groups as aria-hidden", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { repeat: 3, children: /* @__PURE__ */ jsx("span", { children: "Item" }) })
    );
    const groups = container.querySelectorAll(".w3f-marquee__group");
    expect(groups[0].getAttribute("aria-hidden")).toBeNull();
    expect(groups[1].getAttribute("aria-hidden")).toBe("true");
    expect(groups[2].getAttribute("aria-hidden")).toBe("true");
  });
  it('has role="marquee" for accessibility', () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { children: /* @__PURE__ */ jsx("span", { children: "A11y" }) })
    );
    expect(container.firstElementChild).toHaveAttribute("role", "marquee");
  });
  it("sets default aria-label", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { children: /* @__PURE__ */ jsx("span", { children: "Test" }) })
    );
    expect(container.firstElementChild).toHaveAttribute("aria-label", "Scrolling content");
  });
  it("accepts custom aria-label", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { "aria-label": "Our partners", children: /* @__PURE__ */ jsx("span", { children: "Test" }) })
    );
    expect(container.firstElementChild).toHaveAttribute("aria-label", "Our partners");
  });
  it("applies custom className", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { className: "my-marquee", children: /* @__PURE__ */ jsx("span", { children: "C" }) })
    );
    expect(container.firstElementChild).toHaveClass("my-marquee");
  });
  it("sets CSS custom properties via style", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { speed: 15, gap: 32, children: /* @__PURE__ */ jsx("span", { children: "S" }) })
    );
    const el = container.firstElementChild;
    expect(el.style.getPropertyValue("--marquee-speed")).toBe("15s");
    expect(el.style.getPropertyValue("--marquee-gap")).toBe("32px");
  });
  it("generates fade mask for non-zero fadeEdge", () => {
    const mask = buildFadeMask("left", 50);
    expect(mask).toContain("linear-gradient");
    expect(mask).toContain("50px");
  });
  it("does not generate fade mask when fadeEdge is 0", () => {
    const mask = buildFadeMask("left", 0);
    expect(mask).toBeUndefined();
  });
  it("clamps repeat to at least 1", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { repeat: -5, children: /* @__PURE__ */ jsx("span", { children: "Item" }) })
    );
    const groups = container.querySelectorAll(".w3f-marquee__group");
    expect(groups.length).toBe(1);
  });
  it("renders as a div element", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Marquee, { children: /* @__PURE__ */ jsx("span", { children: "Div" }) })
    );
    expect(container.firstElementChild?.tagName).toBe("DIV");
  });
});
//# sourceMappingURL=Marquee.test.js.map
