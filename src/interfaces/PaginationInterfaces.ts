import { Sounds } from "../data/temporarySoundsData"
import { Songs } from "../data/temporarySongsData"
export interface ViewsSongFunc
{
    (songsList: HTMLElement, skipValue: number, itemsperPage: number, tempTabOfMusic: Sounds[] & Songs[], ListToPaginateId: string): void
};