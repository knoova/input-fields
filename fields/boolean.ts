import * as tags from "../tag/tags"
import * as models from "../models/_lib"
import * as core from "./_core"
import { Validator } from "./validator/_lib";

export function booleanInput(args: core.BooleanInput, validator: Validator<boolean>): core.Input<boolean> {
    const title = tags.label().text(args.title).addClass("ti-input")
    const input = tags.icheckbox()
    title.append(input, tags.span())

    const model = models.createModel<models.DataState<boolean>>(validator(args, null))

    input.on("click", () => {
        model.write(validator(args, !!<boolean>input.prop('checked')))
    })

    function set(value: boolean) {
        model.write(validator(args, value))
    }

    model.watch(data => {
        if (data.state == "ok") {
            input.prop("checked", data.value)
        }
    })

    return { model, el: title, set }
}