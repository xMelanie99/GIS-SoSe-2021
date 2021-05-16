"use strict";
var Charakter;
(function (Charakter) {
    let dataObj;
    json();
    function json() {
        dataObj = JSON.parse(Charakter.jsonAllData); // JSON wird konvertiert
    }
    let pages = [
        { title: "Choose your skin", storageLocation: Charakter.StorageLocation.SKIN, options: dataObj.allSkins },
        { title: "Choose your pattern", storageLocation: Charakter.StorageLocation.PATTERN, options: dataObj.allPatterns },
        { title: "Choose your hat", storageLocation: Charakter.StorageLocation.HAT, options: dataObj.allHats },
        { title: "Choose your pant", storageLocation: Charakter.StorageLocation.PANTS, options: dataObj.allPants }
    ];
    let storage = { skin: undefined, pattern: undefined, hat: undefined, pants: undefined };
    let pageIndex = 0; // neu erstellte Variable um durch alle Seiten nacheinader durchzugehen
    let currentPage;
    function creatSelection() {
        for (let i = 0; i < pages.length; i++) {
            let selectedImg = document.createElement("img");
            selectedImg.src = "Bilder/Placeholder.png";
            selectedImg.setAttribute("style", "margin: 10px");
            selectedImg.setAttribute("class", "currentSelection");
            selectedImg.width = 100;
            document.getElementById("storage").appendChild(selectedImg);
        }
    }
    loadOptions();
    creatSelection();
    function loadOptions() {
        let optContainer = document.getElementById("flexbox"); // container wurde gespeichert, wo allen Optionen später gespeichert werden sollen
        currentPage = pages[pageIndex]; // neue Variable für die aktuelle Seiteninfo
        document.getElementById("title").appendChild(document.createTextNode(currentPage.title)); //kreiert ein Titel
        for (let i = 0; i < currentPage.options.length; i++) { // von der aktuellen Seite
            let divOpt = document.createElement("div"); // neues div erstellt
            divOpt.setAttribute("class", "optContainer"); // Klasse zugewiesen von divOpt
            divOpt.setAttribute("id", i.toString()); // Gibt allen eine id mit einer Nummer, damit diese unterschiedenn werden können
            optContainer.appendChild(divOpt); // Neuer Ast im Baum
            let optImage = document.createElement("img"); // neues img erstellt
            optImage.setAttribute("src", currentPage.options[i].pic); // dem src wurde der Pfad vom colorPic zugewiesen
            if (pageIndex == 0) {
                optImage.setAttribute("style", "background-color:" + currentPage.options[i].name + ";border: 1px solid gray;"); // jedem Skin wurde eine passende backgroundcolor zugewiesen 
            }
            else {
                optImage.setAttribute("style", "background-color: white;border: 1px solid gray;"); // weißer Hintergrund für alles andere
            }
            optImage.setAttribute("alt", currentPage.options[i].name + "Skin");
            divOpt.appendChild(optImage);
            let optName = document.createElement("p"); // neues p erstellt
            optName.setAttribute("class", "name");
            optName.appendChild(document.createTextNode(currentPage.options[i].name)); // text wurde eingefügt in optName
            optName.addEventListener("click", selectOpt); // fügt jedem generietem namen einen event listener hinzu
            divOpt.appendChild(optName);
        }
    }
    function selectOpt(_event) {
        let currentOpt = _event.target; // currentOpt = aktuelle Textelement, dass angeklickt wird
        storage[currentPage.storageLocation] = currentPage.options[Number(currentOpt.parentElement.id)]; // speichert die ausgewählte Option an der richtigen Stelle
        document.getElementById("error").setAttribute("style", "opacity:0%");
        for (let i = 0; i < currentPage.options.length; i++) {
            document.getElementById(i.toString()).querySelector("img").setAttribute("style", "background-color:" + currentPage.options[i].name + ";border: 1px solid gray;"); // bei jeder Option wird der Rand zurückgesetzt
            if (pageIndex != 0) {
                document.getElementById(i.toString()).querySelector("img").style.backgroundColor = "white";
            }
        }
        let parentOpt = currentOpt.parentElement; // parentOpt = "parent" von dem Text (div)
        parentOpt.querySelector("img").style.border = "7px solid gray"; // Macht bei der Auswahl einen Border um das Bild
    }
    document.querySelector("#next").addEventListener("click", nextOption); //führt das Element, beim klicken, mit der id next die nextOption Funktion aus
    function nextOption() {
        if (typeof storage[currentPage.storageLocation] == "undefined") {
            document.getElementById("error").setAttribute("style", "opacity:100%");
            return;
        }
        localStorage.setItem("storage", JSON.stringify(storage));
        console.log(localStorage.getItem("storage"));
        pageIndex++;
        if (pages.length <= pageIndex) {
            console.log("Local Storage: " + localStorage.getItem("storage"));
            return;
        }
        document.getElementById("flexbox").innerHTML = ""; // alles was in der Flexbox drin ist, wird gelöscht
        document.getElementById("title").innerHTML = ""; //  alles was iim title drin ist, wird gelöscht
        loadOptions();
    }
})(Charakter || (Charakter = {}));
//# sourceMappingURL=Charakter1.js.map