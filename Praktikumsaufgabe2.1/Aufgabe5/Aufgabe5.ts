//a

let a: number = 4;
let b: number = 5;

function multiply(a: number, b: number): number {
    let result: number = a * b;
    console.log(result);
    return result;
    
  }

multiply(a , b);

//b
let smaller: number = -1;
let bigger: number = -12;

function max(smaller: number, bigger: number): number {
    if (smaller < bigger) {
        console.log(bigger);
        return bigger;
    } else {
        console.log(smaller);
        return smaller;
    }
}

max(smaller, bigger);

//C

function counter(): number {
    let k: number = 1;
    let i: number = 0;
    while (k <= 100) {
        i += k;
        k++;
    }
    return i;
}
console.log(counter());

//d

for (let i: number = 0; i < 10; i++) {
    console.log(Math.floor(Math.random() * 100)); //Math.floor für ganzzahlige Zahlen
}

//e

function factorial(_n: number): number {
    let x: number = 1;
    for (let i: number = 2; i <= _n; i++) {
        x *= i;
        
    } 
    return x;
}
console.log(factorial(4));

//f 

function leapyears(): void {
    for (let i: number = 1900; i <= 2021; i++) {
        if ((i % 4 == 0 && i % 100 != 0) || (i % 400 == 0)) { // % --> Wenn i durch 4 teilbar ist
            console.log(i);
        }
    }
}

leapyears();