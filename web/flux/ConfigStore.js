'use strict';
var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'config';

var _todos = {
    transition: 'example',
    msg: '',
    msg_n: 0,
    loading: true,
    title: '王的理想乡',
    pics: ''
};

var ConfigStore = assign({}, EventEmitter.prototype, {

    getAll: function() {
        return _todos;
    },

    get: function(id) {
        return _todos[id];
    },

    getMsg: function() {
        let msg = _todos['msg']
        if (_todos['msg'] != '') {
            _todos['msg'] = ''
        }
        return msg
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

module.exports = ConfigStore;

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    let data = action.data
    if (_todos[action.id] == data) {
        return
    }
    switch (action.actionType) {
        case 'updateAll':
            for (let key in data) {
                update(key, data[key])
            }
            break;
        case 'updateArticle':
            update(data.id, data)
            update('title', data.title)
            break;
        default:
            update(action.id, action.data)

    }
    ConfigStore.emitChange()
})

function update(id, data) {
    _todos[id] = data
}
