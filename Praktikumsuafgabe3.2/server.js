"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_2Server = void 0;
const Http = require("http"); // * = man importiert alles von http als Http
const url = require("url");
var P_3_2Server;
(function (P_3_2Server) {
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
        let parseUrl = url.parse(_request.url, true);
        let storage = parseUrl.query; // asso array 
        console.log("I hear voices!"); //wird wieder in der Konsole des Serves ausgegeben
        // console.log(_request.url);
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Der Zugriff (request) wird auf dem Server erlaubt
        if (parseUrl.pathname == "/html") {
            _response.setHeader("content-type", "text/html; charset=utf-8"); // Metadaten werden gestzt
            let htmlString = "";
            for (let key in storage) { // for in schleife --> Daten aus Liste
                htmlString += "<p>" + key + " : " + storage[key] + "</p>";
            }
            _response.write(htmlString);
        }
        else if (parseUrl.pathname == "/json") {
            _response.setHeader("content-type", "application/json; charset=utf-8");
            let storageString = JSON.stringify(storage);
            _response.write(storageString);
        }
        _response.end(); // ende/finish/aus
    }
})(P_3_2Server = exports.P_3_2Server || (exports.P_3_2Server = {}));
//_response.setHeader("content-type", "application/json; charset=utf-8");
//# sourceMappingURL=server.js.map