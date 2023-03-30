import { BuffTypes } from "../../interfaces/HelperEnums";
export class Buff {
    BuffType: BuffTypes
    constructor(BuffType: BuffTypes){
        this.BuffType = BuffType
    }
    drawBuff(){

    }
    applyBuffEffects(){
        switch(this.BuffType){
            case BuffTypes.PaddleSpeed:{
                console.log("padddleSPPEEEEDD")
                break;
            }
            case BuffTypes.AddLive:{
                console.log("dodano zycie")
                break;
            }
            case BuffTypes.DestroyerBuff:{
                console.log("Destroy")
                break;
            }
            case BuffTypes.SpeedBuff:{
                console.log("speeeeed")
                break;
            }
            case BuffTypes.InvincibilityBuff:{
                console.log("nIEŚMIERTELNOŚĆ")
                break;
            }
            default:
                console.log("nieopisany efekt")
        }
    }
}