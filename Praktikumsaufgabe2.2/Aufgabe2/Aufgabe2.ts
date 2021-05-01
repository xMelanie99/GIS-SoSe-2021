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
function join(eins: number[], zwei: number[]): number[] {
    for (let i: number; i < eins.length ; i++) {
        // push function für Werte
        i = aryOne.push();
    }
    return aryOne;
}
console.log(aryOne);

join();