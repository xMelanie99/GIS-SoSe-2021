"use strict";
// let trueBody: HTMLBodyElement = <HTMLBodyElement>document.querySelector("body"); // query = sucht das Element mit dem tag in diesem Fall "body"
// trueBody.appendChild(divBeispiel); // macht einen neuen "Ast im Baum"
// divBeispiel.setAttribute("style", "height: 100px; width: 200px; background-color: blue;"); // mit setAttribut wurde dem divBeispiel, Style Werte hinzugefügt
// trueBody.setAttribute("style", "width:500px; height:500px;");
// let widthGlobal: number = trueBody.clientHeight; // client = bestimmt die Fenstergröße der HTML Seite
// let heightGlobal: number = trueBody.clientWidth;
let container = document.querySelector("#container"); // neuen Container für den Inhalt, der angepasst wird
container.setAttribute("style", "width:100%;height:1000px;position:relative;"); // Container wurden Werte zugewiesen (gestylet) | position: Die Elemente innerhalb orientieren sich am Container
function getContainerPoint1() {
    let xGen = Math.random() * container.offsetWidth; // neue Variable wurde zufälliger x-Wert, innerhalb der Weite des Container (offsetWidth), zugewiesen
    let yGen = Math.random() * container.offsetHeight;
    let pointReturn = { x: xGen, y: yGen }; // neue Punkt - Variable mit beiden erstellten Werten
    return pointReturn;
}
function createRect1() {
    let colorSelection = ["#5F9EA0", "#BDB76B", "#00CED1", "#ADD8E6", "#FFA07A", "#008080", "#8FBC8F", "#D2B48C"];
    let divBeispiel = document.createElement("div"); // HTMLDivElement -> hier wird ein html div Element erstellt | creat Elemet: hier wird ein Elemt erstellt | <HTMLDivElement> = typecast in ein div
    let point1 = getContainerPoint1(); //Erzeugt zwei zufällige Punkte, innerhalb des Containers, mit denen das Rechteck erzeugt wird
    let point2 = getContainerPoint1();
    let rect = {
        posX: Math.min(point1.x, point2.x), posY: Math.min(point1.y, point2.y),
        widthInterface: Math.abs(point1.x - point2.x), heightInterface: Math.abs(point1.y - point2.y),
        color: colorSelection[Math.floor(Math.random() * colorSelection.length)]
    }; //1. = sucht den Minimum vom x Werte, 2. = sucht den Minimum vom y Werte, 3. = Differenz von beiden x Werten und Betrag, falls negativ, 4. = Differenz von beiden y Werte und Betrag, falls negativ
    divBeispiel.setAttribute("style", "height:" + rect.heightInterface + "px;width:" + rect.widthInterface + "px;top:" + rect.posY +
        "px;left:" + rect.posX + "px;background-color:" + rect.color + ";display:block; position:absolute;border: 1px solid black;"); // generietes div wird gestylt
    container.appendChild(divBeispiel); //Neuer "Ast im Baum"
}
function reloadPage1() {
    window.location.reload();
}
document.querySelector("#addRect").addEventListener("click", createRect1);
document.querySelector("#clearRect").addEventListener("click", reloadPage1);
//# sourceMappingURL=Aufgaben.js.map