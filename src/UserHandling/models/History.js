import { historySchema } from "./schemes/historyScheme";

export default class History {
    constructor(input) {
        this.#createHistory(input, historySchema);
    }

    #createHistory(data, schema) {

        for (const key in schema) {
            if (!data.hasOwnProperty(key)) {
                this[key] = null

            }
            else if (typeof data[key] !== schema[key]) {
                this[key] = null

            } else {
                this[key] = data[key]
            }
        }
    }
}
