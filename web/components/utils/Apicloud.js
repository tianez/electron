'use strict'
const request = require('superagent')
const AppId = 'A6984077246442'
const AppKey = '7F7872C0-8EB2-D116-C9AF-AF02A4B65BA0'
const AppUrl = 'https://d.apicloud.com/mcm/api/'
var get = function(url, filter, cb) {
    if (window.navigator.onLine == true) {
        let now = Date.now()
        let key = SHA1(AppId + 'UZ' + AppKey + 'UZ' + now) + "." + now
        let token = storedb('user').find() ? storedb('user').find()[0].id : ''
        token = ''
        request
            .get(AppUrl + url)
            .set('X-APICloud-AppId', AppId)
            .set('X-APICloud-AppKey', key)
            .set('authorization', token)
            .query({
                filter: JSON.stringify(filter)
            })
            .end(cb)
    } else {
        console.log('网络出现故障！')
    }
}

var post = function(url, info, cb) {
    if (window.navigator.onLine == true) {
        let now = Date.now()
        let key = SHA1(AppId + 'UZ' + AppKey + 'UZ' + now) + "." + now
        let token = storedb('user').find() ? storedb('user').find()[0].id : ''
        request
            .post(AppUrl + url)
            .set('X-APICloud-AppId', AppId)
            .set('X-APICloud-AppKey', key)
            .set('authorization', token)
            .send(info)
            .end(cb)
    } else {
        console.log('网络出现故障！')
    }
}
var Apicloud = {
    get: get,
    post: post
}
module.exports = Apicloud
