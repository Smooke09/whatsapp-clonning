export class Base64 {


    static getMimetype(urlBase64) {


        let regex = /^data:(.+);base64,(.*)$/;
        let result = urlBase64.match(regex);
        return result[1];
    };


    static toFile(urlBase64) {

        let mimiType = Base64.getMimetype(urlBase64);
        let ext = mimiType.split('/')[1];
        let filename = `file${Date.now()}.${ext}`;

        fetch(urlBase64)
            .then(res => {
                return res.arrayBuffer()
                    .then(buffer => {
                        return new File([buffer], filename, { type: mimiType });
                    })
                    .then(file => {

                        Message.sendImage(this._contactActive.chatId, this._user.email, file);
                        this.el.btnSendPicture.disable = false;

                        this.closeAllMainPanel();
                        this._camera.stop();
                        this.el.btnReshootPanelCamera.hide();
                        this.el.pictureCamera.hide();
                        this.el.videoCamera.show();
                        this.el.containerSendPicture.hide()
                        this.el.containerTakePicture.show()
                        this.el.panelMessagesContainer.show()

                    });

            });

    }
}