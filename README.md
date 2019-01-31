# Input fields


# Install

Just run `npm run knoova-input-fields`

# Input types
     type InputType = "string" | "password" | "mail" | "boolean" | "radio" | "upload" | "uploadImage" | "uploadPdf" | "number" | "combo"
# Input interfaces 
## Base input interface


    interface InputArgs<T> {
        type: InputType
        title: string
        description?: string
        nullable?: boolean
    }


## String input
    interface StringInput extends InputArgs<string> {
        multiline?: number
        password?: boolean
        minLength?: number
        maxLength?: number
    }


## Number input
    interface NumberInput extends InputArgs<string> {
        max?: number
        min?: number
    }


## Boolean input
    interface BooleanInput extends InputArgs<boolean> {
        mustBeTrue?: boolean
    }


## Date input
    interface DateInput extends InputArgs<string> {
        max?: string
        min?: string
    }


## Combo input
    interface ComboInput<T> extends InputArgs<T> {
        visualName: keyof T, 
        valueName: keyof T, 
        values: T[]
    }



#Field interface
    interface Input<T> {
        model: models.Model<models.DataState<T>>,
        el: JQuery
        set: (value: T) => void
    }

