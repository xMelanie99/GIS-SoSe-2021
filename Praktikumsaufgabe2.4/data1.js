"use strict";
var Charakter;
(function (Charakter) {
    let StorageLocation;
    (function (StorageLocation) {
        StorageLocation["SKIN"] = "skin";
        StorageLocation["PATTERN"] = "pattern";
        StorageLocation["HAT"] = "hat";
        StorageLocation["PANTS"] = "pants";
    })(StorageLocation = Charakter.StorageLocation || (Charakter.StorageLocation = {}));
    Charakter.dataObj = {
        allSkins: [{ pic: "Bilder/CharPink1.png", name: "pink" }, { pic: "Bilder/CharCyan1.png", name: "cyan" }, { pic: "Bilder/CharYellow1.png", name: "yellow" }],
        allPatterns: [{ pic: "Bilder/PatternNone1.png", name: "none" }, { pic: "Bilder/PatternDots1.png", name: "dots" }, { pic: "Bilder/PatternStripes1.png", name: "stripes" }],
        allHats: [{ pic: "Bilder/HatPaper1.png", name: "paper" }, { pic: "Bilder/HatBanana1.png", name: "banana" }, { pic: "Bilder/HatEars1.png", name: "ears" }],
        allPants: [{ pic: "Bilder/PantsDoc1.png", name: "doctor" }, { pic: "Bilder/PantsPolice1.png", name: "police" }, { pic: "Bilder/PantsBusiness1.png", name: "business" }]
    };
    Charakter.jsonAllData = JSON.stringify(Charakter.dataObj);
})(Charakter || (Charakter = {}));
//# sourceMappingURL=data1.js.map