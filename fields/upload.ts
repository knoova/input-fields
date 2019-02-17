import * as tags from "../tag/tags"
import * as models from "../models/_lib"
import * as core from "./_core"

export function upload<T>(args: core.UploadInput<T>): core.Input<T> {
    const suffix = Math.floor(Math.random() * 1000000).toString()
    const label = tags.label().prop({ for: "buttonUpload" + suffix }).addClass("ti-custom-file-upload")
    const innerLabel = tags.span().text(args.title)
    const button = tags.ifile().attr({ id: "buttonUpload" + suffix })
    const model = models.createModel<models.DataState<T>>(args.nullable ? { state: "ok", value: null } : { state: "err" })

    if (args.files && args.files.length)
        button.attr({ accept: args.files.join(",") })
    const preview = tags.img()
    const wrapper = tags.div().append(label.append(innerLabel, preview), button).addClass("ti-input")
    button.change(() => {
        var reader = new FileReader();
        const file = (<HTMLInputElement>button[0]).files[0]

        const name = file.name


        reader.onloadend = e => {
            innerLabel.text("Uploading - WAIT!")
            model.write({ state: "err", message: "Uploading" })
        }

        function imageIsLoaded(e: any) {
            preview.attr({ src: e.target.result })
            args.api({ image: e.target.result, name }).then(val => {
                console.log("upload val", val)
                //preview.attr({ src: val.file })
                innerLabel.text("Uploaded")
                model.write({ state: "ok", value: val })
            })
        };

        if (file) {
            reader.onload = imageIsLoaded
            reader.readAsDataURL(file)
            console.log(file)
        } else {
            //preview.attr({ src: reader.result })
        }
    })

    function set(file: T) {
        model.write({ state: "ok", value: file })
    }

    model.watch(data => {
        if (data.state == "ok")
            preview.attr({ src: data.value })
    })

    return { model, el: wrapper, set }
}


export function multisize<T>(args: core.UploadInput<T>): core.Input<T> {
    const suffix = Math.floor(Math.random() * 1000000).toString()
    const label = tags.label().prop({ for: "buttonUpload" + suffix }).addClass("ti-custom-file-upload")
    const innerLabel = tags.span().text(args.title)
    const button = tags.ifile().attr({ id: "buttonUpload" + suffix })
    const model = models.createModel<models.DataState<T>>(args.nullable ? { state: "ok", value: null } : { state: "err" })

    if (args.files && args.files.length)
        button.attr({ accept: args.files.join(",") })
    const preview = tags.img()
    const wrapper = tags.div().append(label.append(innerLabel, preview), button).addClass("ti-input")
    button.change(() => {
        var reader = new FileReader();
        const file = (<HTMLInputElement>button[0]).files[0]

        const name = file.name


        reader.onloadend = e => {
            innerLabel.text("Uploading - WAIT!")
            model.write({ state: "err", message: "Uploading" })
        }

        function imageIsLoaded(e: any) {
            preview.attr({ src: e.target.result })
            args.api({ image: e.target.result, name }).then(val => {
                //preview.attr({ src: val.file })
                innerLabel.text("Uploaded")
                model.write({ state: "ok", value: val })
            })
        };

        if (file) {
            reader.onload = imageIsLoaded
            reader.readAsDataURL(file)
            console.log(file)
        } else {
            //preview.attr({ src: reader.result })
        }
    })

    function set(url: T) {
        model.write({ state: "ok", value: url })
    }


    return { model, el: wrapper, set }
}



export function uploadMulti<T>(args: core.UploadInput<T> ): core.Input<T[]> {
    const suffix = Math.floor(Math.random() * 1000000).toString()
    const label = tags.label().prop({ for: "buttonUpload" + suffix }).addClass("ti-custom-file-upload")
    const innerLabel = tags.span().text(args.title)
    const button = tags.ifile().attr({ id: "buttonUpload" + suffix, multiple: true })
    const model = models.createModel<models.DataState<T[]>>(args.nullable ? { state: "ok", value: [] } : { state: "err" })

    if (args.files && args.files.length)
        button.attr({ accept: args.files.join(",") })
    const wrapper = tags.div().append(label.append(innerLabel), button).addClass("ti-input")
    button.change(() => {
        // const file = (<HTMLInputElement>button[0]).files[0]

        const url: T[] = []

        const tot = (<HTMLInputElement>button[0]).files.length
        let actualUploaded = 0

        for (let i = 0; i < tot; i++) {
            const reader = new FileReader();
            const file = (<HTMLInputElement>button[0]).files.item(i)
            const name = file.name

            function imageIsLoaded(e: any) {
                innerLabel.text("Uploading " + (i + 1).toString() + " di " + tot + "- WAIT!")
                args.api({ image: e.target.result, name }).then(val => {
                    //preview.attr({ src: val.file })
                    actualUploaded++
                    innerLabel.text("Uploaded " + actualUploaded + " di " + tot + "- WAIT!")
                    url.push(val)
                    if (actualUploaded == tot) {
                        innerLabel.text("Uploaded all")
                        model.write({ state: "ok", value: url })
                    }
                    else {
                        innerLabel.text("Uploaded " + actualUploaded + " di " + tot + "- WAIT!")
                        model.write({ state: "err", message: "uploading" })
                    }
                })
            };

            if (file) {
                reader.onloadend = imageIsLoaded
                reader.readAsDataURL(file)
            } else {
            }
        }


    })

    function set(url: T[]) {
        model.write({ state: "ok", value: url })
    }

    model.watch(data => {
        if (data.state == "ok")
            console.log(data.value)
    })

    return { model, el: wrapper, set }
}