import * as Http from "http"; // * = man importiert alles von http als Http
//import * as Mongo from "mongodb";
/* import { ParsedUrlQuery } from "querystring";
import * as url from "url"; */

export namespace Melmory {


    var imageUrl: string = "https://raw.githubusercontent.com/xMelanie99/GIS-SoSe-2021/main/melmory";


    let port: number = Number(process.env.PORT); // neue Variable vom typ number wird process.env.PORT überwiesen | Port des Serves (Heruko) wird in eine Variable abgespeichert  
    if (!port) // wenn der port nicht gesetzt ist..
        port = 8100; // ..setzt er den port auf 8100

    let server: Http.Server = Http.createServer(); // erstellt neuen Server
    server.addListener("request", handleRequest); // Event Listener für requests wird dem Server hinz.
    server.addListener("listening", handleListen); // Event Listener für listening wird dem Server hinz.
    server.listen(port); // server "hört" auf dem def. port

    console.log(server.address());

    function handleListen(): void {
        console.log("Listening"); //wird in der Konsole des Serves ausgegeben
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> { // wird immer gesetzt 
        _response.setHeader("content-type", "text/html; charset=utf-8"); // Metadaten werden gestzt
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Der Zugriff (request) wird auf dem Server erlaubt
        _response.write("/pictures/card_decks/japan/sakura.png"); // Gibt als Antwort die URL des request zurück
        _response.end(); // ende/finish/aus
    }




}