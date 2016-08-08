'use strict'

const classNames = require('classNames')
const FormGroup = require('./FormGroup')

var Input = React.createClass({
    getDefaultProps: function() {
        return {
            type: 'text',
            value: '',
            autocomplete: 'off',
            required: 'required',
        }
    },
    getInitialState: function() {
        return {
            value: this.props.value,
            help: this.props.help,
            length:  this.props.value.length || 0
        }
    },
    componentWillMount: function() {
        let length = this.props.value.length || 0
        let help = this.props.help || '请输入' + this.props.title
        this.setState({
            help: help
        })
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps.value !== this.props.value
    },
    componentWillReceiveProps: function(nextProps) {
        this.state = {
            value: nextProps.value
        }
    },
    _onChange: function(e) {
        let error
        let warning
        let success
        let value = e.target.value.replace(/(^\s*)|(\s*$)/, "")
        let length = value.length
        let help = this.props.help || '请输入' + this.props.title
        if (length > 0) {
            if (this.props.min && length < this.props.min) {
                help = '请输入至少' + this.props.min + '个字符！'
                error = true
            } else if (this.props.max && length > this.props.max) {
                help = '请输入至多' + this.props.max + '个字符！'
                error = true
            }
            if (!error) {
                success = true
            }
        } else if (this.props.required) {
            help = this.props.title + '必须填写！'
            warning = true
        }
        this.setState({
            value: value,
            help: help,
            length: length,
            error: error,
            warning: warning,
            success: success,
        })
        if (this.props.onChange) {
            this.props.onChange(this.props.name, value)
        }
    },
    render: function() {
        let Class = classNames({
            'has-error': this.state.error,
            'has-warning': this.state.warning,
            'has-success': this.state.success
        })
        let limit = ' ' + this.state.length
        if (this.props.max) {
            limit += ' / ' + this.props.max
        }
        return (
            React.createElement(FormGroup, {
                    class: Class,
                    title: this.props.title,
                    limit: limit,
                    help: this.state.help
                },
                React.createElement('input', {
                    className: 'form-input',
                    type: this.props.type,
                    max: this.props.max,
                    min: this.props.min,
                    placeholder: this.props.placeholder,
                    disabled: this.props.disabled,
                    autoComplete: this.props.autoComplete,
                    value: this.state.value,
                    onChange: this._onChange
                })
            )
        )
    }
})

module.exports = Input
