import { Common } from "../../modules/Common";

type EventHandler = (this: HTMLElement, event: Event) => void;

export class EventListener extends Common {
  private listeners = new Map<HTMLElement, EventHandler[]>();

  public add<T extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    event: T,
    handler: EventHandler
  ) {
    if (!this.listeners.has(element)) {
      this.listeners.set(element, []);
    }

    const handlers: EventHandler[] = this.listeners.get(element)!;
    const closureHandler = (event: Event) => handler.call(element, event);

    handlers.push(closureHandler);
    element.addEventListener(event, closureHandler);
  }

  public removeListener(
    element: HTMLElement,
    event: keyof HTMLElementEventMap,
    handler: EventHandler
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

  public hasListeners(element: HTMLElement): boolean {
    return this.listeners.has(element);
  }

  public removeListenersOnGivenNode<T extends keyof HTMLElementEventMap>(
    element: HTMLElement,
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
