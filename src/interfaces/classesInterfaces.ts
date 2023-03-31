export interface GameOverInterface {
    SendUserLevelData: () => void
    ShowUserScreenOver: () => void
}

export interface SettingsInterface {
    PaginateResults: <T, F extends Function, V = undefined>(
        arg0: HTMLElement, 
        arg1: number, 
        arg2: T[], 
        arg4: F ,
        arg3: string, 
        ...arg5: (V extends string ? [string] : [undefined?])) => void,
}


export interface BuffsInterface {
    WrapperIfBuffIsActive: (arg0: () => void) => void,
    applyDestroyerBuff: () => void,
    applyAddLivesBuff:() => void,
    applySpeedBuff:()=> void,
    applyInvincibiltyBuff: () => void,
    applyPaddleSpeedBuff: () => void
    applyBuffEffects: () => void
}
