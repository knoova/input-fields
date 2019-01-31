import * as core from "../_core"
import * as models from "../../models/_lib"


export function validateString(def: core.StringInput, value: string): models.DataState<string> {
    if(typeof value !== "string"){
        return { state: "err", message: "Il valore deve essere una stringa" }
    }
    if (!def.nullable && !value) {
        return { state: "err", message: "Il valore non può essere vuoto" }
    }
    if (def.minLength && value.length < def.minLength){
        return { state: "err", message: "Il valore non può essere più corto di " + def.minLength.toString() }
    }
    if (def.maxLength && value.length > def.maxLength){
        return { state: "err", message: "Il valore non può essere più lungo di " + def.maxLength.toString() }
    }
    return {state: "ok", value}
}

export function validatePassword(def: core.StringInput, value: string): models.DataState<string> {
    if(typeof value !== "string"){
        return { state: "err", message: "Il valore deve essere una stringa" }
    }
    if (!def.nullable && !value) {
        return { state: "err", message: "Il valore non può essere vuoto" }
    }
    if (value.length < 4){
        return { state: "err", message: "Il valore non può essere più corto di " + def.minLength.toString() }
    }
    return {state: "ok", value}
}