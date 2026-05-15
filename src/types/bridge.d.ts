/**
 * Type stub for @w3f/bridge — Platform Bridge integration.
 * The actual bridge runtime is part of @w3f/platform and is optional.
 * Components that use bindId work standalone without the bridge provider.
 */
declare module '@w3f/bridge' {
  export type BridgeEventType = string;

  export interface BridgeCommand {
    action: string;
    payload?: Record<string, unknown>;
  }

  export interface UseBridgeBindOptions {
    bindId: string | undefined;
    value?: unknown;
    onCommand?: (cmd: BridgeCommand) => void;
  }

  export interface UseBridgeBindReturn {
    dispatch: (type: BridgeEventType, payload?: Record<string, unknown>) => void;
  }

  export function useBridgeBind(options: UseBridgeBindOptions): UseBridgeBindReturn;
  export function useBridge(): unknown;
  export function useBridgeEvent(event: string, handler: (payload: unknown) => void): void;
  export function useBridgeValue<T = unknown>(bindId: string): T | undefined;
}
