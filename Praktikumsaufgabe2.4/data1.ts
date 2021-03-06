namespace Charakter {

    export interface BodyPart {
        pic: string;
        name: string;
    }

    export interface Storage {
        skin: BodyPart;
        pattern: BodyPart;
        hat: BodyPart;
        pants: BodyPart;
    }

    export interface Data {
        allSkins: BodyPart[];
        allPatterns: BodyPart[];
        allHats: BodyPart[];
        allPants: BodyPart[];
    }

    export enum StorageLocation { // Datentyp um die Ausgewähle Option später an der richtige Stelle speichern zu können
        SKIN = "skin",
        PATTERN = "pattern",
        HAT = "hat",
        PANTS = "pants"
    }

    export interface Page { // enthält alle Infos der einzelnen Seite
        title: string;
        storageLocation: StorageLocation;
        options: BodyPart[];
    }

    export let dataObj: Data = {
        allSkins: [{ pic: "Bilder/CharPink1.png", name: "pink" }, { pic: "Bilder/CharCyan1.png", name: "cyan" }, { pic: "Bilder/CharYellow1.png", name: "yellow" }],
        allPatterns: [{ pic: "Bilder/PatternNone1.png", name: "none" }, { pic: "Bilder/PatternDots1.png", name: "dots" }, { pic: "Bilder/PatternStripes1.png", name: "stripes" }],
        allHats: [{ pic: "Bilder/HatPaper1.png", name: "paper" }, { pic: "Bilder/HatBanana1.png", name: "banana" }, { pic: "Bilder/HatEars1.png", name: "ears" }],
        allPants: [{ pic: "Bilder/PantsDoc1.png", name: "doctor" }, { pic: "Bilder/PantsPolice1.png", name: "police" }, { pic: "Bilder/PantsBusiness1.png", name: "business" }]
    };

    export let jsonAllData: string = JSON.stringify(dataObj);
}