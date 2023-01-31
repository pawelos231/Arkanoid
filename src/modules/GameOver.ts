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
    public ShowUserScreenOver() {
        this.changeVisbilityOfGivenElement(this.elementId, true)

    }
    public hideScreen() {
        this.changeVisbilityOfGivenElement(this.elementId, false)
    }
    public createView() {
        const innerElement: HTMLElement = this.bindElementByClass(INNER_GAME_OVER)
        innerElement.textContent = ""

        this.LevelInfo.status == 1 ? innerElement.style.border = "2px solid green" : innerElement.style.border = "2px solid red"

    }
}