"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Melmory = void 0;
const Http = require("http"); // * = man importiert alles von http als Http
//import * as Mongo from "mongodb";
/* import { ParsedUrlQuery } from "querystring";
import * as url from "url"; */
var Melmory;
(function (Melmory) {
    var imageUrl = "https://raw.githubusercontent.com/xMelanie99/GIS-SoSe-2021/main/melmory";
    let port = Number(process.env.PORT); // neue Variable vom typ number wird process.env.PORT überwiesen | Port des Serves (Heruko) wird in eine Variable abgespeichert  
    if (!port) // wenn der port nicht gesetzt ist..
        port = 8100; // ..setzt er den port auf 8100
    let server = Http.createServer(); // erstellt neuen Server
    server.addListener("request", handleRequest); // Event Listener für requests wird dem Server hinz.
    server.addListener("listening", handleListen); // Event Listener für listening wird dem Server hinz.
    server.listen(port); // server "hört" auf dem def. port
    console.log(server.address());
    function handleListen() {
        console.log("Listening"); //wird in der Konsole des Serves ausgegeben
    }
    async function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8"); // Metadaten werden gestzt
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Der Zugriff (request) wird auf dem Server erlaubt
        _response.write("/pictures/card_decks/japan/sakura.png"); // Gibt als Antwort die URL des request zurück
        _response.end(); // ende/finish/aus
    }
})(Melmory = exports.Melmory || (exports.Melmory = {}));
//# sourceMappingURL=server.js.map