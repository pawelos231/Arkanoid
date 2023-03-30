import { BuffTypes } from "../../interfaces/HelperEnums";
import { Brick } from "./Brick";
export class Buff {
    BuffType: BuffTypes
    tabOfBricks: Array<Brick>
    cachedBrickArray: Array<Brick>
    AppliedBuffs: number[]

    constructor(
        BuffType: BuffTypes, 
        tabOfBricks: Array<Brick>, 
        AppliedBuffs: number[])
        {
            this.BuffType = BuffType
            this.tabOfBricks = tabOfBricks
            this.cachedBrickArray = tabOfBricks
            this.AppliedBuffs = AppliedBuffs
        }
        
    WrapperIfBuffIsActive<T extends Function>(applyBuff: T): void{
        if (!this.AppliedBuffs.find(item => item == this.BuffType)){
            this.AppliedBuffs.push(this.BuffType)
            applyBuff()
        }
    }
    
    applyDestroyerBuff(): void{
        this.tabOfBricks.forEach((item: Brick) => {
            item.brickPointsGet.timesToHit = 1
        })

    }

    applyAddLivesBuff(){
        console.log("siema1")
    }

    applySpeedBuff(){
        console.log("siema2")
    }

    applyInvincibiltyBuff(){
        console.log("siema3")
    }

    applyPaddleSpeedBuff(){
        console.log("siema4")
    }

    applyBuffEffects(){
        switch(this.BuffType){
            case BuffTypes.PaddleSpeed:{
                this.WrapperIfBuffIsActive(this.applyPaddleSpeedBuff)
                break;
            }
            case BuffTypes.AddLive:{
                this.WrapperIfBuffIsActive(this.applyAddLivesBuff)
                break;
            }
            case BuffTypes.DestroyerBuff:{
                this.WrapperIfBuffIsActive(this.applyDestroyerBuff)
                break;
            }
            case BuffTypes.SpeedBuff:{
                this.WrapperIfBuffIsActive(this.applySpeedBuff)
                break;
            }
            case BuffTypes.InvincibilityBuff:{
                this.WrapperIfBuffIsActive(this.applyInvincibiltyBuff)
                break;
            }
            default:
                console.log("nieopisany efekt")
        }
    }
    drawBuff(){

    }
}