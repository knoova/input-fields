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

export type InputType = "string" | "password" | "mail" | "boolean" | "radio" | "upload" | "uploadImage" | "uploadPdf" | "number" | "combo"


export interface InputArgs<T> {
    type: InputType
    title: string
    description?: string
    nullable?: boolean
}


export interface StringInput extends InputArgs<string> {
    multiline?: number
    password?: boolean
    minLength?: number
    maxLength?: number
}

export interface NumberInput extends InputArgs<string> {
    max?: number
    min?: number
}


export interface DateInput extends InputArgs<string> {
    max?: string
    min?: string
}

export interface UploadInput extends InputArgs<string[]> {
    files?: string[]
}

export interface RadioInput extends InputArgs<boolean> {
    name: string
}

export interface BooleanInput extends InputArgs<boolean> {
    mustBeTrue?: boolean
}

export interface ComboInput<T> extends InputArgs<T> {
    visualName: keyof T,
    valueName: keyof T,
    values: T[]
}

export interface Input<T> {
    model: models.Model<models.DataState<T>>,
    el: JQuery
    set: (value: T) => void
}

export type ObjInput<T extends Object> = {
    [K in keyof T]: InputArgs<T[K]>
}


export function build(def: InputArgs<string>) {
    switch (def.type) {
        case "string": {
            return string.stringInput(def, validator.validate("string"))
        }
    }
}

