import * as tags from "../tag/tags"
import * as models from "../models/_lib"
import * as core from "./_core"

export function stringInput(args: core.StringInput): core.Input<string> {
    const title = tags.label().text(args.title).addClass("ti-input")
    const input = args.multiline ? tags.itextarea().attr({ rows: args.multiline }) : (args.password ? tags.ipassword() : tags.itext())
    title.append(input)

    const model = models.createModel<models.DataState<string>>(args.nullable ? { state: "ok", value: null } : { state: "err" })

    input.on("change input", () => {
        model.write({ state: "ok", value: <string>input.val() })
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

    return { model, el: title, set }
}

export function passwordInput(args: core.StringInput) {
    return stringInput({ ...args, password: true })
}

export function multilineInput(args: core.StringInput) {
    return stringInput({ ...args, multiline: 20 })
}
