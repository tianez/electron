var DB;
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//浏览器是否支持IndexedDB
if (window.indexedDB) {
    deleteDB('electron')
    var myDB = {
        name: 'electron',
        version: 1,
        tables: [{
            table: 'article',
            dbindex: [
                {
                    key: 'id',
                    name: 'id',
                    format: {
                        unique: true
                    }
                }, {
                    key: 'value',
                    name: 'value',
                    format: {
                        unique: false
                    }
                }]
        }]
    }
    openDB(myDB)
} else {
    alert('Sorry! Your browser doesn\'t support the IndexedDB.');
}

function openDB(myDB) {
    var version = myDB.version || 1;
    //打开数据库，如果没有，则创建
    var openRequest = window.indexedDB.open(myDB.name, version);
    new Promise(function (resolve, reject) {
        //DB版本设置或升级时回调
        openRequest.onupgradeneeded = function (e) {
            console.log('DB version changed to ' + version);
            var thisDB = e.target.result;
            if (!thisDB.objectStoreNames.contains(myDB.name)) {
                console.log("Create Object Store: " + myDB.name);
                // 创建存储对象(类似于关系数据库的表)， 还创建索引
                myDB.tables.map(function (d, index) {
                    let objectStore = thisDB.createObjectStore(d.table, {
                        autoIncrement: true
                    });
                    d.dbindex.map(function (t, i) {
                        objectStore.createIndex(t.key, t.name, t.format);
                    });
                })
            }
        }
        //DB成功打开回调
        openRequest.onsuccess = function (e) {
            console.log("Success!");
            //保存全局的数据库对象，后面会用到
            DB = e.target.result;
            resolve('Success!');
        }
        //DB打开失败回调
        openRequest.onerror = function (e) {
            console.dir(e);
            reject('error');
        }
    }).then(function (r) {
        console.log('Done: ' + r)
        // addPerson('article')
        // getAll('article')
        // getByKey('article', 1)
    }).catch(function (reason) {
        console.log('Failed: ' + reason)
    })
}

//添加一条记录
function addPerson(table) {
    var transaction = DB.transaction([table], "readwrite");
    var store = transaction.objectStore(table);
    //Define a person
    var data = {
        id: 'name',
        value: 'email',
        created: new Date()
    }
    var request = store.add(data);
    //var request = store.put(person, 2);
    request.onerror = function (e) {
        console.log("Error", e.target.error.name);
        //some type of error handler
    }
    request.onsuccess = function (e) {
        console.log(e);
        console.log("Woot! Did it.");
    }
}

//添加一条记录
function addone(id, value) {
    let table = 'article';
    var transaction = DB.transaction([table], "readwrite");
    var store = transaction.objectStore(table);
    //Define a person
    var data = {
        id: id,
        value: value,
        created: new Date()
    }
    var request = store.add(data);
    //var request = store.put(person, 2);
    request.onerror = function (e) {
        console.log("Error", e.target.error.name);
        //some type of error handler
    }
    request.onsuccess = function (e) {
        // console.log(e);
        console.log("Woot! Did it.");
    }
}

//获取所有记录
function getAll(mytable) {
    DB.transaction([mytable], "readonly").objectStore(mytable).openCursor().onsuccess = function (e) {
        var cursor = e.target.result;
        console.log(cursor);
    }
}

//通过KEY查询记录
function getByKey(table, key) {
    let transaction = DB.transaction([table], "readonly");
    let store = transaction.objectStore(table);
    let request = store.get(Number(key));
    request.onsuccess = function (e) {
        var result = e.target.result;
        console.dir(result);
    }
}

//通过索引查询记录
function getByNameIndex(table, name, value) {
    let transaction = DB.transaction([table], "readonly");
    let store = transaction.objectStore(table);
    let index = store.index(name);
    let request = index.get(value);
    request.onsuccess = function (e) {
        var result = e.target.result;
        console.dir(result);
    }
}

// 关闭数据库
function closeDB(DB) {
    DB.close();
}

// 删除数据库
function deleteDB(name) {
    indexedDB.deleteDatabase(name);
}
