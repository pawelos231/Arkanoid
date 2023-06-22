import { Common } from "../../modules/Common";

type El = HTMLElement | (Window & typeof globalThis);

type EventHandler<T extends Event> = (this: El, event: T) => void;

export class EventListener extends Common {
  private listeners = new Map<El, EventHandler<any>[]>();

  public add<T extends keyof HTMLElementEventMap, _E extends Event>(
    element: HTMLElement | (Window & typeof globalThis),
    event: T,
    handler: EventHandler<_E>
  ) {
    if (!this.listeners.has(element)) {
      this.listeners.set(element, []);
    }

    const handlers: EventHandler<_E>[] = this.listeners.get(element)!;
    const closureHandler = (event: Event) => handler.call(element, event as _E);

    handlers.push(closureHandler);
    element.addEventListener(event, closureHandler);
  }

  public removeListener(
    element: El,
    event: keyof HTMLElementEventMap,
    handler: EventHandler<Event>
  ) {
    const handlers = this.listeners.get(element);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
        element.removeEventListener(event, handler);
      }
    }
  }

  public hasListeners(element: El): boolean {
    return this.listeners.has(element);
  }

  public removeListenersOnGivenNode<T extends keyof HTMLElementEventMap>(
    element: El,
    event: T
  ) {
    const handlers = this.listeners.get(element);
    if (!handlers) {
      console.warn("No handlers found for the element.");
      return;
    }

    for (const handler of handlers) {
      element.removeEventListener(event, handler);
    }

    this.listeners.delete(element);
  }
}
