"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Melmory = void 0;
// -- 1. * = man importiert alles von http als Http
const Http = require("http");
const Mongo = require("mongodb");
const url = require("url");
var Melmory;
(function (Melmory) {
    //-- neue Variable vom typ number wird process.env.PORT überwiesen || Port des Serves (Heruko) wird in eine Variable abgespeichert  
    let port = Number(process.env.PORT);
    // wenn der port nicht gesetzt ist..
    if (!port)
        // ..setzt er den port auf 8100 
        port = 8100;
    // -- erstellt neuen Server
    let server = Http.createServer();
    // Event Listener für requests wird dem Server hinzugefügt || wenn der Client eine Anfrage an den Server macht, wird die handleRequest Methode aufgerufen
    server.addListener("request", handleRequest);
    // -- Event Listener für listening wird dem Server hinzu
    server.addListener("listening", handleListen);
    server.listen(port); // server "hört" auf dem def. port
    // Port der Datenbank || Adresse für MongoDB für die melmory Datenbank
    let databaseUrl = "mongodb+srv://noob1234:43_21_boon_@gis-ist-geil.uvkck.mongodb.net/Melmory?retryWrites=true&w=majority";
    // -- wie funktioniert die? Mongo.MongoClient = ist eine importierte Klasse || wird benötigt um die Abfragen zu machen (bspw. um Datensatz hinzufügen/löschen)
    let mongoClient = undefined;
    // -- 1. wird einmal ausgeführt, sobald der Server gestartet wird || console.log = damit man sieht das der Server läuft
    function handleListen() {
        console.log("Listening");
    }
    // 2. Wenn der Client etwas anfragt (_request), dann gibt der Server den Client eine Antwort (_response)
    async function handleRequest(_request, _response) {
        // Metadaten werden gesetzt 
        _response.setHeader("content-type", "text/html; charset=utf-8");
        // -- Der Zugriff (request) wird auf dem Server erlaubt
        _response.setHeader("Access-Control-Allow-Origin", "*");
        // -- hier wurde die url von request genommen || geparste url = alles ist vorhanden: http + hostname + port + path component + query string
        let requestUrl = url.parse(_request.url, true);
        // der query Teil von der url wurde in urlQuery gespeichert
        let urlQuery = requestUrl.query;
        // switch / case = ähnlich wie if Abfrage = switch: hier wird immer eine Variable angegeben 
        switch (requestUrl.pathname) {
            // case: prüft ob der angegebene Wert der mit der switch Variable übereinstimmt || wird geprüft ob die Bedingung tatsächlich, wie angegeben, erfüllt ist
            case "/get-all-card-urls":
                // falls das der Fall ist, wird der code im case ausgeführt || es werden alle Karten aus der MongoDB (Karten urls) an den Client geschickt
                await sendClientAllCardURLs(_response);
                // wird immer gesetzt und switch/case hört nach diesem case mit break auf bzw. prüft die nächsten nicht weiter 
                break;
            case "/admin-delete-card":
                // value (url der Karte) des keys (cardUrl) soll aus MongoDB gelöscht werden 
                await deleteCard(urlQuery["cardUrl"].toString());
                break;
            case "/admin-add-card":
                // value (url der Karte) des keys (cardUrl) soll der MongoDB hinzugefügt werden
                await addCard(urlQuery["cardUrl"].toString());
                break;
            case "/get-all-scores":
                // fragt bei MongoDB alle Daten, aus der Scores Collections, ab und schick diese dann als JSON an den Client
                await sendClientAllScores(_response);
                break;
            case "/add-new-score":
                // values von den keys werden in die Variablen gespeichert
                let username = urlQuery["username"].toString();
                let timeMillis = Number(urlQuery["time_millis"].toString());
                // fügt username sowie die Zeit in Millisek. der Scores Collection in MongoDB hinzu
                await addNewScore(username, timeMillis);
                break;
        }
        // -- ende der _response
        _response.end();
    }
    // 3. fragt bei MongoDB alle Daten, aus der Scores Collections, ab und schick diese dann als JSON an den Client
    async function sendClientAllCardURLs(_response) {
        console.log("Sending client all card urls from mongodb...");
        // Verbindet sich mit der MongoDB (Melmory Datenbank)
        await connectToDB(databaseUrl);
        // MongoDB (Melmory) wird aufgerufen und die Collection (card_urls) wird in eine variable gespeichert
        let cardUrlsCollection = mongoClient.db("Melmory").collection("card_urls");
        // die Einträge in der Collection (card_url) werden in einem CardData Array gespeichert || find() = ruft alles ab
        let cardData = await cardUrlsCollection.find().toArray();
        // JSON.stringify macht aus cardData einen JSON string || warum? damit der Client aus dem JSON string wieder ein CardData Array machen kann
        _response.write(JSON.stringify(cardData));
    }
    // value (url der Karte) des keys (cardUrl) soll der MongoDB hinzugefügt werden || der Wert vom Parameter (_cardUrl) wird später beschrieben || sobald die Funktion aufgerufen wird, hat _cardUrl einen Wert, der ihm gegeben wird
    async function deleteCard(_cardUrl) {
        // Damit man sieht was der Server macht
        console.log("Deleting card with url " + _cardUrl);
        // Verbindet sich mit der MongoDB (Melmory Datenbank)
        await connectToDB(databaseUrl);
        // MongoDB (Melmory) wird aufgerufen und die Collection (card_urls) wird in eine variable gespeichert
        let cardUrlsCollection = mongoClient.db("Melmory").collection("card_urls");
        // deleteOne = nur eine Karte wird gelöscht || ausgewählte Karte (url) wird gelöscht 
        cardUrlsCollection.deleteOne({ cardsUrl: _cardUrl });
    }
    // value (url der Karte) des keys (cardUrl) soll der MongoDB hinzugefügt werden
    async function addCard(_cardUrl) {
        console.log("Adding card with url " + _cardUrl);
        // Verbindet sich mit der MongoDB (Melmory Datenbank)
        await connectToDB(databaseUrl);
        // MongoDB (Melmory) wird aufgerufen und die Collection (card_urls) wird in eine variable gespeichert
        let cardUrlsCollection = mongoClient.db("Melmory").collection("card_urls");
        // aus der ausgewählten url wird ein CardData gemacht, damit man das cardData in die Collection hinzufügen kann
        let cardData = { cardsUrl: _cardUrl };
        // fügt ein Eintrag in der Collection (card_urls) hinzu
        cardUrlsCollection.insertOne(cardData);
    }
    // fragt bei MongoDB alle Daten, aus der Scores Collections, ab und schick diese dann als JSON an den Client 
    async function sendClientAllScores(_response) {
        console.log("Sending client all scores from mongodb...");
        // Verbindet sich mit der MongoDB (Melmory Datenbank)
        await connectToDB(databaseUrl);
        // MongoDB (Melmory) wird aufgerufen und die Collection (Scores) wird in eine variable gespeichert
        let scoresCollection = mongoClient.db("Melmory").collection("Scores");
        // die Einträge in der Collection (Scores) werden in einem ScoreData Array gespeichert || find() = ruft alles ab
        let scoreData = await scoresCollection.find().toArray();
        // JSON.stringify macht aus scoreData einen JSON string || warum? damit der Client aus dem JSON string wieder ein ScoreData Array machen kann
        _response.write(JSON.stringify(scoreData));
    }
    // fügt username sowie die Zeit in Millisek. der Scores Collection in MongoDB hinzu
    async function addNewScore(_name, _timeMillis) {
        console.log("Adding new score to mongodb...");
        // Verbindet sich mit der MongoDB (Melmory Datenbank)
        await connectToDB(databaseUrl);
        // MongoDB (Melmory) wird aufgerufen und die Collection (Scores) wird in eine variable gespeichert
        let scoresCollection = mongoClient.db("Melmory").collection("Scores");
        // siehe 78, 79 und 82 || beide Werte (username & timeMillis) werden in ein ScoreData gemacht, damit man das scoreData in die Collection hinzufügen kann
        let scoreData = { username: _name, time_millis: _timeMillis };
        // ein Eintrag wird der Collection (Scores) hinzugefügt
        scoresCollection.insertOne(scoreData);
    }
    // dazu da sich mit der MongoDB zu verbinden 
    async function connectToDB(_url) {
        // -- eisntellungen für die Verbindung der Datenbank
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        // -- mit dem Mongo Cliet wird auf die DB zugegriffen
        mongoClient = new Mongo.MongoClient(_url, options);
        //--  verbidnet den Mongo Client mit der Datenbank
        await mongoClient.connect();
    }
})(Melmory = exports.Melmory || (exports.Melmory = {}));
//# sourceMappingURL=server.js.map