'use strict';

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ('withCredentials' in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest !== 'undefined') {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// function ajaxUpload({url, name, cors, file, onProgress, onLoad, onError, withCredentials}) {
function ajaxUpload($data) {
  var data = new FormData();
  data.append($data.name, $data.file);
  var xhr = createCORSRequest('post', $data.url, $data.cors);
  xhr.withCredentials = $data.withCredentials;
  xhr.upload.addEventListener('progress', $data.onProgress, false);
  xhr.onload = $data.onLoad;
  xhr.onerror = $data.onError;
  xhr.send(data);

  return xhr;
}

module.exports = function(args) {
  return ajaxUpload(args);
}