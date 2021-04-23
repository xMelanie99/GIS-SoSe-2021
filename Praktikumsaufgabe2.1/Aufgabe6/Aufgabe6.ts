//a 
function hash(): void {
let zeile: string = "";
for (let i: number = 0; i < 7; i++) {
    zeile += "#";
    console.log(zeile);
    }
}

hash();

//b
function buzzfizz(): void {
    for (let i: number = 0; i <= 100; i++) {
        if (i % 3 == 0) {
            console.log("Fizz");
        } else if (i % 5 == 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

buzzfizz();

//c 
function buzzfizz2(): void {
    for (let i: number = 1; i <= 100; i++) {
        if (i % 3 == 0 && i % 5 == 0) {
            console.log("FizzBuzz");
        } else if (i % 3 == 0) {
            console.log("Fizz");
        } else if (i % 5 == 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

buzzfizz2();
