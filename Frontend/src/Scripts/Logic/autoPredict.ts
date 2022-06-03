function isLetterSame(userInput : string[], wordToCompare : string[]) : boolean {
    for (let letter in userInput) { if (userInput[letter] !== wordToCompare[letter]) return false; }
    return true;
} 

export function AutoPredict(userInput : string , wordList : string[]) : (string | undefined | void) {
    if (userInput.length <= 0) return "EmptyGuess";
    for (let word of wordList) { if (isLetterSame(userInput.split(""), word.split(""))) return word }
    return undefined;
}
