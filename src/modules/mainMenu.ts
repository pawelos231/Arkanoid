import { Common } from "./Common.js";
import { Validator } from "../helpers/PasswordInputValidation.js";
import { Fetcher } from "../helpers/Fetcher.js";
import { media } from "./Media.js";
import { levelSelect } from "./LevelSelect.js";
import { Paginator } from "./Paginator";
import { Songs } from "../data/temporarySongsData.js";
import { Sounds, tempTabOfSounds } from "../data/temporarySoundsData.js";
import { GET_STATS_URL } from "../constants/api/Urls.js";
import { ViewsCreator } from "../helpers/viewCreator.js";
import { VisulizerFunc } from "../interfaces/PaginationInterfaces.js";
import { StarsBackgroundView } from "../scenes/MainMenuThree.js";
import { Buff } from "../data/BuffsData.js";
import { EventListener } from "../helpers/Events/EventListener";
import { GET_SONGS } from "../constants/api/Urls.js";
import { GET_BUFFS } from "../constants/api/Urls.js";

const I_WANT_TO_REGISTER = "Chce się zarejestrować";
const I_WANT_TO_LOGIN = "Chce się zalogować";

const REGISTER_FORMS = "RegisterElement";
const FORM_TO_REGISTER = "formToRegister";
const FORM_TO_LOGIN = "formToLogin";
const CHECK_IF_LOGIN_OR_REGISTER = "checkIfLoginOrRegister";
const STATS_ELELEMENT = "Stats";
const INNER_MODAL_STATS_ELEMENT = "innerModalStats";
const MODAL_STATS_ELEMENT = "modalStats";
const PASSWORD_INPUT_ELEMENT = "password";
const START_GAME = "Start";
const MAIN_MENU_LEVEL_SELECT = "mainLevelSelect";
const START_THE_GAME = "startTheGame";
const BACK_TO_MENU = "backToMenu";
const OPEN_SETTINGS = "Ustawienia";
const OPENED_SETTINGS_PAGE = "OpenedSettings";
const CLOSE_SETTINGS = "closeSettings";
const MUSIC_RANGE = "musicRange";
const SOUND_RANGE = "soundRange";
const LIST_OF_SONGS = "listOfSongs > ul";
const RESET_INPUT_SETTINGS = "resetInputsSettings";
const SOUND_VIEW_LAYER_SHOW = "Sound";
const MUSIC_VIEW_LAYER_SHOW = "Music";
const INFO = "Info";
const OPENED_INFO = "OpenedInfo";
const CLOSE_INFO = "closeInfo";
const LIST_OF_BUFFS = "listOfBuffs > ul";
const PAGINATE_SONGS_RESULT_CLASS = "paginateSongResults";
const PAGINATE_BUFFS_RESULT_CLASS = "paginateBuffs";

class Menu extends Common<true> {
  private fetcher: Fetcher = new Fetcher(this.elementId);
  private formElementRegister: HTMLElement =
    this.bindElementByClass(FORM_TO_REGISTER);
  private StarsBackground: StarsBackgroundView | undefined =
    new StarsBackgroundView(600, "Stars");
  private cachedInstance: any;
  private eventListener: EventListener = new EventListener();

  public constructor() {
    super(REGISTER_FORMS);
  }

  private GenerateBackground() {
    let interval;
    if (this.StarsBackground) {
      this.StarsBackground.init();
      interval = setInterval(() => {
        this.StarsBackground?.tick.bind(this.StarsBackground)();
      }, 12);
    } else {
      clearInterval(interval);
      console.log("obiekt został zniszczony");
    }
  }

  private destroyBackground() {
    this.cachedInstance = this.StarsBackground;
    delete this.StarsBackground;
    this.GenerateBackground();
  }

