// classe para criar todos eventos
export class ClassEvent {

    constructor() {

        this._events = {};

    }

    on(eventName, fn) {

        if (!this._events[eventName]) this._events[eventName] = new Array();

        this._events[eventName].push(fn)
    }

    trigger() {

        // comando nativo para pegar os paramentros
        let args = [...arguments];
        let eventName = args.shift();

        args.push(new Event(eventName));

        // verificando se nao e um array ja
        if (this._events[eventName] instanceof Array) {

            this._events[eventName].forEach(fn => {

                // metodo nativo do javascript para executar o codigo
                fn.apply(null, args);

            });
        };

    };
};