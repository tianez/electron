'use strict'

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest()
    if ('withCredentials' in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true)
    } else if (typeof XDomainRequest !== 'undefined') {
        // XDomainRequest for IE.
        xhr = new XDomainRequest()
        xhr.open(method, url)
    } else {
        // CORS not supported.
        xhr = null
    }
    return xhr
}

// function ajaxUpload({url, name, cors, file, onProgress, onLoad, onError, withCredentials}) {
function ajaxUpload(data) {
    var formData = new FormData();
    if (data.token !== null && data.token !== undefined) formData.append('token', data.token)
    if (data.key !== null && data.key !== undefined) formData.append('key', data.key)
    formData.append(data.name, data.file)
    var xhr = createCORSRequest('post', data.url, data.cors)
    xhr.withCredentials = data.withCredentials
    xhr.upload.addEventListener('progress', data.onProgress, false)
    xhr.onload = data.onLoad
    xhr.onerror = data.onError
    xhr.send(formData)
    return xhr
}

module.exports = function(args) {
    return ajaxUpload(args)
}
