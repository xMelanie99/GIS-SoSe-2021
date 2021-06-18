namespace Aufgabe3_4 {
    interface Student {
        name: string;
        firstname: string;
        matrikelnummer: number;
    }
    let sendButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("send-button");
    let requestButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("request-button");

    sendButton.addEventListener("click", addStudent);
    requestButton.addEventListener("click", getData);


    async function addStudent(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]); // das was im Formular geschrieben wird
        let student: Student = { name: formData.get("name").toString(), firstname: formData.get("firstname").toString(), matrikelnummer: Number(formData.get("matrikelnummer").toString()) };
        let url: string = "http://localhost:8100/insert"; // url vom Server wurde verwiesen
        let query: URLSearchParams = new URLSearchParams(<any>student); // neue query aus dem Objekt erstellt
        url = url + "?" + query.toString(); // hinter der url in einem string geschrieben
        await fetch(url); // fetch  = ruf den Server mit der url, die er besitzt, auf 
        let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form"); // form Element wird in eine Var gespeichert
        form.reset(); // Inhalte werden zurückgesetzt
    }

    async function getData(): Promise<void> {
        let output: HTMLDivElement = <HTMLDivElement> document.getElementById("output");
        let url: string = "http://localhost:8100/get"; // url vom Server wurde verwiesen
        let response: Response = await fetch(url);
        let dataString: string = await response.text();
        output.innerText = dataString;
    }
}