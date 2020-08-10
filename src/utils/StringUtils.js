import _ from 'lodash'

const getFullName = (data) => {
    if (!data) {
        return ""
    }

    return (data?.firstname ?? "N/A") + " " + (data?.lastname ?? "N/A")
}

const moneyFormat = n => `${n ? Number(n).toFixed(0).replace(/./g, (c, i, a) => (i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? `,${c}` : c)) : '0'}`;
const moneyFormatFixed2 = n => `${n ? Number(n).toFixed(2).replace(/./g, (c, i, a) => (i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? `,${c}` : c)) : '0'}`;

const moneyThaiFormat = (number) => {
    if (!number) {
        return "฿ " + 0
    }
    if (number < 0) {
        return "฿ -" + moneyFormat(Math.abs(number) + "")
    }
    return "฿ " + moneyFormat(number)
}

const moneyThaiFormatFixed2 = (number) => {
    if (!number) {
        return "฿ " + 0
    }
    return "฿ " + moneyFormatFixed2(number)
}

const isAllDigit = (string) => {
    return /^\d+$/.test(string)
}

const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


function convertCsvJSON(csv) {
    const lines = _.split(csv, '\n')
    const result = []
    const headers = _.split(lines[0], ',')
    for (let i = 1; i < lines.length; i++) {
        let validObject = false
        if (!lines[i])
            continue
        let objectItem = {}
        const currentline = lines[i].split(',')
        headers.forEach((header, index) => {

            const currentHeader = header.replace(/\W/g, '')
            const currentLineIndex = currentline[index]
            let currentValue = currentline[index]?.replace(/\W/g, '')
            if (currentLineIndex.includes("-")) {
                currentValue = "-" + currentValue
            }
            if (!_.isEmpty(currentValue)) {
                validObject = true
                objectItem[currentHeader] = currentValue
            }
        })
        if (validObject) {
            result.push(objectItem)
        }
    }
    return result
}

const getFullAddressFromShipping = (shipping) => {
    if (!shipping) {
        return ""
    }
    const arrayAddress = [shipping.address, shipping?.province?.name, shipping?.city?.name, shipping?.postcode]
    return _.join(arrayAddress, ", ")
}

const getExtensionFromFilename = (filename) => {
    if (!filename) { return '' }
    return filename?.slice((filename?.lastIndexOf(".") - 1 >>> 0) + 2);
}

function generateCode(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

export default {
    moneyFormat,
    moneyThaiFormat,
    getFullName,
    isAllDigit,
    validateEmail,
    moneyThaiFormatFixed2,
    convertCsvJSON,
    getFullAddressFromShipping,
    getExtensionFromFilename,
    generateCode,
    getRandomNumber,
    getRandomColor
}
