"use strict";
var Charakter;
(function (Charakter) {
    let dataObj;
    json();
    function json() {
        dataObj = JSON.parse(Charakter.jsonAllData); // JSON wird konvertiert
    }
    let storage = { skin: undefined, hat: undefined, pants: undefined };
    loadOptions();
    function loadOptions() {
        let optContainer = document.getElementById("flexbox"); // container wurde gespeichert, wo allen Optionen später gespeichert werden sollen
        for (let i = 0; i < dataObj.allSkins.length; i++) {
            let divOpt = document.createElement("div"); // neues div erstellt
            divOpt.setAttribute("class", "optContainer"); // Klasse zugewiesen von divOpt
            divOpt.setAttribute("id", i.toString()); // Gibt allen eine id mit einer Nummer, damit diese unterschiedenn werden können
            optContainer.appendChild(divOpt); // Neuer Ast im Baum
            let optImage = document.createElement("img"); // neues img erstellt
            optImage.setAttribute("src", dataObj.allSkins[i].colorPic); // dem src wurde der Pfad vom colorPic zugewiesen
            optImage.setAttribute("style", "background-color:" + dataObj.allSkins[i].name + ";border: 1px solid gray;"); // jedem Skin wurde eine passende backgroundcolor zugewiesen
            optImage.setAttribute("alt", dataObj.allSkins[i].name + "Skin");
            divOpt.appendChild(optImage);
            let optName = document.createElement("p"); // neues p erstellt
            optName.setAttribute("class", "name");
            optName.appendChild(document.createTextNode(dataObj.allSkins[i].name)); // text wurde eingefügt in optName
            optName.addEventListener("click", selectOpt); // fügt jedem generietem namen einen event listener hinzu
            divOpt.appendChild(optName);
        }
    }
    function selectOpt(_event) {
        let currentOpt = _event.target; // currentOpt = Textelement, dass angeklickt wird
        document.getElementById("error").setAttribute("style", "opacity:0%");
        for (let i = 0; i < dataObj.allSkins.length; i++) {
            document.getElementById(i.toString()).querySelector("img").setAttribute("style", "background-color:" + dataObj.allSkins[i].name + ";border: 1px solid gray;"); // bei jeder Option wird der Rand zurückgesetzt
        }
        let parentOpt = currentOpt.parentElement; // parentOpt = "parent" von dem Text (div)
        parentOpt.querySelector("img").style.border = "7px solid white"; // Macht bei der Auswahl einen Border um das Bild
        storage.skin = dataObj.allSkins[Number(parentOpt.id)]; // Number = macht parentOpt.id zu einem Typ number
    }
    document.querySelector("#next").addEventListener("click", nextOption); //führt das Element, beim klicken, mit der id next die nextOption Funktion aus
    function nextOption() {
        if (typeof storage.skin == "undefined") {
            document.getElementById("error").setAttribute("style", "opacity:100%");
            return;
        }
        localStorage.setItem("Skin", JSON.stringify(storage.skin));
        console.log(localStorage.getItem("Skin"));
    }
})(Charakter || (Charakter = {}));
//# sourceMappingURL=Charakter1.js.map