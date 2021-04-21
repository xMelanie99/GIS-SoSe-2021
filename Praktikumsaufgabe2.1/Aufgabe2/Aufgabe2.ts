function c2(): void {
    let i: number = 9;

    do {
        console.log(i); // deklarierte i Zahl (9) wird aufgerufen
        i = i - 1; // aktueller i Wert wird um -1 subtrahiert
    } while ( i > 0); // wird solange angewendet bis i > 0, wenn dies eintritt stoppt das Programm
}

c2(); // Funktion wird aufgerufen

// Ausgabe: 9 8 7 6 5 4 3 2 1  