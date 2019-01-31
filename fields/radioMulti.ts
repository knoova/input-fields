import * as tags from "../tag/tags"
import * as models from "../models/_lib"
import * as core from "./_core"

export function radioMulti<T>(args: core.RadioInput, property: keyof T, values: T[]): core.Input<T> {
    const wrapper = tags.div().append(tags.label().text(args.title)).addClass("ti-input")
    const input = tags.icheckbox()
    const model = models.createModel<models.DataState<T>>(args.nullable ? { state: "ok", value: null } : { state: "err" })
    for (const value of values) {
        const title = tags.label()
        const radio = tags.iradio().prop({ name: args.name }).click(() => {
            if (radio.prop("checked"))
                model.write({ state: "ok", value })
        })
        wrapper.append(title.append(radio, tags.span(), value[property] as any as string))
    }

    function set(data: T){}

    return { model, el: wrapper, set }
}