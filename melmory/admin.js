"use strict";
var Melmory;
(function (Melmory) {
    let sendButton = document.getElementById("add-card-button");
    sendButton.addEventListener("click", addCard);
    // Adresse vom Server
    let serverUrl = "https://memazing.herokuapp.com";
    //Adresse für den lokalen Server
    // let serverUrl: string = "http://localhost:8100"; 
    //neue Variable wurde dem CardData-interface array zugewiesen
    let cardData = [];
    run();
    // frägt url vom Server ab, macht die urls in LocalStorage und stellt die Karten dann dar
    async function run() {
        await getCardURLsFromServer();
        await putCardsInLocalStorage();
        await showCards();
    }
    // die urls der Bilder werden beim Server angefragt
    async function getCardURLsFromServer() {
        let response = await fetch(serverUrl + "/get-all-card-urls");
        // Gibt die Antwort des Servers als JSON string aus und wird im cardData array gespeichert
        cardData = await response.json();
    }
    // die urls der Karten werden in localStorage gespeichert
    function putCardsInLocalStorage() {
        // der localStorage wird geleert
        localStorage.clear();
        // fügt dem localStorage die Anzahl der Karten hinzu
        localStorage.setItem("card_count", cardData.length.toString());
        // damit alle Karten urls ins LocalStorage gespeichert werden
        for (let i = 0; i < cardData.length; i++) {
            localStorage.setItem("card_#" + i, cardData[i].cardsUrl);
        }
    }
    // Alle Karten im LocalStorage werden angezeigt
    function showCards() {
        // HTML id "cards" wurde angesprochen und alle Unterelemente wurden geleert 
        document.getElementById("cards").innerHTML = "";
        // in Variable wird die Anzahl (key: "card_count") der Karten ausgelesen und zugewiesen
        let cardCount = Number(localStorage.getItem("card_count"));
        // Zählt von 0 bis cardCount -1 hoch und liest die Karten aus dem LocalSotrage aus und stellt sie dar 
        for (let i = 0; i < cardCount; i++) {
            // Ein neues DIV element wird erzeugt und in cardDiv gespeichert
            let cardDiv = document.createElement("div");
            // Jedem div, in dem beide Bilder vorhanden sind, wurde eine eigene id zugewiesen 
            cardDiv.setAttribute("id", i.toString());
            // Für CSS damit es gesteltet werden kann
            cardDiv.setAttribute("class", "div-card");
            let newCardImage = document.createElement("img");
            // dem Bild wird die url aus dem LocalStorage zugewiesen
            newCardImage.src = localStorage.getItem("card_#" + i);
            // Für CSS damit es gesteltet werden kann
            newCardImage.setAttribute("class", "card-image");
            let deleteCardImg = document.createElement("img");
            // deleteCardImg wurde ein Bild (zum löschen) hinzugefügt
            deleteCardImg.src = "pictures/ui/cross.png";
            // Für CSS damit es gesteltet werden kann
            deleteCardImg.setAttribute("class", "delete-image");
            // Beim klicken wird die Funktion removeCard sofort aufgerufen 
            deleteCardImg.addEventListener("click", removeCard);
            // Fügt das Bild als Unterelement dem cardDiv hinzu
            cardDiv.appendChild(newCardImage);
            // Fügt das Bild als Unterelemnt dem cardDiv hinzu 
            cardDiv.appendChild(deleteCardImg);
            // das cardDiv wird als Unterelement vom div-Element "cards" hinzugefügt
            document.getElementById("cards").appendChild(cardDiv);
        }
    }
    // Fügt eine Karte per url hinzu
    async function addCard() {
        // document.forms[0] = erste form-Element im HTML-Dokument --> wird in formData gespeichert
        let formData = new FormData(document.forms[0]);
        // die url aus dem input-Feld wird ausgelsen und in cardUrlToAdd gespeichert 
        let cardUrlToAdd = formData.get("card-url").toString();
        // url vom server, anfang ohne query
        let url = serverUrl + "/admin-add-card";
        //++ url mit query die hinzugefügt werden soll
        url = url + "?cardUrl=" + cardUrlToAdd;
        // ruft mit query auf und wartet bis der Server eine Antwort gibt
        await fetch(url);
        // führt die Funktion run auf und wartet bis sie fertig ausgeführt wurden
        await run();
        let form = document.getElementById("form");
        form.reset();
    }
    // löscht die ausgewählte Karte 
    async function removeCard(_event) {
        //~ das target wird eventTargetElement gespeichert || target = HTML Element was angeklickt wurde
        let eventTargetElement = _event.target;
        // key für Wertabfrage vom LocalStorage 
        let localStorageCardID = "card_#" + eventTargetElement.parentElement.id;
        let cardUrlToRemove = localStorage.getItem(localStorageCardID);
        // url vom server, anfang ohne query
        let url = serverUrl + "/admin-delete-card";
        // url mit query die gelöscht werden soll
        url = url + "?cardUrl=" + cardUrlToRemove;
        await fetch(url);
        await run();
    }
})(Melmory || (Melmory = {}));
//# sourceMappingURL=admin.js.map