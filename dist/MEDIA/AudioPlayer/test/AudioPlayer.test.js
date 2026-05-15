import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import AudioPlayer from "../AudioPlayer";
beforeAll(() => {
  HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(void 0);
  HTMLMediaElement.prototype.pause = vi.fn();
});
describe("AudioPlayer", () => {
  const defaultSrc = "https://example.com/audio.mp3";
  it("renders without crashing", () => {
    const { container } = render(/* @__PURE__ */ jsx(AudioPlayer, { src: defaultSrc }));
    expect(container.firstChild).toBeTruthy();
  });
  it("has displayName set", () => {
    expect(AudioPlayer.displayName).toBe("AudioPlayer");
  });
  it("forwards ref to the container div", () => {
    const ref = React.createRef();
    render(/* @__PURE__ */ jsx(AudioPlayer, { src: defaultSrc, ref }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("applies the base class", () => {
    const { container } = render(/* @__PURE__ */ jsx(AudioPlayer, { src: defaultSrc }));
    expect(container.firstChild).toHaveClass("w3f-audio-player");
  });
  it("applies variant classes", () => {
    const { container: c1 } = render(/* @__PURE__ */ jsx(AudioPlayer, { src: defaultSrc, variant: "compact" }));
    expect(c1.firstChild).toHaveClass("w3f-audio-player--compact");
    const { container: c2 } = render(/* @__PURE__ */ jsx(AudioPlayer, { src: defaultSrc, variant: "card" }));
    expect(c2.firstChild).toHaveClass("w3f-audio-player--card");
    const { container: c3 } = render(/* @__PURE__ */ jsx(AudioPlayer, { src: defaultSrc, variant: "minimal" }));
    expect(c3.firstChild).toHaveClass("w3f-audio-player--minimal");
  });
  it("applies color classes", () => {
    const { container: c1 } = render(/* @__PURE__ */ jsx(AudioPlayer, { src: defaultSrc, color: "secondary" }));
    expect(c1.firstChild).toHaveClass("w3f-audio-player--secondary");
    const { container: c2 } = render(/* @__PURE__ */ jsx(AudioPlayer, { src: defaultSrc, color: "info" }));
    expect(c2.firstChild).toHaveClass("w3f-audio-player--info");
  });
  it("renders a hidden audio element with src", () => {
    render(/* @__PURE__ */ jsx(AudioPlayer, { src: defaultSrc }));
    const audio = document.querySelector("audio");
    expect(audio).toBeTruthy();
    expect(audio?.getAttribute("src")).toBe(defaultSrc);
  });
  it("shows title and artist", () => {
    render(/* @__PURE__ */ jsx(AudioPlayer, { src: defaultSrc, title: "My Song", artist: "The Artist" }));
    expect(screen.getByText("My Song")).toBeTruthy();
    expect(screen.getByText("The Artist")).toBeTruthy();
  });
  it("renders cover image in card variant", () => {
    render(
      /* @__PURE__ */ jsx(
        AudioPlayer,
        {
          src: defaultSrc,
          variant: "card",
          cover: "https://example.com/cover.jpg",
          title: "Album Track"
        }
      )
    );
    const img = document.querySelector(".w3f-audio-player__cover-img");
    expect(img).toBeTruthy();
    expect(img.src).toBe("https://example.com/cover.jpg");
    expect(img.alt).toBe("Album Track cover");
  });
  it("does not render cover image in default variant", () => {
    render(
      /* @__PURE__ */ jsx(AudioPlayer, { src: defaultSrc, variant: "default", cover: "https://example.com/cover.jpg" })
    );
    const img = document.querySelector(".w3f-audio-player__cover-img");
    expect(img).toBeNull();
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(AudioPlayer, { src: defaultSrc, className: "my-audio" }));
    expect(container.firstChild).toHaveClass("my-audio");
  });
  it("has correct aria label with title", () => {
    render(/* @__PURE__ */ jsx(AudioPlayer, { src: defaultSrc, title: "Cool Track" }));
    const root = screen.getByRole("application");
    expect(root).toHaveAttribute("aria-label", "Audio player: Cool Track");
  });
  it("has correct aria label without title", () => {
    render(/* @__PURE__ */ jsx(AudioPlayer, { src: defaultSrc }));
    const root = screen.getByRole("application");
    expect(root).toHaveAttribute("aria-label", "Audio player");
  });
});
//# sourceMappingURL=AudioPlayer.test.js.map
