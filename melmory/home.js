"use strict";
var Melmory;
(function (Melmory) {
    // error & play wurden im HTML Doc. gesucht und in eine Variable gespeichert
    let gameErrorDiv = document.getElementById("error");
    let playParagraph = document.getElementById("play");
    // wenn auf play geklickt wird, wird die Funktion tryGameStart ausgeführt || warum hat play ein eigenes event Listener (im Gegensatz zu `Change cards` und `Highscores`)? Damit min. 8 Karten vorhanden sind wenn man spielen will
    playParagraph.addEventListener("click", tryGameStart);
    // Adresse vom Heroku Server
    let serverUrl = "https://memazing.herokuapp.com";
    //Adresse für den lokalen Server
    // let serverUrl: string = "http://localhost:8100";
    //neue Variable wurde dem CardData-interface array zugewiesen
    let cardData = [];
    // soll ausgeführt werden sobald die Seite aufgerufen wird
    run();
    // fragt url vom Server ab und macht die urls in den Local Storage || warum auch hier? Weil überprüft werden muss, ob genug Karten vorhanden sind. Daher müssen die Karten schon im Local Storage vorhanden sein
    async function run() {
        await getCardURLsFromServer();
        await putCardsInLocalStorage();
    }
    // 1. die urls der Bilder werden beim Server angefragt
    async function getCardURLsFromServer() {
        // Antwort des Servers wird in eine Variable gespeichert || fetch() = Anfrage an den Server || await = wartet bis fetch komplett ausgeführt wurde und wandelt das Promise<Response> in Response um
        let response = await fetch(serverUrl + "/get-all-card-urls");
        // Gibt die Antwort des Servers als JSON string aus und wird im cardData array gespeichert
        cardData = await response.json();
    }
    // die urls der Karten werden in Local Storage gespeichert
    function putCardsInLocalStorage() {
        // Local Storage wird geleert
        localStorage.clear();
        // fügt dem Local Storage die Anzahl der Karten hinzu
        localStorage.setItem("card_count", cardData.length.toString());
        // damit alle Karten urls ins LocalStorage gespeichert werden
        for (let i = 0; i < cardData.length; i++) {
            //-
            localStorage.setItem("card_#" + i, cardData[i].cardsUrl);
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
//# sourceMappingURL=home.js.map