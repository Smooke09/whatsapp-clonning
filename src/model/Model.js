import { ClassEvent } from "../util/ClassEvent";

export class Model extends ClassEvent {

    constructor() {
        super();
        this._data = {};

    }

    // definir o json
    fromJSON(json) {
        this._data = Object.assign(this._data, json);
        this.trigger('datachange', this.toJSON());
    }

    // Vai gerar o JSON
    toJSON() {
        return this._data;
    }

}