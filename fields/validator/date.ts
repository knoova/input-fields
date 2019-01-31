import * as core from "../_core"
import * as models from "../../models/_lib"


export function validate(def: core.DateInput, value: string): models.DataState<string> {
    if (typeof value !== "string") {
        return { state: "err", message: "Il valore deve essere una stringa" }
    }
    if (!def.nullable && !value) {
        return { state: "err", message: "Il valore non può essere vuoto" }
    }
    try {
        new Date("a")
    }
    catch (e) {
        return { state: "err", message: "Il valore deve essere una data" }
    }

    if (def.min && value < def.min) {
        return { state: "err", message: "La data deve essere maggiore di " + def.min }
    }
    if (def.max && value > def.max) {
        return { state: "err", message: "La data deve essere minore di " + def.max }
    }
    return { state: "ok", value }
}