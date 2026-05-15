import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProgressBar from "../ProgressBar";
import ProgressBarBuffer from "../ProgressBarBuffer";
import ProgressBarIndeterminate from "../ProgressBarIndeterminate";
describe("ProgressBar", () => {
  it("renders with progressbar role", () => {
    render(/* @__PURE__ */ jsx(ProgressBar, { progress: 50 }));
    const bar = screen.getByRole("progressbar");
    expect(bar).toBeInTheDocument();
  });
  it("has displayName set", () => {
    expect(ProgressBar.displayName).toBe("ProgressBar");
  });
  it("forwards ref", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(ProgressBar, { ref, progress: 50 }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("applies default size class (md)", () => {
    render(/* @__PURE__ */ jsx(ProgressBar, { progress: 50 }));
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveClass("w3f-progress-bar-container");
  });
  it("applies sm size class", () => {
    render(/* @__PURE__ */ jsx(ProgressBar, { progress: 50, size: "sm" }));
    expect(screen.getByRole("progressbar")).toHaveClass("w3f-progress-bar-container-sm");
  });
  it("applies lg size class", () => {
    render(/* @__PURE__ */ jsx(ProgressBar, { progress: 50, size: "lg" }));
    expect(screen.getByRole("progressbar")).toHaveClass("w3f-progress-bar-container-lg");
  });
  it("applies color class on fill", () => {
    const { container } = render(/* @__PURE__ */ jsx(ProgressBar, { progress: 50, color: "primary" }));
    const fill = container.querySelector(".w3f-progress-bar-fill");
    expect(fill).toHaveClass("w3f-bg-primary");
  });
  it("sets aria-valuenow", () => {
    render(/* @__PURE__ */ jsx(ProgressBar, { progress: 75 }));
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "75");
  });
  it("clamps progress between 0 and 100", () => {
    const { rerender } = render(/* @__PURE__ */ jsx(ProgressBar, { progress: -10 }));
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
    rerender(/* @__PURE__ */ jsx(ProgressBar, { progress: 200 }));
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
  });
  it("shows label text by default when progress > 0", () => {
    const { container } = render(/* @__PURE__ */ jsx(ProgressBar, { progress: 42 }));
    const text = container.querySelector(".w3f-progress-bar-text");
    expect(text).toHaveTextContent("42%");
  });
  it("hides label when showLabel=false", () => {
    const { container } = render(/* @__PURE__ */ jsx(ProgressBar, { progress: 42, showLabel: false }));
    expect(container.querySelector(".w3f-progress-bar-text")).toBeNull();
  });
});
describe("ProgressBarBuffer", () => {
  it("has displayName set", () => {
    expect(ProgressBarBuffer.displayName).toBe("ProgressBarBuffer");
  });
  it("renders with progressbar role", () => {
    render(/* @__PURE__ */ jsx(ProgressBarBuffer, { progress: 30, buffer: 60 }));
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
  it("renders both buffer and fill bars", () => {
    const { container } = render(/* @__PURE__ */ jsx(ProgressBarBuffer, { progress: 30, buffer: 60 }));
    expect(container.querySelector(".w3f-progress-bar-buffer")).toBeInTheDocument();
    expect(container.querySelector(".w3f-progress-bar-fill")).toBeInTheDocument();
  });
  it("applies color classes to buffer and fill", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(ProgressBarBuffer, { progress: 30, buffer: 60, progressColor: "success", bufferColor: "primary" })
    );
    expect(container.querySelector(".w3f-progress-bar-fill")).toHaveClass("w3f-bg-success");
    expect(container.querySelector(".w3f-progress-bar-buffer")).toHaveClass("w3f-bg-primary");
  });
});
describe("ProgressBarIndeterminate", () => {
  it("has displayName set", () => {
    expect(ProgressBarIndeterminate.displayName).toBe("ProgressBarIndeterminate");
  });
  it("renders with progressbar role and aria-busy", () => {
    render(/* @__PURE__ */ jsx(ProgressBarIndeterminate, {}));
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-busy", "true");
  });
  it("applies slide animation class by default", () => {
    const { container } = render(/* @__PURE__ */ jsx(ProgressBarIndeterminate, {}));
    expect(container.querySelector(".w3f-indeterminate-animation")).toBeInTheDocument();
  });
  it("applies pulse animation class", () => {
    const { container } = render(/* @__PURE__ */ jsx(ProgressBarIndeterminate, { variant: "pulse" }));
    expect(container.querySelector(".w3f-indeterminate-animation-pulse")).toBeInTheDocument();
  });
  it("applies indeterminate bar class", () => {
    render(/* @__PURE__ */ jsx(ProgressBarIndeterminate, {}));
    expect(screen.getByRole("progressbar")).toHaveClass("w3f-indeterminate-bar");
  });
});
//# sourceMappingURL=ProgressBar.test.js.map
