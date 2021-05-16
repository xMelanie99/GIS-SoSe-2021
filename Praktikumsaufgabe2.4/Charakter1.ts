namespace Charakter {

    let dataObj: Data;
    json();
    function json(): void {
        dataObj = JSON.parse(jsonAllData); // JSON wird konvertiert
    }

    let pages: Page[] = [ // Datensatz für die Unterseiten
        { title: "Choose your skin", storageLocation: StorageLocation.SKIN, options: dataObj.allSkins },
        { title: "Choose your pattern", storageLocation: StorageLocation.PATTERN, options: dataObj.allPatterns },
        { title: "Choose your hat", storageLocation: StorageLocation.HAT, options: dataObj.allHats },
        { title: "Choose your pant", storageLocation: StorageLocation.PANTS, options: dataObj.allPants }
    ];

    let storage: Storage = { skin: undefined, pattern: undefined, hat: undefined, pants: undefined };
    let pageIndex: number = 0; // neu erstellte Variable um durch alle Seiten nacheinader durchzugehen
    let currentPage: Page;

    function creatSelection(): void {// erstellt die Auswahlübersicht
        for (let i: number = 0; i < pages.length; i++) {
            let selectedImg: HTMLImageElement = document.createElement("img");
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

    function loadOptions(): void { // Container für alle Optionen wird befüllt

        let optContainer: HTMLDivElement = <HTMLDivElement>document.getElementById("flexbox"); // container wurde gespeichert, wo allen Optionen später gespeichert werden sollen
        currentPage = pages[pageIndex]; // neue Variable für die aktuelle Seiteninfo

        document.getElementById("title").appendChild(document.createTextNode(currentPage.title)); //kreiert ein Titel

        for (let i: number = 0; i < currentPage.options.length; i++) { // von der aktuellen Seite
            let divOpt: HTMLDivElement = <HTMLDivElement>document.createElement("div"); // neues div erstellt
            divOpt.setAttribute("class", "optContainer"); // Klasse zugewiesen von divOpt
            divOpt.setAttribute("id", i.toString()); // Gibt allen eine id mit einer Nummer, damit diese unterschiedenn werden können
            optContainer.appendChild(divOpt); // Neuer Ast im Baum

            let optImage: HTMLImageElement = <HTMLImageElement>document.createElement("img"); // neues img erstellt
            optImage.setAttribute("src", currentPage.options[i].pic); // dem src wurde der Pfad vom colorPic zugewiesen
            if (pageIndex == 0) {
                optImage.setAttribute("style", "background-color:" + currentPage.options[i].name + ";border: 1px solid gray;");  // jedem Skin wurde eine passende backgroundcolor zugewiesen 
            } else {
                optImage.setAttribute("style", "background-color: white;border: 1px solid gray;"); // weißer Hintergrund für alles andere
            }
            optImage.setAttribute("alt", currentPage.options[i].name + "Skin");
            divOpt.appendChild(optImage);

            let optName: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p"); // neues p erstellt
            optName.setAttribute("class", "name");
            optName.appendChild(document.createTextNode(currentPage.options[i].name)); // text wurde eingefügt in optName
            optName.addEventListener("click", selectOpt); // fügt jedem generietem namen einen event listener hinzu
            divOpt.appendChild(optName);

        }
    }

    function selectOpt(_event: Event): void {
        let currentOpt: HTMLParagraphElement = <HTMLParagraphElement>_event.target; // currentOpt = aktuelle Textelement, dass angeklickt wird

        storage[currentPage.storageLocation] = currentPage.options[Number(currentOpt.parentElement.id)]; // speichert die ausgewählte Option an der richtigen Stelle

        document.getElementById("error").setAttribute("style", "opacity:0%");

        for (let i: number = 0; i < currentPage.options.length; i++) {
            document.getElementById(i.toString()).querySelector("img").setAttribute("style", "background-color:" + currentPage.options[i].name + ";border: 1px solid gray;"); // bei jeder Option wird der Rand zurückgesetzt

            if (pageIndex != 0) {
                document.getElementById(i.toString()).querySelector("img").style.backgroundColor = "white";
            }
        }
        let parentOpt: HTMLDivElement = <HTMLDivElement>currentOpt.parentElement; // parentOpt = "parent" von dem Text (div)
        parentOpt.querySelector("img").style.border = "7px solid gray"; // Macht bei der Auswahl einen Border um das Bild


        let currentPagePreview: HTMLImageElement = <HTMLImageElement>document.getElementById(pageIndex.toString() + "preview"); // die Box, die gefüllt werden soll, wird gesucht preview=die unteren Bilder
        currentPagePreview.src = currentPage.options[Number(currentOpt.parentElement.id)].pic;
    }

    document.querySelector("#next").addEventListener("click", nextOption); //führt das Element, beim klicken, mit der id next die nextOption Funktion aus

    function nextOption(): void {

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

    function showGeneralView(): void {
        document.getElementById("title").appendChild(document.createTextNode("You are almost done!")); // erstellt einen neuen Titel

        let flexbox: HTMLElement = <HTMLElement> document.getElementById("flexbox"); //neue flexbox
        flexbox.style.width = 250 + "px";
        flexbox.style.height = 348.99 + "px";
        flexbox.style.backgroundColor = "white";

        for (let i: number = 0; i < pages.length; i++) { //geht die auswahlmöglichkeiten durch
            let image: HTMLImageElement = <HTMLImageElement> document.createElement("img"); //neues Image 
            let storage: Storage = JSON.parse(localStorage.getItem("storage")); // JSON wird konvertiert in storage

            image.src = storage[pages[i].storageLocation].pic; // img.src wird überschrieben
            image.style.position = "absolute";
            flexbox.appendChild(image); // Neuer Ast im Baum
        }

        let inputName: HTMLInputElement = <HTMLInputElement> document.createElement("input"); // Textfeld erstellt
        inputName.style.width = 250 + "px";
        inputName.id = "inputName"; // id heißt inputName
        inputName.placeholder = "input name...";
        document.getElementById("inputDiv").appendChild(inputName);
        

        let resetButton: HTMLButtonElement = <HTMLButtonElement> document.createElement("button"); // neu ertsellter Button
        resetButton.innerHTML = "reset all"; // neuer Text im Button
        resetButton.addEventListener("click", function (): void { window.location.reload(); });  // beim klick wird die Seite refresht
        document.getElementById("btn").appendChild(resetButton);

        resetButton.style.width = 100 + "px";
        resetButton.style.height = 28.19 + "px";


        let doneButton: HTMLButtonElement = <HTMLButtonElement> document.createElement("button");
        doneButton.innerHTML = "done";
        doneButton.addEventListener("click", showFinalResult);
        document.getElementById("btn").appendChild(doneButton);

        doneButton.style.width = 100 + "px";
        doneButton.style.height = 28.19 + "px";
        
        function showFinalResult(): void {
            let name: string = inputName.value; // neue Variable mit dem Wert vom Input in einen String
            let saveTitle: HTMLHeadingElement = <HTMLHeadingElement> document.getElementById("title");

            if (saveTitle.hasChildNodes()) { //hasChildNode = sicherstellen dass es einen Kind Element gibt, bevor es gelöscht wird
                saveTitle.removeChild(saveTitle.firstChild); //das erste Kind im heading Element wird gelöscht
            }
            saveTitle.appendChild(document.createTextNode(name)); //neuer Ast im Baum, mit dem gewünschten Namen
            document.getElementById("btn").removeChild(doneButton); // entfert den "done" Button
            document.getElementById("inputDiv").removeChild(inputName); //entfernt das inout Feld
        }

    }


}