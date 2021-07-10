"use strict";
var Melmory;
(function (Melmory) {
    // Adresse vom Heruko Server
    let serverUrl = "https://memazing.herokuapp.com";
    // Adresse für den lokalen Server
    // let serverUrl: string = "http://localhost:8100";
    // ein array aus ScoreData wurde erstellt || warum? wird benötigt um JSON Antwort vom Server in dieses array zu speichern
    let scoreData = [];
    // array von den Bilder (Medallien) in absteigender Reihenfolge --> 1. 2. 3 
    let medalPaths = ["./pictures/ui/medal1.png", "./pictures/ui/medal2.png", "./pictures/ui/medal3.png"];
    // error & play-button wird in HTML gesucht und in eine jeweils eine variable gespeichert
    let gameErrorDiv = document.getElementById("error");
    let playParagraph = document.getElementById("play-button");
    //  wenn play-button angeglickt wird, wird die Funktion tryGameStart aufgerufen
    playParagraph.addEventListener("click", tryGameStart);
    // soll ausgeführt werden sobald die Seite aufgerufen wird
    run();
    // holt die Scores vom Server und stellt sie dann dar || warum werden alle Karten nicht abgefragt (wegen play Button)? Weil auf der home Seite schon die Karten in den Local Storage gemacht wurde 
    async function run() {
        await getScoresFromServer();
        displayHighscores();
    }
    // holt die Scores vom Server
    async function getScoresFromServer() {
        // Antwort des Servers wird in eine Variable gespeichert || fetch() = Anfrage an den Server || await = wartet bis fetch komplett ausgeführt wurde und wandelt das Promise<Response> in Response um
        let response = await fetch(serverUrl + "/get-all-scores");
        // Gibt die Antwort des Servers als JSON string aus und wird im scoreData array gespeichert 
        scoreData = await response.json();
    }
    // Die Scores werden in absteigender Reihenfolge dargestellt 
    function displayHighscores() {
        // Damit man sieht, dass der Client was macht
        console.log("Displaying " + scoreData.length + " scores...");
        // sotiert das scoreData array in absteigender Reihenfolge abhängig von der Zeit (time_millis) || Bsp.: array von 1,3,5,4 --> 5,4,3,1
        scoreData.sort((n1, n2) => n1.time_millis - n2.time_millis); // https://stackoverflow.com/questions/21687907/typescript-sorting-an-array  --> https://www.w3schools.com/js/js_array_sort.asp 
        // score-container wird in HMTL gesucht und in eine Variable gespeichert
        let scoreContainerDiv = document.getElementById("score-container");
        // Geht alles Scores in scoreData durch und stellt diese dann dar || Grob zusammengefasst: Für jede Scores werden HTML-Elemente erstellt, mit Daten befüllt und in richtiger Reihenfolge als Child (Unterelemente) dem score-container hinzugefügt
        for (let i = 0; i < scoreData.length; i++) {
            // ein div-Element wird erstellt und in scoreEntryDiv gespeichert
            let scoreEntryDiv = document.createElement("div");
            // eine Klasse für css wird erstellt
            scoreEntryDiv.setAttribute("class", "score-entry");
            // ein div-Element wird erstellt und in scoreEntryRankDiv gespeichert
            let scoreEntryRankDiv = document.createElement("div");
            // eine Klasse für css wird erstellt
            scoreEntryRankDiv.setAttribute("class", "score-entry-rank");
            // ein paragarph-Element wird erstellt und in scoreUsername gespeichert
            let scoreEntryUsername = document.createElement("p");
            // eine Klasse für css wird erstellt
            scoreEntryUsername.setAttribute("class", "score-entry-username");
            //der username für den aktuellen (in der Schleife aktuell) Score wird für den User ausgegeben 
            scoreEntryUsername.textContent = scoreData[i].username;
            // ein paragraph-Element wird erstellt und in scoreEntryTime gespeichert
            let scoreEntryTime = document.createElement("p");
            // eine Klasse für css wird erstellt
            scoreEntryTime.setAttribute("class", "score-entry-time");
            // Zeit wird in Sekunden berechnet, da sie auf der seite in sek. angezeigt werden soll || 1 sek. = 1000 millisek. deshalb macht man millisek./1000 um sekunden zahl zu bekommen
            let timeSeconds = scoreData[i].time_millis / 1000;
            // Zeit in sekunden wird auf zwei Nachkommastellen aufgerundet || Bsp.: 1,234567 * 100 = 123,4567 || Math.round = rundet (4) auf die nächste ganze Zahl --> 123 --> 123/100 = 1,23 || Bei 1 Nachkommastelle: *10 /10; Bei 3 Nachkommastelle: *1000 /1000 
            timeSeconds = Math.round(timeSeconds * 100) / 100; // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
            // Die Zeit für den aktuellen (in der Schleife aktuell) Score wird für den User ausgegeben 
            scoreEntryTime.textContent = timeSeconds + " s";
            // wenn der Score 1. 2. oder 3. Platziert ist, dann soll eine Medallie angezeigt werden, anonsten einfach nur eine Zahl
            if (i <= 2) {
                // ein image-Element wird erstellt und in scoreEntryRankImg gespeichert
                let scoreEntryRankImage = document.createElement("img");
                // eine Klasse für css wird erstellt
                scoreEntryRankImage.setAttribute("class", "score-entry-rank-image");
                // da scoreData (damit auch die Schleifenvariable i) und medalPath absteigend sotiert sind gehört medalPath an (bsp) stelle [0] dem scoreData an Stelle [0] --> 1. Rank 
                scoreEntryRankImage.src = medalPaths[i];
                // Wird dem scoreEntryRankDiv als Child (unterelement bei HMTL) hinzugefügt 
                scoreEntryRankDiv.appendChild(scoreEntryRankImage);
            }
            else {
                // ein image-Element wird erstellt und in scoreEntryRankParagraph gespeichert
                let scoreEntryRankParagraph = document.createElement("p");
                // eine Klasse für css wird erstellt
                scoreEntryRankParagraph.setAttribute("class", "score-entry-rank-number");
                // Paragraph für die Ranknummer als Zahl wird dargestellt || i + 1 = weil Ränge fangen bei 1. an. Da i aber 0 anfängt 
                scoreEntryRankParagraph.textContent = (i + 1).toString();
                // Wird dem scoreEntryRankDiv als Child (unterelement bei HMTL) hinzugefügt 
                scoreEntryRankDiv.appendChild(scoreEntryRankParagraph);
            }
            // scoreEntryRankDiv wird dem scoreEntryRankDiv als Child (unterelement bei HMTL) hinzugefügt
            scoreEntryDiv.appendChild(scoreEntryRankDiv);
            // scoreEntryUsername wird dem scoreEntryRankDiv als Child (unterelement bei HMTL) hinzugefügt
            scoreEntryDiv.appendChild(scoreEntryUsername);
            // scoreEntryTime wird dem scoreEntryRankDiv als Child (unterelement bei HMTL) hinzugefügt
            scoreEntryDiv.appendChild(scoreEntryTime);
            // scoreEntryDiv wird dem scoreEntryRankDiv als Child (unterelement bei HMTL) hinzugefügt
            scoreContainerDiv.appendChild(scoreEntryDiv);
        }
    }
    // Überprüfung der Anzahl von Karten, falls genung vorhanden wird die Seite Game aufgerufen
    function tryGameStart() {
        // Anzahl der Karten urls werden in cardCount gespeichert
        let cardCount = Number(localStorage.getItem("card_count"));
        // Abfrage wenn weniger als 8 Karten vorhanden sind
        if (cardCount < 8) {
            // Meldung an den User, dass zu wenige Karten vorhanden sind 
            gameErrorDiv.textContent = "At least 8 unique cards are needed! Add more on the admin page.";
        }
        else {
            // Bei genug Karten wird der User weiter an die Game Seite geleitet || simuliert einen Maus klick und man kann mit zurück Button auf die vorherige Seite
            window.location.href = "game.html"; //https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
        }
    }
})(Melmory || (Melmory = {}));
//# sourceMappingURL=score.js.map