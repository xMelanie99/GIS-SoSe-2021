namespace Charakter {
    interface Skin {
        colorPic: string;
        name: string;
    }

    interface Pattern {
        patternPic: string;
        name: string;
    }

    interface Hat {
        hatPic: string;
        name: string;
    }

    interface Pants {
        pantsPic: string;
        name: string;
    }

    interface Storage { // 2b (?)
        skin: Skin;
        hat: Hat;
        pants: Pants;
    }

    let allSkin: Skin[] = [];
    let allPattern: Pattern[] = [];
    let allHat: Hat[] = [];
    let allPants: Pants[] = [];
    let storeSkin: Skin;
    let storage: Storage = { skin: undefined, hat: undefined, pants: undefined };


    readData();
    console.log(allSkin.length);
    console.log(allSkin[0].name);

    function readData(): void {
        for (let i: number = 0; i < allData.length; i++) {
            let saveAtri: string[] = allData[i].split("+"); // Neues Array aus i ten Eintrag von allData
            if (saveAtri[0] == "Skin ") { // schaut im Arry an der 1. Stelle ob "Skin" true ist
                let skin: Skin = { colorPic: saveAtri[1], name: saveAtri[2] }; // Neue Variable vom Interface und die Attribute zugewiesen, aus den Daten (data.ts)
                allSkin[allSkin.length] = skin; // alle Auswahlmöglichkeiten werden einem Array hinzugefügt
            } else if (saveAtri[0] == "Pattern ") {
                let pattern: Pattern = { patternPic: saveAtri[1], name: saveAtri[2] };
                allPattern[allPattern.length] = pattern;
            }
            else if (saveAtri[0] == "Hat ") {
                let hat: Hat = { hatPic: saveAtri[1], name: saveAtri[2] };
                allHat[allHat.length] = hat;
            } else if (saveAtri[0] == "Pants ") {
                let pants: Pants = { pantsPic: saveAtri[1], name: saveAtri[2] };
                allPants[allPants.length] = pants;
            }
        }
    }

    loadOptions();

    function loadOptions(): void { // Container für alle Optionen wird befüllt
        let optContainer: HTMLDivElement = <HTMLDivElement>document.getElementById("flexbox"); // container wurde gespeichert, wo allen Optionen später gespeichert werden sollen
        for (let i: number = 0; i < allSkin.length; i++) {
            let divOpt: HTMLDivElement = <HTMLDivElement>document.createElement("div"); // neues div erstellt
            divOpt.setAttribute("class", "optContainer"); // Klasse zugewiesen von divOpt
            divOpt.setAttribute("id", i.toString()); // Gibt allen eine id mit einer Nummer, damit diese unterschiedenn werden können
            optContainer.appendChild(divOpt); // Neuer Ast im Baum


            let optImage: HTMLImageElement = <HTMLImageElement>document.createElement("img"); // neues img erstellt
            optImage.setAttribute("src", allSkin[i].colorPic); // dem src wurde der Pfad vom colorPic zugewiesen
            optImage.setAttribute("style", "background-color:" + allSkin[i].name + ";border: 1px solid gray;");  // jedem Skin wurde eine passende backgroundcolor zugewiesen
            optImage.setAttribute("alt", allSkin[i].name + "Skin");
            divOpt.appendChild(optImage);

            let optName: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p"); // neues p erstellt
            optName.setAttribute("class", "name");
            optName.appendChild(document.createTextNode(allSkin[i].name)); // text wurde eingefügt in optName
            divOpt.appendChild(optName);
        }
    }

    function selectOpt(_event: Event): void {
        let currentOpt: HTMLParagraphElement = <HTMLParagraphElement>_event.target; // currentOpt = Textelement, dass angeklickt wird
        // console.log("allo"); // Test für die Klicks
        for (let i: number = 0; i < allSkin.length; i++) {
            document.getElementById(i.toString()).querySelector("img").setAttribute("style", "background-color:" + allSkin[i].name + ";border: 1px solid gray;"); // bei jeder Option wird der Rand zurückgesetzt
        }
        let parentOpt: HTMLDivElement = <HTMLDivElement>currentOpt.parentElement; // parentOpt = "parent" von dem Text (div)
        parentOpt.querySelector("img").style.border = "7px solid black"; // Macht bei der Auswahl einen Border um das Bild
        storeSkin = allSkin[Number(parentOpt.id)]; // Number = macht parentOpt.id zu einem Typ number
    }

    for (let i: number = 0; i < allSkin.length; i++) {
        document.getElementById(i.toString()).querySelector(".name").addEventListener("click", selectOpt); // Fügt Event Listener zu jeder Auswahlmöglichkeit hinzu
    }

    function nextOption(): void {
        console.log(storeSkin);
        storage.skin = storeSkin; // speichert die Auswahl in der storage variable
        console.log(storage);
    }

    document.querySelector("#next").addEventListener("click", nextOption); //führt das Element, beim klicken, mit der id next die nextOption Funktion aus
}