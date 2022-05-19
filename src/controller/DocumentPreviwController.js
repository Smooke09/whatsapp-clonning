import { U } from 'pdfjs-dist';

// fazendo querimento da lib pdf instalada 
const pdfjsLib = require('pdfjs-dist')
// biblioteca para percore diretorio
const path = require('path')

pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.worker.bundle.js')

export class DocumentPreviwController {


    constructor(file) {

        this._file = file;
    }

    // Metodo para verificar o tipo do arquivo
    getPreviewData() {


        return new Promise((s, f) => {

            let reader = new FileReader();

            switch (this._file.type) {
                // caso para verifcica qual image e e executar ação
                case 'image/png':
                case 'image/jpg':
                case 'image/jpeg':
                case 'image/gif':

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
                    // fazendo leitura pdf
                    reader.onload = e => {

                        // convertendo o arquvio em 8 bits
                        pdfjsLib.getDocument(new Uint8Array(reader.result)).then(pdf => {

                            // para pega a pagina pdf e o q a promesa retorno
                            pdf.getPage(1).then(page => {

                                // pegando o view port do pdf
                                let viewport = page.getViewport(1);

                                // setando canvas
                                let canvas = document.createElement('canvas')
                                // definido o contedxto do canvas
                                let canvasContext = canvas.getContext('2d')
                                // toda vez que trabalha com canva tem que definir o container 
                                canvas.width = viewport.width;
                                canvas.height = viewport.height;

                                page.render({
                                    canvasContext,
                                    viewport,
                                }).then(() => {

                                    // verificando se ttem mas paginas e adicionado o S
                                    let _s = (pdf.numPages > 1) ? 's' : ''

                                    // mostrando na tela img pdf
                                    s({
                                        src: canvas.toDataURL('image/png'),
                                        info: `${pdf.numPages} pagina${_s}`
                                    })

                                }).catch(err => {

                                    f(err);
                                });

                            }).catch(err => {

                                f(err)
                            });


                        }).catch(err => {

                            f(err)

                        });

                    };
                    reader.readAsArrayBuffer(this._file);

                    console.log('pdf foi')
                    break;


                default:
                    f();
            }

        });
    }

}