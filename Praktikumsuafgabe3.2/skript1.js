"use strict";
var Aufgabe3;
(function (Aufgabe3) {
    document.getElementById("html-button").addEventListener("click", sendData);
    document.getElementById("json-button").addEventListener("click", sendData);
    async function sendData(_e) {
        let htmlButton = _e.target;
        let formData = new FormData(document.forms[0]); // document.forms = array aus allen Formularen       
        let data = { email: formData.get("e_Mail").toString(), password: formData.get("pw").toString() }; //.toString() = umwandlung in string | values wurden in objekt data gespeichert
        let query = new URLSearchParams(data); // neue query aus dem objekt erstellt
        let url = "https://memazing.herokuapp.com/"; // url vom Server wurde verwiesen
        switch (htmlButton.id) {
            case "html-button":
                url += "html";
                break;
            case "json-button":
                url += "json";
                break;
        }
        url = url + "?" + query.toString(); // query wurde der url hinz | ? = makiert eine query
        let response = await fetch(url); // macht erst weiter wenn die url da ist (asycron)
        switch (htmlButton.id) {
            case "html-button":
                let p = document.getElementById("pElement");
                p.innerHTML = await response.text();
                break;
            case "json-button":
                console.log(await response.json());
                break;
        }
    }
})(Aufgabe3 || (Aufgabe3 = {}));
// Zusammen mit Bao Han Nguyen gearbeitet.
//# sourceMappingURL=skript1.js.map