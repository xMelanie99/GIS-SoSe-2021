"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aufgabe3_4 = void 0;
const Http = require("http");
const url = require("url");
const Mongo = require("mongodb");
var Aufgabe3_4;
(function (Aufgabe3_4) {
    let port = Number(process.env.PORT); // neue Variable vom typ number wird process.env.PORT überwiesen | Port des Serves (Heruko) wird in eine Variable abgespeichert  
    if (!port) // wenn der port nicht gesetzt ist..
        port = 8100; // ..setzt er den port auf 8100
    let databaseUrl = "mongodb+srv://Uwu-Nutzer:UWUPASSWORT1234@gis-ist-geil.uvkck.mongodb.net/Test?retryWrites=true&w=majority"; // Port der Datenbank
    let mongoClient = undefined;
    console.log(mongoClient);
    let server = Http.createServer(); // erstellt neuen Server
    server.addListener("request", handleRequest); // Event Listener für requests wird dem Server hinz.
    server.addListener("listening", handleListen); // Event Listener für listening wird dem Server hinz.
    server.listen(port); // server "hört" auf dem def. port
    function handleListen() {
        console.log("Listening"); //wird in der Konsole des Serves ausgegeben
    }
    async function handleRequest(_request, _response) {
        await conntectToDB(databaseUrl); // wird mit der db von der adresse verbunden
        let students = mongoClient.db("Test").collection("students"); // die collections students wird in eine Variable gespeichert
        let requestUrl = url.parse(_request.url, true); // hier wurde die url von request genommen
        let urlQuery = requestUrl.query; // die query von der db wurde gespeichert
        _response.setHeader("Access-Control-Allow-Origin", "*"); // Header --> muss immer gesetzt werden (* = alles, Access-Control-Allow-Origin: es werden von überall Anfragen erlaubt)
        _response.setHeader("content-type", "application/json; charset=utf-8"); // Header --> muss immer gesetzt werden, application/json; JSON Format
        switch (requestUrl.pathname) { // wird nach dem pathname abgefragt --> ist in requestUrl gespeichert
            case "/insert": //geht in die DB 
                console.log(urlQuery);
                let student = { name: urlQuery["name"].toString(), firstname: urlQuery["firstname"].toString(), matrikelnummer: Number(urlQuery["matrikelnummer"].toString()) }; // asso Array um die Date zu finden und in eine neue Var eingefügt
                students.insertOne(student); // Ein Student wird hinz. 
                break;
            case "/get": //holt die Daten von der DB
                let cursor = students.find(); // der Cursor greif auf alle gespeicherten Studenten zu
                let studentsData = await cursor.toArray(); // cursor.toArray() --> konvertiert den Cursor zu einem Array
                _response.write(JSON.stringify(studentsData)); // der sting stundetsData wird in die response geschrieben
                break;
        }
        _response.end(); // beendet 
    }
    async function conntectToDB(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true }; // eisntellungen für die Verbindung der Datenbank
        mongoClient = new Mongo.MongoClient(_url, options); // mit dem Mongo Cliet wird auf die DB zugegriffen
        await mongoClient.connect(); // verbidnet den Mongo Client mit der Datenbank
    }
})(Aufgabe3_4 = exports.Aufgabe3_4 || (exports.Aufgabe3_4 = {})); // Zusammen mit Han Nguyen gearbeitet
//# sourceMappingURL=server.js.map