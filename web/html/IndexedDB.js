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
    //DB版本设置或升级时回调
    openRequest.onupgradeneeded = function(e) {
            console.log('DB version changed to ' + version);
            var thisDB = e.target.result;
            if (!thisDB.objectStoreNames.contains(myDB.name)) {
                console.log("Create Object Store: " + myDB.name);
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
        addPerson('mytable')
        getAll('mytable')
        getByKey('mytable', 1)
        getByNameIndex('mytable', 'name')
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
function addPerson(table) {
    var transaction = DB.transaction([table], "readwrite");
    var store = transaction.objectStore(table);
    //Define a person
    var data = {
        name: 'name',
        email: 'email',
        created: new Date()
    }
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
function getAll(mytable) {
    DB.transaction([mytable], "readonly").objectStore(mytable).openCursor().onsuccess = function(e) {
        var cursor = e.target.result;
        console.log(cursor);
    }
}

//通过KEY查询记录
function getByKey(table, key) {
    let transaction = DB.transaction([table], "readonly");
    let store = transaction.objectStore(table);
    let request = store.get(Number(key));
    request.onsuccess = function(e) {
        var result = e.target.result;
        console.dir(result);
    }
}

//通过索引查询记录
function getByNameIndex(table, name) {
    let transaction = DB.transaction([table], "readonly");
    let store = transaction.objectStore(table);
    let index = store.index(name);
    let request = index.get(name);
    request.onsuccess = function(e) {
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

var websqlDB = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
var msg;
websqlDB.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
    tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
    tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")');
    tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS2 (id unique, log)');
    tx.executeSql('INSERT INTO LOGS2 (id, log) VALUES (2, "logmsg")');
    msg = '<p>Log message created and row inserted.</p>';
    console.log(msg);
});