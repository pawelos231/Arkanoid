export interface Buffs {
    id: number,
    color: string,
    description: string
    pathToImage: string
}

export const tabOfBuffs: Buffs[] = [
        {
            id: 1,
            color: "FF0000",
            description: "enchances your paddle speed",
            pathToImage: "http://localhost:1234/Krzysiu.a065cfe0.png", 
        },
        {
            id: 2,
            color: "00FF00",
            description: "Adds one live",
            pathToImage: "http://localhost:1234/Krzysiu.a065cfe0.png", 
        },
        {
            id: 3,
            color: "0000FF",
            description: "enchances your ball and paddle speed by small amounts",
            pathToImage: "http://localhost:1234/Krzysiu.a065cfe0.png", 
        },
        {
            id: 4,
            color: "#ffff00",
            description: "makes you invincible for about 1 minute",
            pathToImage: "http://localhost:1234/Krzysiu.a065cfe0.png", 
        },
        {
            id: 5,
            color: "#140f00",
            description: "makes your ball go through EVERYTHING, broken buff",
            pathToImage: "http://localhost:1234/Krzysiu.a065cfe0.png", 
        }
    ]
