"use strict";
let canvas = document.getElementById("FirstCanvas");
let context = canvas.getContext("2d");
//a
//Grüner boden
context.beginPath();
context.moveTo(0, 500);
context.lineTo(500, 500);
context.lineTo(500, 350);
context.lineTo(0, 350);
context.lineTo(0, 500);
context.strokeStyle = "#8FBC8F";
context.stroke();
context.fillStyle = "#8FBC8F";
context.fill();
//Blauer Himmel
context.beginPath();
context.moveTo(0, 0);
context.lineTo(500, 0);
context.lineTo(500, 350);
context.lineTo(0, 350);
context.lineTo(0, 0);
context.strokeStyle = "#6495ED";
context.stroke();
context.fillStyle = "#6495ED";
context.fill();
//Wolken
//linke Wolke
context.beginPath();
context.arc(5, 20, 30, 0, Math.PI * 2);
context.strokeStyle = "white";
context.stroke();
context.fillStyle = "white";
context.fill();
context.beginPath();
context.arc(50, 20, 30, 0, Math.PI * 2);
context.strokeStyle = "white";
context.stroke();
context.fillStyle = "white";
context.fill();
context.beginPath();
context.arc(80, 20, 20, 0, Math.PI * 2);
context.strokeStyle = "white";
context.stroke();
context.fillStyle = "white";
context.fill();
//rechte Wolke
context.beginPath();
context.arc(495, 20, 30, 0, Math.PI * 2);
context.strokeStyle = "white";
context.stroke();
context.fillStyle = "white";
context.fill();
context.beginPath();
context.arc(450, 20, 30, 0, Math.PI * 2);
context.strokeStyle = "white";
context.stroke();
context.fillStyle = "white";
context.fill();
context.beginPath();
context.arc(420, 20, 20, 0, Math.PI * 2);
context.strokeStyle = "white";
context.stroke();
context.fillStyle = "white";
context.fill();
//Haus Rumpf
context.beginPath();
context.fillStyle = "#DEB887";
context.fillRect(250, 250, 150, 150);
//Haus Dach
context.beginPath();
context.moveTo(250, 250);
context.lineTo(400, 250);
context.lineTo(320, 150);
context.lineTo(250, 250);
context.strokeStyle = "gray";
context.stroke();
context.fillStyle = "#DEB887";
context.fill();
//Haus Tür
context.beginPath();
context.moveTo(300, 330);
context.lineTo(350, 330);
context.lineTo(350, 400);
context.lineTo(300, 400);
context.lineTo(300, 330);
context.strokeStyle = "gray";
context.stroke();
//Baumstamm
context.beginPath();
context.moveTo(100, 400);
context.lineTo(140, 400);
context.lineTo(140, 300);
context.lineTo(100, 300);
context.lineTo(100, 400);
context.strokeStyle = "#DEB887";
context.stroke();
context.fillStyle = "#DEB887";
context.fill();
//Baumkrone
context.beginPath();
context.arc(120, 270, 70, 0, Math.PI * 2);
context.strokeStyle = "green";
context.stroke();
context.fillStyle = "green";
context.fill();
//# sourceMappingURL=Aufgabe3a.js.map