'use strict';
var AppDispatcher = require('./AppDispatcher');

var ConfigActions = {

    init: function(data) {
        AppDispatcher.dispatch({
            actionType: 'init',
            data: data
        })
    },

    update: function(id, data) {
        AppDispatcher.dispatch({
            id: id,
            data: data
        })
    },
    updateAll: function(data) {
        AppDispatcher.dispatch({
            actionType: 'updateAll',
            data: data
        })
    },
    updateArticle: function(data) {
        AppDispatcher.dispatch({
            actionType: 'updateArticle',
            data: data
        })
    }
}

module.exports = ConfigActions;
