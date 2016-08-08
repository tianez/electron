'use strict'

const request = require('superagent')
var AppUrl = 'http://apis.baidu.com/'
var apikey = 'c01ea8775f1c2620b7dd6f5b6bcec93b'
var get = function (url, cb) {
    if (window.navigator.onLine == true) {
        request
            .get(AppUrl + url)
            .set('apikey', apikey)
            .end(cb)
    } else {
        console.log('网络出现故障！')
    }
}

var post = function (url, info, cb) {
    console.log(window.navigator.onLine)
    if (window.navigator.onLine == true) {
        let now = Date.now()
        let key = SHA1(AppId + 'UZ' + AppKey + 'UZ' + now) + "." + now
        request
            .post(AppUrl + url)
            .set('X-APICloud-AppId', AppId)
            .set('X-APICloud-AppKey', key)
            .send(info)
            .end(cb)
    } else {
        console.log('网络出现故障！')
    }
}
var ApiStore = {
    get: get,
    post: post
}
module.exports = ApiStore
