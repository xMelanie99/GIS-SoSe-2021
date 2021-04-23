"use strict";
//a
let a = 4;
let b = 5;
function multiply(a, b) {
    let result = a * b;
    console.log(result);
    return result;
}
multiply(a, b);
//b
let smaller = -1;
let bigger = -12;
function max(smaller, bigger) {
    if (smaller < bigger) {
        console.log(bigger);
        return bigger;
    }
    else {
        console.log(smaller);
        return smaller;
    }
}
max(smaller, bigger);
//C
function counter() {
    let k = 1;
    let i = 0;
    while (k <= 100) {
        i += k;
        k++;
    }
    return i;
}
console.log(counter());
//d
for (let i = 0; i < 10; i++) {
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