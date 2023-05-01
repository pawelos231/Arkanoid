

export interface GameOverInterface {
    SendUserLevelData: () => void
    ShowUserScreenOver: () => void
}

export interface PaginatorInterface<T> {
    PaginateResults: () => void
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
