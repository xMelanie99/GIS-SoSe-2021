"use strict";
let canv = document.getElementById("Canvas");
let cont = canv.getContext("2d");
function creatRect() {
    let colorOpt = ["#F0F8FF", "#6495ED", "#F08080", "#E0FFFF", "#FFB6C1", "#9370DB", "#FFE4E1", "#98FB98"];
    let rect1 = { posX: Math.random() * 1 / 4 * window.innerHeight, posY: Math.random() * 1 / 4 * window.innerHeight, width: Math.random() * 1 / 4 * window.innerWidth, height: Math.random() * 1 / 4 * window.innerHeight, color: colorOpt[Math.floor(Math.random() * colorOpt.length)] }; // zufällige Platzierungen und die Rechtecke werden innerhalb der angegeben Breite sowie Höhe festgelegt
    return rect1;
}
function drawRect(_rect) {
    cont.beginPath();
    cont.rect(_rect.posX, _rect.posY, _rect.width, _rect.height);
    cont.closePath();
    cont.stroke();
    cont.fillStyle = _rect.color;
    cont.fill();
}
let aryRect = [];
for (let i = 0; i < 5; i++) {
    aryRect.push(creatRect());
}
for (let j = 0; j < aryRect.length; j++) {
    drawRect(aryRect[j]);
}
drawRect(creatRect());
//# sourceMappingURL=Aufgabe3.js.map