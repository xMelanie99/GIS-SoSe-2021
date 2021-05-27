import * as Http from "http"; // * = man importiert alles von http als Http
export namespace P_3_1Server { // export des namespace
    console.log("Starting server"); //wird in der Konsole des Serves ausgegeben
    let port: number = Number(process.env.PORT); // neue Variable vom typ number wird process.env.PORT überwiesen | Port des Serves (Heruko) wird in eine Variable abgespeichert  
    if (!port) // wenn der port nicht gesetzt ist..
        port = 8100; // ..setzt er den port auf 8100
    let server: Http.Server = Http.createServer(); // erstellt neuen Server
    server.addListener("request", handleRequest); // Event Listener für requests wird dem Server hinz.
    server.addListener("listening", handleListen); // Event Listener für listening wird dem Server hinz.
    server.listen(port); // server "hört" auf dem def. port

    function handleListen(): void {
        console.log("Listening"); //wird in der Konsole des Serves ausgegeben
    }

    function handleRequest(_request: Http.IncomingMessage, _response:
        Http.ServerResponse): void {
        console.log("I hear voices!"); //wird wieder in der Konsole des Serves ausgegeben
        console.log(_request.url);
        _response.setHeader("content-type", "text/html; charset=utf-8"); // Metadaten werden gestzt
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Der Zugriff (request) wird auf dem Server erlaubt
        _response.write(_request.url); // Gibt als Antwort die URL des request zurück
        _response.end(); // ende/finish/aus
    }
}
