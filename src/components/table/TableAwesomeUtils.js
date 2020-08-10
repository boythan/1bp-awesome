export const isString = (variable) => {
    return typeof variable === ' string'
}

export const isObject = (object) => {
    return typeof object === 'object'
}


export const isArray = (array) => {
    return Array.isArray(array)
}