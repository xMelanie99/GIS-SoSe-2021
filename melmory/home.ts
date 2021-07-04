namespace Melmory {

    interface CardData {
        cardsUrl: string;
    }

    let gameErrorDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("error");
    let playParagraph: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("play");

    playParagraph.addEventListener("click", tryGameStart);

    let serverUrl: string = "https://memazing.herokuapp.com";
    // let serverUrl: string = "http://localhost:8100";

    let cardData: CardData[];

    run();

    async function run(): Promise<void> {
        await getCardURLsFromServer();
        await putCardsInLocalStorage();
    }

    async function getCardURLsFromServer(): Promise<void> {
        let response: Response = await fetch(serverUrl + "/get-all-card-urls");
        cardData = await response.json();
    }

    function putCardsInLocalStorage(): void {
        localStorage.clear();
        localStorage.setItem("card_count", cardData.length + "");
        for (let i: number = 0; i < cardData.length; i++) {
            localStorage.setItem("card_#" + i, cardData[i].cardsUrl);
        }
    }

    function tryGameStart(): void {
        let cardCount: number = Number(localStorage.getItem("card_count"));
        if (cardCount < 8) {
            gameErrorDiv.textContent = "At least 8 unique cards are needed! Add more on the admin page.";
        } else {
            window.location.href = "game.html"; //https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
        }
    }

} 

