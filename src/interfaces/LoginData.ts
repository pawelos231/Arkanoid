
export interface Register {
    imie: string
    nick: string
    haslo: string
}
export type Login = Omit<Register, "imie">

export interface responseData {
    message: string
    status: number
}