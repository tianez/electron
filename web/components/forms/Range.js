'use strict'

const classNames = require('classNames')
const FormGroup = require('./FormGroup')

var Range = React.createClass({
    getDefaultProps: function() {
        return {
            title: '滑条',
            type: 'range',
            value: '',
            help: '滑动滑条选择你的值！',
            disabled: '',
            required: 'required',
            max: 10,
            min: 6,
        }
    },
    getInitialState: function() {
        return {
            value: this.props.value,
            help: this.props.help,
        }
    },
    componentWillMount: function() {
        let help = '滑块值域' + this.props.min + '~' + this.props.max + '，' + this.props.help
        this.setState({
            help: help,
        })
    },
    _onChange: function(e) {
        let value = e.target.value
        if (value == this.state.value) {
            return
        }
        let help = '滑块值域' + this.props.min + '~' + this.props.max + '，当前值：' + value
        this.setState({
            value: value,
            help: help,
        })
        if (this.props.onChange) {
            this.props.onChange(this.props.name, value)
        }
    },
    render: function() {
        return (
            React.createElement(FormGroup, {
                    title: this.props.title,
                    help: this.state.help
                },
                React.createElement('input', {
                    className: 'form-range',
                    type: this.props.type,
                    max: this.props.max,
                    min: this.props.min,
                    disabled: this.props.disabled,
                    value: this.state.value,
                    onChange: this._onChange
                })
            )
        )
    }
})
module.exports = Range
