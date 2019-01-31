import * as tags from "../tag/tags"
import * as models from "../models/_lib"
import * as core from "./_core"


export function radio(args: core.RadioInput): core.Input<boolean> {
    const wrapper = tags.div().append(tags.label().text(args.title)).addClass("ti-input")
    const input = tags.icheckbox()
    const model = models.createModel<models.DataState<boolean>>(args.nullable ? { state: "ok", value: null } : { state: "err" })
    const title = tags.label()
    const radio = tags.iradio().prop({ name: args.name }).click(() => {
        model.write({ state: "ok", value: radio.prop("checked") })
    })
    wrapper.append(title.append(radio, tags.span(), args.description))

    function set(value: boolean) {
        model.write({ state: "ok", value })
    }

    model.watch(data => {
        if (data.state == "ok") {
            if (data.value)
                radio.prop("checked")
            else
                radio.removeProp("checked")
        }
    })

    return { model, el: wrapper, set }
}