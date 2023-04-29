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


  public removeListenersOnGivenNode<T extends keyof HTMLElementEventMap>(element: HTMLElement,
    event: T) {


    const handlers = this.listeners.get(element);
    console.log(handlers)

    if (handlers) {
      for (const handler of handlers) {
        element.removeEventListener(event, handler);
      }
      this.listeners.delete(element);
    }

    if (handlers && handlers.length === 0) {
      this.listeners.delete(element);
    }
  }
}

