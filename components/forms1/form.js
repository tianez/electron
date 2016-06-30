'use strict';
var Input = require('./input')
var Textarea = require('./textarea')
var Password = require('./password')
var China_id = require('./china_id')
var Select = require('./select')
var Checkbox = require('./checkbox-inline')
var Radio = require('./radio')
var Upload = require('./upload')
var Hidden = require('./hidden')
var Submit = require('./submit')
var Ueditor = require('./ueditor')
var Datetimepicker = require('./datetimepicker')

var Form = React.createClass({
    getInitialState: function() {
        return {
            info: this.props.info,
        };
    },
    _onChange: function(k, v) {
        console.log(v)
        let info = this.state.info
        info[k] = v
        this.setState({
            info: info
        });
    },
    _onSubmit: function(e) {
        this.props._onSubmit()
        e.preventDefault()
    },
    render: function() {
        let info = this.props.info
        let select = this.props.select
        let _onChange = this._onChange
        let k = 0
        var FormNodes = this.props.forms.map(function(d) {
            let value = info[d.k] || d.default
            d.value = value || ''
            d.key = k
            d.kk = k
            k++
            let lists
            if (d.ext) {
                lists = select[d.ext] || d.lists
            } else {
                lists = select[d.k] || d.lists
            }
            d._onChange = _onChange
            d.lists = lists || []
            switch (d.type) {
                case "text":
                    return (React.createElement(Input, d))
                    break;
                case "email":
                    return (React.createElement(Input, d))
                    break;
                case "password":
                    return (React.createElement(Input, d))
                    break;
                case "china_id":
                    return (React.createElement(China_id, d))
                    break;
                case "textarea":
                    return (React.createElement(Textarea, d))
                    break;
                case "ueditor":
                    return (React.createElement(Ueditor, d))
                    break;
                case "upload":
                    return (React.createElement(Upload, d))
                    break;
                case "select":
                    return (React.createElement(Select, d))
                    break;
                case "checkbox":
                    d.value = value || '[]'
                    return (React.createElement(Checkbox, d))
                    break;
                case "radio":
                    return (React.createElement(Radio, d))
                    break;
                case "datetime":
                    return (React.createElement(Datetimepicker, d))
                    break;
                case "hidden":
                    return (React.createElement(Hidden, d))
                    break;
                default:
                    break;
            }
        })
        return (
            React.createElement('form', {
                    className: 'form-horizontal margin-top-20',
                    role: 'form',
                    encType: 'multipart/form-data',
                    method: 'post',
                    key: this.props.k,
                    onSubmit: this._onSubmit,
                    autoComplete: 'off',
                },
                React.createElement("div", {
                        className: "form-body col-md-12 margin-bottom-20"
                    },
                    FormNodes,
                    React.createElement(Submit, {
                        kk: k
                    }))
            )
        )

    }
})

module.exports = Form