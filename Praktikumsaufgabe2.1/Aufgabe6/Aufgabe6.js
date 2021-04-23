"use strict";
//a 
function hash() {
    let zeile = "";
    for (let i = 0; i < 7; i++) {
        zeile += "#";
        console.log(zeile);
    }
}
hash();
//b
function buzzfizz() {
    for (let i = 0; i <= 100; i++) {
        if (i % 3 == 0) {
            console.log("Fizz");
        }
        else if (i % 5 == 0) {
            console.log("Buzz");
        }
        else {
            console.log(i);
        }
    }
}
buzzfizz();
//c 
function buzzfizz2() {
    for (let i = 1; i <= 100; i++) {
        if (i % 3 == 0 && i % 5 == 0) {
            console.log("FizzBuzz");
        }
        else if (i % 3 == 0) {
            console.log("Fizz");
        }
        else if (i % 5 == 0) {
            console.log("Buzz");
        }
        else {
            console.log(i);
        }
    }
}
buzzfizz2();
//# sourceMappingURL=Aufgabe6.js.map