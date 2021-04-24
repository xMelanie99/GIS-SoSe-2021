//a 
function hash(): void {
let zeile: string = "";
for (let i: number = 0; i < 7; i++) {
    zeile += "#"; // leerem String wird ein has hinzugefügt
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

//d
console.log(chessboard());

function chessboard(): string {
    let hashpattern: string = "";

    for (let zeile: number = 0; zeile < 8; zeile++) {
        for (let spalte: number = 0; spalte < 8; spalte++) {
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

chessboard ();

//e
console.log(chessboard2(4, 6));

function chessboard2(height: number, width: number): string {
    let hashpattern: string = "";
    for (let zeile: number = 0; zeile < width; zeile++) {
        for (let spalte: number = 0; spalte < height; spalte++) {
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
