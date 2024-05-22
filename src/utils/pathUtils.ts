export const toPath = (pathPrefix?: string, key?: string) => {
    if (pathPrefix && key) {
        return `${pathPrefix}.${key}`
    } else if (key) {
        return `${key}`
    } else {
        return `${pathPrefix}`
    }
}
