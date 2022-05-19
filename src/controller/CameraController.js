export class CameraController {

    constructor(videoEl) {

        this._videoEl = videoEl;


        // api Navigator para solicitar permisao de abrir a camera
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream => {
            // logica diferente no curso utilizando novos recurso
            this._videoEl.srcObject = new MediaStream(stream);
            this._videoEl.play();
        }).catch(err => {
            console.error(err);
        });


    }


}