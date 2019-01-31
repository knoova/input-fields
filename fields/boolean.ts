import * as tags from "../tag/tags"
import * as models from "../models/_lib"
import * as core from "./_core"

export function booleanInput(args: core.BooleanInput): core.Input<boolean> {
    const title = tags.label().text(args.title).addClass("ti-input")
    const input = tags.icheckbox()
    title.append(input, tags.span())

    const model = models.createModel<models.DataState<boolean>>({ state: args.mustBeTrue ? "err" : "ok", value: false })

    input.on("click", () => {
        model.write({ state: "ok", value: !!<boolean>input.prop('checked') })
    })

    function set(value: boolean) {
        model.write({ state: "ok", value })
    }

    model.watch(data => {
        if (data.state == "ok") {
            input.prop("checked", data.value)
        }
    })

    return { model, el: title, set }
}