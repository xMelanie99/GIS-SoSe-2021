//a
function min(..._a: number []): number { //Rest Parameter (...output) alle Variabeln werden in ein Array gespeichert
    let remain: number = _a[0];
    for (let i: number = 0; i < _a.length; i++) {
        if (_a[i] < remain) {
            remain = _a[i];
        }
    }
    return remain;
}
console.log(min(1, 2, 3));

//b 
function isEven(_zahl: number): boolean {
    if (_zahl == 0) {
        return true;
    } else if (_zahl == 1) {
        return false;
    } else {
        _zahl -= 2;
        return isEven(_zahl);
    }
}
console.log(isEven(5)); //StackOverflow

//c
interface Studi {
    name: string;
    kurs: string;
    matr: number;
}

let p1: Studi = { name: "Han", kurs: "MIB", matr: 123456 };
let p2: Studi = { name: "Jochem", kurs: "MIB", matr: 789012 };
let p3: Studi = { name: "Gustav", kurs: "LOST", matr: 135790 };

let studis: Studi[] = [p1, p2, p3, { name: "Linda", kurs: "LOST", matr: 246801 }];
console.log(studis[2].name + " " + studis[2].kurs + " " + studis[2].matr);

function showInfo(_a: Studi): void {
    console.log(_a.name + " " + _a.kurs + " " + _a.matr);
}
showInfo(p2);

for (let i: number = 0; i < studis.length; i++) {
    showInfo(studis[i]);
}

class Test {
    private name: string;
    private kurs: string;
    private matr: number;
    constructor(_n: string, _k: string, _m: number) {
        this.name = _n;
        this.kurs = _k;
        this.matr = _m;
    }
    showInfo(): void {
        console.log(this.name, this.kurs, this.matr);
    }
}

let t1: Test = new Test("Max", "MusterKurs", 198765);
t1.showInfo();
