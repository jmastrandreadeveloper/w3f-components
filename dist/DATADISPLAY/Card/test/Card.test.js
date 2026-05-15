import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "../Card";
describe("Card", () => {
  it("renders with default classes", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card, { title: "Test" }));
    const card = container.firstElementChild;
    expect(card).toHaveClass("w3f-card");
    expect(card).toHaveClass("w3f-card--default");
    expect(card).toHaveClass("w3f-card--md");
  });
  it("has displayName set", () => {
    expect(Card.displayName).toBe("Card");
  });
  it("forwards ref", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Card, { ref, title: "T" }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("renders title and subtitle", () => {
    render(/* @__PURE__ */ jsx(Card, { title: "Card Title", subtitle: "Card Subtitle" }));
    expect(screen.getByText("Card Title")).toHaveClass("w3f-card-title");
    expect(screen.getByText("Card Subtitle")).toHaveClass("w3f-card-subtitle");
  });
  it("renders content", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card, { content: /* @__PURE__ */ jsx("p", { children: "Body text" }) }));
    const content = container.querySelector(".w3f-card-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Body text");
  });
  it("renders image with correct class", () => {
    render(/* @__PURE__ */ jsx(Card, { imageSrc: "test.jpg", imageAlt: "Photo" }));
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "test.jpg");
    expect(img).toHaveClass("w3f-card-image");
  });
  it("applies variant classes", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card, { variant: "elevated" }));
    expect(container.firstElementChild).toHaveClass("w3f-card--elevated");
  });
  it("applies size classes", () => {
    const { container: sm } = render(/* @__PURE__ */ jsx(Card, { size: "sm" }));
    expect(sm.firstElementChild).toHaveClass("w3f-card--sm");
    const { container: lg } = render(/* @__PURE__ */ jsx(Card, { size: "lg" }));
    expect(lg.firstElementChild).toHaveClass("w3f-card--lg");
  });
  it("applies hoverable and clickable classes", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card, { hoverable: true, clickable: true }));
    expect(container.firstElementChild).toHaveClass("w3f-card--hoverable");
    expect(container.firstElementChild).toHaveClass("w3f-card--clickable");
  });
  it("applies fullWidth class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card, { fullWidth: true }));
    expect(container.firstElementChild).toHaveClass("w3f-card--full-width");
  });
  it("applies horizontal class for left/right image", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card, { imagePosition: "left", imageSrc: "test.jpg" }));
    expect(container.firstElementChild).toHaveClass("w3f-card--horizontal");
  });
  it("renders actions area", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card, { actions: /* @__PURE__ */ jsx("button", { children: "Click" }) }));
    const actions = container.querySelector(".w3f-card-actions");
    expect(actions).toBeInTheDocument();
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card, { className: "custom-card" }));
    expect(container.firstElementChild).toHaveClass("custom-card");
  });
});
//# sourceMappingURL=Card.test.js.map
