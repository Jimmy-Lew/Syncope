import './../Styles/style.css'
import { getWords, calculateDamage } from './Logic'
import { Enemy, getPlayer } from './Entities'
import { Parse, round } from './Utils'
import { addAlert } from './Elements'

// const app = document.querySelector<HTMLDivElement>('#app')!

const QWERTYScores = {
  q: 5,w: 4,e: 3,r: 2,t: 3,y: 3, u: 2,i: 3,o: 4,p: 5,
      a: 4,s: 3,d: 2,f: 1,g: 2,h: 2,j: 1,k: 2,l: 3,
          z: 5,x: 4,c: 3,v: 2,b: 3,n: 3,m: 2
} 

let comboList = [["Red", 1], ["Red", 1], ["Red", 2]];
// const elementList = ["Red", "Blue", "Green"];

async function test() : Promise<void> {
  const attackPatternJSON = {
    Default: [ 
        {calls: 5, min: 1, max: 4},
        {calls: 5, min: 1, max: 4},
        {calls: 5, min: 1, max: 4},
        {calls: 5, min: 1, max: 4},
        {calls: 5, min: 1, max: 4},
        {calls: 5, min: 1, max: 4},
    ],
    Enraged: [
        {calls: 3, min: 2, max: 99},
        {calls: 1, min: 4, max: 99},
        {calls: 3, min: 3, max: 99},
    ],
    Critical: [
        {calls: 3, min: 2, max: 99},
        {calls: 1, min: 4, max: 99},
        {calls: 3, min: 3, max: 99},
    ]
  }

  const Player = await getPlayer();

  const testEnemy = new Enemy("Test", 0, 0, 0, attackPatternJSON);

  const requiredCPS = Parse.WPMToCPS(40);

  const WPM = 38;

  console.time('Test');
  for (let i = 0; i < 5 ; i++) {
    let attackPattern = testEnemy.cycleAttackPattern("english25k");

    let wordList = await getWords(attackPattern);

    let word = wordList[0]
    if (comboList.length > 3) comboList = comboList.slice(-3);  
    comboList.push(Parse.ComboItem(word, wordList, QWERTYScores));

    const allottedTime = round(Parse.wordTime(wordList, requiredCPS), 2)

    console.log(`You have %c${allottedTime}s%c to type [ ${wordList.join(' ')} ]`, "color: #F08D49", "color: white");

    let timeTaken = round(word.length / Parse.WPMToCPS(WPM), 2);

    timeTaken <= allottedTime ? console.log(`You did ${calculateDamage(Player, comboList, WPM)} damage taking %c${timeTaken}s`, "color: #5EBA7D")
                              : console.log(`You weren't fast enough at %c${timeTaken}s`, "color: red");
  }
  console.timeEnd('Test');
}

test()

addAlert("Test 1", 0);
// addAlert("Test 2", 0);
// addAlert("Test 3", 0);
// addAlert("Test 4", 0);
// addAlert("Test", 6);
// addAlert("Test", 7);