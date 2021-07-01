"use strict";
var Melmory;
(function (Melmory) {
    var serverUrl = "https://memazing.herokuapp.com/";
    var imageUrl = "https://raw.githubusercontent.com/xMelanie99/GIS-SoSe-2021/main/melmory";
    request_picture();
    async function request_picture() {
        let response = await fetch(serverUrl);
        let htmlPic = document.getElementById("amogus");
        htmlPic.src = imageUrl + (await response.text());
    }
})(Melmory || (Melmory = {}));
//# sourceMappingURL=test.js.map