  private declareHTMLSettingsELements() {
    const OpenSettings = this.bindElementByClass(OPEN_SETTINGS);

    const OpenedSettingsPage = this.bindElementByClass(OPENED_SETTINGS_PAGE);

    const CloseSettings = this.bindElementByClass(CLOSE_SETTINGS);

    const changeVolumeOfMusic = this.bindElementByClass(MUSIC_RANGE);

    const changeVolumeOfSound = this.bindElementByClass(SOUND_RANGE);

    const resetInputsSettings = this.bindElementByClass(RESET_INPUT_SETTINGS);

    const songsList = this.bindElementByClass(LIST_OF_SONGS);

    const SOUNDS = this.bindElementByClass(SOUND_VIEW_LAYER_SHOW);

    const MUSIC = this.bindElementByClass(MUSIC_VIEW_LAYER_SHOW);
    PAGINATE_SONGS_RESULT_CLASS;

    const LEFT_ITERATOR = this.bindElementByClass(
      `${PAGINATE_SONGS_RESULT_CLASS}> .left`
    );

    const RIGHT_ITERATOR = this.bindElementByClass(
      `${PAGINATE_SONGS_RESULT_CLASS}> .right`
    );

    return {
      MUSIC,
      SOUNDS,
      songsList,
      resetInputsSettings,
      changeVolumeOfMusic,
      changeVolumeOfSound,
      CloseSettings,
      OpenedSettingsPage,
      OpenSettings,
      LEFT_ITERATOR,
      RIGHT_ITERATOR,
    };
  }

  private declareHTMLInfoELements() {
    const OpenInfo: HTMLElement = this.bindElementByClass(INFO);

    const OpenedInfoPage: HTMLElement = this.bindElementByClass(OPENED_INFO);

    const closeInfo: HTMLElement = this.bindElementByClass(CLOSE_INFO);

    const ListOfBuffs: HTMLElement = this.bindElementByClass(LIST_OF_BUFFS);

    const LEFT_ITERATOR = this.bindElementByClass(
      `${PAGINATE_BUFFS_RESULT_CLASS}> .left`
    );

    const RIGHT_ITERATOR = this.bindElementByClass(
      `${PAGINATE_BUFFS_RESULT_CLASS}> .right`
    );

    return {
      OpenInfo,
      closeInfo,
      ListOfBuffs,
      OpenedInfoPage,
      RIGHT_ITERATOR,
      LEFT_ITERATOR,
    };
  }

  private switchBetweenRegisterAndLogin(): void {
    const changeValueOfMenuToLogin: HTMLElement = this.bindElementByClass(
      CHECK_IF_LOGIN_OR_REGISTER
    );

    const formElementLogin: HTMLElement =
      this.bindElementByClass(FORM_TO_LOGIN);

    let flag: boolean = false;
    this.eventListener.add(changeValueOfMenuToLogin, "click", () => {
      this.changeVisbilityOfGivenElement(this.formElementRegister, flag);
      flag = !flag;

      flag
        ? (changeValueOfMenuToLogin.textContent = I_WANT_TO_REGISTER)
        : (changeValueOfMenuToLogin.textContent = I_WANT_TO_LOGIN);

      this.changeVisbilityOfGivenElement(formElementLogin, flag);
    });
  }

  private async switchStatsModalState(): Promise<void> {
    const StatsElement: HTMLElement = this.bindElementByClass(STATS_ELELEMENT);
    const ModalElementStats: HTMLElement =
      this.bindElementByClass(MODAL_STATS_ELEMENT);
    const ResultsCheckBoard: HTMLElement = this.bindElementByClass(
      INNER_MODAL_STATS_ELEMENT
    );

    let flag: boolean = true;

    StatsElement.addEventListener("click", async () => {
      this.changeVisbilityOfGivenElement(ModalElementStats, flag);
      flag = !flag;

      ResultsCheckBoard.children[0].textContent = "ładuje";

      const stats: string[] = await Fetcher.FetchData<string[]>(GET_STATS_URL);

      ResultsCheckBoard.children[1].textContent = "";
      ResultsCheckBoard.children[0].textContent = "Najlepsze Statystyki Graczy";

      stats.map((value: string) => {
        const element: HTMLLIElement = document.createElement("li");
        element.textContent = value;
        ResultsCheckBoard.children[1].appendChild(element);
      });
    });
  }

  private SendUserDataToBackend(): void {
    const validator: Validator = new Validator(PASSWORD_INPUT_ELEMENT);
    validator.DisplayBadPassword();
    this.fetcher.SendUserAuthData();
  }

