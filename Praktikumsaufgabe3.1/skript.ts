namespace Teilaufgabe2 {

    interface Data {
        email: string;
        password: string;
    }

    document.getElementById("send").addEventListener("click", sendData);

    async function sendData(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]); // document.forms = array aus allen Formularen       
        let data: Data = {email: formData.get("e_Mail").toString(), password: formData.get("pw").toString()}; //.toString() = umwandlung in string | values wurden in objekt data gespeichert
        let query: URLSearchParams = new URLSearchParams(<any>data); // neue query aus dem objekt erstellt
        let url: string = "https://memazing.herokuapp.com/"; // url vom Server wurde verwiesen
        url = url + "?" + query.toString(); // query wurde der url hinz | ? = makiert eine query
        let response: Response = await fetch(url); // macht erst weiter wenn die url da ist (asycron)
        console.log(await response.text()); // response wird ausgegeben
    }
}
// Zusammen mit Bao Han Nguyen gearbeitet!