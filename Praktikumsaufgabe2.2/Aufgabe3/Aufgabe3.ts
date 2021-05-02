let canv: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("Canvas");
let cont: CanvasRenderingContext2D = canv.getContext("2d");

//b,c,d und e

interface Rechteck {
    width: number;
    height: number;
    posX: number;
    posY: number;
    color: string;
   
}
function creatRect(): Rechteck {
    let colorOpt: string [] = ["#F0F8FF", "#6495ED", "#F08080", "#E0FFFF", "#FFB6C1", "#9370DB", "#FFE4E1", "#98FB98"];
    let rect1: Rechteck = { posX: Math.random() * 1 / 4 * window.innerHeight, posY: Math.random() * 1 / 4 * window.innerHeight, width: Math.random() * 1 / 4 * window.innerWidth, height: Math.random() * 1 / 4 * window.innerHeight, color: colorOpt[Math.floor(Math.random() * colorOpt.length)]}; // zufällige Platzierungen und die Rechtecke werden innerhalb der angegeben Breite sowie Höhe festgelegt
    return rect1;
}

function drawRect(_rect: Rechteck): void {
    cont.beginPath();
    cont.rect(_rect.posX, _rect.posY, _rect.width, _rect.height);
    cont.closePath();
    cont.stroke();
    cont.fillStyle = _rect.color;
    cont.fill();
}
let aryRect: Rechteck [] = [];
for (let i: number = 0; i < 5; i++) {
    aryRect.push(creatRect());
}
for (let j: number = 0; j < aryRect.length; j++) {
    drawRect(aryRect[j]);
}
drawRect(creatRect());