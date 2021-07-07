namespace Melmory {

    interface Card {
        element: HTMLImageElement;
        url: string;
    }

    let pairCount: number = 8; // Anzahl der verschiedenen Karten auf der Spielfläche 
    let correctlyGuessedPairs: number = 0;

    let cardPool: string[] = new Array<string>();

    let selectedCards: Card[] = new Array<Card>();

    let startTimeSet: boolean = false;
    let startTime: number = 0;
    let durationMillis: number = 0;


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

    function randomlyPickCardsFromLocalStorage(): void {
        let cardCount: number = Number(localStorage.getItem("card_count"));

        let possibleCards: string[] = new Array<string>();
        for (let i: number = 0; i < cardCount; i++) {
            let cardUrl: string = localStorage.getItem("card_#" + i);
            possibleCards.push(cardUrl);
        }

        shuffle(possibleCards);

        for (let i: number = 0; i < pairCount; i++) {
            let randomCard: string = possibleCards.pop();

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

    function shuffle(array: string[]): void {
        for (let i: number = 0; i < array.length; i++) {
            let tmp: string = array[i];
            let randomIndex: number = randomInt(0, array.length - 1);

            array[i] = array[randomIndex];
            array[randomIndex] = tmp;
        }
    }

    function displayCards(): void {
        let cardContainerDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("card-container");
        for (let i: number = 0; i < cardPool.length; i++) {
            let cardDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            cardDiv.setAttribute("class", "card-div");

            let cardImg: HTMLImageElement = <HTMLImageElement>document.createElement("img");
            cardImg.src = "./pictures/ui/sakura.png";
            cardImg.setAttribute("id", i.toString());
            cardImg.setAttribute("class", "card-image");
            cardImg.addEventListener("click", onCardClick);

            cardDiv.appendChild(cardImg);
            cardContainerDiv.appendChild(cardDiv);
        }
    }

    function onCardClick(_event: Event): void {
        if (!startTimeSet) {
            startTime = performance.now(); // https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
            startTimeSet = true;
            console.log("Start time set to " + startTime);
        }

        if (selectedCards.length < 2) {
            let cardImage: HTMLImageElement = <HTMLImageElement>_event.target;
            let cardPoolIndex: number = Number(cardImage.id);
            let selectedCardUrl: string = cardPool[cardPoolIndex];

            let card: Card = { url: selectedCardUrl, element: cardImage };

            let hasArraySelectedCard: boolean = false;
            for (let i: number = 0; i < selectedCards.length; i++) {
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

    function validateSelectedCards(): void {
        if (selectedCards.length == 2) {
            if (selectedCards[0].url === selectedCards[1].url) {
                console.log("Selected cards are the same!");
                selectedCards[0].element.src = "";
                selectedCards[1].element.src = "";

                selectedCards[0].element.parentElement.innerHTML = "";
                selectedCards[1].element.parentElement.innerHTML = "";
                correctlyGuessedPairs++;
                if (correctlyGuessedPairs == pairCount) {
                    let endTime: number = performance.now();
                    durationMillis = endTime - startTime;

                    durationMillis = Math.round(durationMillis * 100) / 100; // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary

                    console.log("End time set to " + endTime);

                    // localStorage.setItem("pair_count", pairCount.toString());
                    // Zeit wird gesetzt wie lange das Spiel gedauert hat
                    localStorage.setItem("time_millis", durationMillis.toString());

                    window.location.href = "name.html"; //https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
                }
            } else {
                console.log("Selected cards are NOT the same!");
                selectedCards[0].element.src = "./pictures/ui/sakura.png";
                selectedCards[1].element.src = "./pictures/ui/sakura.png";
            }
            selectedCards = new Array<Card>();
        }
    }
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function randomInt(min: number, max: number): number {
        min = Math.floor(min);
        max = Math.floor(max) + 1;
        return Math.floor(Math.random() * (max - min) + min);
    }
}