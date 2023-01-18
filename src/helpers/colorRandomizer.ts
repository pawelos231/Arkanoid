export const colorRandomizer = (): string => {
    let sum: string = "#"
    const togenerate = "123456789ABCDFE"
    for (let i = 0; i < 6; i++) {
        const random: number = Math.abs(Math.floor(Math.random() * togenerate.length - 1))
        sum += togenerate[random]
    }
    return sum
}