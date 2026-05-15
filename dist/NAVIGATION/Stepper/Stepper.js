"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { forwardRef, useMemo, useCallback } from "react";
import { Check, X } from "lucide-react";
import {
  STEPPER_DEFAULTS,
  STEP_DEFAULTS,
  STEP_LABEL_DEFAULTS,
  STEP_CONTENT_DEFAULTS,
  STEP_CONNECTOR_DEFAULTS,
  STEPPER_CLASSES
} from "./Stepper.constants";
import {
  buildStepperClasses,
  buildStepClasses,
  buildConnectorClasses,
  buildLabelClasses,
  buildStepIconClasses,
  buildTitleClasses,
  buildContentClasses
} from "./Stepper.utils";
import { useStepContentAnimation } from "./Stepper.hooks";
const StepConnector = ({
  className = STEP_CONNECTOR_DEFAULTS.className,
  _orientation = STEP_CONNECTOR_DEFAULTS._orientation,
  _active = STEP_CONNECTOR_DEFAULTS._active,
  _completed = STEP_CONNECTOR_DEFAULTS._completed,
  _alternativeLabel = STEP_CONNECTOR_DEFAULTS._alternativeLabel,
  ...rest
}) => {
  const cls = useMemo(
    () => buildConnectorClasses(_orientation, _active, _completed, _alternativeLabel, className),
    [_orientation, _active, _completed, _alternativeLabel, className]
  );
  return /* @__PURE__ */ jsx("span", { className: cls, ...rest });
};
StepConnector.displayName = "StepConnector";
const StepIcon = ({ index, active, completed, error }) => {
  const cls = buildStepIconClasses(active, completed, error);
  let content;
  if (error) {
    content = /* @__PURE__ */ jsx(X, { size: 18 });
  } else if (completed) {
    content = /* @__PURE__ */ jsx(Check, { size: 18 });
  } else {
    content = index + 1;
  }
  return /* @__PURE__ */ jsx("span", { className: cls, children: content });
};
const StepLabel = ({
  children,
  optional,
  icon,
  error = STEP_LABEL_DEFAULTS.error,
  StepIconComponent,
  onClick,
  className = STEP_LABEL_DEFAULTS.className,
  _active = STEP_LABEL_DEFAULTS._active,
  _completed = STEP_LABEL_DEFAULTS._completed,
  _disabled = STEP_LABEL_DEFAULTS._disabled,
  _index = STEP_LABEL_DEFAULTS._index,
  _alternativeLabel = STEP_LABEL_DEFAULTS._alternativeLabel,
  _nonLinear = STEP_LABEL_DEFAULTS._nonLinear,
  ...rest
}) => {
  const isClickable = !_disabled && (!!onClick || _nonLinear);
  const cls = useMemo(
    () => buildLabelClasses(isClickable, _alternativeLabel, className),
    [isClickable, _alternativeLabel, className]
  );
  const handleClick = useCallback(
    (e) => {
      if (_disabled) return;
      if (onClick) onClick(e, _index);
    },
    [_disabled, onClick, _index]
  );
  const renderIcon = () => {
    if (StepIconComponent) {
      return /* @__PURE__ */ jsx(
        StepIconComponent,
        {
          active: _active,
          completed: _completed,
          error,
          icon: _index + 1
        }
      );
    }
    if (icon) {
      return /* @__PURE__ */ jsx("span", { className: buildStepIconClasses(_active, _completed, error), children: icon });
    }
    return /* @__PURE__ */ jsx(
      StepIcon,
      {
        index: _index,
        active: _active,
        completed: _completed,
        error
      }
    );
  };
  const titleCls = buildTitleClasses(_active, error);
  const optionalCls = [
    STEPPER_CLASSES.labelOptional,
    error && STEPPER_CLASSES.labelOptionalError
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cls,
      onClick: isClickable ? handleClick : void 0,
      role: isClickable ? "button" : void 0,
      tabIndex: isClickable ? 0 : void 0,
      onKeyDown: isClickable ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e);
        }
      } : void 0,
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { className: STEPPER_CLASSES.labelIconContainer, children: renderIcon() }),
        /* @__PURE__ */ jsxs("span", { className: STEPPER_CLASSES.labelText, children: [
          /* @__PURE__ */ jsx("span", { className: titleCls, children }),
          optional && /* @__PURE__ */ jsx("span", { className: optionalCls, children: optional })
        ] })
      ]
    }
  );
};
StepLabel.displayName = "StepLabel";
const StepContent = ({
  children,
  transitionDuration = STEP_CONTENT_DEFAULTS.transitionDuration,
  className = STEP_CONTENT_DEFAULTS.className,
  _active = STEP_CONTENT_DEFAULTS._active,
  _last = STEP_CONTENT_DEFAULTS._last,
  ...rest
}) => {
  const { contentRef, maxHeight } = useStepContentAnimation(_active);
  const cls = useMemo(
    () => buildContentClasses(_active, _last, className),
    [_active, _last, className]
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: contentRef,
      className: cls,
      style: {
        maxHeight: _active ? maxHeight : "0",
        transitionDuration: `${transitionDuration}ms`
      },
      ...rest,
      children
    }
  );
};
StepContent.displayName = "StepContent";
const Step = ({
  active = STEP_DEFAULTS.active,
  completed = STEP_DEFAULTS.completed,
  disabled = STEP_DEFAULTS.disabled,
  index = STEP_DEFAULTS.index,
  last = STEP_DEFAULTS.last,
  children,
  className = STEP_DEFAULTS.className,
  _orientation = STEP_DEFAULTS._orientation,
  _alternativeLabel = STEP_DEFAULTS._alternativeLabel,
  _color,
  _nonLinear = STEP_DEFAULTS._nonLinear,
  _connector,
  ...rest
}) => {
  const cls = useMemo(
    () => buildStepClasses(_orientation, active, completed, disabled),
    [_orientation, active, completed, disabled]
  );
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (child.type === StepLabel) {
      return React.cloneElement(child, {
        _active: active,
        _completed: completed,
        _disabled: disabled,
        _index: index,
        _alternativeLabel,
        _nonLinear
      });
    }
    if (child.type === StepContent) {
      return React.cloneElement(child, {
        _active: active,
        _last: last
      });
    }
    return child;
  });
  return /* @__PURE__ */ jsx("div", { className: cls, ...rest, children: enhancedChildren });
};
Step.displayName = "Step";
const Stepper = forwardRef(({
  activeStep = STEPPER_DEFAULTS.activeStep,
  children,
  orientation = STEPPER_DEFAULTS.orientation,
  alternativeLabel = STEPPER_DEFAULTS.alternativeLabel,
  nonLinear = STEPPER_DEFAULTS.nonLinear,
  connector,
  color = STEPPER_DEFAULTS.color,
  unstyled = STEPPER_DEFAULTS.unstyled,
  className = STEPPER_DEFAULTS.className,
  ...rest
}, ref) => {
  const cls = useMemo(
    () => buildStepperClasses(orientation, color, alternativeLabel, className, unstyled),
    [orientation, color, alternativeLabel, className, unstyled]
  );
  const connectorElement = connector !== void 0 ? connector : /* @__PURE__ */ jsx(StepConnector, {});
  const steps = React.Children.toArray(children).filter(Boolean);
  return /* @__PURE__ */ jsx("div", { ref, className: cls, ...rest, children: steps.map((child, index) => {
    if (!React.isValidElement(child)) return child;
    const childProps = child.props;
    const isActive = childProps.active !== void 0 ? childProps.active : index === activeStep;
    const isCompleted = childProps.completed !== void 0 ? childProps.completed : index < activeStep;
    const isDisabled = childProps.disabled !== void 0 ? childProps.disabled : !nonLinear && index > activeStep;
    const connectorProps = {
      _orientation: orientation,
      _active: index === activeStep,
      _completed: index <= activeStep,
      _alternativeLabel: alternativeLabel
    };
    return /* @__PURE__ */ jsxs(React.Fragment, { children: [
      index > 0 && connectorElement && React.cloneElement(
        connectorElement,
        connectorProps
      ),
      React.cloneElement(child, {
        active: isActive,
        completed: isCompleted,
        disabled: isDisabled,
        index,
        last: index === steps.length - 1,
        _orientation: orientation,
        _alternativeLabel: alternativeLabel,
        _color: color,
        _nonLinear: nonLinear,
        _connector: connectorElement
      })
    ] }, child.key ?? index);
  }) });
});
Stepper.displayName = "Stepper";
var Stepper_default = Stepper;
export {
  Step,
  StepConnector,
  StepContent,
  StepLabel,
  Stepper,
  Stepper_default as default
};
//# sourceMappingURL=Stepper.js.map
