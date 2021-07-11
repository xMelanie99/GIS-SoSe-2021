namespace Melmory {

    // Hier wird nichts vom Server abgefragt, damit man Zeit sowie username in einen interface umwandelt und daraus eine Query erstellt
    interface ScoreData {
        username: string;
        time_millis: number;
    }

    // Adresse vom Heroku Server
    let serverUrl: string = "https://memazing.herokuapp.com";
    // Adresse vom lokalen Server
    // let serverUrl: string = "http://localhost:8100";

    // done-button wurde in HTML gesucht und in doneParagraph gespeichert
    let doneParagraph: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("done-button");
    // Beim klicken von done-button wird die Funktion sedScoreToSever aufgerufen
    doneParagraph.addEventListener("click", sendScoreToServer);

    // current-time wurde in HTML gesucht und in currentTimeParagraph gesepeichert
    let currentTimeParagraph: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("current-time");
    // benötigte Zeit wird vom Local Storage ausgelesen (in millisek.) und in timeMillis gespeichert 
    let timeMillis: number = Number(localStorage.getItem("time_millis"));
    // Zeit wird in Sekunden berechnet, da sie auf der seite in sek. angezeigt werden soll 
    let timeSeconds: number = timeMillis / 1000;
    // Zeit in sekunden wird auf zwei Nachkommastellen aufgerundet 
    timeSeconds = Math.round(timeSeconds * 100) / 100; // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary

    // Die Zeit wird für den User ausgegeben 
    currentTimeParagraph.textContent = "Your time: " + timeSeconds.toString() + " s";

    // username und Zeit wird an den Server gesendet
    async function sendScoreToServer(): Promise<void> {
        // benötigte Zeit wird vom Local Storage ausgelesen (in millisek.) und in timeMillis gespeichert
        let timeMillis: number = Number(localStorage.getItem("time_millis"));

        // document.forms[0] = erste form-Element im HTML-Dokument --> wird in formData gespeichert
        let formData: FormData = new FormData(document.forms[0]);
        // username und zeit werden in einen ScoreData interface gemacht und in scoreData gespeichert
        let scoreData: ScoreData = { username: formData.get("username").toString(), time_millis: timeMillis };
        //-- Aus dem scoreData wird eine Query gemacht 
        let query: URLSearchParams = new URLSearchParams(<any>scoreData);
        // Aus Z.39 & 41 wurde ein query aus username und Zeit erstellt. Daraus wird hier ein vollständiger Link gebildet, mit dem eine Anfrage an den Server gemacht werden kann
        
        serverUrl = serverUrl + "/add-new-score?" + query.toString();
        // Der Server wird mit url, path und query aufgerufen
        await fetch(serverUrl);
        // sobald der Server mit der Anfrage fertig ist wird der User weiter an die score Seite geleitet 
        window.location.href = "score.html"; //https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
    }
}