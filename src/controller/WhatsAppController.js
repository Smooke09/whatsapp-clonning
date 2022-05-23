
// importando 
import { Format } from './../util/Format';
import { CameraController } from './CameraController';
import { MicrophoneController } from './MicrophoneController';
import { DocumentPreviwController } from './DocumentPreviwController';
import { Firebase } from './../util/Firebase';
import { User } from '../model/User';

export class WhatsAppController {

    constructor() {

        console.log('WhatsAppController ok')


        // inicializando firabese
        this._firebase = new Firebase();
        this.initAuth();

        // iniciando metodos
        this.elementsPrototype();
        this.loadeElements();
        // INiciando todos events
        this.initEvents();

        console.log(this._firebase)

    }

    // Inicia autenticação do firebase
    initAuth() {
        this._firebase.initAuth().then(response => {

            this._user = new User(response.user.email);

            this._user.on('datachange', data => {

                document.querySelector('title').innerHTML = data.name + ' - WhatsApp Clone';

                this.el.inputNamePanelEditProfile.innerHTML = data.name;

                if (data.photo) {
                    let photo = this.el.imgPanelEditProfile;
                    photo.src = data.photo;
                    photo.show();
                    this.el.imgDefaultPanelEditProfile.hide()
                    let photo2 = this.el.myPhoto.querySelector('img');
                    photo2.src = data.photo;
                    photo2.show();
                };
            });

            this._user.name = response.user.displayName;
            this._user.email = response.user.email;
            this._user.photo = response.user.photoURL;

            this._user.save().then(() => {
                this.el.appContent.css({
                    display: 'flex'
                });
            });
        }).catch(err => {
            console.error(err)
        });
    }


