namespace Melmory {

    interface ScoreData {
        username: string;
        time_millis: number;
    }

    let serverUrl: string = "http://localhost:8100";

    let scoreData: ScoreData[] = new Array<ScoreData>();

    let medalPaths: string[] = ["./pictures/ui/medal1.png", "./pictures/ui/medal2.png", "./pictures/ui/medal3.png"];

    let gameErrorDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("error");
    let playParagraph: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("play-button");

    playParagraph.addEventListener("click", tryGameStart);

    run();

    async function run(): Promise<void> {
        await getScoresFromServer();
        displayHighscores();
    }

    async function getScoresFromServer(): Promise<void> {
        let response: Response = await fetch(serverUrl + "/get-all-scores");
        scoreData = await response.json();
    }

    function displayHighscores(): void {
        console.log("Displaying " + scoreData.length + " scores...");
        scoreData.sort((n1, n2) => n1.time_millis - n2.time_millis); // https://stackoverflow.com/questions/21687907/typescript-sorting-an-array

        let scoreContainerDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("score-container");

        for (let i: number = 0; i < scoreData.length; i++) {
            let scoreEntryDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            scoreEntryDiv.setAttribute("class", "score-entry");

            let scoreEntryRankDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            scoreEntryRankDiv.setAttribute("class", "score-entry-rank");

            let scoreEntryUsername: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
            scoreEntryUsername.setAttribute("class", "score-entry-username");
            scoreEntryUsername.textContent = scoreData[i].username;

            let scoreEntryTime: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
            scoreEntryTime.setAttribute("class", "score-entry-time");
            let timeSeconds: number = scoreData[i].time_millis / 1000;
            timeSeconds = Math.round(timeSeconds * 100) / 100; // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
            scoreEntryTime.textContent = timeSeconds + " s";

            if (i <= 2) {
                let scoreEntryRankImage: HTMLImageElement = <HTMLImageElement>document.createElement("img");
                scoreEntryRankImage.setAttribute("class", "score-entry-rank-image");
                scoreEntryRankImage.src = medalPaths[i];

                scoreEntryRankDiv.appendChild(scoreEntryRankImage);
            } else {
                let scoreEntryRankParagraph: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
                scoreEntryRankParagraph.setAttribute("class", "score-entry-rank-number");
                scoreEntryRankParagraph.textContent = (i + 1).toString();

                scoreEntryRankDiv.appendChild(scoreEntryRankParagraph);
            }

            scoreEntryDiv.appendChild(scoreEntryRankDiv);
            scoreEntryDiv.appendChild(scoreEntryUsername);
            scoreEntryDiv.appendChild(scoreEntryTime);

            scoreContainerDiv.appendChild(scoreEntryDiv);
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