"use strict";
var Melmory;
(function (Melmory) {
    let serverUrl = "https://memazing.herokuapp.com";
    // let serverUrl: string = "http://localhost:8100";
    let scoreData = new Array();
    let medalPaths = ["./pictures/ui/medal1.png", "./pictures/ui/medal2.png", "./pictures/ui/medal3.png"];
    let gameErrorDiv = document.getElementById("error");
    let playParagraph = document.getElementById("play-button");
    playParagraph.addEventListener("click", tryGameStart);
    run();
    async function run() {
        await getScoresFromServer();
        displayHighscores();
    }
    async function getScoresFromServer() {
        let response = await fetch(serverUrl + "/get-all-scores");
        scoreData = await response.json();
    }
    function displayHighscores() {
        console.log("Displaying " + scoreData.length + " scores...");
        scoreData.sort((n1, n2) => n1.time_millis - n2.time_millis); // https://stackoverflow.com/questions/21687907/typescript-sorting-an-array
        let scoreContainerDiv = document.getElementById("score-container");
        for (let i = 0; i < scoreData.length; i++) {
            let scoreEntryDiv = document.createElement("div");
            scoreEntryDiv.setAttribute("class", "score-entry");
            let scoreEntryRankDiv = document.createElement("div");
            scoreEntryRankDiv.setAttribute("class", "score-entry-rank");
            let scoreEntryUsername = document.createElement("p");
            scoreEntryUsername.setAttribute("class", "score-entry-username");
            scoreEntryUsername.textContent = scoreData[i].username;
            let scoreEntryTime = document.createElement("p");
            scoreEntryTime.setAttribute("class", "score-entry-time");
            let timeSeconds = scoreData[i].time_millis / 1000;
            timeSeconds = Math.round(timeSeconds * 100) / 100; // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
            scoreEntryTime.textContent = timeSeconds + " s";
            if (i <= 2) {
                let scoreEntryRankImage = document.createElement("img");
                scoreEntryRankImage.setAttribute("class", "score-entry-rank-image");
                scoreEntryRankImage.src = medalPaths[i];
                scoreEntryRankDiv.appendChild(scoreEntryRankImage);
            }
            else {
                let scoreEntryRankParagraph = document.createElement("p");
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
//# sourceMappingURL=score.js.map