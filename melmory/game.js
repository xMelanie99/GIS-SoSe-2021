"use strict";
var Melmory;
(function (Melmory) {
    let pairCount = 8; // Anzahl der verschiedenen Karten auf der Spielfläche 
    let correctlyGuessedPairs = 0;
    let cardPool = new Array();
    let selectedCards = new Array();
    let startTimeSet = false;
    let startTime = 0;
    let durationMillis = 0;
    run();
    async function run() {
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
    function randomlyPickCardsFromLocalStorage() {
        let cardCount = Number(localStorage.getItem("card_count"));
        let possibleCards = new Array();
        for (let i = 0; i < cardCount; i++) {
            let cardUrl = localStorage.getItem("card_#" + i);
            possibleCards.push(cardUrl);
        }
        shuffle(possibleCards);
        for (let i = 0; i < pairCount; i++) {
            let randomCard = possibleCards.pop();
            cardPool.push(randomCard);
        }
    }
    function duplicateCardsInArray() {
        let tmp = new Array();
        for (let i = 0; i < cardPool.length; i++) {
            tmp.push(cardPool[i]);
        }
        for (let i = 0; i < tmp.length; i++) {
            cardPool.push(tmp[i]);
        }
    }
    function shuffle(array) {
        for (let i = 0; i < array.length; i++) {
            let tmp = array[i];
            let randomIndex = randomInt(0, array.length - 1);
            array[i] = array[randomIndex];
            array[randomIndex] = tmp;
        }
    }
    function displayCards() {
        let cardContainerDiv = document.getElementById("card-container");
        for (let i = 0; i < cardPool.length; i++) {
            let cardDiv = document.createElement("div");
            cardDiv.setAttribute("class", "card-div");
            let cardImg = document.createElement("img");
            cardImg.src = "./pictures/ui/sakura.png";
            cardImg.setAttribute("id", i.toString());
            cardImg.setAttribute("class", "card-image");
            cardImg.addEventListener("click", onCardClick);
            cardDiv.appendChild(cardImg);
            cardContainerDiv.appendChild(cardDiv);
        }
    }
    function onCardClick(_event) {
        if (!startTimeSet) {
            startTime = performance.now(); // https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
            startTimeSet = true;
            console.log("Start time set to " + startTime);
        }
        if (selectedCards.length < 2) {
            let cardImage = _event.target;
            let cardPoolIndex = Number(cardImage.id);
            let selectedCardUrl = cardPool[cardPoolIndex];
            let card = { url: selectedCardUrl, element: cardImage };
            let hasArraySelectedCard = false;
            for (let i = 0; i < selectedCards.length; i++) {
                if (cardPoolIndex == Number(selectedCards[i].element.id)) {
                    hasArraySelectedCard = true;
                }
            }
            if (!hasArraySelectedCard) {
                selectedCards.push(card);
            }
            cardImage.src = cardPool[cardPoolIndex];
            setTimeout(validateSelectedCards, 2000);
        }
    }
    function validateSelectedCards() {
        if (selectedCards.length == 2) {
            if (selectedCards[0].url === selectedCards[1].url) {
                console.log("Selected cards are the same!");
                selectedCards[0].element.src = "";
                selectedCards[1].element.src = "";
                selectedCards[0].element.parentElement.innerHTML = "";
                selectedCards[1].element.parentElement.innerHTML = "";
                correctlyGuessedPairs++;
                if (correctlyGuessedPairs == pairCount) {
                    let endTime = performance.now();
                    durationMillis = endTime - startTime;
                    durationMillis = Math.round(durationMillis * 100) / 100; // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
                    console.log("End time set to " + endTime);
                    localStorage.setItem("pair_count", pairCount.toString());
                    localStorage.setItem("time_millis", durationMillis.toString());
                    window.location.href = "name.html"; //https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
                }
            }
            else {
                console.log("Selected cards are NOT the same!");
                selectedCards[0].element.src = "./pictures/ui/sakura.png";
                selectedCards[1].element.src = "./pictures/ui/sakura.png";
            }
            selectedCards = new Array();
        }
    }
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function randomInt(min, max) {
        min = Math.floor(min);
        max = Math.floor(max) + 1;
        return Math.floor(Math.random() * (max - min) + min);
    }
})(Melmory || (Melmory = {}));
//# sourceMappingURL=game.js.map