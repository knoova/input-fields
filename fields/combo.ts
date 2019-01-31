import * as tags from "../tag/tags"
import * as models from "../models/_lib"
import * as core from "./_core"

export function combo<T>(args: core.ComboInput<T>): core.Input<string> {
    const wrapper = tags.div().append(tags.label().text(args.title)).addClass("ti-input")
    const comboBox = tags.select()
    const model = models.createModel<models.DataState<string>>(args.nullable ? { state: "ok", value: null } : { state: "err" })
    const trueCombo = <HTMLSelectElement>comboBox[0]
    for (const value of args.values) {
        comboBox.append(tags.option().attr({ value: value[args.valueName] }).html(value[args.visualName] as any as string))
    }

    comboBox.change((e) => {
        const v = trueCombo.value;
        model.write({ state: "ok", value: v as any as string })
    });

    function set(data: string) {
        model.write({ state: "ok", value: data as any as string })
        console.log(data)
        comboBox.val(data)
    }

    wrapper.append(comboBox)

    return { model, el: wrapper, set }
}



export function search<T extends { _id: string, value: string }>(args: Partial<core.ComboInput<T>>, values: T[]): core.Input<string> {
    const wrapper = tags.div().append(tags.label().text(args.title))
    const comboBox = tags.select()
    const model = models.createModel<models.DataState<string>>(args.nullable ? { state: "ok", value: null } : { state: "err" })
    const trueCombo = <HTMLSelectElement>comboBox[0]
    for (const value of values) {
        comboBox.append(tags.option().attr({ value: value._id }).html(value.value))
    }

    comboBox.change((e) => {
        const v = trueCombo.value;
        model.write({ state: "ok", value: v })
    });

    function set(data: string) {
        model.write({ state: "ok", value: data })
        comboBox.val(data)
    }

    wrapper.append(comboBox)

    return { model, el: wrapper, set }
}