export class DocumentPreviwController {


    constructor(file) {

        this._file = file;
    }

    // Metodo para verificar o tipo do arquivo
    getPreviewData() {


        return new Promise((s, f) => {

            switch (this._file.type) {

                // caso para verifcica qual image e e executar ação
                case 'image/png':
                case 'image/jpg':
                case 'image/jpeg':
                case 'image/gif':
                    let reader = new FileReader();
                    reader.onload = e => {

                        // promise sucesses
                        s({
                            src: reader.result,
                            info: this._file.name
                        });

                    }
                    reader.onerror = e => {

                        // promise failed
                        f(e);
                    }
                    reader.readAsDataURL(this._file)
                    break;

                // caso para pdf
                case 'application/pdf':
                    console.log('pdf foi')
                    break;


                default:
                    f();
            }

        });
    }

}