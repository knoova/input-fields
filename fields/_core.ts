import * as string from "./string"
import * as boolean from "./boolean"
import * as radio from "./radio"
import * as radioMulti from "./radioMulti"
import * as upload from "./upload"
import * as object from "./object"
import * as number from "./number"
import * as combo from "./combo"
import * as date from "./data"
import * as models from "../models/_lib"

import * as validator from "./validator/_lib"

export type InputType = "string" | "password" | "mail" | "boolean" | "radio" | "upload" | "uploadImage" | "uploadPdf" | "number" | "combo" | "date"


export interface InputArgs {
    title: string
    description?: string
    nullable?: boolean
}


export interface StringInput extends InputArgs {
    type: "string" | "password" | "mail"
    multiline?: number
    password?: boolean
    minLength?: number
    maxLength?: number
}

export interface NumberInput extends InputArgs {
    type: "number"
    max?: number
    min?: number
}


export interface DateInput extends InputArgs {
    type: "date"
    max?: string
    min?: string
}

export interface UploadInput<T> extends InputArgs {
    type: "upload"
    files?: string[],
    api: (arg: { image: any, name: string }) => Promise<T>
}

export interface RadioInput extends InputArgs {
    type: "radio"
    name: string
}

export interface BooleanInput extends InputArgs {
    type: "boolean"
    mustBeTrue?: boolean
}

export interface ComboInput<T> extends InputArgs {
    type: "combo"
    visualName: keyof T,
    valueName: keyof T,
    values: T[]
}

export interface Input<T> {
    model: models.Model<models.DataState<T>>,
    el: JQuery
    set: (value: T) => void
}

// export type ObjInput<T extends Object> = {
//     [K in keyof T]: InputArgs<T[K]>
// }


export function build<T>(def: StringInput | NumberInput | DateInput | UploadInput<T> | RadioInput | BooleanInput | ComboInput<T>): Input<string> | Input<T | T[] | number | boolean> {
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

