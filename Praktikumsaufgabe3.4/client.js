"use strict";
var Aufgabe3_4;
(function (Aufgabe3_4) {
    let sendButton = document.getElementById("send-button");
    let requestButton = document.getElementById("request-button");
    sendButton.addEventListener("click", addStudent);
    requestButton.addEventListener("click", getData);
    async function addStudent() {
        let formData = new FormData(document.forms[0]); // das was im Formular geschrieben wird
        let student = { name: formData.get("name").toString(), firstname: formData.get("firstname").toString(), matrikelnummer: Number(formData.get("matrikelnummer").toString()) };
        let url = "http://localhost:8100/insert"; // url vom Server wurde verwiesen
        let query = new URLSearchParams(student); // neue query aus dem Objekt erstellt
        url = url + "?" + query.toString(); // hinter der url in einem string geschrieben
        await fetch(url); // fetch  = ruf den Server mit der url, die er besitzt, auf 
        let form = document.getElementById("form"); // form Element wird in eine Var gespeichert
        form.reset(); // Inhalte werden zurückgesetzt
    }
    async function getData() {
        let output = document.getElementById("output");
        let url = "http://localhost:8100/get"; // url vom Server wurde verwiesen
        let response = await fetch(url);
        let dataString = await response.text();
        output.innerText = dataString;
    }
})(Aufgabe3_4 || (Aufgabe3_4 = {}));
//# sourceMappingURL=client.js.map