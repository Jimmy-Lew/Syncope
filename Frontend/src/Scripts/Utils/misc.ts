let currentLanguage: Syncope.LangObject;

export async function getLanguage(lang : string): Promise<Syncope.LangObject> {
    await $.getJSON(`static/JSON/Languages/${lang}.json`, function(data) {
        currentLanguage = data
    });

    return currentLanguage;
}

export function round(numberToRound: number, decimalPlaces: number) : number {
    const divisor = Math.pow(10, decimalPlaces);
    return Math.round(numberToRound * divisor) / divisor;
}