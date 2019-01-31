import * as models from "../models/_lib"

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

