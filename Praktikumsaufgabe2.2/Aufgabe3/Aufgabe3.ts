let canv: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("Canvas");
let cont: CanvasRenderingContext2D = canv.getContext("2d"); 

//b

for (let i: number = 0; i < 50; i++) {
    let xpos: number = Math.random() * window.innerWidth; // x und y Werte die zufällig platziert werden | width und height = zufällger Platz von 0 bis zur ganzen Breite/ Höhe 
    let ypos: number = Math.random() * window.innerHeight; 
    cont.beginPath();
    cont.rect(xpos, ypos, 30, 30);
    cont.strokeStyle = "gray";
    cont.stroke();
}