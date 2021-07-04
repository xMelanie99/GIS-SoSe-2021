"use strict";
var Melmory;
(function (Melmory) {
    let serverUrl = "https://memazing.herokuapp.com";
    // let serverUrl: string = "http://localhost:8100";
    let doneParagraph = document.getElementById("done-button");
    doneParagraph.addEventListener("click", onDoneClicked);
    let currentTimeParagraph = document.getElementById("current-time");
    let timeMillis = Number(localStorage.getItem("time_millis"));
    let timeSeconds = timeMillis / 1000;
    timeSeconds = Math.round(timeSeconds * 100) / 100; // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
    currentTimeParagraph.textContent = "time: " + timeSeconds.toString() + " s";
    async function onDoneClicked() {
        let timeMillis = Number(localStorage.getItem("time_millis"));
        let formData = new FormData(document.forms[0]);
        let data = { username: formData.get("username").toString(), time_millis: timeMillis };
        let query = new URLSearchParams(data);
        serverUrl = serverUrl + "/add-new-score?" + query.toString();
        await fetch(serverUrl);
        window.location.href = "score.html"; //https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
    }
})(Melmory || (Melmory = {}));
//# sourceMappingURL=name.js.map