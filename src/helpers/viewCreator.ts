import { Sounds } from "../data/temporarySoundsData";
import { Songs } from "../data/temporarySongsData";
import { MediaEnum } from "../interfaces/HelperEnums";
import { Logger } from "../interfaces/HelperEnums";
import { media } from "../modules/Media";
import { Common } from "../modules/Common";
import { tempTabOfSongs } from "../data/temporarySongsData";
import { StatusOfSong } from "../interfaces/HelperEnums";
import { Buff } from "../data/BuffsData";

export class ViewsCreator extends Common {
  constructor() {
    super();
  }

  createViewForSongs(
    songsList: HTMLElement,
    skipValue: number,
    itemsperPage: number,
    SongsArray: Songs[]
  ): void {
    songsList.innerHTML = "";

    for (let i = skipValue; i < skipValue + itemsperPage; i++) {
      const li: HTMLLIElement = document.createElement("li");
      const img: HTMLImageElement = document.createElement("img");
      const p: HTMLParagraphElement = document.createElement("p");
      img.src = SongsArray[i].pathToImage;
      img.alt = `Piosenka o nazwie  ${SongsArray[i].song}`;

      p.innerHTML = SongsArray[i].description;

      li.appendChild(img);
      li.appendChild(p);

      li.addEventListener("click", async () => {
        const BackroundSong = await media.setBackroundMusic(SongsArray[i].song);

        if (BackroundSong.play) {
          this.displayMessageAtTheTopOfTheScreen(
            `Ustawiono piosenkę o nazwie: ${SongsArray[i].name}`,
            Logger.Message
          );
        } else if (
          !BackroundSong.play &&
          BackroundSong.reason == StatusOfSong.Error
        ) {
          this.displayMessageAtTheTopOfTheScreen(
            `nie mozemy zagrać nuty: ${SongsArray[i].name}, coś poszło nie tak`,
            Logger.Error
          );
          throw new Error("nie mozemy zagrać tej piosenki");
        } else if (
          !BackroundSong.play &&
          BackroundSong.reason == StatusOfSong.AlreadyPlaying
        ) {
          this.displayMessageAtTheTopOfTheScreen(
            `Nuta ${SongsArray[i].name}, Juz bangla, wczytaj co innego`,
            Logger.Warn
          );
        }

        media.playMusic();
      });

      songsList.appendChild(li);
    }
  }

  createViewForSounds(
    soundsList: HTMLElement,
    skipValue: number,
    itemsperPage: number,
    SoundsArray: Sounds[]
  ) {
    soundsList.innerHTML = "";
    for (let i = skipValue; i < skipValue + itemsperPage; i++) {
      const li: HTMLLIElement = document.createElement("li");
      const img: HTMLImageElement = document.createElement("img");
      const p: HTMLParagraphElement = document.createElement("p");
      img.src = SoundsArray[i].pathToImage;
      img.alt = `Piosenka o nazwie  ${SoundsArray[i].sound}`;

      p.innerHTML = SoundsArray[i].description;

      li.appendChild(img);
      li.appendChild(p);

      li.addEventListener("click", async () => {
        const Sound = await media.setSound(SoundsArray[i].sound);

        if (Sound.play) {
          this.displayMessageAtTheTopOfTheScreen(
            `Ustawiono dźwięk o nazwie: ${tempTabOfSongs[i].name}`,
            Logger.Message
          );
        } else if (
          (Sound.play === false, Sound.reason === StatusOfSong.Error)
        ) {
          this.displayMessageAtTheTopOfTheScreen(
            `nie wczytać dźwięku: ${SoundsArray[i].name}, coś poszło nie tak`,
            Logger.Error
          );

          throw new Error("nie mozemy wczytać tego dźwięku");
        } else if (
          (Sound.play === false, Sound.reason === StatusOfSong.AlreadyPlaying)
        ) {
          this.displayMessageAtTheTopOfTheScreen(
            `Dźwięk: ${SoundsArray[i].name}, juz jest ustawiony, wczytaj jakiś inny`,
            Logger.Warn
          );
        }
        media.spawnSoundWhenHitPaddle();
      });
      soundsList.appendChild(li);
    }
  }

  createViewForBuffs(
    BuffsList: HTMLElement,
    skipValue: number,
    itemsperPage: number,
    buffs: Buff[]
  ): void {
    BuffsList.innerHTML = "";

    for (let i = skipValue; i < skipValue + itemsperPage; i++) {
      const li: HTMLLIElement = document.createElement("li");
      const img: HTMLImageElement = document.createElement("img");
      const p: HTMLParagraphElement = document.createElement("p");

      p.innerHTML = buffs[i].description;
      img.src = buffs[i].pathToImage;

      li.appendChild(img);
      li.appendChild(p);
      BuffsList.appendChild(li);
    }
  }
}
