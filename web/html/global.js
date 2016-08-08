/**
 * action
 */
window.ConfigActions = require('../flux/ConfigActions')

/**
 * store
 */
window.ConfigStore = require('../flux/ConfigStore')

//获取url参数数组
window.get = function (url) {
    if (!url) {
        var url = window.document.location.href.toString();
    }
    var u = url.split("?");
    if (typeof (u[1]) == "string") {
        u = u[1].split("&");
        var get = {};
        for (var i in u) {
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
}

//2个对象合并
window.extend = function (o, n, override) {
    for (var p in n)
        if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)) o[p] = n[p];
}

window.GetRequest = function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
