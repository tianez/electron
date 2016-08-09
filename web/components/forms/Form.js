'use strict'

const Apicloud = require('../utils/Apicloud')
const classNames = require('classNames')

var Form = React.createClass({
    getDefaultProps: function() {
        return {
            apiSubmit: true
        }
    },
    handleSubmit: function(e) {
        e.preventDefault();
        if (this.props.locked) {
            return;
        }
         console.log(this.props.info);
        if (this.props.apiSubmit) {
            Apicloud.post(this.props.action, this.props.info, function(err, res) {
                let data = JSON.parse(res.text)
                console.log(res);
                if (data.error) {
                    ConfigActions.update('msg', data.error.message)
                } else {
                    this.props.onSubmit(data)
                }
            }.bind(this))
        } else {
            this.props.onSubmit(e)
        }
    },
    render: function() {
        return (
            React.createElement('form', {
                    className: 'form-fields form-horizontal',
                    role: 'form',
                    // encType: 'multipart/form-data',
                    onSubmit: this.handleSubmit
                },
                React.createElement('fieldset', {
                        className: 'form-fieldset'
                    },
                    React.createElement('legend', {
                        className: 'form-legend'
                    }, this.props.legend),
                    this.props.children
                )
            )
        )
    }
})
module.exports = Form
