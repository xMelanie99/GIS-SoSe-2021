"use strict";
var Charakter;
(function (Charakter) {
    Charakter.dataObj = { allSkins: [{ colorPic: "Bilder/CharPink1.png", name: "pink" }, { colorPic: "Bilder/CharCyan1.png", name: "cyan" }, { colorPic: "Bilder/CharYellow1.png", name: "yellow" }],
        allPatterns: [{ patternPic: "Bilder/PatternNone1.png", name: "none" }, { patternPic: "Bilder/PatternDots1.png", name: "dots" }, { patternPic: "Bilder/PatternStripes1.png", name: "stripes" }],
        allHats: [{ hatPic: "Bilder/HatPaper1.png", name: "paper" }, { hatPic: "Bilder/HatBanana1.png", name: "banana" }, { hatPic: "Bilder/HatEars1.png", name: "ears" }],
        allPants: [{ pantsPic: "Bilder/PantsDoc1.png", name: "doctor" }, { pantsPic: "Bilder/PantsPolice1.png", name: "police" }, { pantsPic: "Bilder/PantsBusiness1.png", name: "business" }] };
    Charakter.jsonAllData = JSON.stringify(Charakter.dataObj);
})(Charakter || (Charakter = {}));
//# sourceMappingURL=data1.js.map