export const ValidateInput = (input: any, regex: string = ""): boolean | void =>{
    if(input == ""){
        alert("Nie mozna wprowadzać pustych wartości")
        return false
    }
    return true
}

