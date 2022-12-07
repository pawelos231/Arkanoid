export const ValidateInput = (input, regex = "") => {
    if (input == "") {
        alert("Nie mozna wprowadzać pustych wartości");
        return false;
    }
    return true;
};
