namespace Aufgabe3 {

    interface Data {
        email: string;
        password: string;
    }

    document.getElementById("html-button").addEventListener("click", sendData);
    document.getElementById("json-button").addEventListener("click", sendData);

    async function sendData(_e: Event): Promise<void> {
        let htmlButton: HTMLButtonElement = <HTMLButtonElement>_e.target;
        let formData: FormData = new FormData(document.forms[0]); // document.forms = array aus allen Formularen       
        let data: Data = { email: formData.get("e_Mail").toString(), password: formData.get("pw").toString() }; //.toString() = umwandlung in string | values wurden in objekt data gespeichert
        let query: URLSearchParams = new URLSearchParams(<any>data); // neue query aus dem objekt erstellt
        let url: string = "https://memazing.herokuapp.com/"; // url vom Server wurde verwiesen
        switch (htmlButton.id) {
            case "html-button":
                url += "html";
                break;
            case "json-button":
                url += "json";
                break;
        }
        url = url + "?" + query.toString(); // query wurde der url hinz | ? = makiert eine query
        let response: Response = await fetch(url); // macht erst weiter wenn die url da ist (asycron)
        switch (htmlButton.id) {
            case "html-button":
                let p: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("pElement");
                p.innerHTML = await response.text();
                break;
            case "json-button":
                console.log(await response.json());
                break;
        }
    }
}
