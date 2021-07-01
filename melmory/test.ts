namespace Melmory{


    var serverUrl: string = "http://localhost:8100";

    request_picture();

    async function request_picture(): Promise<void> {
        let response: Response = await fetch(serverUrl);
        let htmlPic: HTMLImageElement = <HTMLImageElement> document.getElementById("amogus");
        htmlPic.src = await response.text();        
    }
}