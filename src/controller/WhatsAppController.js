
// importando 
import { Format } from './../util/Format';
import { CameraController } from './CameraController';
import { MicrophoneController } from './MicrophoneController';
import { DocumentPreviwController } from './DocumentPreviwController';
import { Firebase } from './../util/Firebase';
import { User } from '../model/User';
import { Chat } from '../model/Chat';
import { Message } from '../model/Messege';
import { Base64 } from '../util/Base64';
import { ContactsController } from './ContactsController';

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

            // evento criado
            this._user.on('datachange', data => {

                document.querySelector('title').innerHTML = data.name + ' - WhatsApp Clone';

                this.el.inputNamePanelEditProfile.innerHTML = data.name;

                // alterando a foto
                if (data.photo) {
                    let photo = this.el.imgPanelEditProfile;
                    photo.src = data.photo;
                    photo.show();
                    this.el.imgDefaultPanelEditProfile.hide()
                    let photo2 = this.el.myPhoto.querySelector('img');
                    photo2.src = data.photo;
                    photo2.show();
                };

                this.initContacts();


            });

            // inserindo no firabese
            this._user.name = response.user.displayName;
            this._user.email = response.user.email;
            this._user.photo = response.user.photoURL;

            // fazendo aparece a tela do wpp
            this._user.save().then(() => {
                this.el.appContent.css({
                    display: 'flex'
                });
            });
        }).catch(err => {
            console.error(err)
        });
    }

    // fazendo o contatos adicionado aparecer na tela
    initContacts() {

        this._user.on('contactschange', docs => {

            this.el.contactsMessagesList.innerHTML = '';

            docs.forEach(doc => {

                let contact = doc.data();
                let div = document.createElement('div');

                div.className = 'contact-item';

                div.innerHTML = ` 
                  <div class="dIyEr">
                <div class="_1WliW" style="height: 49px; width: 49px;">
                    <img src="#" class="Qgzj8 gqwaM photo" style="display:none;">
                    <div class="_3ZW2E">
                        <span data-icon="default-user" class="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                                <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                                <g fill="#FFF">
                                    <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path>
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div class="_3j7s9">
                <div class="_2FBdJ">
                    <div class="_25Ooe">
                        <span dir="auto" title="${contact.name}" class="_1wjpf">${contact.name}</span>
                    </div>
                    <div class="_3Bxar">
                        <span class="_3T2VG">${contact.lastMessageTime}</span>
                    </div>
                </div>
                <div class="_1AwDx">
                    <div class="_itDl">
                        <span title="digitando…" class="vdXUe _1wjpf typing" style="display:none">digitando…</span>
        
                        <span class="_2_LEW last-message">
                            <div class="_1VfKB">
                                <span data-icon="status-dblcheck" class="">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                                        <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path>
                                    </svg>
                                </span>
                            </div>
                            <span dir="ltr" class="_1wjpf _3NFp9">${contact.lastMessage}</span>
                            <div class="_3Bxar">
                                <span>
                                    <div class="_15G96">
                                        <span class="OUeyt messages-count-new" style="display:none;">1</span>
                                    </div>
                            </span></div>
                            </span>
                    </div>
                </div>
            </div>
            `;

                if (contact.photo) {
                    let img = div.querySelector('.photo');
                    img.src = contact.photo;
                    img.show();
                }

                div.on('click', e => {
                    this.setActiveChat(contact);
                });

                this.el.contactsMessagesList.appendChild(div);
            });

        });

    }


    setActiveChat(contact) {

        if (this._contactActive) {
            Message.getRef(this._contactActive.chatId).onSnapshot(() => { });
        }

        this._contactActive = contact;

        this.el.activeName.innerHTML = contact.name;

        this.el.activeStatus.innerHTML = contact.status;

        if (contact.photo) {
            let img = this.el.activePhoto;

            img.src = contact.photo;
            img.show();
        }

        this.el.home.hide();
        this.el.main.css({
            display: 'flex'
        });

        this.el.panelMessagesContainer.innerHTML = '';

        Message.getRef(this._contactActive.chatId).orderBy('timeStamp').onSnapshot(docs => {

            let scrollTop = this.el.panelMessagesContainer.scrollTop;

            let scrollTopMax = (this.el.panelMessagesContainer.scrollHeight - this.el.panelMessagesContainer.offsetHeight);

            let autoScroll = (scrollTop >= scrollTopMax);

            docs.forEach(doc => {
                let data = doc.data();
                data.id = doc.id;

                let message = new Message();

                message.fromJSON(data);

                let me = (data.from === this._user.email);

                let view = message.getViewElement(me);


                if (!this.el.panelMessagesContainer.querySelector('#_' + data.id)) {


                    if (!me) {
                        doc.ref.set({
                            status: 'read'
                        }, {
                            merge: true
                        })
                    }

                    this.el.panelMessagesContainer.appendChild(view);
                } else {

                    let parent = this.el.panelMessagesContainer.querySelector('#_' + data.id).parentNode;

                    parent.replaceChild(view, this.el.panelMessagesContainer.querySelector('#_' + data.id));

                }

                if (this.el.panelMessagesContainer.querySelector('#_' + data.id) && me) {

                    let msgEl = this.el.panelMessagesContainer.querySelector('#_' + data.id)

                    msgEl.querySelector('.message-status').innerHTML = message.getStatusViewElement().outerHTML;
                }

                if (message.type === 'contact') {

                    view.querySelector('.btn-message-send').on('click', e => {
                        // criando chat
                        Chat.createIfNotExists(this._user.email, message.content.email).then(chat => {

                            let contact = new User(message.content.email);

                            contact.on('datachange', data => {

                                contact.chatId = chat.id;

                                this._user.addContact(contact)

                                this._user.chatId = chat.id;

                                contact.addContact(this._user);

                                this.setActiveChat(contact);
                            });

                        })

                    });
                }
            });

            if (autoScroll) {
                this.el.panelMessagesContainer.scrollTop = (this.el.panelMessagesContainer.scrollHeight - this.el.panelMessagesContainer.offsetHeight);
            } else {
                this.el.panelMessagesContainer.scrollTop = scrollTop;
            }
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

        // procurar os contatos search
        this.el.inputSearchContacts.on('keyup', e => {
            if (this.el.inputSearchContacts.value.length > 0) {
                this.el.inputSearchContactsPlaceholder.hide();
            } else {
                this.el.inputSearchContactsPlaceholder.show();
            }
            this._user.getContacts(this.el.inputSearchContacts.value);
        });


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

            this.el.btnSavePanelEditProfile.disable = true;

            this._user.name = this.el.inputNamePanelEditProfile.innerHTML

            this._user.save().then(() => {

                this.el.btnSavePanelEditProfile.disable = false;


            })
        });


        // evento submit no botao de adicionar
        this.el.formPanelAddContact.on('submit', e => {
            console.log('Botao de adicionar')

            e.preventDefault();

            let formData = new FormData(this.el.formPanelAddContact);


            let contact = new User(formData.get('email'));

            contact.on('datachange', data => {

                if (data.name) {

                    // criando chat
                    Chat.createIfNotExists(this._user.email, contact.email).then(chat => {

                        contact.chatId = chat.id;

                        this._user.chatId = chat.id;

                        contact.addContact(this._user);

                        this._user.addContact(contact).then(() => {

                            this.el.btnClosePanelAddContact.click();
                            console.info('contato foi adicionado!');

                        });

                    })

                } else {
                    console.error('Usuario nao foi encontrado.');
                };
            });
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

            // utilizando expred para trasforma em arry e fazer um foreach em cada item do array
            [...this.el.inputPhoto.files].forEach(file => {
                Message.sendImage(this._contactActive.chatId, this._user.email, file);
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

            this.el.btnSendPicture.disable = true;

            let regex = /^data:(.+);base64,(.*)$/;
            let result = this.el.pictureCamera.src.match(regex);
            let mimiType = result[1];
            let ext = mimiType.split('/')[1];
            let filename = `camera${Date.now()}.${ext}`;

            let picture = new Image();
            picture.src = this.el.pictureCamera.src;
            picture.onload = e => {

                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');

                canvas.width = picture.width;
                canvas.height = picture.height;

                context.translate(picture.width, 0);
                context.scale(-1, 1);

                context.drawImage(picture, 0, 0, canvas.width, canvas.height);

                fetch(canvas.toDataURL('mimeType')).then(res => {
                    return res.arrayBuffer().then(buffer => {
                        return new File([buffer], filename, { type: mimiType });
                    }).then(file => {

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

            };

            console.log(result)

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

            let file = this.el.inputDocument.files[0];
            let base64 = this.el.imgPanelDocumentPreview.src;

            if (file.type === 'application/pdf') {

                Base64.toFile(base64).then(filePreview => {
                    Message.sendDocument(
                        this._contactActive.chatId,
                        this._user.email,
                        file,
                        filePreview,
                        this.el.infoPanelDocumentPreview.innerHTML
                    );
                });
            } else {
                Message.sendDocument(this._contactActive.chatId,
                    this._user.email,
                    file);
            }

            this.el.btnClosePanelDocumentPreview.click();
        });



        // click no icon de contatos
        this.el.btnAttachContact.on('click', e => {

            // exibir modal de contatos
            this._contactsController = new ContactsController(this.el.modalContacts, this._user);

            this._contactsController.on('select', contact => {

                Message.sendContact(
                    this._contactActive.chatId,
                    this._user.email,
                    contact
                );

            });

            this._contactsController.open();

        });

        // Evento ao clicakr no X fechar modal de contatos
        this.el.btnCloseModalContacts.on('click', e => {
            this._contactsController.close();

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

            this._microphoneController.on('recorded', (file, metadata) => {

                Message.sendAudio(
                    this._contactActive.chatId,
                    this._user.email,
                    file, metadata,
                    this._user.photo
                );
            });

            this._microphoneController.stopRecorder();
            this.closeRecordMicrophone();
        });


        // Eventos de textos


        // Evento de texto mensagem
        this.el.inputText.on('keyup', e => {

            // if para verificar se tem alguma coisa escrita se tiver aprece botao de envia msg
            // alterado no curso esta diferente
            if (this.el.inputText.innerHTML && this.el.inputText.innerHTML != '<br>')
            /*if (this.el.inputText.innerHTML.length)*/ {
                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();
            } else {
                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
            }

        });

        // Evento  de aperta enter ou ctrl ENTER
        this.el.inputText.on('keypress', e => {

            if (e.key === 'Enter' && !e.ctrlKey) {
                e.preventDefault();
                this.el.btnSend.click();
            }

        });

        // evento ao clickar para enviar a mensagem
        this.el.btnSend.on('click', e => {
            Message.send(
                this._contactActive.chatId,
                this._user.email,
                'text',
                this.el.inputText.innerHTML
            );

            this.el.inputText.innerHTML = '';
            this.el.panelEmojis.removeClass('open');

            // console.log("reslovido", this.el.inputText.innerHTML)

        })

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

