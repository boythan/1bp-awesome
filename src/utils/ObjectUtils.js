import _ from "lodash";

const getValueFromStringKey = (object, keyString) => {
    const keyList = keyString.split(".")
    if (keyList.length === 0) {
        return object[keyString]
    }
    let objectResult = object
    keyList.forEach(key => {
        objectResult = objectResult[key]
    })

    return objectResult
}

const mapObjectToArray = (object) => {
    if (!object) {
        return []
    }
    let arrayResult = [];
    for (let key in object) {
        arrayResult.push(object[key])
    }
    return arrayResult
}

const findItemFromId = (list, id) => {
    if (!list || list.length === 0) {
        return {}
    }

    return _.filter(list, pro => pro.id === id)?.[0]
}

const sliceArrayToMui = (bigArray = [], numberOfItem = 10) => {
    let arrayOfArrays = [];
    for (var i = 0; i < bigArray.length; i += numberOfItem) {
        arrayOfArrays.push(bigArray.slice(i, i + numberOfItem));
    }

    return arrayOfArrays

}
export default { getValueFromStringKey, mapObjectToArray, findItemFromId, sliceArrayToMui }
