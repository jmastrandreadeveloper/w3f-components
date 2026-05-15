import { jsx, jsxs } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Stepper, Step, StepLabel, StepContent, StepConnector } from "../Stepper";
describe("Stepper", () => {
  it("renders with base CSS class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Stepper, { children: /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 1" }) }) })
    );
    expect(container.querySelector(".w3f-stepper")).toBeInTheDocument();
  });
  it("has displayName set", () => {
    expect(Stepper.displayName).toBe("Stepper");
  });
  it("forwards ref to the container div", () => {
    const ref = { current: null };
    render(
      /* @__PURE__ */ jsx(Stepper, { ref, children: /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 1" }) }) })
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("applies orientation class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Stepper, { orientation: "vertical", children: /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 1" }) }) })
    );
    expect(container.querySelector(".w3f-stepper--vertical")).toBeInTheDocument();
  });
  it("applies color class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Stepper, { color: "success", children: /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 1" }) }) })
    );
    expect(container.querySelector(".w3f-stepper--success")).toBeInTheDocument();
  });
  it("applies alternative label class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Stepper, { alternativeLabel: true, children: /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 1" }) }) })
    );
    expect(container.querySelector(".w3f-stepper--alternative-label")).toBeInTheDocument();
  });
  it("applies custom className", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Stepper, { className: "my-stepper", children: /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 1" }) }) })
    );
    expect(container.querySelector(".w3f-stepper.my-stepper")).toBeInTheDocument();
  });
  it("marks the correct step as active based on activeStep", () => {
    const { container } = render(
      /* @__PURE__ */ jsxs(Stepper, { activeStep: 1, children: [
        /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 1" }) }),
        /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 2" }) }),
        /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 3" }) })
      ] })
    );
    const steps = container.querySelectorAll(".w3f-step");
    expect(steps[0]?.className).toContain("w3f-step--completed");
    expect(steps[1]?.className).toContain("w3f-step--active");
  });
  it("renders connectors between steps", () => {
    const { container } = render(
      /* @__PURE__ */ jsxs(Stepper, { activeStep: 0, children: [
        /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 1" }) }),
        /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 2" }) }),
        /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 3" }) })
      ] })
    );
    const connectors = container.querySelectorAll(".w3f-step-connector");
    expect(connectors).toHaveLength(2);
  });
  it("does not render connectors when connector is null", () => {
    const { container } = render(
      /* @__PURE__ */ jsxs(Stepper, { connector: null, children: [
        /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 1" }) }),
        /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 2" }) })
      ] })
    );
    expect(container.querySelector(".w3f-step-connector")).not.toBeInTheDocument();
  });
});
describe("Step", () => {
  it("has displayName set", () => {
    expect(Step.displayName).toBe("Step");
  });
  it("renders with step CSS class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Stepper, { children: /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "S" }) }) })
    );
    expect(container.querySelector(".w3f-step")).toBeInTheDocument();
  });
});
describe("StepLabel", () => {
  it("has displayName set", () => {
    expect(StepLabel.displayName).toBe("StepLabel");
  });
  it("renders label text", () => {
    render(
      /* @__PURE__ */ jsx(Stepper, { activeStep: 0, children: /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "My Step" }) }) })
    );
    expect(screen.getByText("My Step")).toBeInTheDocument();
  });
  it("renders icon container", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Stepper, { activeStep: 0, children: /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 1" }) }) })
    );
    expect(container.querySelector(".w3f-step-label__icon-container")).toBeInTheDocument();
  });
  it("renders active icon class for active step", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Stepper, { activeStep: 0, children: /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 1" }) }) })
    );
    expect(container.querySelector(".w3f-step-label__icon--active")).toBeInTheDocument();
  });
  it("renders completed icon class for completed step", () => {
    const { container } = render(
      /* @__PURE__ */ jsxs(Stepper, { activeStep: 1, children: [
        /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 1" }) }),
        /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { children: "Step 2" }) })
      ] })
    );
    expect(container.querySelector(".w3f-step-label__icon--completed")).toBeInTheDocument();
  });
  it("renders optional text when provided", () => {
    render(
      /* @__PURE__ */ jsx(Stepper, { activeStep: 0, children: /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { optional: /* @__PURE__ */ jsx("span", { children: "Optional" }), children: "Step 1" }) }) })
    );
    expect(screen.getByText("Optional")).toBeInTheDocument();
  });
  it("is clickable in nonLinear mode", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = render(
      /* @__PURE__ */ jsx(Stepper, { activeStep: 0, nonLinear: true, children: /* @__PURE__ */ jsx(Step, { children: /* @__PURE__ */ jsx(StepLabel, { onClick, children: "Step 1" }) }) })
    );
    const label = container.querySelector(".w3f-step-label--clickable");
    expect(label).toBeInTheDocument();
    await user.click(label);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
describe("StepContent", () => {
  it("has displayName set", () => {
    expect(StepContent.displayName).toBe("StepContent");
  });
  it("renders with content CSS class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Stepper, { orientation: "vertical", activeStep: 0, children: /* @__PURE__ */ jsxs(Step, { children: [
        /* @__PURE__ */ jsx(StepLabel, { children: "Step 1" }),
        /* @__PURE__ */ jsx(StepContent, { children: "Content here" })
      ] }) })
    );
    expect(container.querySelector(".w3f-step-content")).toBeInTheDocument();
  });
  it("applies expanded class for active step", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Stepper, { orientation: "vertical", activeStep: 0, children: /* @__PURE__ */ jsxs(Step, { children: [
        /* @__PURE__ */ jsx(StepLabel, { children: "Step 1" }),
        /* @__PURE__ */ jsx(StepContent, { children: "Content" })
      ] }) })
    );
    expect(container.querySelector(".w3f-step-content--expanded")).toBeInTheDocument();
  });
});
describe("StepConnector", () => {
  it("has displayName set", () => {
    expect(StepConnector.displayName).toBe("StepConnector");
  });
});
//# sourceMappingURL=Stepper.test.js.map
