import { Common } from './Common.js';
import { Validator } from '../helpers/PasswordInputValidation.js';
import { Fetcher } from '../helpers/Fetcher.js';
import { media } from './Media.js';
import { levelSelect } from './LevelSelect.js';
import { settings } from './Settings.js';
import { tempTabOfSongs } from '../data/temporarySongsData.js';
import { tempTabOfSounds } from '../data/temporarySoundsData.js';
import { MediaEnum } from '../interfaces/HelperEnums.js';
import { GET_STATS_URL } from '../constants/api/Urls.js';
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
class Menu extends Common {
    constructor() {
        super(REGISTER_FORMS);
        this.fetcher = new Fetcher(this.elementId);
        this.formElementRegister = this.bindElementByClass(FORM_TO_REGISTER);
    }
    switchBetweenRegisterAndLogin() {
        const changeValueOfMenuToLogin = this.bindElementByClass(CHECK_IF_LOGIN_OR_REGISTER);
        const formElementLogin = this.bindElementByClass(FORM_TO_LOGIN);
        let flag = false;
        changeValueOfMenuToLogin.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(this.formElementRegister, flag);
            flag = !flag;
            flag == true ? changeValueOfMenuToLogin.textContent = I_WANT_TO_REGISTER : changeValueOfMenuToLogin.textContent = I_WANT_TO_LOGIN;
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
            const fetchData = this.fetcher.FetchData(GET_STATS_URL);
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
    async StartGame() {
        media.setSound();
        const isLogged = localStorage.getItem("game");
        const startGamePanel = this.bindElementByClass(START_THE_GAME);
        const BackToMenuPanel = this.bindElementByClass(BACK_TO_MENU);
        const StartGameButton = this.bindElementByClass(START_GAME);
        const LevelSelect = this.bindElementByClass(MAIN_MENU_LEVEL_SELECT);
        if (isLogged) {
            this.makeLoginPanelInvisible();
            this.changeVisbilityOfGivenElement(startGamePanel, true);
        }
        StartGameButton.addEventListener("click", async () => {
            this.changeVisbilityOfGivenElement(LevelSelect, true);
            this.changeVisbilityOfGivenElement(startGamePanel, false);
            levelSelect.handleOnClickLevel(await levelSelect.fetchLevels());
        });
        BackToMenuPanel.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(LevelSelect, false);
            this.changeVisbilityOfGivenElement(startGamePanel, true);
        });
    }
    async openSettings() {
        const OpenSettings = this.bindElementByClass(OPEN_SETTINGS);
        const OpenedSettingsPage = this.bindElementByClass(OPENED_SETTINGS_PAGE);
        const CloseSettings = this.bindElementByClass(CLOSE_SETTINGS);
        const changeVolumeOfMusic = this.bindElementByClass(MUSIC_RANGE);
        const changeVolumeOfSound = this.bindElementByClass(SOUND_RANGE);
        const resetInputsSettings = this.bindElementByClass(RESET_INPUT_SETTINGS);
        const songsList = this.bindElementByClass(LIST_OF_SONGS);
        const SOUNDS = this.bindElementByClass(SOUND_VIEW_LAYER_SHOW);
        const MUSIC = this.bindElementByClass(MUSIC_VIEW_LAYER_SHOW);
        //TODO have those files on server to give user choice what to play in backgground
        const ITEMS_PER_PAGE = 5;
        OpenSettings.addEventListener("click", () => {
            settings.PaginateResults(songsList, ITEMS_PER_PAGE, tempTabOfSongs, MediaEnum.Music);
            SOUNDS.addEventListener("click", () => {
                settings.PaginateResults(songsList, ITEMS_PER_PAGE, tempTabOfSounds, MediaEnum.Sounds);
            });
            MUSIC.addEventListener("click", () => {
                settings.PaginateResults(songsList, ITEMS_PER_PAGE, tempTabOfSongs, MediaEnum.Music);
            });
            this.changeVisbilityOfGivenElement(OpenedSettingsPage, true);
            resetInputsSettings.addEventListener("click", () => {
                media.resetValuesToDefault(changeVolumeOfMusic, changeVolumeOfSound);
            });
            media.changeVolumeOfBackgroundMusic(changeVolumeOfMusic);
            media.changeVolumeOfSound(changeVolumeOfSound);
        });
        CloseSettings.addEventListener("click", () => {
            this.changeVisbilityOfGivenElement(OpenedSettingsPage, false);
        });
    }
    start() {
        this.switchBetweenRegisterAndLogin();
        this.switchStatsModalState();
        this.SendUserDataToBackend();
        this.StartGame();
        this.openSettings();
    }
}
export const menu = new Menu();
