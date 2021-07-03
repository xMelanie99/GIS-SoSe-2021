import * as Http from "http"; // * = man importiert alles von http als Http
import * as Mongo from "mongodb";
import * as url from "url";
import { ParsedUrlQuery } from "querystring";
import { UrlWithParsedQuery } from "url";

export namespace Melmory {

    interface CardData {
        cardsUrl: string;
    }

    interface ScoreData {
        username: string;
        time_millis: number;
    }

    let port: number = Number(process.env.PORT); // neue Variable vom typ number wird process.env.PORT überwiesen | Port des Serves (Heruko) wird in eine Variable abgespeichert  
    if (!port) // wenn der port nicht gesetzt ist..
        port = 8100; // ..setzt er den port auf 8100

    let server: Http.Server = Http.createServer(); // erstellt neuen Server
    server.addListener("request", handleRequest); // Event Listener für requests wird dem Server hinz.
    server.addListener("listening", handleListen); // Event Listener für listening wird dem Server hinz.
    server.listen(port); // server "hört" auf dem def. port

    let databaseUrl: string = "mongodb+srv://noob1234:43_21_boon_@gis-ist-geil.uvkck.mongodb.net/Melmory?retryWrites=true&w=majority"; // Port der Datenbank
    let mongoClient: Mongo.MongoClient = undefined;

    function handleListen(): void {
        console.log("Listening"); //wird in der Konsole des Serves ausgegeben
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> { // wird immer gesetzt 
        _response.setHeader("content-type", "text/html; charset=utf-8"); // Metadaten werden gestzt
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Der Zugriff (request) wird auf dem Server erlaubt

        let requestUrl: url.UrlWithParsedQuery = url.parse(_request.url, true); // hier wurde die url von request genommen
        let urlQuery: ParsedUrlQuery = requestUrl.query; // die query von der db wurde gespeichert

        switch (requestUrl.pathname) { // wird nach dem pathname abgefragt --> ist in requestUrl gespeichert
            case "/get-all-card-urls":
                await sendClientAllCardURLs(_response);
                break;
            case "/admin-delete-card":
                await deleteCard(urlQuery["cardUrl"].toString());
                break;
            case "/admin-add-card":
                await addCard(urlQuery["cardUrl"].toString());
                break;
            case "/get-all-scores":
                await sendClientAllScores(_response);
                break;
            case "/add-new-score":
                let parseUrl: UrlWithParsedQuery = url.parse(_request.url, true);
                let storage: ParsedUrlQuery = parseUrl.query;

                let username: string = storage["username"].toString();
                let timeMillis: number = Number(storage["time_millis"].toString());

                await addNewScore(username, timeMillis);
                break;
        }

        _response.end(); // ende/finish/aus
    }

    async function sendClientAllCardURLs(_response: Http.ServerResponse): Promise<void> {
        console.log("Sending client all card urls from mongodb...");
        await connectToDB(databaseUrl);

        let cardUrlsCollection: Mongo.Collection = mongoClient.db("Melmory").collection("card_urls");
        let cardData: CardData[] = await cardUrlsCollection.find().toArray();

        _response.write(JSON.stringify(cardData));
    }

    async function deleteCard(cardUrl: string): Promise<void> {
        console.log("Deleting card with url " + cardUrl);
        await connectToDB(databaseUrl);

        let cardUrlsCollection: Mongo.Collection = mongoClient.db("Melmory").collection("card_urls");

        cardUrlsCollection.deleteOne({ cardsUrl: cardUrl });
    }

    async function addCard(cardUrl: string): Promise<void> {
        console.log("Adding card with url " + cardUrl);
        await connectToDB(databaseUrl);

        let cardUrlsCollection: Mongo.Collection = mongoClient.db("Melmory").collection("card_urls");
        let cardData: CardData = { cardsUrl: cardUrl };

        cardUrlsCollection.insertOne(cardData);
    }

    async function sendClientAllScores(_response: Http.ServerResponse): Promise<void> {
        console.log("Sending client all scores from mongodb...");
        await connectToDB(databaseUrl);

        let scoresCollection: Mongo.Collection = mongoClient.db("Melmory").collection("Scores");
        let scoreData: ScoreData[] = await scoresCollection.find().toArray();
        _response.write(JSON.stringify(scoreData));
    }

    async function addNewScore(name: string, timeMillis: number): Promise<void> {
        console.log("Adding new score to mongodb...");
        await connectToDB(databaseUrl);

        let scoresCollection: Mongo.Collection = mongoClient.db("Melmory").collection("Scores");
        let scoreData: ScoreData = { username: name, time_millis: timeMillis };
        scoresCollection.insertOne(scoreData);
    }

    async function connectToDB(_url: string): Promise<void> { // nur dazu da mit der DB zu verbinden
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true }; // eisntellungen für die Verbindung der Datenbank
        mongoClient = new Mongo.MongoClient(_url, options); // mit dem Mongo Cliet wird auf die DB zugegriffen
        await mongoClient.connect(); // verbidnet den Mongo Client mit der Datenbank
    }
}