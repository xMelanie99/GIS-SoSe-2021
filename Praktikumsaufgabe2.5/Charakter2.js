"use strict";
var Charakter;
(function (Charakter) {
    let StorageLocation;
    (function (StorageLocation) {
        StorageLocation["SKIN"] = "skin";
        StorageLocation["PATTERN"] = "pattern";
        StorageLocation["HAT"] = "hat";
        StorageLocation["PANTS"] = "pants";
    })(StorageLocation || (StorageLocation = {}));
    let dataObj;
    async function comuBrows(_url) {
        let response = await fetch(_url);
        dataObj = await response.json(); //damit es eine Ausgabe gibt
        console.log(dataObj);
        allDataSelect();
    }
    comuBrows("https://xmelanie99.github.io/GIS-SoSe-2021/Praktikumsaufgabe2.5/data.json"); //URL zum JSON
    function allDataSelect() {
        let pages = [
            { title: "Choose your skin", storageLocation: StorageLocation.SKIN, options: dataObj.allSkins },
            { title: "Choose your pattern", storageLocation: StorageLocation.PATTERN, options: dataObj.allPatterns },
            { title: "Choose your hat", storageLocation: StorageLocation.HAT, options: dataObj.allHats },
            { title: "Choose your pant", storageLocation: StorageLocation.PANTS, options: dataObj.allPants }
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
                selectedImg.setAttribute("id", i.toString() + "preview");
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
            let currentPagePreview = document.getElementById(pageIndex.toString() + "preview"); // die Box, die gefüllt werden soll, wird gesucht preview=die unteren Bilder
            currentPagePreview.src = currentPage.options[Number(currentOpt.parentElement.id)].pic;
        }
        document.querySelector("#next").addEventListener("click", nextOption); //führt das Element, beim klicken, mit der id next die nextOption Funktion aus
        function nextOption() {
            if (typeof storage[currentPage.storageLocation] == "undefined") {
                document.getElementById("error").setAttribute("style", "opacity:100%");
                return;
            }
            localStorage.setItem("storage", JSON.stringify(storage)); // Speicherdaten werden in localStorage gespeichert
            console.log(localStorage.getItem("storage"));
            pageIndex++;
            document.getElementById("flexbox").innerHTML = ""; // alles was in der Flexbox drin ist, wird gelöscht
            document.getElementById("title").innerHTML = ""; //  alles was iim title drin ist, wird gelöscht
            if (pages.length <= pageIndex) {
                console.log("Local Storage: " + localStorage.getItem("storage"));
                document.getElementById("preview").innerHTML = "";
                document.querySelector(".center").innerHTML = "";
                showGeneralView();
                return;
            }
            loadOptions();
        }
        function showGeneralView() {
            document.getElementById("title").appendChild(document.createTextNode("You are almost done!")); // erstellt einen neuen Titel
            let flexbox = document.getElementById("flexbox"); //neue flexbox
            flexbox.style.width = 250 + "px";
            flexbox.style.height = 348.99 + "px";
            flexbox.style.backgroundColor = "white";
            for (let i = 0; i < pages.length; i++) { //geht die auswahlmöglichkeiten durch
                let image = document.createElement("img"); //neues Image 
                let storage = JSON.parse(localStorage.getItem("storage")); // JSON wird konvertiert in storage
                image.src = storage[pages[i].storageLocation].pic; // img.src wird überschrieben
                image.style.position = "absolute";
                flexbox.appendChild(image); // Neuer Ast im Baum
            }
            let inputName = document.createElement("input"); // Textfeld erstellt
            inputName.style.width = 250 + "px";
            inputName.id = "inputName"; // id heißt inputName
            inputName.placeholder = "input name...";
            document.getElementById("inputDiv").appendChild(inputName);
            let resetButton = document.createElement("button"); // neu ertsellter Button
            resetButton.innerHTML = "reset all"; // neuer Text im Button
            resetButton.addEventListener("click", function () { window.location.reload(); }); // beim klick wird die Seite refresht
            document.getElementById("btn").appendChild(resetButton);
            resetButton.style.width = 100 + "px";
            resetButton.style.height = 28.19 + "px";
            let doneButton = document.createElement("button");
            doneButton.innerHTML = "done";
            doneButton.addEventListener("click", showFinalResult);
            document.getElementById("btn").appendChild(doneButton);
            doneButton.style.width = 100 + "px";
            doneButton.style.height = 28.19 + "px";
            async function getResponse() {
                let url = "https://gis-communication.herokuapp.com/"; // URL von der Aufgabe
                let query = new URLSearchParams(storage);
                url = url + "?" + query.toString();
                let response = await fetch(url);
                let answer = await response.json();
                console.log(JSON.stringify(answer));
                let emptyAnswer = document.getElementById("answer");
                if (answer.error) {
                    emptyAnswer.style.color = "orangered";
                    emptyAnswer.innerText = answer.error;
                }
                else {
                    emptyAnswer.style.color = "lightgreen";
                    emptyAnswer.innerText = answer.message;
                }
            }
            function showFinalResult() {
                let name = inputName.value; // neue Variable mit dem Wert vom Input in einen String
                let saveTitle = document.getElementById("title");
                if (saveTitle.hasChildNodes()) { //hasChildNode = sicherstellen dass es einen Kind Element gibt, bevor es gelöscht wird
                    saveTitle.removeChild(saveTitle.firstChild); //das erste Kind im heading Element wird gelöscht
                }
                saveTitle.appendChild(document.createTextNode(name)); //neuer Ast im Baum, mit dem gewünschten Namen
                document.getElementById("btn").removeChild(doneButton); // entfert den "done" Button
                document.getElementById("inputDiv").removeChild(inputName); //entfernt das inout Feld
                let uploadButton = document.createElement("button");
                uploadButton.innerHTML = "upload";
                uploadButton.addEventListener("click", getResponse);
                document.getElementById("btn").appendChild(uploadButton);
                uploadButton.style.width = 100 + "px";
                uploadButton.style.height = 28.19 + "px";
                let emptyAnswer = document.createElement("p");
                emptyAnswer.id = "answer";
                emptyAnswer.style.textAlign = "center";
                document.body.appendChild(emptyAnswer);
            }
        }
    }
})(Charakter || (Charakter = {})); // Zusammen mit Bao Han Nguyen gearbeitet.
//# sourceMappingURL=Charakter2.js.map