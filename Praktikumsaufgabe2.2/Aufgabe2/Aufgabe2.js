"use strict";
//a
function backwards(_ary) {
    let backAry = [];
    for (let i = _ary.length - 1; i >= 0; i--) {
        backAry.push(_ary[i]);
    }
    return backAry;
}
console.log(backwards([1, 3, 5, 7, 9]));
//b
let aryOne = [1, 2, 3];
let aryTwo = [4, 5, 6];
aryOne = join(aryOne, aryTwo);
function join(_one, _two) {
    for (let i = 0; i < 1; i++) { // mit i < 1 wird der array nur einmal dran gehangen
        aryOne.push(4, 5, 6); //2. Array wird hinten dran gesetzt
    }
    return aryOne;
}
console.log(aryOne);
//c
function split(_oneAry, _idx1, _idx2) {
    let aryEmpty = [];
    for (let i = _idx1; i <= _idx2; i++) { // idx1 starparameter und idx2 endparameter
        aryEmpty.push(_oneAry[i]);
    }
    return aryEmpty;
}
console.log(split([1, 2, 3, 4, 5, 6, 7, 8], 2, 4));
//# sourceMappingURL=Aufgabe2.js.map