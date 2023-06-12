import { Common } from './Common.js';
import { Validator } from '../helpers/PasswordInputValidation.js';
import { Fetcher } from '../helpers/Fetcher.js';
import { media } from './Media.js';
import { levelSelect } from './LevelSelect.js';
import { Paginator } from './Paginator';
import { tempTabOfSongs } from '../data/temporarySongsData.js';
import { tempTabOfSounds } from '../data/temporarySoundsData.js';
import { GET_STATS_URL } from '../constants/api/Urls.js';
import { ViewsCreator } from '../helpers/viewCreator.js';
import { StarsBackroundView } from '../scenes/MainMenuThree.js';
import { tabOfBuffs } from '../data/BuffsData.js';
import { EventListener } from '../helpers/Events/EventListener';
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
class Menu extends Common {
    constructor() {
        super(REGISTER_FORMS);
        this.fetcher = new Fetcher(this.elementId);
        this.formElementRegister = this.bindElementByClass(FORM_TO_REGISTER);
        this.StarsBackground = new StarsBackroundView(600, "Stars");
        this.EventListenerInstance = new EventListener();
    }
    GenerateBackground() {
        let interval;
        if (this.StarsBackground) {
            this.StarsBackground.Init();
            interval = setInterval(() => {
                var _a;
                (_a = this.StarsBackground) === null || _a === void 0 ? void 0 : _a.Tick.bind(this.StarsBackground)();
            }, 12);
        }
        else {
            clearInterval(interval);
            console.log("obiekt został zniszczony");
        }
    }
    destroyBackground() {
        this.cachedInstance = this.StarsBackground;
        delete this.StarsBackground;
        this.GenerateBackground();
    }
    declareHTMLSettingsELements() {
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
        const LEFT_ITERATOR = this.bindElementByClass(`${PAGINATE_SONGS_RESULT_CLASS}> .left`);
        const RIGHT_ITERATOR = this.bindElementByClass(`${PAGINATE_SONGS_RESULT_CLASS}> .right`);
        return { MUSIC, SOUNDS, songsList, resetInputsSettings, changeVolumeOfMusic, changeVolumeOfSound, CloseSettings, OpenedSettingsPage, OpenSettings, LEFT_ITERATOR, RIGHT_ITERATOR };
    }
    declareHTMLInfoELements() {
        const OpenInfo = this.bindElementByClass(INFO);
        const OpenedInfoPage = this.bindElementByClass(OPENED_INFO);
        const closeInfo = this.bindElementByClass(CLOSE_INFO);
        const ListOfBuffs = this.bindElementByClass(LIST_OF_BUFFS);
        const LEFT_ITERATOR = this.bindElementByClass(`${PAGINATE_BUFFS_RESULT_CLASS}> .left`);
        const RIGHT_ITERATOR = this.bindElementByClass(`${PAGINATE_BUFFS_RESULT_CLASS}> .right`);
        return { OpenInfo, closeInfo, ListOfBuffs, OpenedInfoPage, RIGHT_ITERATOR, LEFT_ITERATOR };
    }
    switchBetweenRegisterAndLogin() {
        const changeValueOfMenuToLogin = this.bindElementByClass(CHECK_IF_LOGIN_OR_REGISTER);
        const formElementLogin = this.bindElementByClass(FORM_TO_LOGIN);
        let flag = false;
        changeValueOfMenuToLogin.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(this.formElementRegister, flag);
            flag = !flag;
            flag ?
                changeValueOfMenuToLogin.textContent = I_WANT_TO_REGISTER : changeValueOfMenuToLogin.textContent = I_WANT_TO_LOGIN;
            this.changeVisbilityOfGivenElement(formElementLogin, flag);
        });
    }
    async switchStatsModalState() {
        const StatsElement = this.bindElementByClass(STATS_ELELEMENT);
        const ModalElementStats = this.bindElementByClass(MODAL_STATS_ELEMENT);
        const ResultsCheckBoard = this.bindElementByClass(INNER_MODAL_STATS_ELEMENT);
        let flag = true;
        StatsElement.addEventListener("click", async () => {
            this.changeVisbilityOfGivenElement(ModalElementStats, flag);
            flag = !flag;
            const fetchData = Fetcher.FetchData(GET_STATS_URL);
            ResultsCheckBoard.children[0].textContent = "ładuje";
            const stats = await fetchData;
            ResultsCheckBoard.children[1].textContent = "";
            ResultsCheckBoard.children[0].textContent = "Najlepsze Statystyki Graczy";
            stats.map((value) => {
                const element = document.createElement("li");
                element.textContent = value;
                ResultsCheckBoard.children[1].appendChild(element);
            });
        });
    }
    SendUserDataToBackend() {
        const validator = new Validator(PASSWORD_INPUT_ELEMENT);
        validator.DisplayBadPassword();
        this.fetcher.SendUserAuthData();
    }
    async OpenInfo() {
        const htmlInfoElements = this.declareHTMLInfoELements();
        const ITEMS_PER_PAGE = 5;
        htmlInfoElements.OpenInfo.addEventListener("click", () => {
            const creatorOfViews = new ViewsCreator();
            const createViewForBuffs = creatorOfViews.createViewForBuffs.bind(creatorOfViews);
            this.changeVisbilityOfGivenElement(htmlInfoElements.OpenedInfoPage, true);
            const PaginatorInstance = new Paginator(htmlInfoElements.ListOfBuffs, htmlInfoElements.RIGHT_ITERATOR, htmlInfoElements.LEFT_ITERATOR, ITEMS_PER_PAGE, tabOfBuffs, createViewForBuffs, PAGINATE_BUFFS_RESULT_CLASS, this.EventListenerInstance);
            PaginatorInstance.PaginateResults();
            htmlInfoElements.closeInfo.addEventListener("click", () => {
                this.changeVisbilityOfGivenElement(htmlInfoElements.OpenedInfoPage, false);
            });
        });
    }
    async openSettings() {
        const htmlElements = this.declareHTMLSettingsELements();
        const ITEMS_PER_PAGE = 5;
        const creatorOfViews = new ViewsCreator();
        const createViewForSongs = creatorOfViews.createViewForSongs.bind(creatorOfViews);
        const createViewForSounds = creatorOfViews.createViewForSounds.bind(creatorOfViews);
        htmlElements.OpenSettings.addEventListener("click", () => {
            const SongsPaginator = new Paginator(htmlElements.songsList, htmlElements.RIGHT_ITERATOR, htmlElements.LEFT_ITERATOR, ITEMS_PER_PAGE, tempTabOfSongs, createViewForSongs, PAGINATE_SONGS_RESULT_CLASS, this.EventListenerInstance);
            const SoundsPaginator = new Paginator(htmlElements.songsList, htmlElements.RIGHT_ITERATOR, htmlElements.LEFT_ITERATOR, ITEMS_PER_PAGE, tempTabOfSounds, createViewForSounds, PAGINATE_SONGS_RESULT_CLASS, this.EventListenerInstance);
            htmlElements.SOUNDS.addEventListener("click", () => {
                SoundsPaginator.PaginateResults();
            });
            htmlElements.MUSIC.addEventListener("click", () => {
                SongsPaginator.PaginateResults();
            });
            this.changeVisbilityOfGivenElement(htmlElements.OpenedSettingsPage, true);
            htmlElements.resetInputsSettings.addEventListener("click", () => {
                media.resetValuesToDefault(htmlElements.changeVolumeOfMusic, htmlElements.changeVolumeOfSound);
            });
            media.changeVolumeOfBackgroundMusic(htmlElements.changeVolumeOfMusic);
            media.changeVolumeOfSound(htmlElements.changeVolumeOfSound);
        });
        htmlElements.CloseSettings.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(htmlElements.OpenedSettingsPage, false);
        });
    }
    async StartGame() {
        media.setSound();
        const isLogged = localStorage.getItem("game");
        const startGamePanel = this.bindElementByClass(START_THE_GAME);
        const BackToMenuPanel = this.bindElementByClass(BACK_TO_MENU);
        const StartGameButton = this.bindElementByClass(START_GAME);
        const LevelSelect = this.bindElementByClass(MAIN_MENU_LEVEL_SELECT);
        if (1) {
            this.makeLoginPanelInvisible();
            this.changeVisbilityOfGivenElement(startGamePanel, true);
        }
        StartGameButton.addEventListener("click", async () => {
            this.changeVisbilityOfGivenElement(LevelSelect, true);
            this.changeVisbilityOfGivenElement(startGamePanel, false);
            this.destroyBackground();
            levelSelect.handleOnClickLevel();
        });
        BackToMenuPanel.addEventListener("click", () => {
            this.StarsBackground = this.cachedInstance;
            this.changeVisbilityOfGivenElement(LevelSelect, false);
            this.changeVisbilityOfGivenElement(startGamePanel, true);
        });
    }
    start() {
        this.switchBetweenRegisterAndLogin();
        this.switchStatsModalState();
        this.GenerateBackground();
        this.SendUserDataToBackend();
        this.StartGame();
        this.OpenInfo();
        this.openSettings();
    }
}
export const menu = new Menu();
