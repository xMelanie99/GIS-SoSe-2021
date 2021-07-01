"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Melmory = void 0;
const Http = require("http"); // * = man importiert alles von http als Http
/* import { ParsedUrlQuery } from "querystring";
import * as url from "url"; */
var Melmory;
(function (Melmory) {
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
        _response.end(); // beendet 
    }
})(Melmory = exports.Melmory || (exports.Melmory = {}));
//# sourceMappingURL=server.js.map