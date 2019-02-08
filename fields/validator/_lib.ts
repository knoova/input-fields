import * as core from "../_core"
import * as models from "../../models/_lib"

import * as string from "./string"
import * as boolean from "./boolean"
import * as date from "./date"
import * as number from "./number"

//"string" | "password" | "mail" | "boolean" | "radio" | "upload" | "uploadImage" | "uploadPdf" | "number" | "combo"

export type Validator<T> = (def: core.InputArgs<T>, value: T) => models.DataState<T>

function validateOther(def: core.InputArgs<any>, value: any): models.DataState<any> {
    return { state: "ok", value }
}


export function validate(type: core.InputType) {

    switch (type) {
        case "string": {
            return string.validateString
        }
        case "mail": {
            return string.validateString
        }
        case "password": {
            return string.validatePassword
        }
        case "boolean": {
            return boolean.validate
        }
        case "number": {
            return number.validate
        }
        default: {
            return validateOther
        }
    }

}