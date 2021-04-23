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
    while (k < 100) {
        i += k;
        k++;
    }
    return i;
}
console.log(counter);
/*let y: number = 1;

function counter(y: number): void {

    while (y < 100 && y > 100) {
        y *= y++;
    }
    console.log(y);
}

counter(y);*/
//d
/*for (let i: number = 0; i <= 100; i++) {
    console.log(Math.random()*10);
}*/
//# sourceMappingURL=Aufgabe5.js.map