let playerData: Syncope.playerObject;

class Player {
    static instance: any;
    health: number;
    damage: number;
    dodge: number;
    Multipliers: {
        Red : number, 
        Blue : number, 
        Green : number
    };

    constructor(health : number, damage : number, dodge : number, multipliers : {Red : number, Blue : number, Green : number}) {
        if (Player.instance) throw new Error("Only a single player instance allowed")
        this.health = health;
        this.damage = damage;

        this.dodge = dodge;

        this.Multipliers = multipliers;

        Player.instance = this;
        return Player.instance;
    }

    setRedMultiplier(multiplier : number) { this.Multipliers.Red = multiplier}
    getRedMultiplier() { return this.Multipliers.Red }

    setBlueMultiplier(multiplier : number) { this.Multipliers.Blue = multiplier}
    getBlueMultiplier() { return this.Multipliers.Blue }

    setGreenMultiplier(multiplier : number) { this.Multipliers.Blue = multiplier}
    getGreenMultiplier() { return this.Multipliers.Green }
}

const PlayerData = {
    convert: {
        single: (playerData : Syncope.playerObject) => {
            const {health, damage, dodge, multipliers} = playerData; 
            return new Player(health, damage, dodge, multipliers);
        }
    },

    GET: {

    }
}

export async function getPlayer() {
    await $.getJSON("static/Test/Data/playerData.json", function(data){
        playerData = data;
    })

    const player = PlayerData.convert.single(playerData);
    Object.seal(player);

    return player;
}