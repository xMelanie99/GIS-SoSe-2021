namespace Charakter {

    let dataObj: Data;

    json();

    function json(): void {
        dataObj = JSON.parse(jsonAllData); // JSON wird konvertiert
    }

    let storage: Storage = { skin: undefined, hat: undefined, pants: undefined };


    loadOptions();

    function loadOptions(): void { // Container für alle Optionen wird befüllt
        let optContainer: HTMLDivElement = <HTMLDivElement>document.getElementById("flexbox"); // container wurde gespeichert, wo allen Optionen später gespeichert werden sollen
        for (let i: number = 0; i < dataObj.allSkins.length; i++) {
            let divOpt: HTMLDivElement = <HTMLDivElement>document.createElement("div"); // neues div erstellt
            divOpt.setAttribute("class", "optContainer"); // Klasse zugewiesen von divOpt
            divOpt.setAttribute("id", i.toString()); // Gibt allen eine id mit einer Nummer, damit diese unterschiedenn werden können
            optContainer.appendChild(divOpt); // Neuer Ast im Baum

            let optImage: HTMLImageElement = <HTMLImageElement>document.createElement("img"); // neues img erstellt
            optImage.setAttribute("src", dataObj.allSkins[i].colorPic); // dem src wurde der Pfad vom colorPic zugewiesen
            optImage.setAttribute("style", "background-color:" + dataObj.allSkins[i].name + ";border: 1px solid gray;");  // jedem Skin wurde eine passende backgroundcolor zugewiesen
            optImage.setAttribute("alt", dataObj.allSkins[i].name + "Skin");
            divOpt.appendChild(optImage);

            let optName: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p"); // neues p erstellt
            optName.setAttribute("class", "name");
            optName.appendChild(document.createTextNode(dataObj.allSkins[i].name)); // text wurde eingefügt in optName
            optName.addEventListener("click", selectOpt); // fügt jedem generietem namen einen event listener hinzu
            divOpt.appendChild(optName);
        }
    }

    function selectOpt(_event: Event): void {
        let currentOpt: HTMLParagraphElement = <HTMLParagraphElement>_event.target; // currentOpt = Textelement, dass angeklickt wird
        document.getElementById("error").setAttribute("style", "opacity:0%");
        for (let i: number = 0; i < dataObj.allSkins.length; i++) {
            document.getElementById(i.toString()).querySelector("img").setAttribute("style", "background-color:" + dataObj.allSkins[i].name + ";border: 1px solid gray;"); // bei jeder Option wird der Rand zurückgesetzt
        }
        let parentOpt: HTMLDivElement = <HTMLDivElement>currentOpt.parentElement; // parentOpt = "parent" von dem Text (div)
        parentOpt.querySelector("img").style.border = "7px solid white"; // Macht bei der Auswahl einen Border um das Bild
        storage.skin = dataObj.allSkins[Number(parentOpt.id)]; // Number = macht parentOpt.id zu einem Typ number
    }

    document.querySelector("#next").addEventListener("click", nextOption); //führt das Element, beim klicken, mit der id next die nextOption Funktion aus

    function nextOption(): void {
        if (typeof storage.skin == "undefined") {
            document.getElementById("error").setAttribute("style", "opacity:100%");
            return;
        }
        localStorage.setItem("Skin", JSON.stringify(storage.skin));
        console.log(localStorage.getItem("Skin"));
    }
}