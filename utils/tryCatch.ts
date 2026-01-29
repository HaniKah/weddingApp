export function tryCatch<T>(promise: Promise<T>): Promise<[undefined, T] | [Error]> {
    return promise.then(data => {
        return [undefined, data] as [undefined, T]
    }).catch(err => [err])
}