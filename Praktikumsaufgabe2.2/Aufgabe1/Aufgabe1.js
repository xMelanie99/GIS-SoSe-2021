"use strict";
//a
function min(..._a) {
    let remain = _a[0];
    for (let i = 0; i < _a.length; i++) {
        if (_a[i] < remain) {
            remain = _a[i];
        }
    }
    return remain;
}
console.log(min(1, 2, 3));
//b 
function isEven(_zahl) {
    if (_zahl == 0) {
        return true;
    }
    else if (_zahl == 1) {
        return false;
    }
    else {
        _zahl -= 2;
        return isEven(_zahl);
    }
}
console.log(isEven(5)); //StackOverflow
let p1 = { name: "Han", kurs: "MIB", matr: 123456 };
let p2 = { name: "Jochem", kurs: "MIB", matr: 789012 };
let p3 = { name: "Gustav", kurs: "LOST", matr: 135790 };
let studis = [p1, p2, p3, { name: "Linda", kurs: "LOST", matr: 246801 }];
console.log(studis[2].name + " " + studis[2].kurs + " " + studis[2].matr);
function showInfo(_a) {
    console.log(_a.name + " " + _a.kurs + " " + _a.matr);
}
showInfo(p2);
for (let i = 0; i < studis.length; i++) {
    showInfo(studis[i]);
}
class Test {
    constructor(_n, _k, _m) {
        this.name = _n;
        this.kurs = _k;
        this.matr = _m;
    }
    showInfo() {
        console.log(this.name, this.kurs, this.matr);
    }
}
let t1 = new Test("Max", "MusterKurs", 198765);
t1.showInfo();
//# sourceMappingURL=Aufgabe1.js.map