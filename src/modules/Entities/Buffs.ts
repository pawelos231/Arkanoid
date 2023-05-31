import { BuffTypes } from "../../interfaces/HelperEnums";
import { Brick } from "./Brick";
import { BuffsInterface } from "../../interfaces/classesInterfaces";
import { Media } from "../Media";
import { DESTROYER_BUFF_SOUND } from "../../constants/gameState";
import { findProperBuff } from "../../data/BuffsData";
import { Buff_Pos, Particle } from "../../interfaces/gameStateInterface";



export class Buff implements BuffsInterface {
    private BuffType: BuffTypes
    private tabOfBricks: Array<Brick>
    private cachedBrickArray: Array<Brick>
    private AppliedBuffs: number[]
    private time: number = 1000
    private buff_x: number = window.innerWidth / 2
    private buff_y: number = 100
    private buffVelocity: number = 7
    private ball_radius = 20
    private ctx: CanvasRenderingContext2D
    private particles: Particle[] = []
    private particleCount: number = 5
    private createdAt = Date.now()

    constructor(
        BuffType: BuffTypes, 
        tabOfBricks: Array<Brick>, 
        AppliedBuffs: number[],
        time: number,
        ctx: CanvasRenderingContext2D,
        {buff_x, buff_y}: Buff_Pos)
        {
            this.BuffType = BuffType
            this.tabOfBricks = tabOfBricks
            this.cachedBrickArray = [...tabOfBricks]
            this.AppliedBuffs = AppliedBuffs
            this.buff_x = buff_x
            this.buff_y = buff_y
            this.time = time
            this.ctx = ctx
        }
        

    public WrapperIfBuffIsActive<F extends Function>(applyBuff: F): F | false{

        setTimeout(() => {
            //this.clearBuffsEffects()
            this.AppliedBuffs = []
        }, this.time - 4500)
        console.log(this.AppliedBuffs)
        if (!this.AppliedBuffs.find(item => item == this.BuffType)){
            this.AppliedBuffs.push(this.BuffType)
            return applyBuff()
        } else {
        }
        return false
    }
    
    private applyDestroyerBuff(): void{

        Media.spanwCustomSound(DESTROYER_BUFF_SOUND)
        
        this.tabOfBricks.forEach((item: Brick) => {
            item.brickPointsGet.timesToHit = 1
        })

    }

    private applyAddLivesBuff(): void{
        console.log("add live")
    }

    private applySpeedBuff(): void{
        console.log("apply speed")
    }

    private applyInvincibiltyBuff(): void{
        console.log("apply invincibility")
    }

    private applyPaddleSpeedBuff(): void{
        console.log("apply paddle speed")
    }

    public applyBuffEffects(): void{
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


    private clearBuffsEffects(): void{
        if(this.BuffType == BuffTypes.DestroyerBuff){
            console.log("wyczyszczono efekty buffa", this.BuffType)
            console.log(this.tabOfBricks)
            this.tabOfBricks = this.cachedBrickArray
            console.log(this.tabOfBricks)
            console.log("cached", this.cachedBrickArray)
        }
    }

    private drawParicles(): void{
        const particleCount = this.particleCount;
        for (let i = 0; i < particleCount; i++) {
            const particle: Particle = {
              x: this.buff_x,
              y: this.buff_y,
              velocityX: Math.random() * 2 - 1,
              velocityY: Math.random() * 2 - 1,
              size: Math.random() * 3 + 1,
              color: `hsl(${Math.random() * 60 + 10}, 100%, 50%)`,
              lifespan: Math.random() * 1000,
              createdAt: Date.now(),
            };
            this.particles.push(particle);
          }
        

        this.particles.forEach((particle, index) => {

            particle.x += particle.velocityX;
            particle.y += particle.velocityY;
        
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalCompositeOperation = "source-over"; 
            this.ctx.fill();
            this.ctx.closePath();
        
            this.ctx.globalCompositeOperation = "source-atop";
            const elapsedTime = Date.now() - particle.createdAt;
            if (elapsedTime > particle.lifespan) {
                this.particles.splice(index, 1);
            }
        });

    }

    private drawBuffFunc(): void{
        this.buff_y += this.buffVelocity

        const Buff = findProperBuff(this.BuffType)
        if(!Buff) return

        this.ctx.save(); // Save the current canvas state

        this.ctx.beginPath();
        this.ctx.arc(this.buff_x, this.buff_y, this.ball_radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = Buff.color;
        this.ctx.fill();
        this.ctx.closePath();

        this.drawParicles()

        this.ctx.restore(); // Restore the canvas state

    }

    public drawBuff(): void{
        this.drawBuffFunc()
    }

    get createdAtVal(){
        return this.createdAt
    }

    get timeToLive(){
        return this.time
    }
    get buff_y_Pos(){
        return this.buff_y
    }
}