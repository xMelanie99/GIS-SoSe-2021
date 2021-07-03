namespace Melmory {

    interface CardData {
        cardsUrl: string;
    }

    let sendButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addCardButton");
    sendButton.addEventListener("click", addCard);

    let serverUrl: string = "https://memazing.herokuapp.com/";
    // let serverUrl: string = "http://localhost:8100";

    let cardData: CardData[];

    run();

    async function run(): Promise<void> {
        await getCardURLsFromServer();
        await putCardsInLocalStorage();
        await showCards();
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

    function showCards(): void {
        console.log("LOCAL STORAGE");
        document.getElementById("cards").innerHTML = "";
        let cardCount: number = Number(localStorage.getItem("card_count"));
        for (let i: number = 0; i < cardCount; i++) {
            let cardDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            cardDiv.id = i.toString();

            let newCardImage: HTMLImageElement = document.createElement("img");
            newCardImage.src = localStorage.getItem("card_#" + i);

            let deleteCardImg: HTMLImageElement = document.createElement("img");
            deleteCardImg.src = "pictures/ui/cross.png";
            deleteCardImg.addEventListener("click", removeCard);

            cardDiv.appendChild(newCardImage);
            cardDiv.appendChild(deleteCardImg);

            document.getElementById("cards").appendChild(cardDiv);
        }
    }

    async function addCard(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]); // das was im Formular geschrieben wird
        let cardUrlToAdd: string = formData.get("cardUrl").toString();

        let url: string = serverUrl + "/admin-add-card";

        url = url + "?cardUrl=" + cardUrlToAdd;

        await fetch(url);
        await run();

        let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form"); // form Element wird in eine Var gespeichert
        form.reset(); // Inhalte werden zurückgesetzt
    }

    async function removeCard(_event: Event): Promise<void> {
        let eventTargetElement: HTMLImageElement = <HTMLImageElement>_event.target;

        let localStorageCardID: string = "card_#" + eventTargetElement.parentElement.id;
        let cardUrlToRemove: string = localStorage.getItem(localStorageCardID);

        let url: string = serverUrl + "/admin-delete-card";

        url = url + "?cardUrl=" + cardUrlToRemove;

        await fetch(url);
        await run();
    }
}