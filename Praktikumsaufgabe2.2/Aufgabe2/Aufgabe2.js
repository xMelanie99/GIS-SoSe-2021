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
function join(_one, _two) {
    let empty = []; //zwischenspeicher
    for (let i = 0; i < _two.length; i++) { //Die Länge des zweites Arrays wird verwendet um diesen dann später an den ersten dranzuhängen
        empty = _one; //Übergabe eines beliebigen Wertes (erster Array) für den Zwischenspeicher
        empty.push(_two[i]); //Zweites Array wird hinter den ersten Array hinz.
    }
    return empty;
}
console.log(join([1, -2, 3, 788], [22, 33, 415454, 55]));
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