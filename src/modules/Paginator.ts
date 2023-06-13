import { Common } from "./Common";
import { Logger } from "../interfaces/HelperEnums";
import { PaginatorInterface } from "../interfaces/classesInterfaces";
import { VisulizerFunc } from "../interfaces/PaginationInterfaces";
import { EventListener } from "../helpers/Events/EventListener";

export class Paginator<T> extends Common implements PaginatorInterface<T> {
  private readonly createView: VisulizerFunc<T>;
  private readonly mediaToLoad: T[];
  private readonly MainList: HTMLElement;
  private readonly EventListenerInstance: EventListener;
  private ITEMS_PER_PAGE: number;
  private PaginationClass: string;
  private currentPage: number;
  private LIST_LEN: number;
  private PAGES: number;
  private RightIterator: HTMLElement;
  private LeftIterator: HTMLElement;

  constructor(
    MainList: HTMLElement,
    RightIterator: HTMLElement,
    LeftIterator: HTMLElement,
    ITEMS_PER_PAGE: number,
    mediaToLoad: T[],
    createView: VisulizerFunc<T>,
    PaginationClass: string,
    EventListenerInstance: EventListener
  ) {
    super();
    this.createView = createView;
    this.mediaToLoad = mediaToLoad;
    this.PaginationClass = PaginationClass;
    this.MainList = MainList;
    this.EventListenerInstance = EventListenerInstance;
    this.RightIterator = RightIterator;
    this.LeftIterator = LeftIterator;
    this.ITEMS_PER_PAGE = ITEMS_PER_PAGE;
    this.currentPage = 0;
    this.LIST_LEN = 0;
    this.PAGES = 0;
  }

  private PickProperVisualizer(): void {
    if (
      this.LIST_LEN - this.currentPage * this.ITEMS_PER_PAGE <
      this.ITEMS_PER_PAGE
    ) {
      return this.createView(
        this.MainList,
        this.currentPage * this.ITEMS_PER_PAGE,
        this.LIST_LEN - this.currentPage * this.ITEMS_PER_PAGE,
        this.mediaToLoad
      );
    } else {
      return this.createView(
        this.MainList,
        this.currentPage * this.ITEMS_PER_PAGE,
        this.ITEMS_PER_PAGE,
        this.mediaToLoad
      );
    }
  }

  private incrementRight(PAGES: number, PAGE: HTMLElement) {
    this.currentPage++;
    if (this.currentPage > PAGES - 1) {
      this.currentPage--;
      this.displayMessageAtTheTopOfTheScreen(
        "Strona musi być w rangu",
        Logger.Error
      );
      return;
    }

    this.PickProperVisualizer();
    PAGE.innerHTML = `${this.currentPage + 1} z ${PAGES}`;
  }

  private incrementLeft(PAGES: number, PAGE: HTMLElement) {
    this.currentPage--;
    if (this.currentPage < 0) {
      this.currentPage++;
      this.displayMessageAtTheTopOfTheScreen(
        "Strona musi być w rangu",
        Logger.Error
      );
      return;
    }

    this.PickProperVisualizer();
    PAGE.innerHTML = `${this.currentPage + 1} z ${PAGES}`;
  }

  private cleanupListeners(): void {
    this.EventListenerInstance.removeListenersOnGivenNode(
      this.RightIterator,
      "click"
    );

    this.EventListenerInstance.removeListenersOnGivenNode(
      this.LeftIterator,
      "click"
    );
  }

  public PaginateResults(): void {
    this.cleanupListeners();

    const PAGE_NUMBER_CONTAINER = this.bindElementByClass(
      `${this.PaginationClass}> .page`
    );

    const PAGINATION_ELEMENT: HTMLElement = this.bindElementByClass(
      this.PaginationClass
    );

    this.changeVisbilityOfGivenElement(PAGINATION_ELEMENT, true);

    this.LIST_LEN = this.mediaToLoad.length;
    this.PAGES = Math.ceil(this.LIST_LEN / this.ITEMS_PER_PAGE);

    PAGE_NUMBER_CONTAINER.innerHTML = `${this.currentPage + 1} z ${this.PAGES}`;

    this.PickProperVisualizer();

    const incrementRight = (): void =>
      this.incrementRight(this.PAGES, PAGE_NUMBER_CONTAINER as HTMLElement);

    const incrementLeft = (): void =>
      this.incrementLeft(this.PAGES, PAGE_NUMBER_CONTAINER as HTMLElement);

    this.EventListenerInstance.add(this.RightIterator, "click", incrementRight);

    this.EventListenerInstance.add(this.LeftIterator, "click", incrementLeft);
  }
}
