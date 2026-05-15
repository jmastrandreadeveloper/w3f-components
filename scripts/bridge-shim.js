// @w3f/bridge shim — no-op implementations for standalone use
// When used outside w3f-platform, bridge calls are safely ignored.

export function useBridgeBind({ bindId } = {}) {
  return {
    dispatch: () => {},
  };
}

export function useBridge() {
  return null;
}

export function useBridgeEvent(_event, _handler) {}

export function useBridgeValue(_bindId) {
  return undefined;
}
