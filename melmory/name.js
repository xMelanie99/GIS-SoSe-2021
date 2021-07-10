"use strict";
var Melmory;
(function (Melmory) {
    // Adresse vom Heroku Server
    let serverUrl = "https://memazing.herokuapp.com";
    // Adresse vom lokalen Server
    // let serverUrl: string = "http://localhost:8100";
    // done-button wurde in HTML gesucht und in doneParagraph gespeichert
    let doneParagraph = document.getElementById("done-button");
    // Beim klicken von done-button wird die Funktion sedScoreToSever aufgerufen
    doneParagraph.addEventListener("click", sendScoreToServer);
    // current-time wurde in HTML gesucht und in currentTimeParagraph gesepeichert
    let currentTimeParagraph = document.getElementById("current-time");
    // benötigte Zeit wird vom Local Storage ausgelesen (in millisek.) und in timeMillis gespeichert 
    let timeMillis = Number(localStorage.getItem("time_millis"));
    // Zeit wird in Sekunden berechnet, da sie auf der seite in sek. angezeigt werden soll || 1 sek. = 1000 millisek. deshalb macht man millisek./1000 um sekunden zahl zu bekommen
    let timeSeconds = timeMillis / 1000;
    // Zeit in sekunden wird auf zwei Nachkommastellen aufgerundet || Bsp.: 1,234567 * 100 = 123,4567 || Math.round = rundet (4) auf die nächste ganze Zahl --> 123 --> 123/100 = 1,23 || Bei 1 Nachkommastelle: *10 /10; Bei 3 Nachkommastelle: *1000 /1000 
    timeSeconds = Math.round(timeSeconds * 100) / 100; // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
    // Die Zeit wird für den User ausgegeben 
    currentTimeParagraph.textContent = "Your time: " + timeSeconds.toString() + " s";
    // username und Zeit wird an den Server gesendet
    async function sendScoreToServer() {
        // benötigte Zeit wird vom Local Storage ausgelesen (in millisek.) und in timeMillis gespeichert
        let timeMillis = Number(localStorage.getItem("time_millis"));
        // document.forms[0] = erste form-Element im HTML-Dokument --> wird in formData gespeichert
        let formData = new FormData(document.forms[0]);
        // username und zeit werden in einen ScoreData interface gemacht und in scoreData gespeichert
        let scoreData = { username: formData.get("username").toString(), time_millis: timeMillis };
        //-- Aus dem scoreData wird eine Query gemacht || warum? damit der Server aus der Query die Daten lesen kann
        let query = new URLSearchParams(scoreData);
        // Aus Z.39 & 41 wurde ein query aus username und Zeit erstellt. Daraus wird hier ein vollständiger Link gebildet, mit dem eine Anfrage an den Server gemacht werden kann
        // Bsp.: wie der vollständige Link aussieht: https://memazing.herokuapp.com/add-new-score?username=noob&time_millis=100000
        serverUrl = serverUrl + "/add-new-score?" + query.toString();
        // Der Server wird mit url, path und query aufgerufen
        await fetch(serverUrl);
        // sobald der Server mit der Anfrage fertig ist wird der User weiter an die score Seite geleitet || simuliert einen Maus klick und man kann mit zurück Button auf die vorherige Seite
        window.location.href = "score.html"; //https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
    }
})(Melmory || (Melmory = {}));
//# sourceMappingURL=name.js.map