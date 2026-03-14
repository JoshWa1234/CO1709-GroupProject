export function emailValidation(email){
    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);

}

export function passwordValidation(password){
    let minUpperCase = 1
    let minLowerCase = 6
    let minSpecialChars = 1
    let minNumerics = 1
    let minLength = (minUpperCase + minLowerCase + minSpecialChars + minNumerics)
    let maxLength = 32;
    let regularExpression = new RegExp("^^(?=.*[A-Z]{"+minUpperCase+",})" +
        "(?=.*[a-z]{"+minLowerCase+",})(?=.*[0-9]{"+minNumerics+",})" +
        "(?=.*[!@#$\-_?.:{]{"+minSpecialChars+",})" +
        "[a-zA-Z0-9!@#$\-_?.:{]{"+minLength+","+maxLength+"}$");

    return regularExpression.test(password);
}