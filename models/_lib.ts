
export type DataState<T> = {
    state: "ok"
    value: T
} | {
        state: "err"
        message?: string
    }

export interface Model<T> {
    write(data: T): void,
    read(): T,
    watch(Watcher: (data: T) => void): void
}

export function createModel<T>(starter: T): Model<T> {
    let value: T | undefined = undefined
    let watcher: undefined | ((data: T) => void) = undefined

    function write(data: T) {
        value = data;
        if (watcher)
            watcher(value)
    }

    function read(): T {
        return value
    }

    function watch(Watcher: (data: T) => void) {
        watcher = Watcher
    }

    if (starter) {
        write(starter)
    }

    return { write, read, watch }
}