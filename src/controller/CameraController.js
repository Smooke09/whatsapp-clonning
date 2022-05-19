export class CameraController {

    constructor(videoEl) {

        this._videoEl = videoEl;


        // api Navigator para solicitar permisao de abrir a camera
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream => {

            // logica diferente no curso utilizando novos recurso
            this._stream = stream;
            this._videoEl.srcObject = new MediaStream(stream);
            this._videoEl.play();
        }).catch(err => {
            console.error(err);
        });


    }

    // Metodo de parar a camera
    stop() {
        this._stream.getTracks().forEach(track => {
            track.stop();

        })

    }

    // Metodo que gera um canvas com base no tipo de conteudo que veio da camera
    takePicture(mimeType = 'image/png') {

        // criando um elemnto canvas
        let canvas = document.createElement('canvas');

        // todo canvas precisa de um height e um widith padrao 
        canvas.setAttribute('height', this._videoEl.videoHeight);
        canvas.setAttribute('widith', this._videoEl.videoWidith);

        // vai ser o contexto que vai acontece
        let context = canvas.getContext('2d')

        // vai desenha uma imagem
        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

        // convertendo para base64
        return canvas.toDataURL(mimeType);

    }


}