"use strict";
//a 
function hash() {
    let zeile = "";
    for (let i = 0; i < 7; i++) {
        zeile += "#"; // leerem String wird ein has hinzugefügt
        console.log(zeile);
    }
}
hash();
//b
function buzzfizz() {
    for (let i = 0; i <= 100; i++) {
        if (i % 3 == 0) { // bei durch 3 teilbaren zahlen
            console.log("Fizz");
        }
        else if (i % 5 == 0) { // bei durch 5 teilbaren zahlen
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
            console.log("FizzBuzz"); // bei durch 3 und 5 teilbaren zahlen
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
//d
console.log(chessboard());
function chessboard() {
    let hashpattern = "";
    for (let zeile = 0; zeile < 8; zeile++) {
        for (let spalte = 0; spalte < 8; spalte++) {
            if (zeile % 2 == 0) { // gerade
                if (spalte % 2 == 0) { // gerade und ungerade mit Zeichen
                    hashpattern += " ";
                    continue;
                }
                hashpattern += "#";
                continue;
            }
            else if (zeile % 2 == 1) { //ungerade
                if (spalte % 2 == 1) { // gerade und ungerade mit Zeichen
                    hashpattern += " ";
                    continue;
                }
                hashpattern += "#";
                continue;
            }
        }
        hashpattern += "\n";
    }
    return hashpattern;
}
chessboard();
//e
console.log(chessboard2(4, 6));
function chessboard2(height, width) {
    let hashpattern = "";
    for (let zeile = 0; zeile < width; zeile++) {
        for (let spalte = 0; spalte < height; spalte++) {
            if (zeile % 2 == 0) { // gerade
                if (spalte % 2 == 0) { // gerade und ungerade mit Zeichen
                    hashpattern += " ";
                    continue;
                }
                hashpattern += "#";
                continue;
            }
            else if (zeile % 2 == 1) { //ungerade
                if (spalte % 2 == 1) { // gerade und ungerade mit Zeichen
                    hashpattern += " ";
                    continue;
                }
                hashpattern += "#";
                continue;
            }
        }
        hashpattern += "\n";
    }
    return hashpattern;
}
//# sourceMappingURL=Aufgabe6.js.map