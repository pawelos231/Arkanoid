import { Sounds } from "../data/temporarySoundsData";
import { Songs } from "../data/temporarySongsData";
import { Logger } from "../interfaces/HelperEnums";
import { media } from "../modules/Media";
import { Common } from "../modules/Common";
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
            `Playing song: ${SongsArray[i].name}`,
            Logger.Message
          );
        } else if (
          !BackroundSong.play &&
          BackroundSong.reason == StatusOfSong.Error
        ) {
          this.displayMessageAtTheTopOfTheScreen(
            `the song: ${SongsArray[i].name}, could not be played, something went wrong`,
            Logger.Error
          );
          throw new Error("nie mozemy zagrać tej piosenki");
        } else if (
          !BackroundSong.play &&
          BackroundSong.reason == StatusOfSong.AlreadyPlaying
        ) {
          this.displayMessageAtTheTopOfTheScreen(
            `Song ${SongsArray[i].name}, is already playing, pick other song`,
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
            `Playing sound: ${SoundsArray[i].name}`,
            Logger.Message
          );
        } else if (
          (Sound.play === false, Sound.reason === StatusOfSong.Error)
        ) {
          this.displayMessageAtTheTopOfTheScreen(
            `The sound: ${SoundsArray[i].name}, could not be played, something went wrong`,
            Logger.Error
          );

          throw new Error("Cannot load the sound");
        } else if (
          (Sound.play === false, Sound.reason === StatusOfSong.AlreadyPlaying)
        ) {
          this.displayMessageAtTheTopOfTheScreen(
            `Sound: ${SoundsArray[i].name}, is already set, pick something different`,
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
