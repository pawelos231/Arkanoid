

export interface GameOverInterface {
    SendUserLevelData: () => void
    ShowUserScreenOver: () => void
}

export interface PaginatorInterface<T> {
    PaginateResults: () => void
}


export interface BuffsInterface {
    WrapperIfBuffIsActive: <T extends Function>(arg0: T) => void,
    applyBuffEffects: () => void
    drawBuff: () => void
}
