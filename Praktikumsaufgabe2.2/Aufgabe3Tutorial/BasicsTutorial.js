"use strict";
let can = document.getElementById("myFirstCanvas");
let ctx = can.getContext("2d");
// Selbstversuche
//let ctx = canvas.getContext("2d"); //Das Objekt ist ein 2D Objekt
//Quadrat
ctx.fillStyle = "rgba( 255, 0 , 0, 0.5"; //Farbe vom Quadrat
ctx.fillRect(0, 0, 50, 50); // Position1: x Position2: y Position3: Breite Position4: Höhe
ctx.fillStyle = "rgba( 0, 255 , 0, 0.5";
ctx.fillRect(80, 0, 50, 50);
ctx.fillStyle = "rgba( 0, 0 , 255, 0.5";
ctx.fillRect(160, 0, 50, 50);
//Linie - Raute
ctx.beginPath(); //neuer Pfad
ctx.moveTo(100, 100); //Start- Werte x und y -sieht man nicht-
ctx.lineTo(40, 200); //zieht eine Linie zum punkt x und y
ctx.lineTo(100, 300);
ctx.lineTo(160, 200);
ctx.lineTo(100, 100);
ctx.strokeStyle = "pink";
ctx.stroke();
// arc - Kreis
// ctx.beginPath();
// ctx.arc(300, 200, 30, 0, Math.PI * 2); // x,y,radius,startangel= start vom Winkel, endangle = ende vom Winkel | Math.PI = hälfte vom Kreis. *2 = ganzer Kreis, nur outline
// ctx.strokeStyle = "gray";
// ctx.stroke();
//für mehrere Kreise 100+
for (let i = 0; i < 50; i++) {
    let xpos = Math.random() * window.innerWidth; // x und y Werte die zufällig platziert werden | width und height = zufällger Platz von 0 bis zur ganzen Breite/ Höhe 
    let ypos = Math.random() * window.innerHeight;
    ctx.beginPath();
    ctx.arc(xpos, ypos, 30, 0, Math.PI * 2, false); // x,y,radius,startangel= start vom Winkel, endangle = ende vom Winkel | Math.PI = hälfte vom Kreis. *2 = ganzer Kreis, nur outline
    ctx.strokeStyle = "gray";
    ctx.stroke();
}
//# sourceMappingURL=BasicsTutorial.js.map