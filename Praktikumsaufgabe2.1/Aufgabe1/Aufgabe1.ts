//Aufagbe1 a
function a1(): void {   // zulässige Variabeln (global)
    let a: string = "Alles"; 
    console.log(a);
    funktion1(); 
    console.log("Logo!"); 
}

a1(); //Funktion wird aufgerufen


function funktion1(): void { // zulässige Variabeln (lokal)
    console.log("Klar?");
}

//Ausgabe in der Konsole: Alles Klar? Logo!
// Hier sind alle Variable Namen zulässig, weil der Buchstabe klein geschrieben wurde. Im allg.: Sollen keine Ziffern am Anfang dafür verwendet werden. Auch keine Großbuchstaben am Anfang, allerdings kann man Bspw. schreiben: "beispielTest". Es sollen außerdem Schlüssel Worte vermieden werden. "_" & "$" dürfen verwendet werden 

//c
function b2(): void {
    let b: string = "Alles Gute!";
    console.log(b);
    func2();
    console.log("Alles Logo!");
}

b2();

function func2(): void {
    console.log("Alles Klar?");
}