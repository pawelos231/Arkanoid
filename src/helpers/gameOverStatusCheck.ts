export const gameOverStatus = (level: number, playerPoints: number, WIN: boolean, lives: number) => {

        if (lives == 0) {
            return { 
                end: true, 
                status: 0, 
                level: level, 
                points: playerPoints 
            }
        }


        if (WIN) {
            return { 
                end: true, 
                status: 1, 
                level: level, 
                points: playerPoints 
            }
        }

        
        return { 
            end: false, 
            status: 0, 
            level: level, 
            points: playerPoints 
        }
}