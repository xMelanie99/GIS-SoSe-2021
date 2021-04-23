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
