import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card_2 from "../Card_2";
describe("Card_2", () => {
  it("renders with default classes", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card_2, { title: "Test" }));
    const card = container.firstElementChild;
    expect(card).toHaveClass("w3f-card");
    expect(card).toHaveClass("w3f-card--default");
    expect(card).toHaveClass("w3f-card--md");
  });
  it("has displayName set", () => {
    expect(Card_2.displayName).toBe("Card_2");
  });
  it("forwards ref", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Card_2, { ref, title: "T" }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("renders title and subtitle in w3f-slot-header", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card_2, { title: "Title", subtitle: "Sub" }));
    const header = container.querySelector(".w3f-slot-header");
    expect(header).toBeInTheDocument();
    expect(screen.getByText("Title")).toHaveClass("w3f-card-title");
    expect(screen.getByText("Sub")).toHaveClass("w3f-card-subtitle");
  });
  it("renders media slot with image", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card_2, { imageSrc: "photo.jpg", imageAlt: "Pic" }));
    const media = container.querySelector(".w3f-slot-media");
    expect(media).toBeInTheDocument();
    const img = media?.querySelector("img");
    expect(img).toHaveClass("w3f-card-image");
    expect(img).toHaveAttribute("src", "photo.jpg");
  });
  it("renders content in w3f-slot-content", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card_2, { content: /* @__PURE__ */ jsx("p", { children: "Body" }) }));
    const content = container.querySelector(".w3f-slot-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Body");
  });
  it("applies variant classes", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card_2, { variant: "elevated" }));
    expect(container.firstElementChild).toHaveClass("w3f-card--elevated");
  });
  it("applies hoverable and clickable classes", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card_2, { hoverable: true, clickable: true }));
    expect(container.firstElementChild).toHaveClass("w3f-card--hoverable");
    expect(container.firstElementChild).toHaveClass("w3f-card--clickable");
  });
  it("applies fullWidth class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card_2, { fullWidth: true }));
    expect(container.firstElementChild).toHaveClass("w3f-card--full-width");
  });
  it("adds layout class via layoutName", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card_2, { layoutName: "my-layout" }));
    expect(container.firstElementChild).toHaveClass("w3f-card-layout--my-layout");
  });
  it("renders custom content slot", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card_2, { customContent: /* @__PURE__ */ jsx("div", { children: "Custom" }) }));
    const custom = container.querySelector(".w3f-slot-custom");
    expect(custom).toBeInTheDocument();
    expect(custom).toHaveTextContent("Custom");
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(Card_2, { className: "my-card-2" }));
    expect(container.firstElementChild).toHaveClass("my-card-2");
  });
});
//# sourceMappingURL=Card_2.test.js.map
