"use strict";
let canv = document.getElementById("Canvas");
let cont = canv.getContext("2d");
//b
for (let i = 0; i < 50; i++) {
    let xpos = Math.random() * window.innerWidth; // x und y Werte die zufällig platziert werden | width und height = zufällger Platz von 0 bis zur ganzen Breite/ Höhe 
    let ypos = Math.random() * window.innerHeight;
    cont.beginPath();
    cont.rect(xpos, ypos, 30, 30);
    cont.strokeStyle = "gray";
    cont.stroke();
}
//# sourceMappingURL=Aufgabe3.js.map