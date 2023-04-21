type EventHandler = (this: HTMLElement, event: Event) => void;

export class EventListener {
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


  public remove<T extends keyof HTMLElementEventMap>(element: HTMLElement,
    event: T,
    handler: EventHandler) {


    const handlers = this.listeners.get(element);
    const index = handlers?.findIndex((h) => h === handler);

    if (handlers && index !== undefined && index >= 0) {
      element.removeEventListener(event, handlers[index]);
      handlers.splice(index, 1);
    }

    if (handlers && handlers.length === 0) {
      this.listeners.delete(element);
    }
  }
}

