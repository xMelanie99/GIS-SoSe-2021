// -- 1. * = man importiert alles von http als Http
import * as Http from "http";
import * as Mongo from "mongodb";
import * as url from "url";
import { ParsedUrlQuery } from "querystring";

export namespace Melmory {
    // Die erhalten Daten von MongoDB werden in dieses (Array) Interfaceobjekt gespeichert und als JSON an den Client gesendet 
    interface CardData {
        cardsUrl: string;
    }

    
    interface ScoreData {
        username: string;
        time_millis: number;
    }

    //-- neue Variable vom typ number wird process.env.PORT überwiesen || Port des Serves (Heruko) wird in eine Variable abgespeichert  
    let port: number = Number(process.env.PORT);
    // wenn der port nicht gesetzt ist..
    if (!port)
        // ..setzt er den port auf 8100 
        port = 8100;

    // -- erstellt neuen Server
    let server: Http.Server = Http.createServer();
    // Event Listener für requests wird dem Server hinzugefügt || wenn der Client eine Anfrage an den Server macht, wird die handleRequest Methode aufgerufen
    server.addListener("request", handleRequest);
    // -- Event Listener für listening wird dem Server hinzu
    server.addListener("listening", handleListen);
    server.listen(port); // server "hört" auf dem def. port

    // Port der Datenbank || Adresse für MongoDB für die melmory Datenbank
    let databaseUrl: string = "mongodb+srv://noob1234:43_21_boon_@gis-ist-geil.uvkck.mongodb.net/Melmory?retryWrites=true&w=majority";
    // -- 
    let mongoClient: Mongo.MongoClient = undefined;

    // -- wird einmal ausgeführt, sobald der Server gestartet wird || console.log = damit man sieht das der Server läuft
    function handleListen(): void {
        console.log("Listening");
    }

    // Wenn der Client etwas anfragt (_request), dann gibt der Server den Client eine Antwort (_response)
    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> { // wird immer gesetzt
        // Metadaten werden gesetzt 
        _response.setHeader("content-type", "text/html; charset=utf-8");
        // -- Der Zugriff (request) wird auf dem Server erlaubt
        _response.setHeader("Access-Control-Allow-Origin", "*");

        // -- hier wurde die url von request genommen 
        let requestUrl: url.UrlWithParsedQuery = url.parse(_request.url, true);
        // der query Teil von der url wurde in urlQuery gespeichert
        let urlQuery: ParsedUrlQuery = requestUrl.query;

        // switch / case = ähnlich wie if Abfrage = switch: hier wird immer eine Variable angegeben 
        switch (requestUrl.pathname) {
            // case: prüft ob der angegebene Wert der mit der switch Variable übereinstimmt || wird geprüft ob die Bedingung tatsächlich, wie angegeben, erfüllt ist
            case "/get-all-card-urls":
                // es werden alle Karten aus der MongoDB (Karten urls) an den Client geschickt
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
                let username: string = urlQuery["username"].toString();
                let timeMillis: number = Number(urlQuery["time_millis"].toString());

                // fügt username sowie die Zeit in Millisek. der Scores Collection in MongoDB hinzu
                await addNewScore(username, timeMillis);
                break;
        }
        // -- ende der _response
        _response.end();
    }

    // fragt bei MongoDB alle Daten, aus der Scores Collections, ab und schick diese dann als JSON an den Client
    async function sendClientAllCardURLs(_response: Http.ServerResponse): Promise<void> {
        console.log("Sending client all card urls from mongodb...");
        // Verbindet sich mit der MongoDB (Melmory Datenbank)
        await connectToDB(databaseUrl);

        // MongoDB (Melmory) wird aufgerufen und die Collection (card_urls) wird in eine variable gespeichert
        let cardUrlsCollection: Mongo.Collection = mongoClient.db("Melmory").collection("card_urls");
        // die Einträge in der Collection (card_url) werden in einem CardData Array gespeichert
        let cardData: CardData[] = await cardUrlsCollection.find().toArray();

        // JSON.stringify macht aus cardData einen JSON string
        _response.write(JSON.stringify(cardData));
    }

