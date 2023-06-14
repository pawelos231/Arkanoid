export type VisulizerFunc<T> = (
  songsList: HTMLElement,
  skipValue: number,
  itemsperPage: number,
  mediaArray: T[]
) => void;
