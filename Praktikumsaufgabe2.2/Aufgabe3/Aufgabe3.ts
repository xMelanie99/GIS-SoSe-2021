let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myFirstCanvas");
let context: CanvasRenderingContext2D = canvas.getContext("2d");

// Selbstversuche
let ctx = canvas.getContext("2d"); //Das Objekt ist ein 2D Objekt
//ctx.fillRect(100, 100, 50, 50); // Position1: x Position2: y Position3: Weite Position4: Höhe


draw();

let test: number = 200;

function draw() {

    window.requestAnimationFrame(draw); //bei jeden Start wird die draw funktion regelmäßig refresht  bzw. bei jedem Frame

    ctx.beginPath(); //neuer Pfad
    ctx.arc(150, 150, 30, 0, Math.PI * 2, false); //arc = Bogen | 1.x 2.y 3.Radius 4.Pattern 5. Für den Kreis, PI = hälfte des Kreises, deswegen *2
    ctx.strokeStyle = "blue"; //roter border
    ctx.stroke(); // damit der Kreis ischtbar wird

    test += 1; // x wird bei jeden durchlauf um 1 größer
}