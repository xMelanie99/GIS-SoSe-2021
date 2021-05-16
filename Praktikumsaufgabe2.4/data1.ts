namespace Charakter {

    export interface Skin {
        colorPic: string;
        name: string;
    }

    export interface Pattern {
        patternPic: string;
        name: string;
    }

    export interface Hat {
        hatPic: string;
        name: string;
    }

    export interface Pants {
        pantsPic: string;
        name: string;
    }

    export interface Storage {
        skin: Skin;
        hat: Hat;
        pants: Pants;
    }
    
    export interface Data {
        allSkins: Skin[];
        allPatterns: Pattern[];
        allHats: Hat[];
        allPants: Pants[];
    }

    export let dataObj: Data = {allSkins: [{colorPic: "Bilder/CharPink1.png", name: "pink"}, {colorPic: "Bilder/CharCyan1.png", name: "cyan"}, {colorPic: "Bilder/CharYellow1.png", name: "yellow"}],
                                allPatterns: [{patternPic: "Bilder/PatternNone1.png", name: "none"}, {patternPic: "Bilder/PatternDots1.png", name: "dots"}, {patternPic: "Bilder/PatternStripes1.png", name: "stripes"}],
                                allHats: [{hatPic: "Bilder/HatPaper1.png", name: "paper"}, {hatPic: "Bilder/HatBanana1.png", name: "banana"}, {hatPic: "Bilder/HatEars1.png", name: "ears"}],
                                allPants: [{pantsPic: "Bilder/PantsDoc1.png", name: "doctor"}, {pantsPic: "Bilder/PantsPolice1.png", name: "police"}, {pantsPic: "Bilder/PantsBusiness1.png", name: "business"}]};

    export let jsonAllData: string = JSON.stringify(dataObj);
}