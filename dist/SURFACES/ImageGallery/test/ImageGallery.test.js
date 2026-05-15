import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ImageGallery from "../ImageGallery";
const sampleImages = [
  { id: "1", src: "/img1.jpg", alt: "Image 1", caption: "First image" },
  { id: "2", src: "/img2.jpg", alt: "Image 2", caption: "Second image" },
  { id: "3", src: "/img3.jpg", alt: "Image 3" }
];
describe("ImageGallery", () => {
  it("renders container with base class", () => {
    const { container } = render(/* @__PURE__ */ jsx(ImageGallery, { images: sampleImages }));
    expect(container.querySelector(".w3f-gallery-container")).toBeInTheDocument();
  });
  it("has displayName set", () => {
    expect(ImageGallery.displayName).toBe("ImageGallery");
  });
  it("renders title when provided", () => {
    render(/* @__PURE__ */ jsx(ImageGallery, { images: sampleImages, title: "My Gallery" }));
    expect(screen.getByText("My Gallery")).toBeInTheDocument();
    expect(screen.getByText("My Gallery").tagName).toBe("H3");
  });
  it("renders empty state when no images", () => {
    render(/* @__PURE__ */ jsx(ImageGallery, { images: [] }));
    expect(screen.getByText("No hay im\xE1genes para mostrar")).toBeInTheDocument();
  });
  it("renders custom empty message", () => {
    render(/* @__PURE__ */ jsx(ImageGallery, { images: [], emptyMessage: "Nothing here" }));
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });
  it("renders gallery items", () => {
    const { container } = render(/* @__PURE__ */ jsx(ImageGallery, { images: sampleImages }));
    const items = container.querySelectorAll(".w3f-gallery-item");
    expect(items.length).toBe(3);
  });
  it("renders captions when showCaptions is true", () => {
    render(/* @__PURE__ */ jsx(ImageGallery, { images: sampleImages, showCaptions: true }));
    expect(screen.getByText("First image")).toBeInTheDocument();
    expect(screen.getByText("Second image")).toBeInTheDocument();
  });
  it("does not render captions by default", () => {
    render(/* @__PURE__ */ jsx(ImageGallery, { images: sampleImages }));
    expect(screen.queryByText("First image")).not.toBeInTheDocument();
  });
  it("applies grid layout class by default", () => {
    const { container } = render(/* @__PURE__ */ jsx(ImageGallery, { images: sampleImages }));
    expect(container.querySelector(".w3f-gallery-grid")).toBeInTheDocument();
  });
  it("empty state has correct classes", () => {
    const { container } = render(/* @__PURE__ */ jsx(ImageGallery, { images: [] }));
    expect(container.querySelector(".w3f-gallery-empty")).toBeInTheDocument();
    expect(container.querySelector(".w3f-gallery-empty-text")).toBeInTheDocument();
  });
});
//# sourceMappingURL=ImageGallery.test.js.map
