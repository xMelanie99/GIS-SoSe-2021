"use strict";
var Teilaufgabe2;
(function (Teilaufgabe2) {
    let formData = new FormData(document.forms[0]); // document.forms = array aus allen Formularen
    document.getElementById("send").addEventListener("click", sendData);
    async function sendData() {
        let data = { email: formData.get("E-Mail").toString(), password: formData.get("pw").toString() };
        let query = new URLSearchParams(data);
        let url = "https://memazing.herokuapp.com/";
        url = url + "?" + query.toString();
        let response = await fetch(url);
        console.log(await response.text());
    }
})(Teilaufgabe2 || (Teilaufgabe2 = {}));
//# sourceMappingURL=skript.js.map