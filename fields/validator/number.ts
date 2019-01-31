import * as core from "../_core"
import * as models from "../../models/_lib"


export function validate(def: core.NumberInput, value: number): models.DataState<number> {
    if(typeof value !== "number"){
        return { state: "err", message: "Il valore deve essere un number" }
    }
    if (!def.nullable && !value) {
        return { state: "err", message: "Il valore non può essere vuoto" }
    }
    if (value < def.min){
        return { state: "err", message: "Il valore non può essere più piccolo di " + def.min.toString() }
    }
    if (value > def.max){
        return { state: "err", message: "Il valore non può essere più grande di " + def.max.toString() }
    }
    return {state: "ok", value}
}