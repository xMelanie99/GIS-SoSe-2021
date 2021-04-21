let x: string = "Hallo";
console.log(x);
funct1(x);
console.log(x);
funct2();
funct3();
console.log(x);

function funct1(y: string): void {
 y = "Bla";
 console.log(y);
}

function funct2(): void {
 let x: string = "Blubb";
 console.log(x);
}

function funct3(): void {
 x = "Test";
}

//a

// Annahme der Ausgabe: Hallo Hallo Blubb Hallo
// Ausgabe: Hallo Bla Hallo Blubb Test

//b

// Lokale Variable vs. Globale Variable: Lokale Variabeln können nur in Klasen, Schleifen, abfragen etc verwendet werden. Globale Variabel können "überall" benutzt werden.
// Übergabeparameter: Sind Zugewiesene Variabeln in einer Klasse: function func1(---> y: string <---): void
// Bei "normalen" Variabeln werden direkt zugwiesen und Funktionen führen die zugewiesenden Werte aus