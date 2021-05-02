//a
let backAry: number[] = [14, 2, 7, 34, 8, -5];
function backwards(): void {
    backAry.reverse();
}
console.log(backAry.reverse());

//b
let aryOne: number [] = [1, 2, 3];
let aryTwo: number [] = [4, 5, 6];
aryOne = join(aryOne, aryTwo);
function join(_one: number[], _two: number[]): number[] { 
    for (let i: number = 0; i < 1; i++) { // mit i < 1 wird der array nur einmal dran gehangen
        aryOne.push(4, 5, 6); //2. Array wird hinten dran gesetzt
    }
    return aryOne;
}
console.log(aryOne);

//c
let arybreak: number [] = [9, 8, 7, 6, 5, 4, 3, 2, 1];
function split(_pos1: number[], _pos2: number[]): void {
    for (let i: number = 0; i < arybreak.length; i++) {
    }
}
console.log(arybreak.slice(1, 3));
