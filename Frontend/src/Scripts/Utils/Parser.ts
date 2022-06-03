import { round } from './../Utils'

export const Parse = {
    charScore: (char : string, index : number, array : string[], keyboardLayout : Syncope.keyboardLayout) => {
        let currentScore = 0;

        const leftHandLetters = Parse.leftHandLetters(Parse.Array.fromJSONKeys(keyboardLayout));

        const isSameHandUsed = leftHandLetters.includes(char) 
                                && index !=0 
                                && leftHandLetters.includes(array[index - 1]) 
                            || !leftHandLetters.includes(char) 
                                && index !=0 
                                && !leftHandLetters.includes(array[index - 1]);

        const isSameLetter = index != 0 && char === array[index - 1];
        const isUpper = char === char.toUpperCase();

        if (isSameLetter) return 1;
        if (isSameHandUsed) currentScore += 1.5;
        if (isUpper) return currentScore += (keyboardLayout[char.toLowerCase()] + 2);
        return currentScore += keyboardLayout[char];
    },

    wordComplexity: (word : string, keyboardLayout : Syncope.keyboardLayout) => round(word.split("")
                                                                                .map((char, index, array) => Parse.charScore(char, index, array, keyboardLayout))
                                                                                .reduce((partial, current) => partial + current)/9, 1),

    longestWord: (wordList : string[]) => wordList.reduce((longestWord, currentWord) => {
        if (currentWord.length > longestWord.length) return currentWord;
        return longestWord;
    }),
 
    wordTime: (wordList : string[], CPS : number) => Parse.longestWord(wordList).length / CPS,

    WPM: (userInput : string, totalTime : number, timeLeft : number) => Math.ceil(((userInput.length / (totalTime - timeLeft)) * 60) / 5),
    CPS: (userInput : string, totalTime : number, timeLeft : number) => round((Parse.WPM(userInput, totalTime, timeLeft) * 5) / 60, 5),
    WPMToCPS: (WPM : number) => round((WPM * 5) / 60, 5),
    CPSToWPM: (CPS: number) => round((CPS * 60) / 5, 5),

    ComboItem: (userInput : string, wordList : string[], keyboardLayout : Syncope.keyboardLayout, elementList : string[] = ["Red", "Blue", "Green"]) => 
               [elementList[wordList.indexOf(userInput)], Parse.wordComplexity(userInput, keyboardLayout)],
               
    leftHandLetters: (keyboardLayout : string[]) => keyboardLayout.slice(0,5)
                                                                    .concat(keyboardLayout.slice(10,15), 
                                                                                    keyboardLayout.slice(-7, -3)),
    
    Array: {
        element: (comboList : (string | number)[][]) => Array.from(comboList, comboItem => comboItem[0].toString()),
        complexity: (comboList : (string | number)[][]) => Array.from(comboList, comboItem => parseInt(comboItem[1].toString())),
        fromJSONKeys: (obj : {}) => Array.from(Object.keys(obj)),
        fromJSONVals: (obj : {}) => Array.from(Object.values(obj)),
    },
}