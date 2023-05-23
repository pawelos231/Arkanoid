import { BuffTypes } from "../../interfaces/HelperEnums";
import { Brick } from "./Brick";
import { BuffsInterface } from "../../interfaces/classesInterfaces";


export class Buff implements BuffsInterface {
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
        

    WrapperIfBuffIsActive<F extends Function>(applyBuff: F): void{
        if (!this.AppliedBuffs.find(item => item == this.BuffType)){
            this.AppliedBuffs.push(this.BuffType)
            applyBuff()
        }
    }
    
    applyDestroyerBuff(): void{
        console.log("enabled destroyer buff")
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
                this.WrapperIfBuffIsActive(this.applyPaddleSpeedBuff.bind(this))
                break;
            }
            case BuffTypes.AddLive:{
                this.WrapperIfBuffIsActive(this.applyAddLivesBuff.bind(this))
                break;
            }
            case BuffTypes.DestroyerBuff:{
                this.WrapperIfBuffIsActive(this.applyDestroyerBuff.bind(this))
                break;
            }
            case BuffTypes.SpeedBuff:{
                this.WrapperIfBuffIsActive(this.applySpeedBuff.bind(this))
                break;
            }
            case BuffTypes.InvincibilityBuff:{
                this.WrapperIfBuffIsActive(this.applyInvincibiltyBuff.bind(this))
                break;
            }
            default:
                console.log("nieopisany efekt")
        }
    }
    drawBuff(){

    }
}