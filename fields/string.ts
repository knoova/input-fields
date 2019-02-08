import * as tags from "../tag/tags"
import * as models from "../models/_lib"
import * as core from "./_core"
import * as validator from "./validator/_lib"

export function stringInput(args: core.StringInput, validator: validator.Validator<string>): core.Input<string> {
    const wrapper = tags.label().text(args.title).addClass("ti-input")
    const input = args.multiline ? tags.itextarea().attr({ rows: args.multiline }) : (args.password ? tags.ipassword() : tags.itext())
    wrapper.append(input)

    const model = models.createModel<models.DataState<string>>(args.nullable ? { state: "ok", value: null } : { state: "err" })

    input.on("change input", () => {
        model.write(validator(args, <string>input.val()))
    })

    function set(val: string) {
        if (!val)
            input.val("")
        else
            model.write({ state: "ok", value: val })
    }

    model.watch(val => {
        if (val.state == "ok") {
            input.val(val.value)
        }
    })

    return { model, el: wrapper, set }
}

export function passwordInput(args: core.StringInput, validator: validator.Validator<string>) {
    return stringInput({ ...args, password: true }, validator)
}

export function multilineInput(args: core.StringInput, validator: validator.Validator<string>) {
    return stringInput({ ...args, multiline: 20 }, validator)
}
