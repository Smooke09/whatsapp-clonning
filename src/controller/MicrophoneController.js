import { ClassEvent } from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent {

    constructor() {

        super();

        // api Navigator para solicitar permisao de abrir a audio
        navigator.mediaDevices.getUserMedia({

            audio: true

        }).then(stream => {

            this._stream = stream;

            // logica diferente no curso utilizando novos recurso
            let audio = new Audio();

            audio.srcObject = stream;

            audio.play();

            // metedo criado
            this.trigger('play', audio)

        }).catch(err => {
            console.error(err);
        });
    }

    stop() {
        this._stream.getTracks().forEach(track => {
            track.stop();

        })

    }


}