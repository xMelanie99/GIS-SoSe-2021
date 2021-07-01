"use strict";
var Melmory;
(function (Melmory) {
    var serverUrl = "http://localhost:8100";
    request_picture();
    async function request_picture() {
        let response = await fetch(serverUrl);
        let htmlPic = document.getElementById("amogus");
        htmlPic.src = await response.text();
    }
})(Melmory || (Melmory = {}));
//# sourceMappingURL=test.js.map