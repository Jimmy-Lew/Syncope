import { calculateCombo } from "./combo";

export function calculateDamage(Player: Syncope.Player, comboList : (string | number)[][], WPM : number) {
    const comboBonus = calculateCombo(Player, comboList);

    return Math.floor(Player.damage * (WPM / 45) * comboBonus)
}