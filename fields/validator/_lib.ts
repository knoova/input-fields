import * as core from "../_core"
import * as models from "../../models/_lib"

import * as string from "./string"
import * as boolean from "./boolean"
import * as date from "./date"
import * as number from "./number"

//"string" | "password" | "mail" | "boolean" | "radio" | "upload" | "uploadImage" | "uploadPdf" | "number" | "combo"

function validateOther(def: core.InputArgs<any>, value: string): models.DataState<string> {
    return { state: "ok", value }
}


function validate(def: core.InputArgs<any>, value: any) {
    if (def.type == "string") {
        return string.validateString(def, value)
    }
    if (def.type == "mail") {
        return string.validateString(def, value)
    }
    if (def.type == "password") {
        return string.validatePassword(def, value)
    }
    if (def.type == "boolean") {
        return boolean.validate(def, value)
    }
    if (def.type == "number") {
        return number.validate(def, value)
    }
    return validateOther(def, value)
}