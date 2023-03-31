import { Sounds } from "../data/temporarySoundsData"
import { Songs } from "../data/temporarySongsData"
import { MediaEnum } from "../interfaces/HelperEnums"
import { Logger } from "../interfaces/HelperEnums"
import { media } from "../modules/Media"
import { Common } from "../modules/Common"
import { tempTabOfSongs } from "../data/temporarySongsData"
import { StatusOfSong } from "../interfaces/HelperEnums"
import { Buffs } from "../data/BuffsData"

export class ViewsCreator extends Common {
    constructor(PaginatorId: string){
        super(PaginatorId)
    }

    createViewForSongs(
        songsList: HTMLElement, 
        skipValue: number, 
        itemsperPage: number, 
        tempTabOfMusic: Sounds[] & Songs[], 
        ListToPaginateId: string): void{
        songsList.innerHTML = ""
    
        for (let i = skipValue; i < skipValue + itemsperPage; i++) {
            const li: HTMLLIElement = document.createElement("li")
            const img: HTMLImageElement = document.createElement("img")
            const p: HTMLParagraphElement = document.createElement("p")
            img.src = tempTabOfMusic[i].pathToImage

            if (ListToPaginateId == MediaEnum.Music) 
            {
                img.alt = `Piosenka o nazwie  ${tempTabOfMusic[i].song}`
            } 
            else if (ListToPaginateId == MediaEnum.Music) 
            {
                img.alt = `Dźwięk o nazwie  ${tempTabOfMusic[i].sound}`
            }

            p.innerHTML = tempTabOfMusic[i].description

            li.appendChild(img)
            li.appendChild(p)

            if (ListToPaginateId == MediaEnum.Music) {

                li.addEventListener("click", async () => {
                    const BackroundSong = await media.setBackroundMusic(tempTabOfMusic[i].song)
                    if (BackroundSong.play == true) {
                        this.displayMessageAtTheTopOfTheScreen(`Ustawiono piosenkę o nazwie: ${tempTabOfMusic[i].name}`, Logger.Message)
                    } 
                    else if(
                    BackroundSong.play == false && 
                    BackroundSong.reason == StatusOfSong.Error) 
                    {
                        this.displayMessageAtTheTopOfTheScreen(`nie mozemy zagrać nuty: ${tempTabOfMusic[i].name}, coś poszło nie tak`, Logger.Error)
                        throw new Error("nie mozemy zagrać tej piosenki")
                    } 
                    else if(
                    BackroundSong.play == false 
                    && BackroundSong.reason == StatusOfSong.AlreadyPlaying)
                    {
                        this.displayMessageAtTheTopOfTheScreen(`Nuta ${tempTabOfMusic[i].name}, Juz bangla, wczytaj co innego`, Logger.Warn)
                    }
    
                    media.playMusic()
                })

            } 
            else if (ListToPaginateId == MediaEnum.Sounds) 
            {
                li.addEventListener("click", async () => {

                    const Sound = await media.setSound(tempTabOfMusic[i].sound)

                    if (Sound.play == true) {
                        this.displayMessageAtTheTopOfTheScreen(`Ustawiono dźwięk o nazwie: ${tempTabOfSongs[i].name}`, Logger.Message)
                    } 
                    else if(
                    Sound.play == false, 
                    Sound.reason == StatusOfSong.Error) 
                    {
                        this.displayMessageAtTheTopOfTheScreen(`nie wczytać dźwięku: ${tempTabOfMusic[i].name}, coś poszło nie tak`, Logger.Error)
                        throw new Error("nie mozemy wczytać tego dźwięku")
                    } 
                    else if(
                    Sound.play == false, 
                    Sound.reason == StatusOfSong.AlreadyPlaying)
                    {
                            this.displayMessageAtTheTopOfTheScreen(`Dźwięk: ${tempTabOfMusic[i].name}, juz jest ustawiony, wczytaj jakiś inny`, Logger.Warn)
                    
                    }
                    media.spawnSoundWhenHitPaddle()
                })
            }

            songsList.appendChild(li)

        }
    }

    createViewForBuffs(
        BuffsList: HTMLElement, 
        skipValue: number, 
        itemsperPage: number, 
        tempTabOfMusic: Buffs[]): void{

        BuffsList.innerHTML = ""
    
        for (let i = skipValue; i < skipValue + itemsperPage; i++) {

            const li: HTMLLIElement = document.createElement("li")
            const img: HTMLImageElement = document.createElement("img")
            const p: HTMLParagraphElement = document.createElement("p")


            p.innerHTML = tempTabOfMusic[i].description
            img.src = tempTabOfMusic[i].pathToImage
            
            li.appendChild(img)
            li.appendChild(p)
            BuffsList.appendChild(li)

        }
    }
}
 