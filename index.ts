import * as string from "./fields/string"
import * as boolean from "./fields/boolean"
import * as radio from "./fields/radio"
import * as radioMulti from "./fields/radioMulti"
import * as upload from "./fields/upload"
import * as object from "./fields/object"
import * as number from "./fields/number"
import * as combo from "./fields/combo"
import * as date from "./fields/data"
import * as models from "./models/_lib"

import * as core from "./fields/_core"

import * as validator from "./fields/validator/_lib"


export function build<T>(def: core.StringInput | core.NumberInput | core.DateInput | core.UploadInput<T> | core.RadioInput | core.BooleanInput | core.ComboInput<T>): core.Input<any> {
    switch (def.type) {
        case "string": {
            return string.stringInput(def, validator.validate("string"))
        }
        case "password": {
            return string.stringInput(def, validator.validate("string"))
        }
        case "mail": {
            return string.stringInput(def, validator.validate("string"))
        }
        case "number": {
            return number.numberInput(def)
        }
        case "date": {
            return date.date(def)
        }
        case "upload": {
            return upload.uploadMulti(def)
        }
        case "radio": {
            return radio.radio(def)
        }
        case "boolean": {
            return boolean.booleanInput(def, validator.validate("boolean"))
        }
        case "combo": {
            return combo.combo(def)
        }
    }
}