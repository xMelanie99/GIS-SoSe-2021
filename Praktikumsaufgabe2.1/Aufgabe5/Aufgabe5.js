"use strict";
//a
let a = 4;
let b = 5;
function multiply(a, b) {
    let result = a * b; // Ergnis ist a und b multipliziert
    console.log(result); //Ausgabe des Ergebnis
    return result;
}
multiply(a, b);
//b
let smaller = -1;
let bigger = -12;
function max(smaller, bigger) {
    if (smaller < bigger) { // wenn die zahl kleiner ist soll die größere Zahl ausgegeben werden
        console.log(bigger);
        return bigger;
    }
    else { // wenn die zahl größer ist wird diese ausgegeben
        console.log(smaller);
        return smaller;
    }
}
max(smaller, bigger);
//C
function counter() {
    let k = 1; // Zahlen ab 1
    let i = 0;
    while (k <= 100) {
        i += k; // addierung aller Zahlen
        k++; // addiert auf
    }
    return i;
}
console.log(counter());
//d
for (let i = 0; i < 10; i++) { // i < 10 = 10 random zahlen
    console.log(Math.floor(Math.random() * 100)); //Math.floor für ganzzahlige Zahlen
}
//e
function factorial(_n) {
    let x = 1;
    for (let i = 2; i <= _n; i++) {
        x *= i;
    }
    return x;
}
console.log(factorial(4));
//f 
function leapyears() {
    for (let i = 1900; i <= 2021; i++) {
        if ((i % 4 == 0 && i % 100 != 0) || (i % 400 == 0)) { // % --> Wenn i durch 4 teilbar ist
            console.log(i);
        }
    }
}
leapyears();
//# sourceMappingURL=Aufgabe5.js.map