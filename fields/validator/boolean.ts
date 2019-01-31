import * as core from "../_core"
import * as models from "../../models/_lib"


export function validate(def: core.BooleanInput, value: string): models.DataState<string> {
    if(typeof value !== "boolean"){
        return { state: "err", message: "Il valore deve essere un boolean" }
    }
    if (def.mustBeTrue && !value) {
        return { state: "err", message: "Il valore non può essere falso" }
    }
    
    return {state: "ok", value}
}