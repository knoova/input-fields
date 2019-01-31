import * as tags from "../tag/tags"
import * as models from "../models/_lib"
import * as core from "./_core"
import * as driver from "./number"


type ObjectId = { $oid: string } | null;

export function date(
    args: core.DateInput,
) {
    const yearSpan = 100;
    const completeDate = "T00:00:00.000Z"

    const me = {};

    const buildingDate = new Date()
    const minDay = 1
    let maxDay = 31
    const minMonth = 1
    const maxMonth = 12
    const minYear = buildingDate.getFullYear() - 100
    const maxYear = buildingDate.getFullYear() + 100


    const monthsArray = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre"]

    const valueMod = models.createModel<models.DataState<string>>(args.nullable ? { state: "ok", value: null } : { state: "err" });

    const title = tags.label().text(args.title)
    const calendar = tags.div().addClass("ti-input-data-calendar")
    const dayDriver = driver.numberInput({ type: "number", title: "" })
    dayDriver.el.attr({ placeholder: "dd" })
    const monthDriver = driver.numberInput({ type: "number", title: "" })
    monthDriver.el.attr({ placeholder: "mm" })
    const yearDriver = driver.numberInput({ type: "number", title: "" })
    yearDriver.el.attr({ placeholder: "yyyy" })
    const calendarFields = tags.div().addClass("ti-input-data-calendar-fields")

    const testMobile = tags.span().addClass("only-mobile-test")

    const left = tags.div().addClass("ti-input-data-calendar-left")
    const right = tags.div().addClass("ti-input-data-calendar-right").append(tags.button().on("click", () => {
        setValue(null)
    }))



    function buildFields() {
        const daywrapper = tags.div().addClass("ti-input-data-calendar-fields-wrapper").addClass("flex-2")
        const dayTitle = tags.div().addClass("ti-input-data-calendar-fields-title").html("Giorno")
        const dayField = tags.div().addClass("ti-input-data-calendar-fields-field")

        daywrapper.append(dayTitle, dayField.append(dayDriver.el))

        const monthwrapper = tags.div().addClass("ti-input-data-calendar-fields-wrapper").addClass("flex-2")
        const monthTitle = tags.div().addClass("ti-input-data-calendar-fields-title").html("Mese")
        const monthField = tags.div().addClass("ti-input-data-calendar-fields-field")

        monthwrapper.append(monthTitle, monthField.append(monthDriver.el))

        const yearwrapper = tags.div().addClass("ti-input-data-calendar-fields-wrapper").addClass("flex-4")
        const yearTitle = tags.div().addClass("ti-input-data-calendar-fields-title").html("Anno")
        const yearField = tags.div().addClass("ti-input-data-calendar-fields-field")

        yearwrapper.append(yearTitle, yearField.append(yearDriver.el))


       


        const sep1 = tags.div().addClass("ti-input-data-calendar-fields-wrapper").addClass("flex-1").append(
            tags.div().addClass("ti-input-data-calendar-fields-title"),
            tags.div().addClass("ti-input-data-calendar-fields-separator").append(tags.p().html("/"))
        )
        const sep2 = tags.div().addClass("ti-input-data-calendar-fields-wrapper").addClass("flex-1").append(
            tags.div().addClass("ti-input-data-calendar-fields-title"),
            tags.div().addClass("ti-input-data-calendar-fields-separator").append(tags.p().html("/"))
        )

        return calendarFields.append(daywrapper, sep1, monthwrapper, sep2, yearwrapper)

    }

    let bufferValue: string | null = null



    function isMobile() {
        return testMobile.is(":visible")
    }



    function setValue(value: string | null, stop?: boolean) {
        valueMod.write({ state: "ok", value: value ? subsT0(value) : value })
        bufferValue = value ? subsT0(value) : value
        if (!stop) {
            console.log("set value date", valueMod.read().value)
            const thisDate = new Date(value)
            dayDriver.set(thisDate.getDate())
            monthDriver.set((thisDate.getMonth() + 1))
            yearDriver.set(thisDate.getFullYear())
        }
    }


    dayDriver.model.watch(day => {
        console.log(day)
        if (!dayDriver.model.read().value && !monthDriver.model.read().value && !yearDriver.model.read().value) {
            console.log("was null")
            setValue(null, true)
            return
        }
        else if (dayDriver.model.read().value && monthDriver.model.read().value && yearDriver.model.read().value) {
            const date = yearDriver.model.read().value + "-" +
                ((monthDriver.model.read().value < 10) ? "0" + monthDriver.model.read().value : monthDriver.model.read().value) + "-" +
                ((day.value < 10) ? "0" + day.value : day.value) + completeDate
            setValue(date, true)
        }
    })

    monthDriver.model.watch(month => {
        console.log(month)
        if (!dayDriver.model.read().value && !monthDriver.model.read().value && !yearDriver.model.read().value) {
            console.log("was null")
            setValue(null, true)
            return
        }
        else if (dayDriver.model.read().value && monthDriver.model.read().value && yearDriver.model.read().value) {
            const date = yearDriver.model.read().value + "-" +
                ((month.value < 10) ? "0" + month.value : month.value) + "-" +
                ((dayDriver.model.read().value < 10) ? "0" + dayDriver.model.read().value : dayDriver.model.read().value) + completeDate
            setValue(date, true)
        }
    })

    yearDriver.model.watch(year => {
        console.log(year)
        if (!dayDriver.model.read().value && !monthDriver.model.read().value && !yearDriver.model.read().value) {
            console.log("was null")
            setValue(null, true)
            return
        }
        else if (dayDriver.model.read().value && monthDriver.model.read().value && yearDriver.model.read().value) {
            const date = year.value + "-" +
                ((monthDriver.model.read().value < 10) ? "0" + monthDriver.model.read().value : monthDriver.model.read().value) + "-" +
                ((dayDriver.model.read().value < 10) ? "0" + dayDriver.model.read().value : dayDriver.model.read().value) + completeDate
            setValue(date, true)
        }
    })


    // valueMod.watch((a) => {
    //     if (a.state == "ok") {
    //         if (a.value) {
    //             const thisDate = new Date(a.value)
    //            // buildCalendarBody(thisDate.toISOString(), calendarElement)
    //             dayDriver.model.write({ state: "ok", value: thisDate.getDate().toString() })
    //             monthDriver.model.write({ state: "ok", value: (thisDate.getMonth() + 1).toString() })
    //             yearDriver.model.write({ state: "ok", value: thisDate.getFullYear().toString() })
    //         }
    //         else {
    //             //buildCalendarBody(subsT0(new Date().toISOString()), calendarElement)
    //             dayDriver.model.write({ state: "ok", value: "" })
    //             monthDriver.model.write({ state: "ok", value: "" })
    //             yearDriver.model.write({ state: "ok", value: "" })
    //         }
    //     }
    // })

    function haveFocus(): boolean {
        if (dayDriver.el.is(":focus") || monthDriver.el.is(":focus") || yearDriver.el.is(":focus"))
            return true
        return false
    }


    function wrapInOrder(): JQuery {
        buildFields()
        //buildCalendarBody(subsT0(new Date().toISOString()), calendarElement)
        return tags.div().append(title, calendar.append(left.append(calendarFields, testMobile), args.nullable ? right : null)).addClass("ti-input")
    }

    function subsT0(date: string): string {
        const d = date.slice(0, 10)
        return d + completeDate
    }

    return {
        el: wrapInOrder(),
        model: valueMod,
        set: setValue
    }
}
