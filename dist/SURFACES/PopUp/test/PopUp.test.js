import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PopUp } from "../PopUp";
describe("PopUp", () => {
  it("renders nothing when isOpen=false", () => {
    render(/* @__PURE__ */ jsx(PopUp, { isOpen: false, onClose: () => {
    }, title: "Test" }));
    expect(screen.queryByText("Test")).not.toBeInTheDocument();
  });
  it("has displayName set", () => {
    expect(PopUp.displayName).toBe("PopUp");
  });
  it("renders when isOpen=true", () => {
    render(/* @__PURE__ */ jsx(PopUp, { isOpen: true, onClose: () => {
    }, title: "My Popup" }));
    expect(screen.getByText("My Popup")).toBeInTheDocument();
  });
  it("renders overlay with correct class", () => {
    const { baseElement } = render(/* @__PURE__ */ jsx(PopUp, { isOpen: true, onClose: () => {
    }, title: "Test" }));
    expect(baseElement.querySelector(".w3f-popup-overlay")).toBeInTheDocument();
  });
  it("overlay has is-open class when open", () => {
    const { baseElement } = render(/* @__PURE__ */ jsx(PopUp, { isOpen: true, onClose: () => {
    }, title: "Test" }));
    expect(baseElement.querySelector(".w3f-popup-overlay")).toHaveClass("is-open");
  });
  it("renders container with correct class", () => {
    const { baseElement } = render(/* @__PURE__ */ jsx(PopUp, { isOpen: true, onClose: () => {
    }, title: "Test" }));
    expect(baseElement.querySelector(".w3f-popup-container")).toBeInTheDocument();
  });
  it("renders card with correct class", () => {
    const { baseElement } = render(/* @__PURE__ */ jsx(PopUp, { isOpen: true, onClose: () => {
    }, title: "Test" }));
    expect(baseElement.querySelector(".w3f-popup-card")).toBeInTheDocument();
  });
  it("renders close button with correct class", () => {
    const { baseElement } = render(/* @__PURE__ */ jsx(PopUp, { isOpen: true, onClose: () => {
    }, title: "Test" }));
    expect(baseElement.querySelector(".w3f-popup-close-btn")).toBeInTheDocument();
  });
  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { baseElement } = render(/* @__PURE__ */ jsx(PopUp, { isOpen: true, onClose, title: "Test" }));
    const closeBtn = baseElement.querySelector(".w3f-popup-close-btn");
    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });
  it("renders confirm and cancel buttons by default", () => {
    render(/* @__PURE__ */ jsx(PopUp, { isOpen: true, onClose: () => {
    }, title: "Test" }));
    expect(screen.getByText("Aceptar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });
  it("hides cancel button when showCancel=false", () => {
    render(/* @__PURE__ */ jsx(PopUp, { isOpen: true, onClose: () => {
    }, title: "Test", showCancel: false }));
    expect(screen.queryByText("Cancelar")).not.toBeInTheDocument();
  });
  it("renders custom confirm and cancel text", () => {
    render(
      /* @__PURE__ */ jsx(
        PopUp,
        {
          isOpen: true,
          onClose: () => {
          },
          title: "Test",
          confirmText: "Yes",
          cancelText: "No"
        }
      )
    );
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });
  it("renders children as content", () => {
    render(
      /* @__PURE__ */ jsx(PopUp, { isOpen: true, onClose: () => {
      }, title: "Test", children: /* @__PURE__ */ jsx("span", { children: "Custom body" }) })
    );
    expect(screen.getByText("Custom body")).toBeInTheDocument();
  });
});
//# sourceMappingURL=PopUp.test.js.map
