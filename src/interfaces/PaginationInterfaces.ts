import { Sounds } from "../data/temporarySoundsData"
import { Songs } from "../data/temporarySongsData"
import { Buffs } from "../data/BuffsData"
export interface ViewsSongFunc
{
    (songsList: HTMLElement, skipValue: number, itemsperPage: number, tempTabOfMusic: Sounds[] & Songs[], ListToPaginateId: string): void
};

export interface ViewPaginatedBuffs {
    (  BuffsList: HTMLElement, 
        skipValue: number, 
        itemsperPage: number, 
        tempTabOfMusic: Buffs[]): void
}