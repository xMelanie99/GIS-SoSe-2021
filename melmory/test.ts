namespace Melmory {


    var serverUrl: string = "https://memazing.herokuapp.com/";
    var imageUrl: string = "https://github.com/xMelanie99/GIS-SoSe-2021/tree/main/melmory";

    request_picture();

    async function request_picture(): Promise<void> {
        let response: Response = await fetch(serverUrl);
        let htmlPic: HTMLImageElement = <HTMLImageElement>document.getElementById("amogus");
        htmlPic.src = imageUrl + (await response.text());
    }
}