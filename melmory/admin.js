"use strict";
var Melmory;
(function (Melmory) {
    let sendButton = document.getElementById("addCardButton");
    sendButton.addEventListener("click", addCard);
    let serverUrl = "https://memazing.herokuapp.com/";
    // let serverUrl: string = "http://localhost:8100";
    let cardData;
    run();
    async function run() {
        await getCardURLsFromServer();
        await putCardsInLocalStorage();
        await showCards();
    }
    async function getCardURLsFromServer() {
        let response = await fetch(serverUrl + "/get-all-card-urls");
        cardData = await response.json();
    }
    function putCardsInLocalStorage() {
        localStorage.clear();
        localStorage.setItem("card_count", cardData.length + "");
        for (let i = 0; i < cardData.length; i++) {
            localStorage.setItem("card_#" + i, cardData[i].cardsUrl);
        }
    }
    function showCards() {
        console.log("LOCAL STORAGE");
        document.getElementById("cards").innerHTML = "";
        let cardCount = Number(localStorage.getItem("card_count"));
        for (let i = 0; i < cardCount; i++) {
            let cardDiv = document.createElement("div");
            cardDiv.id = i.toString();
            let newCardImage = document.createElement("img");
            newCardImage.src = localStorage.getItem("card_#" + i);
            let deleteCardImg = document.createElement("img");
            deleteCardImg.src = "pictures/ui/cross.png";
            deleteCardImg.addEventListener("click", removeCard);
            cardDiv.appendChild(newCardImage);
            cardDiv.appendChild(deleteCardImg);
            document.getElementById("cards").appendChild(cardDiv);
        }
    }
    async function addCard() {
        let formData = new FormData(document.forms[0]); // das was im Formular geschrieben wird
        let cardUrlToAdd = formData.get("cardUrl").toString();
        let url = serverUrl + "/admin-add-card";
        url = url + "?cardUrl=" + cardUrlToAdd;
        await fetch(url);
        await run();
        let form = document.getElementById("form"); // form Element wird in eine Var gespeichert
        form.reset(); // Inhalte werden zurückgesetzt
    }
    async function removeCard(_event) {
        let eventTargetElement = _event.target;
        let localStorageCardID = "card_#" + eventTargetElement.parentElement.id;
        let cardUrlToRemove = localStorage.getItem(localStorageCardID);
        let url = serverUrl + "/admin-delete-card";
        url = url + "?cardUrl=" + cardUrlToRemove;
        await fetch(url);
        await run();
    }
})(Melmory || (Melmory = {}));
//# sourceMappingURL=admin.js.map