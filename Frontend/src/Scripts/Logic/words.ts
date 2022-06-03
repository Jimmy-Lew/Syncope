import { Parse, getLanguage } from "../Utils";

const QWERTYScores = {
    q: 5,w: 4,e: 3,r: 2,t: 3,y: 3, u: 2,i: 3,o: 4,p: 5,
        a: 4,s: 3,d: 2,f: 1,g: 2,h: 2,j: 1,k: 2,l: 3,
            z: 5,x: 4,c: 3,v: 2,b: 3,n: 3,m: 2
} 

export async function getWords(options : {
    language? : string; 
    keyboardLayout? : Syncope.keyboardLayout; 
    calls? : number; 
    min? :number; 
    max? : number
} = {}) {
    const language = options.language || "english1k";
    const keyboardLayout = options.keyboardLayout || QWERTYScores
    const calls = options.calls || 3;
    const Min = options.min || 0;
    const Max = options.max || 99;

    let wordList : string[] = [];
    const data = await getLanguage(language);
    for (let i = 0; i < calls;) {
        const index = Math.floor(Math.random() * data.words.length);
        const word = data.words[index];
        const wordComplexity = Parse.wordComplexity(word, keyboardLayout);

        const isInRange = wordComplexity >= Min && wordComplexity <= Max;
        const isUnique = !wordList.includes(word)

        if (isInRange && isUnique) { wordList.push(word); i ++; }
    }

    return wordList;
}