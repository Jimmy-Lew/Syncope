import { Parse } from "./../Utils";

// function comboRound (numberToRound: number) : number { return round(numberToRound, 1); };

const comboPatterns = {
    linear: (comboList : number[], lastIndex : number) => comboList.every(char => char === comboList[lastIndex]), // [1, 1, 1]
    linearIncrement: (comboList : number[], lastIndex : number) => comboList.every((comboItem, index) => comboItem == (comboList[lastIndex]) - (comboList.length - index - 1)), // [1, 2, 3]
    linearDecrement: (comboList : number[], lastIndex : number) => comboList.every((comboItem, index) => comboItem == (comboList[lastIndex]) - (comboList.length - index - 1)), // [3, 2, 1]
    elementLinear: (comboList : string[], lastIndex : number) => comboList.every(comboItem => comboItem === comboList[lastIndex]) // [Red, Red, Red]
}

export function calculateCombo(Player: Syncope.Player, comboList : (string | number)[][]) {
    let complexityList = Parse.Array.complexity(comboList);
    let elementList = Parse.Array.element(comboList);
    const lastIndex = comboList.length - 1;

    let comboBonus = 1;

    if (comboPatterns.linear(complexityList, lastIndex)) comboBonus += (parseFloat(comboList[lastIndex][1].toString()) * 0.15);
    if (comboPatterns.linearIncrement(complexityList, lastIndex)) comboBonus += (parseFloat(comboList[lastIndex][1].toString()) * 0.2)
    if (comboPatterns.linearDecrement(complexityList.reverse(), lastIndex)) comboBonus += (parseFloat(comboList[lastIndex][1].toString()) * 0.2)

    // @ts-ignore
    if (comboPatterns.elementLinear(elementList, lastIndex)) comboBonus *= Player.Multipliers[elementList[lastIndex]]
    
    return comboBonus;
}