  private async OpenInfo(): Promise<void> {
    const htmlInfoElements = this.declareHTMLInfoELements();

    const ITEMS_PER_PAGE = 5;

    htmlInfoElements.OpenInfo.addEventListener("click", async () => {
      const creatorOfViews: ViewsCreator = new ViewsCreator();

      const createViewForBuffs: VisulizerFunc<Buff> =
        creatorOfViews.createViewForBuffs.bind(creatorOfViews);

      this.changeVisbilityOfGivenElement(htmlInfoElements.OpenedInfoPage, true);

      const PaginatorInstance = new Paginator<Buff>(
        htmlInfoElements.ListOfBuffs,
        htmlInfoElements.RIGHT_ITERATOR,
        htmlInfoElements.LEFT_ITERATOR,
        ITEMS_PER_PAGE,
        await Fetcher.FetchData(GET_BUFFS),
        createViewForBuffs,
        PAGINATE_BUFFS_RESULT_CLASS,
        this.eventListener
      );

      PaginatorInstance.PaginateResults();

      this.eventListener.add(htmlInfoElements.closeInfo, "click", () => {
        this.changeVisbilityOfGivenElement(
          htmlInfoElements.OpenedInfoPage,
          false
        );
        this.eventListener.removeListenersOnGivenNode(
          htmlInfoElements.closeInfo,
          "click"
        );
      });
    });
  }

  private async openSettings(): Promise<void> {
    const htmlElements = this.declareHTMLSettingsELements();

    const ITEMS_PER_PAGE = 5;
    const viewsCreator: ViewsCreator = new ViewsCreator();

    const createViewForSongs: VisulizerFunc<Songs> =
      viewsCreator.createViewForSongs.bind(viewsCreator);
    const createViewForSounds: VisulizerFunc<Sounds> =
      viewsCreator.createViewForSounds.bind(viewsCreator);

    htmlElements.OpenSettings.addEventListener("click", async () => {
      const SongsPaginator = new Paginator<Songs>(
        htmlElements.songsList,
        htmlElements.RIGHT_ITERATOR,
        htmlElements.LEFT_ITERATOR,
        ITEMS_PER_PAGE,
        await Fetcher.FetchData(GET_SONGS),
        createViewForSongs,
        PAGINATE_SONGS_RESULT_CLASS,
        this.eventListener
      );

      const SoundsPaginator = new Paginator<Sounds>(
        htmlElements.songsList,
        htmlElements.RIGHT_ITERATOR,
        htmlElements.LEFT_ITERATOR,
        ITEMS_PER_PAGE,
        tempTabOfSounds,
        createViewForSounds,
        PAGINATE_SONGS_RESULT_CLASS,
        this.eventListener
      );

      htmlElements.SOUNDS.addEventListener("click", () => {
        SoundsPaginator.PaginateResults();
      });

      htmlElements.MUSIC.addEventListener("click", () => {
        SongsPaginator.PaginateResults();
      });

      this.changeVisbilityOfGivenElement(htmlElements.OpenedSettingsPage, true);

      this.eventListener.add(htmlElements.resetInputsSettings, "click", () => {
        media.resetValuesToDefault(
          htmlElements.changeVolumeOfMusic,
          htmlElements.changeVolumeOfSound
        );
      });
      media.changeVolumeOfBackgroundMusic(htmlElements.changeVolumeOfMusic);
      media.changeVolumeOfSound(htmlElements.changeVolumeOfSound);
    });

    this.eventListener.add(htmlElements.CloseSettings, "click", () => {
      this.changeVisbilityOfGivenElement(
        htmlElements.OpenedSettingsPage,
        false
      );
    });
  }

  private async StartGame(): Promise<void> {
    media.setSound();

    const isLogged: null | string = localStorage.getItem("game");

    const startGamePanel: HTMLElement = this.bindElementByClass(START_THE_GAME);
    const BackToMenuPanel: HTMLElement = this.bindElementByClass(BACK_TO_MENU);
    const StartGameButton: HTMLElement = this.bindElementByClass(START_GAME);
    const LevelSelect: HTMLElement = this.bindElementByClass(
      MAIN_MENU_LEVEL_SELECT
    );

    if (1) {
      this.makeLoginPanelInvisible();
      this.changeVisbilityOfGivenElement(startGamePanel, true);
    }

    this.eventListener.add(StartGameButton, "click", () => {
      this.changeVisbilityOfGivenElement(LevelSelect, true);
      this.changeVisbilityOfGivenElement(startGamePanel, false);
      this.destroyBackground();
      levelSelect.handleOnClickLevel();
    });

    this.eventListener.add(BackToMenuPanel, "click", () => {
      this.StarsBackground = this.cachedInstance;

      this.changeVisbilityOfGivenElement(LevelSelect, false);
      this.changeVisbilityOfGivenElement(startGamePanel, true);
    });
  }

  public start(): void {
    this.switchBetweenRegisterAndLogin();
    this.switchStatsModalState();
    this.GenerateBackground();
    this.SendUserDataToBackend();
    this.StartGame();
    this.OpenInfo();
    this.openSettings();
  }
}
export const menu: Menu = new Menu();
