import { Common } from "./Common"
import { GameOverInterface } from "../interfaces/classesInterfaces"
import { Fetcher } from "../helpers/Fetcher"
import { SEND_STATS_ABOUT_GAME } from "../constants/api/Urls"
const INNER_GAME_OVER = "innerGameOver"
interface DataSendGameOver {
    points: number
    status: number
    elapsedTime: number
    level: number
}
export class GameOver extends Common implements GameOverInterface {
    LevelInfo: DataSendGameOver

    constructor(points: number, status: number, elapsedTime: number, level: number) {
        super("GameOver")
        Object.freeze(this.LevelInfo = { points, status, elapsedTime, level })
    }
    public async SendUserLevelData(): Promise<void> {
        const fetcher: Fetcher = new Fetcher(null)
        fetcher.sendDataToBackend<DataSendGameOver>(SEND_STATS_ABOUT_GAME, this.LevelInfo)
    }
    public ShowUserScreenOver(): void {
        this.changeVisbilityOfGivenElement(this.elementId, true)
        this.createView()

    }
    private BackToMenuScreen(backButton: HTMLElement) {

    }
    public hideScreen(): void {
        this.changeVisbilityOfGivenElement(this.elementId, false)
    }
    private createView(): void {
        const innerElement: HTMLElement = this.bindElementByClass(INNER_GAME_OVER)
        if (this.LevelInfo.status == 1) {
            innerElement.innerHTML += `<h2 class="info">Wygrałeś !</h2>`
        } else if (this.LevelInfo.status == 0) {
            innerElement.innerHTML += `<h2 class="info">Przegrałeś !</h2>`
        }
        innerElement.innerHTML += `<p class="statsInfo">Twoje statystyki</p>`
        innerElement.innerHTML += `<ul> <li>Ilość punktów</li> <li>Poziom: nie</li> <li>Zdobyte punkty: ${this.LevelInfo.points}</li><li>czas gry: ${this.LevelInfo.elapsedTime}</li></ul>`

        this.LevelInfo.status == 1 ? innerElement.style.border = "2px solid green" : innerElement.style.border = "2px solid red"

    }
}