    // value (url der Karte) des keys (cardUrl) soll der MongoDB hinzugefügt werden || der Wert vom Parameter (_cardUrl) wird später beschrieben || sobald die Funktion aufgerufen wird, hat _cardUrl einen Wert, der ihm gegeben wird
    async function deleteCard(_cardUrl: string): Promise<void> {
        // Damit man sieht was der Server macht
        console.log("Deleting card with url " + _cardUrl);
        // Verbindet sich mit der MongoDB (Melmory Datenbank)
        await connectToDB(databaseUrl);

        // MongoDB (Melmory) wird aufgerufen und die Collection (card_urls) wird in eine variable gespeichert
        let cardUrlsCollection: Mongo.Collection = mongoClient.db("Melmory").collection("card_urls");

        // deleteOne = nur eine Karte wird gelöscht || ausgewählte Karte (url) wird gelöscht 
        cardUrlsCollection.deleteOne({ cardsUrl: _cardUrl });
    }

    // value (url der Karte) des keys (cardUrl) soll der MongoDB hinzugefügt werden
    async function addCard(_cardUrl: string): Promise<void> {
        console.log("Adding card with url " + _cardUrl);
        // Verbindet sich mit der MongoDB (Melmory Datenbank)
        await connectToDB(databaseUrl);

        // MongoDB (Melmory) wird aufgerufen und die Collection (card_urls) wird in eine variable gespeichert
        let cardUrlsCollection: Mongo.Collection = mongoClient.db("Melmory").collection("card_urls");
        // aus der ausgewählten url wird ein CardData gemacht, damit man das cardData in die Collection hinzufügen kann
        let cardData: CardData = { cardsUrl: _cardUrl };

        // fügt ein Eintrag in der Collection (card_urls) hinzu
        cardUrlsCollection.insertOne(cardData);
    }

    // fragt bei MongoDB alle Daten, aus der Scores Collections, ab und schick diese dann als JSON an den Client 
    async function sendClientAllScores(_response: Http.ServerResponse): Promise<void> {
        console.log("Sending client all scores from mongodb...");
        // Verbindet sich mit der MongoDB (Melmory Datenbank)
        await connectToDB(databaseUrl);

        // MongoDB (Melmory) wird aufgerufen und die Collection (Scores) wird in eine variable gespeichert
        let scoresCollection: Mongo.Collection = mongoClient.db("Melmory").collection("Scores");
        // die Einträge in der Collection (Scores) werden in einem ScoreData Array gespeichert 
        let scoreData: ScoreData[] = await scoresCollection.find().toArray();
        // JSON.stringify macht aus scoreData einen JSON string 
        _response.write(JSON.stringify(scoreData));
    }

    // fügt username sowie die Zeit in Millisek. der Scores Collection in MongoDB hinzu
    async function addNewScore(_name: string, _timeMillis: number): Promise<void> {
        console.log("Adding new score to mongodb...");
        // Verbindet sich mit der MongoDB (Melmory Datenbank)
        await connectToDB(databaseUrl);

        // MongoDB (Melmory) wird aufgerufen und die Collection (Scores) wird in eine variable gespeichert
        let scoresCollection: Mongo.Collection = mongoClient.db("Melmory").collection("Scores");
        // beide Werte (username & timeMillis) werden in ein ScoreData gemacht, damit man das scoreData in die Collection hinzufügen kann
        let scoreData: ScoreData = { username: _name, time_millis: _timeMillis };
        // ein Eintrag wird der Collection (Scores) hinzugefügt
        scoresCollection.insertOne(scoreData);
    }

    // dazu da sich mit der MongoDB zu verbinden 
    async function connectToDB(_url: string): Promise<void> {
        // -- eisntellungen für die Verbindung der Datenbank
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        // -- mit dem Mongo Cliet wird auf die DB zugegriffen
        mongoClient = new Mongo.MongoClient(_url, options);
        //--  verbidnet den Mongo Client mit der Datenbank
        await mongoClient.connect(); 
    }
}