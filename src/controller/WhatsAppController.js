class WhatsAppController {

    constructor() {

        console.log('WhatsAppController ok')

        // iniciando metodos
        this.elementsPrototype();
        this.loadeElements();
        // INiciando todos events
        this.initEvents();

    }

    // formatando todas as classes do css para camelCase
    loadeElements() {

        this.el = {};
        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element;

        });
    };


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
    };


    // METODO fechar todos painel do lado esquerdo
    closeAllLeftPanel() {

        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();

    }
}