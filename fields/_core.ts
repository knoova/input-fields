import * as models from "../models/_lib"


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
