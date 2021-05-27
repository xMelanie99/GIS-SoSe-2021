"use strict";
var Teilaufgabe2;
(function (Teilaufgabe2) {
    document.getElementById("send").addEventListener("click", sendData);
    async function sendData() {
        let formData = new FormData(document.forms[0]); // document.forms = array aus allen Formularen       
        let data = { email: formData.get("e_Mail").toString(), password: formData.get("pw").toString() }; //.toString() = umwandlung in string | values wurden in objekt data gespeichert
        let query = new URLSearchParams(data); // neue query aus dem objekt erstellt
        let url = "https://memazing.herokuapp.com/"; // url vom Server wurde verwiesen
        url = url + "?" + query.toString(); // query wurde der url hinz | ? = makiert eine query
        let response = await fetch(url); // macht erst weiter wenn die url da ist (asycron)
        console.log(await response.text()); // response wird ausgegeben
    }
})(Teilaufgabe2 || (Teilaufgabe2 = {}));
// Zusammen mit Bao Han Nguyen gearbeitet!
//# sourceMappingURL=skript.js.map