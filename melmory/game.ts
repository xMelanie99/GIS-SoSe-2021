namespace Melmory {

    // wird benötigt um beim klicken einer Karte diese zu "merken" in dem es in selectedCards gespeichert wird
    interface Card {
        // HTML Bild-Element wird gespeichert...
        element: HTMLImageElement;
        // ...und die url dazu
        url: string;
    }

    // Anzahl der verschiedenen Karten auf der Spielfläche || warum? Weil 8 versch. Karten aus dem Local Storage genommen werden soll
    let pairCount: number = 8;
    // warum? speichert die Anzahl an Pärchen, die man richtig geraden hat
    let correctlyGuessedPairs: number = 0;
    // Karten, die dann auf der Spielfläche sind, deshalb einen array || warum? umd sie zu mischen und später dar zu stellen
    let cardPool: string[] = [];

    // ein leeres Array vom typ Card muss definiert werden, damit es später beim Code zu keiner Fehlermeldung kommt (weil bspw. später .length aufgerufen wird und selectedCards definiert werden muss)
    let selectedCards: Card[] = [];

    // Z. 22 - 24 sind für die Zeitmessung da || warum? die Zeit wird erst gemessen sobald die ertse Karte ausgewählt wird
    let setTheStartTime: boolean = true;
    // wird benutzt um den timer zu starten (startTime), sobald die erste Karte angeklickt wurde
    let startTime: number = 0;


    run();
    async function run(): Promise<void> {
        // TODO 
        // 1. Aus Local Storage 8 random karten ziehen und in einem array speichern
        // 2. Einträge im gespeichertem Karten-array duplizieren (-> kartenpärchen)
        // 3. Karten-array mischen (shufflen), damit karten im array random verteilt sind
        // 4. Karten-array darstellen (nur kartenrückseite)

        randomlyPickCardsFromLocalStorage(); // 1.
        duplicateCardsInArray(); // 2.
        shuffle(cardPool); // 3.        
        displayCards(); // 4.

    }

    // 1. wählt zufällig Karten aus dem Local Storage aus und mischt diese dann
    function randomlyPickCardsFromLocalStorage(): void {
        // Frägt die Kartenanzahl im Local Storage ab
        let cardCount: number = Number(localStorage.getItem("card_count"));

        // die urls aus dem Local Storage werden in possibleCards array gespeichert
        let allCards: string[] = [];
        for (let i: number = 0; i < cardCount; i++) {
            // fragt nach bspw. im ersten Durchlauf nach card_#0 ab...
            let cardUrl: string = localStorage.getItem("card_#" + i);
            // ... und pusht (speichert) diese Karte dann in allCards array
            allCards.push(cardUrl);
        }

        // shuffel = mischt den array, den ihm gegeben wird --> muss vom  Typ string[] sein
        shuffle(allCards);

        for (let i: number = 0; i < pairCount; i++) {
            let randomCard: string = allCards.pop();

            cardPool.push(randomCard);
        }
    }

    function duplicateCardsInArray(): void {
        let tmp: string[] = new Array<string>();

        for (let i: number = 0; i < cardPool.length; i++) {
            tmp.push(cardPool[i]);
        }

        for (let i: number = 0; i < tmp.length; i++) {
            cardPool.push(tmp[i]);
        }
    }

    // shuffel = mischt das array, welches ihm als Parameter gegeben wird --> muss vom  Typ string[] sein
    function shuffle(_array: string[]): void {
        // geht über das _array über und wechselt den Eintrag an Position i mit einem anderen zufälligen Eintrag im array
        for (let i: number = 0; i < _array.length; i++) {
            // der Eintrag an Position i wird zwischen gespeichert
            let tmp: string = _array[i];
            // randomIndex = random Position im _array, wird mit dem Wert an der Stelle i vertauscht ||Beispiel: Math.random() = 0,99; _array.length = 8 --> 0,99 * 8 = 7,92 --> Math.floor() (abrunden) --> 7 
            let randomIndex: number = Math.floor(Math.random() * _array.length);
            // Beispiel || warum wird das gemacht? Um die urls zu mischen
            // tmp bleibt immer 4
            // _array[i]: 4, _array[randomIndex]: 9
            // = _array[i]: 9, _array[randomIndex]: 9
            // _array[randomIndex]: 4, _array[i]: 9
            _array[i] = _array[randomIndex];
            _array[randomIndex] = tmp;
        }
    }

    // Bilder werden hier umgedreht dargestellt
    function displayCards(): void {
        // aus HTML wird card-container in cardContainerDiv gespeichert
        let cardContainerDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("card-container");
        // Geht jede Karten auf der Spielfläche durch und stellt sie dann dar
        for (let i: number = 0; i < cardPool.length; i++) {
            // ein neues div wird erstellt und in cardDiv gespeichert
            let cardDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            // für css zum gestalten
            cardDiv.setAttribute("class", "card-div");

            // neues img element wird erstellt und in cardImg gespeichert
            let cardImg: HTMLImageElement = <HTMLImageElement>document.createElement("img");
            // Das Sakura Bild (Kartenrückseite) wird dem cardImg zugewiesen
            cardImg.src = "./pictures/ui/sakura.png";
            // --Jede Rückseite bekommen verschiedene id's || warum i? Damit das onCardClick() weiß an welcher Position die Karte im cardPool array war
            cardImg.setAttribute("id", i.toString());
            // für css
            cardImg.setAttribute("class", "card-image");
            // beim klicken wird onCardClick() aufgerufen
            cardImg.addEventListener("click", onCardClick);

            // cardImg ist ein Unterelement von cardDiv
            cardDiv.appendChild(cardImg);
            // cardDiv ist ein Unterelement von cardContainerDiv
            cardContainerDiv.appendChild(cardDiv);
        }
    }

    // Funktion die aufgerufen wird, sobald eine Karte angeklickt wurde
    function onCardClick(_event: Event): void {
        // starten den Timer für die Zeitmessung
        if (setTheStartTime) {
            // Date() = Datums Klasse, man kann Anfragen bspw. zum loken Tag/Woche/Monat und Jahr || .getTime() = gibt die momentane Zeit in Millisek. aus
            startTime = new Date().getTime(); // https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
            // muss gesetzt werden damit, diese if-Abfrage nicht nochmal ausgeführt wird --> wird nur bei der ersten Karte ausgeführt, die angegeklickt wird
            setTheStartTime = false;
        }

        // selectedCards = ein array in dem die ausgewählten Karten sind (am Anfang leeres array)
        if (selectedCards.length < 2) {
            // target = HTML Element was angeklickt wurde || target ist hier immer ein Bild, da diese Funktion nur HTMLImageElemente hinzugefügt wurde
            let cardImage: HTMLImageElement = <HTMLImageElement>_event.target;
            // id der Karte ist die Position im cardPool array, der angeklickten Karte
            let cardPoolIndex: number = Number(cardImage.id);
            // url der angeklickten Karte wird in selectedCardUrl gespeichert
            let selectedCardUrl: string = cardPool[cardPoolIndex];
            // die url und das HTML Element wird in das Interface gegeben, damit dieses in das selectedCards array gespeichert wird
            let card: Card = { url: selectedCardUrl, element: cardImage };

            // sagt ob das selectedCards array die angeklickte Karte bereits enthält || Anfangs wird ausgegangen, dass die geklickte Karte noch nicht in selectedCards[] drin ist
            let hasArraySelectedCard: boolean = false;
            // Falls selectedCards array leer ist, kann die angeklickte Karte direkt dem selectedCards array hinzugefügt werden
            if (selectedCards.length == 1) {
                let arrayZeroPos: number = Number(selectedCards[0].element.id);
                // wenn weimal die selbe Karte angeklickt wurde
                if (arrayZeroPos == cardPoolIndex) {
                    // geklickte Karte wird auf true gesetzt, damit man weiß, dass die Karte im selectedCards[] enthalten ist
                    hasArraySelectedCard = true;
                }
            }
            // wenn die Karte noch nicht vorhanden ist wird sie in selectedCards[] hinzugefügt (push())
            if (!hasArraySelectedCard) {
                selectedCards.push(card);
            }
            // cardPool[cardPoolIndex] = url der angeklickten Karte im cardPool[] --> wird angezeigt || .src = aus HTML (<img src=...)
            cardImage.src = cardPool[cardPoolIndex];

            // setTimeout() = wird gemacht damit beide Karten angezeigt bevor sie wieder umgedreht werden
            setTimeout(validateSelectedCards, 2000); // https://www.w3schools.com/jsref/met_win_settimeout.asp
        }
    }

    // wenn im selectedCards[] zwei Karten drin sind, wird überprüft ob die Karten gleich sind
    function validateSelectedCards(): void {
        // wird geprüft ob zwei Karten enthalten sind
        if (selectedCards.length == 2) {
            // prüft ob beide Karten gleich sind, in dem die urls der Karten berglichen werden
            if (selectedCards[0].url === selectedCards[1].url) { // ===: https://developer.mozilla.org/de/docs/Web/JavaScript/Equality_comparisons_and_sameness
                console.log("Selected cards are the same!");

                // komplettes Bildelement wird bei beiden Karten in HTML geleert
                selectedCards[0].element.parentElement.innerHTML = "";
                selectedCards[1].element.parentElement.innerHTML = "";
                // Anzahl der richtig eratenen Pärchen (Z.14 wird um 1 erhöht)
                correctlyGuessedPairs++;

                // Wenn alle Pärchen gefunden wurden, dann soll die Zeit gemessen und in Local Storage gespeichert werden und auf die nächste Zeit weitergeleitet werden
                if (correctlyGuessedPairs == pairCount) {
                    // Wenn das Spiel beendet wurde, wird diese Zeit genommen
                    let endTime: number = new Date().getTime();
                    // Die Dauer wird in millisek. berchnet ||Bsp. startTime: 5000, endTime: 7000 --> duration = 2000
                    let durationMillis: number = endTime - startTime; 
                    // Zeit in sekunden wird auf zwei Nachkommastellen aufgerundet || Bsp.: 1,234567 * 100 = 123,4567 || Math.round = rundet (4) auf die nächste ganze Zahl --> 123 --> 123/100 = 1,23 || Bei 1 Nachkommastelle: *10 /10; Bei 3 Nachkommastelle: *1000 /1000
                    durationMillis = Math.round(durationMillis * 100) / 100; // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary

                    //zu dem key "time_millis" wird der Wert gesetzt, wie lange das Spiel gedauert hat
                    localStorage.setItem("time_millis", durationMillis.toString());

                    // leitet auf die name.html seite weiter, wenn zu ende gepsielt wurde ||simuliert einen Maus klick und man kann mit zurück Button auf die vorherige Seite
                    window.location.href = "name.html"; //https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
                }
            } else {
                // wenn beide Karte nicht gleich sind, werden sie wieder verdeckt bzw mit der Bild url von Sakura ausgetauscht
                console.log("Selected cards are NOT the same!");
                selectedCards[0].element.src = "./pictures/ui/sakura.png";
                selectedCards[1].element.src = "./pictures/ui/sakura.png";
            }
            // damit die Kartenauswahl wieder zurück gestzt wird
            selectedCards = [];
        }
    }

}