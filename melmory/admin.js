"use strict";
var Melmory;
(function (Melmory) {
    let sendButton = document.getElementById("add-card-button"); // send Button wird aus dem HTML gesucht
    sendButton.addEventListener("click", addCard); // sobald auf den Button geklickt wird, wird die Funktion addCard aufgerufen
    let serverUrl = "https://memazing.herokuapp.com"; // 1. Adresse vom Server, bei dem die Abfragen und Anfrage gemacht werden
    // let serverUrl: string = "http://localhost:8100"; //Adresse für den lokalen Server
    let cardData; //5. neue Variable wurde dem CardData-interface array zugewiesen || array, weil mehrere urls gepseichert werden
    run(); // soll ausgeführt werden sobald die Seite aufgerufen wird
    async function run() {
        await getCardURLsFromServer();
        await putCardsInLocalStorage();
        await showCards();
    }
    async function getCardURLsFromServer() {
        let response = await fetch(serverUrl + "/get-all-card-urls"); // 3. Antwort des Servers wird in eine variable gespeichert || fetch = Anfrage an den Server || await = wartet bis fetch komplett ausgeführt wurde und wandelt das Promise<Response> in Response um
        cardData = await response.json(); // 6. Gibt die Antwort als Ausgabe (in JSON) aus
    }
    function putCardsInLocalStorage() {
        localStorage.clear(); // 8. der localStorage wird geleert, damit er nicht immer wieder prüfen muss was entfernt oder hinzugefügt wird
        localStorage.setItem("card_count", cardData.length.toString()); // 9. setItem = fügt dem localStorage etwas hinzu || "card_count" = hat in dem localStorage (diesen...) Wert --> || cardData.length = Länge des Array (die vorhanden urls) --> Die Zahl wird in einen string umgewandelt
        for (let i = 0; i < cardData.length; i++) { // 10. damit alle Karten urls ins LocalStorage gespeichert werden
            localStorage.setItem("card_#" + i, cardData[i].cardsUrl); // 11. setItem(key,value) --> keys sind einzigartig und dürfen nicht mehrmals eingetragen werden || + i = damit keys in der for-Schleife einzigartig bleiben und später alle einfacher abgefragt werden können || 1. Lampe, 2. Tor, 3. Fuji || card_#0 = Lampe(url zum Bild der Lampe), card_#1 = Tor (url zum Bild der Tor), card_#2 = Fuji (url zum Bild der Fuji)
        }
    }
    function showCards() {
        document.getElementById("cards").innerHTML = ""; // 13. HTML id "cards" wurde angesprochen und alle Unterelemente wurden geleert || innerHTML = alles was zwischen <div> hier drin </div> steht || warum? = um alle vorherigen Bilder auf der HTML zu löschen 
        let cardCount = Number(localStorage.getItem("card_count")); // 14. in der neu erstellten Variable wird aus Z.30 die Anzahl (key: "card_count") der Karten ausgelesen und zugewiesen || der Wert zum key "card_count" wird von string in eine Zahl (number) umgewandelt
        for (let i = 0; i < cardCount; i++) { // 15. Zählt von 0 bis cardCount -1 hoch und liest die Karten aus dem LocalSotrage aus und stellt sie dar || warum? da im game.ts nur über LocalStorage die urls aufgerufen werden kann und nicht über den CardData[](array) und damit man später das Problem nicht mehr hat 
            let cardDiv = document.createElement("div"); // 16. Ein neues DIV element wird erzeugt und in cardDiv gespeichert
            cardDiv.setAttribute("id", i.toString()); // 17. warum wird die id aufs i gesetzt? Wenn man auf das Kreuz (Bild) klickt, damit man später weiß welche Karte gelöscht werden muss || Jedem div, in dem Bild beide Bilder vorhanden sind, wurde eine eigene id zugewiesen 
            cardDiv.setAttribute("class", "div-card"); // 18. Für CSS damit es gesteltet werden kann
            let newCardImage = document.createElement("img"); // 19. Ein neues img-element wird erzeugt und in newCardImage gespeichert
            newCardImage.src = localStorage.getItem("card_#" + i); // 20. dem Bild wird die url aus dem LocalStorage zugewiesen (als Hilfe Zeile 32) || src =
            newCardImage.setAttribute("class", "card-image"); // 21. Für CSS damit es gesteltet werden kann
            let deleteCardImg = document.createElement("img"); // 22.  Ein neues img-element wird erzeugt und in deleteCardImage gespeichert
            deleteCardImg.src = "pictures/ui/cross.png"; // 23. deleteCardImg wurde ein Bild (zum löschen) hinzugefügt
            deleteCardImg.setAttribute("class", "delete-image"); // 24. Für CSS damit es gesteltet werden kann
            deleteCardImg.addEventListener("click", removeCard); // 33. Beim klicken wird die Funktion removeCard sofort aufgerufen 
            cardDiv.appendChild(newCardImage); // 34. Fügt das Bild als Unterelement dem cardDiv hinzu
            cardDiv.appendChild(deleteCardImg); // 35. Fügt das Bild als Unterelemnt dem cardDiv hinzu
            document.getElementById("cards").appendChild(cardDiv); // 36. das cardDiv wird als Unterelement vom div-Element "cards" hinzugefügt
        }
    }
    async function addCard() {
        let formData = new FormData(document.forms[0]); // 38. document.forms[0] = erste form-Element im HTML-Dokument --> wird in formData gespeichert
        let cardUrlToAdd = formData.get("card-url").toString(); // 39. die url aus dem input-Feld wird ausgelsen und in cardUrlToAdd gespeichert 
        let url = serverUrl + "/admin-add-card"; // 40. url vom server, anfang ohne query
        url = url + "?cardUrl=" + cardUrlToAdd; // 41. url mit query die gelöscht werden soll
        await fetch(url); // 42. ruft mit query auf und wartet bis der Server eine Antwort gibt
        await run(); //  43 .führt die Funktion run auf und wartet bis sie fertig ausgeführt wurden
        let form = document.getElementById("form"); // 44. form aus HMTL wird in form gespeichert 
        form.reset(); // 45. form wird geleert
    }
    async function removeCard(_event) {
        let eventTargetElement = _event.target; // 26. target (im HMTL) = das was angeklickt wurde ist target (hier das Bild zum löschen --cross.png--) ||  das target wird eventTargetElement gespeichert
        let localStorageCardID = "card_#" + eventTargetElement.parentElement.id; // 27. key für Wertabfrage vom LocalStorage nächste Zeile
        let cardUrlToRemove = localStorage.getItem(localStorageCardID); // 28. die url die gelöscht werden sol
        let url = serverUrl + "/admin-delete-card"; // 29. url vom server, anfang ohne query
        url = url + "?cardUrl=" + cardUrlToRemove; // 30. url mit query die gelöscht werden soll
        await fetch(url); // 31. ruft mit query auf und wartet bis der Server eine Antwort gibt
        await run(); // 32. führt die Funktion run auf und wartet bis sie fertig ausgeführt wurden
    }
})(Melmory || (Melmory = {}));
//# sourceMappingURL=admin.js.map