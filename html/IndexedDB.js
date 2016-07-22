var DB;
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//浏览器是否支持IndexedDB
if (window.indexedDB) {
    deleteDB('people')
    var myDB = {
        name: 'people',
        version: 3,
        tables: [{
            table: 'mytable',
            dbindex: [{
                key: 'name',
                name: 'name',
                format: {
                    unique: false
                }
            }, {
                key: 'email',
                name: 'email',
                format: {
                    unique: false
                }
            }]
        }, {
            table: 'mytable2',
            dbindex: [{
                key: 'name121',
                name: 'name',
                format: {
                    unique: false
                }
            }, {
                key: 'email2',
                name: 'email',
                format: {
                    unique: false
                }
            }]
        }]
    }

    if (openDB(myDB)) {
        addPerson()
    } else {
        console.log(1212);
    }
} else {
    alert('Sorry! Your browser doesn\'t support the IndexedDB.');
}

function openDB(myDB) {
    var version = myDB.version || 1;
    //打开数据库，如果没有，则创建
    var openRequest = window.indexedDB.open(myDB.name, version);
    console.log(987);
    //DB版本设置或升级时回调
    openRequest.onupgradeneeded = function(e) {
        console.log('DB version changed to ' + version);
        var thisDB = e.target.result;
        if (!thisDB.objectStoreNames.contains(myDB.name)) {
            console.log("Create Object Store: people.");
            // 创建存储对象(类似于关系数据库的表)， 还创建索引
            myDB.tables.map(function(d, index) {
                let objectStore = thisDB.createObjectStore(d.table, {
                    autoIncrement: true
                });
                d.dbindex.map(function(t, i) {
                    objectStore.createIndex(t.key, t.name, t.format);
                })
            })
        }
        return true
    }
    //DB成功打开回调
    openRequest.onsuccess = function(e) {
        console.log("Success!");
        //保存全局的数据库对象，后面会用到
        DB = e.target.result;
        return true
    }

    //DB打开失败回调
    openRequest.onerror = function(e) {
        console.log("Error");
        console.dir(e);
        return false
    }
}

//添加一条记录
function addPerson(e) {
    var transaction = DB.transaction([myDB.name], "readwrite");
    var store = transaction.objectStore("people");
    //Define a person
    var data = {
            name: 'name',
            email: 'email',
            created: new Date()
        }
        //Perform the add
    var request = store.add(data);
    //var request = store.put(person, 2);
    request.onerror = function(e) {
        console.log("Error", e.target.error.name);
        //some type of error handler
    }
    request.onsuccess = function(e) {
        console.log(e);
        console.log("Woot! Did it.");
    }
}

//获取所有记录
function getPeople(e) {
    db.transaction(["people"], "readonly").objectStore("people").openCursor().onsuccess = function(e) {
        var cursor = e.target.result;
    }
}

//通过KEY查询记录
function getPerson(e) {
    var key = document.querySelector("#key").value;
    if (key === "" || isNaN(key)) return;
    var transaction = db.transaction(["people"], "readonly");
    var store = transaction.objectStore("people");
    var request = store.get(Number(key));
    request.onsuccess = function(e) {
        var result = e.target.result;
        console.dir(result);
    }
}

//通过索引查询记录
function getPeopleByNameIndex(e) {
    var name = document.querySelector("#name1").value;
    var transaction = db.transaction(["people"], "readonly");
    var store = transaction.objectStore("people");
    var index = store.index("name");
    //name is some value
    var request = index.get(name);
}

// 关闭数据库
function closeDB(DB) {
    DB.close();
}

// 删除数据库
function deleteDB(name) {
    indexedDB.deleteDatabase(name);
}