    // formatando todas as classes do css para camelCase
    loadeElements() {

        this.el = {};
        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element;

        });
    };

    // Prototype
    elementsPrototype() {

        // ocultar 
        Element.prototype.hide = function () {
            this.style.display = 'none'
            return this;
        }
        // mostrar 
        Element.prototype.show = function () {
            this.style.display = 'block'
            return this;
        }
        //  se tiver oculto mostra se tive mostrando oculta
        Element.prototype.toggle = function () {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none'
            return this;
        }

        //events 
        Element.prototype.on = function (events, fn) {
            events.split(' ').forEach(event => {
                this.addEventListener(event, fn)
            });
            return this;
        }

        // Para css
        Element.prototype.css = function (styles) {
            for (let name in styles) {
                this.style[name] = styles[name]
            };
            return this;
        };
        // adicionar
        Element.prototype.addClass = function (name) {
            this.classList.add(name);
            return this;

        }
        // remove
        Element.prototype.removeClass = function (name) {
            this.classList.remove(name)
            return this;
        }

        // se tiver class remove se nao tiver adiciona
        Element.prototype.toggleClass = function (name) {
            this.classList.toggle(name)
            return this;
        }

        // fazendo verificaçao e voltando boolean
        Element.prototype.hasClass = function (name) {
            this.classList.contains(name)
        }

        // pega o formulario e devolver em formData 
        HTMLFormElement.prototype.getForm = function () {
            return new FormData(this);
        }

        // prototype para gerar para JSON 
        HTMLFormElement.prototype.toJSON = function () {

            let json = {}

            this.getForm().forEach((value, key) => {

                json[key] = value
            });
            return json
        }
    }

    initEvents() {

        // adicionando evento de click no icon de foto
        this.el.myPhoto.on('click', e => {
            console.log('myphoto')

            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 300);
        });
        // adicionando evento de click no icon de contato
        this.el.btnNewContact.on('click', e => {
            console.log('contact')

            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            });
        });

        // evento de click no arrow para voltar do perfil Profile
        this.el.btnClosePanelEditProfile.on('click', e => {
            this.el.panelEditProfile.removeClass('open')
        });

        // evento de click no arrow para volta dos contactos
        this.el.btnClosePanelAddContact.on('click', e => {
            this.el.panelAddContact.removeClass('open')
        });

        // evento de clickar na foto
        this.el.photoContainerEditProfile.on('click', e => {
            console.log('foto')

            // Abrir event de adicionar foto
            this.el.inputProfilePhoto.click();

        });

        // evento de abrir a foto para selecionar
        this.el.inputNamePanelEditProfile.on('keypress', e => {
            console.log('foto')
            if (e.key === 'Enter') {
                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }

        });

        // Evento de salva o nome inserido no input
        this.el.btnSavePanelEditProfile.on('click', e => {
            console.log(this.el.inputNamePanelEditProfile.innerHTML);
        });


        // evento submit no botao de adicionar
        this.el.formPanelAddContact.on('submit', e => {
            console.log('Botao de adicionar')

            e.preventDefault();

            let formData = new FormData(this.el.formPanelAddContact);

        });

        // Evento quando clicar no contato para aparecer a conversar
        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {

            item.on('click', e => {

                this.el.home.hide();
                this.el.main.css({
                    display: 'flex',

                })
            });

        });

        // Evento ao clickar no clip de anexar ou enviar a arquivo na conversa
        this.el.btnAttach.on('click', e => {

            // parando progação
            e.stopPropagation();

            this.el.menuAttach.addClass('open');

            // FEchando o menu quando houver click em outro lugar
            document.addEventListener('click', this.closeMenuAttach.bind(this))

        });

        // evento de click dentro do menu do clip nos itens
        this.el.btnAttachPhoto.on('click', e => {

            // Acionadno evento do icon photo   
            this.el.inputPhoto.click();
        });

        // Evento de abrir icon de photo
        this.el.inputPhoto.on('change', e => {

            console.log(this.el.inputPhoto.files);

            // utilizando expred para trasforma em arry e fazer um foreach em cada item do array
            [...this.el.inputPhoto.files].forEach(file => {

                console.log(file)

            });

        });

        // Clicando no icon camera
        this.el.btnAttachCamera.on('click', e => {

            // Metodo removendo tudo
            this.closeAllMainPanel();

            // abrir a class
            this.el.panelCamera.addClass('open')
            // Abrir o panel de colocar a foto e dando
            this.el.panelCamera.css({
                'height': '100%'
            });

            // instanciado objeto camera 
            this._camera = new CameraController(this.el.videoCamera);
        });

        // Evento ao clicakr no X fechar panelcamera
        this.el.btnClosePanelCamera.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();
            // utilizando Metodo stop criado em camera para fechar 
            this._camera.stop();

        });

        // evento ao clicar no botao de tirar foto dentro do panel
        this.el.btnTakePicture.on('click', e => {

            // metodo para tirar a foto criado no cameraController
            let dataUrl = this._camera.takePicture()

            // mostrando na tela e ocultado video
            this.el.pictureCamera.src = dataUrl;
            this.el.pictureCamera.show();
            // Ocultando o video
            this.el.videoCamera.hide()
            // botao de tirar foto novamente
            this.el.btnReshootPanelCamera.show()
            // ocutar o container de video
            this.el.containerTakePicture.hide();
            // mostra o  container de foto
            this.el.containerSendPicture.show();

            console.log('camera ')

        });

        // vai fechar  a camera e enviar
        this.el.btnReshootPanelCamera.on('click', e => {

            this.el.pictureCamera.hide();
            this.el.videoCamera.show()
            this.el.btnReshootPanelCamera.hide()
            this.el.containerTakePicture.show();
            this.el.containerSendPicture.hide();

        })

        this.el.btnSendPicture.on('click', e => {

            console.log(this.el.pictureCamera.src)

        });

        // CLick no icon de documetnos
        this.el.btnAttachDocument.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                'height': '100%'
            });

            // selecionado input
            this.el.inputDocument.click();

        });


        // configurando o send capturando arquivo enviado
        this.el.inputDocument.on('change', e => {



            if (this.el.inputDocument.files.length) {
                // tratando arquivo 1 por vez
                let file = this.el.inputDocument.files[0];


                // criando objeto de leitura do arquivo(classe)
                this._documentPreviwController = new DocumentPreviwController(file);

                // mostrando preview do arquivo e retornando uma promesa
                this._documentPreviwController.getPreviewData().then(result => {

                    //  mostrando img na tela
                    this.el.imgPanelDocumentPreview.src = result.src;
                    // mostrando nome do arquivo
                    this.el.infoPanelDocumentPreview.innerHTML = result.info;
                    this.el.imagePanelDocumentPreview.show()
                    this.el.filePanelDocumentPreview.hide()

                }).catch(err => {
                    // fazendo um swite dos tipos de dados
                    console.log(file.type);

                    switch (file.type) {

                        // excel
                        case 'application/vnd.ms-excel':
                        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls';

                            break;

                        // powerpoint
                        case 'application/vnd.ms-powerpoint':
                        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt';
                            break;

                        // word
                        case 'application/msword':
                        case 'application/doc':
                            console.log('word')
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc';

                            break

                        default:
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic';
                            break;
                    }

                    // carregando nome do documento
                    this.el.filenamePanelDocumentPreview.innerHTML = file.name;
                    this.el.imagePanelDocumentPreview.hide()
                    this.el.filePanelDocumentPreview.show()
                    // console.log('Arquivo nao definido', err)

                });
            }


        });

        // Evento ao clickar no x fechar panelDocuments
        this.el.btnClosePanelDocumentPreview.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });

        // evento ao clickar no botao de enviar documento
        this.el.btnSendDocument.on('click', e => {

            console.log('send document')

        });

        // click no icon de contatos
        this.el.btnAttachContact.on('click', e => {

            // exibir modal de contatos
            this.el.modalContacts.show();

        });

        // Evento ao clicakr no X fechar modal de contatos
        this.el.btnCloseModalContacts.on('click', e => {
            this.el.modalContacts.hide();

        });

        // Evento ao clicka no microfone
        this.el.btnSendMicrophone.on('click', e => {

            // Abrindo microphone e tirando o icon do microphone
            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();

            // Metodo pra iniciar a gravacao do audio
            this._microphoneController = new MicrophoneController()

            // metodo para inicia a gravacação
            this._microphoneController.on('ready', audio => {
                console.log('redy events')
                // iniciando a gravação
                this._microphoneController.startRecorder();
            });

            this._microphoneController.on('recordtimer', timer => {

                this.el.recordMicrophoneTimer.innerHTML = Format.toTime(timer);

            });
        });

        // botao de cancelar o audio
        this.el.btnCancelMicrophone.on('click', e => {

            this._microphoneController.stopRecorder();
            this.closeRecordMicrophone();
        });


        // botao de enviar o audio
        this.el.btnFinishMicrophone.on('click', e => {

            this._microphoneController.stopRecorder();
            this.closeRecordMicrophone();
        });


        // Eventos de textos

        // Evento  de aperta enter ou ctrl ENTER
        this.el.inputText.on('keypress', e => {

            if (e.key === 'Enter' && !e.ctrlKey) {
                e.preventDefault();
                this.el.btnSend.click();
            }

        });

        // Evento de texto mensagem
        this.el.inputText.on('keyup', e => {

            // if para verificar se tem alguma coisa escrita se tiver aprece botao de envia msg
            // alterado no curso esta diferente
            if (this.el.inputText.innerHTML && this.el.inputText.innerHTML != '<br>') {
                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();
            } else {
                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
            }

            // evento ao clickar para enviar a mensagem
            this.el.btnSend.on('click', e => {

                console.log(this.el.inputText.innerHTML)

            })
        });

        // evento para abrir panel de emoji
        this.el.btnEmojis.on('click', e => {

            this.el.panelEmojis.toggleClass('open')
        })

        // event para enviar o emoji 
        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {
            emoji.on('click', e => {

                console.log(emoji.dataset.unicode)

                // tratando emoji e colocando no input text 

                // metodo nativo do javascript para clonar o elemento e pega algumas propriedades
                let img = this.el.imgEmojiDefault.cloneNode();

                // pegandos as propriedades com a variavel img que esta cloando o emoji
                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                // fazendo um foreach para lista todas as classes que tem em emoji
                emoji.classList.forEach(name => {
                    img.classList.add(name);
                });

                // append vai inserir no final img que esta sendo passada como parametro
                // this.el.inputText.appendChild(img);

                // getSelection metodo nativo para saber onde esta a posicao do teclado e nao do mouse
                let cursor = window.getSelection();

                // verificando se o curso esta focado no input
                if (!cursor.focusNode || !cursor.focusNode.id == 'input-text') {
                    this.el.inputText.focus();

                    cursor = window.getSelection();
                }

                // range e intervalo de interacao metodo nativo do javascrit para criar o range do cursor
                let range = document.createRange();

                // pegando o ranger iniciando em 0 e atribuindo a variavel range
                range = cursor.getRangeAt(0);

                // Metodo nativo do js de deletar range
                range.deleteContents();

                // interfirindo no que foi digitado ou framgmento
                let frag = document.createDocumentFragment();

                // inserindo o emoji no fragmento
                frag.appendChild(img);

                // Inserindo fragmento dentro do node
                range.insertNode(frag)

                // atualizando o cursor
                range.setStartAfter(img)

                // forcando o evento aparece
                this.el.inputText.dispatchEvent(new Event('keyup'));

            });

        })



    };//initEvents

    // Metodo de fechar o recordMIcrophone e aparece o microphone
    closeRecordMicrophone() {
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
    };


    // metodo para ocultar tudo no panel
    closeAllMainPanel() {
        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');

    }

    // Metodo para quando houver click em outro lugar
    closeMenuAttach(e) {

        document.removeEventListener('click', this.closeMenuAttach)
        this.el.menuAttach.removeClass('open');
        // console.log('remove menu')
    }

    // METODO fechar todos painel do lado esquerdo
    closeAllLeftPanel() {

        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();

    }
}