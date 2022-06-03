declare namespace Syncope {
    interface LangObject {
        name: string;
        words: string[];
    }

    interface keyboardLayout {
        [key: string]: number;
    }

    interface playerObject {
        health: number,
        damage: number,
        dodge: number,
        multipliers: {
            Red: number,
            Blue: number,
            Green: number
        }
    }

    class Player {
        health: number;
        damage: number;
        dodge: number;
        Multipliers: {
            Red: number,
            Blue: number,
            Green: number
        }
    }
}