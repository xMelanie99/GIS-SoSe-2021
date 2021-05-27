"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http"); // * = man importiert alles von http als Http
var P_3_1Server;
(function (P_3_1Server) {
    console.log("Starting server"); //wird in der Konsole des Serves ausgegeben
    let port = Number(process.env.PORT); // neue Variable vom typ number wird process.env.PORT überwiesen | Port des Serves (Heruko) wird in eine Variable abgespeichert  
    if (!port) // wenn der port nicht gesetzt ist..
        port = 8100; // ..setzt er den port auf 8100
    let server = Http.createServer(); // erstellt neuen Server
    server.addListener("request", handleRequest); // Event Listener für requests wird dem Server hinz.
    server.addListener("listening", handleListen); // Event Listener für listening wird dem Server hinz.
    server.listen(port); // server "hört" auf dem def. port
    function handleListen() {
        console.log("Listening"); //wird in der Konsole des Serves ausgegeben
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!"); //wird wieder in der Konsole des Serves ausgegeben
        console.log(_request.url);
        _response.setHeader("content-type", "text/html; charset=utf-8"); // Metadaten werden gestzt
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Der Zugriff (request) wird auf dem Server erlaubt
        _response.write(_request.url); // Gibt als Antwort die URL des request zurück
        _response.end(); // ende/finish/aus
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=server.js.map