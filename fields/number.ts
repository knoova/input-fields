import * as tags from "../tag/tags"
import * as models from "../models/_lib"
import * as core from "./_core"

export function numberInput(args: core.NumberInput): core.Input<number> {
    const title = tags.label().text(args.title).addClass("ti-input")
    const input = tags.inumber()

    if (args.max)
        tags.inumber().attr({ max: args.max })
    if (args.min)
        tags.inumber().attr({ max: args.min })

    title.append(input)

    const model = models.createModel<models.DataState<number>>(args.nullable ? { state: "ok", value: null } : { state: "err" })

    input.on("change input", () => {
        model.write({ state: "ok", value: <number>input.val() })
    })

    function set(val: number) {
        model.write({ state: "ok", value: val })
        input.val(val)
    }


    return { model, el: title, set }
}