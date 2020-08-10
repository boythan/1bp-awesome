import _ from "lodash"

const getBase64ImageFromUrl = async (imageUrl) => {

    if (!imageUrl || _.isEmpty(imageUrl)) {
        return Promise.reject("Url is empty!")
    }
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var res = await fetch(proxyurl + imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.addEventListener("load", function () {
            resolve(reader.result);
        }, false);

        reader.onerror = () => {
            return reject(this);
        };
        reader.readAsDataURL(blob);
    })


}

const getBase64ImageInImageData = async (imageUrl) => {
    if (!imageUrl || _.isEmpty(imageUrl)) {
        return ""
    }
    const base64String = await getBase64ImageFromUrl(imageUrl);
    const jpgBase64 = base64String.replace("data:application/octet-stream;base64", "data:image/jpg;base64")
    return jpgBase64;

}
const getBase64ListFromUrls = async (imageUrls) => {
    let base64List = []
    for (let index = 0; index < imageUrls.length; index++) {
        const base64String = await getBase64ImageFromUrl(imageUrls[index]);
        const jpgBase64 = base64String.replace("data:application/octet-stream;base64", "data:image/jpg;base64")
        base64List.push(jpgBase64)
    }
    return base64List
}

function getBase64FromLocal(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function preloadImage(imageList) {
    imageList.forEach(image => {
        const newImage = new Image();
        newImage.src = image;
        window[image] = newImage;
    })
}

export default { getBase64ImageFromUrl, getBase64ListFromUrls, getBase64FromLocal, getBase64ImageInImageData, preloadImage }