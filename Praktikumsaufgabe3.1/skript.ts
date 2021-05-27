namespace Teilaufgabe2 {

    interface Data {
        email: string;
        password: string;
    }
    let formData: FormData = new FormData(document.forms[0]); // document.forms = array aus allen Formularen

    document.getElementById("send").addEventListener("click", sendData);

    async function sendData(): Promise<void> {
        let data: Data = {email: formData.get("E-Mail").toString(), password: formData.get("pw").toString()};
        let query: URLSearchParams = new URLSearchParams(<any>data);
        let url: string = "https://memazing.herokuapp.com/";
        url = url + "?" + query.toString();
        let response: Response = await fetch(url);
        console.log(await response.text());        
    }





}