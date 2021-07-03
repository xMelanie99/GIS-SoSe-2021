"use strict";
var Melmory;
(function (Melmory) {
    let gameErrorDiv = document.getElementById("error");
    let playParagraph = document.getElementById("play");
    playParagraph.addEventListener("click", tryGameStart);
    let serverUrl = "http://localhost:8100";
    let cardData;
    run();
    async function run() {
        await getCardURLsFromServer();
        await putCardsInLocalStorage();
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
    function tryGameStart() {
        let cardCount = Number(localStorage.getItem("card_count"));
        if (cardCount < 8) {
            gameErrorDiv.textContent = "At least 8 unique cards are needed! Add more on the admin page.";
        }
        else {
            window.location.href = "game.html"; //https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
        }
    }
})(Melmory || (Melmory = {}));
//# sourceMappingURL=home.js.map