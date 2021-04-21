"use strict";
let x = "Hallo";
console.log(x);
func1(x);
console.log(x);
func2();
func3();
console.log(x);
function func1(y) {
    y = "Bla";
    console.log(y);
}
function func2() {
    let x = "Blubb";
    console.log(x);
}
function func3() {
    x = "Test";
}
//a
// Annahme der Ausgabe: Hallo Hallo Blubb Hallo
// Ausgabe: Hallo Bla Hallo Blubb Test
//b
// Lokale Variable vs. Globale Variable: Lokale Variabeln können nur in Klasen, Schleifen, abfragen etc verwendet werden. Globale Variabel können "überall" benutzt werden.
// Übergabeparameter: Sind Zugewiesene Variabeln in einer Klasse: function func1(---> y: string <---): void
// Bei "normalen" Variabeln werden direkt zugwiesen und Funktionen führen die zugewiesenden Werte aus
//# sourceMappingURL=Aufgabe4.js.map