

export interface GameOverInterface {
    SendUserLevelData: () => void
    ShowUserScreenOver: () => void
}

export interface PaginatorInterface<T, F extends Function> {
    PaginateResults: <V = undefined>(
        ...ToggleCategoryEnums: 
        (V extends string ? [string] : [undefined?])) => void,
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
