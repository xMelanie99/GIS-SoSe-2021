//a
function backwards(_ary: number []): number[] {
    let backAry: number[] = [];
    for (let i: number = _ary.length - 1; i >= 0; i--) {
        backAry.push(_ary[i]);
    }
    return backAry;
}
console.log(backwards([1, 3, 5, 7, 9]));


//b
function join(_one: number[], _two: number[]): number[] { 
    let empty: number [] = []; //zwischenspeicher
    for (let i: number = 0; i < _one.length; i++) {
        empty.push(_one[i]);
    }
    for (let i: number = 0; i < _two.length; i++) { //Die Länge des zweites Arrays wird verwendet um diesen dann später an den ersten dranzuhängen //Übergabe eines beliebigen Wertes (erster Array) für den Zwischenspeicher
        empty.push(_two[i]);
    }
    return empty;
}
console.log(join([1 , -2, 3, 788], [22, 33, 415454, 55]));
 

//c
function split(_oneAry: number[], _idx1: number, _idx2: number): number[] {
    let aryEmpty: number [] = [];
    for (let i: number = _idx1; i <= _idx2; i++) { // idx1 starparameter und idx2 endparameter
        aryEmpty.push(_oneAry[i]);
    }    
    return aryEmpty;
}

console.log(split([1, 2, 3, 4, 5, 6, 7, 8], 2, 4));



