export class Enemy {
    name: string;
    health: number;
    fDamage: number;
    cDamage: number;
    attackPatterns: any;
    attackPatternIndex: number;
    state: { 
        Animation: string; 
        Attack: string; 
    };

    constructor(name : string, health : number, fDamage : number, cDamage : number, attackPatterns : any = {Default: [{calls: 3, min: 0, max: 99}]}) {
        this.name = name;

        this.health = health;

        this.fDamage = fDamage;
        this.cDamage = cDamage;

        this.attackPatterns = attackPatterns; // See Appendix A
        this.attackPatternIndex = 0;
        this.state = {
            Animation: "Idle",
            Attack: "Default"
        };
    }

    cycleAttackPattern(language ?: string) {
        let attackPatternList = this.attackPatterns[this.state.Attack];

        if (this.attackPatternIndex > attackPatternList.length - 1) this.attackPatternIndex = 0;

        let attackPattern = attackPatternList[this.attackPatternIndex];
        attackPattern.language = language;

        this.attackPatternIndex += 1;

        return attackPattern;
    }
}