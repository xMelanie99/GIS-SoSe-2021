namespace Melmory {

    interface ScoreData {
        username: string;
        time_millis: number;
    }

    let serverUrl: string = "https://memazing.herokuapp.com";
    // let serverUrl: string = "http://localhost:8100";

    let doneParagraph: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("done-button");
    doneParagraph.addEventListener("click", onDoneClicked);

    let currentTimeParagraph: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("current-time");
    let timeMillis: number = Number(localStorage.getItem("time_millis"));
    let timeSeconds: number = timeMillis / 1000;
    timeSeconds = Math.round(timeSeconds * 100) / 100; // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary

    currentTimeParagraph.textContent = "time: " + timeSeconds.toString() + " s";

    async function onDoneClicked(): Promise<void> {
        let timeMillis: number = Number(localStorage.getItem("time_millis"));

        let formData: FormData = new FormData(document.forms[0]); 
        let data: ScoreData = { username: formData.get("username").toString(), time_millis: timeMillis };
        let query: URLSearchParams = new URLSearchParams(<any>data); 
        serverUrl = serverUrl + "/add-new-score?" + query.toString();
        await fetch(serverUrl); 
        window.location.href = "score.html"; //https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
    }
}